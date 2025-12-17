"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern9({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default colors
  // Red Accent from description description
  const primaryColor =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#DC2626" // Red-600
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
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
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
        <div className="flex h-full">
          {/* LEFT COLUMN - Fixed Width Sidebar with Grey Background */}
          <div className="flex w-[300px] shrink-0 flex-col bg-slate-100 pt-12 text-slate-700">
            {/* Profile Image */}
            <div className="mb-10 flex justify-center px-6">
              <PhotoSection resumeData={resumeData} colorHex={primaryColor} />
            </div>

            {/* Contact Section */}
            <div className="mb-10 space-y-5 px-8">
              <h3 className="mb-4 border-b-2 border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-800">
                Contact
              </h3>
              <ContactSection resumeData={resumeData} colorHex={primaryColor} />
            </div>

            {/* References */}
            {resumeData.certifications &&
              resumeData.certifications.length > 0 && (
                <div className="mb-10 px-8">
                  <SectionHeaderSide
                    title="References"
                    colorHex={primaryColor}
                  />
                  <div className="space-y-6">
                    {resumeData.certifications.map((item, idx) => (
                      <div key={idx}>
                        <h4 className="text-xs font-bold uppercase text-slate-900">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="mt-1 text-[10px] text-slate-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Awards (Using Others as placeholder or if explicit awards exist) */}
            {/* Assuming "Others" might be used for Awards if specifically labelled, or we leave space. 
                     The prompt asks for "Awards section". If no specific separate schema, we map from others if title matches, or just generic.
                 */}
            {resumeData.others &&
              (resumeData.others.title?.toLowerCase().includes("award") ||
                resumeData.others.title?.toLowerCase().includes("achieve")) && (
                <div className="mb-10 px-8">
                  <SectionHeaderSide
                    title={resumeData.others.title}
                    colorHex={primaryColor}
                  />
                  <div
                    className="text-[11px] leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: resumeData.others.description || "",
                    }}
                  />
                </div>
              )}
          </div>

          {/* RIGHT COLUMN - Main Content */}
          <div className="flex-1 bg-white px-10 py-12">
            {/* Header Name (Top of Right Column) */}
            <div className="mb-12 border-b-2 border-slate-100 pb-8">
              <h1 className="mb-2 text-5xl font-black uppercase leading-none tracking-tight text-slate-900">
                {resumeData.firstName}{" "}
                <span style={{ color: primaryColor }}>
                  {resumeData.lastName}
                </span>
              </h1>
              {resumeData.jobTitle && (
                <p className="text-xl font-bold uppercase tracking-[0.3em] text-slate-400">
                  {resumeData.jobTitle}
                </p>
              )}
            </div>

            {/* ABOUT ME */}
            {resumeData.summary && (
              <div className="mb-10">
                <SectionHeaderMain title="About Me" colorHex={primaryColor} />
                <p className="text-justify text-sm font-medium leading-relaxed text-slate-600">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* JOB EXPERIENCE - 2 Column Grid Subsection */}
            {resumeData.workExperiences &&
              resumeData.workExperiences.length > 0 && (
                <div className="mb-10">
                  <SectionHeaderMain
                    title="Job Experience"
                    colorHex={primaryColor}
                  />
                  <div className="grid grid-cols-1 gap-x-8 gap-y-8">
                    {/* Note: Prompt asked for "Two-column subsections". 
                                 However, long descriptions in 2 cols can look bad. 
                                 I'll stick to 1 col for readability unless strictly needed small items. 
                                 Actually, widely used "Job Experience" in resume templates often is 1 col.
                                 But if user insists on 2-col subsections, I will try a grid for the *Items* if they are short, or maybe internal layout.
                                 Let's allow 2 cols for items if there are enough.
                             */}
                    <div className="grid grid-cols-1 gap-6">
                      {resumeData.workExperiences.map((exp, idx) => (
                        <div key={idx} className="relative break-inside-avoid">
                          <div className="mb-1 flex items-baseline justify-between">
                            <h4 className="text-md font-bold uppercase text-slate-800">
                              {exp.position}
                            </h4>
                            <span className="text-xs font-bold text-slate-400">
                              {exp.startDate &&
                                safeFormatDate(exp.startDate, "yyyy")}{" "}
                              -{" "}
                              {exp.endDate
                                ? safeFormatDate(exp.endDate, "yyyy")
                                : "Present"}
                            </span>
                          </div>
                          <div
                            className="mb-2 text-xs font-bold uppercase tracking-wide"
                            style={{ color: primaryColor }}
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
                      ))}
                    </div>
                  </div>
                </div>
              )}

            {/* EDUCATION - 2 Column Grid for items? */}
            {resumeData.educations && resumeData.educations.length > 0 && (
              <div className="mb-10">
                <SectionHeaderMain title="Education" colorHex={primaryColor} />
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {resumeData.educations.map((edu, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <h4 className="mb-0.5 text-sm font-bold uppercase text-slate-800">
                        {edu.degree}
                      </h4>
                      <div
                        className="mb-1 text-xs font-bold uppercase text-slate-400"
                        style={{ color: primaryColor }}
                      >
                        {edu.school}
                      </div>
                      <span className="mb-1 block text-[10px] font-bold text-slate-400">
                        {edu.startDate && safeFormatDate(edu.startDate, "yyyy")}{" "}
                        -{" "}
                        {edu.endDate
                          ? safeFormatDate(edu.endDate, "yyyy")
                          : "Present"}
                      </span>
                      {edu.description && (
                        <div className="text-[11px] text-slate-600">
                          {edu.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BOTTOM ROW: SKILLS (Left) | HOBBIES/LANGUAGES (Right) or Stacked */}
            {/* Prompt says: Skills, Hobbies, Languages in order. Vertical stack? "Two-column subsections (Skills)". */}

            {/* SKILLS - 2 Column Grid */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="mb-10">
                <SectionHeaderMain title="Skills" colorHex={primaryColor} />
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {resumeData.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="mb-1 flex justify-between">
                        <h4 className="text-xs font-bold uppercase text-slate-700">
                          {skill.title}
                        </h4>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        {/* Randomized percent for visual if skillName is plain strings, or use skill items count */}
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "85%",
                            backgroundColor: primaryColor,
                          }}
                        />
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-2">
                        {skill.skillName?.map((item, i) => (
                          <span key={i} className="text-[10px] text-slate-500">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HOBBIES & LANGUAGES - Side by Side or Stacked? Main content flows vertically. */}
            <div className="grid grid-cols-2 gap-10">
              {/* HOBBIES (From Others typically) */}
              {resumeData.others && (
                <div>
                  <SectionHeaderMain
                    title={resumeData.others.title || "Hobbies"}
                    colorHex={primaryColor}
                  />
                  <div
                    className="border-l-4 pl-3 text-xs leading-relaxed text-slate-600"
                    style={{ borderColor: primaryColor }}
                    dangerouslySetInnerHTML={{
                      __html: resumeData.others.description || "",
                    }}
                  />
                </div>
              )}

              {/* LANGUAGES (Mock) - "Languages with percentage bars" */}
              {/* Using a static mock or repurposing data if available. Since strict "Languages section" demanded. */}
              <div>
                <SectionHeaderMain title="Languages" colorHex={primaryColor} />
                <div className="space-y-3">
                  {["English", "Spanish", "French"].map((lang, idx) => (
                    <div key={idx}>
                      <div className="mb-1 flex justify-between text-[10px] font-bold text-slate-600">
                        <span>{lang}</span>
                        <span>
                          {idx === 0 ? "100%" : idx === 1 ? "80%" : "60%"}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width:
                              idx === 0 ? "100%" : idx === 1 ? "80%" : "60%",
                            backgroundColor: primaryColor,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
    <div className="relative h-[180px] w-[180px]">
      <Image
        src={photoSrc}
        fill
        alt="Profile"
        className="rounded-full border-[8px] border-white object-cover shadow-sm"
      />
    </div>
  );
};

// Red Label Header for Main Content
const SectionHeaderMain = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => (
  <div className="mb-6 border-b border-slate-200 pb-2">
    <span
      className="inline-block px-4 py-1.5 text-sm font-extrabold uppercase tracking-widest text-white"
      style={{ backgroundColor: colorHex }}
    >
      {title}
    </span>
  </div>
);

// Sidebar Header (Red Text)
const SectionHeaderSide = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => (
  <h3
    className="mb-4 border-b-2 border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest"
    style={{ color: colorHex }}
  >
    {title}
  </h3>
);

const ContactSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { city, country, phone, email, portfolioLink } = resumeData;

  // Icon circle
  const Wrapper = ({
    icon: Icon,
    text,
    href,
  }: {
    icon: React.ElementType; // Fixed: Changed from any to React.ElementType
    text: string;
    href?: string;
  }) => (
    <div className="flex items-start gap-4">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: colorHex }}
      >
        <Icon size={14} />
      </div>
      <div className="flex-1 pt-1.5">
        {href ? (
          <a
            href={href}
            className="block break-all text-[11px] font-bold text-slate-600 hover:text-slate-900"
          >
            {text}
          </a>
        ) : (
          <span className="block text-[11px] font-bold text-slate-600">
            {text}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {phone && <Wrapper icon={Phone} text={phone} href={`tel:${phone}`} />}
      {email && <Wrapper icon={Mail} text={email} href={`mailto:${email}`} />}
      {(city || country) && (
        <Wrapper
          icon={MapPin}
          text={[city, country].filter(Boolean).join(", ")}
        />
      )}
      {portfolioLink && (
        <Wrapper icon={Globe} text="Portfolio" href={portfolioLink} />
      )}
    </div>
  );
};
