import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified,
    }
    : value;
}

// Use Cases 
// 1. Detecting file changes in React state
// useEffect(() => {
//   // run effect only if file actually changed
// }, [JSON.stringify(file, fileReplacer)]);

// 2. Comparing files by metadata 
// JSON.stringify(file1, fileReplacer) === JSON.stringify(file2, fileReplacer) // true if metadata matches

// 3.Logging or debugging File objects 
// console.log(JSON.stringify(file)) // "{}"
// console.log(JSON.stringify(file, fileReplacer)) // {"name":"avatar.png","size":34567,"type":"image/png","lastModified":1712222222222}

// 4. Storing file metadata (not contents)
// localStorage.setItem("fileMeta", JSON.stringify(file, fileReplacer)); 

// 5. To avoid re-uploading the same file:
// if (JSON.stringify(old.photo, fileReplacer) === JSON.stringify(new.photo, fileReplacer)) {
//   payload.photo = undefined; // no need to update it
// }

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    socialLinks: data.socialLinks || undefined,
    portfolioLink: data.portfolioLink || undefined,
    styleId: data.styleId || "1",
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      jobLocation: exp.jobLocation || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      location: edu.location || undefined,
      marks: edu.marks || undefined,
      stream: edu.stream || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
      description: edu.description || undefined,
    })),
    projectWorks: data.projectWorks?.map((proj) => ({
      company: proj.company || undefined,
      title: proj.title || undefined,
      startDate: proj.startDate?.toISOString().split("T")[0],
      endDate: proj.endDate?.toISOString().split("T")[0],
      description: proj.description || undefined,
      links: proj.links || undefined,
    })),
    certifications: data.certifications?.map((cert) => ({
      title: cert.title || undefined,
      description: cert.description || undefined,
      link: cert.link || undefined,
    })),
    skills: data.skills?.map((skill) => ({
      title: skill.title || undefined,
      skillName: skill.skillName || undefined,
    })),
    others: data.others
      ? {
        title: data.others.title || undefined,
        description: data.others.description || undefined,
      }
      : undefined,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    baseFontSize: data.baseFontSize,
    summary: data.summary || undefined,
  };
};