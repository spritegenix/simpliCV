"use client";

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

export default function Modern1({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10px]";

  const colorHex =
    resumeData.colorHex === "#000000" || resumeData.colorHex === undefined
      ? "#6f706a"
      : resumeData.colorHex;
  return (
    <div
      className={cn(
        "relative aspect-[210/297] h-fit w-full overflow-hidden bg-white font-poppins",
        className,
      )}
      ref={containerRef}
    >
      <div
        className="absolute z-[0] h-[180px] w-screen"
        style={{
          backgroundColor: hexToRgbaPercent(colorHex, 100),
        }}
      />
      <div
        className={cn(
          "mx-10 grid h-full grid-cols-12 space-y-2",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Left Side  */}
        <div
          className="z-[1] col-span-4 mt-16 space-y-3 rounded-t-full p-6"
          style={{
            backgroundColor: alteredHexToRgbaPercent(colorHex),
          }}
        >
          <PersonalInfoHeader resumeData={resumeData} />
          {/* Skills  */}
          {!!resumeData.skills && resumeData.skills?.length > 0 && (
            <div className="space-y-2">
              <Heading>Skills</Heading>
              <div>
                {resumeData.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="!m-0 break-inside-avoid space-y-2"
                  >
                    <div className="!m-0 flex items-center justify-between">
                      <ul>
                        <li className="list-inside list-disc">
                          <span className="font-semibold">{skill.title}</span>
                          {skill.skillName && skill.skillName.length > 0 && (
                            <span>- {skill.skillName?.join(", ")}</span>
                          )}
                        </li>
                      </ul>
                    </div>
                    <p className="whitespace-pre-line"></p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Academics */}
          {!!resumeData.educations && resumeData.educations?.length > 0 && (
            <div className="space-y-2">
              <Heading>Education</Heading>
              <div>
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
                          `${formatDate(edu.startDate, "MMM yyyy")} -`}{" "}
                        {edu.endDate
                          ? formatDate(edu.endDate, "MMM yyyy")
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
                      {edu.marks && <li>Percentage: {edu.marks}</li>}
                      {edu.description && <li>{edu.description}</li>}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Certifications  */}
          {!!resumeData.certifications &&
            resumeData.certifications?.length > 0 && (
              <div className="space-y-2">
                <Heading>Certifications</Heading>
                <div>
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
                </div>
              </div>
            )}
          {/* Interest  */}
          {!!resumeData.others?.title && (
            <div className="space-y-2">
              <Heading>{resumeData.others.title}</Heading>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.others.description || "",
                  }}
                  className="richTextEditorStyle !mt-0 whitespace-pre-line"
                />
              </div>
            </div>
          )}
        </div>
        {/* Right Side  */}
        <div className="z-[1] col-span-8 space-y-3 p-6 pl-3">
          {/* Name And Job Title  */}
          <div className="my-16 text-end text-white">
            <p className="text-[40px]">
              <span className="font-bold">{resumeData.firstName}</span>{" "}
              <span className="font-semibold">{resumeData.lastName}</span>
            </p>
            <p className="text-[16px] font-medium">{resumeData.jobTitle}</p>
          </div>
          {/* Summary */}
          {resumeData.summary && (
            <div className="space-y-2">
              <Heading>Professional Summary</Heading>
              <div>
                <Text>{resumeData.summary}</Text>
              </div>
            </div>
          )}
          {/* Experience */}
          {!!resumeData?.workExperiences &&
            resumeData?.workExperiences?.length > 0 && (
              <div className="space-y-2">
                <Heading>Professional Experience</Heading>
                <div>
                  <ul className="relative pl-4">
                    {resumeData.workExperiences?.map((exp, index) => (
                      <li
                        key={index}
                        className="relative z-10 break-inside-avoid before:absolute before:-left-4 before:top-0 before:z-10 before:h-3 before:w-3 before:rounded-full before:border-[1px] before:border-zinc-900 before:bg-white after:absolute after:-left-[11px] after:top-0 after:z-0 after:h-full after:w-px after:bg-zinc-900"
                      >
                        <div className="!m-0 flex items-center justify-between">
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          {/* Projects */}
          {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
            <div className="space-y-2">
              <Heading>Project Work</Heading>
              <div>
                {resumeData.projectWorks?.map((item, index) => (
                  <div key={index} className="!m-0 break-inside-avoid pt-2">
                    <div className="!m-0 flex justify-between gap-1">
                      <p className="flex gap-1">
                        <Link
                          href={
                            !!item?.links && item?.links[0]
                              ? item?.links[0]
                              : "#"
                          }
                          target="_blank"
                          className="text-[1.2em] font-semibold"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeader({ resumeData }: { resumeData: ResumeValues }) {
  const { photo, portfolioLink, socialLinks, city, country, phone, email } =
    resumeData;

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
            className="aspect-square h-[200px] w-full object-cover"
            style={{
              borderRadius: "9999px",
            }}
          />
        </div>
      )}
      {/* Social Links  */}
      <div className="space-y-2">
        {(city || country || socialLinks || portfolioLink) && (
          <Heading>Contact</Heading>
        )}
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

function Text({ children }: { children: string }) {
  return <p className="!m-0 whitespace-pre-line">{children}</p>;
}

function Heading({ children }: { children: string }) {
  return (
    <>
      <div className="grid break-inside-avoid grid-cols-6 items-center">
        <h1 className="col-span-3 text-wrap text-[1.2em] font-semibold uppercase">
          {children}
        </h1>
        <div className="col-span-3 flex items-center justify-end">
          <div className="h-0.5 w-10/12 bg-zinc-700" />
        </div>
      </div>
    </>
  );
}

export function hexToRgbaPercent(
  hex: string = "#fff",
  alphaPercent: number = 100,
): string {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand (#f06 → #ff0066)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color.");
  }

  const r: number = parseInt(hex.substring(0, 2), 16);
  const g: number = parseInt(hex.substring(2, 4), 16);
  const b: number = parseInt(hex.substring(4, 6), 16);

  // Clamp alpha between 0–100
  alphaPercent = Math.max(0, Math.min(100, alphaPercent));

  return `rgba(${r}, ${g}, ${b}, ${alphaPercent}%)`;
}

export function alteredHexToRgbaPercent(
  hex: string = "#fff",
  alphaPercent: number = 100,
): string {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand (#f06 → #ff0066)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color.");
  }

  const r: number = parseInt(hex.substring(0, 2), 16) + 80;
  const g: number = parseInt(hex.substring(2, 4), 16) + 80;
  const b: number = parseInt(hex.substring(4, 6), 16) + 80;

  // Clamp alpha between 0–100
  alphaPercent = Math.max(0, Math.min(100, alphaPercent));

  return `rgba(${r}, ${g}, ${b}, ${alphaPercent}%)`;
}
