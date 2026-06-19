import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { gamesQuery, allEventsQuery } from "@/lib/queries";

export const metadata: Metadata = { title: "Schedule & Events | Conifer Lobos Baseball" };
export const revalidate = 60;

async function getData() {
  const [games, events] = await Promise.all([
    client.fetch(gamesQuery).catch(() => []),
    client.fetch(allEventsQuery).catch(() => []),
  ]);
  return { games, events };
}

function formatGameDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function SchedulePage() {
  const { games, events } = await getData();
  const now = new Date();
  const upcomingEvents = events.filter((e: any) => new Date(e.date) >= now);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">2025</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Schedule &amp; Events
          </h1>
        </div>
      </section>

      {/* Game Schedule */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            2025 Season
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-8">
            Game Schedule
          </h2>

          {games.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">Schedule coming soon.</p>
          ) : (
            <div className="divide-y divide-[#e0e0e0] border border-[#e0e0e0] rounded-xl overflow-hidden">
              {games.map((game: any) => {
                const { day, date, time } = formatGameDate(game.date);
                return (
                  <div
                    key={game._id}
                    className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-[#F5F0E4] transition-colors"
                  >
                    {/* Date */}
                    <div className="flex-shrink-0 w-20">
                      <p className="font-barlow-condensed font-bold text-[#1B5E20] text-lg uppercase leading-none">
                        {date}
                      </p>
                      <p className="font-barlow text-[#9E9E9E] text-xs mt-0.5">
                        {day} · {time}
                      </p>
                    </div>

                    {/* Opponent */}
                    <div className="flex-1 min-w-0">
                      <p className="font-barlow font-semibold text-[#111111] text-sm truncate">
                        {game.opponent}
                      </p>
                      {game.location && (
                        <p className="font-barlow text-[#9E9E9E] text-xs mt-0.5 truncate">
                          {game.location}
                        </p>
                      )}
                    </div>

                    {/* Badges + result */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`font-barlow font-semibold text-xs px-2 py-0.5 rounded ${
                          game.isHome
                            ? "bg-[#C8EFCA] text-[#1B5E20]"
                            : "bg-[#F5F0E4] text-[#4A4A4A]"
                        }`}
                      >
                        {game.isHome ? "Home" : "Away"}
                      </span>
                      {game.gameType && (
                        <span className="font-barlow font-semibold text-xs text-[#9E9E9E] uppercase">
                          {game.gameType}
                        </span>
                      )}
                      {game.result && (
                        <span
                          className={`font-barlow font-semibold text-xs px-2 py-0.5 rounded ${
                            game.result.startsWith("W")
                              ? "bg-[#C8EFCA] text-[#1B5E20]"
                              : "bg-[#f5e4e4] text-[#9e2020]"
                          }`}
                        >
                          {game.result}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Events */}
      <section className="bg-[#F5F0E4] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Upcoming
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Events
          </h2>
          {upcomingEvents.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">No upcoming events.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event: any) => (
                <div
                  key={event._id}
                  className="bg-white border border-[#e0d8c8] rounded-xl p-6"
                >
                  <p className="font-barlow-condensed font-bold text-[#1B5E20] text-lg uppercase">
                    {formatEventDate(event.date)}
                  </p>
                  <p className="font-barlow font-semibold text-[#111111] mt-1">
                    {event.title}
                  </p>
                  {event.location && (
                    <p className="font-barlow text-[#9E9E9E] text-sm mt-1">
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
                      className="inline-block mt-3 text-sm font-barlow font-semibold uppercase text-[#1B5E20] hover:underline"
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
    </>
  );
}
