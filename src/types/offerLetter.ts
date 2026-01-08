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
    employmentType: "full-time" | "part-time" | "internship";
    workLocation: "remote" | "onsite" | "hybrid";
    startDate: string;
    reportingTo?: string;
  };

  compensation: {
    baseSalary: number;
    salaryFrequency: "monthly" | "annual";
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

// Placeholder design contract for future customization; kept generic for Phase 1
export type OfferLetterDesign = Record<string, unknown>;

export const emptyOfferLetterValues: OfferLetterValues = {
  company: { name: "" },
  candidate: { fullName: "", email: "" },
  job: {
    title: "",
    employmentType: "full-time",
    workLocation: "onsite",
    startDate: "",
  },
  compensation: {
    baseSalary: 0,
    salaryFrequency: "annual",
  },
  legality: {},
  closingSignature: { name: "" },
};
