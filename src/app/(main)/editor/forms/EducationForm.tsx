import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { YearPicker } from "@/components/ui/year-picker";
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { educationSchema, EducationValues } from "@/lib/validation";
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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    mode: "onChange",
    defaultValues: {
      educations: resumeData.content.educations || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!form.formState.isValid) return;

      setResumeData({
        ...resumeData,
        content: {
          ...resumeData.content,
          educations: values.educations?.filter((edu) => edu !== undefined) ?? [],
        },
      });
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    move(oldIndex, newIndex);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add as many educations as you like. Leave fields blank if you don’t want
          them on your resume.
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
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <EducationItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  location: "",
                  marks: "",
                  stream: "",
                  description: "",
                  startDate: undefined,
                  endDate: undefined,
                  isPresent: false,
                })
              }
            >
              Add education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ id, form, index, remove }: EducationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const startYear = form.watch(`educations.${index}.startDate`);
  const isPresent = form.watch(`educations.${index}.isPresent`);

  const currentYear = new Date().getFullYear();

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "space-y-3 rounded-md border bg-background p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
    >
      <div className="flex justify-between">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground"
          {...attributes}
          {...listeners}
        />
      </div>

      {[
        ["degree", "Degree", "B.Tech, MBA, ..."],
        ["school", "Institution", "ABC College, XYZ University"],
        ["location", "Location", "City, State, Country"],
        ["marks", "Marks", "CGPA, Percentage"],
        ["stream", "Stream", "Computer Science"],
      ].map(([name, label, placeholder]) => (
        <FormField
          key={name}
          control={form.control}
          name={`educations.${index}.${name}` as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <FormField
        control={form.control}
        name={`educations.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`educations.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Year</FormLabel>
            <FormControl>
              <YearPicker
                value={field.value}
                onChange={field.onChange}
                minYear={currentYear - 50}
                maxYear={currentYear}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`educations.${index}.endDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Year</FormLabel>
            <FormControl>
              <YearPicker
                value={field.value}
                onChange={field.onChange}
                minYear={typeof startYear === "number" ? startYear : currentYear - 50}
                maxYear={currentYear + 6}
                disabled={isPresent}
              />
            </FormControl>

            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                checked={isPresent}
                onCheckedChange={(checked) => {
                  form.setValue(`educations.${index}.isPresent`, !!checked);
                  if (checked) form.setValue(`educations.${index}.endDate`, undefined);
                }}
              />
              <span className="text-sm">Present (currently studying)</span>
            </div>
          </FormItem>
        )}
      />

      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
