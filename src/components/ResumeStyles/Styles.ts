import { StaticImageData } from "next/image";
import {
  a1,
  a10,
  a12,
  a13,
  a14,
  a15,
  a16,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  m1,
  m2,
  m3,
  m4,
  m5,
  m6,
  m7,
  m8,
  m9,
  st1,
  st2,
  st3,
} from "@/assets/resume-styles";

export const resumeCategories = [
    "All",
    "ATS Friendly",
    "Creative",
    "Stylish",
    "Simple",
    "Modern",
] as const;

export type ResumeCategory = (typeof resumeCategories)[number];

export const resumeTags = [
    "Single Page",
    "Multi Page",
] as const;

export type ResumeTag = (typeof resumeTags)[number];

export interface ResumeStyle {
    id: string;
    name?: string;
    desc?: string;
    samplePic?: StaticImageData; // Assuming it's a URL string. If using next/image, use `StaticImageData`
    category?: (ResumeCategory)[];
    tags?: ResumeTag[];
    price?: string;
    priority: number;
}

export const resumeStyles: ResumeStyle[] = [
    {
        id: "ats1",
        name: "ATS Friendly Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a1,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 1,
    },
    {
        id: "ats2",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a2,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 2
    },
    {
        id: "ats3",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a3,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 3
    },
    {
        id: "ats4",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a4,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 4
    },
    {
        id: "ats5",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a5,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 5
    },
    {
        id: "ats6",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a6,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 6
    },
    {
        id: "ats7",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a7,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 7
    },
    {
        id: "ats8",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a8,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 8
    },
    {
        id: "ats9",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a9,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 9
    },
    {
        id: "ats10",
        name: "Classic monochrome resume template for executives",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a10,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 10
    },

    {
        id: "ats12",
        name: "Modern Clean ATS Resume",
        desc: "A clean, modern ATS-friendly design with elegant typography and structured sections.",
        samplePic: a12,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 12
    },
    {
        id: "ats13",
        name: "Minimalist Tech Resume",
        desc: "A minimalist, sans-serif template ideal for technical roles, featuring clean lines and ample whitespace.",
        samplePic: a13,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 13
    },
    {
        id: "ats14",
        name: "Corporate Banded Resume",
        desc: "A professional design featuring distinct section bands for superior readability and structure.",
        samplePic: a14,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 14
    },
    {
        id: "ats15",
        name: "Classic Elegant Resume",
        desc: "A timeless, serif-font design with a centered header and clean horizontal dividers. Perfect for executive or academic roles.",
        samplePic: a15,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 15
    },
    {
        id: "ats16",
        name: "Executive Academic Resume",
        desc: "A prestigious, high-impact design featuring uppercase headers and bold typography. Ideal for experienced professionals and academics.",
        samplePic: a16,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 16
    },

    // Modern
    {
        id: "modern1",
        name: "Modern Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: m1,
        category: ["All", "ATS Friendly", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 12,
    },
    {
        id: "modern2",
        name: "Modern Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: m2,
        category: ["All", "ATS Friendly", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 13,
    },
    {
        id: "modern3",
        name: "Professional Modern CV Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: m3,
        category: ["All", "ATS Friendly", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 14,
    },
    {
        id: "modern4",
        name: "Sleek Modern Resume",
        desc: "A clean and modern resume design with a sidebar for skills and contact info.",
        samplePic: m4,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 15,
    },
    {
        id: "modern5",
        name: "Timeline Modern Resume",
        desc: "A unique 3-column timeline layout with full-width header.",
        samplePic: m5,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 16,
    },
    {
        id: "modern6",
        name: "Geometric Modern Resume",
        desc: "A bold two-column design with a geometric header and clean typography.",
        samplePic: m6,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 17,
    },
    {
        id: "modern7",
        name: "Gradient Header Resume",
        desc: "Professional two-column layout with a purple gradient header and Montserrat typography.",
        samplePic: m7,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 18,
    },
    {
        id: "modern8",
        name: "Teal Accent Resume",
        desc: "Two-column design with distinct teal accent bars, rounded name block, and pro skills bars.",
        samplePic: m8,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 19,
    },
    {
        id: "modern9",
        name: "Red & Grey Modern",
        desc: "Bold two-column layout with red accent labels, circular profile image, and subtle grey sidebar.",
        samplePic: m9,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 20,
    },
    // Stylish
    {
        id: "stylish1",
        name: "Stylish Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: st1,
        category: ["All", "Stylish"],
        tags: ["Single Page"],
        price: "FREE",
        priority: 11
    },
    {
        id: "stylish2",
        name: "Modern Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: st2,
        category: ["All", "ATS Friendly", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 12,
    },
    {
        id: "stylish3",
        name: "stylish Resume",
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: st3,
        category: ["All", "ATS Friendly", "Stylish"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 13,
    },
];