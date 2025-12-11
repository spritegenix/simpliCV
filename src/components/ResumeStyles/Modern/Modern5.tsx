"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern5({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default accent color
  const accentColor =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#0284c7" // Sky-600
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
        className={cn("h-full", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Full Width Header */}
        <Header resumeData={resumeData} colorHex={accentColor} />

        {/* 3-Column Timeline Grid */}
        <div className="p-10 pt-6">
          {/* Contact Info Row (Top of body) */}
          <div className="mb-8">
            <ContactSection resumeData={resumeData} colorHex={accentColor} />
          </div>

          {/* Main Grid: [Title] [Timeline] [Content] */}
          <div className="grid grid-cols-[140px_40px_1fr] gap-y-8">
            {/* PROFILE */}
            {resumeData.summary && (
              <>
                <SectionTitle title="Profile" colorHex={accentColor} />
                <TimelineColumn colorHex={accentColor} />
                <div className="pb-2">
                  <div className="text-justify text-sm leading-relaxed text-slate-600">
                    {resumeData.summary}
                  </div>
                </div>
              </>
            )}

            {/* EXPERIENCE */}
            {resumeData.workExperiences &&
              resumeData.workExperiences.length > 0 && (
                <>
                  <SectionTitle title="Experience" colorHex={accentColor} />
                  <TimelineColumn colorHex={accentColor} />
                  <div className="space-y-6 pb-2">
                    {resumeData.workExperiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className="group relative break-inside-avoid"
                      >
                        {/* Dot for item */}
                        <div
                          className="absolute -left-[30px] top-1.5 z-10 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: accentColor }}
                        />

                        <div className="mb-1 flex items-baseline justify-between">
                          <h4 className="text-md font-bold text-slate-800">
                            {exp.position}
                          </h4>
                          <span className="text-xs font-semibold italic text-slate-500">
                            {exp.startDate &&
                              formatDate(exp.startDate, "MMM yyyy")}{" "}
                            -{" "}
                            {exp.endDate
                              ? formatDate(exp.endDate, "MMM yyyy")
                              : "Present"}
                          </span>
                        </div>
                        <div className="mb-2 text-sm font-semibold italic text-slate-600">
                          {exp.company}{" "}
                          {exp.jobLocation && `— ${exp.jobLocation}`}
                        </div>
                        <div
                          className="prose prose-sm prose-li:text-slate-600 max-w-none text-sm text-slate-600"
                          dangerouslySetInnerHTML={{
                            __html: exp.description || "",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

            {/* EDUCATION */}
            {resumeData.educations && resumeData.educations.length > 0 && (
              <>
                <SectionTitle title="Education" colorHex={accentColor} />
                <TimelineColumn colorHex={accentColor} />
                <div className="space-y-5 pb-2">
                  {resumeData.educations.map((edu, idx) => (
                    <div key={idx} className="relative break-inside-avoid">
                      <div
                        className="absolute -left-[30px] top-1.5 z-10 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: accentColor }}
                      />

                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {edu.school}
                          </h4>
                          <div className="text-sm text-slate-600">
                            {edu.degree} {edu.stream}
                          </div>
                        </div>
                        <div className="mt-0.5 text-xs italic text-slate-500">
                          {edu.startDate && formatDate(edu.startDate, "yyyy")} -{" "}
                          {edu.endDate
                            ? formatDate(edu.endDate, "yyyy")
                            : "Present"}
                        </div>
                      </div>
                      {edu.description && (
                        <div className="mt-1 whitespace-pre-line text-xs text-slate-500">
                          {edu.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* SKILLS */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <>
                <SectionTitle title="Skills" colorHex={accentColor} />
                <TimelineColumn colorHex={accentColor} />
                <div className="pb-2">
                  <div className="grid grid-cols-1 gap-3">
                    {resumeData.skills.map((skill, idx) => (
                      <div key={idx} className="break-inside-avoid">
                        <span className="mb-1 block text-sm font-bold text-slate-700">
                          {skill.title}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.skillName?.map((item, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium text-slate-600"
                            >
                              {item}
                              {i < (skill.skillName?.length || 0) - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* PROJECTS */}
            {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
              <>
                <SectionTitle title="Projects" colorHex={accentColor} />
                <TimelineColumn colorHex={accentColor} />
                <div className="space-y-4 pb-2">
                  {resumeData.projectWorks.map((project, idx) => (
                    <div key={idx} className="relative break-inside-avoid">
                      <div
                        className="absolute -left-[30px] top-1.5 z-10 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: accentColor }}
                      />
                      <div className="mb-1 flex items-baseline justify-between">
                        <h4 className="font-bold text-slate-800">
                          {project.title}
                        </h4>
                        <span className="font-mono text-xs text-slate-400">
                          {project.startDate &&
                            new Date(project.startDate).getFullYear()}{" "}
                          -{" "}
                          {project.endDate
                            ? new Date(project.endDate).getFullYear()
                            : "Present"}
                        </span>
                      </div>
                      <div
                        className="text-sm text-slate-600"
                        dangerouslySetInnerHTML={{
                          __html: project.description || "",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const Header = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { firstName, lastName, jobTitle, photo, borderStyle } = resumeData;
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
    <div className="relative flex w-full items-center justify-between overflow-hidden border-b border-slate-200 bg-slate-50 p-10 py-12">
      {/* Decorative Background Element */}
      <div className="absolute right-0 top-0 h-full w-64 skew-x-12 bg-gradient-to-l from-slate-100 to-transparent opacity-50" />

      <div className="z-10">
        <h1 className="text-5xl font-extrabold uppercase tracking-tight text-slate-900">
          {firstName} <span style={{ color: colorHex }}>{lastName}</span>
        </h1>
        {jobTitle && (
          <p className="mt-2 pl-1 text-xl font-medium uppercase tracking-widest text-slate-500">
            {jobTitle}
          </p>
        )}
      </div>

      {photoSrc && (
        <div className="z-10">
          <Image
            src={photoSrc}
            width={130}
            height={130}
            alt="Profile"
            className="object-cover"
            style={{
              width: "130px",
              height: "130px",
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "50%"
                    : "10px",
              border: `4px solid white`,
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => (
  <div className="pt-0.5 text-right">
    <h3
      className="text-sm font-bold uppercase tracking-wider"
      style={{ color: colorHex }}
    >
      {title}
    </h3>
  </div>
);

const TimelineColumn = ({
  colorHex,
  //   isList,
}: {
  colorHex: string;
  //   isList?: boolean;
}) => (
  <div className="relative flex h-full justify-center">
    {/* Main Vertical Line */}
    <div className="absolute bottom-0 top-2 h-full w-[2px] bg-slate-200" />

    {/* Header Dot */}
    <div
      className="relative z-10 h-4 w-4 rounded-full border-[3px] border-white shadow-sm"
      style={{ backgroundColor: colorHex }}
    />
  </div>
);

const ContactSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { city, country, phone, email, socialLinks, portfolioLink } =
    resumeData;
  const iconStyle = { color: colorHex };

  return (
    <div className="mx-10 flex flex-wrap justify-center gap-6 border-b border-slate-100 pb-8 text-sm text-slate-600">
      {(city || country) && (
        <div className="flex items-center gap-2">
          <MapPin size={16} style={iconStyle} />
          <span>{[city, country].filter(Boolean).join(", ")}</span>
        </div>
      )}
      {phone && (
        <div className="flex items-center gap-2">
          <Phone size={16} style={iconStyle} />
          <a
            href={`tel:${phone}`}
            className="transition-colors hover:text-slate-900"
          >
            {phone}
          </a>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2">
          <Mail size={16} style={iconStyle} />
          <a
            href={`mailto:${email}`}
            className="transition-colors hover:text-slate-900"
          >
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
            className="transition-colors hover:text-slate-900"
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
            className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors hover:text-slate-900"
          >
            {link.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </div>
      ))}
    </div>
  );
};
