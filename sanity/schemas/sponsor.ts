import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Title", value: "title" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
        ],
      },
    }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});
