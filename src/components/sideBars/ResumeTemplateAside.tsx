"use client";
import {
  useResumeTemplateCategoryState,
  useStyleAsideState,
} from "@/app/(main)/editor/styleAsideState";
import React from "react";
import { Sidebar } from "./SideBar";
import {
  resumeCategories,
  ResumeCategory,
  resumeStyles,
} from "../ResumeStyles/Styles";
import { Card } from "@/app/(resumeSample)/templates/TemplateCard";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleX, Loader2 } from "lucide-react";
import TabsScroll from "../TabsScroll";
import { ResumeDocument } from "@/types/resumeDocument";

interface ResumeTemplateAsideProps {
  resumeData: ResumeDocument;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeDocument>>;
  isSaving: boolean;
}

export default function ResumeTemplateAside({
  resumeData,
  setResumeData,
  isSaving,
}: ResumeTemplateAsideProps) {
  const { open, setOpen } = useStyleAsideState();
  const { selectedCategory, setSelectedCategory } =
    useResumeTemplateCategoryState();
  const router = useRouter();
  const searchParams = useSearchParams();
  async function handleSelectResumeTemplate(styleId: string) {
    setResumeData((prev) => {
      if (styleId === "ats1") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: undefined,
              },
            },
          },
        };
      }

      if (styleId === "ats2") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Lora",
              },
            },
          },
        };
      }

      if (styleId === "ats3") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: undefined,
              },
            },
          },
        };
      }

      if (styleId === "ats4") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Libre Baskerville",
              },
            },
          },
        };
      }

      if (styleId === "ats5") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: "Open Sans",
              },
            },
          },
        };
      }

      if (styleId === "ats6") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: "Open Sans",
              },
            },
          },
        };
      }

      if (styleId === "ats7") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Source Serif 4",
              },
            },
          },
        };
      }

      if (styleId === "ats8") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: undefined,
              },
            },
          },
        };
      }

      if (styleId === "ats9") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: undefined,
              },
            },
          },
        };
      }

      if (styleId === "ats10") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Source Serif 4",
              },
            },
          },
        };
      }

      if (styleId === "ats12") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Libre Baskerville",
              },
            },
          },
        };
      }

      if (styleId === "ats13") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: undefined,
              },
            },
          },
        };
      }

      if (styleId === "ats14") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "inter",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "sans",
                selectedFont: undefined,
              },
            },
          },
        };
      }

      if (styleId === "ats15") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Libre Baskerville",
              },
            },
          },
        };
      }

      if (styleId === "ats16") {
        return {
          ...prev,
          styleId,
          design: {
            ...prev.design,
            typography: {
              ...prev.design.typography,
              fontFamily: "serif",
            },
            customization: {
              ...prev.design.customization,
              font: {
                ...prev.design.customization?.font,
                category: "serif",
                selectedFont: "Libre Baskerville",
              },
            },
          },
        };
      }

      return { ...prev, styleId };
    });
    // Update styleId in URL without losing other query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("styleId", styleId);
    router.replace(`/editor?${params.toString()}`);
  }
  return (
    <Sidebar
      isOpen={open}
      onClose={() => setOpen(false)}
      className="bg-w3/80 p-4 md:w-[26rem]"
    >
      <button
        className="float-right text-white transition-all duration-300 hover:text-red-600"
        onClick={() => setOpen(false)}
      >
        <CircleX />
      </button>
      <h2 className="mb-4 text-center text-lg font-medium text-white">
        Change Resume Style
      </h2>
      {/* tabs  */}
      <TabsScroll
        className="my-4 gap-x-2"
        NavigationButtonClassName="bg-w3 text-white"
      >
        {resumeCategories.map((category, index) => (
          <Tabs
            key={index}
            onClick={() => setSelectedCategory(category)}
            isActive={selectedCategory === category}
          >
            {category}
          </Tabs>
        ))}
      </TabsScroll>
      {/* Search  */}
      {/* Templates  */}
      <div className="grid grid-cols-2 items-start gap-4 overflow-y-auto md:h-[calc(100vh-7.2rem)]">
        {resumeStyles
          .filter((style) => style.category?.includes(selectedCategory))
          .map((style) => (
            <div
              key={style.id}
              className={cn(
                "relative cursor-pointer",
                style.id === resumeData.styleId &&
                  "h-min border-4 border-w1 p-1",
              )}
              onClick={() => handleSelectResumeTemplate(style.id)}
            >
              {isSaving && style.id === resumeData.styleId && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-w3/50">
                  <Loader2 className="size-5 animate-spin" />
                </div>
              )}
              <Card style={style} isOnEditPage isSaving={isSaving} />
            </div>
          ))}
      </div>
    </Sidebar>
  );
}

function Tabs({
  children,
  onClick,
  isActive,
}: {
  children: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "cursor-pointer text-nowrap rounded-lg bg-w1 p-1 px-2 text-w3",
        isActive && "border-2 border-w1 bg-w3 text-white",
      )}
    >
      {children}
    </li>
  );
}
