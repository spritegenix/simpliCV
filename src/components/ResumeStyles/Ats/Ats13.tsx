"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Link from "next/link";
import React, { useRef } from "react";
import { BiSolidMap } from "react-icons/bi";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats13({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10.5px]";

  const colorHex =
    resumeData.colorHex === "#000000" ? "#000000" : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-gray-800",
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
        <header className="border-b-[1px] border-gray-300 pb-5">
          <h1 className="text-4xl font-extrabold uppercase mb-1 tracking-tight" style={{ color: colorHex }}>
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p className="text-xl font-medium text-gray-600 mb-3">
              {resumeData.jobTitle}
            </p>
          )}
          
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 font-medium">
            {resumeData.email && (
              <ContactLink href={`mailto:${resumeData.email}`} text={resumeData.email} icon="✉" />
            )}
            {resumeData.phone && (
              <ContactLink href={`tel:${resumeData.phone}`} text={resumeData.phone} icon="☏" />
            )}
            {(resumeData.city || resumeData.country) && (
              <span className="flex items-center gap-1">
                <BiSolidMap className="inline" />
                {resumeData.city}{resumeData.city && resumeData.country ? ", " : ""}{resumeData.country}
              </span>
            )}
             {resumeData.portfolioLink && (
               <ContactLink href={resumeData.portfolioLink} text="Portfolio" icon="🌐" />
            )}
             {resumeData.socialLinks?.map((link, index) => (
                <ContactLink key={index} href={link} text={link.replace(/^https?:\/\/(www\.)?/, '')} />
             ))}
          </div>
        </header>

        {/* Summary */}
        {resumeData.summary && (
          <section>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Summary</h3>
            <p className="whitespace-pre-line leading-relaxed text-justify text-gray-700">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
          <section>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1">Experience</h3>
            <div className="space-y-5">
              {resumeData.workExperiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg" style={{ color: colorHex }}>{exp.company}</h4>
                    <span className="font-medium text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                       {exp.startDate && formatDate(exp.startDate, "MMM yyyy")} -{" "}
                       {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-gray-700">{exp.position}</p>
                     {exp.jobLocation && <span className="text-xs text-gray-400">{exp.jobLocation}</span>}
                  </div>
                  <div
                    className="richTextEditorStyle text-sm text-gray-600 leading-snug"
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1">Education</h3>
            <div className="space-y-4">
              {resumeData.educations.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base">{edu.school}</h4>
                    <p className="text-gray-600">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-gray-500">
                      {edu.startDate && formatDate(edu.startDate, "yyyy")} -{" "}
                      {edu.endDate ? formatDate(edu.endDate, "yyyy") : "Present"}
                    </p>
                     {edu.location && <p className="text-xs text-gray-400">{edu.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
            <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-1">Projects</h3>
                <div className="grid grid-cols-1 gap-4">
                {resumeData.projectWorks.map((project, index) => (
                    <div key={index} className="border-l-2 border-gray-100 pl-4">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold">{project.title}</h4>
                             <span className="text-xs text-gray-400">
                                {project.startDate && formatDate(project.startDate, "MMM yyyy")} -{" "}
                                {project.endDate ? formatDate(project.endDate, "MMM yyyy") : "Present"}
                            </span>
                        </div>
                        {project.links && project.links.length > 0 && (
                            <div className="text-xs text-blue-500 mb-1">
                                {project.links.map((link, i) => (
                                    <Link key={i} href={link} target="_blank" className="mr-3 hover:underline font-medium">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div
                            className="richTextEditorStyle text-sm text-gray-600 mt-1"
                            dangerouslySetInnerHTML={{ __html: project.description || "" }}
                        />
                    </div>
                ))}
                </div>
            </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-1">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded text-sm w-full sm:w-auto">
                  <span className="font-bold text-gray-700 mr-2">{skill.title}:</span>
                  <span className="text-gray-600">{skill.skillName?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
         {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-100 pb-1">Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {resumeData.certifications.map((cert, index) => (
                        <li key={index}>
                            <span className="font-semibold">{cert.title}</span>
                            {cert.description && <span className="text-gray-500"> — {cert.description}</span>}
                        </li>
                    ))}
                </ul>
            </section>
        )}

      </div>
    </div>
  );
}

function ContactLink({ href, text, icon }: { href: string; text: string; icon?: React.ReactNode }) {
    return (
        <Link href={href} className="flex items-center gap-1.5 hover:text-black transition-colors">
            {icon && <span className="opacity-70">{icon}</span>}
            <span>{text}</span>
        </Link>
    )
}
