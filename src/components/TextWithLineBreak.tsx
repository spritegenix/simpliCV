import { ElementType } from "react";
import { cn } from "@/lib/utils";
import React from "react";

const TextWithLineBreak = ({ children }: { children: string }) => {
  if (!children) return null;

  return (
    <>
      {children?.split("\\n").map((line: string, index: number) => (
        <React.Fragment key={index}>
          {line}
          {index < children?.split("\\n").length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

export default TextWithLineBreak;

export const TextWithoutLineBreak = ({ children }: { children: string }) => {
  if (!children) return null;

  return (
    <>
      {children?.split("\\n").map((line: string, index: number) => (
        <React.Fragment key={index}>
          {line}
          {index < children?.split("\\n").length - 1 && ""}
        </React.Fragment>
      ))}
    </>
  );
};

interface AutoTextLineBreakProps {
  children: string;
  as?: ElementType;
  className?: string;
}

export const AutoTextLineBreak = ({
  children,
  as: Component = "p",
  className,
}: AutoTextLineBreakProps) => {
  return (
    <>
      <Component className={cn("hidden md:block", className)}>
        <TextWithLineBreak>{children}</TextWithLineBreak>
      </Component>
      <Component className={cn("block md:hidden", className)}>
        <TextWithoutLineBreak>{children}</TextWithoutLineBreak>
      </Component>
    </>
  );
};
