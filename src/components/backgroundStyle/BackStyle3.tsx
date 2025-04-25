import React, { ReactNode, ElementType } from "react";
import Wrapper from "../Wrappers";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: ReactNode;
  as?: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  className?: string,
}

export default function BackStyle3({
  as: Component = "section",
  children,
  className,
}: WrapperProps) {
  return (
    <Component className="relative flex w-full items-center justify-center bg-w3 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:80px_80px]",
          "[background-image:linear-gradient(to_right,#13bcc933_1px,transparent_1px),linear-gradient(to_bottom,#13bcc933_1px,transparent_1px)]",
        )}
      />
      <div className="absolute w-[375.74px] h-[630.89px] right-2 top-2 bg-[#13BCC9] opacity-80 blur-[150px] rotate-[-50.1deg]"></div>
      <div className="absolute w-[375.74px] h-[630.89px] left-2 bottom-2 bg-[#13BCC9] opacity-80 blur-[150px] rotate-[-50.1deg]"></div>
      {/* <Image src={t1} width={500} height={500} alt={"texture"} className="absolute top-0 right-0 w-1/2" /> */}
      <Wrapper className={cn("relative", className)} isTop2>
        {children}
      </Wrapper>
    </Component>
  );
}
