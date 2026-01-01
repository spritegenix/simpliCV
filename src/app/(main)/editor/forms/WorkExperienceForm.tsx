import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
import { MonthYearPicker } from "@/components/ui/month-year-picker";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import GenerateWorkExperienceButton from "./GenerateWorkExperienceButton";
import { RichTextEditor } from "@/components/RichTextEditor";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.content.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        content: {
          ...resumeData.content,
          workExperiences:
            values.workExperiences?.filter((exp) => exp !== undefined) || [],
        },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-sm text-muted-foreground">
          Add as many work experiences as you like.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  id={field.id}
                  key={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  jobLocation: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
  resumeData: EditorFormProps["resumeData"];
  setResumeData: EditorFormProps["setResumeData"];
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
  resumeData,
  setResumeData,
}: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const endDateValue = form.watch(`workExperiences.${index}.endDate`);
  const [isPresent, setIsPresent] = useState<boolean>(() => !endDateValue);
  const lastEndDateRef = useRef<string>(endDateValue || "");

  useEffect(() => {
    if (endDateValue) {
      lastEndDateRef.current = endDateValue;
      // If user picked an end date, it can't be "present".
      if (isPresent) setIsPresent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDateValue]);

  return (
    <div
      className={cn(
        "space-y-3 rounded-md border bg-background p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <div className="flex justify-center">
        <GenerateWorkExperienceButton
          onWorkExperienceGenerated={(exp) =>
            form.setValue(`workExperiences.${index}`, exp)
          }
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Role</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="eg. Software Engineer"
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="ABC Company Pvt. Ltd...."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.jobLocation`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Location</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="City, Country"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <MonthYearPicker
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <MonthYearPicker
                  value={field.value || ""}
                  onChange={field.onChange}
                  disabled={isPresent}
                />
              </FormControl>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  checked={isPresent}
                  onCheckedChange={(checked) => {
                    const next = !!checked;
                    setIsPresent(next);
                    if (next) {
                      if (field.value) lastEndDateRef.current = field.value;
                      form.setValue(`workExperiences.${index}.endDate`, "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                />
                <span className="text-sm">Present (currently working)</span>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <div className="overflow-hidden rounded-md border">
                <RichTextEditor
                  value={field.value || ""}
                  onChange={(value) => {
                    form.setValue(
                      `workExperiences.${index}.description`,
                      value,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      },
                    );
                  }}
                  designTextColor={resumeData.design.color.text || undefined}
                  onDesignTextColorChange={(hex) =>
                    setResumeData({
                      ...resumeData,
                      design: {
                        ...resumeData.design,
                        color: {
                          ...resumeData.design.color,
                          text: hex,
                        },
                      },
                    })
                  }
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
