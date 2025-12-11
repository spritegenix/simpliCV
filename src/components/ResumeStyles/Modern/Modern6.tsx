"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon, Award, Star, BookOpen, User } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern6({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default accent color
  const accentColor = resumeData.colorHex === "#000000" || !resumeData.colorHex 
    ? "#0f172a" // Slate-900 default
    : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white font-sans text-slate-800 shadow-sm",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "h-full relative overflow-hidden",
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
         {/* Geometric Header Shape (Top Left) */}
         <div 
            className="absolute top-0 left-0 w-[45%] h-[220px] z-0"
            style={{ 
                backgroundColor: accentColor,
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)"
            }}
         />

        {/* Header Content */}
        <div className="relative z-10 flex justify-between items-start px-12 pt-12 mb-12">
            
            {/* Left: Photo Area */}
            <div className="w-[30%] pl-4 pt-2">
                 <PhotoSection resumeData={resumeData} />
            </div>

            {/* Right: Name & Title */}
            <div className="w-[65%] text-right pt-6">
                <h1 className="text-5xl font-extrabold uppercase tracking-tight text-slate-900 mb-2">
                    {resumeData.firstName} <span style={{ color: accentColor }}>{resumeData.lastName}</span>
                </h1>
                {resumeData.jobTitle && (
                    <p className="text-xl font-medium tracking-widest uppercase text-slate-500">
                        {resumeData.jobTitle}
                    </p>
                )}
            </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-[33%_1px_1fr] gap-8 px-12 h-full items-stretch">
            
            {/* LEFT COLUMN */}
            <div className="space-y-10 pb-10">
                
                {/* Contact */}
                <div>
                     <SectionTitle title="Contact Me" colorHex={accentColor} />
                     <ContactSection resumeData={resumeData} colorHex={accentColor} />
                </div>

                {/* Expertise (Skills) */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                    <div>
                        <SectionTitle title="Expertise" colorHex={accentColor} />
                        <div className="space-y-4">
                            {resumeData.skills.map((skill, idx) => (
                                <div key={idx}>
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">{skill.title}</h4>
                                    <div className="text-sm text-slate-600 leading-relaxed">
                                        {skill.skillName?.join(", ")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rewards / Others */}
                {/* Using 'Others' section for Rewards/Awards if available, or just generic list */}
                {resumeData.others && (resumeData.others.title || resumeData.others.description) && (
                     <div>
                        <SectionTitle title={resumeData.others.title || "Rewards"} colorHex={accentColor} />
                        <div 
                             className="text-sm text-slate-600 whitespace-pre-line"
                             dangerouslySetInnerHTML={{ __html: resumeData.others.description || "" }}
                        />
                     </div>
                )}

            </div>

            {/* DIVIDER LINE */}
            <div className="bg-slate-200 h-full w-[1px]" />

            {/* RIGHT COLUMN */}
            <div className="space-y-10 pb-10 pl-2">
                
                 {/* Experience */}
                 {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
                    <div>
                        <SectionTitle title="Experience" colorHex={accentColor} />
                        <div className="space-y-6">
                            {resumeData.workExperiences.map((exp, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-slate-800 uppercase">{exp.position}</h4>
                                        <span className="text-sm font-semibold text-slate-500">
                                            {exp.startDate && formatDate(exp.startDate, 'yyyy')} - {exp.endDate ? formatDate(exp.endDate, 'yyyy') : 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide" style={{ color: accentColor }}>
                                        {exp.company}
                                    </div>
                                    <div 
                                      className="text-sm text-slate-600 leading-relaxed text-justify"
                                      dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                 )}

                 {/* Education */}
                 {resumeData.educations && resumeData.educations.length > 0 && (
                     <div>
                        <SectionTitle title="Education" colorHex={accentColor} />
                        <div className="space-y-5">
                             {resumeData.educations.map((edu, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                     <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-slate-800 uppercase">{edu.degree}</h4>
                                        <span className="text-sm font-semibold text-slate-500">
                                            {edu.startDate && formatDate(edu.startDate, 'yyyy')} - {edu.endDate ? formatDate(edu.endDate, 'yyyy') : 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold mb-1 uppercase tracking-wide" style={{ color: accentColor }}>{edu.school}</div>
                                    {edu.description && <div className="text-sm text-slate-600">{edu.description}</div>}
                                </div>
                             ))}
                        </div>
                     </div>
                 )}

                 {/* References (mock or section usage) */}
                 {/* Can map Certifications here or explicit references if data existed. Mapping Certifications. */}
                 {resumeData.certifications && resumeData.certifications.length > 0 && (
                     <div>
                         <SectionTitle title="References" colorHex={accentColor} />
                         <div className="grid grid-cols-2 gap-4">
                             {resumeData.certifications.map((cert, idx) => (
                                 <div key={idx} className="break-inside-avoid p-4 bg-slate-50 border border-slate-100 rounded-sm">
                                     <h4 className="font-bold text-slate-900 text-sm mb-1">{cert.title}</h4>
                                      {cert.description && <p className="text-xs text-slate-600 leading-tight">{cert.description}</p>}
                                 </div>
                             ))}
                         </div>
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

const PhotoSection = ({ resumeData }: { resumeData: ResumeValues }) => {
    const { photo, borderStyle } = resumeData;
    const [photoSrc, setPhotoSrc] = useState<string>(photo instanceof File ? "" : (photo || ""));
  
    useEffect(() => {
      if (photo instanceof File) {
        const objectUrl = URL.createObjectURL(photo);
        setPhotoSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
       if (photo === null) setPhotoSrc("");
    }, [photo]);

    if (!photoSrc) return null;

    return (
        <div className="relative">
             <Image
                src={photoSrc}
                width={180}
                height={180}
                alt="Profile"
                className="object-cover bg-white shadow-xl"
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: borderStyle === BorderStyles.SQUARE ? '0px' : borderStyle === BorderStyles.CIRCLE ? '50%' : '4px',
                  border: `8px solid white`
                }}
              />
        </div>
    )
}

const SectionTitle = ({ title, colorHex }: { title: string, colorHex: string }) => (
    <div className="mb-6 border-b-2 pb-2" style={{ borderColor: colorHex }}>
        <h3 className="text-xl font-black uppercase tracking-widest text-slate-800">
            {title}
        </h3>
    </div>
);

const ContactSection = ({ resumeData, colorHex }: { resumeData: ResumeValues, colorHex: string }) => {
    const { city, country, phone, email, socialLinks, portfolioLink } = resumeData;
    
    // Icons circle style
    const IconWrapper = ({ children }: { children: React.ReactNode }) => (
        <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: colorHex }}
        >
            {children}
        </div>
    );

    return (
        <div className="space-y-5">
             {(city || country) && (
                <div className="flex items-center gap-4">
                    <IconWrapper><MapPin size={14} /></IconWrapper>
                    <span className="text-sm text-slate-600 font-medium">{[city, country].filter(Boolean).join(', ')}</span>
                </div>
            )}
             {phone && (
                <div className="flex items-center gap-4">
                    <IconWrapper><Phone size={14} /></IconWrapper>
                    <a href={`tel:${phone}`} className="text-sm text-slate-600 font-medium hover:text-slate-900">{phone}</a>
                </div>
            )}
             {email && (
                <div className="flex items-center gap-4">
                    <IconWrapper><Mail size={14} /></IconWrapper>
                    <a href={`mailto:${email}`} className="text-sm text-slate-600 font-medium hover:text-slate-900 break-all">{email}</a>
                </div>
            )}
            {portfolioLink && (
                 <div className="flex items-center gap-4">
                    <IconWrapper><Globe size={14} /></IconWrapper>
                    <a href={portfolioLink} target="_blank" rel="noreferrer" className="text-sm text-slate-600 font-medium hover:text-slate-900">Portfolio</a>
                </div>
            )}
            {socialLinks?.map((link, index) => (
                 <div key={index} className="flex items-center gap-4">
                    <IconWrapper><LinkIcon size={14} /></IconWrapper>
                    <a href={link} target="_blank" rel="noreferrer" className="text-sm text-slate-600 font-medium hover:text-slate-900 overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px]">
                        {link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                </div>
            ))}
        </div>
    )
}
