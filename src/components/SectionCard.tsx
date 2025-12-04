import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

export default function SectionCard({
  title,
  description,
  icon: Icon,
  onClick,
  isActive,
}: SectionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer flex-col gap-3 rounded-lg border p-4 transition-all hover:bg-accent hover:text-accent-foreground",
        isActive && "border-primary bg-accent text-accent-foreground"
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
