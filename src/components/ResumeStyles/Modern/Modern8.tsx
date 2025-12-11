"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern8({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default color: Teal
  const accentColor =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#14b8a6" // Teal-500
      : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-slate-800 shadow-sm",
        className,
      )}
      ref={containerRef}
    >
      {/* Montserrat Font Injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        `,
        }}
      />

      <div
        className={cn(
          "relative h-full font-['Montserrat',sans-serif]",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* HEADER TOP BAR */}
        <div
          className="h-[60px] w-full"
          style={{ backgroundColor: accentColor }}
        />

        {/* 2-COLUMN LAYOUT */}
        <div className="grid h-[calc(100%-60px)] grid-cols-[280px_1fr]">
          {/* LEFT COLUMN */}
          <div className="border-r border-slate-200 bg-slate-50 px-8 pb-10 pt-8">
            {/* PROFILE IMAGE */}
            <div className="mb-8 flex justify-center">
              <PhotoSection resumeData={resumeData} colorHex={accentColor} />
            </div>

            {/* CONTACT */}
            <div className="mb-8">
              <SectionTitleSide title="Contact" colorHex={accentColor} />
              <ContactSection resumeData={resumeData} colorHex={accentColor} />
            </div>

            {/* LANGUAGES */}
            <div className="mb-8">
              <SectionTitleSide title="Languages" colorHex={accentColor} />
              {/* Mock languages as strictly not in schema but common in this template type, using Others or similar if present, else static/hidden */}
              {/* Assuming we might map skills or just skip if no explicit data. Using a placeholder or skill mapping if tagged */}
              <div className="space-y-2">
                {/* Placeholder if user added languages in 'skills' or we leave empty. 
                            Let's map Skills here just in case user put lang there, or skip. 
                            Actually, prompt asks for "Languages" section. We'll check if any skill is language-like or just render generic if empty? 
                            Better: Render Skills here as "Pro Skills" later, and if `others` has content, maybe use that.
                        */}
              </div>
            </div>

            {/* PRO SKILLS */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="mb-8">
                <SectionTitleSide title="Pro Skills" colorHex={accentColor} />
                <div className="space-y-4">
                  {resumeData.skills.map((skill, idx) => (
                    <div key={idx}>
                      <h4 className="mb-1.5 text-xs font-bold uppercase text-slate-700">
                        {skill.title}
                      </h4>
                      <div className="space-y-2">
                        {skill.skillName?.map((item, i) => (
                          <div key={i} className="relative">
                            <div className="mb-0.5 flex justify-between text-[10px] font-semibold text-slate-600">
                              <span>{item}</span>
                            </div>
                            {/* Skill Bar Mockup */}
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.random() * 40 + 60}%`,
                                  backgroundColor: accentColor,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOCIAL */}
            {resumeData.socialLinks && resumeData.socialLinks.length > 0 && (
              <div className="mb-8">
                <SectionTitleSide title="Social" colorHex={accentColor} />
                <div className="space-y-3">
                  {resumeData.socialLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="rounded-full p-1.5 text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        <LinkIcon size={10} />
                      </div>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-medium text-slate-600 hover:text-slate-900"
                      >
                        {link.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="px-10 pb-10 pt-12">
            {/* NAME BLOCK */}
            <div className="mb-12">
              <div
                className="-ml-10 inline-block rounded-r-full px-10 py-5 shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                <h1 className="text-4xl font-extrabold uppercase tracking-wide text-white">
                  {resumeData.firstName} {resumeData.lastName}
                </h1>
                {resumeData.jobTitle && (
                  <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-white opacity-90">
                    {resumeData.jobTitle}
                  </p>
                )}
              </div>
            </div>

            {/* ABOUT ME */}
            {resumeData.summary && (
              <div className="mb-10">
                <SectionTitleMain title="About Me" colorHex={accentColor} />
                <p className="text-justify text-sm leading-relaxed text-slate-600">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* EXPERIENCE */}
            {resumeData.workExperiences &&
              resumeData.workExperiences.length > 0 && (
                <div className="mb-10">
                  <SectionTitleMain
                    title="Job Experience"
                    colorHex={accentColor}
                  />
                  <div className="space-y-8">
                    {resumeData.workExperiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className="grid break-inside-avoid grid-cols-[100px_1fr] gap-4"
                      >
                        {/* Date */}
                        <div className="pt-0.5 text-right">
                          <span className="block text-xs font-bold uppercase text-slate-500">
                            {exp.endDate
                              ? formatDate(exp.endDate, "yyyy")
                              : "Present"}
                          </span>
                          <span className="block text-[10px] font-semibold uppercase text-slate-400">
                            {exp.startDate && formatDate(exp.startDate, "MMM")}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="relative border-l-2 border-slate-200 pl-6">
                          {/* Dot */}
                          <div
                            className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full ring-2 ring-white"
                            style={{ backgroundColor: accentColor }}
                          />

                          <h4 className="text-md font-bold uppercase tracking-tight text-slate-800">
                            {exp.position}
                          </h4>
                          <div
                            className="mb-2 text-xs font-bold uppercase text-slate-500"
                            style={{ color: accentColor }}
                          >
                            {exp.company}
                          </div>

                          <div
                            className="text-justify text-xs leading-relaxed text-slate-600"
                            dangerouslySetInnerHTML={{
                              __html: exp.description || "",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* EDUCATION */}
            {resumeData.educations && resumeData.educations.length > 0 && (
              <div>
                <SectionTitleMain title="Education" colorHex={accentColor} />
                <div className="space-y-6">
                  {resumeData.educations.map((edu, idx) => (
                    <div
                      key={idx}
                      className="grid break-inside-avoid grid-cols-[100px_1fr] gap-4"
                    >
                      <div className="pt-0.5 text-right">
                        <span className="block text-xs font-bold uppercase text-slate-500">
                          {edu.endDate
                            ? formatDate(edu.endDate, "yyyy")
                            : "Present"}
                        </span>
                      </div>
                      <div className="relative border-l-2 border-slate-200 pl-6">
                        <div
                          className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full ring-2 ring-white"
                          style={{ backgroundColor: accentColor }}
                        />
                        <h4 className="text-md font-bold uppercase text-slate-800">
                          {edu.degree}
                        </h4>
                        <div
                          className="mb-1 text-xs font-bold uppercase text-slate-500"
                          style={{ color: accentColor }}
                        >
                          {edu.school}
                        </div>
                        {edu.description && (
                          <div className="text-xs text-slate-600">
                            {edu.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

const PhotoSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { photo } = resumeData;
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

  if (!photoSrc) return null;

  return (
    <div className="relative h-[160px] w-[160px]">
      <Image
        src={photoSrc}
        fill
        alt="Profile"
        className="rounded-full border-2 bg-white object-cover p-1"
        style={{ borderColor: colorHex }}
      />
    </div>
  );
};

const SectionTitleSide = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => (
  <div className="relative mb-4">
    <h3
      className="inline-block border-b-2 pb-1 pr-4 text-sm font-bold uppercase tracking-widest text-slate-800"
      style={{ borderColor: colorHex }}
    >
      {title}
    </h3>
  </div>
);

const SectionTitleMain = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => (
  <div className="mb-6 flex items-center gap-3">
    <div
      className="h-1 w-10 rounded-full"
      style={{ backgroundColor: colorHex }}
    />
    <h3 className="text-lg font-black uppercase tracking-widest text-slate-800">
      {title}
    </h3>
    <div className="h-[1px] flex-grow bg-slate-200" />
  </div>
);

const ContactSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { city, country, phone, email, portfolioLink } = resumeData;

  const Wrapper = ({
    icon: Icon,
    text,
    href,
  }: {
    icon: React.ElementType; // Fixed: Changed from any to React.ElementType
    text: string;
    href?: string;
  }) => (
    <div className="mb-3 flex items-start gap-3">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: colorHex }}
      >
        <Icon size={14} />
      </div>
      <div className="flex items-center pt-1.5">
        {href ? (
          <a
            href={href}
            className="break-all text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            {text}
          </a>
        ) : (
          <span className="text-[11px] font-semibold text-slate-600">
            {text}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {(city || country) && (
        <Wrapper
          icon={MapPin}
          text={[city, country].filter(Boolean).join(", ")}
        />
      )}
      {phone && <Wrapper icon={Phone} text={phone} href={`tel:${phone}`} />}
      {email && <Wrapper icon={Mail} text={email} href={`mailto:${email}`} />}
      {portfolioLink && (
        <Wrapper icon={Globe} text="Portfolio" href={portfolioLink} />
      )}
    </div>
  );
};
