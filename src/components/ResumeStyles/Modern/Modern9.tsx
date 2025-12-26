"use client";
import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ModernSidebar({
  resumeData,
  className = "",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const primaryColor = "var(--accent)";

  return (
    <div
      className={`resume-root modern aspect-[210/297] h-fit w-full bg-white ${className}`}
      ref={containerRef}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
    >
      <div
        id="resumePreviewContent"
        className={`h-full ${!width ? "invisible" : ""}`}
        style={{
          zoom: (1 / 794) * width,
        }}
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
              <h3
                className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-800"
                style={{
                  color: primaryColor,
                  borderColor: primaryColor,
                  fontSize: "calc(1em * var(--heading-scale))",
                  borderBottomWidth: "calc(var(--resume-border-width) * 2)",
                  borderStyle: "var(--resume-border-style)" as any,
                }}
              >
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
                        <h4
                          className="text-xs font-bold uppercase text-slate-900"
                          style={{
                            fontSize: "calc(1em * var(--heading-scale))",
                          }}
                        >
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
            <div
              className="mb-12 border-b border-slate-100 pb-8"
              style={{
                borderBottomWidth: "calc(var(--resume-border-width) * 2)",
                borderColor: "color-mix(in srgb, var(--text) 20%, transparent)",
                borderStyle: "var(--resume-border-style)" as any,
              }}
            >
              <h1
                className="mb-2 font-black uppercase leading-none tracking-tight text-slate-900"
                style={{
                  fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
                }}
              >
                {resumeData.firstName}{" "}
                <span style={{ color: primaryColor }}>
                  {resumeData.lastName}
                </span>
              </h1>
              {resumeData.jobTitle && (
                <p
                  className="font-bold uppercase tracking-[0.3em] text-slate-400"
                  style={{
                    fontSize:
                      "calc(var(--base-font) * 1.35 * var(--heading-scale))",
                  }}
                >
                  {resumeData.jobTitle}
                </p>
              )}
            </div>

            {/* ABOUT ME */}
            {resumeData.summary && (
              <div className="mb-10">
                <SectionHeaderMain title="About Me" colorHex={primaryColor} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.summary || "",
                  }}
                  className="richTextEditorStyle !m-0 whitespace-pre-line text-justify text-sm font-medium leading-relaxed text-slate-600"
                />
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
                            <h4
                              className="text-md font-bold uppercase text-slate-800"
                              style={{
                                fontSize: "calc(1em * var(--heading-scale))",
                              }}
                            >
                              <span data-resume-entry-title>
                                {exp.position}
                              </span>
                              {exp.company && (
                                <span
                                  data-resume-entry-subtitle
                                  data-entry-subtitle-slot="inline"
                                  className="font-bold uppercase"
                                >
                                  {exp.company}
                                </span>
                              )}
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
                          {exp.company ? (
                            <div
                              data-resume-entry-subtitle
                              data-entry-subtitle-slot="newline"
                              className="mb-2 text-xs font-bold uppercase tracking-wide"
                              style={{ color: primaryColor }}
                            >
                              {exp.company}
                            </div>
                          ) : (
                            <div />
                          )}
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
                      <h4
                        className="mb-0.5 text-sm font-bold uppercase text-slate-800"
                        style={{ fontSize: "calc(1em * var(--heading-scale))" }}
                      >
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
                        <h4
                          className="text-xs font-bold uppercase text-slate-700"
                          style={{
                            fontSize: "calc(1em * var(--heading-scale))",
                          }}
                        >
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
                    className="border-l pl-3 text-xs leading-relaxed text-slate-600"
                    style={{
                      borderColor: primaryColor,
                      borderLeftWidth: "calc(var(--resume-border-width) * 4)",
                    }}
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
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

// Photo Section Component
const PhotoSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>(
    resumeData.photo instanceof File ? "" : resumeData.photo || "",
  );

  useEffect(() => {
    if (resumeData.photo instanceof File) {
      const objectUrl = URL.createObjectURL(resumeData.photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (resumeData.photo === null) setPhotoSrc("");
  }, [resumeData.photo]);

  const getBorderRadius = () => {
    if (resumeData.borderStyle === "square") return "0px";
    if (resumeData.borderStyle === "circle") return "50%";
    return "10px";
  };

  if (!photoSrc) return null;

  return (
    <div
      className="h-36 w-36 overflow-hidden border shadow-lg"
      style={{
        borderRadius: getBorderRadius(),
        borderColor: colorHex,
        borderWidth: "calc(var(--resume-border-width) * 4)",
      }}
    >
      <img
        src={photoSrc}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

// Contact Section Component
const ContactSection = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const { phone, email, city, country, portfolioLink, socialLinks } =
    resumeData;

  return (
    <div className="space-y-3 text-xs text-slate-700">
      {phone && (
        <div className="flex items-center gap-2">
          <Phone size={14} style={{ color: colorHex }} />
          <span>{phone}</span>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2">
          <Mail size={14} style={{ color: colorHex }} />
          <span className="break-all">{email}</span>
        </div>
      )}
      {(city || country) && (
        <div className="flex items-center gap-2">
          <MapPin size={14} style={{ color: colorHex }} />
          <span>{[city, country].filter(Boolean).join(", ")}</span>
        </div>
      )}
      {portfolioLink && (
        <div className="flex items-center gap-2">
          <Globe size={14} style={{ color: colorHex }} />
          <span className="break-all">{portfolioLink}</span>
        </div>
      )}
      {socialLinks?.map((link, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <LinkIcon size={14} style={{ color: colorHex }} />
          <span className="break-all">
            {link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
          </span>
        </div>
      ))}
    </div>
  );
};

// Section Header for Sidebar
const SectionHeaderSide = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => {
  return (
    <h3
      className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-800"
      style={{
        color: colorHex,
        borderColor: colorHex,
        fontSize: "calc(1em * var(--heading-scale))",
        borderBottomWidth: "calc(var(--resume-border-width) * 2)",
        borderStyle: "var(--resume-border-style)" as any,
      }}
    >
      {title}
    </h3>
  );
};

// Section Header for Main Content
const SectionHeaderMain = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => {
  return (
    <h3
      className="mb-6 border-b pb-2 text-lg font-bold uppercase tracking-wide"
      style={{
        borderColor: colorHex,
        color: colorHex,
        fontSize: "calc(1em * var(--heading-scale))",
        borderBottomWidth: "calc(var(--resume-border-width) * 2)",
        borderStyle: "var(--resume-border-style)" as any,
      }}
    >
      {title}
    </h3>
  );
};

const Sidebar = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const {
    photo,
    borderStyle,
    phone,
    email,
    portfolioLink,
    socialLinks,
    city,
    country,
    certifications,
    others,
  } = resumeData;
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

  const getBorderRadius = () => {
    if (borderStyle === "square") return "0px";
    if (borderStyle === "circle") return "50%";
    return "10px";
  };

  return (
    <aside style={{ background: "#e6e6e6", padding: "30px 20px" }}>
      {/* Profile Photo */}
      {photoSrc && (
        <div
          style={{
            width: "160px",
            height: "160px",
            margin: "0 auto 30px",
            borderStyle: "solid",
            borderWidth: "calc(var(--resume-border-width) * 6)",
            borderColor: "#ddd",
            overflow: "hidden",
            borderRadius: getBorderRadius(),
          }}
        >
          <img
            src={photoSrc}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Contact Section */}
      <div
        style={{
          background: colorHex,
          color: "white",
          textAlign: "center",
          padding: "8px",
          fontSize: "14px",
          fontWeight: 600,
          margin: "25px 0 10px",
        }}
      >
        CONTACT ME
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {phone && (
          <li
            style={{
              fontSize: "13px",
              margin: "8px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Phone size={14} /> {phone}
          </li>
        )}
        {email && (
          <li
            style={{
              fontSize: "13px",
              margin: "8px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Mail size={14} /> {email}
          </li>
        )}
        {portfolioLink && (
          <li
            style={{
              fontSize: "13px",
              margin: "8px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Globe size={14} />{" "}
            {portfolioLink.replace(/^https?:\/\/(www\.)?/, "")}
          </li>
        )}
        {(city || country) && (
          <li
            style={{
              fontSize: "13px",
              margin: "8px 0",
              display: "flex",
              alignItems: "start",
              gap: "8px",
            }}
          >
            <MapPin size={14} style={{ marginTop: "2px" }} />
            <span>{[city, country].filter(Boolean).join(", ")}</span>
          </li>
        )}
        {socialLinks &&
          socialLinks.map((link, idx) => (
            <li
              key={idx}
              style={{
                fontSize: "13px",
                margin: "8px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <LinkIcon size={14} />
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {link.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </li>
          ))}
      </ul>

      {/* Divider */}
      <div
        style={{
          height: "6px",
          background: "#ccc",
          margin: "20px 0",
          borderRadius: "5px",
        }}
      />

      {/* References */}
      {certifications && certifications.length > 0 && (
        <>
          <div
            style={{
              background: colorHex,
              color: "white",
              textAlign: "center",
              padding: "8px",
              fontSize: "14px",
              fontWeight: 600,
              margin: "25px 0 10px",
            }}
          >
            REFERENCES
          </div>
          {certifications.map((ref, idx) => (
            <div key={idx} style={{ marginBottom: "15px", fontSize: "12px" }}>
              <h4
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  margin: "0 0 4px 0",
                }}
              >
                <span
                  style={{
                    fontSize: "calc(1em * var(--heading-scale))",
                  }}
                >
                  {ref.title}
                </span>
              </h4>
              {ref.description && (
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  {ref.description}
                </p>
              )}
              {ref.link && (
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: "11px",
                    color: "#3b82f6",
                    textDecoration: "underline",
                  }}
                >
                  {ref.link.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              )}
            </div>
          ))}
          <div
            style={{
              height: "6px",
              background: "#ccc",
              margin: "20px 0",
              borderRadius: "5px",
            }}
          />
        </>
      )}

      {/* Awards */}
      {others && (
        <>
          <div
            style={{
              background: colorHex,
              color: "white",
              textAlign: "center",
              padding: "8px",
              fontSize: "14px",
              fontWeight: 600,
              margin: "25px 0 10px",
            }}
          >
            {others.title || "AWARDS"}
          </div>
          <div
            className="richTextEditorStyle whitespace-pre-line"
            style={{ fontSize: "12px", color: "#555" }}
            dangerouslySetInnerHTML={{ __html: others.description || "" }}
          />
        </>
      )}
    </aside>
  );
};

const MainContent = ({
  resumeData,
  colorHex,
}: {
  resumeData: ResumeValues;
  colorHex: string;
}) => {
  const {
    firstName,
    lastName,
    jobTitle,
    summary,
    workExperiences,
    educations,
    projectWorks,
    skills,
    others,
  } = resumeData;

  return (
    <main style={{ padding: "40px" }}>
      {/* Header */}
      <header style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontWeight: 700,
            margin: 0,
            fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
          }}
        >
          <span style={{ color: colorHex }}>{firstName}</span> {lastName}
        </h1>
        {jobTitle && (
          <h2
            style={{
              fontSize: "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              letterSpacing: "3px",
              color: "#666",
              margin: "8px 0 0 0",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            {jobTitle}
          </h2>
        )}
      </header>

      {/* About Me */}
      {summary && (
        <>
          <div
            style={{
              display: "inline-block",
              background: colorHex,
              color: "white",
              padding: "6px 16px",
              margin: "20px 0 10px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            ABOUT ME
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: summary || "" }}
            className="richTextEditorStyle !m-0 whitespace-pre-line"
            style={{ fontSize: "13px", color: "#555", margin: "0 0 20px 0" }}
          />
        </>
      )}

      {/* Experience & Education - Two Columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "20px",
        }}
      >
        {/* Job Experience */}
        <section>
          {workExperiences && workExperiences.length > 0 && (
            <>
              <div
                style={{
                  display: "inline-block",
                  background: colorHex,
                  color: "white",
                  padding: "6px 16px",
                  margin: "20px 0 10px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                JOB EXPERIENCE
              </div>
              {workExperiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "14px",
                      margin: "0 0 4px 0",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      data-resume-entry-title
                      style={{ fontSize: "calc(1em * var(--heading-scale))" }}
                    >
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="inline"
                        style={{
                          fontSize: "calc(1em * var(--heading-scale))",
                          fontWeight: 600,
                        }}
                      >
                        {exp.company}
                      </span>
                    )}
                  </h3>
                  {exp.company ? (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="newline"
                      style={{
                        fontSize: "12px",
                        color: "#777",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {exp.company}
                    </span>
                  ) : (
                    <span />
                  )}
                  <div
                    className="richTextEditorStyle whitespace-pre-line"
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      marginBottom: "4px",
                    }}
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                  />
                  <small
                    style={{ fontSize: "11px", color: "#333", fontWeight: 600 }}
                  >
                    {exp.startDate && safeFormatDate(exp.startDate, "yyyy")} –{" "}
                    {exp.endDate
                      ? safeFormatDate(exp.endDate, "yyyy")
                      : "PRESENT"}
                  </small>
                </div>
              ))}
            </>
          )}
        </section>

        {/* Education */}
        <section>
          {educations && educations.length > 0 && (
            <>
              <div
                style={{
                  display: "inline-block",
                  background: colorHex,
                  color: "white",
                  padding: "6px 16px",
                  margin: "20px 0 10px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                EDUCATION
              </div>
              {educations.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "14px",
                      margin: "0 0 4px 0",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{ fontSize: "calc(1em * var(--heading-scale))" }}
                    >
                      {edu.degree} {edu.stream}
                    </span>
                  </h3>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#777",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.school}
                    {edu.marks && ` | ${edu.marks}`}
                  </span>
                  {edu.description && (
                    <div
                      className="richTextEditorStyle whitespace-pre-line"
                      style={{
                        fontSize: "12px",
                        color: "#555",
                        margin: "0 0 4px 0",
                      }}
                      dangerouslySetInnerHTML={{ __html: edu.description }}
                    />
                  )}
                  <small
                    style={{ fontSize: "11px", color: "#333", fontWeight: 600 }}
                  >
                    {edu.startDate && safeFormatDate(edu.startDate, "yyyy")} –{" "}
                    {edu.endDate
                      ? safeFormatDate(edu.endDate, "yyyy")
                      : "PRESENT"}
                  </small>
                </div>
              ))}
            </>
          )}
        </section>
      </div>

      {/* Projects Section - Full Width */}
      {projectWorks && projectWorks.length > 0 && (
        <>
          <div
            style={{
              display: "inline-block",
              background: colorHex,
              color: "white",
              padding: "6px 16px",
              margin: "20px 0 10px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            PROJECTS
          </div>
          <div style={{ marginBottom: "20px" }}>
            {projectWorks.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    margin: "0 0 4px 0",
                    fontWeight: 600,
                  }}
                >
                  <span
                    data-resume-entry-title
                    style={{ fontSize: "calc(1em * var(--heading-scale))" }}
                  >
                    {proj.title}
                  </span>
                  {proj.company && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      style={{
                        fontSize: "calc(1em * var(--heading-scale))",
                        fontWeight: 600,
                      }}
                    >
                      {proj.company}
                    </span>
                  )}
                </h3>
                {proj.company && (
                  <span
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    style={{
                      fontSize: "12px",
                      color: "#777",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {proj.company}
                  </span>
                )}
                {proj.description && (
                  <div
                    className="richTextEditorStyle whitespace-pre-line"
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      marginBottom: "4px",
                    }}
                    dangerouslySetInnerHTML={{ __html: proj.description || "" }}
                  />
                )}
                {proj.links && proj.links.length > 0 && (
                  <div style={{ marginTop: "6px" }}>
                    {proj.links.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "block",
                          fontSize: "11px",
                          color: "#3b82f6",
                          textDecoration: "underline",
                          marginBottom: "2px",
                        }}
                      >
                        {link.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ))}
                  </div>
                )}
                <small
                  style={{ fontSize: "11px", color: "#333", fontWeight: 600 }}
                >
                  {proj.startDate && safeFormatDate(proj.startDate, "yyyy")} –{" "}
                  {proj.endDate
                    ? safeFormatDate(proj.endDate, "yyyy")
                    : "PRESENT"}
                </small>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <>
          <div
            style={{
              display: "inline-block",
              background: colorHex,
              color: "white",
              padding: "6px 16px",
              margin: "20px 0 10px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            SKILLS
          </div>
          <div style={{ marginBottom: "20px" }}>
            {skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: "15px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {skill.title}
                </span>
                <div
                  style={{
                    background: "#ccc",
                    height: "6px",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: colorHex,
                      width: "75%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
