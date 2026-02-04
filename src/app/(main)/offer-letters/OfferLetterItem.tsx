"use client";

import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";
import { toOfferLetterDocument } from "@/lib/offer-letter/transformers";
import { formatDate } from "date-fns";
import { MoreVertical, Trash2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import OfferLetterContent from "./editor/OfferLetterContent";
import { deleteOfferLetter } from "./actions";
import { OfferStatus } from "@prisma/client";

interface OfferLetterListItem {
  id: string;
  status: OfferStatus;
  content: any;
  design: any;
  styleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface OfferLetterItemProps {
  offerLetter: OfferLetterListItem;
}

export default function OfferLetterItem({ offerLetter }: OfferLetterItemProps) {
  const wasUpdated = offerLetter.updatedAt !== offerLetter.createdAt;

  const document: OfferLetterDocument = useMemo(() => {
    return toOfferLetterDocument({
      content: offerLetter.content,
      design: offerLetter.design,
      styleId: offerLetter.styleId ?? undefined,
    });
  }, [offerLetter.content, offerLetter.design, offerLetter.styleId]);

  const title =
    document.content.candidate.fullName?.trim() ||
    document.content.company.name?.trim() ||
    "Untitled offer letter";

  const subtitle =
    document.content.company.name?.trim() &&
    document.content.candidate.fullName?.trim()
      ? document.content.company.name
      : undefined;

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-0 transition-all duration-300 hover:border-border hover:bg-w1">
      <div className="space-y-3">
        <Link
          href={`/offer-letters/editor?offerId=${offerLetter.id}`}
          className="inline-block w-full cursor-pointer text-center"
        >
          <p className="line-clamp-1 cursor-pointer font-semibold">{title}</p>
          {subtitle && (
            <p className="line-clamp-1 cursor-pointer font-rubik text-sm">
              {subtitle}
            </p>
          )}
          <p className="font-rubik text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(offerLetter.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>

        <div className="relative inline-block w-full">
          <div className="relative aspect-[1/1.414] w-full overflow-hidden rounded-md bg-white shadow-sm transition-shadow group-hover:shadow-lg">
            <div
              className="origin-top-left"
              style={{
                transform: "scale(0.35)",
                width: "285.714%",
              }}
            >
              <OfferLetterContent document={document} />
            </div>
            <Link
              href={`/offer-letters/editor?offerId=${offerLetter.id}`}
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      <MoreMenu offerId={offerLetter.id} />
    </div>
  );
}

function MoreMenu({ offerId }: { offerId: string }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmationDialog
        offerId={offerId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

function DeleteConfirmationDialog({
  offerId,
  open,
  onOpenChange,
}: {
  offerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteOfferLetter(offerId);
        onOpenChange(false);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete offer letter?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this offer letter? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
