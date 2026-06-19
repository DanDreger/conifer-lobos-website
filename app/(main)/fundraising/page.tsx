import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fundraising | Conifer Lobos Baseball" };

const navItems = [
  { id: "rockies", label: "Rockies Vouchers" },
  { id: "kingsoopers", label: "King Soopers" },
  { id: "safeway", label: "Safeway" },
  { id: "slash", label: "Slash" },
  { id: "camp", label: "Summer Camp" },
];

export default function FundraisingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-dancing text-[#C8EFCA] text-3xl mb-2">Support the Pack</p>
          <div className="w-10 h-[3px] bg-[#1B5E20] mb-4" />
          <h1 className="font-barlow-condensed font-black text-white uppercase text-6xl">
            Fundraising
          </h1>
          <div className="flex flex-wrap gap-3 mt-8">
            {navItems.map((s) => (
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

      {/* Rockies Vouchers */}
      <section id="rockies" className="py-16 scroll-mt-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Colorado Rockies
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Colorado Rockies Voucher Sales
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            Each family sells 15 vouchers at $50 each annually. The largest impact comes from group and corporate sales — church groups, workplaces, and scout troops are all great targets. Booth sales also run at Big R Conifer and King Soopers throughout the season.
          </p>

          <div className="mt-6 bg-[#C8EFCA] border border-[#7BC47F] rounded-xl p-6">
            <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#1B5E20] mb-2">
              Group Sales
            </p>
            <p className="font-barlow text-[#4A4A4A] text-sm leading-relaxed">
              Groups of 17 or more receive block seating reserved in advance. This is the highest-impact way to sell — think workplaces, churches, HOAs, and scout troops.
            </p>
          </div>

          <div className="mt-6">
            <p className="font-barlow font-semibold text-[#111111] text-sm mb-3">Sign up for a booth shift:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.signupgenius.com/go/10C0C4BA4AB28A7FECF8-56317826-rockies#/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold uppercase text-sm px-5 py-2.5 rounded transition-colors"
              >
                Big R Conifer Booth
              </a>
              <a
                href="https://www.signupgenius.com/go/10C0C4BA4AB28A7FECF8-60697535-rockies#/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold uppercase text-sm px-5 py-2.5 rounded transition-colors"
              >
                King Soopers Booth
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#e0e0e0]">
            <p className="font-barlow font-semibold text-[#111111] text-sm mb-2">Questions? Contact:</p>
            <p className="font-barlow text-[#4A4A4A] text-sm">
              Karen Kitchner —{" "}
              <a href="tel:6077256565" className="text-[#1B5E20] hover:underline">607-725-6565</a>
            </p>
            <p className="font-barlow text-[#4A4A4A] text-sm">
              Christina Haydon —{" "}
              <a href="tel:2087247448" className="text-[#1B5E20] hover:underline">208-724-7448</a>
            </p>
            <a
              href="mailto:lobosrockiesvouchers@gmail.com"
              className="font-barlow text-[#1B5E20] hover:underline text-sm"
            >
              lobosrockiesvouchers@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* King Soopers */}
      <section id="kingsoopers" className="py-16 scroll-mt-14 bg-[#F5F0E4]">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            King Soopers
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            King Soopers Community Rewards
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            Link your King Soopers account to Conifer Baseball Boosters and <strong>5% of every grocery purchase</strong> is donated back to the program at no cost to you. You shop as you normally would — the program earns automatically.
          </p>

          <div className="mt-6 space-y-3">
            <p className="font-barlow font-semibold text-[#111111] text-sm">How to enroll:</p>
            {[
              "Download the King Soopers app",
              'Tap Menu → Rewards → Community Rewards',
              'Search "Conifer Baseball"',
              'Tap Enroll next to "Conifer Baseball Boosters"',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1B5E20] text-white font-barlow font-bold text-xs flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="font-barlow text-[#4A4A4A] text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#e0d8c8]">
            <p className="font-barlow text-[#4A4A4A] text-sm">
              Questions? Contact Suzzette Rummell —{" "}
              <a href="tel:3039071186" className="text-[#1B5E20] hover:underline">(303) 907-1186</a>
            </p>
          </div>
        </div>
      </section>

      {/* Safeway */}
      <section id="safeway" className="py-16 scroll-mt-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Safeway
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Safeway Rewards Program
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            Purchase a Safeway Reward Gift Card from Conifer Baseball Boosters for <strong>$5.00</strong>. Load up to $500 and use it at any Safeway or Albertsons store. <strong>5% of every purchase</strong> is donated back to the program.
          </p>

          <div className="mt-6 bg-[#C8EFCA] border border-[#7BC47F] rounded-xl p-6 space-y-1">
            <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#1B5E20] mb-2">
              How to get a card
            </p>
            <p className="font-barlow text-[#4A4A4A] text-sm">Cards are available at the Snack Shack at home games.</p>
            <p className="font-barlow text-[#4A4A4A] text-sm">
              Or contact Suzzette Rummell —{" "}
              <a href="tel:3039071186" className="text-[#1B5E20] hover:underline">(303) 907-1186</a>
            </p>
          </div>
        </div>
      </section>

      {/* Slash */}
      <section id="slash" className="py-16 scroll-mt-14 bg-[#F5F0E4]">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Volunteer Service
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Summer Slash Fundraisers
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            Three weekends each summer, volunteer teams clear flammable organic material from properties in the Conifer area. All families are expected to volunteer for two half-days. Dates are posted when finalized.
          </p>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mt-4">
            Slash is a dual-benefit fundraiser: it reduces wildfire risk for our community and directly funds the baseball program.
          </p>
          <p className="font-barlow text-[#9E9E9E] text-sm mt-6">
            Dates TBA — follow us on Instagram and Facebook for announcements.
          </p>
        </div>
      </section>

      {/* Summer Camp */}
      <section id="camp" className="py-16 scroll-mt-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
            Summer Camp
          </p>
          <h2 className="font-barlow-condensed font-bold uppercase text-[#111111] text-4xl mb-6">
            Little League Summer Camp
          </h2>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed">
            An annual camp for players ages 8–14, held on the Conifer High School baseball field. Campers learn from the coaching staff, develop fundamentals, and get a positive first experience with Conifer Baseball.
          </p>
          <p className="font-barlow text-[#4A4A4A] text-base leading-relaxed mt-4">
            The camp is a consistently successful fundraiser for the program — a great way to support Lobo Baseball while introducing the next generation to the game.
          </p>
          <a
            href="mailto:boosters@coniferlobos.com"
            className="inline-block mt-6 bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold uppercase text-sm px-6 py-3 rounded transition-colors"
          >
            Get Camp Info
          </a>
        </div>
      </section>
    </>
  );
}
