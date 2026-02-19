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

export type CompanyLogoSource = {
  type: "upload";
  value: string;
};

export type SignatureImageSource = {
  type: "upload";
  value: string;
};

export interface OfferLetterValues {
  company: {
    name: string;
    companyLogo?: CompanyLogoSource;
    logoUrl?: string;
    hiringManagerTitle?: string;
    email?: string;
    phone?: string;
    website?: string;
  };

  date: string;

  candidate: {
    fullName: string;
    company?: string;
    address?: string;
  };

  body: string;

  closingSignature: {
    name: string;
    signatureImage?: SignatureImageSource;
    signatureUrl?: string;
    title?: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
}

/**
 * @deprecated Legacy offer-letter schema (pre company-only refactor).
 * Kept as a reference so old fields are not lost permanently.
 */
export interface DeprecatedOfferLetterValues {
  company: {
    name: string;
    companyLogo?: CompanyLogoSource;
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
