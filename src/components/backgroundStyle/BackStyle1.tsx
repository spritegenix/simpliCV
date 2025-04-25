import React, { ReactNode, ElementType } from "react";
import bgGradient from "@/assets/bg-gradient.svg";
import Image from "next/image";
import Wrapper from "../Wrappers";
import vector1 from "@/assets/Group 34.svg";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: ReactNode;
  as?: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  className?: string,
}

export default function BackStyle1({
  as: Component = "section",
  children,
  className,
}: WrapperProps) {
  return (
    <Component className="relative">
      <Image
        src={bgGradient}
        alt="bg-gradient"
        width={150}
        height={150}
        className="absolute inset-x-0 top-0 -z-10 w-full"
      />
      <Wrapper className={cn("relative", className)} isTop2>
        <Image
          src={vector1}
          alt="vector-image"
          width={150}
          height={150}
          className="absolute bottom-0 right-16 -z-10"
        />
        {children}
      </Wrapper>
    </Component>
  );
}
