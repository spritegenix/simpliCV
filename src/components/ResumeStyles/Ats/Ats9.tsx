"use client";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import { hexToRgbaPercent } from "./Ats7";
import { ImProfile } from "react-icons/im";
import { PiCertificate, PiPuzzlePiece, PiSuitcaseSimple } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";
import { BsPersonGear } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi2";
interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats9({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10px]";
  const colorHex =
    resumeData.colorHex === undefined ? "#41224a" : resumeData.colorHex;
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-zinc-900",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "space-y-2 font-inter",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {resumeData.photo ? (
          <PersonalInfoHeader resumeData={resumeData} hexBgColor={colorHex} />
        ) : (
          <PersonalInfoHeader1 resumeData={resumeData} hexBgColor={colorHex} />
        )}
        <div
          className="space-y-2 p-10 pt-3"
          style={{ color: hexToRgbaPercent(colorHex, 100) }}
        >
          {/* Summary */}
          {resumeData.summary && (
            <>
              <Heading colorHex={colorHex}>
                <ImProfile /> Professional Summary
              </Heading>
              <Text>{resumeData.summary}</Text>
            </>
          )}

          {!!resumeData?.workExperiences &&
            resumeData?.workExperiences?.length > 0 && (
              <>
                <Heading colorHex={colorHex}>
                  <PiSuitcaseSimple /> Professional Experience
                </Heading>
                {resumeData.workExperiences?.map((exp, index) => (
                  <div key={index} className="!m-0 break-inside-avoid pt-1">
                    <div className="!m-0">
                      <div className="flex justify-between text-[1.1em] font-semibold italic">
                        {exp.position}{" "}
                        {exp.startDate && (
                          <span>
                            {formatDate(exp.startDate, "MMM yyyy")} -{" "}
                            {exp.endDate
                              ? formatDate(exp.endDate, "MMM yyyy")
                              : "Present"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[1.2em] font-semibold"
                          style={{
                            color: colorHex,
                          }}
                        >
                          {exp.company}
                        </span>
                        {exp.jobLocation && (
                          <span className="font-semibold">
                            {exp.jobLocation}
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
                  </div>
                ))}
              </>
            )}
          {/* Projects */}
          {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
            <>
              <Heading colorHex={colorHex}>
                <FaRegFolderOpen />
                Project Work
              </Heading>
              {resumeData.projectWorks?.map((item, index) => (
                <div
                  key={index}
                  className="!m-0 break-inside-avoid space-y-1 pt-1"
                >
                  <div className="!m-0 flex justify-between gap-1">
                    <p className="flex gap-1">
                      <Link
                        href={
                          !!item?.links && item?.links[0] ? item?.links[0] : "#"
                        }
                        target="_blank"
                        className="text-[1.2em] font-semibold"
                        style={{
                          color: colorHex,
                        }}
                      >
                        {item.title}
                      </Link>
                      {!!item.links &&
                        item.links.map((l, index) => (
                          <span key={index} className="mr-1 mt-1">
                            <ContactLinks
                              color={colorHex}
                              href={l}
                              text={"NO_TEXT"}
                            />
                          </span>
                        ))}
                    </p>
                    {item.startDate && (
                      <span>
                        {item.startDate &&
                          `${formatDate(item.startDate, "MMM yyyy")} - `}
                        {item.endDate
                          ? formatDate(item.endDate, "MMM yyyy")
                          : "Present"}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between space-x-16">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                      className="richTextEditorStyle whitespace-pre-line"
                    />
                    {item.company && (
                      <span className="italic">{item.company}</span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          {/* Skills  */}
          {!!resumeData.skills && resumeData.skills?.length > 0 && (
            <>
              <Heading colorHex={colorHex}>
                <BsPersonGear /> Skills
              </Heading>
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                {resumeData.skills?.map((skill, index) => (
                  <div key={index} className="!m-0 break-inside-avoid">
                    <div className="!m-0 flex items-center justify-between">
                      <p className="flex flex-col">
                        <span className="font-semibold">{skill.title}</span>
                        {skill.skillName && skill.skillName.length > 0 && (
                          <span>{skill.skillName?.join(", ")}</span>
                        )}
                      </p>
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
              <Heading colorHex={colorHex}>
                <HiOutlineAcademicCap />
                Academics
              </Heading>

              {resumeData.educations?.map((edu, index) => (
                <div key={index} className="break-inside-avoid gap-x-2 gap-y-2">
                  <div className="">
                    <div className="!m-0 flex w-full flex-col justify-between">
                      <span className="flex justify-between font-semibold">
                        {edu.school}{" "}
                        <span>
                          {edu.startDate &&
                            `${formatDate(edu.startDate, "MMM yyyy")} -`}{" "}
                          {edu.endDate
                            ? formatDate(edu.endDate, "MMM yyyy")
                            : "Present"}
                        </span>
                      </span>{" "}
                      <span className="flex justify-between">
                        {edu.degree} ({edu.stream})<span> {edu.location}</span>
                      </span>
                      <p>{edu.description}</p>
                    </div>
                    <p className="!m-0 flex w-full flex-col justify-between">
                      {edu.marks && <span>Percentage: {edu.marks}%</span>}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
          {/* Certifications  */}
          {!!resumeData.certifications &&
            resumeData.certifications?.length > 0 && (
              <>
                <Heading colorHex={colorHex}>
                  <PiCertificate />
                  Certifications
                </Heading>
                <div
                  className={`flex flex-wrap gap-x-2 ${resumeData.certifications.find((skill) => skill.description) && "flex-col"}`}
                >
                  {resumeData.certifications?.map((skill, index) => (
                    <div key={index} className="!m-0 break-inside-avoid">
                      <Link
                        href={skill.link ? skill.link : "#"}
                        className="before:mr-1 before:content-['•']"
                      >
                        {skill.title}
                      </Link>{" "}
                      {skill.description && (
                        <span className="italic"> - {skill.description}</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          {/* Interest  */}
          {!!resumeData.others?.title && (
            <div className="break-inside-avoid">
              <Heading colorHex={colorHex}>
                <PiPuzzlePiece />
                {resumeData.others.title}
              </Heading>
              <div
                dangerouslySetInnerHTML={{
                  __html: resumeData.others.description || "",
                }}
                className="richTextEditorStyle whitespace-pre-line pt-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoHeader({
  resumeData,
  hexBgColor,
}: {
  resumeData: ResumeValues;
  hexBgColor?: string;
}) {
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
    <div
      className="mb-2 grid grid-cols-12 p-10"
      style={{
        backgroundColor: hexBgColor,
      }}
    >
      <div className="col-span-10 flex h-max flex-col">
        <div className={`gird flex flex-col justify-between`}>
          <div className="my-auto flex items-end gap-x-2 text-white">
            <p
              className="text-[1.8rem] font-bold"
              // style={{
              //   color: colorHex,
              // }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="text-[2em] font-medium"
              // style={{
              //   color: colorHex,
              // }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
        {/* Social Links  */}
        <div className="grid grid-cols-2 text-[1.2em]">
          {(city || country) && (
            <p className="flex items-center gap-1">
              <span>
                <BiSolidMap color={`${hexToRgbaPercent("#fff", 30)}`} />
              </span>

              <span className="text-white">
                {city}
                {city && country ? ", " : ""}
                {country}
              </span>
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
      <div className="col-span-2">
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
function PersonalInfoHeader1({
  resumeData,
  hexBgColor,
}: {
  resumeData: ResumeValues;
  hexBgColor?: string;
}) {
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
    <div
      className="mb-2 space-y-1 p-10"
      style={{
        backgroundColor: hexBgColor,
      }}
    >
      <Link
        href={resumeData.portfolioLink || "#"}
        className="cursor-pointer text-center"
      >
        <div className="flex items-end gap-x-3 text-white">
          <p
            className="text-[1.8rem] font-bold"
            // style={{
            //   color: colorHex,
            // }}
          >
            {firstName &&
              firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}{" "}
            {lastName}
          </p>
          <p
            className="text-xl"
            // style={{
            //   color: colorHex,
            // }}
          >
            {jobTitle}
          </p>
        </div>
      </Link>
      {/* Social Links  */}
      <div className="grid grid-cols-3 flex-wrap gap-x-8 gap-y-1 text-sm">
        {(city || country) && (
          <p className="flex items-center gap-1 text-white">
            <span>
              <BiSolidMap color={`${hexToRgbaPercent("#fff", 30)}`} />
            </span>
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
  color,
}: {
  icon?: React.ReactNode;
  text?: string | number | undefined;
  href?: string | undefined;
  color?: string;
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
            style={{
              color: hexToRgbaPercent(color, 30),
            }}
          >
            {icon ? icon : <SocialMediaIconFinder url={href ? href : ""} />}
          </span>
          {text === "NO_TEXT" ? "" : <p className="text-white">{text}</p>}
        </Link>
      )}
    </>
  );
}

function Text({ children }: { children: string }) {
  return <p className="!m-0 whitespace-pre-line pt-1">{children}</p>;
}

function Heading({
  children,
  colorHex,
}: {
  children: ReactNode;
  colorHex: string | undefined;
}) {
  return (
    <>
      <div className="flex break-inside-avoid flex-col space-y-1 text-base">
        <h1
          className="flex items-center gap-x-2 text-nowrap text-[1.2em] font-semibold"
          style={{
            color: hexToRgbaPercent(colorHex, 40),
          }}
        >
          {children}
        </h1>
        {/* <div
          className="border-1 mb-[5px] mt-auto h-0 w-full border"
          style={{
            borderColor: colorHex,
          }}
        /> */}
      </div>
    </>
  );
}
