import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "next-view-transitions";

export default function FullScreenPreviewButton({ href }: { href: string }) {
  const Icon = ExternalLink;
  return (
    <Button asChild variant="outline" size="icon" title="Full Screen View">
      <Link href={href ? href : "#"} target="_blank">
        <Icon className="size-5" />
      </Link>
    </Button>
  );
}
