import Image from "next/image";
import type { Metadata } from "next";
import { client, urlFor } from "@/lib/sanity";
import { boardMembersQuery, meetingMinutesQuery } from "@/lib/queries";

export const metadata: Metadata = { title: "Boosters | Conifer Lobos Baseball" };
export const revalidate = 60;

async function getData() {
  const [boardMembers, minutes] = await Promise.all([
    client.fetch(boardMembersQuery).catch(() => []),
    client.fetch(meetingMinutesQuery).catch(() => []),
  ]);
  return { boardMembers, minutes };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BoostersPage() {
  const { boardMembers, minutes } = await getData();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">Supporting</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Our Boosters
          </h1>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-[#F5F0E4] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Our Mission
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Who We Are
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            The Conifer Lobos Baseball Boosters is a parent-led organization
            dedicated to supporting the student-athletes of Conifer High
            School&apos;s baseball program. We fund equipment, uniforms,
            tournaments, and team events — providing every player the resources
            they need to compete at the highest level in Jeffco 5A.
          </p>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mt-4">
            We believe in building character on and off the field, fostering a
            community of dedicated athletes, supportive families, and passionate
            coaches.
          </p>
        </div>
      </section>

      {/* Board Members */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            2024–2025
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Board Members
          </h2>
          {boardMembers.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">Board info coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {boardMembers.map((member: any) => (
                <div
                  key={member._id}
                  className="bg-[#F5F0E4] border border-[#e0d8c8] rounded-xl p-5 flex items-center gap-4"
                >
                  {member.photo ? (
                    <Image
                      src={urlFor(member.photo).width(112).height(112).fit("crop").url()}
                      alt={member.name}
                      width={56}
                      height={56}
                      unoptimized
                      className="rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#1B5E20] flex-shrink-0 flex items-center justify-center">
                      <span className="font-barlow-condensed font-bold text-white text-xl uppercase">
                        {member.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-barlow font-semibold text-[#111111] text-sm">
                      {member.name}
                    </p>
                    <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#1B5E20] mt-0.5">
                      {member.role}
                    </p>
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="font-barlow text-[#9E9E9E] text-xs hover:text-[#1B5E20] transition-colors"
                      >
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Meeting Minutes */}
      <section className="bg-[#F5F0E4] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Documents
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Meeting Minutes
          </h2>
          {minutes.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">
              No meeting minutes posted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {minutes.map((m: any) => (
                <div
                  key={m._id}
                  className="bg-white border border-[#e0d8c8] rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-barlow font-semibold text-[#111111] text-sm">
                      {m.title}
                    </p>
                    <p className="font-barlow text-[#9E9E9E] text-xs mt-0.5">
                      {m.date && formatDate(m.date)}
                    </p>
                  </div>
                  {m.file?.asset?.url && (
                    <a
                      href={m.file.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 bg-[#1B5E20] text-white font-barlow font-semibold uppercase text-xs px-3 py-1.5 rounded hover:bg-[#1B5E20]/85 transition-colors"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bylaws */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Bylaws
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            The Conifer Lobos Baseball Boosters bylaws govern the structure and
            operation of the booster club, including membership, officer
            elections, financial oversight, and meeting procedures. Contact the
            board for a copy of the current bylaws.
          </p>
        </div>
      </section>

      {/* Board Member Duties */}
      <section className="bg-[#F5F0E4] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Board Member Duties
          </h2>
          <div className="space-y-4 font-barlow text-[#4A4A4A] text-base leading-relaxed">
            <div>
              <p className="font-semibold text-[#111111]">President</p>
              <p>Chairs all meetings, represents the Boosters, and oversees all club activities and initiatives.</p>
            </div>
            <div>
              <p className="font-semibold text-[#111111]">Vice President</p>
              <p>Supports the President and leads in their absence. Coordinates volunteers and event logistics.</p>
            </div>
            <div>
              <p className="font-semibold text-[#111111]">Treasurer</p>
              <p>Manages all financial accounts, prepares budgets, and provides financial reports at each meeting.</p>
            </div>
            <div>
              <p className="font-semibold text-[#111111]">Secretary</p>
              <p>Records and distributes meeting minutes, manages correspondence, and maintains club records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Aid */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Financial Aid
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            We believe every student who wants to play baseball should have the
            opportunity. Financial assistance may be available for families who
            need support with registration fees, equipment, or team expenses.
            Please contact the Boosters board in confidence to learn more.
          </p>
          <a
            href="mailto:boosters@coniferlobos.com"
            className="inline-block mt-4 bg-[#1B5E20] text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded hover:bg-[#1B5E20]/85 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
