"use server";

import { canCreateResume, canUseCustomizations } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { safeResumeCount } from "@/lib/dbSafe";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
// import { del, put } from "@vercel/blob";
// import { uploadToS3, deleteFromS3 } from "@/lib/s3";
import { deleteFromS3 } from "@/lib/s3";
// import path from "path";

import { ResumeDesign } from "@/types/resumeDesign";

/**
 * Remove null bytes from strings to prevent PostgreSQL UTF8 encoding errors
 * Also handles other invalid characters that might cause encoding issues
 */
function sanitizeString(value: string): string {
  // Remove null bytes and other control characters except newline, tab, and carriage return
  return value.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, '');
}

/**
 * Deeply sanitize an object by removing null bytes from all strings
 * and pruning undefined values
 */
function deepSanitizeAndPrune<T>(value: T): T {
  if (value === undefined || value === null) return value;

  // Handle strings - sanitize them
  if (typeof value === "string") {
    return sanitizeString(value) as T;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value
      .map((item) => deepSanitizeAndPrune(item))
      .filter((item) => item !== undefined) as T;
  }

  // Handle objects (but preserve special types like Date)
  if (typeof value === "object") {
    // Preserve Date objects as-is
    if (value instanceof Date) return value;

    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as any)) {
      const sanitized = deepSanitizeAndPrune(nested);
      if (sanitized !== undefined) {
        result[key] = sanitized;
      }
    }
    return result as T;
  }

  // Return primitives as-is (numbers, booleans, etc.)
  return value;
}

// Keep the old function name for backward compatibility with design sanitization
function pruneUndefinedDeep<T>(value: T): T {
  return deepSanitizeAndPrune(value);
}

