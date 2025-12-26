"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";
import { formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function MillieSmithResume({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "resume-root modern aspect-[210/297] h-fit w-full bg-white shadow-sm",
        className,
      )}
      ref={containerRef}
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
    >
      <div
        className={cn("h-full", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <div className="bg-gray-50 px-10 pb-4 pt-8 text-center">
          <h1
            className="mb-1 font-light tracking-[0.5rem] text-gray-700"
            style={{
              fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
            }}
          >
            {resumeData.firstName?.toUpperCase()}{" "}
            {resumeData.lastName?.toUpperCase()}
          </h1>
          {resumeData.jobTitle && (
            <p
              className="font-normal tracking-[0.15rem]"
              style={{
                color: "var(--accent)",
                fontSize:
                  "calc(var(--base-font) * 1.05 * var(--heading-scale))",
              }}
            >
              {resumeData.jobTitle.toUpperCase()}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          className="mx-10 h-0 border-t"
          style={{
            borderTopWidth: "calc(var(--resume-border-width) * 2)",
            borderStyle: "var(--resume-border-style)" as any,
            borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
          }}
        />

        {/* Main Content Grid */}
        <div className="grid min-h-[calc(100%-180px)] grid-cols-12">
          {/* Left Column */}
          <div
            className="col-span-5 border-r border-gray-300"
            style={{
              borderRightWidth: "calc(var(--resume-border-width) * 2)",
              borderStyle: "var(--resume-border-style)" as any,
              borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
            }}
          >
            <LeftColumn resumeData={resumeData} colorHex={"var(--accent)"} />
          </div>

          {/* Right Column */}
          <div className="col-span-7">
            <RightColumn resumeData={resumeData} colorHex={"var(--accent)"} />
          </div>
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

const LeftColumn: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
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
    if (photo === null) setPhotoSrc("");
  }, [photo]);

  return (
    <div className="space-y-6 p-8">
      {/* Photo */}
      {photoSrc && (
        <div className="flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            <Image
              src={photoSrc}
              width={128}
              height={128}
              alt="Profile"
              className="h-full w-full object-cover"
              style={{
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "50%"
                      : "10%",
              }}
            />
          </div>
        </div>
      )}

      {/* About Section */}
      {resumeData.summary && (
        <div>
          <SectionTitle title="ABOUT" colorHex={colorHex} />
          <div
            dangerouslySetInnerHTML={{
              __html: resumeData.summary || "",
            }}
            className="richTextEditorStyle !m-0 whitespace-pre-line text-xs leading-relaxed text-gray-600"
          />
        </div>
      )}

      {/* Horizontal Divider */}
      <div
        className="h-0 border-t"
        style={{
          borderTopWidth: "var(--resume-border-width)",
          borderStyle: "var(--resume-border-style)" as any,
          borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
        }}
      />

      {/* Contact Section */}
      <ContactSection resumeData={resumeData} colorHex={colorHex} />

      {/* Horizontal Divider */}
      <div
        className="h-0 border-t"
        style={{
          borderTopWidth: "var(--resume-border-width)",
          borderStyle: "var(--resume-border-style)" as any,
          borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
        }}
      />

      {/* Skills Section */}
      <SkillsSection resumeData={resumeData} colorHex={colorHex} />

      {/* Others/Custom Section */}
      {resumeData.others?.title && resumeData.others?.description && (
        <>
          {/* Horizontal Divider */}
          <div
            className="h-0 border-t"
            style={{
              borderTopWidth: "var(--resume-border-width)",
              borderStyle: "var(--resume-border-style)" as any,
              borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
            }}
          />

          <div>
            <SectionTitle title={resumeData.others.title} colorHex={colorHex} />
            <div
              className="richTextEditorStyle whitespace-pre-line text-xs leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{
                __html: resumeData.others.description || "",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const RightColumn: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  return (
    <div className="space-y-6 p-8">
      {/* Education Section */}
      <EducationSection resumeData={resumeData} colorHex={colorHex} />

      {/* Horizontal Divider */}
      {resumeData.educations &&
        resumeData.educations.length > 0 &&
        resumeData.workExperiences &&
        resumeData.workExperiences.length > 0 && (
          <div
            className="my-4 h-0 border-t"
            style={{
              borderTopWidth: "var(--resume-border-width)",
              borderStyle: "var(--resume-border-style)" as any,
              borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
            }}
          />
        )}

      {/* Experience Section */}
      <ExperienceSection resumeData={resumeData} colorHex={colorHex} />

      {/* Projects Section */}
      {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
        <>
          <div
            className="my-4 h-0 border-t"
            style={{
              borderTopWidth: "var(--resume-border-width)",
              borderStyle: "var(--resume-border-style)" as any,
              borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
            }}
          />
          <ProjectsSection resumeData={resumeData} colorHex={colorHex} />
        </>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <>
          <div
            className="my-4 h-0 border-t"
            style={{
              borderTopWidth: "var(--resume-border-width)",
              borderStyle: "var(--resume-border-style)" as any,
              borderColor: "color-mix(in srgb, var(--text) 25%, transparent)",
            }}
          />
          <CertificationsSection resumeData={resumeData} colorHex={colorHex} />
        </>
      )}
    </div>
  );
};

function SectionTitle({
  title,
  colorHex,
}: {
  title: string;
  colorHex?: string;
}) {
  return (
    <h2
      className="mb-3 text-lg font-bold tracking-wide"
      style={{
        color: colorHex,
        fontSize: "calc(1em * var(--heading-scale))",
      }}
    >
      {title}
    </h2>
  );
}

const ContactSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { city, country, phone, email, portfolioLink, socialLinks } =
    resumeData;

  return (
    <div>
      <SectionTitle title="CONTACT" colorHex={colorHex} />
      <div className="space-y-3">
        {phone && (
          <div className="flex items-start gap-3">
            <Phone
              size={14}
              style={{ color: colorHex, flexShrink: 0, marginTop: "2px" }}
            />
            <span className="text-xs text-gray-600">{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-start gap-3">
            <Mail
              size={14}
              style={{ color: colorHex, flexShrink: 0, marginTop: "2px" }}
            />
            <span className="break-all text-xs text-gray-600">{email}</span>
          </div>
        )}
        {portfolioLink && (
          <div className="flex items-start gap-3">
            <Globe
              size={14}
              style={{ color: colorHex, flexShrink: 0, marginTop: "2px" }}
            />
            <a
              href={portfolioLink}
              className="break-all text-xs text-gray-600 hover:underline"
            >
              {portfolioLink.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </div>
        )}
        {(city || country) && (
          <div className="flex items-start gap-3">
            <MapPin
              size={14}
              style={{ color: colorHex, flexShrink: 0, marginTop: "2px" }}
            />
            <span className="text-xs text-gray-600">
              {[city, country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}
        {socialLinks?.map((link, index) => (
          <div key={index} className="flex items-start gap-3">
            <LinkIcon
              size={14}
              style={{ color: colorHex, flexShrink: 0, marginTop: "2px" }}
            />
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="break-all text-xs text-gray-600 hover:underline"
            >
              {link.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { skills } = resumeData;
  if (!skills || skills.length === 0) return null;

  return (
    <div>
      <SectionTitle title="SKILLS" colorHex={colorHex} />
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="relative pl-4 text-xs text-gray-600">
            <span
              className="absolute left-0 top-0.5 text-[8px]"
              style={{ color: colorHex }}
            >
              ■
            </span>
            <span className="font-medium">{skill.title}</span>
            {skill.skillName && skill.skillName.length > 0 && (
              <span className="text-gray-500">
                {" "}
                - {skill.skillName.join(", ")}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EducationSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { educations } = resumeData;
  if (!educations || educations.length === 0) return null;

  return (
    <div>
      <SectionTitle title="EDUCATION" colorHex={colorHex} />
      <div className="space-y-4">
        {educations.map((edu, index) => (
          <div key={index} className="break-inside-avoid">
            <p className="mb-1 text-xs text-gray-600">
              {edu.startDate && formatDate(edu.startDate, "yyyy")} -{" "}
              {edu.endDate ? formatDate(edu.endDate, "yyyy") : "Present"}
            </p>
            <div className="relative pl-4">
              <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">
                ■
              </span>
              <p className="mb-0.5 text-sm font-bold text-gray-800">
                {edu.degree?.toUpperCase()}
              </p>
              <p className="text-xs text-gray-600">{edu.school}</p>
              {edu.stream && (
                <p className="text-xs text-gray-600">in {edu.stream}</p>
              )}
              {edu.location && (
                <p className="mt-0.5 text-[10px] italic text-gray-500">
                  {edu.location}
                </p>
              )}
              {edu.marks && (
                <p className="mt-0.5 text-[10px] text-gray-600">
                  Grade: {edu.marks}
                </p>
              )}
              {edu.description && (
                <div className="mt-1 whitespace-pre-line text-[10px] text-gray-600">
                  {edu.description}
                </div>
              )}
            </div>
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
    <div>
      <SectionTitle title="EXPERIENCE" colorHex={colorHex} />
      <div className="space-y-4">
        {workExperiences.map((exp, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="relative pl-4">
              <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">
                ■
              </span>
              <div className="mb-2">
                <p className="text-sm font-bold text-gray-800">
                  <span data-resume-entry-title>
                    {exp.company?.toUpperCase()}
                  </span>
                  {exp.position && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      className="font-semibold"
                    >
                      {exp.position}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-600">
                  {exp.startDate && formatDate(exp.startDate, "yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "yyyy") : "PRESENT"}
                </p>
              </div>
              {exp.position ? (
                <p
                  data-resume-entry-subtitle
                  data-entry-subtitle-slot="newline"
                  className="mb-1 text-xs font-semibold text-gray-600"
                >
                  {exp.position}
                </p>
              ) : (
                <p />
              )}
              {exp.jobLocation && (
                <p className="mb-1 text-[10px] text-gray-500">
                  {exp.jobLocation}
                </p>
              )}
              {exp.description && (
                <div
                  className="prose prose-sm max-w-none text-xs leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { projectWorks } = resumeData;
  if (!projectWorks || projectWorks.length === 0) return null;

  return (
    <div>
      <SectionTitle title="PROJECTS" colorHex={colorHex} />
      <div className="space-y-4">
        {projectWorks.map((project, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="relative pl-4">
              <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">
                ■
              </span>
              <div className="mb-1">
                <p className="text-sm font-bold text-gray-800">
                  <span data-resume-entry-title>{project.title}</span>
                  {project.company && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      className="italic"
                    >
                      {project.company}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-600">
                  {project.startDate && formatDate(project.startDate, "yyyy")} -{" "}
                  {project.endDate
                    ? formatDate(project.endDate, "yyyy")
                    : "Present"}
                </p>
              </div>
              {project.company && (
                <p
                  data-resume-entry-subtitle
                  data-entry-subtitle-slot="newline"
                  className="mb-1 text-xs italic text-gray-600"
                >
                  {project.company}
                </p>
              )}
              {project.description && (
                <div
                  className="text-xs leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificationsSection: React.FC<SectionProps> = ({
  resumeData,
  colorHex,
}) => {
  const { certifications } = resumeData;
  if (!certifications || certifications.length === 0) return null;

  return (
    <div>
      <SectionTitle title="CERTIFICATIONS" colorHex={colorHex} />
      <ul className="space-y-2">
        {certifications.map((cert, index) => (
          <li key={index} className="relative pl-4 text-xs text-gray-600">
            <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">
              ■
            </span>
            <span className="block font-bold">{cert.title}</span>
            {cert.description && (
              <span className="text-[10px] text-gray-500">
                {cert.description}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
