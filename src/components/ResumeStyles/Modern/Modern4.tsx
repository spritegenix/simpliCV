"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern4({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default color logic
  const colorHex =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#2563EB" // Default Modern Blue
      : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white font-sans text-slate-800 shadow-sm",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("grid h-full grid-cols-12", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width, // Scale to fit container width
        }}
        id="resumePreviewContent"
      >
        {/* Sidebar - Left Column (30-35% roughly, col-span-4 of 12 = 33%) */}
        <div className="col-span-4 h-full border-r border-slate-100 bg-slate-50">
          <Sidebar resumeData={resumeData} colorHex={colorHex} />
        </div>

        {/* Main Content - Right Column */}
        <div className="col-span-8 p-8 pr-10 pt-10">
          <MainContent resumeData={resumeData} colorHex={colorHex} />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface SectionProps {
  resumeData: ResumeValues;
  colorHex?: string;
  className?: string;
}

const Sidebar: React.FC<SectionProps> = ({
  resumeData,
  colorHex,
  className,
}) => {
  const { photo, borderStyle } = resumeData;
  const [photoSrc, setPhotoSrc] = useState<string>(
    photo instanceof File ? "" : photo || "",
  );

  useEffect(() => {
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (photo === null) setPhotoSrc("");
  }, [photo]);

  return (
    <div
      className={cn("h-full space-y-8 bg-slate-50 p-6", className)}
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Photo */}
      {photoSrc && (
        <div className="mb-6 flex justify-center">
          <Image
            src={photoSrc}
            width={150}
            height={150}
            alt="Profile"
            className="object-cover"
            style={{
              width: "120px",
              height: "120px",
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "50%"
                    : "10%",
              border: `3px solid ${colorHex}`,
            }}
          />
        </div>
      )}

      {/* Contact */}
      <ContactSection resumeData={resumeData} colorHex={colorHex} />

      {/* Skills */}
      <SkillsSection resumeData={resumeData} colorHex={colorHex} />

      {/* Education */}
      <EducationSection resumeData={resumeData} colorHex={colorHex} />

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="space-y-4">
          <SectionHeading title="Certifications" colorHex={colorHex} />
          <ul className="list-disc space-y-2 pl-4 text-sm text-gray-700">
            {resumeData.certifications.map((cert, idx) => (
              <div key={idx} className="break-inside-avoid">
                <span className="block font-semibold">{cert.title}</span>
                {cert.description && (
                  <span className="text-xs text-gray-500">
                    {cert.description}
                  </span>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}

      {/* Languages / Others */}
      {resumeData.others &&
        (resumeData.others.title || resumeData.others.description) && (
          <div className="space-y-4">
            <div>
              <SectionHeading
                title={resumeData.others.title || "Others"}
                colorHex={colorHex}
              />
              <div
                className="whitespace-pre-line text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: resumeData.others.description || "",
                }}
              />
            </div>
          </div>
        )}
    </div>
  );
};

const MainContent: React.FC<SectionProps> = ({
  resumeData,
  colorHex,
  className,
}) => {
  return (
    <div className={className}>
      <Header
        firstName={resumeData.firstName}
        lastName={resumeData.lastName}
        jobTitle={resumeData.jobTitle}
        colorHex={colorHex}
      />

      <SummarySection resumeData={resumeData} colorHex={colorHex} />

      <ExperienceSection resumeData={resumeData} colorHex={colorHex} />

      {/* Projects */}
      {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
        <div className="mt-6">
          <SectionHeading
            title="Projects"
            colorHex={colorHex}
            className="mb-4"
          />
          <div className="space-y-4">
            {resumeData.projectWorks.map((project, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex justify-between font-semibold">
                  <span>{project.title}</span>
                  <span className="text-xs text-gray-500">
                    {project.startDate &&
                      new Date(project.startDate).getFullYear()}{" "}
                    -{" "}
                    {project.endDate
                      ? new Date(project.endDate).getFullYear()
                      : "Present"}
                  </span>
                </div>
                <div
                  className="mt-1 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: project.description || "",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function Header({
  firstName,
  lastName,
  jobTitle,
  colorHex,
  className,
}: {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  colorHex?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-gray-800">
        <span className="text-gray-900">{firstName}</span>{" "}
        <span style={{ color: colorHex }}>{lastName}</span>
      </h1>
      {jobTitle && (
        <p className="mt-2 text-xl font-medium uppercase tracking-wide text-gray-600">
          {jobTitle}
        </p>
      )}
    </div>
  );
}

function SectionHeading({
  title,
  colorHex,
  className,
}: {
  title: string;
  colorHex?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 break-inside-avoid", className)}>
      <h3
        className="mb-1 text-lg font-bold uppercase tracking-wider"
        style={{ color: colorHex }}
      >
        {title}
      </h3>
      <div
        className="h-[2px] w-12 rounded-full"
        style={{ backgroundColor: colorHex }}
      />
    </div>
  );
}

const ContactSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { city, country, phone, email, socialLinks, portfolioLink } =
    resumeData;
  const iconStyle = { color: colorHex };

  return (
    <div className="space-y-3 text-sm">
      {(city || country) && (
        <div className="flex items-center gap-2">
          <MapPin size={16} style={iconStyle} />
          <span>{[city, country].filter(Boolean).join(", ")}</span>
        </div>
      )}
      {phone && (
        <div className="flex items-center gap-2">
          <Phone size={16} style={iconStyle} />
          <a href={`tel:${phone}`} className="hover:underline">
            {phone}
          </a>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2">
          <Mail size={16} style={iconStyle} />
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </div>
      )}
      {portfolioLink && (
        <div className="flex items-center gap-2">
          <Globe size={16} style={iconStyle} />
          <a
            href={portfolioLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Portfolio
          </a>
        </div>
      )}
      {socialLinks?.map((link, index) => (
        <div key={index} className="flex items-center gap-2">
          <LinkIcon size={16} style={iconStyle} />
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
          >
            {link.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </div>
      ))}
    </div>
  );
};

const SkillsSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { skills } = resumeData;
  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-4">
      <SectionHeading title="Skills" colorHex={colorHex} />
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="break-inside-avoid">
            <h4 className="mb-1 text-sm font-semibold">{skill.title}</h4>
            <div className="flex flex-wrap gap-1">
              {skill.skillName?.map((item, i) => (
                <span
                  key={i}
                  className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EducationSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { educations } = resumeData;
  if (!educations || educations.length === 0) return null;

  return (
    <div className="space-y-4">
      <SectionHeading title="Education" colorHex={colorHex} />
      <div className="space-y-4">
        {educations.map((edu, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="mb-1 flex items-baseline justify-between">
              <h4 className="font-bold text-gray-800">{edu.school}</h4>
              <span className="whitespace-nowrap text-xs text-gray-500">
                {edu.startDate && safeFormatDate(edu.startDate, "MMM yyyy")} -{" "}
                {edu.endDate
                  ? safeFormatDate(edu.endDate, "MMM yyyy")
                  : "Present"}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-700">
              {edu.degree} {edu.stream && <span>in {edu.stream}</span>}
            </div>
            {edu.location && (
              <div className="mb-1 text-xs italic text-gray-500">
                {edu.location}
              </div>
            )}

            {edu.description && (
              <div className="mt-1 whitespace-pre-line text-xs text-gray-600">
                {edu.description}
              </div>
            )}
            {edu.marks && (
              <div className="mt-1 text-xs text-gray-600">
                Grade: {edu.marks}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection: React.FC<SectionProps> = ({
  resumeData,
  colorHex,
}) => {
  const { workExperiences } = resumeData;
  if (!workExperiences || workExperiences.length === 0) return null;

  return (
    <div className="space-y-4">
      <SectionHeading title="Experience" colorHex={colorHex} />
      <div className="space-y-5">
        {workExperiences.map((exp, index) => (
          <div
            key={index}
            className="relative ml-1 break-inside-avoid border-l-2 border-gray-200 pl-4"
          >
            <div
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-white"
              style={{ backgroundColor: colorHex }}
            />
            <div className="mb-1 flex items-start justify-between">
              <div>
                <h4
                  className="font-bold text-gray-900"
                  style={{ color: colorHex }}
                >
                  {exp.position}
                </h4>
                <div className="text-sm font-semibold text-gray-700">
                  {exp.company}
                </div>
              </div>
              <div className="text-right">
                <div className="whitespace-nowrap text-xs font-medium text-gray-500">
                  {exp.startDate && safeFormatDate(exp.startDate, "MMM yyyy")} -{" "}
                  {exp.endDate
                    ? safeFormatDate(exp.endDate, "MMM yyyy")
                    : "Present"}
                </div>
                {exp.jobLocation && (
                  <div className="text-xs text-gray-400">{exp.jobLocation}</div>
                )}
              </div>
            </div>
            {exp.description && (
              <div
                className="prose prose-sm max-w-none text-sm leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SummarySection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { summary } = resumeData;
  if (!summary) return null;

  return (
    <div className="mb-6">
      <SectionHeading title="About Me" colorHex={colorHex} />
      <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
        {summary}
      </div>
    </div>
  );
};
