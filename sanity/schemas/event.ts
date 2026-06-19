import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "date", title: "Date & Time", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "link", title: "Registration / Info Link", type: "url" }),
    defineField({ name: "isFeatured", title: "Featured", type: "boolean" }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
