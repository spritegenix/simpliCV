"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn, getResumeDateFormat, safeFormatDate } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats5({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const dateFormat = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const leftColumnKeys: ResumeSectionKey[] = [
    "summary",
    "workExperiences",
    "projectWorks",
  ];
  const rightColumnKeys: ResumeSectionKey[] = [
    "skills",
    "educations",
    "certifications",
    "others",
  ];
  const leftOrder = orderedSections.filter((k) => leftColumnKeys.includes(k));
  const rightOrder = orderedSections.filter((k) => rightColumnKeys.includes(k));

  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <>
        <Heading>Professional Summary</Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.summary || "",
          }}
          className="richTextEditorStyle !m-0 whitespace-pre-line"
        />
      </>
    ) : null,
    workExperiences:
      !!resumeData?.workExperiences &&
      resumeData?.workExperiences?.length > 0 ? (
        <>
          <Heading>Professional Experience</Heading>
          <ul className="space-y-1">
            {resumeData.workExperiences?.map((exp, index) => (
              <li key={index} className="z-10 break-inside-avoid">
                <div className="!m-0 flex items-center justify-between">
                  <span>
                    <span
                      data-resume-entry-title
                      className="text-[1.2em] font-semibold"
                      style={{
                        color: "var(--accent)",
                      }}
                    >
                      {exp.company}
                    </span>
                    {exp.position && (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="inline"
                        className="text-[1.1em] font-medium"
                      >
                        {exp.position}
                      </span>
                    )}
                  </span>
                  {exp.startDate && (
                    <span>
                      {safeFormatDate(exp.startDate, dateFormat)} -{" "}
                      {exp.endDate
                        ? safeFormatDate(exp.endDate, dateFormat)
                        : "present"}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  {exp.position ? (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="newline"
                      className="text-[1.1em] font-medium"
                    >
                      {exp.position}
                    </span>
                  ) : (
                    <span />
                  )}
                  {exp.jobLocation && <span>{exp.jobLocation}</span>}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.description || "",
                  }}
                  className="richTextEditorStyle whitespace-pre-line"
                />
              </li>
            ))}
          </ul>
        </>
      ) : null,
    projectWorks:
      !!resumeData.projectWorks && resumeData.projectWorks?.length > 0 ? (
        <>
          <Heading>Project Work</Heading>
          {resumeData.projectWorks?.map((item, index) => (
            <div key={index} className="!m-0 break-inside-avoid">
              <div className="!m-0 flex justify-between gap-1">
                <p className="flex gap-1">
                  <Link
                    data-resume-entry-title
                    href={
                      !!item?.links && item?.links[0] ? item?.links[0] : "#"
                    }
                    target="_blank"
                    className="text-[1.2em] font-semibold"
                    style={{
                      color: "var(--accent)",
                    }}
                  >
                    {item.title}
                  </Link>
                  {item.company && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      className="font-medium"
                    >
                      {item.company}
                    </span>
                  )}
                  {!!item.links &&
                    item.links.map((l, index) => (
                      <span key={index} className="mr-1 mt-1">
                        <ContactLinks href={l} text={"NO_TEXT"} />
                      </span>
                    ))}
                </p>
                <p className="flex flex-col text-right">
                  {item.startDate && (
                    <span>
                      {item.startDate &&
                        `${safeFormatDate(item.startDate, dateFormat)} - `}
                      {item.endDate
                        ? safeFormatDate(item.endDate, dateFormat)
                        : "present"}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between">
                {item.company && (
                  <span
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    className="font-medium"
                  >
                    {item.company}
                  </span>
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: item.description || "" }}
                className="richTextEditorStyle whitespace-pre-line"
              />
            </div>
          ))}
        </>
      ) : null,
    skills:
      !!resumeData.skills && resumeData.skills?.length > 0 ? (
        <>
          <Heading>Skills</Heading>
          {resumeData.skills?.map((skill, index) => (
            <div key={index} className="!m-0 break-inside-avoid">
              <div className="!m-0 flex items-center justify-between">
                <p>
                  <span className="font-semibold">{skill.title}</span>
                  {skill.skillName && skill.skillName.length > 0 && (
                    <span>- {skill.skillName?.join(", ")}</span>
                  )}
                </p>
              </div>
              <p className="whitespace-pre-line"></p>
            </div>
          ))}
        </>
      ) : null,
    educations:
      !!resumeData.educations && resumeData.educations?.length > 0 ? (
        <>
          <Heading>Education</Heading>
          {resumeData.educations?.map((edu, index) => (
            <div
              key={index}
              className={cn(
                "!m-0 break-inside-avoid",
                index !== (resumeData.educations?.length ?? 0) - 1 && "pb-2",
              )}
            >
              <div className="!m-0">
                <p>
                  {edu.startDate &&
                    `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                  {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "now"}
                </p>
                <p className="font-semibold">
                  {edu.school}
                  {edu.location && `, ${edu.location}`}
                </p>{" "}
              </div>
              <ul className="!mt-0 list-disc pl-3">
                {(edu.degree || edu.stream) && (
                  <li className="">
                    {edu.degree} {edu.stream && `(${edu.stream})`}
                  </li>
                )}
                {edu.marks && <li>{edu.marks}</li>}
                {edu.description && <li>{edu.description}</li>}
              </ul>
            </div>
          ))}
        </>
      ) : null,
    certifications:
      !!resumeData.certifications && resumeData.certifications?.length > 0 ? (
        <>
          <Heading>Certifications</Heading>
          <div className={cn("!m-0")}>
            {resumeData.certifications?.map((skill, index) => (
              <div
                key={index}
                className={cn(
                  "break-inside-avoid",
                  index !== (resumeData.certifications?.length ?? 0) - 1 &&
                    "pb-2",
                )}
              >
                <Link
                  href={skill.link ? skill.link : "#"}
                  className="before:mr-1 before:content-['•']"
                >
                  {skill.title}
                </Link>{" "}
                {skill.description && <p>{skill.description}</p>}
              </div>
            ))}
          </div>
        </>
      ) : null,
    others: !!resumeData.others?.title ? (
      <>
        <Heading>{resumeData.others.title}</Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.others.description || "",
          }}
          className="richTextEditorStyle !mt-0 whitespace-pre-line"
        />
      </>
    ) : null,
  };

  return (
    <div
      className={cn("aspect-[210/297] h-fit w-full bg-white", className)}
      style={{
        color: "var(--text)",
      }}
      ref={containerRef}
    >
      <style>
        {`
          /* ATS 5 default font hierarchy (Preview + Print/PDF)
             - Heading: Montserrat SemiBold/Bold
             - Subtitle: Montserrat Medium
             - Body: Open Sans Regular (driven by --resume-font-family)
          */
          #resumePreviewContent [data-resume-section-heading],
          #resumePreviewContent [data-resume-entry-title],
          #resumePreviewContent [data-resume-header] .font-bold {
            font-family: var(--font-montserrat) !important;
            font-weight: 600 !important;
          }

          #resumePreviewContent [data-resume-header] .font-bold {
            font-weight: 700 !important;
          }

          #resumePreviewContent [data-resume-entry-subtitle],
          #resumePreviewContent [data-resume-header] .font-medium {
            font-family: var(--font-montserrat) !important;
            font-weight: 500 !important;
            font-style: normal !important;
          }
        `}
      </style>
      <div
        className={cn(
          "grid h-full grid-cols-12 space-y-2",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {/* Left Side  */}
        <div className="col-span-8 space-y-3 p-3 pl-12 pt-10">
          {/* Name And Job Title  */}
          <div className="my-auto" data-resume-header>
            <p
              style={{
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
              }}
            >
              <span className="font-bold">{resumeData.firstName}</span>{" "}
              <span
                style={{
                  color: "var(--accent)",
                }}
              >
                {resumeData.lastName}
              </span>
            </p>
            <p
              className="font-medium"
              style={{
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {resumeData.jobTitle}
            </p>
          </div>
          {leftOrder.map((key) => (
            <React.Fragment key={key}>{sections[key]}</React.Fragment>
          ))}
        </div>
        {/* Right Side  */}
        <div className="col-span-4 space-y-3 p-3 pr-12 pt-10">
          <PersonalInfoHeader resumeData={resumeData} />
          {rightOrder.map((key) => (
            <React.Fragment key={key}>{sections[key]}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeader({ resumeData }: { resumeData: ResumeValues }) {
  const {
    photo,
    portfolioLink,
    socialLinks,
    city,
    country,
    phone,
    email,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div data-resume-header>
      {/* Photo  */}
      {photoSrc && (
        <div className="mb-4 flex w-full justify-end">
          <Image
            src={photoSrc}
            width={500}
            height={500}
            alt="Author photo"
            className="-ml-3 aspect-square h-[120px] w-[120px] border border-white object-cover object-top"
            style={{
              borderWidth: "calc(var(--resume-border-width) * 4)",
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "10%",
            }}
          />
        </div>
      )}
      {/* Social Links  */}
      <div data-resume-personal-details>
        <Heading>Contact</Heading>
        {(city || country) && (
          <p className="flex items-center gap-1">
            <BiSolidMap />
            {city}
            {city && country ? ", " : ""}
            {country}
          </p>
        )}
        <ContactLinks text={phone} href={`tel:${phone}`} />
        <ContactLinks text={email} href={`mailto:${email}`} />
        {!!socialLinks &&
          socialLinks.length > 0 &&
          socialLinks.map((link, index) => (
            <ContactLinks
              key={index}
              text={link.split("://")?.[1]}
              href={link}
            />
          ))}
        {portfolioLink && (
          <ContactLinks text={"Portfolio"} href={portfolioLink} />
        )}
      </div>
    </div>
  );
}
function ContactLinks({
  icon,
  text = "",
  href,
}: {
  icon?: React.ReactNode;
  text?: string | number | undefined;
  href?: string | undefined;
}) {
  return (
    <>
      {text && (
        <Link
          href={href ? href : "#"}
          target="_blank"
          className="flex items-center gap-1"
        >
          {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          {text === "NO_TEXT" ? "" : <p>{text}</p>}
        </Link>
      )}
    </>
  );
}

function Text({ children }: { children: string }) {
  return <p className="!m-0 whitespace-pre-line">{children}</p>;
}

function Heading({ children }: { children: string }) {
  return (
    <>
      <div data-resume-section-heading-wrap className="break-inside-avoid">
        <h1
          data-resume-section-heading
          className="text-nowrap text-[1.3em] font-semibold capitalize"
          style={{
            color: "var(--accent)",
          }}
        >
          {children}
        </h1>
      </div>
    </>
  );
}
