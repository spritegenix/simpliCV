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

export default function Ats15({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  // The template uses a classic Serif font (looks like Georgia or Times)
  // We'll use font-serif.
  const colorHex = resumeData.colorHex === "#000000" ? "#000000" : resumeData.colorHex;

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
          "p-10 space-y-6 font-serif", // Changed to font-serif
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-1 text-gray-900" style={{ color: colorHex }}>
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p className="text-lg italic text-gray-700 mb-2">
              {resumeData.jobTitle}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600">
             {(resumeData.city || resumeData.country) && (
              <div className="flex items-center gap-1">
                <BiSolidMap className="opacity-70" />
                <span>{resumeData.city}{resumeData.city && resumeData.country ? ", " : ""}{resumeData.country}</span>
              </div>
            )}
            {resumeData.email && (
              <div className="flex items-center gap-1">
                <BiEnvelope className="opacity-70" />
                <span className="underline decoration-dotted">{resumeData.email}</span>
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1">
                <BiPhone className="opacity-70" />
                <span>{resumeData.phone}</span>
              </div>
            )}
             {resumeData.portfolioLink && (
               <Link href={resumeData.portfolioLink} target="_blank" className="flex items-center gap-1 hover:text-gray-900">
                 <BiGlobe className="opacity-70" />
                 <span>Portfolio</span>
               </Link>
            )}
             {resumeData.socialLinks?.map((link, index) => {
                 const isGithub = link.toLowerCase().includes("github");
                 const isLinkedin = link.toLowerCase().includes("linkedin");
                 return (
                    <Link key={index} href={link} target="_blank" className="flex items-center gap-1 hover:text-gray-900">
                        {isGithub ? <FaGithub className="opacity-70" /> : isLinkedin ? <FaLinkedin className="opacity-70" /> : <BiGlobe className="opacity-70" />}
                        <span>{link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                    </Link>
                 )
             })}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
            <h3 className="text-sm font-bold uppercase border-b-2 border-gray-800 mb-2" style={{ borderColor: colorHex }}>Profile</h3>
            <p className="text-sm leading-relaxed text-gray-800 text-justify">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase border-b-2 border-gray-800 mb-3" style={{ borderColor: colorHex }}>Professional Experience</h3>
            <div className="space-y-4">
              {resumeData.workExperiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-base text-gray-900">{exp.position}</h4>
                    <span className="text-sm text-gray-600 font-medium">
                       {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} –{" "}
                       {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                     <span className="italic text-gray-700">{exp.company}</span>
                     {exp.jobLocation && <span className="text-xs text-gray-500">{exp.jobLocation}</span>}
                  </div>
                  <div
                    className="richTextEditorStyle text-sm text-gray-800 leading-snug"
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
            <h3 className="text-sm font-bold uppercase border-b-2 border-gray-800 mb-3" style={{ borderColor: colorHex }}>Education</h3>
            <div className="space-y-3">
              {resumeData.educations.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-base text-gray-900">{edu.degree}</h4>
                    <span className="text-sm text-gray-600 font-medium">
                      {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} –{" "}
                      {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                    </span>
                  </div>
                   <div className="flex justify-between items-baseline">
                        <span className="italic text-gray-700">{edu.school}</span>
                        {edu.location && <span className="text-xs text-gray-500">{edu.location}</span>}
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
             <h3 className="text-sm font-bold uppercase border-b-2 border-gray-800 mb-2" style={{ borderColor: colorHex }}>Skills</h3>
            <div className="text-sm leading-relaxed">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="mb-1">
                   <span className="font-bold text-gray-900">• {skill.title}:</span> <span className="text-gray-800">{skill.skillName?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
            <section>
                <h3 className="text-sm font-bold uppercase border-b-2 border-gray-800 mb-3" style={{ borderColor: colorHex }}>Projects</h3>
                <div className="space-y-3">
                {resumeData.projectWorks.map((project, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-gray-900">{project.title}</h4>
                             <span className="text-sm text-gray-600">
                                {project.startDate && formatDate(project.startDate, "MM/yyyy")}
                            </span>
                        </div>
                        {project.links && project.links.length > 0 && (
                            <div className="text-xs mb-1">
                                {project.links.map((link, i) => (
                                    <Link key={i} href={link} target="_blank" className="hover:underline text-blue-700 mr-2">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div
                            className="richTextEditorStyle text-sm text-gray-800"
                            dangerouslySetInnerHTML={{ __html: project.description || "" }}
                        />
                    </div>
                ))}
                </div>
            </section>
        )}
        
         {/* Certifications (Awards/Languages mapped here if needed visually, but using standard fields) */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
                 <h3 className="text-sm font-bold uppercase border-b-2 border-gray-800 mb-2" style={{ borderColor: colorHex }}>Awards & Certifications</h3>
                <ul className="list-none text-sm text-gray-800 space-y-1">
                    {resumeData.certifications.map((cert, index) => (
                        <li key={index}>
                            <span className="font-bold">{cert.title}</span>
                            {cert.description && <span className="text-gray-600 block pl-2 italic">{cert.description}</span>}
                        </li>
                    ))}
                </ul>
            </section>
        )}

      </div>
    </div>
  );
}
