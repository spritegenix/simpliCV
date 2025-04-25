"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import { FaStarOfLife } from "react-icons/fa";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Stylish3({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const BaseFontSize = "text-[12px]";

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-[#f8f7f3] font-arial text-zinc-900",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "grid h-full grid-cols-12 space-y-2",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Left Side  */}
        <div className="col-span-5 space-y-3">
          <PersonalInfoHeader resumeData={resumeData} />
          {/* Skills  */}
          <div className="p-6 pr-3 pt-0">
            {!!resumeData.skills && resumeData.skills?.length > 0 && (
              <>
                <Heading>Skills</Heading>
                <ul className="relative space-y-1 pl-5">
                  {resumeData.skills?.map((skill, index) => (
                    <li
                      key={index}
                      className="relative z-10 break-inside-avoid"
                    >
                      <FaStarOfLife className="absolute -left-[1.6em] top-[0.1em] rounded-full" />
                      <div className="!m-0 flex items-center justify-between">
                        <p>
                          <span className="font-bold">{skill.title}</span>
                          {skill.skillName && skill.skillName.length > 0 && (
                            <span>- {skill.skillName?.join(", ")}</span>
                          )}
                        </p>
                      </div>
                      <p className="whitespace-pre-line"></p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* Academics */}
            {!!resumeData.educations && resumeData.educations?.length > 0 && (
              <>
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
                      <div className="flex w-full justify-between">
                        <p className="font-bold">
                          {edu.school}
                          {edu.location && `, ${edu.location}`}
                        </p>
                        <p className="h-min w-max text-nowrap rounded-full bg-[#555e50] px-2 pt-0.5 text-[#f8f7f3]">
                          {edu.startDate &&
                            `${formatDate(edu.startDate, "MMM yyyy")} -`}{" "}
                          {edu.endDate
                            ? formatDate(edu.endDate, "MMM yyyy")
                            : "Present"}
                        </p>
                      </div>
                    </div>
                    <ul className="!mt-0 flex justify-between">
                      {(edu.degree || edu.stream) && (
                        <li className="">
                          {edu.degree} {edu.stream && `(${edu.stream})`}
                        </li>
                      )}
                      {edu.marks && (
                        <li className="text-nowrap">{edu.marks}</li>
                      )}
                    </ul>
                    {edu.description && (
                      <p className="italic">{edu.description}</p>
                    )}
                  </div>
                ))}
              </>
            )}
            {/* Certifications  */}
            {!!resumeData.certifications &&
              resumeData.certifications?.length > 0 && (
                <>
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
                          className="font-bold"
                        >
                          {skill.title}
                        </Link>{" "}
                        {skill.description && <p>{skill.description}</p>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            {/* Interest  */}
            {!!resumeData.others?.title && (
              <>
                <Heading>{resumeData.others.title}</Heading>
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.others.description || "",
                  }}
                  className="richTextEditorStyle !mt-0 whitespace-pre-line"
                />
              </>
            )}
          </div>
        </div>
        {/* Right Side  */}
        <div className="col-span-7 !mt-0">
          <div className="space-y-3 bg-[#555e50] p-6 pb-3 pl-5 text-[#f8f7f3]">
            {/* Name And Job Title  */}
            <div className="mb-3">
              <p className="text-[3em] font-bold">
                <span className="">{resumeData.firstName}</span>{" "}
                <span>{resumeData.lastName}</span>
              </p>
              <p className="text-[1.6em] font-medium">{resumeData.jobTitle}</p>
              <div className="border-b-1 h-0 w-24 border-b border-[#f8f7f3]" />
            </div>
            {/* Summary */}
            {resumeData.summary && (
              <>
                <Text>{resumeData.summary}</Text>
              </>
            )}
          </div>
          <div className="space-y-3 p-6 pl-5 pt-3">
            {/* Experience */}
            {!!resumeData?.workExperiences &&
              resumeData?.workExperiences?.length > 0 && (
                <>
                  <Heading>Professional Experience</Heading>
                  <ul className="relative !mt-0 space-y-1 pl-5">
                    {resumeData.workExperiences?.map((exp, index) => (
                      <li
                        key={index}
                        className="relative z-10 break-inside-avoid"
                      >
                        <FaStarOfLife className="absolute -left-[1.7em] top-[0.38em] rounded-full" />
                        <div className="!m-0 flex items-center justify-between">
                          <span className="text-[1.2em] font-bold">
                            {exp.company}
                          </span>
                          {exp.jobLocation && <span>{exp.jobLocation}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[1.1em] font-bold italic">
                            {exp.position}
                          </span>
                          {exp.startDate && (
                            <span className="h-min w-max text-nowrap rounded-full bg-[#555e50] px-2 pt-0.5 text-[#f8f7f3]">
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
                      </li>
                    ))}
                  </ul>
                </>
              )}
            {/* Projects */}
            {!!resumeData.projectWorks &&
              resumeData.projectWorks?.length > 0 && (
                <>
                  <Heading>Project Work</Heading>
                  <ul className="relative !mt-0 space-y-1 pl-5">
                    {resumeData.projectWorks?.map((item, index) => (
                      <li
                        key={index}
                        className="relative z-10 break-inside-avoid"
                      >
                        <FaStarOfLife className="absolute -left-[1.7em] top-[0.38em] rounded-full" />
                        <div className="!m-0 flex justify-between gap-1">
                          <p className="flex gap-1">
                            <Link
                              href={
                                !!item?.links && item?.links[0]
                                  ? item?.links[0]
                                  : "#"
                              }
                              target="_blank"
                              className="text-[1.2em] font-bold"
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
                          <p className="flex flex-col items-end text-right">
                            {item.company && (
                              <span className="italic">{item.company}</span>
                            )}
                            {item.startDate && (
                              <span className="h-min w-max text-nowrap rounded-full bg-[#555e50] px-2 pt-0.5 text-[#f8f7f3]">
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
                      </li>
                    ))}
                  </ul>
                </>
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
    <div className="space-y-5 bg-[#ece2da] p-6 pb-3 pr-3">
      {/* Photo  */}
      {photoSrc && (
        <div className="flex w-full justify-center pr-5">
          <Image
            src={photoSrc}
            width={500}
            height={700}
            alt="Author photo"
            className="-ml-3 aspect-square h-[250px] w-full border-4 object-cover object-top"
            style={{
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "59px 59px 0 0"
                    : "10%",
            }}
          />
        </div>
      )}
      {/* Social Links  */}
      <div className="space-y-1.5 text-[1.1em]">
        {(city || country) && (
          <p className="flex items-center gap-4">
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
            <Fragment key={index}>
              <ContactLinks text={link.split("://")?.[1]} href={link} />
            </Fragment>
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
          className="flex items-center gap-4"
        >
          {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
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
        <h1 className="text-nowrap text-[1.3em] font-bold uppercase">
          {children}
        </h1>
        <div className="border-b-1 mb-2 mt-0.5 h-0 w-full border-b border-black" />
      </div>
    </>
  );
}
