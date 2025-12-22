"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn, safeFormatDate } from "@/lib/utils";
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

export default function Modern1({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "resume-root modern aspect-[210/297] h-fit w-full bg-white font-arial",
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
          "grid h-full grid-cols-[2fr_1fr] gap-6",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Main column */}
        <div className="min-w-0 p-6 pr-0">
          {/* Name And Job Title  */}
          <section className="mb-[var(--section-gap)] break-inside-avoid">
            <div
              className="rounded-md p-4"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--accent) 8%, transparent)",
              }}
            >
              <p className="text-[3em] leading-none">
                <span className="font-bold">{resumeData.firstName}</span>{" "}
                <span style={{ color: "var(--accent)" }}>
                  {resumeData.lastName}
                </span>
              </p>
              <p className="mt-[calc(var(--section-gap)*0.15)] text-[1.6em] font-medium">
                {resumeData.jobTitle}
              </p>
            </div>
          </section>

          {/* Summary */}
          {resumeData.summary && (
            <section className="mb-[var(--section-gap)] break-inside-avoid">
              <Heading>Professional Summary</Heading>
              <Text>{resumeData.summary}</Text>
            </section>
          )}

          {/* Experience */}
          {!!resumeData?.workExperiences &&
            resumeData?.workExperiences?.length > 0 && (
              <section className="mb-[var(--section-gap)] break-inside-avoid">
                <Heading>Professional Experience</Heading>
                <ul className="relative space-y-[calc(var(--section-gap)*0.25)] pl-4">
                  <div className="absolute inset-y-0 left-1 h-full w-0 border border-l [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
                  {resumeData.workExperiences?.map((exp, index) => (
                    <li
                      key={index}
                      className="relative z-10 break-inside-avoid"
                    >
                      <span
                        className="absolute -left-[0.885rem] top-1.5 h-[6px] w-[6px] rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[1.2em] font-semibold text-[var(--accent)]">
                          {exp.company}
                        </span>
                        {exp.jobLocation && <span>{exp.jobLocation}</span>}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[1.1em] font-semibold italic">
                          {exp.position}
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
          {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
            <section className="mb-[var(--section-gap)] break-inside-avoid">
              <Heading>Project Work</Heading>
              {resumeData.projectWorks?.map((item, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between gap-[calc(var(--section-gap)*0.25)]">
                    <p className="flex gap-[calc(var(--section-gap)*0.25)]">
                      <Link
                        href={
                          !!item?.links && item?.links[0] ? item?.links[0] : "#"
                        }
                        target="_blank"
                        className="text-[1.2em] font-semibold text-[var(--accent)]"
                      >
                        {item.title}
                      </Link>
                      {!!item.links &&
                        item.links.map((l, index) => (
                          <span
                            key={index}
                            className="mr-[calc(var(--section-gap)*0.25)] mt-[calc(var(--section-gap)*0.25)]"
                          >
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
                            `${safeFormatDate(item.startDate, "MMM yyyy")} - `}
                          {item.endDate
                            ? safeFormatDate(item.endDate, "MMM yyyy")
                            : "Present"}
                        </span>
                      )}
                    </p>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description || "" }}
                    className="richTextEditorStyle whitespace-pre-line"
                  />
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar column */}
        <div
          className="min-w-0 space-y-[calc(var(--section-gap)*0.5)] p-6 pl-0"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--accent) 8%, transparent)",
            borderLeftColor: "var(--accent)",
            borderLeftStyle: "var(--resume-border-style)" as any,
            borderLeftWidth: "1px",
          }}
        >
          <PersonalInfoHeader resumeData={resumeData} />
          {/* Skills  */}
          {!!resumeData.skills && resumeData.skills?.length > 0 && (
            <section className="mb-[var(--section-gap)] break-inside-avoid">
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
                        `${safeFormatDate(edu.startDate, "MMM yyyy")} -`}{" "}
                      {edu.endDate
                        ? safeFormatDate(edu.endDate, "MMM yyyy")
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
    <div>
      {/* Photo  */}
      {photoSrc && (
        <div className="mb-4 flex w-full justify-center">
          <Image
            src={photoSrc}
            width={500}
            height={500}
            alt="Author photo"
            className="aspect-square h-[120px] w-[120px] border-4 object-cover object-top"
            style={{
              borderColor: "var(--accent)",
              borderStyle: "var(--resume-border-style)" as any,
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
      <div>
        <section className="mb-[var(--section-gap)] break-inside-avoid">
          <Heading>Contact</Heading>
          {(city || country) && (
            <p className="flex items-center gap-1">
              <span style={{ color: "var(--accent)" }}>
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
        </section>
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
    <>
      <div className="break-inside-avoid">
        <h1 className="text-nowrap text-[1.2em] font-semibold uppercase text-[var(--accent)]">
          {children}
        </h1>
        <div className="mb-2 mt-auto h-0 w-full border [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
      </div>
    </>
  );
}