export async function saveResume(values: ResumeValues, design?: ResumeDesign) {
  const { id } = values;

  // console.log("received values", values);

  const {
    photo,
    workExperiences,
    educations,
    certifications,
    others,
    projectWorks,
    skills,
    ...resumeValues
  } = resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await safeResumeCount(userId);

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level",
      );
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== existingResume?.colorHex);

  // TODO: Re-enable when premium subscription is implemented
  // if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
  //   throw new Error("Customizations not allowed for this subscription level");
  // }

  let newPhotoUrl: string | undefined | null = undefined;

  // Old S3 Code Upload
  // if (photo instanceof File) {
  //   if (existingResume?.photoUrl) {
  //     // await del(existingResume.photoUrl);
  //     const urlParts = new URL(existingResume.photoUrl);
  //     const key = urlParts.pathname.substring(1);
  //     await deleteFromS3(key);
  //   }

  //   // const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
  //   //   access: "public",
  //   // });

  //   // newPhotoUrl = blob.url;
  //   const fileExtension = path.extname(photo.name);
  //   const key = `resume_photos/${userId}_${Date.now()}${fileExtension}`;
  //   const arrayBuffer = await photo.arrayBuffer();
  //   const buffer = Buffer.from(arrayBuffer);

  //   // Upload to S3 with the content type from the File object
  //   const newUrl = await uploadToS3(buffer, key, photo.type);
  //   newPhotoUrl = newUrl;
  // } else if (photo === null) {
  //   if (existingResume?.photoUrl) {
  //     //-------> Vercel Bolb
  //     // await del(existingResume.photoUrl);
  //     //---------> S3
  //     const urlParts = new URL(existingResume.photoUrl);
  //     const key = urlParts.pathname.substring(1); // Remove leading slash
  //     await deleteFromS3(key);
  //   }
  //   newPhotoUrl = null;
  // }

  // New improved S3 code
  if (typeof photo === "string") {
    // 🛠️ Updated: Photo is already uploaded via presigned URL, save the URL
    newPhotoUrl = photo;
  } else if (photo === null) {
    // 🛠️ Updated: If photo is null (user deleted), delete from S3
    if (existingResume?.photoUrl) {
      const urlParts = new URL(existingResume.photoUrl);
      const rawKey = urlParts.pathname.substring(1); // Removes leading "/"
      const key = decodeURIComponent(rawKey); // ✅ Decode to get correct S3 key

      // console.log("S3 Pathname:", urlParts.pathname);           // e.g., "/resume_photos%2Fabc.webp"
      // console.log("Raw Key:", rawKey);                           // e.g., "resume_photos%2Fabc.webp"
      // console.log("Decoded S3 Key:", key);                       // ✅ e.g., "resume_photos/abc.webp"

      const deleted = await deleteFromS3(key);
      console.log("Deleting S3 key result:", deleted);

      existingResume.photoUrl = null;
    }
    newPhotoUrl = null;
  }

  const { dateFormat: _dateFormat, ...resumeValuesWithoutDateFormat } =
    resumeValues;

  // Sanitize ALL resume values to remove null bytes and undefined values
  // pruneUndefinedDeep now also sanitizes all strings recursively
  const sanitizedResumeValues = pruneUndefinedDeep({
    ...resumeValuesWithoutDateFormat,
    colorHex: resumeValues.colorHex || undefined, // Required in DB, default provided by DB if undefined, but if null we must use undefined
    borderStyle: resumeValues.borderStyle || undefined,
    // For other optional string fields that might be null from Zod, ensure they are compatible
    title: resumeValues.title || undefined,
    description: resumeValues.description || undefined,
    summary: resumeValues.summary || undefined,
    firstName: resumeValues.firstName || undefined,
    lastName: resumeValues.lastName || undefined,
    jobTitle: resumeValues.jobTitle || undefined,
    city: resumeValues.city || undefined,
    country: resumeValues.country || undefined,
    phone: resumeValues.phone || undefined,
    email: resumeValues.email || undefined,
    portfolioLink: resumeValues.portfolioLink || undefined,
    styleId: resumeValues.styleId || undefined,
    baseFontSize: resumeValues.baseFontSize || undefined,
    // Persist full design only when provided (and scrub undefineds for Prisma JSON).
    design: design ? pruneUndefinedDeep(design) : undefined,
  });

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...sanitizedResumeValues,
        photoUrl: newPhotoUrl ? sanitizeString(newPhotoUrl) : newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => deepSanitizeAndPrune({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => deepSanitizeAndPrune({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        certifications: {
          deleteMany: {},
          create: certifications?.map((cert) => deepSanitizeAndPrune({
            ...cert,
          })),
        },
        skills: {
          deleteMany: {},
          create: skills?.map((skill) => deepSanitizeAndPrune({
            ...skill,
          })),
        },
        projectWorks: {
          deleteMany: {},
          create: projectWorks?.map((project) => deepSanitizeAndPrune({
            ...project,
            startDate: project.startDate
              ? new Date(project.startDate)
              : undefined,
            endDate: project.endDate ? new Date(project.endDate) : undefined,
          })),
        },
        others: others
          ? {
            upsert: {
              update: deepSanitizeAndPrune({ ...others }),
              create: deepSanitizeAndPrune({ ...others }),
            },
          }
          : undefined,
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...sanitizedResumeValues,
        userId,
        photoUrl: newPhotoUrl ? sanitizeString(newPhotoUrl) : newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => deepSanitizeAndPrune({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => deepSanitizeAndPrune({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        certifications: {
          create: certifications?.map((cert) => deepSanitizeAndPrune({
            ...cert,
          })),
        },
        skills: {
          create: skills?.map((skill) => deepSanitizeAndPrune({
            ...skill,
          })),
        },
        projectWorks: {
          create: projectWorks?.map((project) => deepSanitizeAndPrune({
            ...project,
            startDate: project.startDate
              ? new Date(project.startDate)
              : undefined,
            endDate: project.endDate ? new Date(project.endDate) : undefined,
          })),
        },
        others: {
          create: others ? deepSanitizeAndPrune(others) : undefined,
        },
      },
    });
  }
}
