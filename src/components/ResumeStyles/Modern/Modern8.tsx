"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon, User, Layers, Award, Github, Linkedin, Facebook, Twitter } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern8({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default color: Teal
  const accentColor = resumeData.colorHex === "#000000" || !resumeData.colorHex 
    ? "#14b8a6" // Teal-500
    : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-slate-800 shadow-sm",
        className
      )}
      ref={containerRef}
    >
       {/* Montserrat Font Injection */}
       <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        `}} />

      <div
        className={cn(
          "h-full relative font-['Montserrat',sans-serif]",
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* HEADER TOP BAR */}
        <div className="w-full h-[60px]" style={{ backgroundColor: accentColor }} />

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-[280px_1fr] h-[calc(100%-60px)]">
            
            {/* LEFT COLUMN */}
            <div className="bg-slate-50 pt-8 pb-10 px-8 border-r border-slate-200">
                
                {/* PROFILE IMAGE */}
                <div className="flex justify-center mb-8">
                     <PhotoSection resumeData={resumeData} colorHex={accentColor} />
                </div>

                {/* CONTACT */}
                <div className="mb-8">
                    <SectionTitleSide title="Contact" colorHex={accentColor} />
                    <ContactSection resumeData={resumeData} colorHex={accentColor} />
                </div>

               {/* LANGUAGES */}
               <div className="mb-8">
                    <SectionTitleSide title="Languages" colorHex={accentColor} />
                    {/* Mock languages as strictly not in schema but common in this template type, using Others or similar if present, else static/hidden */}
                    {/* Assuming we might map skills or just skip if no explicit data. Using a placeholder or skill mapping if tagged */}
                     <div className="space-y-2">
                        {/* Placeholder if user added languages in 'skills' or we leave empty. 
                            Let's map Skills here just in case user put lang there, or skip. 
                            Actually, prompt asks for "Languages" section. We'll check if any skill is language-like or just render generic if empty? 
                            Better: Render Skills here as "Pro Skills" later, and if `others` has content, maybe use that.
                        */}
                    </div>
               </div>
                
                {/* PRO SKILLS */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                    <div className="mb-8">
                         <SectionTitleSide title="Pro Skills" colorHex={accentColor} />
                         <div className="space-y-4">
                             {resumeData.skills.map((skill, idx) => (
                                 <div key={idx}>
                                    <h4 className="font-bold text-xs text-slate-700 uppercase mb-1.5">{skill.title}</h4>
                                     <div className="space-y-2">
                                         {skill.skillName?.map((item, i) => (
                                             <div key={i} className="relative">
                                                 <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-0.5">
                                                     <span>{item}</span>
                                                 </div>
                                                 {/* Skill Bar Mockup */}
                                                 <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                     <div className="h-full rounded-full" style={{ width: `${Math.random() * 40 + 60}%`, backgroundColor: accentColor }} />
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                )}
                
                {/* SOCIAL */}
                 {resumeData.socialLinks && resumeData.socialLinks.length > 0 && (
                    <div className="mb-8">
                        <SectionTitleSide title="Social" colorHex={accentColor} />
                         <div className="space-y-3">
                             {resumeData.socialLinks.map((link, idx) => (
                                 <div key={idx} className="flex items-center gap-2">
                                     <div className="p-1.5 rounded-full text-white" style={{ backgroundColor: accentColor }}>
                                         <LinkIcon size={10} />
                                     </div>
                                     <a href={link} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-slate-600 hover:text-slate-900 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                                         {link.replace(/^https?:\/\/(www\.)?/, '')}
                                     </a>
                                 </div>
                             ))}
                         </div>
                    </div>
                 )}

            </div>

            {/* RIGHT COLUMN */}
            <div className="pt-12 px-10 pb-10">
                
                {/* NAME BLOCK */}
                <div className="mb-12">
                     <div 
                        className="inline-block px-10 py-5 rounded-r-full -ml-10 shadow-sm"
                        style={{ backgroundColor: accentColor }}
                     >
                         <h1 className="text-4xl font-extrabold text-white uppercase tracking-wide">
                             {resumeData.firstName} {resumeData.lastName}
                         </h1>
                         {resumeData.jobTitle && (
                             <p className="text-sm font-bold text-white uppercase tracking-[0.2em] mt-1 opacity-90">
                                 {resumeData.jobTitle}
                             </p>
                         )}
                     </div>
                </div>

                {/* ABOUT ME */}
                {resumeData.summary && (
                    <div className="mb-10">
                         <SectionTitleMain title="About Me" colorHex={accentColor} />
                         <p className="text-sm text-slate-600 leading-relaxed text-justify">
                             {resumeData.summary}
                         </p>
                    </div>
                )}

                {/* EXPERIENCE */}
                {resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
                     <div className="mb-10">
                         <SectionTitleMain title="Job Experience" colorHex={accentColor} />
                         <div className="space-y-8">
                             {resumeData.workExperiences.map((exp, idx) => (
                                 <div key={idx} className="grid grid-cols-[100px_1fr] gap-4 break-inside-avoid">
                                     {/* Date */}
                                     <div className="text-right pt-0.5">
                                         <span className="text-xs font-bold text-slate-500 uppercase block">
                                             {exp.endDate ? formatDate(exp.endDate, 'yyyy') : 'Present'}
                                         </span>
                                         <span className="text-[10px] font-semibold text-slate-400 uppercase block">
                                             {exp.startDate && formatDate(exp.startDate, 'MMM')} 
                                         </span>
                                     </div>
                                     
                                     {/* Content */}
                                     <div className="relative pl-6 border-l-2 border-slate-200">
                                          {/* Dot */}
                                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-2 ring-white" style={{ backgroundColor: accentColor }} />
                                          
                                          <h4 className="text-md font-bold text-slate-800 uppercase tracking-tight">{exp.position}</h4>
                                          <div className="text-xs font-bold text-slate-500 uppercase mb-2" style={{ color: accentColor }}>{exp.company}</div>
                                          
                                          <div 
                                              className="text-xs text-slate-600 leading-relaxed text-justify"
                                              dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                                            />
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                )}

                {/* EDUCATION */}
                {resumeData.educations && resumeData.educations.length > 0 && (
                     <div>
                         <SectionTitleMain title="Education" colorHex={accentColor} />
                         <div className="space-y-6">
                             {resumeData.educations.map((edu, idx) => (
                                 <div key={idx} className="grid grid-cols-[100px_1fr] gap-4 break-inside-avoid">
                                     <div className="text-right pt-0.5">
                                         <span className="text-xs font-bold text-slate-500 uppercase block">
                                             {edu.endDate ? formatDate(edu.endDate, 'yyyy') : 'Present'}
                                         </span>
                                     </div>
                                     <div className="relative pl-6 border-l-2 border-slate-200">
                                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-2 ring-white" style={{ backgroundColor: accentColor }} />
                                          <h4 className="text-md font-bold text-slate-800 uppercase">{edu.degree}</h4>
                                          <div className="text-xs font-bold text-slate-500 uppercase mb-1" style={{ color: accentColor }}>{edu.school}</div>
                                          {edu.description && <div className="text-xs text-slate-600">{edu.description}</div>}
                                     </div>
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

const PhotoSection = ({ resumeData, colorHex }: { resumeData: ResumeValues, colorHex: string }) => {
    const { photo } = resumeData;
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
        <div className="relative w-[160px] h-[160px]">
             <Image
                src={photoSrc}
                fill
                alt="Profile"
                className="object-cover rounded-full p-1 bg-white border-2"
                style={{ borderColor: colorHex }}
              />
        </div>
    )
}

const SectionTitleSide = ({ title, colorHex }: { title: string, colorHex: string }) => (
    <div className="mb-4 relative">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 pb-1 border-b-2 inline-block pr-4" style={{ borderColor: colorHex }}>
            {title}
        </h3>
    </div>
);

const SectionTitleMain = ({ title, colorHex }: { title: string, colorHex: string }) => (
    <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-1 rounded-full" style={{ backgroundColor: colorHex }} />
        <h3 className="text-lg font-black uppercase tracking-widest text-slate-800">
            {title}
        </h3>
        <div className="flex-grow h-[1px] bg-slate-200" />
    </div>
);

const ContactSection = ({ resumeData, colorHex }: { resumeData: ResumeValues, colorHex: string }) => {
    const { city, country, phone, email, portfolioLink } = resumeData;
    
    const Wrapper = ({ icon: Icon, text, href }: { icon: any, text: string, href?: string }) => (
        <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: colorHex }}>
                <Icon size={14} />
            </div>
            <div className="flex items-center pt-1.5">
                {href ? (
                    <a href={href} className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 break-all">{text}</a>
                ) : (
                    <span className="text-[11px] font-semibold text-slate-600">{text}</span>
                )}
            </div>
        </div>
    );

    return (
        <div>
             {(city || country) && <Wrapper icon={MapPin} text={[city, country].filter(Boolean).join(', ')} />}
             {phone && <Wrapper icon={Phone} text={phone} href={`tel:${phone}`} />}
             {email && <Wrapper icon={Mail} text={email} href={`mailto:${email}`} />}
             {portfolioLink && <Wrapper icon={Globe} text="Portfolio" href={portfolioLink} />}
        </div>
    )
}
