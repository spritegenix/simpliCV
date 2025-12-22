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

export default function ATSStyle3({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);
  const dateFormatNumeric = getResumeDateFormat(
    resumeData.dateFormat,
    "MM/yyyy",
  );
  const dateFormatText = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const leftColumnKeys: ResumeSectionKey[] = [
    "workExperiences",
    "projectWorks",
  ];
  const rightColumnKeys: ResumeSectionKey[] = [
    "summary",
    "educations",
    "skills",
    "certifications",
    "others",
  ];
  const leftOrder = orderedSections.filter((k) => leftColumnKeys.includes(k));
  const rightOrder = orderedSections.filter((k) => rightColumnKeys.includes(k));

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
        className={cn("", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        <section className="mb-[var(--section-gap)]">
          {resumeData.photo ? (
            <PersonalInfoHeader resumeData={resumeData} />
          ) : (
            <PersonalInfoHeader1 resumeData={resumeData} />
          )}
        </section>

        <div className="grid grid-cols-6 gap-x-[calc(var(--section-gap)*0.5)]">
          {/* left side */}
          <div className="col-span-4">
            {(() => {
              const sections: Record<ResumeSectionKey, React.ReactNode> = {
                summary: null,
                educations: null,
                skills: null,
                certifications: null,
                others: null,
                workExperiences:
                  !!resumeData?.workExperiences &&
                  resumeData?.workExperiences?.length > 0 ? (
                    <section className="mb-[var(--section-gap)]">
                      <Heading>Professional Experience</Heading>
                      {resumeData.workExperiences?.map((exp, index) => (
                        <div
                          key={index}
                          className="break-inside-avoid pb-[calc(var(--section-gap)*0.25)]"
                        >
                          <div className="font-semibold italic">
                            {exp.position}
                          </div>
                          <div className="flex items-center gap-x-[calc(var(--section-gap)*0.5)]">
                            <span className="font-semibold text-[var(--accent)]">
                              {exp.company}
                            </span>

                            {exp.startDate && (
                              <span>
                                {safeFormatDate(
                                  exp.startDate,
                                  dateFormatNumeric,
                                )}{" "}
                                -{" "}
                                {exp.endDate
                                  ? safeFormatDate(
                                      exp.endDate,
                                      dateFormatNumeric,
                                    )
                                  : "now"}
                              </span>
                            )}
                            {exp.jobLocation && (
                              <span className="font-semibold">
                                {exp.jobLocation}
                              </span>
                            )}
                          </div>
                          <div className="col-span-3">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: exp.description || "",
                              }}
                              className="richTextEditorStyle whitespace-pre-line"
                            />
                          </div>
                        </div>
                      ))}
                    </section>
                  ) : null,
                projectWorks:
                  !!resumeData.projectWorks &&
                  resumeData.projectWorks?.length > 0 ? (
                    <section className="mb-[var(--section-gap)]">
                      <Heading>Project Work</Heading>
                      {resumeData.projectWorks?.map((item, index) => (
                        <div
                          key={index}
                          className="w-[95%] break-inside-avoid space-y-[calc(var(--section-gap)*0.1)]"
                        >
                          <div className="flex justify-between gap-[calc(var(--section-gap)*0.1)]">
                            <p className="flex gap-[calc(var(--section-gap)*0.1)]">
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
                                    className="mr-[calc(var(--section-gap)*0.1)] mt-[calc(var(--section-gap)*0.1)]"
                                  >
                                    <ContactLinks href={l} text={"NO_TEXT"} />
                                  </span>
                                ))}
                            </p>
                          </div>
                          <div className="font-semibold">
                            <p className="flex flex-row">
                              {item.company && (
                                <span className="italic">{item.company}</span>
                              )}
                              {item.startDate && (
                                <span>
                                  {item.startDate &&
                                    `${safeFormatDate(item.startDate, dateFormatText)} - `}
                                  {item.endDate
                                    ? safeFormatDate(
                                        item.endDate,
                                        dateFormatText,
                                      )
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
                    </section>
                  ) : null,
              };

              return leftOrder.map((key) => (
                <React.Fragment key={key}>{sections[key]}</React.Fragment>
              ));
            })()}
          </div>

          {/* right side */}
          <div className="col-span-2">
            {(() => {
              const sections: Record<ResumeSectionKey, React.ReactNode> = {
                workExperiences: null,
                projectWorks: null,
                summary: resumeData.summary ? (
                  <section className="mb-[var(--section-gap)]">
                    <Heading>Professional Summary</Heading>
                    <Text>{resumeData.summary}</Text>
                  </section>
                ) : null,
                educations:
                  !!resumeData.educations &&
                  resumeData.educations?.length > 0 ? (
                    <section className="mb-[var(--section-gap)]">
                      <Heading>Academics</Heading>

                      {resumeData.educations?.map((edu, index) => (
                        <div key={index} className="!m-0 break-inside-avoid">
                          <div className="">
                            <div className="!m-0 flex w-[90%] flex-col flex-wrap justify-between">
                              <span className="font-semibold">
                                {edu.degree} ({edu.stream})
                              </span>
                              <span className="font-semibold">
                                {edu.school}
                              </span>{" "}
                              <p>{edu.description}</p>
                            </div>
                          </div>
                          <div className="">
                            <p className="!m-0 flex w-full gap-x-[calc(var(--section-gap)*0.5)]">
                              <span>
                                {edu.startDate &&
                                  `${safeFormatDate(edu.startDate, dateFormatText)} -`}{" "}
                                {edu.endDate
                                  ? safeFormatDate(edu.endDate, dateFormatText)
                                  : "now"}
                              </span>
                              <span> {edu.location}</span>
                            </p>
                            {edu.marks && <span>Percentage: {edu.marks}%</span>}
                          </div>
                        </div>
                      ))}
                    </section>
                  ) : null,
                skills:
                  !!resumeData.skills && resumeData.skills?.length > 0 ? (
                    <section className="mb-[var(--section-gap)]">
                      <Heading>Skills</Heading>
                      <div className="grid grid-cols-1 gap-x-[calc(var(--section-gap)*0.25)] gap-y-[calc(var(--section-gap)*0.25)]">
                        {resumeData.skills?.map((skill, index) => (
                          <div key={index} className="!m-0 break-inside-avoid">
                            <div className="!m-0 flex items-center justify-between">
                              <p className="flex flex-col">
                                <span className="font-semibold">
                                  {skill.title}
                                </span>
                                {skill.skillName &&
                                  skill.skillName.length > 0 && (
                                    <span>{skill.skillName?.join(", ")}</span>
                                  )}
                              </p>
                            </div>
                            <p className="whitespace-pre-line"></p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null,
                certifications:
                  !!resumeData.certifications &&
                  resumeData.certifications?.length > 0 ? (
                    <section className="mb-[var(--section-gap)]">
                      <Heading>Certifications</Heading>
                      <div
                        className={`flex flex-wrap gap-x-[calc(var(--section-gap)*0.25)] ${resumeData.certifications.find((skill) => skill.description) && "flex-col"}`}
                      >
                        {resumeData.certifications?.map((skill, index) => (
                          <div key={index} className="!m-0 break-inside-avoid">
                            <Link
                              href={skill.link ? skill.link : "#"}
                              className="before:mr-[calc(var(--section-gap)*0.1)] before:content-['•']"
                            >
                              {skill.title}
                            </Link>{" "}
                            {skill.description && (
                              <span className="italic">
                                {" "}
                                - {skill.description}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null,
                others: !!resumeData.others?.title ? (
                  <section className="mb-[var(--section-gap)] break-inside-avoid">
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

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex justify-between">
      {/* Social Links  */}
      <div className="flex flex-col">
        <div className={`flex flex-col justify-between`}>
          <div className="my-auto">
            <p className="font-bold text-[var(--accent)]">
              {firstName} {lastName}
            </p>
            <p className="font-medium text-[var(--accent)]">{jobTitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[calc(var(--section-gap)*0.25)]">
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
      <div className="flex h-max">
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
    <div className="space-y-[calc(var(--section-gap)*0.25)]">
      <div className="flex w-[90%] flex-col">
        <div className={`flex flex-col justify-between`}>
          <div className="my-auto">
            <p className="font-bold text-[var(--accent)]">
              {firstName} {lastName}
            </p>
            <p className="font-medium text-[var(--accent)]">{jobTitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[calc(var(--section-gap)*0.25)]">
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
      <div className="flex break-inside-avoid flex-col space-y-[calc(var(--section-gap)*0.1)] py-[calc(var(--section-gap)*0.25)]">
        <h1 className="text-nowrap font-semibold text-[var(--accent)]">
          {children}
        </h1>
      </div>
    </>
  );
}
