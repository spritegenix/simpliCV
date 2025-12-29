"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { safeFormatDate } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Modern2({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "resume-root modern aspect-[210/297] h-fit w-full bg-white p-6",
        className,
      )}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
      ref={containerRef}
    >
      <div
        className={cn(
          "space-y-[calc(var(--section-gap)*0.5)] font-inter",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {resumeData.photo ? (
          <PersonalInfoHeader resumeData={resumeData} />
        ) : (
          <PersonalInfoHeader1 resumeData={resumeData} />
        )}
        {/* Summary */}
        {resumeData.summary && (
          <>
            <Heading>Professional Summary</Heading>
            <div
              dangerouslySetInnerHTML={{
                __html: resumeData.summary || "",
              }}
              className="richTextEditorStyle !m-0 whitespace-pre-line"
            />
          </>
        )}
        {/* Experience */}
        {!!resumeData?.workExperiences &&
          resumeData?.workExperiences?.length > 0 && (
            <>
              <Heading>Professional Experience</Heading>
              {resumeData.workExperiences?.map((exp, index) => (
                <div key={index} className="!m-0 break-inside-avoid">
                  <div className="!m-0 flex items-center justify-between">
                    <span
                      className="text-[1.2em] font-semibold"
                      style={{
                        color: "var(--accent)",
                      }}
                    >
                      <span data-resume-entry-title>{exp.company}</span>
                      {exp.position && (
                        <span
                          data-resume-entry-subtitle
                          data-entry-subtitle-slot="inline"
                          className="font-semibold italic"
                        >
                          {exp.position}
                        </span>
                      )}
                    </span>
                    {exp.startDate && (
                      <span>
                        {safeFormatDate(exp.startDate, "MMM yyyy")} -{" "}
                        {exp.endDate
                          ? safeFormatDate(exp.endDate, "MMM yyyy")
                          : "Present"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    {exp.position ? (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="newline"
                        className="text-[1.1em] font-semibold italic"
                      >
                        {exp.position}
                      </span>
                    ) : (
                      <span />
                    )}
                    {exp.jobLocation && <span>{exp.jobLocation}</span>}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                    className="richTextEditorStyle whitespace-pre-line"
                  />
                </div>
              ))}
            </>
          )}
        {/* Projects */}
        {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
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
                  <p className="flex flex-col text-right">
                    {item.startDate && (
                      <span>
                        {item.startDate &&
                          `${safeFormatDate(item.startDate, "MMM yyyy")} - `}
                        {item.endDate
                          ? safeFormatDate(item.endDate, "MMM yyyy")
                          : "Present"}
                      </span>
                    )}
                  </p>
                </div>
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
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                  className="richTextEditorStyle whitespace-pre-line"
                />
              </div>
            ))}
          </>
        )}
        {/* Skills  */}
        {!!resumeData.skills && resumeData.skills?.length > 0 && (
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
        )}
        {/* Academics */}
        {!!resumeData.educations && resumeData.educations?.length > 0 && (
          <>
            <Heading>Academics</Heading>
            <div className="!m-0 grid grid-cols-2 gap-5">
              {resumeData.educations?.map((edu, index) => (
                <div key={index} className="break-inside-avoid">
                  <p className="!m-0 flex w-full justify-between">
                    <span className="font-semibold">
                      {edu.school}, {edu.location}
                    </span>{" "}
                    <span>
                      {edu.startDate &&
                        `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                      {edu.endDate
                        ? safeFormatDate(edu.endDate, "yyyy")
                        : "Present"}
                    </span>
                  </p>
                  <p className="!m-0 flex w-full justify-between">
                    <span className="">
                      {edu.degree} ({edu.stream})
                    </span>
                    <span>{edu.marks}</span>
                  </p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-5">
          {/* Certifications  */}
          {!!resumeData.certifications &&
            resumeData.certifications?.length > 0 && (
              <div>
                <Heading>Certifications</Heading>
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
              </div>
            )}
          {/* Interest  */}
          {!!resumeData.others?.title && (
            <div className="!m-0 break-inside-avoid">
              <Heading>{resumeData.others.title}</Heading>
              <div
                dangerouslySetInnerHTML={{
                  __html: resumeData.others.description || "",
                }}
                className="richTextEditorStyle whitespace-pre-line"
              />
            </div>
          )}
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

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="mb-2">
      <div className="flex h-max gap-6">
        {photoSrc && (
          <Image
            src={photoSrc}
            width={500}
            height={500}
            alt="Author photo"
            className="aspect-square h-[180px] w-[180px] object-cover object-top"
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
        <div
          className={`flex ${photoSrc ? "h-[180px]" : ""} flex-col justify-between`}
        >
          <div className="my-auto" data-resume-header>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
                fontWeight: "var(--name-font-weight)" as any,
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="font-medium"
              style={{
                color: "var(--accent)",
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
            {/* Demographics below role */}
            <div className="mt-2" data-resume-personal-details>
              {(city || country) && (
                <p className="flex items-center gap-1">
                  <span className="text-[var(--accent)]">
                    <BiSolidMap />
                  </span>
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

  return (
    <div className="mb-2">
      <Link
        href={resumeData.portfolioLink || "#"}
        className="cursor-pointer text-center"
        data-resume-header
      >
        <p
          style={{
            color: "var(--accent)",
            fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
            fontWeight: "var(--name-font-weight)" as any,
          }}
        >
          {firstName} {lastName}
        </p>
        <p
          className="font-medium"
          style={{
            color: "var(--accent)",
            fontSize: "calc(var(--base-font) * 1.35 * var(--heading-scale))",
          }}
        >
          {jobTitle}
        </p>
      </Link>
      {/* Social Links  */}
      <div
        className="mx-auto flex max-w-xl flex-wrap justify-center gap-x-4"
        data-resume-personal-details
      >
        {(city || country) && (
          <p className="flex items-center gap-1">
            <span className="text-[var(--accent)]">
              <BiSolidMap />
            </span>
            {city}
            {city && country ? ", " : ""}
            {country}
          </p>
        )}
        <ContactLinks text={phone} href={`tel:${phone}`} />
        <ContactLinks text={email} href={`mailto:${email}`} />
        {!!socialLinks &&
          socialLinks.map((link) => (
            <ContactLinks
              key={link}
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
          <span className="text-[var(--accent)]">
            {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          </span>
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
    <h1
      data-resume-section-heading
      className="!mb-1 w-full break-inside-avoid text-[1.2em] font-bold tracking-[0.2em] text-[var(--accent)]"
      style={{
        fontSize: "calc(1em * var(--heading-scale))",
        padding: "0.25em 0.5em",
        backgroundColor:
          "color-mix(in srgb, var(--accent) 16%, transparent)",
        borderBottomWidth: "var(--resume-border-width)",
        borderBottomStyle: "var(--resume-border-style)" as any,
        borderBottomColor: "currentColor",
      }}
    >
      {children}
    </h1>
  );
}
