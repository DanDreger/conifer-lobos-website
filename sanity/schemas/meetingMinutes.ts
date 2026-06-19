import { defineField, defineType } from "sanity";

export const meetingMinutes = defineType({
  name: "meetingMinutes",
  title: "Meeting Minutes",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (R) => R.required() }),
    defineField({ name: "file", title: "PDF File", type: "file", options: { accept: ".pdf" } }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
