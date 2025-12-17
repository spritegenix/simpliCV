"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { format } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern6({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const accentColor = "#f59e0b"; // orange

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white font-sans text-slate-800 shadow-sm",
        className,
      )}
      ref={containerRef}
    >
      <div
        id="resumePreviewContent"
        className={cn(
          "relative h-full origin-top scale-[0.85] transform overflow-visible px-10 pb-2",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        {/* HEADER */}
        <div className="py-0.20 relative mb-8 flex items-center rounded-md bg-[#E5E5E5] px-6">
          {/* Left Diamond Photo */}
          <div className="relative -ml-4 h-[160px] w-[160px]">
            {/* Outer diamond border */}
            <div className="absolute inset-0 flex -rotate-45 items-center justify-center rounded-md bg-white">
              {/* Inner diamond */}
              <div className="flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-md bg-white">
                {/* Image wrapper: counter‑rotate and scale up so sides aren’t clipped */}
                <div className="rotate-45 scale-[1.45]">
                  {resumeData.photo && <PhotoSection resumeData={resumeData} />}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Name + Role */}
          <div className="ml-16">
            <h1 className="text-5xl font-bold text-slate-900">
              {resumeData.firstName}{" "}
              <span className="font-light text-slate-600">
                {resumeData.lastName}
              </span>
            </h1>
            {resumeData.jobTitle && (
              <p className="mt-1 text-xl font-medium text-slate-500">
                {resumeData.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid h-full grid-cols-[40%_1fr] gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Contact */}
            <div>
              <SectionTitle title="Contact Me" colorHex={accentColor} />
              <ContactSection resumeData={resumeData} colorHex={accentColor} />
            </div>

            {/* Expertise */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <SectionTitle title="Expertise" colorHex={accentColor} />
                <ul className="ml-1 list-none space-y-2 text-sm text-slate-700">
                  {resumeData.skills.map((skill, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{skill.title}:</span>{" "}
                      {skill.skillName?.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Professional Summary */}
            {resumeData.summary && (
              <div>
                <SectionTitle
                  title="Professional Summary"
                  colorHex={accentColor}
                />
                <div className="whitespace-pre-line text-sm text-slate-700">
                  {resumeData.summary}
                </div>
              </div>
            )}

            {/* Interests or “Others” Section — Same logic as ATS2 */}
            {!!resumeData.others?.title && (
              <div className="break-inside-avoid">
                <SectionTitle
                  title={resumeData.others.title}
                  colorHex={accentColor}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.others.description || "",
                  }}
                  className="richTextEditorStyle whitespace-pre-line pt-1 text-sm text-slate-700"
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Experience */}
            {resumeData.workExperiences &&
              resumeData.workExperiences.length > 0 && (
                <div>
                  <SectionTitle title="Experience" colorHex={accentColor} />
                  <div className="space-y-4">
                    {resumeData.workExperiences.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm text-slate-700">
                          <span className="font-semibold">
                            {exp.startDate &&
                              format(new Date(exp.startDate), "yyyy")}{" "}
                            -{" "}
                            {exp.endDate
                              ? format(new Date(exp.endDate), "yyyy")
                              : "Present"}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {exp.position}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>{exp.company}</span>
                          {exp.description && (
                            <span
                              className="max-w-[60%] text-justify leading-snug"
                              dangerouslySetInnerHTML={{
                                __html: exp.description,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Projects */}
            {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
              <div>
                <SectionTitle title="Projects" colorHex={accentColor} />
                <div className="space-y-4">
                  {resumeData.projectWorks.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm text-slate-700">
                        <span className="font-semibold">
                          {proj.startDate &&
                            format(new Date(proj.startDate), "yyyy")}{" "}
                          -{" "}
                          {proj.endDate
                            ? format(new Date(proj.endDate), "yyyy")
                            : "Present"}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {proj.title}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>{proj.company}</span>
                        {proj.description && (
                          <span
                            className="max-w-[60%] text-justify leading-snug"
                            dangerouslySetInnerHTML={{
                              __html: proj.description,
                            }}
                          />
                        )}
                      </div>
                      {proj.links && proj.links.length > 0 && (
                        <div className="mt-1 text-xs text-slate-500">
                          {proj.links.map((link, i) => (
                            <a
                              key={i}
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="block hover:underline"
                            >
                              {link.replace(/^https?:\/\/(www\.)?/, "")}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.educations && resumeData.educations.length > 0 && (
              <div>
                <SectionTitle title="Education" colorHex={accentColor} />
                <div className="space-y-4">
                  {resumeData.educations.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm text-slate-700">
                        <span className="font-semibold">
                          {edu.startDate &&
                            format(new Date(edu.startDate), "yyyy")}{" "}
                          -{" "}
                          {edu.endDate
                            ? format(new Date(edu.endDate), "yyyy")
                            : "Present"}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {edu.degree}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-slate-600">
                        {edu.school}
                        {edu.marks && ` | ${edu.marks}`}
                      </div>
                      {edu.description && (
                        <div
                          className="richTextEditorStyle mt-1 text-sm leading-snug text-slate-600"
                          dangerouslySetInnerHTML={{
                            __html: edu.description,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {resumeData.certifications &&
              resumeData.certifications.length > 0 && (
                <div className="pt-4">
                  <SectionTitle title="Certificates" colorHex={accentColor} />
                  <div className="flex flex-wrap gap-3 text-[0.9rem] text-slate-700">
                    {resumeData.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="min-w-[45%] flex-1 break-words"
                        style={{ wordBreak: "break-word" }}
                      >
                        <p className="font-semibold text-slate-900">
                          {cert.title}
                        </p>
                        {cert.description && (
                          <p className="leading-tight text-slate-600">
                            {cert.description}
                          </p>
                        )}
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all text-xs text-blue-600 hover:underline"
                          >
                            {cert.link.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        )}
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
// SUBCOMPONENTS
// ----------------------------------------------------------------------

const PhotoSection = ({ resumeData }: { resumeData: ResumeValues }) => {
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

  if (!photoSrc) return null;

  return (
    <div className="relative">
      <img
        src={photoSrc}
        width={180}
        height={180}
        alt="Profile"
        className="object-cover shadow-md"
        style={{
          width: "180px",
          height: "180px",
          borderRadius:
            borderStyle === BorderStyles.SQUARE
              ? "0px"
              : borderStyle === BorderStyles.CIRCLE
                ? "50%"
                : "6px",
        }}
      />
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
  <div
    className="mb-3 border-b-[2px] pb-1 text-[1rem] font-bold uppercase tracking-wide"
    style={{
      borderColor: "#1f2937", // dark gray (almost black)
      color: colorHex,
    }}
  >
    {title}
  </div>
);

const ContactSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { city, country, phone, email, portfolioLink, socialLinks } =
    resumeData;

  const IconText = ({
    icon,
    text,
    href,
  }: {
    icon: React.ReactNode;
    text: string;
    href?: string;
  }) => (
    <div className="flex items-center gap-3 text-sm text-slate-700">
      <span className="text-[16px]" style={{ color: colorHex }}>
        {icon}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-2">
      {phone && (
        <IconText
          icon={<Phone size={14} />}
          text={phone}
          href={`tel:${phone}`}
        />
      )}
      {email && (
        <IconText
          icon={<Mail size={14} />}
          text={email}
          href={`mailto:${email}`}
        />
      )}
      {portfolioLink && (
        <IconText
          icon={<Globe size={14} />}
          text={portfolioLink}
          href={portfolioLink}
        />
      )}
      {(city || country) && (
        <IconText
          icon={<MapPin size={14} />}
          text={[city, country].filter(Boolean).join(", ")}
        />
      )}
      {socialLinks &&
        socialLinks.length > 0 &&
        socialLinks.map((link, index) => (
          <IconText
            key={index}
            icon={<LinkIcon size={14} />}
            text={link.replace(/^https?:\/\/(www\.)?/, "")}
            href={link}
          />
        ))}
    </div>
  );
};
