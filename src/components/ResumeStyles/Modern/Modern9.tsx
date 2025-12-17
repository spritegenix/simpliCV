"use client";
import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from "lucide-react";
import { ResumeValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ModernSidebar({ resumeData, className = "" }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default red accent color
  const primaryColor =
    resumeData.colorHex === "#000000" || !resumeData.colorHex
      ? "#d83a3a"
      : resumeData.colorHex;

  return (
    <div
      className={`aspect-[210/297] h-fit w-full bg-white text-slate-800 ${className}`}
      ref={containerRef}
    >


      <div
        id="resumePreviewContent"
        className={`h-full ${!width ? "invisible" : ""}`}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", height: "100%", background: "#f5f5f5" }}>
          {/* LEFT SIDEBAR */}
          <Sidebar resumeData={resumeData} colorHex={primaryColor} />

          {/* MAIN CONTENT */}
          <MainContent resumeData={resumeData} colorHex={primaryColor} />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const Sidebar = ({ resumeData, colorHex }: { resumeData: ResumeValues; colorHex: string }) => {
  const { photo, borderStyle, phone, email, portfolioLink, socialLinks, city, country, certifications, others } = resumeData;
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
        <div style={{ 
          width: "160px", 
          height: "160px", 
          margin: "0 auto 30px", 
          border: "6px solid #ddd", 
          overflow: "hidden",
          borderRadius: getBorderRadius()
        }}>
          <img 
            src={photoSrc} 
            alt="Profile" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Contact Section */}
      <div style={{ 
        background: colorHex, 
        color: "white", 
        textAlign: "center", 
        padding: "8px", 
        fontSize: "14px",
        fontWeight: 600,
        margin: "25px 0 10px"
      }}>
        CONTACT ME
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {phone && (
          <li style={{ fontSize: "13px", margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Phone size={14} /> {phone}
          </li>
        )}
        {email && (
          <li style={{ fontSize: "13px", margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Mail size={14} /> {email}
          </li>
        )}
        {portfolioLink && (
          <li style={{ fontSize: "13px", margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={14} /> {portfolioLink.replace(/^https?:\/\/(www\.)?/, "")}
          </li>
        )}
        {(city || country) && (
          <li style={{ fontSize: "13px", margin: "8px 0", display: "flex", alignItems: "start", gap: "8px" }}>
            <MapPin size={14} style={{ marginTop: "2px" }} /> 
            <span>{[city, country].filter(Boolean).join(", ")}</span>
          </li>
        )}
        {socialLinks && socialLinks.map((link, idx) => (
          <li key={idx} style={{ fontSize: "13px", margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <LinkIcon size={14} /> 
            <a href={link} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
              {link.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div style={{ 
        height: "6px", 
        background: "#ccc", 
        margin: "20px 0", 
        borderRadius: "5px" 
      }} />

      {/* References */}
      {certifications && certifications.length > 0 && (
        <>
          <div style={{ 
            background: colorHex, 
            color: "white", 
            textAlign: "center", 
            padding: "8px", 
            fontSize: "14px",
            fontWeight: 600,
            margin: "25px 0 10px"
          }}>
            REFERENCES
          </div>
          {certifications.map((ref, idx) => (
            <div key={idx} style={{ marginBottom: "15px", fontSize: "12px" }}>
              <h4 style={{ fontSize: "12px", fontWeight: 600, margin: "0 0 4px 0" }}>
                {ref.title}
              </h4>
              {ref.description && (
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  {ref.description}
                </p>
              )}
              {ref.link && (
                <a href={ref.link} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#3b82f6", textDecoration: "underline" }}>
                  {ref.link.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              )}
            </div>
          ))}
          <div style={{ 
            height: "6px", 
            background: "#ccc", 
            margin: "20px 0", 
            borderRadius: "5px" 
          }} />
        </>
      )}

      {/* Awards */}
      {others && (
        <>
          <div style={{ 
            background: colorHex, 
            color: "white", 
            textAlign: "center", 
            padding: "8px", 
            fontSize: "14px",
            fontWeight: 600,
            margin: "25px 0 10px"
          }}>
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

const MainContent = ({ resumeData, colorHex }: { resumeData: ResumeValues; colorHex: string }) => {
  const { firstName, lastName, jobTitle, summary, workExperiences, educations, projectWorks, skills, others } = resumeData;

  return (
    <main style={{ padding: "40px" }}>
      {/* Header */}
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 700, margin: 0 }}>
          <span style={{ color: colorHex }}>{firstName}</span> {lastName}
        </h1>
        {jobTitle && (
          <h2 style={{ 
            fontSize: "14px", 
            letterSpacing: "3px", 
            color: "#666", 
            margin: "8px 0 0 0",
            fontWeight: 400,
            textTransform: "uppercase"
          }}>
            {jobTitle}
          </h2>
        )}
      </header>

      {/* About Me */}
      {summary && (
        <>
          <div style={{ 
            display: "inline-block", 
            background: colorHex, 
            color: "white", 
            padding: "6px 16px", 
            margin: "20px 0 10px", 
            fontSize: "13px",
            fontWeight: 600
          }}>
            ABOUT ME
          </div>
          <p style={{ fontSize: "13px", color: "#555", margin: "0 0 20px 0" }}>
            {summary}
          </p>
        </>
      )}

      {/* Experience & Education - Two Columns */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "30px",
        marginBottom: "20px"
      }}>
        {/* Job Experience */}
        <section>
          {workExperiences && workExperiences.length > 0 && (
            <>
              <div style={{ 
                display: "inline-block", 
                background: colorHex, 
                color: "white", 
                padding: "6px 16px", 
                margin: "20px 0 10px", 
                fontSize: "13px",
                fontWeight: 600
              }}>
                JOB EXPERIENCE
              </div>
              {workExperiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "14px", margin: "0 0 4px 0", fontWeight: 600 }}>
                    {exp.position}
                  </h3>
                  <span style={{ fontSize: "12px", color: "#777", display: "block", marginBottom: "4px" }}>
                    {exp.company}
                  </span>
                  <div 
                    className="richTextEditorStyle whitespace-pre-line"
                    style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                  />
                  <small style={{ fontSize: "11px", color: "#333", fontWeight: 600 }}>
                    {exp.startDate && formatDate(exp.startDate, "yyyy")} – {exp.endDate ? formatDate(exp.endDate, "yyyy") : "PRESENT"}
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
              <div style={{ 
                display: "inline-block", 
                background: colorHex, 
                color: "white", 
                padding: "6px 16px", 
                margin: "20px 0 10px", 
                fontSize: "13px",
                fontWeight: 600
              }}>
                EDUCATION
              </div>
              {educations.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "14px", margin: "0 0 4px 0", fontWeight: 600 }}>
                    {edu.degree} {edu.stream}
                  </h3>
                   <span style={{ fontSize: "12px", color: "#777", display: "block", marginBottom: "4px" }}>
                     {edu.school}
                     {edu.marks && ` | ${edu.marks}`}
                   </span>
                   {edu.description && (
                     <div 
                       className="richTextEditorStyle whitespace-pre-line"
                       style={{ fontSize: "12px", color: "#555", margin: "0 0 4px 0" }}
                       dangerouslySetInnerHTML={{ __html: edu.description }}
                     />
                   )}
                   <small style={{ fontSize: "11px", color: "#333", fontWeight: 600 }}>
                     {edu.startDate && formatDate(edu.startDate, "yyyy")} – {edu.endDate ? formatDate(edu.endDate, "yyyy") : "PRESENT"}
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
          <div style={{ 
            display: "inline-block", 
            background: colorHex, 
            color: "white", 
            padding: "6px 16px", 
            margin: "20px 0 10px", 
            fontSize: "13px",
            fontWeight: 600
          }}>
            PROJECTS
          </div>
          <div style={{ marginBottom: "20px" }}>
            {projectWorks.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", margin: "0 0 4px 0", fontWeight: 600 }}>
                  {proj.title}
                </h3>
                {proj.company && (
                  <span style={{ fontSize: "12px", color: "#777", display: "block", marginBottom: "4px" }}>
                    {proj.company}
                  </span>
                )}
                {proj.description && (
                  <div 
                    className="richTextEditorStyle whitespace-pre-line"
                    style={{ fontSize: "12px", color: "#555", marginBottom: "4px" }}
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
                          marginBottom: "2px"
                        }}
                      >
                        {link.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ))}
                  </div>
                )}
                <small style={{ fontSize: "11px", color: "#333", fontWeight: 600 }}>
                  {proj.startDate && formatDate(proj.startDate, "yyyy")} – {proj.endDate ? formatDate(proj.endDate, "yyyy") : "PRESENT"}
                </small>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <>
          <div style={{ 
            display: "inline-block", 
            background: colorHex, 
            color: "white", 
            padding: "6px 16px", 
            margin: "20px 0 10px", 
            fontSize: "13px",
            fontWeight: 600
          }}>
            SKILLS
          </div>
          <div style={{ marginBottom: "20px" }}>
            {skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: "15px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                  {skill.title}
                </span>
                <div style={{ 
                  background: "#ccc", 
                  height: "6px", 
                  borderRadius: "5px", 
                  overflow: "hidden" 
                }}>
                  <div style={{ 
                    height: "100%", 
                    background: colorHex, 
                    width: "75%"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};