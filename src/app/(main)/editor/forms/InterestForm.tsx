import { RichTextEditor } from "@/components/RichTextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { otherSchema, OtherValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function InterestForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<OtherValues>({
    resolver: zodResolver(otherSchema),
    defaultValues: {
      others: resumeData.others || { title: "", description: "" },
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, others: values.others || undefined });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">
          Interest / Hobbies / Awards / Trainings etc.
        </h2>
        <p className="text-sm text-muted-foreground">
          Add Anything you want like interests, hobbies, awards, trainings etc.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="others.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Resume Purpose Title"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="others.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  {/* <Input
                    {...field}
                    placeholder="Short description about your resume"
                  /> */}
                  <div className="overflow-hidden rounded-md border">
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={(value) => {
                        form.setValue(`others.description`, value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
