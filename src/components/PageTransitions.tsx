"use client";
// import { useTransitionRouter } from "next-view-transitions";
import { useEffect } from "react";

// animation for section overlap
export default function PageTransitions() {
//   const router = useTransitionRouter();
  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0.2, transform: "translateY(-35%)" },
      ],
      {
        duration: 150,
        easing: "cubic-bezier(e.87, e, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      },
    );
    document.documentElement.animate(
      [
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }
  useEffect(() => {
    slideInOut();
  }, []);
  return null;
}


// ::view-transition-old(root),
// ::view-transition-new(root) {
//   animation: none !important;
// }
// ::view-transition-group(root) {
//   z-index: auto !important;
// }
// ::view-transition-image-pair(root) {
//   isolation: isolate;
//   will-change: transform, opacity, clip-path;
//   z-index: 1;
// }
// ::view-transition-new(root) {
//   z-index: 10000;
//   animation: none !important;
// }
// ::view-transition-old(root) {
//   z-index: 1;
//   animation: none !important;
// }
