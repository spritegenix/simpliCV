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

export default function Ats4({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const colorHex = "var(--accent)";

  const dateFormat = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const leftColumnKeys: ResumeSectionKey[] = [
    "skills",
    "educations",
    "certifications",
    "others",
  ];
  const rightColumnKeys: ResumeSectionKey[] = [
    "workExperiences",
    "projectWorks",
  ];
  const leftOrder = orderedSections.filter((k) => leftColumnKeys.includes(k));
  const rightOrder = orderedSections.filter((k) => rightColumnKeys.includes(k));

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white font-times",
        className,
      )}
      style={{
        color: "var(--text)",
      }}
      ref={containerRef}
    >
      <style>
        {`
          /* ATS 4 default font hierarchy (Preview + Print/PDF)
             - Heading: Cormorant Garamond SemiBold / Bold
             - Subtitle: Cormorant Garamond Medium
             - Body: Libre Baskerville Regular (handled by --resume-font-family)
          */
          #resumePreviewContent [data-resume-section-heading],
          #resumePreviewContent [data-resume-header] p.font-bold {
            font-family: var(--font-cormorant-garamond) !important;
            font-weight: 600 !important;
          }

          #resumePreviewContent [data-resume-header] p.font-bold {
            font-weight: 700 !important;
          }

          #resumePreviewContent [data-resume-header] p.font-medium,
          #resumePreviewContent [data-resume-entry-subtitle] {
            font-family: var(--font-cormorant-garamond) !important;
            font-weight: 500 !important;
          }
        `}
      </style>
      <div
        className={cn(!width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {/* Top Section  */}
        <div
          className="border-b bg-[#f4f4f4] px-12 py-10"
          style={{
            borderColor: colorHex,
            borderBottomWidth: "calc(var(--resume-border-width) * 8)",
            borderStyle: "var(--resume-border-style)" as any,
          }}
        >
          <PersonalInfoHeader resumeData={resumeData} />
        </div>
        {/* Summary */}
        {resumeData.summary && (
          <div className="px-12 py-3">
            <Heading colorHex={colorHex} isCenter className="mx-auto w-56">
              Professional Summary
            </Heading>
            <div
              dangerouslySetInnerHTML={{
                __html: resumeData.summary || "",
              }}
              className="richTextEditorStyle whitespace-pre-line text-center"
            />
          </div>
        )}

        <div className="relative grid h-full grid-cols-12 gap-6">
          <div
            className="absolute inset-y-0 left-1/2 h-full w-0 border-l"
            style={{
              borderColor: colorHex,
              borderLeftWidth: "var(--resume-border-width)",
              borderStyle: "var(--resume-border-style)" as any,
            }}
          />
          {/* Left Side  */}
          <div className="col-span-6 space-y-3 pl-12 pr-6">
            {(() => {
              const sections: Record<ResumeSectionKey, React.ReactNode> = {
                summary: null,
                workExperiences: null,
                projectWorks: null,
                skills:
                  !!resumeData.skills && resumeData.skills?.length > 0 ? (
                    <>
                      <Heading colorHex={colorHex} className="w-28">
                        Skills
                      </Heading>
                      {resumeData.skills?.map((skill, index) => (
                        <div key={index} className="!m-0 break-inside-avoid">
                          <div className="!m-0 flex items-center justify-between">
                            <p>
                              <span className="font-semibold">
                                {skill.title}
                              </span>
                              {skill.skillName &&
                                skill.skillName.length > 0 && (
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
                  !!resumeData.educations &&
                  resumeData.educations?.length > 0 ? (
                    <>
                      <Heading colorHex={colorHex} className="w-32">
                        Education
                      </Heading>
                      {resumeData.educations?.map((edu, index) => (
                        <div
                          key={index}
                          className={cn(
                            "!m-0 break-inside-avoid",
                            index !==
                              (resumeData.educations?.length ?? 0) - 1 &&
                              "pb-2",
                          )}
                        >
                          <ul className="!mt-0 pl-3">
                            <li className="font-semibold">
                              {edu.school}
                              {edu.location && `, ${edu.location}`}
                            </li>
                            {(edu.degree || edu.stream) && (
                              <li className="">
                                {edu.degree} {edu.stream && `(${edu.stream})`}
                              </li>
                            )}
                            <li className="flex w-full justify-between">
                              {edu.marks && <span>{edu.marks}</span>}
                              <span>
                                {edu.startDate &&
                                  `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                                {edu.endDate
                                  ? safeFormatDate(edu.endDate, "yyyy")
                                  : "now"}
                              </span>
                            </li>
                            {edu.description && (
                              <li className="italic">{edu.description}</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </>
                  ) : null,
                certifications:
                  !!resumeData.certifications &&
                  resumeData.certifications?.length > 0 ? (
                    <>
                      <Heading colorHex={colorHex} className="w-36">
                        Certifications
                      </Heading>
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
                    </>
                  ) : null,
                others: !!resumeData.others?.title ? (
                  <>
                    <Heading colorHex={colorHex} className="w-28">
                      {resumeData.others.title}
                    </Heading>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: resumeData.others.description || "",
                      }}
                      className="richTextEditorStyle !mt-0 whitespace-pre-line"
                    />
                  </>
                ) : null,
              };

              return leftOrder.map((key) => (
                <React.Fragment key={key}>{sections[key]}</React.Fragment>
              ));
            })()}
          </div>
          {/* Right Side  */}
          <div className="col-span-6 space-y-3 pl-6 pr-12">
            {(() => {
              const sections: Record<ResumeSectionKey, React.ReactNode> = {
                summary: null,
                skills: null,
                educations: null,
                certifications: null,
                others: null,
                workExperiences:
                  !!resumeData?.workExperiences &&
                  resumeData?.workExperiences?.length > 0 ? (
                    <>
                      <Heading colorHex={colorHex} className="w-36">
                        Experience
                      </Heading>
                      <ul className="relative space-y-1 pl-4">
                        <div className="absolute inset-y-0 left-1 h-full w-0 border border-l border-zinc-300" />
                        {resumeData.workExperiences?.map((exp, index) => (
                          <li
                            key={index}
                            className="relative z-10 break-inside-avoid"
                          >
                            <span
                              className="absolute -left-[0.885rem] top-1.5 h-[6px] w-[6px] rounded-full"
                              style={{
                                backgroundColor: colorHex,
                              }}
                            />
                            <div className="!m-0 flex items-center justify-between">
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
                                    className="text-[1.1em] font-medium italic"
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
                                    : "now"}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              {exp.position ? (
                                <span
                                  data-resume-entry-subtitle
                                  data-entry-subtitle-slot="newline"
                                  className="text-[1.1em] font-medium italic"
                                >
                                  {exp.position}
                                </span>
                              ) : (
                                <span />
                              )}
                              {exp.jobLocation && (
                                <span>{exp.jobLocation}</span>
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
                    </>
                  ) : null,
                projectWorks:
                  !!resumeData.projectWorks &&
                  resumeData.projectWorks?.length > 0 ? (
                    <>
                      <Heading colorHex={colorHex} className="w-40">
                        Project Work
                      </Heading>
                      {resumeData.projectWorks?.map((item, index) => (
                        <div key={index} className="!m-0 break-inside-avoid">
                          <div className="!m-0 flex justify-between gap-1">
                            <p className="flex gap-1">
                              <Link
                                data-resume-entry-title
                                href={
                                  !!item?.links && item?.links[0]
                                    ? item?.links[0]
                                    : "#"
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
                                  className="font-medium italic"
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
                                className="font-medium italic"
                              >
                                {item.company}
                              </span>
                            )}
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

              return rightOrder.map((key) => (
                <React.Fragment key={key}>{sections[key]}</React.Fragment>
              ));
            })()}
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

  const colorHex = "var(--accent)";

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="grid grid-cols-12" data-resume-header>
      <div className="col-span-8 flex h-max gap-6">
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
        <div
          className={`flex ${photoSrc ? "h-[100px]" : ""} flex-col justify-between`}
        >
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
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
      </div>
      {/* Social Links  */}
      <div
        className="col-span-4 my-auto flex flex-col items-end"
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
  colorHex,
  isCenter,
  className,
}: {
  children: string;
  colorHex: string | undefined;
  isCenter?: boolean;
  className?: string;
}) {
  return (
    <>
      <div
        data-resume-section-heading-wrap
        className={cn("break-inside-avoid", className)}
      >
        <h1
          data-resume-section-heading
          className={cn(
            "text-nowrap text-[1.2em] uppercase",
            isCenter && "text-center",
          )}
          style={{
            color: colorHex,
          }}
        >
          {children}
        </h1>
      </div>
    </>
  );
}
