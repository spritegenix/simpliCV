"use client";

import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, Globe, Link2, Briefcase, GraduationCap, Edit3, Settings } from "lucide-react";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { safeFormatDate } from "@/lib/utils";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function PurpleModern({ resumeData, className = "" }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default purple gradient color
  const primaryColor =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#9b4bdc"
      : resumeData.colorHex;

  const darkPurple = "#4b0055";

  return (
    <div
      className={`aspect-[210/297] h-fit w-full bg-white text-slate-800 ${className}`}
      ref={containerRef}
    >


      <div
        className={`h-full ${!width ? "invisible" : ""}`}
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
              background: `linear-gradient(135deg, ${primaryColor} 0%, #4c1d95 100%)`, // Gradient to dark purple
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
                <SectionTitleSide title="About Me" colorHex={primaryColor} />
                <p className="text-justify text-xs font-medium leading-relaxed text-slate-600">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* CONTACT */}
            <div>
              <SectionTitleSide title="Contact" colorHex={primaryColor} />
              <ContactSection resumeData={resumeData} colorHex={primaryColor} />
            </div>

            {/* EXPERTISE/SKILLS (Sidebar Style) */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <SectionTitleSide title="Skills" colorHex={primaryColor} />
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
                  <SectionTitleSide title="References" colorHex={primaryColor} />
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
                    colorHex={primaryColor}
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
                          style={{ backgroundColor: primaryColor }}
                        />

                        <div className="mb-1 flex items-baseline justify-between">
                          <h4 className="text-md font-bold uppercase tracking-tight text-slate-800">
                            {exp.position}
                          </h4>
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {exp.startDate &&
                              safeFormatDate(exp.startDate, "yyyy")}{" "}
                            -{" "}
                            {exp.endDate
                              ? safeFormatDate(exp.endDate, "yyyy")
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
                <SectionTitleMain title="Education" colorHex={primaryColor} />
                <div className="ml-1 space-y-6 border-l-2 border-slate-200 pl-2">
                  {resumeData.educations.map((edu, idx) => (
                    <div key={idx} className="relative break-inside-avoid pl-6">
                      <div
                        className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: primaryColor }}
                      />

                      <div className="mb-1 flex items-baseline justify-between">
                        <h4 className="text-md font-bold uppercase text-slate-800">
                          {edu.degree}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-500">
                          {edu.startDate &&
                            safeFormatDate(edu.startDate, "yyyy")}{" "}
                          -{" "}
                          {edu.endDate
                            ? safeFormatDate(edu.endDate, "yyyy")
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
                    colorHex={primaryColor}
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

// Photo Section Component
const PhotoSection = ({ resumeData }: { resumeData: ResumeValues }) => {
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
      className="h-32 w-32 overflow-hidden border-4 border-white shadow-lg"
      style={{ borderRadius: getBorderRadius() }}
    >
      <img
        src={photoSrc}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

// Section Title for Sidebar
const SectionTitleSide = ({ title, colorHex }: { title: string; colorHex: string }) => {
  return (
    <h3
      className="mb-3 border-b-2 pb-1 text-sm font-bold uppercase tracking-wide"
      style={{ borderColor: colorHex, color: colorHex }}
    >
      {title}
    </h3>
  );
};

// Section Title for Main Content
const SectionTitleMain = ({ title, colorHex }: { title: string; colorHex: string }) => {
  return (
    <h3
      className="mb-6 text-lg font-bold uppercase tracking-wide"
      style={{ color: colorHex }}
    >
      {title}
    </h3>
  );
};

// Contact Section Component
const ContactSection = ({ resumeData, colorHex }: { resumeData: ResumeValues; colorHex: string }) => {
  const { phone, email, city, country, portfolioLink, socialLinks } = resumeData;

  return (
    <div className="space-y-2 text-xs">
      {phone && (
        <div className="flex items-center gap-2">
          <Phone size={12} style={{ color: colorHex }} />
          <span className="text-slate-700">{phone}</span>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2">
          <Mail size={12} style={{ color: colorHex }} />
          <span className="break-all text-slate-700">{email}</span>
        </div>
      )}
      {(city || country) && (
        <div className="flex items-center gap-2">
          <MapPin size={12} style={{ color: colorHex }} />
          <span className="text-slate-700">
            {[city, country].filter(Boolean).join(", ")}
          </span>
        </div>
      )}
      {portfolioLink && (
        <div className="flex items-center gap-2">
          <Globe size={12} style={{ color: colorHex }} />
          <span className="break-all text-slate-700">{portfolioLink}</span>
        </div>
      )}
      {socialLinks?.map((link, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Link2 size={12} style={{ color: colorHex }} />
          <span className="break-all text-slate-700">
            {link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
          </span>
        </div>
      ))}
    </div>
  );
};


const Header = ({ 
  resumeData, 
  primaryColor, 
  darkPurple 
}: { 
  resumeData: ResumeValues; 
  primaryColor: string;
  darkPurple: string;
}) => {
  const { firstName, lastName, jobTitle, summary, photo, borderStyle } = resumeData;
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
    <header style={{
      background: `linear-gradient(135deg, ${primaryColor}, ${darkPurple})`,
      color: "white",
      display: "flex",
      padding: "40px",
      alignItems: "center"
    }}>
      {photoSrc && (
        <div style={{
          width: "140px",
          height: "140px",
          border: "6px solid white",
          overflow: "hidden",
          marginRight: "30px",
          borderRadius: getBorderRadius()
        }}>
          <img 
            src={photoSrc} 
            alt="Profile" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }}
          />
        </div>
      )}
      
      <div>
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: 700, 
          margin: 0,
          textTransform: "uppercase"
        }}>
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <h2 style={{ 
            fontSize: "14px", 
            opacity: 0.9, 
            marginBottom: "10px",
            marginTop: "4px",
            fontWeight: 400,
            textTransform: "uppercase"
          }}>
            {jobTitle}
          </h2>
        )}
        {summary && (
          <p style={{ 
            fontSize: "12px", 
            maxWidth: "420px",
            margin: 0,
            lineHeight: "1.6"
          }}>
            {summary}
          </p>
        )}
      </div>
    </header>
  );
};

