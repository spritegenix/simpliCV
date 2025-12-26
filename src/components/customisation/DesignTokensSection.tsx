import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type DensityPreset = "compact" | "normal" | "relaxed";

interface DesignTokensSectionProps {
  headingScale: number;
  setHeadingScale: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
}

export default function DesignTokensSection({
  headingScale,
  setHeadingScale,
  borderWidth,
  setBorderWidth,
}: DesignTokensSectionProps) {
  // Props kept for backward compatibility but not rendered
  // The actual values are still used internally by the system
  return null;
}
