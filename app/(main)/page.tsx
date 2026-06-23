import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import { allUpcomingEventsQuery, allNewsQuery } from "@/lib/queries";
import WhatsGoingOnSlider, {
  type SliderSlide,
} from "@/components/WhatsGoingOnSlider";

export const revalidate = 60;

async function getData() {
  const now = new Date().toISOString();
  const [events, news] = await Promise.all([
    client.fetch(allUpcomingEventsQuery, { now }).catch((err) => {
      console.error("[home] events fetch error:", err);
      return [];
    }),
    client.fetch(allNewsQuery).catch((err) => {
      console.error("[home] news fetch error:", err);
      return [];
    }),
  ]);
  console.log(`[home] events: ${events.length}, news: ${news.length}`);
  return { events, news };
}

function buildSlides(news: any[], events: any[]): SliderSlide[] {
  const slides: SliderSlide[] = [];
  const len = Math.min(2, Math.max(news.length, events.length));
  for (let i = 0; i < len; i++) {
    if (news[i]) {
      slides.push({
        _id: news[i]._id,
        type: "NEWS",
        title: news[i].title,
        date: news[i].publishedAt,
        imageUrl: news[i].image
          ? urlFor(news[i].image).width(800).height(400).fit("crop").url()
          : undefined,
        imageAlt: news[i].image?.alt,
      });
    }
    if (events[i]) {
      slides.push({
        _id: events[i]._id,
        type: "EVENT",
        title: events[i].title,
        date: events[i].date,
        description: events[i].description,
        imageUrl: events[i].image
          ? urlFor(events[i].image).width(800).height(400).fit("crop").url()
          : undefined,
        imageAlt: events[i].image?.alt,
      });
    }
  }
  return slides;
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
  const slides = buildSlides(news, events);

  return (
    <>
      {/* 1. Hero — 50vh min-height, real photo with dark overlay */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#111111]">
        <Image
          src="/hero.jpg"
          alt="Conifer Lobos Baseball"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay per brief: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75))",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <p className="font-dancing text-[#C8EFCA] text-4xl mb-2">Lobos</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-5" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl md:text-8xl leading-none mb-6">
            Baseball
            <br />
            Boosters
          </h1>
          <p className="font-barlow text-white/60 text-base max-w-md leading-relaxed">
            Supporting Conifer High School varsity, JV, and L3 baseball — Jeffco
            5A, Conifer, Colorado.
          </p>
        </div>
      </section>

      {/* 2. What's Going On — auto-sliding client component */}
      <WhatsGoingOnSlider slides={slides} />

      {/* 3. Upcoming Events — full list, white bg */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            On the Calendar
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Upcoming Events
          </h2>
          {events.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">No upcoming events.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map((event: any) => (
                <div
                  key={event._id}
                  className="bg-white border border-[#e0e0e0] rounded-xl p-6"
                >
                  <p className="font-barlow-condensed font-bold text-[#1B5E20] text-lg uppercase leading-none mb-1">
                    {formatDate(event.date)}
                  </p>
                  <h3 className="font-barlow font-semibold text-[#111111] text-sm leading-snug mt-2">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="font-barlow text-[#9E9E9E] text-xs mt-1">
                      {event.location}
                    </p>
                  )}
                  {event.description && (
                    <p className="font-barlow text-[#4A4A4A] text-sm mt-2 leading-relaxed">
                      {event.description}
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
          )}
        </div>
      </section>

      {/* 4. News — full list, cream bg */}
      <section className="bg-[#F5F0E4] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Latest
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            News &amp; Announcements
          </h2>
          {news.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">
              No announcements yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white border border-[#e0d8c8] rounded-xl p-6"
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
          )}
        </div>
      </section>

      {/* 5. Contact — unchanged */}
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
              <p className="font-barlow font-semibold uppercase text-[#9E9E9E] text-[11px] tracking-[0.1em] mb-1">
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
