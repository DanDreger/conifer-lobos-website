import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  // Disable CDN in dev so new content is always fetched fresh.
  // In production the CDN is fine since we revalidate every 60s.
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const isConfigured = projectId !== "placeholder";
