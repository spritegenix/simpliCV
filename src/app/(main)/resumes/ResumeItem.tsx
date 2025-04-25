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
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import {
  ExternalLink,
  MoreVertical,
  Printer,
  Share2,
  Trash2,
} from "lucide-react";
import { useState, useTransition } from "react";
// import { useReactToPrint } from "react-to-print";
import { deleteResume } from "./actions";
import { Link } from "next-view-transitions";
import { usePrintPdf } from "@/hooks/usePrintPdf";
import { RWebShare } from "react-web-share";
import { env } from "@/env";
import { resumeStyles } from "@/components/ResumeStyles/Styles";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const { handlePrintPdf } = usePrintPdf();
  const currentStyleId = resume.styleId || "pankaj-prajapat";

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  const ResumeStylePreview = resumeStyles.find(
    (style) => style.id === currentStyleId,
  )?.component;

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-all duration-300 hover:border-border hover:bg-w1">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}&styleId=${resume.styleId}`}
          className="inline-block w-full cursor-pointer text-center"
        >
          <p className="line-clamp-1 cursor-pointer font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 font-rubik cursor-pointer text-sm">
              {resume.description}
            </p>
          )}
          <p className="text-xs font-rubik text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <div className="relative inline-block w-full">
          {ResumeStylePreview ? (
            <ResumeStylePreview
              resumeData={mapToResumeValues(resume)}
              className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
            />
          ) : (
            <p>Corrupt File</p>
          )}
          <Link
            href={`/editor?resumeId=${resume.id}&styleId=${resume.styleId}`}
            className="absolute inset-0"
          />
        </div>
      </div>
      <MoreMenu
        resumeId={resume.id}
        resumeData={resume}
        onPrintClick={() => handlePrintPdf(`${env.NEXT_PUBLIC_BASE_URL}/resume/${resume.id}?&styleId=${resume.styleId}`)}
      />
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
  resumeData: ResumeServerData;
}

function MoreMenu({ resumeId, resumeData, onPrintClick }: MoreMenuProps) {
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
          <DropdownMenuItem asChild>
            <Link
              href={resumeData.id ? `/resume/${resumeData.id}?&styleId=${resumeData.styleId}` : "#"}
              target="_blank"
              className="flex items-center gap-2"
            >
              <ExternalLink className="size-4" />
              Full Screen View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <RWebShare
              data={{
                title: `${resumeData.firstName} ${resumeData.lastName}'s Resume`,
                text: "Check out my resume!",
                url: `${env.NEXT_PUBLIC_BASE_URL}/resume/${resumeData.id}`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <div className="flex cursor-pointer items-center gap-2">
                <Share2 className="size-4" />
                Share
              </div>
            </RWebShare>
          </DropdownMenuItem>
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
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
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
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            Are You Sure You Want To Delete This Resume? This action cannot be
            undone.
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
