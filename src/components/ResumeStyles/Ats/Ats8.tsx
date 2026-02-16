"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn, getResumeDateFormat, safeFormatDate } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
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

export default function Ats8({ resumeData, className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const dateFormatNumeric = getResumeDateFormat(
    resumeData.dateFormat,
    "MM/yyyy",
  );
  const dateFormatText = getResumeDateFormat(resumeData.dateFormat, "MMM yyyy");

  const orderedSections = normalizeSectionOrder(resumeData.sectionOrder);
  const sections: Record<ResumeSectionKey, React.ReactNode> = {
    summary: resumeData.summary ? (
      <LineStyle colorHex={"var(--accent)"} header="Professional Summary">
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.summary || "",
          }}
          className="richTextEditorStyle !m-0 whitespace-pre-line pt-1"
        />
      </LineStyle>
    ) : null,
    workExperiences:
      !!resumeData?.workExperiences &&
      resumeData?.workExperiences?.length > 0 ? (
        <LineStyle header="Professional Experience" colorHex={"var(--accent)"}>
          {resumeData.workExperiences?.map((exp, index) => (
            <div key={index} className="!m-0 break-inside-avoid pb-2">
              <div className="flex justify-between">
                <div>
                  <span
                    data-resume-entry-title
                    className="text-[1em] font-semibold"
                    style={{
                      color: "var(--accent)",
                    }}
                  >
                    {exp.company}
                  </span>
                  {exp.position && (
                    <span
                      data-resume-entry-subtitle
                      data-entry-subtitle-slot="inline"
                      className="text-[1.4em] font-medium"
                    >
                      {exp.position}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  {exp.startDate && (
                    <span>
                      {safeFormatDate(exp.startDate, dateFormatNumeric)} -{" "}
                      {exp.endDate
                        ? safeFormatDate(exp.endDate, dateFormatNumeric)
                        : "now"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                {exp.position ? (
                  <span
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    className="text-[1.4em] font-medium"
                  >
                    {exp.position}
                  </span>
                ) : (
                  <span />
                )}
                {exp.jobLocation && (
                  <span className="font-semibold">{exp.jobLocation}</span>
                )}
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
      ) : null,
    projectWorks:
      !!resumeData.projectWorks && resumeData.projectWorks?.length > 0 ? (
        <LineStyle colorHex={"var(--accent)"} header="Project Work">
          {resumeData.projectWorks?.map((item, index) => (
            <div key={index} className="!m-0 break-inside-avoid space-y-1 pb-2">
              <div className="flex justify-between">
                <div className="!m-0 flex justify-between gap-1">
                  <p className="flex gap-1">
                    <Link
                      data-resume-entry-title
                      href={
                        !!item?.links && item?.links[0] ? item?.links[0] : "#"
                      }
                      target="_blank"
                      className="text-[1.2em] font-semibold"
                      style={{
                        color: "var(--accent)",
                      }}
                    >
                      {item.title}
                    </Link>
                    {item.company && (
                      <span
                        data-resume-entry-subtitle
                        data-entry-subtitle-slot="inline"
                        className="font-medium"
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
                </div>
                <div className="font-semibold">
                  <p className="flex flex-col">
                    {item.startDate && (
                      <span>
                        {item.startDate &&
                          `${safeFormatDate(item.startDate, dateFormatText)} - `}
                        {item.endDate
                          ? safeFormatDate(item.endDate, dateFormatText)
                          : "present"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                {item.company && (
                  <span
                    data-resume-entry-subtitle
                    data-entry-subtitle-slot="newline"
                    className="font-medium"
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
        </LineStyle>
      ) : null,
    educations:
      !!resumeData.educations && resumeData.educations?.length > 0 ? (
        <LineStyle colorHex={"var(--accent)"} header="Academics">
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
                      `${safeFormatDate(edu.startDate, "yyyy")} -`}{" "}
                    {edu.endDate ? safeFormatDate(edu.endDate, "yyyy") : "now"}
                  </span>
                </p>
                {edu.marks && <span>Percentage: {edu.marks}%</span>}
              </div>
            </div>
          ))}
        </LineStyle>
      ) : null,
    skills:
      resumeData.skills && resumeData.skills.length > 0 ? (
        <LineStyle colorHex={"var(--accent)"} header="Skills">
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
      ) : null,
    certifications:
      !!resumeData.certifications && resumeData.certifications?.length > 0 ? (
        <LineStyle colorHex={"var(--accent)"} header="Certifications">
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
      ) : null,
    others: !!resumeData.others?.title ? (
      <LineStyle
        colorHex={"var(--accent)"}
        header={`${resumeData.others.title}`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: resumeData.others.description || "",
          }}
          className="richTextEditorStyle whitespace-pre-line"
        />
      </LineStyle>
    ) : null,
  };

  return (
    <div
      className={cn("aspect-[210/297] h-fit w-full", className)}
      style={{
        color: "var(--text)",
        backgroundColor: "#F5F5DC",
      }}
      ref={containerRef}
    >
      <div
        className={cn("h-full gap-x-4 space-y-2", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
          fontSize: "var(--base-font)",
        }}
        id="resumePreviewContent"
      >
        {/* left side */}
        <div className="col-span-3 p-10">
          {resumeData.photo ? (
            <PersonalInfoHeader resumeData={resumeData} />
          ) : (
            <PersonalInfoHeader1 resumeData={resumeData} />
          )}
          {orderedSections.map((key) => (
            <React.Fragment key={key}>{sections[key]}</React.Fragment>
          ))}
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
    <div className="flex flex-col justify-between gap-y-3" data-resume-header>
      {/* Social Links  */}
      <div className="flex justify-center gap-x-10">
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
                color: colorHex,
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "gap-x-2 pb-4",
          detailsArrangement === "stacked"
            ? "flex flex-col items-center gap-y-1"
            : "flex flex-wrap justify-center",
        )}
        data-resume-personal-details
      >
        {(city || country) && (
          <p className="flex items-center gap-1">
            <BiSolidMap />
            {city}
            {city && country ? ", " : ""}
            {country} {detailsArrangement !== "stacked" && "|"}
          </p>
        )}
        {phone && (
          <>
            <ContactLinks text={phone} href={`tel:${phone}`} />{" "}
            {detailsArrangement !== "stacked" && "|"}
          </>
        )}
        {email && (
          <>
            <ContactLinks text={email} href={`mailto:${email}`} />{" "}
            {detailsArrangement !== "stacked" && "|"}
          </>
        )}
        {!!socialLinks &&
          socialLinks.length > 0 &&
          socialLinks.map((link, index) => (
            <span key={index} className="flex items-center gap-1">
              <ContactLinks text={link.split("://")?.[1]} href={link} />

              {detailsArrangement !== "stacked" &&
                (index !== socialLinks.length - 1 || portfolioLink) && (
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
    <div className="mb-2 space-y-2" data-resume-header>
      <div className="flex flex-col gap-y-2">
        <div className={`flex flex-col justify-between`}>
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
                color: colorHex,
                fontSize:
                  "calc(var(--base-font) * 1.35 * var(--heading-scale))",
              }}
            >
              {jobTitle}
            </p>
          </div>
        </div>
        <div
          className="flex flex-wrap justify-center gap-x-2 pb-4"
          data-resume-personal-details
        >
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
      <div
        data-resume-section-heading-wrap
        className="flex-w flex break-inside-avoid flex-col space-y-1 text-base"
      >
        <h1
          data-resume-section-heading
          className="text-wrap text-[0.8em] font-semibold"
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