const LeftColumn = ({ 
  resumeData, 
  primaryColor, 
  darkPurple 
}: { 
  resumeData: ResumeValues; 
  primaryColor: string;
  darkPurple: string;
}) => {
  const { summary, phone, email, city, country, portfolioLink, socialLinks } = resumeData;

  return (
    <aside style={{ padding: "30px" }}>
      {/* About Me - Only show if there's a summary and no header summary was shown */}
      {summary && (
        <>
          <div style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${darkPurple})`,
            color: "white",
            textAlign: "center",
            padding: "8px",
            borderRadius: "20px",
            margin: "20px 0 10px",
            fontSize: "13px",
            fontWeight: 600
          }}>
            ABOUT ME
          </div>
          <p style={{ 
            fontSize: "12px", 
            color: "#555", 
            lineHeight: "1.6",
            margin: "0 0 20px 0"
          }}>
            {summary}
          </p>
        </>
      )}

      {/* Contact Info */}
      <div style={{
        background: `linear-gradient(90deg, ${primaryColor}, ${darkPurple})`,
        color: "white",
        textAlign: "center",
        padding: "8px",
        borderRadius: "20px",
        margin: "20px 0 10px",
        fontSize: "13px",
        fontWeight: 600
      }}>
        CONTACT INFO
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {phone && (
          <li style={{ fontSize: "12px", margin: "10px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Phone size={12} /> {phone}
          </li>
        )}
        {email && (
          <li style={{ fontSize: "12px", margin: "10px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Mail size={12} /> {email}
          </li>
        )}
        {(city || country) && (
          <li style={{ fontSize: "12px", margin: "10px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={12} /> {[city, country].filter(Boolean).join(", ")}
          </li>
        )}
        {portfolioLink && (
          <li style={{ fontSize: "12px", margin: "10px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={12} /> Portfolio
          </li>
        )}
        {socialLinks?.map((link, idx) => (
          <li key={idx} style={{ fontSize: "12px", margin: "10px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Link2 size={12} /> {link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const RightColumn = ({ 
  resumeData, 
  primaryColor, 
  darkPurple 
}: { 
  resumeData: ResumeValues; 
  primaryColor: string;
  darkPurple: string;
}) => {
  const { workExperiences, educations, skills, others } = resumeData;

  return (
    <main style={{ padding: "30px", borderLeft: "2px solid #eee" }}>
      {/* WORK EXPERIENCE */}
      {workExperiences && workExperiences.length > 0 && (
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ 
            fontSize: "16px", 
            color: darkPurple, 
            marginBottom: "20px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Briefcase size={16} /> WORK EXPERIENCE
          </h3>
          <div style={{ position: "relative", marginLeft: "15px" }}>
            {/* Timeline Line */}
            <div style={{
              position: "absolute",
              left: "4px",
              top: 0,
              width: "2px",
              height: "100%",
              background: primaryColor
            }} />
            
            {workExperiences.map((exp, idx) => (
              <div key={idx} style={{ display: "flex", marginBottom: "25px" }}>
                <span style={{
                  width: "10px",
                  height: "10px",
                  background: primaryColor,
                  borderRadius: "50%",
                  marginRight: "15px",
                  marginTop: "6px",
                  flexShrink: 0
                }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, margin: "0 0 4px 0" }}>
                    {exp.company}{" "}
                    <span style={{ fontWeight: 400, color: "#777", marginLeft: "10px" }}>
                      {exp.startDate && safeFormatDate(exp.startDate, "yyyy")} – {exp.endDate ? safeFormatDate(exp.endDate, "yyyy") : "PRESENT"}
                    </span>
                  </h4>
                  <strong style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}>
                    {exp.position}
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

      {/* EDUCATION */}
      {educations && educations.length > 0 && (
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ 
            fontSize: "16px", 
            color: darkPurple, 
            marginBottom: "20px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <GraduationCap size={16} /> EDUCATION
          </h3>
          <div style={{ position: "relative", marginLeft: "15px" }}>
            {/* Timeline Line */}
            <div style={{
              position: "absolute",
              left: "4px",
              top: 0,
              width: "2px",
              height: "100%",
              background: primaryColor
            }} />
            
            {educations.map((edu, idx) => (
              <div key={idx} style={{ display: "flex", marginBottom: "25px" }}>
                <span style={{
                  width: "10px",
                  height: "10px",
                  background: primaryColor,
                  borderRadius: "50%",
                  marginRight: "15px",
                  marginTop: "6px",
                  flexShrink: 0
                }} />
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, margin: "0 0 4px 0" }}>
                    {edu.school}{" "}
                    <span style={{ fontWeight: 400, color: "#777", marginLeft: "10px" }}>
                      {edu.startDate && safeFormatDate(edu.startDate, "yyyy")} – {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "PRESENT"}
                    </span>
                  </h4>
                   <strong style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}>
                     {edu.degree} {edu.stream}
                     {edu.marks && ` | ${edu.marks}`}
                   </strong>
                   {edu.description && (
                     <div 
                       style={{ fontSize: "12px", color: "#555", margin: 0 }}
                       dangerouslySetInnerHTML={{ __html: edu.description }}
                     />
                   )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS & SOFTWARE - Two Column */}
      {skills && skills.length > 0 && (
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          <div>
            <h3 style={{ 
              fontSize: "16px", 
              color: darkPurple, 
              marginBottom: "20px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Edit3 size={16} /> SKILLS
            </h3>
            {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, idx) => (
              <div key={idx} style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 500 }}>{skill.title}</span>
                <div style={{
                  height: "6px",
                  background: "#ddd",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginTop: "4px"
                }}>
                  <div style={{
                    height: "100%",
                    background: `linear-gradient(90deg, ${primaryColor}, ${darkPurple})`,
                    width: "70%"
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ 
              fontSize: "16px", 
              color: darkPurple, 
              marginBottom: "20px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Settings size={16} /> {others?.title || "SOFTWARE"}
            </h3>
            {skills.slice(Math.ceil(skills.length / 2)).map((skill, idx) => (
              <div key={idx} style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 500 }}>{skill.title}</span>
                <div style={{
                  height: "6px",
                  background: "#ddd",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginTop: "4px"
                }}>
                  <div style={{
                    height: "100%",
                    background: `linear-gradient(90deg, ${primaryColor}, ${darkPurple})`,
                    width: "75%"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};