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
import { BriefcaseBusiness, FolderOpen, User } from "lucide-react";
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
    resumeData.colorHex === undefined ? "#163853" : resumeData.colorHex;
  const ColorOpacity = hexToRgbaPercent(colorHex, 30);
  return (
    <div
      className={cn(
        `relative z-10 aspect-[210/297] h-fit w-full bg-white px-8 py-10 font-poppins`,
        className,
      )}
      ref={containerRef}
    >
      <div
        className="absolute left-0 top-0 -z-[2] h-[120px] w-full"
        style={{
          backgroundColor: ColorOpacity,
        }}
      ></div>
      <div
        className={cn(
          "grid h-full grid-cols-12",
          BaseFontSize,
          // !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* Left Side  */}
        <div className="col-span-4 space-y-3 border-2 border-black p-6">
          <PersonalInfoHeader
            resumeData={resumeData}
            ColorOpacity={ColorOpacity}
          />
          {/* Skills  */}
          {!!resumeData.skills && resumeData.skills?.length > 0 && (
            <>
              <Heading1 colorHex={colorHex}>Skills</Heading1>
              <div className="">
                {resumeData.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="!m-0 break-inside-avoid space-y-2"
                  >
                    <div className="!m-0 flex flex-col">
                      <p className="font-semibold">{skill.title}</p>
                      {skill.skillName && skill.skillName.length > 0 && (
                        <p>{skill.skillName?.join(", ")}</p>
                      )}
                    </div>
                    <p className="whitespace-pre-line"></p>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* Academics */}
          {!!resumeData.educations && resumeData.educations?.length > 0 && (
            <>
              <Heading1 colorHex={colorHex}>Education</Heading1>
              <div className="">
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
                      {edu.marks && <li>{edu.marks}</li>}
                      {edu.description && <li>{edu.description}</li>}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* Certifications  */}
          {!!resumeData.certifications &&
            resumeData.certifications?.length > 0 && (
              <>
                <Heading1 colorHex={colorHex}>Certifications</Heading1>
                <div className={cn("")}>
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
            )}
          {/* Interest  */}
          {!!resumeData.others?.title && (
            <>
              <Heading1 colorHex={colorHex}>{resumeData.others.title}</Heading1>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.others.description || "",
                  }}
                  className="richTextEditorStyle !mt-0 whitespace-pre-line"
                />
              </div>
            </>
          )}
        </div>
        {/* Right Side  */}
        <div className="col-span-8 space-y-3 p-6 pl-3">
          {/* Name And Job Title  */}
          <div className="">
            <p className="text-[2.5rem] font-bold">
              {resumeData.firstName} {resumeData.lastName}
            </p>
            <p className="text-[2em] font-medium">{resumeData.jobTitle}</p>
          </div>
          {/* Summary */}
          {resumeData.summary && (
            <>
              <Heading>
                <User size={15} className="mr-1" /> Professional Summary
              </Heading>
              <Text>{resumeData.summary}</Text>
            </>
          )}
          {/* Experience */}
          {!!resumeData?.workExperiences &&
            resumeData?.workExperiences?.length > 0 && (
              <>
                <Heading>
                  {" "}
                  <BriefcaseBusiness size={15} className="mr-1" /> Professional
                  Experience
                </Heading>
                <ul className="relative space-y-2">
                  {resumeData.workExperiences?.map((exp, index) => (
                    <li
                      key={index}
                      className="relative z-10 grid break-inside-avoid grid-cols-12"
                    >
                      <div className="col-span-2 pr-4 text-center">
                        <p>
                          {exp.jobLocation && <span>{exp.jobLocation}</span>}
                        </p>
                        <div>
                          {exp.startDate && (
                            <div className="mx-auto flex flex-col justify-center text-center">
                              <span>
                                {formatDate(exp.startDate, "MMM yyyy")}
                              </span>{" "}
                              <span>-</span>
                              <span>
                                {exp.endDate
                                  ? formatDate(exp.endDate, "MMM yyyy")
                                  : "Present"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="relative col-span-10">
                        <div
                          className="l-0 absolute h-full w-0 border border-l"
                          style={{ borderColor: ColorOpacity }}
                        />
                        <div className="pl-4">
                          <div className="!m-0 flex items-center justify-between pl-1">
                            <span className="text-[1.2em] font-semibold">
                              {exp.company}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[1.1em] font-semibold italic">
                              {exp.position}
                            </span>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: exp.description || "",
                            }}
                            className="richTextEditorStyle whitespace-pre-line"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          {/* Projects */}
          {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
            <>
              <Heading>
                <FolderOpen size={15} className="mr-1" /> Project Work
              </Heading>
              {resumeData.projectWorks?.map((item, index) => (
                <div
                  key={index}
                  className="!m-0 grid break-inside-avoid grid-cols-12"
                >
                  <div
                    className={`${item.company || item.startDate ? "col-span-2 pr-2" : ""} text-center`}
                  >
                    <div className="flex flex-col">
                      {item.company && (
                        <span className="italic">{item.company}</span>
                      )}
                      {item.startDate && (
                        <div>
                          <p>
                            {item.startDate &&
                              formatDate(item.startDate, "MMM yyyy")}
                          </p>
                          <p>-</p>
                          <p>
                            {item.endDate
                              ? formatDate(item.endDate, "MMM yyyy")
                              : "Present"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${item.company || item.startDate ? "col-span-10" : "col-span-12"} relative`}
                  >
                    <div
                      className="l-0 absolute h-full w-0 border border-l"
                      style={{ borderColor: ColorOpacity }}
                    />
                    <div
                      className={`${item.company || item.startDate ? "pl-4" : ""}`}
                    >
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
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.description || "",
                        }}
                        className="richTextEditorStyle whitespace-pre-line"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeader({
  resumeData,
  ColorOpacity,
}: {
  resumeData: ResumeValues;
  ColorOpacity?: string;
}) {
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
            className="-ml-3 aspect-square h-full w-full border-4 border-white object-cover object-top"
            style={{
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
      <div className="flex flex-col gap-2">
        {(city || country) && (
          <p className="flex items-center gap-1">
            <span
              className="p-0.5"
              style={{
                backgroundColor: ColorOpacity,
              }}
            >
              <BiSolidMap />
            </span>

            {city}
            {city && country ? ", " : ""}
            {country}
          </p>
        )}
        <ContactLinks
          hexColor={ColorOpacity}
          text={phone}
          href={`tel:${phone}`}
        />
        <ContactLinks
          hexColor={ColorOpacity}
          text={email}
          href={`mailto:${email}`}
        />
        {!!socialLinks &&
          socialLinks.length > 0 &&
          socialLinks.map((link, index) => (
            <ContactLinks
              hexColor={ColorOpacity}
              key={index}
              text={link.split("://")?.[1]}
              href={link}
            />
          ))}
        {portfolioLink && (
          <ContactLinks
            hexColor={ColorOpacity}
            text={"Portfolio"}
            href={portfolioLink}
          />
        )}
      </div>
    </div>
  );
}
function ContactLinks({
  icon,
  text = "",
  href,
  hexColor,
}: {
  icon?: React.ReactNode;
  text?: string | number | undefined;
  href?: string | undefined;
  hexColor?: string | undefined;
}) {
  return (
    <>
      {text && (
        <Link
          href={href ? href : "#"}
          target="_blank"
          className="flex items-center gap-1"
        >
          <span
            className="p-0.5"
            style={{
              backgroundColor: hexColor,
            }}
          >
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

function Heading1({
  children,
  colorHex,
}: {
  children: string;
  colorHex?: string | undefined;
}) {
  return (
    <>
      <div className="relative break-inside-avoid overflow-hidden">
        <h1 className="relative z-10 inline-block w-fit text-nowrap text-[1.2em] font-semibold uppercase">
          {children}
        </h1>
        <span
          className="absolute inset-0 left-[10%] top-0 h-full w-full"
          style={{
            backgroundColor: hexToRgbaPercent(colorHex, 30),
          }}
        ></span>
      </div>
    </>
  );
}
function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <h1 className={cn("flex text-nowrap text-[1.3em] font-bold", className)}>
        {children}
      </h1>
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
