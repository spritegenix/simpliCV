"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Link from "next/link";
import React, { useRef } from "react";
import { BiEnvelope, BiGlobe, BiMap, BiPhone, BiSolidMap } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats17({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  // Default to the dark blue from the image sample if black is passed
  const colorHex = resumeData.colorHex === "#000000" ? "#1e3a8a" : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-gray-900",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "p-8 space-y-4 font-sans",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight mb-1" style={{ color: colorHex }}>
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p className="text-lg font-medium text-gray-700 italic mb-2">
              {resumeData.jobTitle}
            </p>
          )}

           <div className="flex flex-wrap justify-center items-center gap-x-2 text-sm text-gray-600">
             {resumeData.email && (
              <div className="flex items-center gap-1">
                <Link href={`mailto:${resumeData.email}`} className="hover:text-black hover:underline">{resumeData.email}</Link>
                <span className="text-gray-400">|</span>
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <Link href={`tel:${resumeData.phone}`} className="hover:text-black hover:underline">{resumeData.phone}</Link>
                <span className="text-gray-400">|</span>
              </div>
            )}
            {(resumeData.city || resumeData.country) && (
              <div className="flex items-center gap-1">
                <span>{resumeData.city}{resumeData.city && resumeData.country ? ", " : ""}{resumeData.country}</span>
                 <span className="text-gray-400">|</span>
              </div>
            )}
             {resumeData.socialLinks?.map((link, index) => {
                 const isGithub = link.toLowerCase().includes("github");
                 const isLinkedin = link.toLowerCase().includes("linkedin");
                 // Simple extraction of username/handle for cleaner look like in sample
                 const handle = link.replace(/^https?:\/\/(www\.)?/, '').split('/')[1] || link.replace(/^https?:\/\/(www\.)?/, '');
                 
                 return (
                    <div key={index} className="flex items-center gap-1">
                        <Link href={link} target="_blank" className="hover:text-black hover:underline">
                            {link.includes('linkedin') ? `linkedin.com/in/${handle}` : link.includes('github') ? `github.com/${handle}` : link}
                        </Link>
                         {index < (resumeData.socialLinks?.length || 0) - 1 && <span className="text-gray-400">|</span>}
                    </div>
                 )
             })}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
            <h3 className="font-bold uppercase text-sm border-b-2 border-gray-900 mb-2 pb-0.5 tracking-wider" style={{ borderColor: colorHex }}>Professional Summary</h3>
            <p className="text-sm leading-relaxed text-gray-800 text-justify">
              {resumeData.summary}
            </p>
          </section>
        )}

         {/* Experience */}
        {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
          <section>
            <h3 className="font-bold uppercase text-sm border-b-2 border-gray-900 mb-3 pb-0.5 tracking-wider" style={{ borderColor: colorHex }}>Work Experience</h3>
            <div className="space-y-4">
              {resumeData.workExperiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1 text-sm">
                    <div className="font-bold text-gray-900">
                        {exp.company}<span className="font-normal text-gray-900">, <span className="italic">{exp.position}</span></span>
                    </div>
                    <div className="font-normal text-gray-600 whitespace-nowrap">
                       {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} –{" "}
                       {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                       {exp.jobLocation && <span> | {exp.jobLocation}</span>}
                    </div>
                  </div>
                  <div
                    className="richTextEditorStyle text-sm text-gray-800 leading-snug pl-2"
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
            <h3 className="font-bold uppercase text-sm border-b-2 border-gray-900 mb-3 pb-0.5 tracking-wider" style={{ borderColor: colorHex }}>Education</h3>
            <div className="space-y-2">
              {resumeData.educations.map((edu, index) => (
                <div key={index} className="flex justify-between items-baseline text-sm">
                   <div>
                       <span className="font-bold">{edu.degree}</span>, <span className="italic">{edu.school}</span>
                   </div>
                    <div className="text-gray-600 whitespace-nowrap">
                        {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} –{" "}
                        {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                        {edu.location && <span> | {edu.location}</span>}
                    </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
             <h3 className="font-bold uppercase text-sm border-b-2 border-gray-900 mb-2 pb-0.5 tracking-wider" style={{ borderColor: colorHex }}>Skills</h3>
             <div className="text-sm leading-relaxed text-gray-800 space-y-1">
                {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex">
                         <span className="font-bold min-w-[140px]">{skill.title}:</span>
                         <span>{skill.skillName?.join(", ")}</span>
                    </div>
                ))}
             </div>
          </section>
        )}

        {/* Projects (Academic/Other) */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
            <section>
                <h3 className="font-bold uppercase text-sm border-b-2 border-gray-900 mb-3 pb-0.5 tracking-wider" style={{ borderColor: colorHex }}>Academic Projects</h3>
                <div className="space-y-3">
                {resumeData.projectWorks.map((project, index) => (
                    <div key={index}>
                        <div className="flex items-baseline gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 text-sm">{project.title}</h4>
                            {/* Assuming description might contain role/tags, if not we just show the title. 
                                In sample: Title, Role | Tags | Link
                                We'll format links here if available.
                            */}
                             {project.links && project.links.length > 0 && (
                                <span className="text-sm text-gray-600 italic">
                                    | {project.links.map(l => l.replace(/^https?:\/\/(www\.)?/, '')).join(", ")}
                                </span>
                            )}
                        </div>
                        <div
                            className="richTextEditorStyle text-sm text-gray-800 pl-2"
                            dangerouslySetInnerHTML={{ __html: project.description || "" }}
                        />
                    </div>
                ))}
                </div>
            </section>
        )}
        
         {/* Certifications list as grid/columns */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
                 <h3 className="font-bold uppercase text-sm border-b-2 border-gray-900 mb-2 pb-0.5 tracking-wider" style={{ borderColor: colorHex }}>Certifications</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-800 list-disc list-inside">
                    {resumeData.certifications.map((cert, index) => (
                        <li key={index}>
                            <span className="font-medium">{cert.title}</span>
                             {cert.description && <span className="text-gray-600 hidden sm:inline"> - {cert.description}</span>}
                        </li>
                    ))}
                </ul>
            </section>
        )}

      </div>
    </div>
  );
}
