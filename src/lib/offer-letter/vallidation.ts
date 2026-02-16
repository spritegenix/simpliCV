import { z } from "zod";

export const offerLetterSchema = z
  .object({
    company: z.object({
      name: z.string().min(1, "Company name is required"),
      companyLogo: z
        .object({
          type: z.literal("upload"),
          value: z.string().min(1),
        })
        .optional(),
      logoUrl: z.string().url().optional(),
      hiringManagerTitle: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      website: z.string().url().optional(),
    }),

    date: z.string().min(1, "Date is required"),

    candidate: z.object({
      fullName: z.string().min(1, "Candidate name is required"),
      company: z.string().optional(),
      address: z.string().optional(),
    }),

    body: z.string().min(1, "Body content is required"),

    closingSignature: z.object({
      name: z.string().min(1, "Signatory name is required"),
      signatureImage: z
        .object({
          type: z.literal("upload"),
          value: z.string().min(1),
        })
        .optional(),
      signatureUrl: z.string().url().optional(),
      title: z.string().optional(),
      companyName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    }),
  })
  .passthrough();

// Draft schema (Phase 6): allow incomplete values while typing.
// This is used only for auto-save to avoid persisting obviously-invalid payload shapes.
// Do not treat this as final completeness validation.
export const offerLetterDraftSchema = z
  .object({
    company: z
      .object({
        name: z.string().optional(),
        companyLogo: z
          .object({
            type: z.literal("upload"),
            value: z.string(),
          })
          .optional(),
        logoUrl: z.string().url().optional(),
        hiringManagerTitle: z.string().optional(),
        email: z.union([z.string().email(), z.literal("")]).optional(),
        phone: z.string().optional(),
        website: z.string().optional(),
      })
      .partial()
      .optional(),

    date: z.string().optional(),

    candidate: z
      .object({
        fullName: z.string().optional(),
        company: z.string().optional(),
        address: z.string().optional(),
      })
      .partial()
      .optional(),

    body: z.string().optional(),

    closingSignature: z
      .object({
        name: z.string().optional(),
        signatureImage: z
          .object({
            type: z.literal("upload"),
            value: z.string(),
          })
          .optional(),
        signatureUrl: z.string().optional(),
        title: z.string().optional(),
        companyName: z.string().optional(),
        email: z.union([z.string().email(), z.literal("")]).optional(),
        phone: z.string().optional(),
      })
      .partial()
      .optional(),
  })
  .passthrough();
