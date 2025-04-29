"use server";

import { canCreateResume, canUseCustomizations } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
// import { del, put } from "@vercel/blob";
// import { uploadToS3, deleteFromS3 } from "@/lib/s3"; 
import { deleteFromS3 } from "@/lib/s3";
// import path from "path";



export async function saveResume(values: ResumeValues) {
  const { id } = values;

  // console.log("received values", values);

  const { photo, workExperiences, educations, certifications, others, projectWorks, skills, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error("Maximum resume count reached for this subscription level");
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations =
    (resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex);

  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error("Customizations not allowed for this subscription level");
  }

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

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        certifications: {
          deleteMany: {},
          create: certifications?.map((cert) => ({
            ...cert,
          })),
        },
        skills: {
          deleteMany: {},
          create: skills?.map((skill) => ({
            ...skill,
          })),
        },
        projectWorks: {
          deleteMany: {},
          create: projectWorks?.map((project) => ({
            ...project,
            startDate: project.startDate ? new Date(project.startDate) : undefined,
            endDate: project.endDate ? new Date(project.endDate) : undefined,
          })),
        },
        others: others ? {
          upsert: {
            update: { ...others },
            create: { ...others },
          },
        } : undefined,
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        certifications: {
          create: certifications?.map((cert) => ({
            ...cert,
          })),
        },
        skills: {
          create: skills?.map((skill) => ({
            ...skill,
          })),
        },
        projectWorks: {
          create: projectWorks?.map((project) => ({
            ...project,
            startDate: project.startDate ? new Date(project.startDate) : undefined,
            endDate: project.endDate ? new Date(project.endDate) : undefined,
          })),
        },
        others: {
          create: others || undefined
        },
      },
    });
  }
}
