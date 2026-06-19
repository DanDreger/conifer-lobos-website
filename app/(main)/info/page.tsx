import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { faqsQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = { title: "Player/Parent Info | Conifer Lobos Baseball" };
export const revalidate = 60;

async function getFaqs() {
  return client.fetch(faqsQuery).catch(() => []);
}

const anchorNav = [
  { id: "faqs", label: "FAQs" },
  { id: "equipment", label: "Equipment" },
  { id: "parent-expectations", label: "Parent Expectations" },
  { id: "player-rules", label: "Player Rules" },
  { id: "checklists", label: "Checklists" },
  { id: "communication", label: "Communication" },
];

const requiredGear = [
  "Batting Helmet (Black)",
  "Baseball Bat",
  "Baseball Glove",
  "Home and Road Jerseys (provided by Conifer)",
  "Baseball Pants — White with green piping (home) / Grey with black piping (road)",
  "Baseball Belt (Green)",
  "Baseball Socks (Black)",
  "Molded cleats (home) or any cleats (road)",
  "Black Undershirt With Sleeves",
  "Athletic Sunglasses",
  "Athletic Cup",
  "Cold Weather Layers (no short sleeves below 50°)",
  "Water/Snacks",
  "Sunscreen",
  "Jaeger Band",
  "Conifer Baseball Hat",
];

const optionalGear = [
  "Batting Gloves",
  "Evo Shield",
  "Leg Guards",
  "Eye Black",
  "Sliding Shorts",
  "Sliding Mitt",
  "Bullpen Baseball",
  "Shoulder Tube",
];

const notAcceptable = [
  "Ear Pods / Headphones",
  "Phones During Games",
  "Food or Snacks delivered to the dugout by family",
];

export default async function InfoPage() {
  const faqs = await getFaqs();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">For Families</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Player/Parent Info
          </h1>
          <div className="flex flex-wrap gap-3 mt-8">
            {anchorNav.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-barlow font-semibold uppercase text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs — CMS driven */}
      <section id="faqs" className="bg-white py-16 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Common Questions
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-10">
            Parent FAQs
          </h2>
          {faqs.length === 0 ? (
            <p className="font-barlow text-[#9E9E9E]">FAQs coming soon.</p>
          ) : (
            <div className="space-y-6">
              {faqs.map((faq: any) => (
                <div key={faq._id} className="border-b border-[#e0e0e0] pb-6">
                  <p className="font-barlow font-semibold text-[#111111] text-base mb-2">
                    {faq.question}
                  </p>
                  <div className="font-barlow text-[#4A4A4A] text-sm leading-relaxed prose prose-sm max-w-none">
                    <PortableText value={faq.answer} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Equipment */}
      <section id="equipment" className="bg-[#F5F0E4] py-16 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Gear
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Player Equipment
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mb-8">
            Baseball is one of the most gear-intensive sports. Here&apos;s what every Conifer player needs at every game.
          </p>

          {/* Required gear */}
          <h3 className="font-barlow font-semibold text-[#111111] text-base mb-3">Required Gear</h3>
          <ul className="space-y-2 mb-8">
            {requiredGear.map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C8EFCA] flex items-center justify-center text-[#1B5E20] text-xs font-bold mt-0.5">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Optional gear */}
          <h3 className="font-barlow font-semibold text-[#111111] text-base mb-3">Optional Gear</h3>
          <ul className="space-y-2 mb-8">
            {optionalGear.map((item, i) => (
              <li key={i} className="font-barlow text-[#4A4A4A] text-sm pl-8 list-none">
                — {item}
              </li>
            ))}
          </ul>

          {/* Not acceptable */}
          <h3 className="font-barlow font-semibold text-[#111111] text-base mb-3">Not Acceptable</h3>
          <ul className="space-y-2 mb-8">
            {notAcceptable.map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm">
                <span className="flex-shrink-0 text-red-500 font-bold mt-0.5">✕</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Team Hats */}
          <div className="bg-white border border-[#e0d8c8] rounded-xl p-6 mb-6">
            <h3 className="font-barlow font-semibold text-[#111111] text-base mb-3">Team Hats</h3>
            <ul className="space-y-1 font-barlow text-[#4A4A4A] text-sm">
              <li><strong>Home:</strong> White crown hat</li>
              <li><strong>Road:</strong> All black hat with green C</li>
              <li><strong>L3:</strong> White crown hat only</li>
            </ul>
            <p className="font-barlow text-[#4A4A4A] text-sm mt-3">
              Cost ~$20/hat. Make checks out to <strong>Conifer Baseball Boosters</strong>.
            </p>
          </div>

          {/* Spirit Gear */}
          <div className="bg-white border border-[#e0d8c8] rounded-xl p-6">
            <h3 className="font-barlow font-semibold text-[#111111] text-base mb-3">Spirit Gear</h3>
            <ul className="space-y-2 font-barlow text-[#4A4A4A] text-sm">
              <li>
                <strong>Renegade B&amp;H Sports</strong> (Lakewood) — brick &amp; mortar + online
              </li>
              <li>
                <strong>Valley Sports</strong> — online, Proline and Under Armour gear
              </li>
              <li>
                <a
                  href="https://coniferbaseball.itemorder.com/shop/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1B5E20] hover:underline font-semibold"
                >
                  Team Store →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Parent Expectations */}
      <section id="parent-expectations" className="bg-white py-16 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Code of Conduct
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Parent Expectations &amp; Code of Conduct
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mb-8">
            By having a child in the Conifer Baseball program, parents agree to the following code of conduct.
          </p>

          <ol className="space-y-3 mb-8">
            {[
              "I will help foster a positive environment by maintaining positive dialogue with all participants and fans at all practices and games.",
              "I commit to keeping negative opinions about coaching staff, players, umpiring crews, and opposing fans to myself.",
              "I will complete my obligations for volunteering as designated by the head coach, administration, and Baseball Boosters.",
              "I will pay all team/program fees and expenses on time and without inconvenience.",
              "I will maintain control of my emotions during all Conifer events I attend.",
              "I will refrain from using obscene, profane, or abusive language while attending team activities.",
              "The use of drugs, alcohol, or tobacco is strictly prohibited on all team sites.",
              "I commit to refraining from this activity while attending all team events.",
              "I understand that volunteering my time or donating money to the program in no way improves my son's chances at playing time or starting lineup status.",
              "I commit to resolving issues through the designated process outlined by Conifer administration and coaching staff.",
              "I agree to abide by the Conifer Communication Policy: Players address coaches directly → Parents request appointment if unresolved → Bring to Athletic Director if still unresolved → Parents may not engage coaches before, during, or immediately after games (must wait 12 hours).",
              "During practice and games, parents will not offer coaching or criticism to any players on the field.",
              "Parents will not criticize umpires, trainers, school administrators, or other designated personnel during Conifer games.",
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C8EFCA] flex items-center justify-center text-[#1B5E20] text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {rule}
              </li>
            ))}
          </ol>

          <p className="font-barlow text-[#4A4A4A] text-sm mb-6">
            Parents must agree to these terms before their child&apos;s first day of practice.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfMXxzxSXQqoncdVEsXhevKh1JOVK5wjKWYbriYewP-JJAIKw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded transition-colors"
          >
            Parent Agreement Form
          </a>
        </div>
      </section>

      {/* Player Rules */}
      <section id="player-rules" className="bg-[#F5F0E4] py-16 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Standards
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Player Rules &amp; Code of Ethics
          </h2>

          <h3 className="font-barlow font-semibold text-[#111111] text-base mb-4">Player Baseball Rules</h3>
          <ol className="space-y-3 mb-10">
            {[
              "Attendance to all scheduled practices and games are mandatory.",
              "Team practices begin at 4:00 PM unless otherwise designated. Punctuality expected.",
              "Unexcused tardiness/absences will affect starting position and playing time. Continued behavior could result in termination.",
              "Academically ineligible athletes are suspended from games for one week per Jeffco policy. Second offense = one week suspension. Third offense = separation from team.",
              "Players must bring to every practice and game: Hat, Glove, Cleats, Warm layers, Proper Uniform (gameday), Proper Baseball Pants, Bat, Athletic Cup, Sunglasses, Batting Helmet.",
              "Players are responsible for setting up the field prior to practice and cleaning up afterwards.",
              "Players are responsible for returning school-owned gear in a timely manner. Failures result in fines or replacement costs.",
              "Players are expected to be focused and attentive during practice and give maximum effort for all team sanctioned activities.",
              "When bus transportation is available, all players will ride the bus to and from the game. Parents can give verbal or written permission to take their son home. No other figure can excuse a player from the bus.",
              "All injuries must be reported to coaching staff and the Conifer trainer immediately.",
              "Players are expected to respect themselves, their school, their teammates, and the team at all times.",
              "Players must abide by the Conifer Communication Policy: (a) Address coaches directly with concerns. (b) If unresolved, parents request an appointment with coaches. (c) If still unresolved, bring to Athletic Director with Head Coach.",
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C8EFCA] flex items-center justify-center text-[#1B5E20] text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {rule}
              </li>
            ))}
          </ol>

          <h3 className="font-barlow font-semibold text-[#111111] text-base mb-4">Code of Ethics</h3>
          <ol className="space-y-3 mb-8">
            {[
              "I will commit to train and perform to the best of my ability and maintain a positive attitude.",
              "Attend all practices and games on time unless prevented by injury, emergency, or reason approved in advance by my coach.",
              "I will maintain control of my emotions during all competition.",
              "I will treat teammates, opponents, referees, and the rules of the game with respect.",
              "I will refrain from using obscene, profane, or abusive language during all team activities.",
              "I will not use alcohol, drugs, or any tobacco products. Violating this policy results in serious disciplinary action.",
              "I will place the interests of the team before my own.",
              "I accept the team rules and will do my best academically.",
              "I make all foregoing commitments willingly, knowing my teammates, coaches, and Conifer High School are relying on me.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1B5E20] flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf2NnSQL1oEP2-JGZEaYCa4wLyIoHnGhmfxOVg0JLQ--zaUuQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded transition-colors"
          >
            Player Agreement Form
          </a>
        </div>
      </section>

      {/* Checklists */}
      <section id="checklists" className="bg-white py-16 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Season Prep
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-8">
            Player &amp; Parent Checklist
          </h2>

          {/* Important Dates callout */}
          <div className="bg-[#C8EFCA] border border-[#7BC47F] rounded-xl p-6 mb-8">
            <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#1B5E20] mb-4">
              Important 2026 Dates
            </p>
            <ul className="space-y-2">
              {[
                { date: "Feb 9", detail: "Gear store closes" },
                { date: "Feb 23", detail: "Registration deadline + physical due" },
                { date: "Feb 23–25", detail: "Tryouts 4–6pm @ Conifer HS — cuts Feb 25" },
                { date: "Mar 2", detail: "L3 Schedule announced" },
                { date: "Mar 3", detail: "Final rosters + hat money + jersey deposit due" },
                { date: "Mar 21–26", detail: "Spring Training Trip" },
                { date: "Apr 15", detail: "Varsity @ Coors Field" },
                { date: "May 12", detail: "End of Season" },
                { date: "May 15–16", detail: "First Round of Playoffs" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-barlow text-sm">
                  <span className="flex-shrink-0 font-semibold text-[#1B5E20] w-20">{item.date}</span>
                  <span className="text-[#4A4A4A]">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="space-y-3">
            {[
              { text: "Register for Baseball", href: "https://students.arbitersports.com/programs/2026-spring-athletic-registration-6" },
              { text: "Sign Player Standards / Ethics Doc", href: "https://docs.google.com/forms/d/e/1FAIpQLSf2NnSQL1oEP2-JGZEaYCa4wLyIoHnGhmfxOVg0JLQ--zaUuQ/viewform" },
              { text: "Sign Parent Standards / Ethics Doc", href: "https://docs.google.com/forms/d/e/1FAIpQLSfMXxzxSXQqoncdVEsXhevKh1JOVK5wjKWYbriYewP-JJAIKw/viewform" },
              { text: "Complete a pre-season sports physical and submit to school" },
              { text: "Order Team Gear", href: "https://coniferbaseball.itemorder.com/shop/home/" },
              { text: "Purchase Required Equipment (see Equipment section above)" },
              { text: "Purchase Hats — $20/hat, checks made out to Conifer Baseball Boosters" },
              { text: "$50 Jersey Deposit Check — bring to practice when teams are announced; must be a separate check (does not get cashed)" },
              { text: "Sign up for Slash Pickup — 2 half-days or 1 full day (players and parents)" },
              { text: "Sign up for 1 Snack Shack shift during a spring game" },
              { text: "Sell at least 15 Rockies vouchers" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C8EFCA] flex items-center justify-center text-[#1B5E20] text-xs font-bold mt-0.5">
                  ✓
                </span>
                {item.href ? (
                  <span>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1B5E20] hover:underline font-semibold"
                    >
                      {item.text} →
                    </a>
                  </span>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Communication */}
      <section id="communication" className="bg-[#F5F0E4] py-16 scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Staying Connected
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-8">
            Communication &amp; Apps
          </h2>

          {/* Jeffco Policy */}
          <div className="mb-8">
            <h3 className="font-barlow font-semibold text-[#111111] text-base mb-4">Jeffco Communication Policy</h3>
            <ul className="space-y-3">
              {[
                "Players may not communicate directly with a coach 1:1 via text or social media DMs.",
                "Players using text must include at least 2 adults on the thread.",
                "Coaches are never allowed to interact with players via social media.",
                "SportsYou is the only approved platform for direct player messaging.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 font-barlow text-[#4A4A4A] text-sm leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C8EFCA] flex items-center justify-center text-[#1B5E20] text-xs font-bold mt-0.5">
                    ✓
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Apps */}
          <h3 className="font-barlow font-semibold text-[#111111] text-base mb-4">Apps to Download</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-white border border-[#e0d8c8] rounded-xl p-5">
              <p className="font-barlow font-semibold text-[#111111] text-sm">SportsYou</p>
              <p className="font-barlow text-[#4A4A4A] text-sm mt-1 leading-relaxed">
                District-approved communication app. You&apos;ll be added to the team roster after registering for spring baseball. Subgroups are created for Varsity, JV, and L3 after team assignments.
              </p>
            </div>
            <div className="bg-white border border-[#e0d8c8] rounded-xl p-5">
              <p className="font-barlow font-semibold text-[#111111] text-sm">Arbiter</p>
              <p className="font-barlow text-[#4A4A4A] text-sm mt-1 leading-relaxed">
                Replaces rSchool for game scheduling, umpire assigning, and game status. Download to stay current on reschedules, cancellations, and postponements.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e0d8c8] rounded-xl p-5 mb-8">
            <p className="font-barlow font-semibold text-[#111111] text-sm">Weekly Email</p>
            <p className="font-barlow text-[#4A4A4A] text-sm mt-1 leading-relaxed">
              One email per week, sent Sunday nights, with all current info and happenings. Make sure your email is on file with the Boosters.
            </p>
          </div>

          {/* 4-step hierarchy */}
          <div>
            <h3 className="font-barlow font-semibold text-[#111111] text-base mb-4">Conifer Communication Policy</h3>
            <div className="space-y-3">
              {[
                { title: "Player-First", detail: "Players address coaches directly with questions or concerns." },
                { title: "Parent Involvement", detail: "If unresolved, parents respectfully request an appointment with coaching staff." },
                { title: "Collaborative Problem-Solving", detail: "Approach concerns with openness, respect, and commitment to the player's growth." },
                { title: "Administrative Support", detail: "If still unresolved, bring to the Athletic Director in collaboration with the Head Coach." },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-[#e0d8c8] rounded-xl p-5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B5E20] flex items-center justify-center text-white font-barlow font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-barlow font-semibold text-[#111111] text-sm">{step.title}</p>
                    <p className="font-barlow text-[#4A4A4A] text-sm mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
