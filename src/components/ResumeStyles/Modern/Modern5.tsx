"use client";
import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  dateFormat?: string;
}

// Define default section order
const DEFAULT_SECTION_ORDER = [
  "summary",
  "workExperiences",
  "projectWorks",
  "educations",
  "certifications",
  "skills",
  "others",
] as const;

// Helper to get section display order
// Future: This can be extended to read from resumeData.sectionOrder when that field is added
const getSectionOrder = (resumeData: ResumeValues): string[] => {
  // TODO: When resumeData.sectionOrder is added to schema, use it here:
  // if (resumeData.sectionOrder && resumeData.sectionOrder.length > 0) {
  //   return resumeData.sectionOrder;
  // }

  // For now, return default order
  return [...DEFAULT_SECTION_ORDER];
};

// Helper to check if section has content
const hasSectionContent = (
  resumeData: ResumeValues,
  sectionKey: string,
): boolean => {
  switch (sectionKey) {
    case "summary":
      return !!resumeData.summary;
    case "workExperiences":
      return (
        !!resumeData.workExperiences && resumeData.workExperiences.length > 0
      );
    case "projectWorks":
      return !!resumeData.projectWorks && resumeData.projectWorks.length > 0;
    case "educations":
      return !!resumeData.educations && resumeData.educations.length > 0;
    case "certifications":
      return (
        !!resumeData.certifications && resumeData.certifications.length > 0
      );
    case "skills":
      return !!resumeData.skills && resumeData.skills.length > 0;
    case "others":
      return !!resumeData.others?.title && !!resumeData.others?.description;
    default:
      return false;
  }
};

