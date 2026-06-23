import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "News / Announcement",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (R) => R.required() }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "image" },
  },
});
