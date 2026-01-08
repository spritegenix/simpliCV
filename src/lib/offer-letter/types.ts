export const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "internship",
] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const WORK_LOCATIONS = ["remote", "onsite", "hybrid"] as const;

export type WorkLocation = (typeof WORK_LOCATIONS)[number];

export const SALARY_FREQUENCIES = ["monthly", "annual"] as const;

export type SalaryFrequency = (typeof SALARY_FREQUENCIES)[number];

export interface OfferLetterValues {
  company: {
    name: string;
    logoUrl?: string;
    hiringManagerTitle?: string;
    email?: string;
    phone?: string;
    website?: string;
  };

  candidate: {
    fullName: string;
    email: string;
  };

  job: {
    title: string;
    department?: string;
    employmentType: EmploymentType;
    workLocation: WorkLocation;
    startDate: string;
    reportingTo?: string;
  };

  compensation: {
    baseSalary: number;
    salaryFrequency: SalaryFrequency;
    benefits?: string;
    incentives?: string;
  };

  legality: {
    offerValidUntil?: string;
  };

  closingSignature: {
    signOff?: string;
    name: string;
    title?: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
}
