import type { Metadata } from "next";

export const metadata: Metadata = { title: "Future Lobos | Conifer Lobos Baseball" };

export default function FutureLobosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">Next Generation</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Future Lobos
          </h1>
        </div>
      </section>

      {/* Jr. Lobos Summer Camp */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Summer Program
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Jr. Lobos Summer Camp
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            Our Jr. Lobos Summer Camp gives young players ages 7–14 the chance
            to learn the fundamentals of baseball from Conifer High School
            coaches and varsity players. The camp focuses on hitting, fielding,
            pitching, and baserunning — all in a fun, competitive environment.
          </p>
          <div className="mt-6 bg-[#C8EFCA] border border-[#7BC47F] rounded-xl p-6 space-y-2">
            <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#1B5E20]">
              Camp Details
            </p>
            <p className="font-barlow text-[#4A4A4A] text-sm">
              <strong>Ages:</strong> 7–14
            </p>
            <p className="font-barlow text-[#4A4A4A] text-sm">
              <strong>Location:</strong> Conifer High School Baseball Fields
            </p>
            <p className="font-barlow text-[#4A4A4A] text-sm">
              <strong>Dates:</strong> Check back for 2025 dates
            </p>
          </div>
          <a
            href="mailto:boosters@coniferlobos.com"
            className="inline-block mt-6 bg-[#1B5E20] text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded hover:bg-[#1B5E20]/85 transition-colors"
          >
            Register / Get Info
          </a>
        </div>
      </section>

      {/* Future Lobos Night */}
      <section className="bg-[#F5F0E4] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Community Event
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Future Lobos Night
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            Future Lobos Night is our annual event where young players get to
            experience a game alongside the varsity team. Kids run the bases,
            meet the players, and get a taste of what it&apos;s like to be a Lobo.
            It&apos;s a great night for the whole family.
          </p>
          <p className="font-barlow text-[#9E9E9E] text-sm mt-4">
            Date TBA — follow us on Instagram and Facebook for announcements.
          </p>
        </div>
      </section>

      {/* 8th Grade Participation */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Middle School
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            8th Grade Participation
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            8th graders in the Conifer High School feeder area may have the
            opportunity to participate with the Conifer Lobos program. This is a
            fantastic way for incoming freshmen to get to know the team and
            coaching staff before high school begins.
          </p>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mt-4">
            Contact the coaching staff for eligibility requirements and tryout
            information.
          </p>
          <a
            href="mailto:coach@coniferlobos.com"
            className="inline-block mt-6 border-2 border-[#1B5E20] text-[#1B5E20] font-barlow font-semibold uppercase text-sm px-6 py-3 rounded hover:bg-[#1B5E20] hover:text-white transition-colors"
          >
            Contact Coaches
          </a>
        </div>
      </section>
    </>
  );
}
