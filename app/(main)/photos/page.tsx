import type { Metadata } from "next";

export const metadata: Metadata = { title: "Photos | Conifer Lobos Baseball" };

export default function PhotosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">In the Field</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Photos
          </h1>
        </div>
      </section>

      {/* Google Photos embed */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mb-8">
            Browse photos from our 2025 season, games, events, and team
            activities. Our shared Google Photos album is updated throughout the
            year by coaches, parents, and the Boosters.
          </p>

          {/* Google Photos embed placeholder */}
          <div className="bg-[#F5F0E4] border border-[#e0d8c8] rounded-xl p-8 text-center">
            <p className="font-barlow font-semibold text-[#111111] mb-2">
              Season Photo Album
            </p>
            <p className="font-barlow text-[#9E9E9E] text-sm mb-6">
              Click below to view the full album on Google Photos.
            </p>
            <a
              href="https://photos.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B5E20] text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded hover:bg-[#1B5E20]/85 transition-colors"
            >
              View on Google Photos
            </a>
          </div>

          <p className="font-barlow text-[#9E9E9E] text-sm mt-6">
            To update the Google Photos link, contact the webmaster at{" "}
            <a
              href="mailto:boosters@coniferlobos.com"
              className="text-[#1B5E20] hover:underline"
            >
              boosters@coniferlobos.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