export default function ModernTimeline({
  resumeData,
  className = "",
  dateFormat = "MMM yyyy",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={`resume-root modern aspect-[210/297] h-fit w-full bg-white ${className}`}
      ref={containerRef}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
        fontFamily: "var(--resume-font-family)",
        lineHeight: "var(--resume-line-height)",
      }}
    >
      <div
        id="resumePreviewContent"
        className={`h-full ${!width ? "invisible" : ""}`}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <style>{`
          /* Modern 5 Font Hierarchy:
             - Heading: Poppins SemiBold/Bold
             - Subtitle: Poppins Medium
             - Body: Inter Regular (driven by --resume-font-family)
          */
          
          /* Section headings: Poppins Bold */
          #resumePreviewContent [data-resume-section-heading] {
            font-family: var(--font-poppins), var(--resume-font-family) !important;
            font-weight: 700 !important;
          }

          /* Entry titles: Poppins SemiBold */
          #resumePreviewContent [data-resume-entry-title] {
            font-family: var(--font-poppins), var(--resume-font-family) !important;
            font-weight: 600 !important;
          }

          /* Entry subtitles: Poppins Medium */
          #resumePreviewContent [data-resume-entry-subtitle] {
            font-family: var(--font-poppins), var(--resume-font-family) !important;
            font-weight: 500 !important;
          }

          /* Header name: Poppins Bold */
          #resumePreviewContent [data-resume-header] h1 {
            font-family: var(--font-poppins), var(--resume-font-family) !important;
            font-weight: 700 !important;
          }

          /* Body text uses Inter Regular via --resume-font-family */
        `}</style>

        <div style={{ padding: "40px 50px 60px 50px" }}>
          {/* Header */}
          <Header resumeData={resumeData} />

          {/* Divider */}
          <div
            style={{
              margin: "var(--section-gap) 0",
              height: "0px",
              borderTopWidth: "var(--resume-border-width)",
              borderStyle: "var(--resume-border-style)",
              borderColor: "var(--accent)",
            }}
          />

          {/* Content Sections - Dynamic ordering */}
          <div>
            {getSectionOrder(resumeData)
              .filter((sectionKey) => hasSectionContent(resumeData, sectionKey))
              .map((sectionKey, index) => {
                const isFirst = index === 0;

                // Render section based on key
                switch (sectionKey) {
                  case "summary":
                    return (
                      <Section
                        key="summary"
                        label="Profile"
                        isFirst={isFirst}
                        content={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: resumeData.summary || "",
                            }}
                            className="richTextEditorStyle !m-0 whitespace-pre-line"
                            style={{
                              color: "var(--text)",
                            }}
                          />
                        }
                      />
                    );

                  case "workExperiences":
                    return (
                      <Section
                        key="workExperiences"
                        label="Work Experience"
                        isFirst={isFirst}
                        content={
                          <>
                            {resumeData.workExperiences!.map((exp, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginBottom:
                                    idx < resumeData.workExperiences!.length - 1
                                      ? "30px"
                                      : 0,
                                }}
                              >
                                <h3
                                  style={{
                                    fontSize:
                                      "calc(1em * var(--heading-scale))",
                                    fontWeight: 600,
                                    margin: 0,
                                    marginBottom: "4px",
                                  }}
                                >
                                  <span data-resume-entry-title>
                                    {exp.position}
                                  </span>
                                  {exp.company && (
                                    <span
                                      data-resume-entry-subtitle
                                      data-entry-subtitle-slot="inline"
                                      style={{ fontWeight: 600 }}
                                    >
                                      {exp.company}
                                    </span>
                                  )}
                                </h3>
                                <span
                                  style={{
                                    display: "block",
                                    color:
                                      "color-mix(in srgb, var(--text) 70%, transparent)",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {exp.startDate &&
                                    safeFormatDate(exp.startDate, dateFormat)}{" "}
                                  -{" "}
                                  {exp.endDate
                                    ? safeFormatDate(exp.endDate, dateFormat)
                                    : "PRESENT"}
                                </span>
                                {exp.company && (
                                  <span
                                    data-resume-entry-subtitle
                                    data-entry-subtitle-slot="newline"
                                    style={{
                                      display: "block",
                                      fontSize: "12px",
                                      color:
                                        "color-mix(in srgb, var(--text) 70%, transparent)",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {exp.company}
                                  </span>
                                )}
                                {exp.description && (
                                  <div
                                    className="richTextEditorStyle whitespace-pre-line pl-[18px]"
                                    dangerouslySetInnerHTML={{
                                      __html: exp.description || "",
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </>
                        }
                      />
                    );

                  case "projectWorks":
                    return (
                      <Section
                        key="projectWorks"
                        label="Projects"
                        isFirst={isFirst}
                        content={
                          <>
                            {resumeData.projectWorks!.map((project, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginBottom:
                                    idx < resumeData.projectWorks!.length - 1
                                      ? "30px"
                                      : 0,
                                }}
                              >
                                <h3
                                  style={{
                                    fontSize:
                                      "calc(1em * var(--heading-scale))",
                                    fontWeight: 600,
                                    margin: 0,
                                    marginBottom: "4px",
                                  }}
                                >
                                  <span data-resume-entry-title>
                                    {project.title}
                                  </span>
                                  {project.company && (
                                    <span
                                      data-resume-entry-subtitle
                                      data-entry-subtitle-slot="inline"
                                      style={{ fontWeight: 600 }}
                                    >
                                      {project.company}
                                    </span>
                                  )}
                                </h3>
                                <span
                                  style={{
                                    display: "block",
                                    color:
                                      "color-mix(in srgb, var(--text) 70%, transparent)",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {project.startDate &&
                                    safeFormatDate(project.startDate, dateFormat)}{" "}
                                  -{" "}
                                  {project.endDate
                                    ? safeFormatDate(project.endDate, dateFormat)
                                    : "PRESENT"}
                                </span>
                                {project.company && (
                                  <span
                                    data-resume-entry-subtitle
                                    data-entry-subtitle-slot="newline"
                                    style={{
                                      display: "block",
                                      fontSize: "12px",
                                      color:
                                        "color-mix(in srgb, var(--text) 70%, transparent)",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {project.company}
                                  </span>
                                )}
                                {project.description && (
                                  <div
                                    className="richTextEditorStyle whitespace-pre-line pl-[18px]"
                                    dangerouslySetInnerHTML={{
                                      __html: project.description || "",
                                    }}
                                  />
                                )}
                                {project.links && project.links.length > 0 && (
                                  <div
                                    style={{
                                      marginTop: "8px",
                                      paddingLeft: "18px",
                                    }}
                                  >
                                    {project.links.map((link, i) => (
                                      <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                          display: "block",
                                          color: "var(--accent)",
                                          textDecoration: "underline",
                                          marginBottom: "2px",
                                        }}
                                      >
                                        {link.replace(
                                          /^https?:\/\/(www\.)?/,
                                          "",
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </>
                        }
                      />
                    );

                  case "educations":
                    return (
                      <Section
                        key="educations"
                        label="Education"
                        isFirst={isFirst}
                        content={
                          <>
                            {resumeData.educations!.map((edu, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginBottom:
                                    idx < resumeData.educations!.length - 1
                                      ? "30px"
                                      : 0,
                                }}
                              >
                                <h3
                                  style={{
                                    fontSize:
                                      "calc(1em * var(--heading-scale))",
                                    fontWeight: 600,
                                    margin: 0,
                                    marginBottom: "4px",
                                  }}
                                >
                                  {edu.degree} {edu.stream && `- ${edu.stream}`}
                                </h3>
                                <span
                                  style={{
                                    display: "block",
                                    color:
                                      "color-mix(in srgb, var(--text) 70%, transparent)",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {edu.school} /{" "}
                                  {edu.startDate &&
                                    safeFormatDate(edu.startDate, dateFormat)}{" "}
                                  -{" "}
                                  {edu.endDate
                                    ? safeFormatDate(edu.endDate, dateFormat)
                                    : "PRESENT"}
                                  {edu.marks && ` | ${edu.marks}`}
                                </span>
                                {edu.description && (
                                  <div
                                    className="richTextEditorStyle whitespace-pre-line pl-[18px]"
                                    dangerouslySetInnerHTML={{
                                      __html: edu.description || "",
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </>
                        }
                      />
                    );

                  case "certifications":
                    return (
                      <Section
                        key="certifications"
                        label="Certifications"
                        isFirst={isFirst}
                        content={
                          <>
                            {resumeData.certifications!.map((cert, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginBottom:
                                    idx < resumeData.certifications!.length - 1
                                      ? "20px"
                                      : 0,
                                }}
                              >
                                <h3
                                  style={{
                                    fontSize:
                                      "calc(1em * var(--heading-scale))",
                                    fontWeight: 600,
                                    margin: 0,
                                    marginBottom: "4px",
                                  }}
                                >
                                  {cert.title}
                                </h3>
                                {cert.description && (
                                  <p
                                    style={{
                                      color:
                                        "color-mix(in srgb, var(--text) 70%, transparent)",
                                      margin: 0,
                                      marginBottom: "4px",
                                      paddingLeft: "18px",
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
                                    style={{
                                      display: "block",
                                      color: "var(--accent)",
                                      textDecoration: "underline",
                                      paddingLeft: "18px",
                                    }}
                                  >
                                    {cert.link.replace(
                                      /^https?:\/\/(www\.)?/,
                                      "",
                                    )}
                                  </a>
                                )}
                              </div>
                            ))}
                          </>
                        }
                      />
                    );

                  case "skills":
                    return (
                      <Section
                        key="skills"
                        label="Skills"
                        isFirst={isFirst}
                        content={
                          <ul style={{ paddingLeft: "18px", margin: 0 }}>
                            {resumeData.skills!.map((skill, idx) =>
                              skill.skillName?.map((item, i) => (
                                <li
                                  key={`${idx}-${i}`}
                                  style={{ marginBottom: "6px" }}
                                >
                                  {item}
                                </li>
                              )),
                            )}
                          </ul>
                        }
                      />
                    );

                  case "others":
                    return (
                      <Section
                        key="others"
                        label={resumeData.others!.title!}
                        isFirst={isFirst}
                        content={
                          <div
                            className="richTextEditorStyle whitespace-pre-line pl-[18px]"
                            dangerouslySetInnerHTML={{
                              __html: resumeData.others!.description || "",
                            }}
                          />
                        }
                      />
                    );

                  default:
                    return null;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const Header = ({ resumeData }: { resumeData: ResumeValues }) => {
  const {
    firstName,
    lastName,
    photo,
    borderStyle,
    phone,
    email,
    city,
    country,
    socialLinks,
    portfolioLink,
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
    <div
      data-resume-header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      {/* Profile Image */}
      {photoSrc && (
        <div>
          <img
            src={photoSrc}
            alt="Profile"
            style={{
              width: "110px",
              height: "110px",
              objectFit: "cover",
              borderRadius: getBorderRadius(),
            }}
          />
        </div>
      )}

      {/* Header Right */}
      <div>
        <h1
          style={{
            fontSize: "var(--name-font-size)",
            fontWeight: "var(--name-font-weight)",
            letterSpacing: "3px",
            margin: 0,
          }}
        >
          {firstName} {lastName}
        </h1>
        <div
          data-resume-personal-details
          style={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            color: "var(--text)",
          }}
        >
          {phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Phone size={14} />
              {phone}
            </span>
          )}
          {email && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Mail size={14} />
              {email}
            </span>
          )}
          {(city || country) && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={14} />
              {[city, country].filter(Boolean).join(", ")}
            </span>
          )}
          {socialLinks &&
            socialLinks.length > 0 &&
            socialLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  color: "var(--text)",
                }}
              >
                <SocialMediaIconFinder url={link} />
                <span>{link.split("://")?.[1]?.split("/")[0]}</span>
              </a>
            ))}
          {portfolioLink && (
            <a
              href={portfolioLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                color: "var(--text)",
              }}
            >
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Section Component - Each section is a row with label, timeline dot, and content
const Section = ({
  label,
  content,
  isFirst = false,
}: {
  label: string;
  content: React.ReactNode;
  isFirst?: boolean;
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 40px 1fr",
        columnGap: "20px",
        marginBottom: "calc(var(--section-gap) * var(--density-multiplier))",
        position: "relative",
      }}
    >
      {/* Label */}
      <div
        data-resume-section-heading
        style={{
          fontSize: "calc(1em * var(--heading-scale))",
          fontWeight: 600,
          letterSpacing: "2px",
          paddingTop: "10px",
        }}
      >
        {label}
      </div>

      {/* Timeline Column with Line and Dot */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Vertical line segment */}
        {!isFirst && (
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              width: "0px",
              height: "50px",
              borderLeftWidth: "var(--resume-border-width)",
              borderLeftStyle: "var(--resume-border-style)" as any,
              borderLeftColor: "var(--accent)",
              transform: "translateX(-50%)",
            }}
          />
        )}

        {/* Dot */}
        <div
          style={{
            marginTop: "10px",
            height: "12px",
            width: "12px",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            position: "relative",
            zIndex: 2,
          }}
        />

        {/* Line continuing down */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            left: "50%",
            width: "0px",
            height: "100%",
            borderLeftWidth: "var(--resume-border-width)",
            borderLeftStyle: "var(--resume-border-style)" as any,
            borderLeftColor: "var(--accent)",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ lineHeight: "var(--resume-line-height)" }}>{content}</div>
    </div>
  );
};
