"use client";

import { create } from "zustand";
import { resumeCategories, type ResumeCategory } from "@/components/ResumeStyles/Styles";

interface StyleAsideState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useStyleAsideState = create<StyleAsideState>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open });
  },
}));

interface ResumeTemplateCategoryState {
  selectedCategory: ResumeCategory;
  setSelectedCategory: (category: ResumeCategory) => void;
}

export const useResumeTemplateCategoryState =
  create<ResumeTemplateCategoryState>((set) => ({
    selectedCategory: resumeCategories[0],
    setSelectedCategory: (category) => set({ selectedCategory: category }),
  }));
