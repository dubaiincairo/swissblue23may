import { defineField, defineType } from "sanity";

export const siteContentType = defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        defineField({
          name: "managedBySecretPanel",
          title: "Managed by /secretpanel",
          type: "string",
          hidden: true,
        }),
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
    }),
  ],
});
