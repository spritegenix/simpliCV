"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import SocialMediaIconFinder from "@/components/SocialMediaIconFinder";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function Ats8({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const BaseFontSize = resumeData?.baseFontSize
    ? `text-[${resumeData.baseFontSize}px]`
    : "text-[10px]";

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
          "h-full gap-x-4 space-y-2 font-inter",
          BaseFontSize,
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent"
      >
        {/* left side */}
        <div
          className="col-span-3 p-10"
          // style={{
          //   backgroundColor: hexToRgbaPercent(resumeData.colorHex, 30),
          // }}
        >
          {resumeData.photo ? (
            <PersonalInfoHeader resumeData={resumeData} />
          ) : (
            <PersonalInfoHeader1 resumeData={resumeData} />
          )}
          {/* Summary */}
          {resumeData.summary && (
            <LineStyle
              colorHex={resumeData.colorHex ?? "#ccccc"}
              header="Professional Summary"
            >
              {" "}
              <Text>{resumeData.summary}</Text>
            </LineStyle>
          )}
          {/* Experience */}
          {!!resumeData?.workExperiences &&
            resumeData?.workExperiences?.length > 0 && (
              <LineStyle
                header="Professional Experience"
                colorHex={resumeData.colorHex ?? "#cccc"}
              >
                {" "}
                {resumeData.workExperiences?.map((exp, index) => (
                  <div key={index} className="!m-0 break-inside-avoid pb-2">
                    <div className="flex justify-between">
                      <div className="text-[1.4em] font-semibold">
                        {exp.position},{" "}
                        <span
                          className="text-[1em] font-semibold"
                          style={{
                            color: resumeData.colorHex,
                          }}
                        >
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        {exp.startDate && (
                          <span>
                            {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                            {exp.endDate
                              ? formatDate(exp.endDate, "MM/yyyy")
                              : "Present"}
                          </span>
                        )}
                        {exp.jobLocation && (
                          <span className="font-semibold">
                            {exp.jobLocation}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-span-3 !m-0">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: exp.description || "",
                        }}
                        className="richTextEditorStyle whitespace-pre-line"
                      />
                    </div>
                  </div>
                ))}
              </LineStyle>
            )}
          {/* Projects */}
          {!!resumeData.projectWorks && resumeData.projectWorks?.length > 0 && (
            <LineStyle
              colorHex={resumeData.colorHex ?? "#ccccc"}
              header="Project Work"
            >
              {resumeData.projectWorks?.map((item, index) => (
                <div
                  key={index}
                  className="!m-0 break-inside-avoid space-y-1 pb-2"
                >
                  <div className="flex justify-between">
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
                          style={{
                            color: resumeData.colorHex,
                          }}
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
                    <div className="font-semibold">
                      <p className="flex flex-col">
                        {item.startDate && (
                          <span>
                            {item.startDate &&
                              `${formatDate(item.startDate, "MMM yyyy")} - `}
                            {item.endDate
                              ? formatDate(item.endDate, "MMM yyyy")
                              : "Present"}
                          </span>
                        )}
                        {item.company && (
                          <span className="italic">{item.company}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.description || "",
                    }}
                    className="richTextEditorStyle whitespace-pre-line"
                  />
                </div>
              ))}
            </LineStyle>
          )}
          {/* Academics */}
          {!!resumeData.educations && resumeData.educations?.length > 0 && (
            <LineStyle
              colorHex={resumeData.colorHex ?? "#cccc"}
              header="Academics"
            >
              {resumeData.educations?.map((edu, index) => (
                <div key={index} className="!m-0 break-inside-avoid">
                  <div className="">
                    <div className="!m-0 flex flex-col flex-wrap justify-between">
                      <span className="text-[1.2em] font-semibold">
                        {edu.degree} ({edu.stream})
                      </span>
                      <span className="text-[1em] font-semibold">
                        {edu.school}, <span> {edu.location}</span>
                      </span>{" "}
                      <p>{edu.description}</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="!m-0 flex w-full gap-x-4">
                      <span>
                        {edu.startDate &&
                          `${formatDate(edu.startDate, "MMM yyyy")} -`}{" "}
                        {edu.endDate
                          ? formatDate(edu.endDate, "MMM yyyy")
                          : "Present"}
                      </span>
                    </p>
                    {edu.marks && <span>Percentage: {edu.marks}%</span>}
                  </div>
                </div>
              ))}
            </LineStyle>
          )}
          {/* Skills  */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <LineStyle
              colorHex={resumeData.colorHex ?? "#cccc"}
              header="Skills"
            >
              <div className="grid grid-cols-3 gap-x-2 gap-y-2">
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
            </LineStyle>
          )}

          {/* Certifications  */}
          {!!resumeData.certifications &&
            resumeData.certifications?.length > 0 && (
              <LineStyle
                colorHex={resumeData.colorHex ?? "#cccc"}
                header="Certifications"
              >
                {" "}
                <div
                  className={`flex flex-wrap justify-center gap-x-2 ${resumeData.certifications.find((skill) => skill.description) && "flex-col"}`}
                >
                  {resumeData.certifications?.map((skill, index) => (
                    <div
                      key={index}
                      className="!m-0 break-inside-avoid justify-center"
                    >
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
              </LineStyle>
            )}

          {/* Interest  */}
          {!!resumeData.others?.title && (
            <LineStyle
              colorHex={resumeData.colorHex ?? "#cccc"}
              header={`${resumeData.others.title}`}
            >
              {" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: resumeData.others.description || "",
                }}
                className="richTextEditorStyle whitespace-pre-line"
              />
            </LineStyle>
          )}
        </div>
      </div>
    </div>
  );
}

