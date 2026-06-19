import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Answer", type: "array", of: [{ type: "block" }], validation: (R) => R.required() }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "question" },
  },
});
