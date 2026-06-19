import { defineField, defineType } from "sanity";

export const game = defineType({
  name: "game",
  title: "Game",
  type: "document",
  fields: [
    defineField({ name: "opponent", title: "Opponent", type: "string", validation: (R) => R.required() }),
    defineField({ name: "date", title: "Date & Time", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "isHome", title: "Home Game", type: "boolean", validation: (R) => R.required() }),
    defineField({ name: "result", title: "Result", type: "string", description: 'e.g. "W 8-3" or "L 2-5"' }),
    defineField({
      name: "gameType",
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
    defineField({ name: "notes", title: "Notes", type: "string" }),
  ],
  preview: {
    select: { title: "opponent", subtitle: "date" },
  },
});
