"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Stylish1({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10px]";

  return (
    <section
      className={cn(
        "aspect-[210/297] h-fit w-full !bg-[#303030] p-6 text-[#f0dfc8]",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("font-inter", BaseFontSize, !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Section 1  */}
        <div className="mb-5 grid grid-cols-12">
          {/* left - pic and summary  */}
          <div className="col-span-4 pr-5">
            <PersonalInfoHeader resumeData={resumeData} />
          </div>
          {/* Right - name , job title, educations */}
          <div className="col-span-8 flex w-full">
            <DottedLine noOfDots={3} isVertical className="mt-28" />
            <div className="space-y-5">
              <div className="pl-5">
                <h1 className="font-styleScript text-[5em]">
                  {resumeData.firstName} {resumeData.lastName}
                </h1>
                <h2 className="text-[1.4em]">{resumeData.jobTitle}</h2>
              </div>
              {/* Academics */}
              {!!resumeData.educations && resumeData.educations?.length > 0 && (
                <div className="space-y-5 pl-5">
                  <Heading>Academics</Heading>
                  {resumeData.educations?.map((edu, index) => (
                    <div key={index} className="break-inside-avoid">
                      <p className="flex w-full justify-between">
                        <span className="font-semibold">
                          {edu.school}, {edu.location}
                        </span>{" "}
                        <span>
                          {edu.startDate &&
                            `${formatDate(edu.startDate, "MMM yyyy")} -`}{" "}
                          {edu.endDate
                            ? formatDate(edu.endDate, "MMM yyyy")
                            : "Present"}
                        </span>
                      </p>
                      <p className="flex w-full justify-between">
                        <span className="">
                          {edu.degree} ({edu.stream})
                        </span>
                        <span>{edu.marks}</span>
                      </p>
                      <p className="italic">{edu.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {/* Certifications  */}
              {!!resumeData.certifications &&
                resumeData.certifications?.length > 0 && (
                  <div className="ml-5 space-y-5">
                    <Heading>Certifications</Heading>
                    <div className={`flex w-full flex-wrap gap-x-2`}>
                      {resumeData.certifications?.map((skill, index) => (
                        <div key={index} className="break-inside-avoid">
                          <Link
                            href={skill.link ? skill.link : "#"}
                            className="before:mr-3 before:content-['•']"
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
                  </div>
                )}
              {/* Interest  */}
              {!!resumeData.others?.title && (
                <div className="break-inside-avoid space-y-5 pl-5">
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
        <DottedLine noOfDots={3} className="w-96" />
        <div className="mt-5 grid grid-cols-12">
          <div className="col-span-8 pr-5">
            {/* Experience */}
            {!!resumeData?.workExperiences &&
              resumeData?.workExperiences?.length > 0 && (
                <div className="space-y-5">
                  <Heading>Professional Experience</Heading>
                  {resumeData.workExperiences?.map((exp, index) => (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex items-center justify-between">
                        <span className="text-[1.2em] font-semibold">
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
                            {formatDate(exp.startDate, "MMM yyyy")} -{" "}
                            {exp.endDate
                              ? formatDate(exp.endDate, "MMM yyyy")
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
                    </div>
                  ))}
                </div>
              )}
            {/* Projects */}
            {!!resumeData.projectWorks &&
              resumeData.projectWorks?.length > 0 && (
                <div className="space-y-5 pt-5">
                  <Heading>Project Work</Heading>
                  {resumeData.projectWorks?.map((item, index) => (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex justify-between gap-1">
                        <p className="flex w-full gap-1">
                          <Link
                            href={
                              !!item?.links && item?.links[0]
                                ? item?.links[0]
                                : "#"
                            }
                            target="_blank"
                            className="text-nowrap text-[1.2em] font-semibold"
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
                            <span className="text-nowrap italic">
                              {item.company}
                            </span>
                          )}
                          {item.startDate && (
                            <span className="text-nowrap">
                              {item.startDate &&
                                `${formatDate(item.startDate, "MMM yyyy")} - `}
                              {item.endDate
                                ? formatDate(item.endDate, "MMM yyyy")
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
                    </div>
                  ))}
                </div>
              )}
          </div>
          <div className="col-span-4 flex w-full">
            <DottedLine noOfDots={4} isVertical />
            <div className="ml-5 flex w-full flex-col justify-between">
              {/* Skills  */}
              {!!resumeData.skills && resumeData.skills?.length > 0 && (
                <div className="space-y-3">
                  <Heading className="mb-5">Skills</Heading>
                  <ul className="list-disc space-y-3">
                    {resumeData.skills?.map((skill, index) => (
                      <li key={index} className="break-inside-avoid">
                        <span className="font-semibold">{skill.title}</span>
                        {skill.skillName && skill.skillName.length > 0 && (
                          <span> - {skill.skillName?.join(", ")}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Social Links  */}
              <div className="break-inside-avoid">
                <Heading className="mb-5">Contact</Heading>
                <div className="space-y-3">
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
                    resumeData.socialLinks.map((link) => (
                      <ContactLinks
                        key={link}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalInfoHeader({ resumeData }: { resumeData: ResumeValues }) {
  const { photo, borderStyle } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="space-y-5">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={500}
          height={500}
          alt="Author photo"
          className="max-h-72 w-full object-cover object-top"
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
      {/* Summary  */}
      {resumeData.summary && (
        <>
          <Heading>Summary</Heading>
          <Text className="text-justify">{resumeData.summary}</Text>
        </>
      )}
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
  return <p className={cn("whitespace-pre-line", className)}>{children}</p>;
}

function Heading({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <>
      <h1 className={cn("text-nowrap text-[1.3em] font-bold", className)}>
        {children}
      </h1>
    </>
  );
}

interface DottedLineProps {
  noOfDots: number;
  isVertical?: boolean;
  className?: string;
  dotColor?: string;
  lineColor?: string;
  gap?: string;
}

function DottedLine({
  noOfDots,
  isVertical = false,
  className,
  dotColor = "#f0dfc8",
  lineColor = "#f0dfc8",
  gap = "gap-24",
}: DottedLineProps) {
  return (
    <div
      className={cn(
        "relative flex items-center",
        isVertical ? "flex-col" : "flex-row",
        gap,
        className,
      )}
    >
      {Array.from({ length: noOfDots }, (_, index) => (
        <span
          key={index}
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        ></span>
      ))}
      <div
        className={cn(
          "absolute",
          isVertical ? "h-full w-[1px]" : "h-[1px] w-full",
        )}
        style={{ backgroundColor: lineColor }}
      ></div>
    </div>
  );
}
