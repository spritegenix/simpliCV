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

export default function Ats16({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  // Classic serif styling
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
          "p-12 space-y-5 font-serif",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-6">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900 tracking-wide" style={{ color: colorHex }}>
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-sm text-gray-700 font-medium">
             {(resumeData.city || resumeData.country) && (
              <div className="flex items-center gap-1.5">
                <BiSolidMap size={14} />
                <span>{resumeData.city}{resumeData.city && resumeData.country ? ", " : ""}{resumeData.country}</span>
              </div>
            )}
            {resumeData.email && (
              <div className="flex items-center gap-1.5">
                <BiEnvelope size={14} />
                <span>{resumeData.email}</span>
              </div>
            )}
            {resumeData.phone && (
              <div className="flex items-center gap-1.5">
                <BiPhone size={14} />
                <span>{resumeData.phone}</span>
              </div>
            )}
             {resumeData.portfolioLink && (
               <Link href={resumeData.portfolioLink} target="_blank" className="flex items-center gap-1.5 hover:text-black">
                 <BiGlobe size={14} />
                 <span>Portfolio</span>
               </Link>
            )}
             {resumeData.socialLinks?.map((link, index) => {
                 const isGithub = link.toLowerCase().includes("github");
                 const isLinkedin = link.toLowerCase().includes("linkedin");
                 return (
                    <Link key={index} href={link} target="_blank" className="flex items-center gap-1.5 hover:text-black">
                        {isGithub ? <FaGithub size={14} /> : isLinkedin ? <FaLinkedin size={14} /> : <BiGlobe size={14} />}
                        <span>{link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                    </Link>
                 )
             })}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
            <h3 className="font-bold uppercase border-b-2 border-black mb-3 pb-1 tracking-wider text-sm">Summary</h3>
            <p className="text-sm leading-relaxed text-gray-800 text-justify">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {resumeData.educations && resumeData.educations.length > 0 && (
          <section>
            <h3 className="font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-wider text-sm">Education</h3>
            <div className="space-y-4">
              {resumeData.educations.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-gray-900 text-base">{edu.school}, <span className="font-normal italic text-gray-700 text-sm ml-1">{edu.degree}</span></span>
                    <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                      {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
                      {edu.endDate ? ` - ${formatDate(edu.endDate, "MMM yyyy")}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
          <section>
            <h3 className="font-bold uppercase border-b-2 border-black mb-4 pb-1 tracking-wider text-sm">Work Experience</h3>
            <div className="space-y-6">
              {resumeData.workExperiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold uppercase text-sm tracking-wide text-gray-900">{exp.company}</h4>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                       {exp.startDate && formatDate(exp.startDate, "MMM yyyy")} –{" "}
                       {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
                       {exp.jobLocation && <span className="hidden sm:inline"> | {exp.jobLocation}</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                     <p className="italic text-gray-800 font-medium">{exp.position}</p>
                     {/* Mobile optimization: show location here if needed, but keeping it simple for now */}
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

        {/* Skills */}
        {/* Changed title to "Technical Expertise" to match sample */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
             <h3 className="font-bold uppercase border-b-2 border-black mb-3 pb-1 tracking-wider text-sm">Technical Expertise</h3>
             <div className="text-sm leading-relaxed text-gray-800">
                {resumeData.skills.map((skill, index) => (
                    <div key={index} className="mb-1">
                         <span className="">{skill.skillName?.join(", ")}</span>
                    </div>
                ))}
             </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
            <section>
                <h3 className="font-bold uppercase border-b-2 border-black mb-3 pb-1 tracking-wider text-sm">Projects</h3>
                <div className="space-y-4">
                {resumeData.projectWorks.map((project, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-gray-900 text-sm uppercase">{project.title}</h4>
                             <span className="text-sm text-gray-600">
                                {project.startDate && formatDate(project.startDate, "MMM yyyy")}
                            </span>
                        </div>
                         {project.links && project.links.length > 0 && (
                            <div className="text-xs mb-1">
                                {project.links.map((link, i) => (
                                    <Link key={i} href={link} target="_blank" className="hover:underline text-blue-800 mr-2">
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
        
         {/* Certifications / Awards */}
         {/* Using generic title since sample had Awards but data is Certs. Adapting. */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
                 <h3 className="font-bold uppercase border-b-2 border-black mb-3 pb-1 tracking-wider text-sm">Awards & Certifications</h3>
                 <div className="space-y-2">
                    {resumeData.certifications.map((cert, index) => (
                        <div key={index}>
                            <h4 className="font-bold text-gray-900 text-sm">{cert.title}</h4>
                             {cert.description && <p className="text-sm text-gray-700 italic">{cert.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        )}

      </div>
    </div>
  );
}
