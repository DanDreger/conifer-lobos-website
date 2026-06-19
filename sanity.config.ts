import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./sanity/schemas";

export default defineConfig({
  name: "conifer-lobos",
  title: "Conifer Lobos Baseball",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemas,
  },
});
