import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PhotoCropModal from "@/components/PhotoCropModal";

export default function PersonalInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.content.firstName || "",
      lastName: resumeData.content.lastName || "",
      jobTitle: resumeData.content.jobTitle || "",
      city: resumeData.content.city || "",
      country: resumeData.content.country || "",
      phone: resumeData.content.phone || "",
      email: resumeData.content.email || "",
      socialLinks: resumeData.content.socialLinks || [],
      portfolioLink: resumeData.content.portfolioLink || "",
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
          ...values,
          socialLinks:
            values.socialLinks
              ?.filter((links) => links !== undefined)
              .map((links) => links.trim())
              .filter((links) => links !== "") || [],
        },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  // Stores the RHF onChange so we can call it after cropping
  const pendingOnChangeRef = useRef<((file: File | null) => void) | null>(null);

  const isImageFieldDisabled = [
    "ats2",
    "ats4",
    "ats5",
    "ats6",
    "ats7",
    "ats8",
    "ats11",
    "ats12",
    "ats13",
    "ats14",
    "ats15",
  ].includes(resumeData.styleId);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal info</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      disabled={isImageFieldDisabled}
                      className={
                        isImageFieldDisabled
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          pendingOnChangeRef.current = fieldValues.onChange;
                          setPendingPhoto(file);
                          // Reset input so the same file can be re-selected
                          e.target.value = "";
                        }
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={isImageFieldDisabled}
                    className={
                      isImageFieldDisabled
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }
                    onClick={() => {
                      fieldValues.onChange(null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Profile</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="eg. Full Stack Developer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="eg. New York"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="eg. United States"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="tel"
                    placeholder="eg. +(12)3-456-7890"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    type="email"
                    placeholder="eg. 6M0l0@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Social link */}
          <FormField
            control={form.control}
            name="socialLinks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social links</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="e.g. Linkedin, GitHub, Twitter, profile links.."
                    onChange={(e) => {
                      const socials = e.target.value.split(",");
                      field.onChange(socials);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each social Link with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Portfolio link */}
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="eg. https://example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <PhotoCropModal
        file={pendingPhoto}
        onConfirm={(croppedFile) => {
          pendingOnChangeRef.current?.(croppedFile);
          setPendingPhoto(null);
        }}
        onClose={() => {
          setPendingPhoto(null);
          if (photoInputRef.current) photoInputRef.current.value = "";
        }}
      />
    </div>
  );
}
