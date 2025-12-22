"use client";
import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, Globe, Link2 } from "lucide-react";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";
import { format as formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function TealModern({
  resumeData,
  className = "",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const accentColor = "var(--accent)";
  const greenColor = "color-mix(in srgb, var(--accent) 65%, var(--text))";

  return (
    <div
      className={`resume-root modern aspect-[210/297] h-fit w-full bg-white ${className}`}
      ref={containerRef}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
    >
      {/* Montserrat Font */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <div
        className={`h-full ${!width ? "invisible" : ""}`}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: "'Montserrat', sans-serif",
          borderTop: `18px solid ${accentColor}`,
          borderBottom: `18px solid ${accentColor}`,
        }}
        id="resumePreviewContent"
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* HEADER */}
          <Header
            resumeData={resumeData}
            accentColor={accentColor}
            greenColor={greenColor}
          />

          {/* CONTENT */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              flex: 1,
            }}
          >
            {/* LEFT COLUMN */}
            <LeftColumn
              resumeData={resumeData}
              accentColor={accentColor}
              greenColor={greenColor}
            />

            {/* RIGHT COLUMN */}
            <RightColumn
              resumeData={resumeData}
              accentColor={accentColor}
              greenColor={greenColor}
            />
          </div>

          {/* FOOTER */}
          <div style={{ height: "10px" }} />
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
  accentColor,
  greenColor,
}: {
  resumeData: ResumeValues;
  accentColor: string;
  greenColor: string;
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

  const getBorderRadius = () => {
    if (borderStyle === "square") return "0px";
    if (borderStyle === "circle") return "50%";
    return "10px";
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "30px",
        gap: "30px",
      }}
    >
      {photoSrc && (
        <div
          style={{
            width: "120px",
            height: "120px",
            border: `4px solid ${accentColor}`,
            padding: "4px",
            borderRadius: getBorderRadius(),
          }}
        >
          <img
            src={photoSrc}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: getBorderRadius(),
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0 }}>
          {firstName} <span style={{ color: accentColor }}>{lastName}</span>
        </h1>
        {jobTitle && (
          <h2
            style={{
              fontSize: "14px",
              color: "#666",
              margin: "4px 0 0 0",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            {jobTitle}
          </h2>
        )}
      </div>
    </header>
  );
};

