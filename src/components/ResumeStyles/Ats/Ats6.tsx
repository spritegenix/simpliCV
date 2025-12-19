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

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats6({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  const dateFormat = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  return (
    <div
      className={cn("aspect-[210/297] h-fit w-full bg-white", className)}
      ref={containerRef}
    >
      <div
        className={cn("resume-root", !width && "invisible", "relative")}
        style={{
          zoom: (1 / 794) * width,
          color: "var(--text)",
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        <div className="absolute inset-y-0 left-[67%] h-full w-0 border [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
        <div className="absolute inset-x-0 top-[10.7rem] h-0 w-full border [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
        {/* Top Section  */}
        <div className="h-[8.5rem] p-6 pb-3">
          <PersonalInfoHeader resumeData={resumeData} />
        </div>
        <div className="grid h-full grid-cols-12 gap-x-3">
          {/* Left Side  */}
          <div className="col-span-8 space-y-3 p-3 pl-6">
            {/* Summary */}
            {resumeData.summary && (
              <section className="mb-[var(--section-gap)] break-inside-avoid">
                <Heading isBorder={false}>Profile</Heading>
                <Text className="text-justify">{resumeData.summary}</Text>
              </section>
            )}
            {/* Experience */}
            {!!resumeData?.workExperiences &&
              resumeData?.workExperiences?.length > 0 && (
                <section className="mb-[var(--section-gap)] break-inside-avoid">
                  <Heading>Experience</Heading>
                  <ul className="relative !mt-0 space-y-[calc(var(--section-gap)*0.25)] pl-4">
                    <div className="absolute inset-y-0 left-1 h-full w-0 border border-l [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
                    {resumeData.workExperiences?.map((exp, index) => (
                      <li
                        key={index}
                        className="relative z-10 break-inside-avoid"
                      >
                        <span
                          className="absolute -left-[0.885rem] top-1.5 h-[6px] w-[6px] rounded-full"
                          style={{
                            backgroundColor: "var(--accent)",
                          }}
                        />
                        <div className="!m-0 flex items-center justify-between">
                          <span className="text-[1.2em] font-semibold text-[var(--accent)]">
                            {exp.company}
                          </span>
                          {exp.jobLocation && <span>{exp.jobLocation}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[1.1em] font-semibold italic">
                            {exp.position}
                          </span>
                          {exp.startDate && (
                            <span>
                              {safeFormatDate(exp.startDate, dateFormat)} -{" "}
                              {exp.endDate
                                ? safeFormatDate(exp.endDate, dateFormat)
                                : "Present"}
                            </span>
                          )}
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
                </section>
              )}
            {/* Projects */}
            {!!resumeData.projectWorks &&
              resumeData.projectWorks?.length > 0 && (
                <section className="mb-[var(--section-gap)] break-inside-avoid">
                  <Heading>Project Work</Heading>
                  <ul className="relative space-y-[calc(var(--section-gap)*0.25)] pl-4">
                    <div className="absolute inset-y-0 left-1 h-full w-0 border border-l [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
                    {resumeData.projectWorks?.map((item, index) => (
                      <li
                        key={index}
                        className="relative z-10 break-inside-avoid"
                      >
                        <span
                          className="absolute -left-[0.885rem] top-1.5 h-[6px] w-[6px] rounded-full"
                          style={{
                            backgroundColor: "var(--accent)",
                          }}
                        />
                        <div className="!m-0 flex justify-between gap-1">
                          <p className="flex gap-1">
                            <Link
                              href={
                                !!item?.links && item?.links[0]
                                  ? item?.links[0]
                                  : "#"
                              }
                              target="_blank"
                              className="text-[1.2em] font-semibold text-[var(--accent)]"
                            >
                              {item.title}
                            </Link>
                            {!!item.links &&
                              item.links.map((l, index) => (
                                <span key={index} className="mr-1 mt-1">
                                  <ContactLinks href={l} text={"NO_TEXT"} />
                                </span>
                              ))}
                          </p>
                          <p className="flex flex-col text-right">
                            {item.company && (
                              <span className="italic">{item.company}</span>
                            )}
                            {item.startDate && (
                              <span>
                                {item.startDate &&
                                  `${safeFormatDate(item.startDate, dateFormat)} - `}
                                {item.endDate
                                  ? safeFormatDate(item.endDate, dateFormat)
                                  : "Present"}
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
                      </li>
                    ))}
                  </ul>
                </section>
              )}
          </div>
          {/* Right Side  */}
          <div className="col-span-4 space-y-3 p-3 pr-6">
            {/* Social Links  */}
            {resumeData.photo && (
              <section className="mb-[var(--section-gap)] break-inside-avoid">
                <Heading isBorder={false}>Contact</Heading>
                <div className="!mt-0 space-y-1">
                  {(resumeData.city || resumeData.country) && (
                    <p className="flex items-center gap-1">
                      <BiSolidMap />
                      {resumeData.city}
                      {resumeData.city && resumeData.country ? ", " : ""}
                      {resumeData.country}
                    </p>
                  )}
                  <ContactLinks
                    text={resumeData.phone}
                    href={`tel:${resumeData.phone}`}
                  />
                  <ContactLinks
                    text={resumeData.email}
                    href={`mailto:${resumeData.email}`}
                  />
                  {!!resumeData.socialLinks &&
                    resumeData.socialLinks.length > 0 &&
                    resumeData.socialLinks.map((link, index) => (
                      <ContactLinks
                        key={index}
                        text={link.split("://")?.[1]}
                        href={link}
                      />
                    ))}
                  {resumeData.portfolioLink && (
                    <ContactLinks
                      text={"Portfolio"}
                      href={resumeData.portfolioLink}
                    />
                  )}
                </div>
              </section>
            )}
            {/* Skills  */}
            {!!resumeData.skills && resumeData.skills?.length > 0 && (
              <section className="mb-[var(--section-gap)] break-inside-avoid">
                <Heading isBorder={!resumeData.photo ? false : true}>
                  Skills
                </Heading>
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
              </section>
            )}
            {/* Academics */}
            {!!resumeData.educations && resumeData.educations?.length > 0 && (
              <section className="mb-[var(--section-gap)] break-inside-avoid">
                <Heading>Education</Heading>
                {resumeData.educations?.map((edu, index) => (
                  <div
                    key={index}
                    className={cn(
                      "!m-0 break-inside-avoid",
                      index !== (resumeData.educations?.length ?? 0) - 1 &&
                        "pb-2",
                    )}
                  >
                    <div className="!m-0">
                      <p>
                        {edu.startDate &&
                          `${safeFormatDate(edu.startDate, dateFormat)} -`}{" "}
                        {edu.endDate
                          ? safeFormatDate(edu.endDate, dateFormat)
                          : "Present"}
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
              </section>
            )}
            {/* Certifications  */}
            {!!resumeData.certifications &&
              resumeData.certifications?.length > 0 && (
                <section className="mb-[var(--section-gap)] break-inside-avoid">
                  <Heading>Certifications</Heading>
                  <div className={cn("!m-0")}>
                    {resumeData.certifications?.map((skill, index) => (
                      <div
                        key={index}
                        className={cn(
                          "break-inside-avoid",
                          index !==
                            (resumeData.certifications?.length ?? 0) - 1 &&
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
                </section>
              )}
            {/* Interest  */}
            {!!resumeData.others?.title && (
              <section className="mb-[var(--section-gap)] break-inside-avoid">
                <Heading>{resumeData.others.title}</Heading>
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.others.description || "",
                  }}
                  className="richTextEditorStyle !mt-0 whitespace-pre-line"
                />
              </section>
            )}
          </div>
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
    <div className="grid grid-cols-12">
      <div className={"col-span-8 flex h-max gap-6"}>
        <div
          className={`flex ${photoSrc ? "h-[100px]" : ""} flex-col justify-between`}
        >
          <div className="my-auto">
            <p className="text-[2.5rem] font-bold text-[var(--accent)]">
              {firstName} {lastName}
            </p>
            <p className="text-[1.6em] font-medium">{jobTitle}</p>
          </div>
        </div>
      </div>
      {/* Social Links or Photo */}
      <div
        className={cn(
          "col-span-4 my-auto flex h-full flex-col",
          photoSrc && "items-center",
        )}
      >
        {photoSrc ? (
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
        ) : (
          <div className="flex h-full flex-col justify-between pl-7">
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
          className="flex items-center gap-[calc(var(--section-gap)*0.25)]"
        >
          {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          {text === "NO_TEXT" ? "" : <p>{text}</p>}
        </Link>
      )}
    </>
  );
}

function Text({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={cn("!m-0 whitespace-pre-line", className)}>{children}</p>
  );
}

function Heading({
  children,
  isBorder = true,
}: {
  children: string;
  isBorder?: boolean;
}) {
  return (
    <>
      <div className="relative break-inside-avoid pb-2">
        {isBorder && (
          <>
            <div className="absolute inset-x-0 -top-[0.3rem] h-0 w-full border [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
            <div className="absolute inset-x-0 bottom-[0.25rem] h-0 w-full border [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
          </>
        )}
        <h1
          className="text-nowrap text-[1.4em] font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          {children}
        </h1>
      </div>
    </>
  );
}
