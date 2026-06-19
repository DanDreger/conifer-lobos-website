import { defineField, defineType } from "sanity";

export const coach = defineType({
  name: "coach",
  title: "Coach",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "headshot", title: "Headshot", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "title", media: "headshot" },
  },
});
