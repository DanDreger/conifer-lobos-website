import Link from "next/link";
import { client } from "@/lib/sanity";
import { upcomingEventsQuery, latestNewsQuery } from "@/lib/queries";

export const revalidate = 60;

async function getData() {
  const now = new Date().toISOString();
  const [events, news] = await Promise.all([
    client.fetch(upcomingEventsQuery, { now }).catch((err) => {
      console.error("[home] events fetch error:", err);
      return [];
    }),
    client.fetch(latestNewsQuery).catch((err) => {
      console.error("[home] news fetch error:", err);
      return [];
    }),
  ]);
  console.log(`[home] events: ${events.length}, news: ${news.length}`);
  return { events, news };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HomePage() {
  const { events, news } = await getData();

  return (
    <>
      {/* 1. Hero */}
      <section className="relative bg-[#111111] min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#111111]/95 to-[#1B5E20]/20 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
          <p className="font-dancing text-[#C8EFCA] text-4xl mb-2">Lobos</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-5" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl md:text-8xl leading-none mb-6">
            Baseball
            <br />
            Boosters
          </h1>
          <p className="font-barlow text-white/60 text-base max-w-md mb-10 leading-relaxed">
            Supporting Conifer High School varsity, JV, and L3 baseball — Jeffco
            5A, Conifer, Colorado.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/schedule"
              className="bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded transition-colors"
            >
              2025 Schedule
            </Link>
            <Link
              href="/team"
              className="border-2 border-white/70 hover:border-white text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded transition-colors"
            >
              Meet the Pack
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Upcoming Events */}
      {events.length > 0 && (
        <section className="bg-[#F5F0E4] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-4">
              Coming Up
            </p>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
              {events.map((event: any) => (
                <div
                  key={event._id}
                  className="flex-shrink-0 snap-start bg-white border border-[#e0d8c8] rounded-xl p-5 w-64"
                >
                  <p className="font-barlow-condensed font-bold text-[#1B5E20] text-lg uppercase">
                    {formatDate(event.date)}
                  </p>
                  <p className="font-barlow font-semibold text-[#111111] mt-1 text-sm">
                    {event.title}
                  </p>
                  {event.location && (
                    <p className="font-barlow text-[#9E9E9E] text-xs mt-1">
                      {event.location}
                    </p>
                  )}
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs font-barlow font-semibold uppercase text-[#1B5E20] hover:underline"
                    >
                      Details →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. News */}
      {news.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
              Latest
            </p>
            <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
              News &amp; Announcements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white border border-[#e0e0e0] rounded-xl p-6"
                >
                  <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
                    {formatDate(item.publishedAt)}
                  </p>
                  <h3 className="font-barlow font-semibold text-[#111111] text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Contact */}
      <section id="contact" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Get in Touch
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5F0E4] border border-[#e0d8c8] rounded-xl p-6">
              <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-1">
                Head Coach
              </p>
              <p className="font-barlow font-semibold text-[#111111]">
                Conifer Lobos Baseball
              </p>
              <a
                href="mailto:coach@coniferlobos.com"
                className="font-barlow text-[#1B5E20] hover:underline text-sm"
              >
                coach@coniferlobos.com
              </a>
            </div>
            <div className="bg-[#F5F0E4] border border-[#e0d8c8] rounded-xl p-6">
              <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-1">
                Boosters
              </p>
              <p className="font-barlow font-semibold text-[#111111]">
                Booster Club
              </p>
              <a
                href="mailto:boosters@coniferlobos.com"
                className="font-barlow text-[#1B5E20] hover:underline text-sm"
              >
                boosters@coniferlobos.com
              </a>
            </div>
            <div className="bg-[#F5F0E4] border border-[#e0d8c8] rounded-xl p-6">
              <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-1">
                Follow Us
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-barlow font-semibold text-sm text-[#1B5E20] hover:underline"
                >
                  Instagram
                </a>
                <span className="text-[#9E9E9E]">/</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-barlow font-semibold text-sm text-[#1B5E20] hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
