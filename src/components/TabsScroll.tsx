"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function TabsScroll({
  children,
  className,
  NavigationButtonClassName,
}: {
  children: React.ReactNode;
  className?: string;
  NavigationButtonClassName?: string;
}) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative w-full">
      <ul
        className={cn("no-scrollbar flex gap-x-5 overflow-x-auto", className)}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {children}
      </ul>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      {showLeftButton && (
        <button
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2  text-3xl text-white transform rounded-full bg-zinc-500 p-1 opacity-70 hover:opacity-100",
            NavigationButtonClassName,
          )}
          onClick={handleScrollLeft}
        >
          <ChevronLeft  />
        </button>
      )}
      {showRightButton && (
        <button
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-white transform rounded-full bg-zinc-500 p-1 opacity-70 hover:opacity-100",
            NavigationButtonClassName,
          )}
          onClick={handleScrollRight}
        >
          <ChevronRight  />
        </button>
      )}
    </nav>
  );
}
