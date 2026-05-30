import { defineField, defineType } from "sanity";

export const careerApplicationType = defineType({
  name: "careerApplication",
  title: "Career application",
  type: "document",
  fields: [
    defineField({ name: "position", title: "Position", type: "string" }),
    defineField({ name: "fullName", title: "Full name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "nationality", title: "Nationality", type: "string" }),
    defineField({ name: "location", title: "Current city / country", type: "string" }),
    defineField({ name: "yearsExperience", title: "Years of experience", type: "string" }),
    defineField({ name: "currentTitle", title: "Current job title", type: "string" }),
    defineField({ name: "expectedSalary", title: "Expected salary", type: "string" }),
    defineField({ name: "noticePeriod", title: "Notice period", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({ name: "cv", title: "CV", type: "file" }),
    defineField({ name: "locale", title: "Locale", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "reviewed"] },
      initialValue: "new",
    }),
    defineField({ name: "createdAt", title: "Submitted at", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "fullName", subtitle: "position" },
  },
});