export function PersonalInfoHeader({
  resumeData,
}: {
  resumeData: ResumeValues;
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
    colorHex,
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
    <div className="flex flex-col justify-between gap-y-3">
      {/* Social Links  */}
      <div className="flex justify-center gap-x-10 text-center">
        <div className="flex h-max gap-6">
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
        <div className={`flex flex-col justify-between`}>
          <div className="my-auto">
            <p
              className="text-[3em] font-bold"
              style={{
                color: colorHex,
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="text-[1.6em] font-medium"
              style={{
                color: colorHex,
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-2 pb-4 text-center">
        {(city || country) && (
          <p className="flex items-center gap-1">
            <BiSolidMap />
            {city}
            {city && country ? ", " : ""}
            {country} |
          </p>
        )}
        {phone && (
          <>
            <ContactLinks text={phone} href={`tel:${phone}`} /> |
          </>
        )}
        {email && (
          <>
            <ContactLinks text={email} href={`mailto:${email}`} /> |
          </>
        )}
        {!!socialLinks &&
          socialLinks.length > 0 &&
          socialLinks.map((link, index) => (
            <span key={index} className="flex items-center gap-1">
              <ContactLinks text={link.split("://")?.[1]} href={link} />

              {(index !== socialLinks.length - 1 || portfolioLink) && (
                <span>|</span>
              )}
            </span>
          ))}
        {portfolioLink && (
          <ContactLinks text={"Portfolio"} href={portfolioLink} />
        )}
      </div>
    </div>
  );
}
export function PersonalInfoHeader1({
  resumeData,
}: {
  resumeData: ResumeValues;
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
    colorHex,
  } = resumeData;

  return (
    <div className="mb-2 space-y-2 text-center">
      <div className="flex flex-col gap-y-2">
        <div className={`flex flex-col justify-between`}>
          <div className="my-auto">
            <p
              className="text-[3em] font-bold"
              style={{
                color: colorHex,
              }}
            >
              {firstName} {lastName}
            </p>
            <p
              className="text-[1.6em] font-medium"
              style={{
                color: colorHex,
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 pb-4 text-center">
          {(city || country) && (
            <p className="flex items-center gap-1">
              <BiSolidMap />
              {city}
              {city && country ? ", " : ""}
              {country} |
            </p>
          )}
          {phone && (
            <>
              <ContactLinks text={phone} href={`tel:${phone}`} /> |
            </>
          )}
          {email && (
            <>
              <ContactLinks text={email} href={`mailto:${email}`} /> |
            </>
          )}
          {!!socialLinks &&
            socialLinks.length > 0 &&
            socialLinks.map((link, index) => (
              <span key={index} className="flex items-center gap-1">
                <ContactLinks text={link.split("://")?.[1]} href={link} />

                {(index !== socialLinks.length - 1 || portfolioLink) && (
                  <span>|</span>
                )}
              </span>
            ))}
          {portfolioLink && (
            <ContactLinks text={"Portfolio"} href={portfolioLink} />
          )}
        </div>
      </div>
    </div>
  );
}

export function ContactLinks({
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

export function Text({ children }: { children: string }) {
  return <p className="!m-0 whitespace-pre-line">{children}</p>;
}

export function Heading({
  children,
  colorHex,
}: {
  children: string;
  colorHex: string | undefined;
}) {
  return (
    <>
      <div className="flex-w flex break-inside-avoid flex-col space-y-1 text-base">
        <h1
          className="text-wrap text-[1.1em] font-semibold"
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

interface LineStyleProps {
  colorHex: string;
  header: string;
  children: ReactNode;
}
const LineStyle: React.FC<LineStyleProps> = ({
  colorHex,
  header,
  children,
}) => {
  return (
    <div className="relative grid grid-cols-12 gap-x-4">
      <div className="col-span-2 pb-2">
        <Heading colorHex={colorHex}>{header}</Heading>
      </div>
      <div className="relative col-span-10 pb-2">
        <div
          className="absolute left-0 top-0 h-full w-[2px]"
          style={{ backgroundColor: colorHex }}
        />
        <div className="pl-4">{children}</div>
      </div>
    </div>
  );
};