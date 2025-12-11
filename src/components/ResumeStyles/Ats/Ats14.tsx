"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Link from "next/link";
import React, { useRef } from "react";
import { BiEnvelope, BiMap, BiPhone, BiGlobe, BiSolidMap } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats14({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  const colorHex =
    resumeData.colorHex === "#000000" ? "#1e3a8a" : resumeData.colorHex; // Default to a deep blue if black

  // Helper to create a lighter version of the primary color for backgrounds
  // Since we can't easily manipulate hex in pure CSS variables without calc-size, 
  // we'll stick to a generic light gray/blue background for the bands or try to use opacity
  const sectionHeaderStyle = {
      color: "#1f2937", // Dark gray text usually looks best on light bands
      backgroundColor: "#f3f4f6", // tailwind gray-100
  };

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-slate-800",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "p-10 space-y-5 font-sans",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex items-baseline gap-4 mb-3 border-b-2 border-slate-100 pb-2">
            <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: colorHex }}>
              {resumeData.firstName} {resumeData.lastName}
            </h1>
            {resumeData.jobTitle && (
              <span className="text-xl italic text-slate-600 font-medium">
                {resumeData.jobTitle}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 items-center">
             {(resumeData.city || resumeData.country) && (
              <span className="flex items-center gap-1">
                <BiSolidMap className="text-lg" style={{ color: colorHex }} />
                <span>{resumeData.city}{resumeData.city && resumeData.country ? ", " : ""}{resumeData.country}</span>
              </span>
            )}
            {resumeData.email && (
              <ContactLink href={`mailto:${resumeData.email}`} text={resumeData.email} icon={<BiEnvelope className="text-lg" style={{ color: colorHex }} />} />
            )}
            {resumeData.phone && (
              <ContactLink href={`tel:${resumeData.phone}`} text={resumeData.phone} icon={<BiPhone className="text-lg" style={{ color: colorHex }} />} />
            )}
             {resumeData.portfolioLink && (
               <ContactLink href={resumeData.portfolioLink} text="Portfolio" icon={<BiGlobe className="text-lg" style={{ color: colorHex }} />} />
            )}
             {resumeData.socialLinks?.map((link, index) => (
                <ContactLink key={index} href={link} text={link.replace(/^https?:\/\/(www\.)?/, '')} icon={<FaLinkedin className="text-lg" style={{ color: colorHex }} />} />
             ))}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
            <SectionHeader title="Profile" style={{ color: colorHex }} />
            <p className="whitespace-pre-line leading-relaxed text-justify text-slate-700">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
          <section>
            <SectionHeader title="Work Experience" style={{ color: colorHex }} />
            <div className="space-y-6">
              {resumeData.workExperiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg text-slate-900">{exp.position}</h4>
                    <span className="font-medium text-sm text-slate-600">
                       {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} –{" "}
                       {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                     <p className="italic text-slate-700 font-medium">{exp.company}</p>
                     {exp.jobLocation && <span className="text-sm text-slate-500">{exp.jobLocation}</span>}
                  </div>
                  <div
                    className="richTextEditorStyle text-sm text-slate-700 leading-snug"
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

         {/* Education */}
        {resumeData.educations && resumeData.educations.length > 0 && (
          <section>
            <SectionHeader title="Education" style={{ color: colorHex }} />
            <div className="space-y-4">
              {resumeData.educations.map((edu, index) => (
                <div key={index}>
                    <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-base text-slate-900">{edu.degree}</h4>
                        <span className="text-sm text-slate-600 font-medium">
                        {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} –{" "}
                        {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                        </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <p className="italic text-slate-700">{edu.school}</p>
                        {edu.location && <span className="text-xs text-slate-500">{edu.location}</span>}
                    </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
             <SectionHeader title="Skills" style={{ color: colorHex }} />
            <div className="flex flex-col gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-baseline">
                   <span className="text-slate-900 mr-2">•</span>
                   <span className="font-semibold text-slate-800 mr-2 min-w-[120px]">{skill.title}:</span>
                   <span className="text-slate-600 flex-1">{skill.skillName?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
            <section>
                <SectionHeader title="Projects" style={{ color: colorHex }} />
                <div className="grid grid-cols-1 gap-5">
                {resumeData.projectWorks.map((project, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-900">{project.title}</h4>
                             <span className="text-sm text-slate-600">
                                {project.startDate && formatDate(project.startDate, "MM/yyyy")} –{" "}
                                {project.endDate ? formatDate(project.endDate, "MM/yyyy") : "Present"}
                            </span>
                        </div>
                        {project.links && project.links.length > 0 && (
                            <div className="text-xs text-blue-600 mb-2 flex gap-3">
                                {project.links.map((link, i) => (
                                    <Link key={i} href={link} target="_blank" className="hover:underline flex items-center gap-1 font-medium">
                                        <BiGlobe /> {link}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div
                            className="richTextEditorStyle text-sm text-slate-700"
                            dangerouslySetInnerHTML={{ __html: project.description || "" }}
                        />
                    </div>
                ))}
                </div>
            </section>
        )}
        
        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="grid grid-cols-1 gap-5">
                <section>
                        <SectionHeader title="Certifications" style={{ color: colorHex }} />
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {resumeData.certifications.map((cert, index) => (
                            <li key={index}>
                                <span className="font-semibold">{cert.title}</span>
                                {cert.description && <span className="text-slate-500"> — {cert.description}</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        )}

      </div>
    </div>
  );
}

function SectionHeader({ title, style }: { title: string; style?: React.CSSProperties }) {
    return (
        <div className="bg-slate-100 py-1.5 px-0 mb-4 text-center border-t border-b border-slate-200">
             <h3 className="font-bold uppercase tracking-wide text-sm" style={style}>{title}</h3>
        </div>
    )
}

function ContactLink({ href, text, icon }: { href: string; text: string; icon?: React.ReactNode }) {
    return (
        <Link href={href} className="flex items-center gap-1.5 hover:text-black transition-colors">
            {icon}
            <span>{text}</span>
        </Link>
    )
}