const SectionTitleMain = ({
  title,
  colorHex,
}: {
  title: string;
  colorHex: string;
}) => {
  return (
    <h3
      style={{
        fontSize: "16px",
        color: colorHex,
        marginBottom: "15px",
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    >
      {title}
    </h3>
  );
};

const LeftColumn = ({
  resumeData,
  accentColor,
  greenColor,
}: {
  resumeData: ResumeValues;
  accentColor: string;
  greenColor: string;
}) => {
  const {
    phone,
    email,
    city,
    country,
    portfolioLink,
    socialLinks,
    certifications,
    skills,
    others,
  } = resumeData;

  return (
    <aside
      style={{
        padding: "30px",
      }}
    >
      {/* CONTACT */}
      {(phone || email || city || country || portfolioLink) && (
        <section style={{ marginBottom: "25px" }}>
          <h3
            style={{
              fontSize: "14px",
              color: accentColor,
              marginBottom: "10px",
              fontWeight: 600,
              paddingBottom: "8px",
              borderBottom: `2px solid ${greenColor}`,
            }}
          >
            CONTACT
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {(city || country) && (
              <li
                style={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <MapPin size={12} />{" "}
                {[city, country].filter(Boolean).join(", ")}
              </li>
            )}
            {phone && (
              <li
                style={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone size={12} /> {phone}
              </li>
            )}
            {email && (
              <li
                style={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Mail size={12} /> {email}
              </li>
            )}
            {portfolioLink && (
              <li
                style={{
                  fontSize: "12px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Globe size={12} /> Portfolio
              </li>
            )}
          </ul>
        </section>
      )}

      {/* SOCIAL MEDIA */}
      {socialLinks && socialLinks.length > 0 && (
        <section style={{ marginBottom: "25px" }}>
          <h3
            style={{
              fontSize: "14px",
              color: accentColor,
              marginBottom: "10px",
              fontWeight: 600,
              paddingBottom: "8px",
              borderBottom: `2px solid ${greenColor}`,
            }}
          >
            SOCIAL MEDIA
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {socialLinks.map((link, idx) => (
              <li key={idx} style={{ fontSize: "12px", marginBottom: "8px" }}>
                {link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* PRO SKILLS */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: "25px" }}>
          <h3
            style={{
              fontSize: "14px",
              color: accentColor,
              marginBottom: "10px",
              fontWeight: 600,
              paddingBottom: "8px",
              borderBottom: `2px solid ${greenColor}`,
            }}
          >
            PRO SKILLS
          </h3>
          {skills.map((skill, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <span
                style={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "4px",
                  fontWeight: 500,
                }}
              >
                {skill.title}
              </span>
              <div
                style={{
                  height: "6px",
                  background: "#e0f1f1",
                  marginTop: "4px",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: accentColor,
                    width: "70%",
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <section style={{ marginBottom: "25px" }}>
          <h3
            style={{
              fontSize: "14px",
              color: accentColor,
              marginBottom: "10px",
              fontWeight: 600,
              paddingBottom: "8px",
              borderBottom: `2px solid ${greenColor}`,
            }}
          >
            CERTIFICATIONS
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {certifications.map((cert, idx) => (
              <li key={idx} style={{ marginBottom: "8px" }}>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "12px",
                      color: accentColor,
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    • {cert.title}
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>
                    • {cert.title}
                  </span>
                )}
                {cert.description && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#666",
                      margin: "2px 0 0 10px",
                    }}
                  >
                    {cert.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* OTHERS / CUSTOM SECTION */}
      {others?.title && (
        <section style={{ marginBottom: "25px" }}>
          <h3
            style={{
              fontSize: "14px",
              color: accentColor,
              marginBottom: "10px",
              fontWeight: 600,
              paddingBottom: "8px",
              borderBottom: `2px solid ${greenColor}`,
            }}
          >
            {others.title.toUpperCase()}
          </h3>
          <div
            style={{ fontSize: "12px", color: "#555", lineHeight: "1.6" }}
            dangerouslySetInnerHTML={{ __html: others.description || "" }}
          />
        </section>
      )}
    </aside>
  );
};

const RightColumn = ({
  resumeData,
  accentColor,
  greenColor,
}: {
  resumeData: ResumeValues;
  accentColor: string;
  greenColor: string;
}) => {
  const { summary, workExperiences, projectWorks, educations } = resumeData;

  return (
    <main style={{ padding: "30px" }}>
      {/* ABOUT ME */}
      {summary && (
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "16px",
              color: accentColor,
              marginBottom: "15px",
              fontWeight: 600,
            }}
          >
            ABOUT ME
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: "#555",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            {summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {workExperiences && workExperiences.length > 0 && (
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "16px",
              color: accentColor,
              marginBottom: "15px",
              fontWeight: 600,
            }}
          >
            EXPERIENCE
          </h3>
          <div
            style={{
              position: "relative",
              paddingLeft: "20px",
            }}
          >
            {/* Timeline Line */}
            <div
              style={{
                content: "",
                position: "absolute",
                left: "4px",
                top: 0,
                width: "2px",
                height: "100%",
                background: greenColor,
              }}
            />

            {workExperiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "5px",
                    width: "10px",
                    height: "10px",
                    background: accentColor,
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: "13px",
                      margin: "0 0 4px 0",
                      fontWeight: 600,
                    }}
                  >
                    {exp.position}
                  </h4>
                  <strong
                    style={{
                      fontSize: "11px",
                      color: accentColor,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {exp.company}{" "}
                    {exp.startDate && formatDate(exp.startDate, "yyyy")} |{" "}
                    {exp.endDate ? formatDate(exp.endDate, "yyyy") : "PRESENT"}
                  </strong>
                  <div
                    style={{ fontSize: "12px", color: "#555" }}
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projectWorks && projectWorks.length > 0 && (
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "16px",
              color: accentColor,
              marginBottom: "15px",
              fontWeight: 600,
            }}
          >
            PROJECTS
          </h3>
          <div
            style={{
              position: "relative",
              paddingLeft: "20px",
            }}
          >
            {/* Timeline Line */}
            <div
              style={{
                content: "",
                position: "absolute",
                left: "4px",
                top: 0,
                width: "2px",
                height: "100%",
                background: greenColor,
              }}
            />

            {projectWorks.map((proj, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "5px",
                    width: "10px",
                    height: "10px",
                    background: accentColor,
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: "13px",
                      margin: "0 0 4px 0",
                      fontWeight: 600,
                    }}
                  >
                    {proj.title}
                  </h4>
                  <strong
                    style={{
                      fontSize: "11px",
                      color: accentColor,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {proj.company && `${proj.company} | `}
                    {proj.startDate &&
                      formatDate(proj.startDate, "yyyy")} -{" "}
                    {proj.endDate
                      ? formatDate(proj.endDate, "yyyy")
                      : "PRESENT"}
                  </strong>
                  {proj.links && proj.links.length > 0 && (
                    <div style={{ fontSize: "11px", marginBottom: "4px" }}>
                      {proj.links.map((link, linkIdx) => (
                        <a
                          key={linkIdx}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: accentColor,
                            marginRight: "8px",
                            textDecoration: "none",
                          }}
                        >
                          <Link2
                            size={10}
                            style={{ display: "inline", marginRight: "2px" }}
                          />
                          Link {linkIdx + 1}
                        </a>
                      ))}
                    </div>
                  )}
                  <div
                    style={{ fontSize: "12px", color: "#555" }}
                    dangerouslySetInnerHTML={{ __html: proj.description || "" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {educations && educations.length > 0 && (
        <section style={{ marginBottom: "30px" }}>
          <h3
            style={{
              fontSize: "16px",
              color: accentColor,
              marginBottom: "15px",
              fontWeight: 600,
            }}
          >
            EDUCATION
          </h3>
          <div
            style={{
              position: "relative",
              paddingLeft: "20px",
            }}
          >
            {/* Timeline Line */}
            <div
              style={{
                content: "",
                position: "absolute",
                left: "4px",
                top: 0,
                width: "2px",
                height: "100%",
                background: greenColor,
              }}
            />

            {educations.map((edu, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "5px",
                    width: "10px",
                    height: "10px",
                    background: accentColor,
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: "13px",
                      margin: "0 0 4px 0",
                      fontWeight: 600,
                    }}
                  >
                    {edu.degree} {edu.stream}
                  </h4>
                  <strong
                    style={{
                      fontSize: "11px",
                      color: accentColor,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.school}{" "}
                    {edu.startDate && formatDate(edu.startDate, "yyyy")} |{" "}
                    {edu.endDate ? formatDate(edu.endDate, "yyyy") : "PRESENT"}
                    {edu.marks && ` | ${edu.marks}`}
                  </strong>
                  {edu.description && (
                    <div
                      style={{ fontSize: "12px", color: "#555" }}
                      dangerouslySetInnerHTML={{ __html: edu.description }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
