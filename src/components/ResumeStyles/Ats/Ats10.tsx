"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn, getResumeDateFormat, safeFormatDate } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import { hexToRgbaPercent } from "./Ats7";
import { ImProfile } from "react-icons/im";
import { PiCertificate, PiPuzzlePiece, PiSuitcaseSimple } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { BsPersonGear } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";
interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats10({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  const colorHex = "var(--accent)";

  const dateFormat = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <>
        <Heading colorHex={colorHex}>
          <ImProfile /> Professional Summary
        </Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.summary || "",
          }}
          className="richTextEditorStyle !m-0 whitespace-pre-line pt-1"
        />
      </>
    ) : null,
    workExperiences:
      !!resumeData?.workExperiences &&
      resumeData?.workExperiences?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>
            <PiSuitcaseSimple /> Professional Experience
          </Heading>
          {resumeData.workExperiences?.map((exp, index) => (
            <div
              key={index}
              className="!m-0 grid break-inside-avoid grid-cols-4 pt-1"
            >
              <div className="flex flex-col gap-y-1">
                {exp.startDate && (
                  <span>
                    {safeFormatDate(exp.startDate, dateFormat)} -{" "}
                    {exp.endDate
                      ? safeFormatDate(exp.endDate, dateFormat)
                      : "present"}
                  </span>
                )}
                {exp.jobLocation && (
                  <span className="font-semibold">{exp.jobLocation}</span>
                )}
              </div>
              <div className="col-span-3 !m-0">
                <div className="flex items-center justify-between">
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
                        className="text-[1.1em] font-semibold italic"
                      >
                        {exp.position}
                      </span>
                    )}
                  </span>
                </div>
                {exp.position && (
                  <div
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    className="text-[1.1em] font-semibold italic"
                  >
                    {exp.position}
                  </div>
                )}

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
          <Heading colorHex={colorHex}>
            <FaRegFolderOpen />
            Project Work
          </Heading>
          {resumeData.projectWorks?.map((item, index) => (
            <div
              key={index}
              className="!m-0 grid break-inside-avoid grid-cols-4 space-y-1 pt-1"
            >
              <div className="!m-0 flex flex-col gap-y-1">
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
                        <ContactLinks
                          color={colorHex}
                          href={l}
                          text={"NO_TEXT"}
                        />
                      </span>
                    ))}
                </p>
                {item.startDate && (
                  <span>
                    {item.startDate &&
                      `${safeFormatDate(item.startDate, dateFormat)} - `}
                    {item.endDate
                      ? safeFormatDate(item.endDate, dateFormat)
                      : "present"}
                  </span>
                )}
              </div>

              <div className="col-span-3">
                {item.company && (
                  <span
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    className="italic"
                  >
                    {item.company}
                  </span>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description || "",
                  }}
                  className="richTextEditorStyle whitespace-pre-line"
                />
              </div>
            </div>
          ))}
        </>
      ) : null,
    skills:
      !!resumeData.skills && resumeData.skills?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>
            <BsPersonGear /> Skills
          </Heading>
          <div className="grid grid-cols-4 gap-x-2 gap-y-2">
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
    educations:
      !!resumeData.educations && resumeData.educations?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>
            <HiOutlineAcademicCap />
            Academics
          </Heading>

          {resumeData.educations?.map((edu, index) => (
            <div key={index} className="grid break-inside-avoid grid-cols-4">
              <div className="">
                <p>
                  {edu.startDate &&
                    `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                  {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "now"}
                </p>
                <p> {edu.location}</p>
                <p className="!m-0 flex w-full flex-col justify-between">
                  {edu.marks && <span>Percentage: {edu.marks}%</span>}
                </p>
              </div>
              <div className="col-span-3 !m-0 w-full">
                <span className="flex justify-between font-semibold">
                  {edu.school}{" "}
                </span>{" "}
                <span className="flex justify-between">
                  {edu.degree} ({edu.stream})
                </span>
                <p>{edu.description}</p>
              </div>
            </div>
          ))}
        </>
      ) : null,
    certifications:
      !!resumeData.certifications && resumeData.certifications?.length > 0 ? (
        <>
          <Heading colorHex={colorHex}>
            <PiCertificate />
            Certifications
          </Heading>
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
                </Link>
                {skill.description && (
                  <span className="italic"> - {skill.description}</span>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null,
    others: !!resumeData.others?.title ? (
      <div className="break-inside-avoid">
        <Heading colorHex={colorHex}>
          <PiPuzzlePiece />
          {resumeData.others.title}
        </Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.others.description || "",
          }}
          className="richTextEditorStyle whitespace-pre-line pt-1"
        />
      </div>
    ) : null,
  };
  return (
    <div
      className={cn("aspect-[210/297] h-fit w-full bg-white", className)}
      ref={containerRef}
      style={{ color: "var(--text)" }}
    >
      <style>
        {`
          /* ATS 10 default font hierarchy (Preview + Print/PDF)
             - Heading: Merriweather Bold / SemiBold
             - Subtitle: Merriweather Medium
             - Body: Source Serif 4 Regular (driven by --resume-font-family)
          */
          #resumePreviewContent [data-resume-section-heading],
          #resumePreviewContent [data-resume-entry-title],
          #resumePreviewContent [data-resume-header] .font-bold {
            font-family: var(--font-merriweather) !important;
            font-weight: 600 !important;
          }

          #resumePreviewContent [data-resume-header] .font-bold {
            font-weight: 700 !important;
          }

          #resumePreviewContent [data-resume-entry-subtitle],
          #resumePreviewContent [data-resume-header] .font-medium {
            font-family: var(--font-merriweather) !important;
            font-weight: 500 !important;
            font-style: normal !important;
          }
        `}
      </style>
      <div
        className={cn("space-y-2", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {resumeData.photo ? (
          <PersonalInfoHeader resumeData={resumeData} hexBgColor={colorHex} />
        ) : (
          <PersonalInfoHeader1 resumeData={resumeData} hexBgColor={colorHex} />
        )}
        <div className="space-y-2 p-10 pt-3">
          {orderedSections.map((key) => (
            <React.Fragment key={key}>{sections[key]}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeader({
  resumeData,
  hexBgColor,
}: {
  resumeData: ResumeValues;
  hexBgColor: string;
}) {
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

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div
      className="mb-2 grid grid-cols-12 px-10 py-5"
      style={{
        backgroundColor: "#FFFFF0",
      }}
      data-resume-header
    >
      <div className="col-span-4 flex justify-center overflow-hidden">
        {photoSrc && (
          <Image
            src={photoSrc}
            width={500}
            height={500}
            alt="Author photo"
            className="aspect-square h-[135px] w-[135px] object-cover"
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
      <div className="col-span-8 flex h-max flex-col">
        <div className={`gird flex flex-col justify-between`}>
          <div className="flex flex-col items-start gap-x-1 text-gray-900">
            <p
              className="font-bold"
              style={{
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="font-medium"
              style={{
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
        {/* Social Links  */}
        <div
          className="flex w-[70%] flex-wrap gap-x-4 gap-y-1 text-[1.2em]"
          data-resume-personal-details
        >
          {(city || country) && (
            <p className="flex items-center gap-1">
              <span>
                <BiSolidMap color={`${hexToRgbaPercent("#000", 70)}`} />
              </span>
              <span className="text-gray-900">
                {city}
                {city && country ? ", " : ""}
                {country}
              </span>
            </p>
          )}
          <ContactLinks text={phone} href={`tel:${phone}`} color="#000" />
          <ContactLinks text={email} href={`mailto:${email}`} color="#000" />
          {!!socialLinks &&
            socialLinks.length > 0 &&
            socialLinks.map((link, index) => (
              <ContactLinks
                key={index}
                text={link.split("://")?.[1]}
                href={link}
                color="#000"
              />
            ))}
          {portfolioLink && (
            <ContactLinks
              text={"Portfolio"}
              href={portfolioLink}
              color="#000"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeader1({
  resumeData,
  hexBgColor,
}: {
  resumeData: ResumeValues;
  hexBgColor: string;
}) {
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

  return (
    <div
      className="mb-2 space-y-1 p-10"
      style={{
        backgroundColor: "#FFFFF0",
      }}
      data-resume-header
    >
      <Link
        href={resumeData.portfolioLink || "#"}
        className="block w-full cursor-pointer"
      >
        <div className="flex flex-col items-start gap-x-3 text-gray-900">
          <p
            className="font-bold"
            style={{
              fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
            }}
          >
            {firstName &&
              firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}{" "}
            {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              fontSize: "calc(var(--base-font) * 1.35 * var(--heading-scale))",
            }}
          >
            {jobTitle}
          </p>
        </div>
      </Link>
      {/* Social Links  */}
      <div
        className="grid grid-cols-2 flex-wrap gap-x-8 gap-y-1 text-sm"
        data-resume-personal-details
      >
        {(city || country) && (
          <p className="flex items-center gap-1 text-gray-900">
            <span>
              <BiSolidMap color={`${hexToRgbaPercent("#000", 70)}`} />
            </span>
            <span>
              {city}
              {city && country ? ", " : ""}
              {country}
            </span>
          </p>
        )}
        <ContactLinks text={phone} href={`tel:${phone}`} color="#000" />
        <ContactLinks text={email} href={`mailto:${email}`} color="#000" />
        {!!socialLinks &&
          socialLinks.map((link) => (
            <ContactLinks
              key={link}
              text={link.split("://")?.[1]}
              href={link}
              color="#000"
            />
          ))}
        {portfolioLink && (
          <ContactLinks text={"Portfolio"} href={portfolioLink} color="#000" />
        )}
      </div>
    </div>
  );
}

function ContactLinks({
  icon,
  text = "",
  href,
  color,
}: {
  icon?: React.ReactNode;
  text?: string | number | undefined;
  href?: string | undefined;
  color?: string;
}) {
  return (
    <>
      {text && (
        <Link
          href={href ? href : "#"}
          target="_blank"
          className="flex items-center gap-1"
        >
          <span
            style={{
              color: "#000",
            }}
          >
            {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          </span>
          {text === "NO_TEXT" ? null : <p className="text-gray-900">{text}</p>}
        </Link>
      )}
    </>
  );
}

function Text({ children }: { children: string }) {
  return <p className="!m-0 whitespace-pre-line pt-1">{children}</p>;
}

function Heading({
  children,
  colorHex,
}: {
  children: ReactNode;
  colorHex: string | undefined;
}) {
  return (
    <>
      <div
        data-resume-section-heading-wrap
        className="flex break-inside-avoid flex-col items-center justify-center space-y-1 text-base"
        style={{
          backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)",
        }}
      >
        <h1
          data-resume-section-heading
          className="flex items-center gap-x-2 text-nowrap text-[1.2em] font-semibold"
          style={{
            color: "var(--accent)",
          }}
        >
          {children}
        </h1>
        {/* <div
          className="border-1 mb-[5px] mt-auto h-0 w-full border"
          style={{
            borderColor: colorHex,
          }}
        /> */}
      </div>
    </>
  );
}
