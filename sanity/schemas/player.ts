import { defineField, defineType } from "sanity";

export const player = defineType({
  name: "player",
  title: "Player",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "jerseyNumber", title: "Jersey Number", type: "number", validation: (R) => R.required() }),
    defineField({
      name: "position",
      title: "Position(s)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH", "UTIL"],
      },
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "string",
      options: {
        list: [
          { title: "Varsity", value: "varsity" },
          { title: "JV", value: "jv" },
          { title: "L3", value: "l3" },
        ],
      },
    }),
    defineField({ name: "gradYear", title: "Graduation Year", type: "number" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "team", media: "photo" },
  },
});
