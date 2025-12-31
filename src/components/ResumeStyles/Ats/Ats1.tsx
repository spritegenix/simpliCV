"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import {
  cn,
  getOngoingLabel,
  getResumeDateFormat,
  safeFormatDate,
} from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/sectionOrder";
import { createSectionOrderIndex } from "../sectionOrder";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  sectionOrder?: string[];
}

export default function Ats1({
  resumeData,
  className,
  sectionOrder,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  const dateFormatText = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");
  const ongoingExperienceLabel = getOngoingLabel("experience");
  const ongoingProjectLabel = getOngoingLabel("project");
  const ongoingEducationLabel = getOngoingLabel("education");
  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const orderIndex = createSectionOrderIndex(sectionOrder);

  return (
    <div
      className={cn(
        "resume-root aspect-[210/297] h-fit w-full bg-white",
        className,
      )}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
      ref={containerRef}
    >
      <div
        className={cn("flex flex-col p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        <section
          style={{
            marginBottom:
              "calc(var(--section-gap) * var(--density-multiplier))",
          }}
        >
          {resumeData.photo ? (
            <PersonalInfoHeader resumeData={resumeData} />
          ) : (
            <PersonalInfoHeader1 resumeData={resumeData} />
          )}
        </section>

        {(() => {
          const sections: Record<ResumeSectionKey, React.ReactNode> = {
            summary: resumeData.summary ? (
              <section
                style={{
                  marginBottom:
                    "calc(var(--section-gap) * var(--density-multiplier))",
                  order: orderIndex("summary"),
                }}
              >
                <Heading>Professional Summary</Heading>
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.summary || "",
                  }}
                  className="richTextEditorStyle whitespace-pre-line"
                />
              </section>
            ) : null,
            workExperiences:
              !!resumeData?.workExperiences &&
              resumeData?.workExperiences?.length > 0 ? (
                <section
                  style={{
                    marginBottom:
                      "calc(var(--section-gap) * var(--density-multiplier))",
                    order: orderIndex("work-experience"),
                  }}
                >
                  <Heading>Professional Experience</Heading>
                  {resumeData.workExperiences?.map((exp, index) => (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex items-center justify-between">
                        <span>
                          <span
                            data-resume-entry-title
                            className="font-semibold text-[var(--accent)]"
                          >
                            {exp.company}
                          </span>
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
                            {safeFormatDate(exp.startDate, dateFormatText)} -{" "}
                            {exp.endDate
                              ? safeFormatDate(exp.endDate, dateFormatText)
                              : ongoingExperienceLabel}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        {exp.position ? (
                          <span
                            data-resume-entry-subtitle
                            data-entry-subtitle-slot="newline"
                            className="font-semibold italic"
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
                    </div>
                  ))}
                </section>
              ) : null,
            projectWorks:
              !!resumeData.projectWorks &&
              resumeData.projectWorks?.length > 0 ? (
                <section
                  style={{
                    marginBottom:
                      "calc(var(--section-gap) * var(--density-multiplier))",
                    order: orderIndex("projects"),
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
                              !!item?.links && item?.links[0]
                                ? item?.links[0]
                                : "#"
                            }
                            target="_blank"
                            className="font-semibold text-[var(--accent)]"
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
                                `${safeFormatDate(item.startDate, dateFormatText)} - `}
                              {item.endDate
                                ? safeFormatDate(item.endDate, dateFormatText)
                                : ongoingProjectLabel}
                            </span>
                          )}
                        </p>
                      </div>
                      {item.company && (
                        <div className="flex items-center justify-between">
                          <span
                            data-resume-entry-subtitle
                            data-entry-subtitle-slot="newline"
                            className="italic"
                          >
                            {item.company}
                          </span>
                        </div>
                      )}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.description || "",
                        }}
                        className="richTextEditorStyle whitespace-pre-line"
                      />
                    </div>
                  ))}
                </section>
              ) : null,
            skills:
              !!resumeData.skills && resumeData.skills?.length > 0 ? (
                <section
                  style={{
                    marginBottom:
                      "calc(var(--section-gap) * var(--density-multiplier))",
                    order: orderIndex("skills"),
                  }}
                >
                  <Heading>Skills</Heading>
                  {resumeData.skills?.map((skill, index) => (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex items-center justify-between">
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
              ) : null,
            educations:
              !!resumeData.educations && resumeData.educations?.length > 0 ? (
                <section
                  style={{
                    marginBottom:
                      "calc(var(--section-gap) * var(--density-multiplier))",
                    order: orderIndex("education"),
                  }}
                >
                  <Heading>Academics</Heading>
                  {resumeData.educations?.map((edu, index) => (
                    <div key={index} className="break-inside-avoid">
                      <p className="flex w-full justify-between">
                        <span className="font-semibold">
                          {edu.school}, {edu.location}
                        </span>{" "}
                        <span>
                          {edu.startDate &&
                            `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                          {edu.endDate
                            ? safeFormatDate(edu.endDate, "yyyy")
                            : ongoingEducationLabel}
                        </span>
                      </p>
                      <p className="flex w-full justify-between">
                        <span>
                          {edu.degree} ({edu.stream})
                        </span>
                        <span>{edu.marks}</span>
                      </p>
                      <p>{edu.description}</p>
                    </div>
                  ))}
                </section>
              ) : null,
            certifications:
              !!resumeData.certifications &&
              resumeData.certifications?.length > 0 ? (
                <section
                  style={{
                    marginBottom:
                      "calc(var(--section-gap) * var(--density-multiplier))",
                    order: orderIndex("certification"),
                  }}
                >
                  <Heading>Certifications</Heading>
                  <div
                    className={`flex flex-wrap gap-x-[calc(var(--section-gap)*0.5)] ${resumeData.certifications.find((skill) => skill.description) && "flex-col"}`}
                  >
                    {resumeData.certifications?.map((skill, index) => (
                      <div key={index} className="break-inside-avoid">
                        <Link
                          href={skill.link ? skill.link : "#"}
                          className="before:mr-[calc(var(--section-gap)*0.25)] before:content-['•']"
                        >
                          {skill.title}
                        </Link>{" "}
                        {skill.description && (
                          <span className="italic"> - {skill.description}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null,
            others: !!resumeData.others?.title ? (
              <section
                className="break-inside-avoid"
                style={{
                  marginBottom:
                    "calc(var(--section-gap) * var(--density-multiplier))",
                  order: orderIndex("interests"),
                }}
              >
                <Heading>{resumeData.others.title}</Heading>
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.others.description || "",
                  }}
                  className="richTextEditorStyle whitespace-pre-line"
                />
              </section>
            ) : null,
          };

          return orderedSections.map((key) => (
            <React.Fragment key={key}>{sections[key]}</React.Fragment>
          ));
        })()}
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
    detailsArrangement = "compact",
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="grid grid-cols-2" data-resume-header>
      <div className="flex h-max gap-[calc(var(--section-gap)*0.75)]">
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
              className="font-bold text-[var(--accent)]"
              style={{
                fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="font-medium text-[var(--accent)]"
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
        className={cn(
          "my-auto ml-auto font-normal",
          detailsArrangement === "compact"
            ? "flex flex-col items-end gap-y-1"
            : "flex flex-wrap justify-end gap-x-2 gap-y-1",
        )}
        style={{
          fontSize: "2em",
          color: "color-mix(in srgb, var(--text) 80%, transparent)",
        }}
        data-resume-personal-details
      >
        {(city || country) && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <BiSolidMap />
            {city}
            {city && country ? ", " : ""}
            {country}
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <ContactLinks text={phone} href={`tel:${phone}`} />
          </p>
        )}
        {email && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <ContactLinks text={email} href={`mailto:${email}`} />
          </p>
        )}
        {!!socialLinks &&
          socialLinks.length > 0 &&
          socialLinks.map((link, index) => (
            <p key={index} className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
              <ContactLinks
                text={link.split("://")?.[1]}
              />
            </p>
          ))}
        {portfolioLink && (
          <ContactLinks text={"Portfolio"} href={portfolioLink} />
        )}
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
    detailsArrangement = "compact",
  } = resumeData;

  return (
    <div data-resume-header>
      <Link
        href={resumeData.portfolioLink || "#"}
        className="block w-full cursor-pointer"
      >
        <p
          className="font-bold text-[var(--accent)]"
          style={{
            fontSize: "calc(var(--base-font) * 1.9 * var(--heading-scale))",
          }}
        >
          {firstName} {lastName}
        </p>
        <p
          className="font-medium text-[var(--accent)]"
          style={{
            fontSize: "calc(var(--base-font) * 1.35 * var(--heading-scale))",
          }}
        >
          {jobTitle}
        </p>
      </Link>
      {/* Social Links  */}
      <div
        className={cn(
          "mx-auto flex flex-wrap justify-center font-normal gap-x-2 gap-y-1",
          detailsArrangement === "stacked" && "flex-col items-center",
        )}
        style={{
          fontSize: "1.1em",
          color: "color-mix(in srgb, var(--text) 80%, transparent)",
        }}
        data-resume-personal-details
      >
        {(city || country) && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <BiSolidMap />
            {city}
            {city && country ? ", " : ""}
            {country}
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <ContactLinks text={phone} href={`tel:${phone}`} />
          </p>
        )}
        {email && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <ContactLinks text={email} href={`mailto:${email}`} />
          </p>
        )}
        {!!socialLinks &&
          socialLinks.map((link, index) => (
            <p key={link} className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
              <ContactLinks
                text={link.split("://")?.[1]}
              />
            </p>
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
          className="flex items-center gap-[calc(var(--section-gap)*0.25)]"
        >
          {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          {text === "NO_TEXT" ? "" : <span>{text}</span>}
        </Link>
      )}
    </>
  );
}

function Text({ children }: { children: string }) {
  return <p className="whitespace-pre-line">{children}</p>;
}

function Heading({ children }: { children: string }) {
  return (
    <>
      <div
        data-resume-section-heading-wrap
        className="flex break-inside-avoid gap-x-[calc(var(--section-gap)*0.1)]"
      >
        <h1
          data-resume-section-heading
          className="text-nowrap font-semibold text-[var(--accent)]"
          style={{ fontSize: "calc(1em * var(--heading-scale))" }}
        >
          {children}
        </h1>
      </div>
    </>
  );
}
