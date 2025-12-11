
import { ComponentType } from "react";
import { StaticImageData } from "next/image";
import { ResumeValues } from "@/lib/validation";


import {
    Ats1, Ats2, Ats3, Ats4, Ats5, Ats6, Ats7, Ats8, Ats9, Ats10, Ats12, Ats13, Ats14, Ats15, Ats16,
    Stylish1,
    Modern1, Modern2, Modern3, Modern4, Modern5, Modern6, Modern7, Modern8, Modern9,
    Stylish2,
    Stylish3
} from "./index";
import { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a12, a13, a14, a15, a16, st1, m1, m2, st2, m3, st3, m4, m5, m6, m7, m8, m9 } from "@/assets/resume-styles";

interface ResumePreviewProps {
    resumeData: ResumeValues;
    className?: string;
}

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
    component: ComponentType<ResumePreviewProps>;
    desc?: string;
    samplePic?: StaticImageData; // Assuming it's a URL string. If using next/image, use `StaticImageData`
    category?: (ResumeCategory)[];
    tags?: ResumeTag[];
    price?: string;
    priority: number;
}

const Ats: ResumeStyle[] = [
    {
        id: "ats1",
        name: "ATS Friendly Resume",
        component: Ats1,
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: a1,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 1
    },
    {
        id: "ats2",
        name: "Classic monochrome resume template for executives",
        component: Ats2,
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
        component: Ats3,
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
        component: Ats4,
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
        component: Ats5,
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
        component: Ats6,
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
        component: Ats7,
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
        component: Ats8,
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
        component: Ats9,
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
        component: Ats10,
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
        component: Ats12,
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
        component: Ats13,
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
        component: Ats14,
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
        component: Ats15,
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
        component: Ats16,
        desc: "A prestigious, high-impact design featuring uppercase headers and bold typography. Ideal for experienced professionals and academics.",
        samplePic: a16,
        category: ["All", "ATS Friendly"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 16
    },

]
const Creative: ResumeStyle[] = []

const Modern: ResumeStyle[] = [
    {
        id: "modern1",
        name: "Modern Resume",
        component: Modern1,
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
        component: Modern2,
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
        component: Modern3,
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
        component: Modern4,
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
        component: Modern5,
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
        component: Modern6,
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
        component: Modern7,
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
        component: Modern8,
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
        component: Modern9,
        desc: "Bold two-column layout with red accent labels, circular profile image, and subtle grey sidebar.",
        samplePic: m9,
        category: ["All", "Modern"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 20,
    },
]
const Simple: ResumeStyle[] = []
const Stylish: ResumeStyle[] = [
    {
        id: "stylish1",
        name: "Stylish Resume",
        component: Stylish1,
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
        component: Stylish2,
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
        component: Stylish3,
        desc: "Highly ATS Friendly Resume. You can make add or remove your profile photo.",
        samplePic: st3,
        category: ["All", "ATS Friendly", "Stylish"],
        tags: ["Multi Page"],
        price: "FREE",
        priority: 13,
    },
]


// -------------------------------------------- //

export const resumeStyles: ResumeStyle[] = [
    ...Ats,
    ...Creative,
    ...Modern,
    ...Simple,
    ...Stylish,
]