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

export default function Modern7({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default colors based on "Purple Gradient" description
  // Interactive accent color fallback
  const accentColor =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#7c3aed" // Violet-600
      : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-slate-50 text-slate-800 shadow-sm",
        className,
      )}
      ref={containerRef}
    >
      {/* Inject Montserrat Font */}
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
        {/* HEADER SECTION */}
        <div className="relative h-[220px] w-full overflow-hidden">
          {/* Diagonal Background Shape */}
          <div
            className="absolute inset-0 z-0 h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #4c1d95 100%)`, // Gradient to dark purple
              clipPath: "polygon(0 0, 100% 0, 100% 75%, 0% 100%)",
            }}
          />

          {/* Name & Title Content */}
          <div className="relative z-10 flex h-full flex-col items-end justify-center px-12 pb-10 text-white">
            <h1 className="mb-1 text-right text-3xl font-extrabold uppercase tracking-widest">
              {resumeData.firstName}{" "}
              <span className="font-light">{resumeData.lastName}</span>
            </h1>
            {resumeData.jobTitle && (
              <p className="text-right text-sm font-medium uppercase tracking-[0.2em] opacity-90">
                {resumeData.jobTitle}
              </p>
            )}
          </div>

          {/* Photo Circle - Overlapping */}
          <div className="absolute left-[40px] top-[40px] z-20">
            <PhotoSection resumeData={resumeData} />
          </div>
        </div>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid h-full min-h-[850px] grid-cols-[300px_1fr] items-stretch">
          {/* LEFT COLUMN - Sidebar */}
          <div className="space-y-10 bg-white py-10 pl-10 pr-6 pt-20">
            {/* ABOUT ME */}
            {resumeData.summary && (
              <div className="relative">
                <SectionTitleSide title="About Me" colorHex={accentColor} />
                <p className="text-justify text-xs font-medium leading-relaxed text-slate-600">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* CONTACT */}
            <div>
              <SectionTitleSide title="Contact" colorHex={accentColor} />
              <ContactSection resumeData={resumeData} colorHex={accentColor} />
            </div>

            {/* EXPERTISE/SKILLS (Sidebar Style) */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <SectionTitleSide title="Skills" colorHex={accentColor} />
                <div className="space-y-4">
                  {resumeData.skills.map((skill, idx) => (
                    <div key={idx}>
                      <h4 className="mb-1 text-xs font-bold uppercase text-slate-800">
                        {skill.title}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {skill.skillName?.map((item, i) => (
                          <span
                            key={i}
                            className="rounded-sm bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERENCES (Mapping Certs as placeholder if needed, or explicitly References) */}
            {resumeData.certifications &&
              resumeData.certifications.length > 0 && (
                <div>
                  <SectionTitleSide title="References" colorHex={accentColor} />
                  <div className="space-y-4">
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={idx}>
                        <h4 className="text-[11px] font-bold uppercase text-slate-800">
                          {cert.title}
                        </h4>
                        {cert.description && (
                          <p className="text-[10px] text-slate-500">
                            {cert.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* RIGHT COLUMN - Main Content */}
          <div className="space-y-10 bg-slate-50 px-10 py-10">
            {/* WORK EXPERIENCE */}
            {resumeData.workExperiences &&
              resumeData.workExperiences.length > 0 && (
                <div>
                  <SectionTitleMain
                    title="Work Experience"
                    colorHex={accentColor}
                  />
                  <div className="ml-1 space-y-8 border-l-2 border-slate-200 pl-2">
                    {resumeData.workExperiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className="relative break-inside-avoid pl-6"
                      >
                        {/* Timeline Dot */}
                        <div
                          className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: accentColor }}
                        />

                        <div className="mb-1 flex items-baseline justify-between">
                          <h4 className="text-md font-bold uppercase tracking-tight text-slate-800">
                            {exp.position}
                          </h4>
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                            style={{ backgroundColor: accentColor }}
                          >
                            {exp.startDate && formatDate(exp.startDate, "yyyy")}{" "}
                            -{" "}
                            {exp.endDate
                              ? formatDate(exp.endDate, "yyyy")
                              : "Present"}
                          </span>
                        </div>
                        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                          {exp.company}
                        </div>

                        <div
                          className="text-justify text-xs leading-relaxed text-slate-600"
                          dangerouslySetInnerHTML={{
                            __html: exp.description || "",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* EDUCATION */}
            {resumeData.educations && resumeData.educations.length > 0 && (
              <div>
                <SectionTitleMain title="Education" colorHex={accentColor} />
                <div className="ml-1 space-y-6 border-l-2 border-slate-200 pl-2">
                  {resumeData.educations.map((edu, idx) => (
                    <div key={idx} className="relative break-inside-avoid pl-6">
                      <div
                        className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: accentColor }}
                      />

                      <div className="mb-1 flex items-baseline justify-between">
                        <h4 className="text-md font-bold uppercase text-slate-800">
                          {edu.degree}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-500">
                          {edu.startDate && formatDate(edu.startDate, "yyyy")} -{" "}
                          {edu.endDate
                            ? formatDate(edu.endDate, "yyyy")
                            : "Present"}
                        </span>
                      </div>
                      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                        {edu.school}
                      </div>
                      {edu.description && (
                        <div className="text-xs text-slate-600">
                          {edu.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOFTWARE / OTHERS (Using 'Others' for Software list if needed) */}
            {resumeData.others &&
              (resumeData.others.title || resumeData.others.description) && (
                <div>
                  <SectionTitleMain
                    title={resumeData.others.title || "Software"}
                    colorHex={accentColor}
                  />
                  <div
                    className="whitespace-pre-line text-xs leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: resumeData.others.description || "",
                    }}
                  />
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

const PhotoSection = ({ resumeData }: { resumeData: ResumeValues }) => {
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
    <div className="relative h-[180px] w-[180px]">
      <Image
        src={photoSrc}
        fill
        alt="Profile"
        className="rounded-full border-[6px] border-white object-cover shadow-lg"
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
  <div className="mb-4">
    <h3 className="mb-1 text-sm font-black uppercase tracking-widest text-slate-800">
      {title}
    </h3>
    <div
      className="h-1 w-10 rounded-full"
      style={{ backgroundColor: colorHex }}
    />
  </div>
);

const SectionTitleMain = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => (
  <div className="mb-6 flex items-center gap-4">
    <div className="h-8 w-2 rounded-sm" style={{ backgroundColor: colorHex }} />
    <h3 className="text-xl font-black uppercase tracking-widest text-slate-800">
      {title}
    </h3>
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
  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
      style={{ backgroundColor: colorHex }}
    >
      {children}
    </div>
  );

  return (
    <div className="space-y-4">
      {(city || country) && (
        <div className="flex items-center gap-3">
          <IconWrapper>
            <MapPin size={12} />
          </IconWrapper>
          <span className="text-[11px] font-semibold text-slate-600">
            {[city, country].filter(Boolean).join(", ")}
          </span>
        </div>
      )}
      {phone && (
        <div className="flex items-center gap-3">
          <IconWrapper>
            <Phone size={12} />
          </IconWrapper>
          <a
            href={`tel:${phone}`}
            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            {phone}
          </a>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-3">
          <IconWrapper>
            <Mail size={12} />
          </IconWrapper>
          <a
            href={`mailto:${email}`}
            className="break-all text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            {email}
          </a>
        </div>
      )}
      {portfolioLink && (
        <div className="flex items-center gap-3">
          <IconWrapper>
            <Globe size={12} />
          </IconWrapper>
          <a
            href={portfolioLink}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            Portfolio
          </a>
        </div>
      )}
      {socialLinks?.map((link, index) => (
        <div key={index} className="flex items-center gap-3">
          <IconWrapper>
            <LinkIcon size={12} />
          </IconWrapper>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            {link.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </div>
      ))}
    </div>
  );
};
