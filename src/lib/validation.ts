import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const optionalStringArray = z.array(z.string().trim()).optional();

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
  socialLinks: optionalStringArray,
  portfolioLink: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        jobLocation: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        location: optionalString,
        marks: optionalString,
        stream: optionalString,
        description: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const projectWorkSchema = z.object({
  projectWorks: z
    .array(
      z.object({
        company: optionalString,
        title: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
        links: optionalStringArray,
      }),
    )
    .optional(),
});

export type ProjectWorkValues = z.infer<typeof projectWorkSchema>;

export type ProjectWork = NonNullable<
  z.infer<typeof projectWorkSchema>["projectWorks"]
>[number];

export const certificationSchema = z.object({
  certifications: z
    .array(
      z.object({
        title: optionalString,
        description: optionalString,
        link: optionalString,
      }),
    )
    .optional(),
});

export type CertificationValues = z.infer<typeof certificationSchema>;

export const otherSchema = z.object({
  others: z
    .object({
      title: optionalString,
      description: optionalString,
    })
    .optional(),
});

export type OtherValues = z.infer<typeof otherSchema>;

export const skillsSchema = z.object({
  skills: z
    .array(
      z.object({
        title: optionalString,
        skillName: optionalStringArray,
      }),
    )
    .optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...projectWorkSchema.shape,
  ...certificationSchema.shape,
  ...otherSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
  baseFontSize: z.number().min(10, "Must be at least 10").max(20, "Must be at most 20").optional(),
  styleId: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

export const generateProjectSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateProjectInput = z.infer<typeof generateProjectSchema>;
