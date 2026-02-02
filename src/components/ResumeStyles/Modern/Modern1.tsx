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
  dateFormat?: string;
}

export default function Modern1({
  resumeData,
  className,
  dateFormat = "MMM yyyy",
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "resume-root modern aspect-[210/297] h-fit w-full bg-white",
        className,
      )}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
        fontFamily: "var(--resume-font-family)",
        lineHeight: "var(--resume-line-height)",
      }}
      ref={containerRef}
    >
      <style>
        {`
          /* Modern 1 default font hierarchy (Preview + Print/PDF)
             - Heading: Montserrat SemiBold / Bold
             - Subtitle: Montserrat Medium
             - Body: Open Sans Regular (driven by --resume-font-family)
          */
          #resumePreviewContent [data-resume-section-heading],
          #resumePreviewContent [data-resume-entry-title] {
            font-family: var(--font-montserrat) !important;
            font-weight: 600 !important;
          }

          #resumePreviewContent [data-resume-entry-subtitle],
          #resumePreviewContent [data-resume-header] .font-medium {
            font-family: var(--font-montserrat) !important;
            font-weight: 500 !important;
          }

          #resumePreviewContent [data-resume-header] {
            font-family: var(--font-montserrat) !important;
          }

          /* Name underline: wired to Section Headings style (Modern1 only) */
          #resumePreviewContent [data-modern1-name] {
            position: relative;
            display: inline-block;
          }

          #resumePreviewContent[data-section-heading-style="0"] [data-modern1-name] {
            padding-bottom: 0 !important;
            border-bottom: 0 !important;
          }

          /* Style 1: use the template's border variables (solid/whatever user chose) */
          #resumePreviewContent[data-section-heading-style="1"] [data-modern1-name] {
            padding-bottom: 0.25em;
            border-bottom-width: var(--resume-border-width);
            border-bottom-style: var(--resume-border-style);
            border-bottom-color: var(--accent);
          }

          /* Style 2/3/4/5: mirror the global section heading underline styles */
          #resumePreviewContent[data-section-heading-style="2"] [data-modern1-name],
          #resumePreviewContent[data-section-heading-style="3"] [data-modern1-name] {
            padding-bottom: 0.25em;
          }

          #resumePreviewContent[data-section-heading-style="2"] [data-modern1-name]::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: calc(var(--resume-border-width) * 2) solid var(--accent);
            opacity: 0.35;
          }

          #resumePreviewContent[data-section-heading-style="3"] [data-modern1-name]::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: calc(var(--resume-border-width) * 2) dotted var(--accent);
            opacity: 0.35;
          }

          #resumePreviewContent[data-section-heading-style="4"] [data-modern1-name]::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -0.15em;
            width: 50%;
            border-bottom: calc(var(--resume-border-width) * 2) solid var(--accent);
            opacity: 0.35;
          }

          #resumePreviewContent[data-section-heading-style="5"] [data-modern1-name]::before,
          #resumePreviewContent[data-section-heading-style="5"] [data-modern1-name]::after {
            content: "";
            position: absolute;
            bottom: -0.15em;
            width: 22%;
            border-bottom: calc(var(--resume-border-width) * 2) solid var(--accent);
            opacity: 0.35;
          }
          #resumePreviewContent[data-section-heading-style="5"] [data-modern1-name]::before { left: 0; }
          #resumePreviewContent[data-section-heading-style="5"] [data-modern1-name]::after { left: 28%; }

          /* Sidebar (left column) typography: headings + icons should be white */
          #resumePreviewContent [data-resume-sidebar] [data-resume-section-heading] {
            color: white !important;
          }

          #resumePreviewContent [data-resume-sidebar] [data-contact-icon] {
            color: white !important;
          }
        `}
      </style>
      <div
        className={cn("grid h-full grid-cols-[1fr_2fr]", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          direction: "ltr",
        }}
        id="resumePreviewContent"
      >
        {/* Main column */}
        <div className="order-2 min-w-0 p-6">
          {/* Name And Job Title  */}
          <section
            className="break-inside-avoid"
            data-resume-header
            style={{
              marginBottom:
                "calc(var(--section-gap) * var(--density-multiplier))",
            }}
          >
            <p
              data-modern1-name
              className="leading-none"
              style={{
                fontSize: "var(--name-font-size)",
                fontWeight: "var(--name-font-weight)",
              }}
            >
              <span>{resumeData.firstName}</span>{" "}
              <span style={{ color: "var(--accent)" }}>
                {resumeData.lastName}
              </span>
            </p>
            <p
              className="mt-[calc(var(--section-gap)*0.15)] font-medium"
              style={{
                fontSize: "calc(var(--name-font-size) * 0.7)",
              }}
            >
              {resumeData.jobTitle}
            </p>
          </section>

          {/* Summary */}
          {resumeData.summary && (
            <section
              className="break-inside-avoid"
              style={{
                marginBottom:
                  "calc(var(--section-gap) * var(--density-multiplier))",
              }}
            >
              <Heading>Professional Summary</Heading>
              <div
                dangerouslySetInnerHTML={{
                  __html: resumeData.summary || "",
                }}
                className="richTextEditorStyle !m-0 whitespace-pre-line"
              />
            </section>
          )}

          {/* Experience */}
          {!!resumeData?.workExperiences &&
            resumeData?.workExperiences?.length > 0 && (
              <section
                className="break-inside-avoid"
                style={{
                  marginBottom:
                    "calc(var(--section-gap) * var(--density-multiplier))",
                }}
              >
                <Heading>Professional Experience</Heading>
                <ul className="relative space-y-[calc(var(--section-gap)*0.25)] pl-4">
                  <div className="absolute inset-y-0 left-1 h-full w-0 border-[length:var(--resume-border-width)] [border-color:var(--accent)] [border-style:var(--resume-border-style)]" />
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
                          <span
                            data-resume-entry-title
                            style={{
                              fontSize: "calc(1em * var(--heading-scale))",
                            }}
                          >
                            {exp.company}
                          </span>
                          {exp.position && (
                            <span
                              data-resume-entry-subtitle
                              data-entry-subtitle-slot="inline"
                              className="font-semibold italic"
                              style={{
                                fontSize: "calc(1em * var(--heading-scale))",
                              }}
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
                              : "Present"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        {exp.position ? (
                          <span
                            data-resume-entry-subtitle
                            data-entry-subtitle-slot="newline"
                            className="text-[1.1em] font-semibold italic"
                            style={{
                              fontSize: "calc(1em * var(--heading-scale))",
                            }}
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
              </section>
            )}

          {/* Projects */}
          {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
            <section
              className="break-inside-avoid"
              style={{
                marginBottom:
                  "calc(var(--section-gap) * var(--density-multiplier))",
              }}
            >
              <Heading>Project Work</Heading>
              {resumeData.projectWorks?.map((item, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between gap-[calc(var(--section-gap)*0.25)]">
                    <p className="flex gap-[calc(var(--section-gap)*0.25)]">
                      <Link
                        data-resume-entry-title
                        href={
                          !!item?.links && item?.links[0] ? item?.links[0] : "#"
                        }
                        target="_blank"
                        className="text-[1.2em] font-semibold text-[var(--accent)]"
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
                          <span
                            key={index}
                            className="mr-[calc(var(--section-gap)*0.25)] mt-[calc(var(--section-gap)*0.25)]"
                          >
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
            </section>
          )}
        </div>

        {/* Sidebar column */}
        <div
          className="order-1 h-full min-w-0 text-white"
          data-resume-sidebar
          style={{
            backgroundColor: "var(--accent)",
            borderRightColor: "var(--accent)",
            borderRightStyle: "var(--resume-border-style)" as any,
            borderRightWidth: "var(--resume-border-width)",
          }}
        >
          <PersonalInfoHeader resumeData={resumeData} />
          {/* Skills  */}
          {!!resumeData.skills && resumeData.skills?.length > 0 && (
            <section
              className="break-inside-avoid px-6"
              style={{
                marginBottom:
                  "calc(var(--section-gap) * var(--density-multiplier))",
              }}
            >
              <Heading>Skills</Heading>
              <ul className="list-disc space-y-1 pl-4">
                {resumeData.skills?.map((skill, index) => (
                  <li key={index} className="break-inside-avoid">
                    <span className="font-semibold">{skill.title}</span>
                    {skill.skillName && skill.skillName.length > 0 && (
                      <span> - {skill.skillName.join(", ")}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* Academics */}
          {!!resumeData.educations && resumeData.educations?.length > 0 && (
            <section
              className="break-inside-avoid px-6"
              style={{
                marginBottom:
                  "calc(var(--section-gap) * var(--density-multiplier))",
              }}
            >
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
              <section
                className="break-inside-avoid px-6"
                style={{
                  marginBottom:
                    "calc(var(--section-gap) * var(--density-multiplier))",
                }}
              >
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
            <section
              className="break-inside-avoid px-6"
              style={{
                marginBottom:
                  "calc(var(--section-gap) * var(--density-multiplier))",
              }}
            >
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
    <div className="px-6 py-6">
      {/* Photo  */}
      {photoSrc && (
        <div className="mb-4 flex w-full items-center justify-center">
          <Image
            src={photoSrc}
            width={500}
            height={500}
            alt="Author photo"
            className="aspect-square h-[140px] w-[140px] border object-cover object-center"
            style={{
              borderColor: "var(--accent)",
              borderStyle: "var(--resume-border-style)" as any,
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
      <div>
        <section
          className="break-inside-avoid"
          style={{
            marginBottom:
              "calc(var(--section-gap) * var(--density-multiplier))",
          }}
        >
          <Heading>Contact</Heading>
          {(city || country) && (
            <p className="flex items-center gap-1">
              <span className="text-white">
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
          <span data-contact-icon className="text-[var(--accent)]">
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
        <h1
          data-resume-section-heading
          className="text-nowrap text-[1.2em] font-semibold text-[var(--accent)]"
          style={{
            fontSize: "calc(1em * var(--heading-scale))",
            paddingBottom: "0.25em",
            marginBottom: "calc(var(--section-gap) * 0.25)",
            borderBottomWidth: "var(--resume-border-width)",
            borderBottomStyle: "var(--resume-border-style)" as any,
            borderBottomColor: "currentColor",
          }}
        >
          <span style={{ fontSize: "calc(1em * var(--heading-scale))" }}>
            {children}
          </span>
        </h1>
      </div>
    </>
  );
}
