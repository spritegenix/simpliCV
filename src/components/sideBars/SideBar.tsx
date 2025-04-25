"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Portal from "../Portal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Sidebar = ({
  isOpen,
  onClose,
  children,
  className,
}: SidebarProps) => {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.aside
              className={cn(
                "fixed left-0 top-0 z-50 h-full w-full bg-white shadow-lg",
                className,
              )}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};


// const [isSidebarOpen, setSidebarOpen] = useState(false)
//  <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>