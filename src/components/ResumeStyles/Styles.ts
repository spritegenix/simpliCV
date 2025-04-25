
import { ComponentType } from "react";
import { StaticImageData } from "next/image";
import { ResumeValues } from "@/lib/validation";


import {
    Ats1, Ats2, Ats3, Ats4, Ats5, Ats6, Ats7, Ats8, Ats9, Ats10,
    Stylish1,
    Modern1, Modern2, Modern3,
    Stylish2,
    Stylish3
} from "./index";
import { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, st1, m1, m2, st2, m3, st3 } from "@/assets/resume-styles";

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