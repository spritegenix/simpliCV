"use client";

import React, { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, Globe, Link2, Briefcase, GraduationCap, Edit3, Settings } from "lucide-react";

// Types
interface ResumeValues {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  photo?: string | File | null;
  summary?: string;
  portfolioLink?: string;
  socialLinks?: string[];
  workExperiences?: Array<{
    position?: string;
    company?: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    description?: string;
  }>;
  educations?: Array<{
    degree?: string;
    school?: string;
    stream?: string;
    startDate?: Date | string;
    endDate?: Date | string | null;
    description?: string;
  }>;
  skills?: Array<{
    title?: string;
    skillName?: string[];
  }>;
  others?: {
    title?: string;
    description?: string;
  };
  colorHex?: string;
  borderStyle?: "square" | "circle" | "rounded";
}

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

// Helper function to format dates
const formatDate = (date: Date | string, format: string): string => {
  const d = new Date(date);
  if (format === "yyyy") {
    return d.getFullYear().toString();
  }
  return d.getFullYear().toString();
};

// Custom hook for dimensions
const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return { width };
};

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
      {/* Poppins Font */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          `,
        }}
      />

      <div
        className={`h-full ${!width ? "invisible" : ""}`}
        style={{
          zoom: (1 / 794) * width,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* HEADER */}
        <Header resumeData={resumeData} primaryColor={primaryColor} darkPurple={darkPurple} />

        {/* CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr" }}>
          {/* LEFT COLUMN */}
          <LeftColumn resumeData={resumeData} primaryColor={primaryColor} darkPurple={darkPurple} />

          {/* RIGHT COLUMN */}
          <RightColumn resumeData={resumeData} primaryColor={primaryColor} darkPurple={darkPurple} />
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
                      {exp.startDate && formatDate(exp.startDate, "yyyy")} – {exp.endDate ? formatDate(exp.endDate, "yyyy") : "PRESENT"}
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
                      {edu.startDate && formatDate(edu.startDate, "yyyy")} – {edu.endDate ? formatDate(edu.endDate, "yyyy") : "PRESENT"}
                    </span>
                  </h4>
                  <strong style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}>
                    {edu.degree} {edu.stream}
                  </strong>
                  {edu.description && (
                    <p style={{ fontSize: "12px", color: "#555", margin: 0 }}>
                      {edu.description}
                    </p>
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