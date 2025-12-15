"use client";
import React, { useRef, useState, useEffect } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { MapPin, Phone, Mail, Globe, Link as LinkIcon } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function MillieSmithResume({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // Default color logic
  const colorHex = resumeData.colorHex === "#000000" || !resumeData.colorHex 
    ? "#2c5f7c" // Navy blue matching the template
    : resumeData.colorHex;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-slate-800 shadow-sm",
        className
      )}
      ref={containerRef}
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div
        className={cn(
          "h-full",
          !width && "invisible"
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Header Section */}
        <div className="text-center px-10 pt-8 pb-4 bg-gray-50">
          <h1 className="text-3xl font-light tracking-[0.5rem] text-gray-700 mb-1">
            {resumeData.firstName?.toUpperCase()} {resumeData.lastName?.toUpperCase()}
          </h1>
          {resumeData.jobTitle && (
            <p className="text-xs tracking-[0.15rem] font-normal" style={{ color: colorHex }}>
              {resumeData.jobTitle.toUpperCase()}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-gray-300 mx-10" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 min-h-[calc(100%-180px)]">
          {/* Left Column */}
          <div className="col-span-5 border-r-2 border-gray-300">
            <LeftColumn resumeData={resumeData} colorHex={colorHex} />
          </div>

          {/* Right Column */}
          <div className="col-span-7">
            <RightColumn resumeData={resumeData} colorHex={colorHex} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface SectionProps {
  resumeData: ResumeValues;
  colorHex?: string;
  className?: string;
}

const LeftColumn: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
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

  return (
    <div className="p-8 space-y-6">
      {/* Photo */}
      {photoSrc && (
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            <Image
              src={photoSrc}
              width={128}
              height={128}
              alt="Profile"
              className="object-cover w-full h-full"
              style={{
                borderRadius: borderStyle === BorderStyles.SQUARE ? '0px' : borderStyle === BorderStyles.CIRCLE ? '50%' : '10%',
              }}
            />
          </div>
        </div>
      )}

      {/* About Section */}
      {resumeData.summary && (
        <div>
          <SectionTitle title="ABOUT" colorHex={colorHex} />
          <p className="text-xs leading-relaxed text-gray-600">
            {resumeData.summary}
          </p>
        </div>
      )}

      {/* Horizontal Divider */}
      <div className="h-px bg-gray-300" />

      {/* Contact Section */}
      <ContactSection resumeData={resumeData} colorHex={colorHex} />

      {/* Horizontal Divider */}
      <div className="h-px bg-gray-300" />

      {/* Skills Section */}
      <SkillsSection resumeData={resumeData} colorHex={colorHex} />
    </div>
  );
};

const RightColumn: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  return (
    <div className="p-8 space-y-6">
      {/* Education Section */}
      <EducationSection resumeData={resumeData} colorHex={colorHex} />

      {/* Horizontal Divider */}
      {resumeData.educations && resumeData.educations.length > 0 && 
       resumeData.workExperiences && resumeData.workExperiences.length > 0 && (
        <div className="h-px bg-gray-300 my-4" />
      )}

      {/* Experience Section */}
      <ExperienceSection resumeData={resumeData} colorHex={colorHex} />

      {/* Projects Section */}
      {resumeData.projectWorks && resumeData.projectWorks.length > 0 && (
        <>
          <div className="h-px bg-gray-300 my-4" />
          <ProjectsSection resumeData={resumeData} colorHex={colorHex} />
        </>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <>
          <div className="h-px bg-gray-300 my-4" />
          <CertificationsSection resumeData={resumeData} colorHex={colorHex} />
        </>
      )}
    </div>
  );
};

function SectionTitle({ title, colorHex }: { title: string; colorHex?: string }) {
  return (
    <h2 
      className="text-lg font-bold tracking-wide mb-3"
      style={{ color: colorHex }}
    >
      {title}
    </h2>
  );
}

const ContactSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { city, country, phone, email, portfolioLink, socialLinks } = resumeData;

  return (
    <div>
      <SectionTitle title="CONTACT" colorHex={colorHex} />
      <div className="space-y-3">
        {phone && (
          <div className="flex items-start gap-3">
            <Phone size={14} style={{ color: colorHex, flexShrink: 0, marginTop: '2px' }} />
            <span className="text-xs text-gray-600">{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-start gap-3">
            <Mail size={14} style={{ color: colorHex, flexShrink: 0, marginTop: '2px' }} />
            <span className="text-xs text-gray-600 break-all">{email}</span>
          </div>
        )}
        {portfolioLink && (
          <div className="flex items-start gap-3">
            <Globe size={14} style={{ color: colorHex, flexShrink: 0, marginTop: '2px' }} />
            <a href={portfolioLink} className="text-xs text-gray-600 hover:underline break-all">
              {portfolioLink.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        )}
        {(city || country) && (
          <div className="flex items-start gap-3">
            <MapPin size={14} style={{ color: colorHex, flexShrink: 0, marginTop: '2px' }} />
            <span className="text-xs text-gray-600">
              {[city, country].filter(Boolean).join(', ')}
            </span>
          </div>
        )}
        {socialLinks?.map((link, index) => (
          <div key={index} className="flex items-start gap-3">
            <LinkIcon size={14} style={{ color: colorHex, flexShrink: 0, marginTop: '2px' }} />
            <a href={link} target="_blank" rel="noreferrer" className="text-xs text-gray-600 hover:underline break-all">
              {link.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { skills } = resumeData;
  if (!skills || skills.length === 0) return null;

  return (
    <div>
      <SectionTitle title="SKILLS" colorHex={colorHex} />
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="text-xs text-gray-600 pl-4 relative">
            <span 
              className="absolute left-0 top-0.5 text-[8px]"
              style={{ color: colorHex }}
            >
              ■
            </span>
            <span className="font-medium">{skill.title}</span>
            {skill.skillName && skill.skillName.length > 0 && (
              <span className="text-gray-500"> - {skill.skillName.join(', ')}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EducationSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { educations } = resumeData;
  if (!educations || educations.length === 0) return null;

  return (
    <div>
      <SectionTitle title="EDUCATION" colorHex={colorHex} />
      <div className="space-y-4">
        {educations.map((edu, index) => (
          <div key={index} className="break-inside-avoid">
            <p className="text-xs text-gray-600 mb-1">
              {edu.startDate && formatDate(edu.startDate, 'yyyy')} - {edu.endDate ? formatDate(edu.endDate, 'yyyy') : 'Present'}
            </p>
            <div className="pl-4 relative">
              <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">■</span>
              <p className="font-bold text-sm text-gray-800 mb-0.5">
                {edu.degree?.toUpperCase()}
              </p>
              <p className="text-xs text-gray-600">{edu.school}</p>
              {edu.stream && (
                <p className="text-xs text-gray-600">in {edu.stream}</p>
              )}
              {edu.location && (
                <p className="text-[10px] text-gray-500 italic mt-0.5">{edu.location}</p>
              )}
              {edu.marks && (
                <p className="text-[10px] text-gray-600 mt-0.5">Grade: {edu.marks}</p>
              )}
              {edu.description && (
                <div className="text-[10px] text-gray-600 mt-1 whitespace-pre-line">
                  {edu.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { workExperiences } = resumeData;
  if (!workExperiences || workExperiences.length === 0) return null;

  return (
    <div>
      <SectionTitle title="EXPERIENCE" colorHex={colorHex} />
      <div className="space-y-4">
        {workExperiences.map((exp, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="pl-4 relative">
              <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">■</span>
              <div className="mb-2">
                <p className="font-bold text-sm text-gray-800">{exp.company?.toUpperCase()}</p>
                <p className="text-xs text-gray-600">
                  {exp.startDate && formatDate(exp.startDate, 'yyyy')} - {exp.endDate ? formatDate(exp.endDate, 'yyyy') : 'PRESENT'}
                </p>
              </div>
              <p className="text-xs text-gray-600 mb-1 font-semibold">{exp.position}</p>
              {exp.jobLocation && (
                <p className="text-[10px] text-gray-500 mb-1">{exp.jobLocation}</p>
              )}
              {exp.description && (
                <div 
                  className="text-xs text-gray-600 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { projectWorks } = resumeData;
  if (!projectWorks || projectWorks.length === 0) return null;

  return (
    <div>
      <SectionTitle title="PROJECTS" colorHex={colorHex} />
      <div className="space-y-4">
        {projectWorks.map((project, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="pl-4 relative">
              <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">■</span>
              <div className="mb-1">
                <p className="font-bold text-sm text-gray-800">{project.title}</p>
                <p className="text-xs text-gray-600">
                  {project.startDate && formatDate(project.startDate, 'yyyy')} - {project.endDate ? formatDate(project.endDate, 'yyyy') : 'Present'}
                </p>
              </div>
              {project.description && (
                <div 
                  className="text-xs text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificationsSection: React.FC<SectionProps> = ({ resumeData, colorHex }) => {
  const { certifications } = resumeData;
  if (!certifications || certifications.length === 0) return null;

  return (
    <div>
      <SectionTitle title="CERTIFICATIONS" colorHex={colorHex} />
      <ul className="space-y-2">
        {certifications.map((cert, index) => (
          <li key={index} className="text-xs text-gray-600 pl-4 relative">
            <span className="absolute left-0 top-0.5 text-[8px] text-gray-800">■</span>
            <span className="font-bold block">{cert.title}</span>
            {cert.description && (
              <span className="text-[10px] text-gray-500">{cert.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};