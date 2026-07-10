import { defineField, defineType } from "sanity";

export const chatLeadType = defineType({
  name: "chatLead",
  title: "Chat assistant lead",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Lead type",
      type: "string",
      options: { list: ["booking", "corporate", "career"] },
    }),
    defineField({ name: "fullName", title: "Full name", type: "string" }),
    defineField({ name: "contact", title: "Contact supplied", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "request", title: "Request", type: "text", rows: 4 }),
    defineField({ name: "locale", title: "Language", type: "string" }),
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
    select: { title: "fullName", subtitle: "kind" },
  },
});
