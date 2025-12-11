"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidMap } from "react-icons/bi";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import { Client } from "@clerk/nextjs/server";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats12({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10px]";

  const colorHex =
    resumeData.colorHex === "#000000" ? "#000000" : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-zinc-900",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "p-8 space-y-4 font-serif",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <header className="text-center border-b-2 border-gray-800 pb-4 mb-4">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-1" style={{ color: colorHex }}>
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          {resumeData.jobTitle && (
            <p className="text-lg font-medium italic text-gray-700 mb-2">
              {resumeData.jobTitle}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
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
            <SectionTitle title="Summary" />
            <p className="whitespace-pre-line leading-relaxed text-justify">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {resumeData.educations && resumeData.educations.length > 0 && (
          <section>
            <SectionTitle title="Education" />
            <div className="space-y-3">
              {resumeData.educations.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{edu.school}</h3>
                    <p className="italic">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {edu.startDate && formatDate(edu.startDate, "MMM yyyy")} -{" "}
                      {edu.endDate ? formatDate(edu.endDate, "MMM yyyy") : "Present"}
                    </p>
                    {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
          <section>
            <SectionTitle title="Work Experience" />
            <div className="space-y-4">
              {resumeData.workExperiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg uppercase" style={{ color: colorHex }}>{exp.company}</h3>
                    <span className="font-medium text-sm">
                       {exp.startDate && formatDate(exp.startDate, "MMM yyyy")} -{" "}
                       {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold italic">{exp.position}</p>
                     {exp.jobLocation && <span className="text-sm text-gray-600">{exp.jobLocation}</span>}
                  </div>
                  <div
                    className="richTextEditorStyle text-sm leading-snug"
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
            <section>
                <SectionTitle title="Projects" />
                {resumeData.projectWorks.map((project, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{project.title}</h3>
                            <span className="text-sm">
                                {project.startDate && formatDate(project.startDate, "MMM yyyy")} -{" "}
                                {project.endDate ? formatDate(project.endDate, "MMM yyyy") : "Present"}
                            </span>
                        </div>
                        {project.links && project.links.length > 0 && (
                            <div className="text-xs text-blue-600 mb-1">
                                {project.links.map((link, i) => (
                                    <Link key={i} href={link} target="_blank" className="mr-2 hover:underline">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div
                            className="richTextEditorStyle text-sm"
                            dangerouslySetInnerHTML={{ __html: project.description || "" }}
                        />
                    </div>
                ))}
            </section>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
            <SectionTitle title="Skills" />
            <div className="grid grid-cols-1 gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex">
                  <span className="font-bold w-32 shrink-0">{skill.title}:</span>
                  <span>{skill.skillName?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section>
                <SectionTitle title="Certifications" />
                <ul className="list-disc list-inside">
                    {resumeData.certifications.map((cert, index) => (
                        <li key={index}>
                            <span className="font-semibold">{cert.title}</span>
                            {cert.description && <span> - {cert.description}</span>}
                        </li>
                    ))}
                </ul>
            </section>
        )}

      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="border-b-[1px] border-black mb-3 mt-4">
      <h2 className="text-xl font-bold uppercase tracking-widest mb-1">{title}</h2>
    </div>
  );
}

function ContactLink({ href, text, icon }: { href: string; text: string; icon?: React.ReactNode }) {
    return (
        <Link href={href} className="flex items-center gap-1 hover:underline">
            {icon && <span>{icon}</span>}
            <span>{text}</span>
        </Link>
    )
}
