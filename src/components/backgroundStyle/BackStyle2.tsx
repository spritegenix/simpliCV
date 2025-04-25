import React, { ReactNode, ElementType } from "react";
import bgGradient1 from "@/assets/bg-gradient1.svg";
import Image from "next/image";
import Wrapper from "../Wrappers";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: ReactNode;
  as?: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  className?: string;
}

export default function BackStyle2({
  as: Component = "section",
  children,
  className,
}: WrapperProps) {
  return (
    <Component className="relative">
      <Image
        src={bgGradient1}
        alt="bg-gradient"
        width={1600}
        height={1600}
        className="fixed inset-x-0 bottom-0 -z-10 w-full"
      />
      <Wrapper className={cn("relative", className)} isTop2>
        {children}
      </Wrapper>
    </Component>
  );
}
