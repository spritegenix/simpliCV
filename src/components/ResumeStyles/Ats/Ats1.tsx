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
        "resume-root aspect-[210/297] h-fit w-full bg-white p-6",
        className,
      )}
      style={{
        color: "var(--text)",
        fontSize: "var(--base-font)",
      }}
      ref={containerRef}
    >
      <div
        className={cn("flex flex-col", !width && "invisible")}
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
                <Text>{resumeData.summary}</Text>
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
                        <span className="font-semibold text-[var(--accent)]">
                          {exp.company}
                        </span>
                        {exp.jobLocation && <span>{exp.jobLocation}</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold italic">
                          {exp.position}
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
                                `${safeFormatDate(item.startDate, dateFormatText)} - `}
                              {item.endDate
                                ? safeFormatDate(item.endDate, dateFormatText)
                                : ongoingProjectLabel}
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
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="grid grid-cols-2">
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
            <p className="font-bold text-[var(--accent)]">
              {firstName} {lastName}
            </p>
            <p className="font-medium text-[var(--accent)]">{jobTitle}</p>
          </div>
        </div>
      </div>
      {/* Social Links  */}
      <div className="my-auto ml-auto">
        {(city || country) && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
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
    <div>
      <Link
        href={resumeData.portfolioLink || "#"}
        className="cursor-pointer text-center"
      >
        <p className="font-bold text-[var(--accent)]">
          {firstName} {lastName}
        </p>
        <p className="font-medium text-[var(--accent)]">{jobTitle}</p>
      </Link>
      {/* Social Links  */}
      <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-x-[calc(var(--section-gap)*0.5)]">
        {(city || country) && (
          <p className="flex items-center gap-[calc(var(--section-gap)*0.25)]">
            <BiSolidMap />
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
          className="flex items-center gap-[calc(var(--section-gap)*0.25)]"
        >
          {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          {text === "NO_TEXT" ? "" : <p>{text}</p>}
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
