import { defineField, defineType } from "sanity";

export const boardMember = defineType({
  name: "boardMember",
  title: "Board Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (R) => R.required() }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "isCurrent", title: "Current Member", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
