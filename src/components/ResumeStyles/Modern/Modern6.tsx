"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern6({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const accentColor = "var(--accent)";

  return (
    <div
      className={cn(
        "resume-root modern aspect-[210/297] h-fit w-full bg-white font-sans shadow-sm",
        className,
      )}
      ref={containerRef}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
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
        <div
          data-resume-header
          className="py-0.20 relative mb-8 flex items-center rounded-md px-6"
          style={{
            backgroundColor: "color-mix(in srgb, var(--text) 10%, transparent)",
          }}
        >
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
            <h1
              className="leading-tight"
              style={{
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
                fontWeight: "var(--name-font-weight)",
                color: "var(--text)",
              }}
            >
              {resumeData.firstName}{" "}
              <span
                style={{
                  color: "color-mix(in srgb, var(--text) 75%, transparent)",
                }}
              >
                {resumeData.lastName}
              </span>
            </h1>
            {resumeData.jobTitle && (
              <p
                className="mt-1 font-medium"
                style={{
                  fontSize:
                    "calc(var(--base-font) * 1.35 * var(--heading-scale))",
                  color: "color-mix(in srgb, var(--text) 70%, transparent)",
                }}
              >
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
              <div data-resume-personal-details>
                <ContactSection
                  resumeData={resumeData}
                  colorHex={accentColor}
                />
              </div>
            </div>

            {/* Expertise */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <SectionTitle title="Expertise" colorHex={accentColor} />
                <ul className="ml-1 list-none space-y-2 text-sm">
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.summary || "",
                  }}
                  className="richTextEditorStyle !m-0 whitespace-pre-line text-sm"
                />
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
                  className="richTextEditorStyle whitespace-pre-line pt-1 text-sm"
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
                      <div key={idx} className="break-inside-avoid">
                        <div className="mb-1 flex items-baseline justify-between">
                          <h4
                            className="text-lg font-bold"
                            style={{ color: "var(--text)" }}
                          >
                            <span data-resume-entry-title>{exp.position}</span>
                            {exp.company && (
                              <span
                                data-resume-entry-subtitle
                                data-entry-subtitle-slot="inline"
                                className="font-semibold"
                              >
                                {exp.company}
                              </span>
                            )}
                          </h4>
                          <span
                            className="text-sm font-semibold"
                            style={{
                              color:
                                "color-mix(in srgb, var(--text) 65%, transparent)",
                            }}
                          >
                            {exp.startDate &&
                              safeFormatDate(exp.startDate, "yyyy")}{" "}
                            -{" "}
                            {exp.endDate
                              ? safeFormatDate(exp.endDate, "yyyy")
                              : "Present"}
                          </span>
                        </div>
                        <div
                          className="flex justify-between text-sm"
                          style={{
                            color:
                              "color-mix(in srgb, var(--text) 70%, transparent)",
                          }}
                        >
                          {exp.company ? (
                            <span
                              data-resume-entry-subtitle
                              data-entry-subtitle-slot="newline"
                              className="font-semibold"
                            >
                              {exp.company}
                            </span>
                          ) : (
                            <span />
                          )}
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
                      <div className="flex justify-between text-sm">
                        <span
                          className="font-semibold"
                          style={{
                            color:
                              "color-mix(in srgb, var(--text) 75%, transparent)",
                          }}
                        >
                          {proj.startDate &&
                            safeFormatDate(proj.startDate, "yyyy")}{" "}
                          -{" "}
                          {proj.endDate
                            ? safeFormatDate(proj.endDate, "yyyy")
                            : "Present"}
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          <span data-resume-entry-title>{proj.title}</span>
                          {proj.company && (
                            <span
                              data-resume-entry-subtitle
                              data-entry-subtitle-slot="inline"
                              className="font-normal"
                            >
                              {proj.company}
                            </span>
                          )}
                        </span>
                      </div>
                      <div
                        className="flex justify-between text-sm"
                        style={{
                          color:
                            "color-mix(in srgb, var(--text) 70%, transparent)",
                        }}
                      >
                        {proj.company ? (
                          <span
                            data-resume-entry-subtitle
                            data-entry-subtitle-slot="newline"
                            className="font-normal"
                          >
                            {proj.company}
                          </span>
                        ) : null}
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
                        <div
                          className="mt-1 text-xs"
                          style={{
                            color:
                              "color-mix(in srgb, var(--text) 65%, transparent)",
                          }}
                        >
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
                    <div key={idx} className="break-inside-avoid">
                      <div className="mb-1 flex items-baseline justify-between">
                        <h4
                          className="text-lg font-bold"
                          style={{ color: "var(--text)" }}
                        >
                          {edu.degree}
                        </h4>
                        <span
                          className="text-sm font-semibold"
                          style={{
                            color:
                              "color-mix(in srgb, var(--text) 65%, transparent)",
                          }}
                        >
                          {edu.startDate &&
                            safeFormatDate(edu.startDate, "yyyy")}{" "}
                          -{" "}
                          {edu.endDate
                            ? safeFormatDate(edu.endDate, "yyyy")
                            : "Present"}
                        </span>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          {edu.degree}
                        </span>
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{
                          color:
                            "color-mix(in srgb, var(--text) 70%, transparent)",
                        }}
                      >
                        {edu.school}
                        {edu.marks && ` | ${edu.marks}`}
                      </div>
                      {edu.description && (
                        <div
                          className="richTextEditorStyle mt-1 text-sm leading-snug"
                          style={{
                            color:
                              "color-mix(in srgb, var(--text) 70%, transparent)",
                          }}
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
                  <div className="flex flex-wrap gap-3 text-[0.9rem]">
                    {resumeData.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="min-w-[45%] flex-1 break-words"
                        style={{ wordBreak: "break-word" }}
                      >
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          {cert.title}
                        </p>
                        {cert.description && (
                          <p
                            className="leading-tight"
                            style={{
                              color:
                                "color-mix(in srgb, var(--text) 70%, transparent)",
                            }}
                          >
                            {cert.description}
                          </p>
                        )}
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            className="break-all text-xs hover:underline"
                            style={{ color: "var(--accent)" }}
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
    data-resume-section-heading
    className="mb-3 border-b-[2px] pb-1 text-[1rem] font-bold tracking-wide"
    style={{
      color: colorHex,
      borderColor: "color-mix(in srgb, var(--text) 30%, transparent)",
      borderBottomWidth: "calc(var(--resume-border-width) * 2)",
      borderStyle: "var(--resume-border-style)" as any,
      fontSize: "calc(1em * var(--heading-scale))",
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
    <div
      className="flex items-center gap-3 text-sm"
      style={{ color: "color-mix(in srgb, var(--text) 75%, transparent)" }}
    >
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
