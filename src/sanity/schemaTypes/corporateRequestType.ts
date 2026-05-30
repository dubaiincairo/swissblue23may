import { defineField, defineType } from "sanity";

export const corporateRequestType = defineType({
  name: "corporateRequest",
  title: "Corporate (B2B) request",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company / entity", type: "string" }),
    defineField({ name: "sector", title: "Sector", type: "string" }),
    defineField({ name: "contact", title: "Contact person", type: "string" }),
    defineField({ name: "jobTitle", title: "Job title", type: "string" }),
    defineField({ name: "email", title: "Business email", type: "string" }),
    defineField({ name: "phone", title: "Mobile number", type: "string" }),
    defineField({ name: "city", title: "Preferred city", type: "string" }),
    defineField({ name: "propertyType", title: "Preferred property type", type: "string" }),
    defineField({ name: "requestType", title: "Request type", type: "string" }),
    defineField({ name: "guests", title: "Expected guests", type: "string" }),
    defineField({ name: "units", title: "Rooms or apartments", type: "string" }),
    defineField({ name: "budget", title: "Target budget", type: "string" }),
    defineField({ name: "arrival", title: "Expected arrival", type: "string" }),
    defineField({ name: "departure", title: "Expected departure", type: "string" }),
    defineField({ name: "documents", title: "Documents available", type: "string" }),
    defineField({ name: "preferredContact", title: "Preferred contact method", type: "string" }),
    defineField({ name: "message", title: "Additional requirements", type: "text", rows: 4 }),
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
    select: { title: "company", subtitle: "requestType" },
  },
});
