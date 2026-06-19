import Image from "next/image";
import type { Metadata } from "next";
import { client, urlFor } from "@/lib/sanity";
import { playersQuery, coachesQuery } from "@/lib/queries";

export const metadata: Metadata = { title: "Team | Conifer Lobos Baseball" };
export const revalidate = 60;

async function getData() {
  const [players, coaches] = await Promise.all([
    client.fetch(playersQuery).catch((err) => {
      console.error("[team] players fetch error:", err);
      return [];
    }),
    client.fetch(coachesQuery).catch((err) => {
      console.error("[team] coaches fetch error:", err);
      return [];
    }),
  ]);
  console.log(`[team] players: ${players.length}, coaches: ${coaches.length}`);
  return { players, coaches };
}

const teamSections = [
  { id: "varsity", label: "Varsity" },
  { id: "jv", label: "JV" },
  { id: "l3", label: "L3" },
];

function RosterCard({ player, index }: { player: any; index: number }) {
  const headerBg = index % 2 === 0 ? "#1B5E20" : "#111111";

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-xl overflow-hidden">
      {/* Card header — taller for better photo + watermark visibility */}
      <div className="relative h-52 overflow-hidden" style={{ background: headerBg }}>
        {/* Photo fills header; unoptimized bypasses Next.js optimizer so
            Sanity CDN handles transforms (fixes SVG + format issues) */}
        {player.photo && (
          <Image
            src={urlFor(player.photo).width(400).height(416).fit("crop").url()}
            alt={player.photo.alt || player.name}
            fill
            unoptimized
            className="object-cover object-top"
          />
        )}
        {/* Jersey number watermark — rendered above photo via z-10 */}
        <span
          className="font-lalezar absolute right-2 top-1/2 -translate-y-1/2 text-white select-none pointer-events-none z-10"
          style={{ fontSize: "104px", opacity: 0.2, lineHeight: 1 }}
        >
          {player.jerseyNumber}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="font-barlow font-semibold text-[#111111] text-sm leading-tight">
          {player.name}
        </p>
        {Array.isArray(player.position) && player.position.length > 0 && (
          <p className="font-barlow font-semibold text-[#1B5E20] text-xs uppercase tracking-wide mt-1">
            {player.position.join(", ")}
          </p>
        )}
        {player.gradYear && (
          <p className="font-barlow text-[#9E9E9E] text-xs mt-0.5">
            Class of {player.gradYear}
          </p>
        )}
      </div>
    </div>
  );
}

function CoachCard({ coach }: { coach: any }) {
  return (
    <div className="flex flex-col md:flex-row rounded-xl overflow-hidden border-l-4 border-[#1B5E20] bg-[#F5F0E4]">
      {/* Headshot — full width on mobile, stretches to full card height on desktop */}
      <div className="relative w-full h-52 md:w-[200px] md:h-auto md:self-stretch flex-shrink-0 bg-[#111111]">
        {coach.headshot && (
          <Image
            src={urlFor(coach.headshot).width(400).height(480).fit("crop").url()}
            alt={coach.name}
            fill
            unoptimized
            className="object-cover object-top"
          />
        )}
      </div>
      {/* Text — white bg for contrast against cream card */}
      <div className="bg-white flex-1 p-6 md:p-8 flex flex-col justify-center">
        <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#1B5E20] mb-1">
          {coach.title}
        </p>
        <h3 className="font-barlow-condensed font-bold uppercase text-[#111111] text-2xl leading-tight">
          {coach.name}
        </h3>
        {coach.bio && (
          <p className="font-barlow text-[#4A4A4A] text-[14px] mt-3 leading-[1.75]">
            {coach.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function TeamPage() {
  const { players, coaches } = await getData();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">2025</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Our Pack
          </h1>
          <div className="flex flex-wrap gap-4 mt-8">
            {[...teamSections, { id: "coaches", label: "Coaches" }].map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-barlow font-semibold uppercase text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-1.5 rounded transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Roster sections — increased vertical spacing between each */}
      {teamSections.map(({ id, label }) => {
        const filtered = players.filter((p: any) => p.team === id);
        return (
          <section key={id} id={id} className="py-24 bg-white scroll-mt-14">
            <div className="max-w-7xl mx-auto px-4">
              <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
                Roster
              </p>
              <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
                {label}
              </h2>
              {filtered.length === 0 ? (
                <p className="font-barlow text-[#9E9E9E]">Roster coming soon.</p>
              ) : (
                // 2 columns mobile → 4 columns desktop
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filtered.map((player: any, i: number) => (
                    <RosterCard key={player._id} player={player} index={i} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Coaching Staff */}
      <section id="coaches" className="py-24 bg-[#F5F0E4] scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Staff
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Coaching Staff
          </h2>
          {coaches.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">Staff info coming soon.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {coaches.map((coach: any) => (
                <CoachCard key={coach._id} coach={coach} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
