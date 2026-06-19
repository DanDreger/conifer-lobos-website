"use client";

import Link from "next/link";
import { useState } from "react";

const packLinks = [
  { label: "Varsity", href: "/team#varsity" },
  { label: "JV", href: "/team#jv" },
  { label: "L3", href: "/team#l3" },
  { label: "Coaches", href: "/team#coaches" },
  { label: "Boosters", href: "/boosters" },
  { label: "Future Lobos", href: "/future-lobos" },
];

const mainLinks = [
  { label: "Schedule & Events", href: "/schedule" },
  { label: "Fundraising", href: "/fundraising" },
  { label: "Player/Parent Info", href: "/info" },
  { label: "Photos", href: "/photos" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [packOpenMobile, setPackOpenMobile] = useState(false);

  return (
    <nav className="bg-[#111111] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none" onClick={() => setMobileOpen(false)}>
          <span className="font-dancing text-[#C8EFCA] text-2xl leading-none">Lobos</span>
          <span className="font-barlow-condensed text-white text-[10px] uppercase tracking-[0.15em] leading-none mt-0.5">
            Conifer Baseball
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {/* Our Pack dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-white/80 hover:text-white font-barlow font-semibold text-sm uppercase tracking-wide transition-colors">
              Our Pack
              <svg className="w-3 h-3 mt-px" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Dropdown — CSS hover, no JS needed on desktop */}
            <div className="absolute top-full left-0 mt-1 min-w-[190px] bg-[#111111] border border-white/10 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {packLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-barlow font-semibold uppercase text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white font-barlow font-semibold text-sm uppercase tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="bg-[#1B5E20] hover:bg-[#1B5E20]/85 text-white font-barlow font-semibold text-sm uppercase px-4 py-2 rounded transition-colors"
          >
            Donate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/10 px-4 pb-4 space-y-1">
          {/* Our Pack accordion */}
          <button
            className="flex items-center justify-between w-full py-2 text-white/80 font-barlow font-semibold text-sm uppercase"
            onClick={() => setPackOpenMobile(!packOpenMobile)}
          >
            Our Pack
            <svg className={`w-3 h-3 transition-transform ${packOpenMobile ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {packOpenMobile && (
            <div className="pl-3 space-y-1 pb-1">
              {packLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-1 text-sm font-barlow font-semibold uppercase text-white/60 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-white/80 font-barlow font-semibold text-sm uppercase"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              href="#contact"
              className="block text-center bg-[#1B5E20] text-white font-barlow font-semibold text-sm uppercase px-4 py-2 rounded"
              onClick={() => setMobileOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
