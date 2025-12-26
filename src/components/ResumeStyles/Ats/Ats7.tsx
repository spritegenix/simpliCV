"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn, getResumeDateFormat, safeFormatDate } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats7({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const colorHex = "var(--accent)";

  const dateFormatNumeric = getResumeDateFormat(
    resumeData.dateFormat,
    "MM/yyyy",
  );
  const dateFormatText = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const leftColumnKeys: ResumeSectionKey[] = [
    "summary",
    "educations",
    "skills",
    "certifications",
    "others",
  ];
  const rightColumnKeys: ResumeSectionKey[] = [
    "workExperiences",
    "projectWorks",
  ];
  const leftOrder = orderedSections.filter((k) => leftColumnKeys.includes(k));
  const rightOrder = orderedSections.filter((k) => rightColumnKeys.includes(k));

  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <>
        <Heading colorHex={colorHex}>Professional Summary</Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.summary || "",
          }}
          className="richTextEditorStyle !m-0 whitespace-pre-line pt-1"
        />
      </>
    ) : null,
    educations:
      !!resumeData.educations && resumeData.educations?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>Academics</Heading>
          {resumeData.educations?.map((edu, index) => (
            <div key={index} className="!m-0 break-inside-avoid">
              <div className="">
                <div className="!m-0 flex w-[90%] flex-col flex-wrap justify-between">
                  <span className="text-[1.2em] font-semibold">
                    {edu.degree} ({edu.stream})
                  </span>
                  <span className="text-[1em] font-semibold">{edu.school}</span>{" "}
                  <p>{edu.description}</p>
                </div>
              </div>
              <div className="">
                <p className="!m-0 flex w-full gap-x-4">
                  <span>
                    {edu.startDate &&
                      `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                    {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "now"}
                  </span>
                  <span> {edu.location}</span>
                </p>
                {edu.marks && <span>Percentage: {edu.marks}%</span>}
              </div>
            </div>
          ))}
        </>
      ) : null,
    skills:
      !!resumeData.skills && resumeData.skills?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>Skills</Heading>
          <div className="grid grid-cols-1 gap-x-2 gap-y-2">
            {resumeData.skills?.map((skill, index) => (
              <div key={index} className="!m-0 break-inside-avoid">
                <div className="!m-0 flex items-center justify-between">
                  <p className="flex flex-col">
                    <span className="font-semibold">{skill.title}</span>
                    {skill.skillName && skill.skillName.length > 0 && (
                      <span>{skill.skillName?.join(", ")}</span>
                    )}
                  </p>
                </div>
                <p className="whitespace-pre-line"></p>
              </div>
            ))}
          </div>
        </>
      ) : null,
    certifications:
      !!resumeData.certifications && resumeData.certifications?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>Certifications</Heading>
          <div
            className={`flex flex-wrap gap-x-2 ${resumeData.certifications.find((skill) => skill.description) && "flex-col"}`}
          >
            {resumeData.certifications?.map((skill, index) => (
              <div key={index} className="!m-0 break-inside-avoid">
                <Link
                  href={skill.link ? skill.link : "#"}
                  className="before:mr-1 before:content-['•']"
                >
                  {skill.title}
                </Link>{" "}
                {skill.description && (
                  <span className="italic"> - {skill.description}</span>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null,
    others: !!resumeData.others?.title ? (
      <div className="!m-0 break-inside-avoid">
        <Heading colorHex={colorHex}>{resumeData.others.title}</Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.others.description || "",
          }}
          className="richTextEditorStyle whitespace-pre-line"
        />
      </div>
    ) : null,
    workExperiences:
      !!resumeData?.workExperiences &&
      resumeData?.workExperiences?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>Professional Experience</Heading>
          {resumeData.workExperiences?.map((exp, index) => (
            <div key={index} className="!m-0 break-inside-avoid pb-2">
              <div className="flex items-center justify-between gap-x-4">
                <span>
                  <span
                    data-resume-entry-title
                    className="text-[1.2em] font-semibold"
                    style={{
                      color: colorHex,
                    }}
                  >
                    {exp.company}
                  </span>
                  {exp.position && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      className="text-[1.4em] font-semibold italic"
                    >
                      {exp.position}
                    </span>
                  )}
                </span>
                {exp.startDate && (
                  <span>
                    {safeFormatDate(exp.startDate, dateFormatNumeric)} -{" "}
                    {exp.endDate
                      ? safeFormatDate(exp.endDate, dateFormatNumeric)
                      : "present"}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-x-4">
                {exp.position ? (
                  <span
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    className="text-[1.4em] font-semibold italic"
                  >
                    {exp.position}
                  </span>
                ) : (
                  <span />
                )}
                {exp.jobLocation && (
                  <span className="font-semibold">{exp.jobLocation}</span>
                )}
              </div>
              <div className="col-span-3 !m-0">
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.description || "",
                  }}
                  className="richTextEditorStyle whitespace-pre-line"
                />
              </div>
            </div>
          ))}
        </>
      ) : null,
    projectWorks:
      !!resumeData.projectWorks && resumeData.projectWorks?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>Project Work</Heading>
          {resumeData.projectWorks?.map((item, index) => (
            <div
              key={index}
              className="!m-0 w-[95%] break-inside-avoid space-y-1"
            >
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
                      color: colorHex,
                    }}
                  >
                    {item.title}
                  </Link>
                  {item.company && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      className="italic"
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
              </div>
              <div className="font-semibold">
                <p className="flex flex-row gap-1">
                  {item.company && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="newline"
                      className="italic"
                    >
                      {item.company}
                    </span>
                  )}
                  {item.startDate && (
                    <span>
                      {item.startDate &&
                        `${safeFormatDate(item.startDate, dateFormatText)} - `}
                      {item.endDate
                        ? safeFormatDate(item.endDate, dateFormatText)
                        : "present"}
                    </span>
                  )}
                </p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.description || "",
                }}
                className="richTextEditorStyle whitespace-pre-line"
              />
            </div>
          ))}
        </>
      ) : null,
  };
  return (
    <div
      className={cn("aspect-[210/297] h-fit w-full bg-white", className)}
      style={{ color: "var(--text)" }}
      ref={containerRef}
    >
      <div
        className={cn(
          "grid h-full grid-cols-6 gap-x-4 space-y-2 font-inter",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {/* left side */}
        <div
          className="col-span-3 p-10"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 30%, white)",
          }}
        >
          {resumeData.photo ? (
            <PersonalInfoHeader resumeData={resumeData} />
          ) : (
            <PersonalInfoHeader1 resumeData={resumeData} />
          )}
          {leftOrder.map((key) => (
            <React.Fragment key={key}>{sections[key]}</React.Fragment>
          ))}
        </div>

        {/* right side */}
        <div className="col-span-3 p-10">
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
    firstName,
    lastName,
    jobTitle,
    portfolioLink,
    socialLinks,
    city,
    country,
    phone,
    email,
    borderStyle,
  } = resumeData;
  const colorHex = "var(--accent)";

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex justify-between" data-resume-header>
      {/* Social Links  */}
      <div className="flex flex-col">
        <div className="flex h-max gap-6">
          {photoSrc && (
            <Image
              src={photoSrc}
              width={500}
              height={500}
              alt="Author photo"
              className="aspect-square h-[100px] w-[100px] object-cover object-top"
              style={{
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "10%",
              }}
            />
          )}
        </div>
        <div className={`flex flex-col justify-between`}>
          <div className="my-auto">
            <p
              className="font-bold"
              style={{
                color: colorHex,
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="font-medium"
              style={{
                color: colorHex,
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
        <div
          className="flex flex-col flex-wrap gap-x-2"
          data-resume-personal-details
        >
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
    </div>
  );
}
function PersonalInfoHeader1({ resumeData }: { resumeData: ResumeValues }) {
  const {
    firstName,
    lastName,
    jobTitle,
    portfolioLink,
    socialLinks,
    city,
    country,
    phone,
    email,
  } = resumeData;
  const colorHex = "var(--accent)";

  return (
    <div className="mb-2 space-y-2" data-resume-header>
      <div className="flex w-[90%] flex-col gap-y-2">
        <div className={`flex flex-col justify-between`}>
          <div className="my-auto">
            <p
              className="font-bold"
              style={{
                color: colorHex,
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="font-medium"
              style={{
                color: colorHex,
                fontSize: "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
        <div
          className="flex flex-col flex-wrap gap-x-2 space-y-1"
          data-resume-personal-details
        >
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

function Heading({
  children,
  colorHex,
}: {
  children: string;
  colorHex: string | undefined;
}) {
  return (
    <>
      <div
        data-resume-section-heading-wrap
        className="flex break-inside-avoid flex-col space-y-1 py-2 text-base"
      >
        <h1
          data-resume-section-heading
          className="text-nowrap text-[1.2em] font-semibold"
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

export function hexToRgbaPercent(
  hex: string = "#fff",
  alphaPercent: number = 100,
): string {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand (#f06 → #ff0066)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color.");
  }

  const r: number = parseInt(hex.substring(0, 2), 16);
  const g: number = parseInt(hex.substring(2, 4), 16);
  const b: number = parseInt(hex.substring(4, 6), 16);

  // Clamp alpha between 0–100
  alphaPercent = Math.max(0, Math.min(100, alphaPercent));

  return `rgba(${r}, ${g}, ${b}, ${alphaPercent}%)`;
}
