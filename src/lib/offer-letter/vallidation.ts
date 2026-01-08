import { z } from "zod"
import {
  EMPLOYMENT_TYPES,
  WORK_LOCATIONS,
  SALARY_FREQUENCIES,
} from "./types"

export const offerLetterSchema = z.object({
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    logoUrl: z.string().url().optional(),
    hiringManagerTitle: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }),

  candidate: z.object({
    fullName: z.string().min(1, "Candidate name is required"),
    email: z.string().email("Invalid candidate email"),
  }),

  job: z.object({
    title: z.string().min(1, "Job title is required"),
    department: z.string().optional(),
    employmentType: z.enum(EMPLOYMENT_TYPES),
    workLocation: z.enum(WORK_LOCATIONS),
    startDate: z.string().min(1, "Start date is required"),
    reportingTo: z.string().optional(),
  }),

  compensation: z.object({
    baseSalary: z.number().nonnegative(),
    salaryFrequency: z.enum(SALARY_FREQUENCIES),
    benefits: z.string().optional(),
    incentives: z.string().optional(),
  }),

  legality: z.object({
    offerValidUntil: z.string().optional(),
  }),

  closingSignature: z.object({
    signOff: z.string().optional(),
    name: z.string().min(1, "Signatory name is required"),
    title: z.string().optional(),
    companyName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
})
