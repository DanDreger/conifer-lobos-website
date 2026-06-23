"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type SliderSlide = {
  _id: string;
  type: "NEWS" | "EVENT";
  title: string;
  date: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function SlideCard({ slide }: { slide: SliderSlide }) {
  return (
    <div className="border border-[#1B5E20]/60 rounded-xl overflow-hidden h-full">
      {/* Badge + title */}
      <div className="px-5 md:px-6 pt-6 pb-3">
        <span className="inline-block font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#C8EFCA] bg-[#1B5E20]/30 px-2 py-0.5 rounded mb-3">
          {slide.type}
        </span>
        <h3 className="font-barlow-condensed font-bold uppercase text-white text-xl md:text-2xl leading-tight line-clamp-2">
          {slide.title}
        </h3>
      </div>

      {/* Image — 16:9, only when present */}
      {slide.imageUrl && (
        <div className="relative w-full aspect-video">
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt || slide.title}
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
      )}

      {/* Date + description */}
      <div className="px-5 md:px-6 pt-3 pb-6">
        <p className="font-barlow text-[#9E9E9E] text-xs mb-2">
          {formatDate(slide.date)}
        </p>
        {slide.description && (
          <p
            className="font-barlow leading-relaxed line-clamp-3"
            style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}
          >
            {slide.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function WhatsGoingOnSlider({
  slides,
}: {
  slides: SliderSlide[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // Suppress animation on initial mount and on breakpoint switches
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Detect viewport — starts false so SSR/hydration renders 1-up without mismatch
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const step = isDesktop && slides.length >= 2 ? 2 : 1;
  const numPages = Math.ceil(slides.length / step);

  // Reset to page 0 without animation when the step (breakpoint) changes
  useEffect(() => {
    setShouldAnimate(false);
    setCurrentPage(0);
  }, [step]);

  const goToPage = (pageIndex: number) => {
    setShouldAnimate(true);
    setCurrentPage(pageIndex);
  };

  const prev = () => goToPage((currentPage - 1 + numPages) % numPages);
  const next = () => goToPage((currentPage + 1) % numPages);

  // Auto-advance — currentPage in deps resets the timer on every navigation,
  // giving a clean 3500ms gap after each manual or auto advance.
  useEffect(() => {
    if (paused || numPages <= 1) return;
    const t = setInterval(() => {
      setShouldAnimate(true);
      setCurrentPage((p) => (p + 1) % numPages);
    }, 3500);
    return () => clearInterval(t);
  }, [paused, numPages, currentPage]);

  if (!slides.length) return null;

  // Track geometry:
  //   - Track width  = numPages × 100% of container
  //   - Each slide   = (1 / slides.length) × trackWidth = 100/step % of container
  //   - TranslateX   = -(currentPage × 100/numPages)% of track
  //                  = -(currentPage × containerWidth), i.e. one page per 100% shift
  const trackWidthPct = numPages * 100;
  const slideWidthPct = 100 / slides.length;
  const translatePct = currentPage * (100 / numPages);

  return (
    <section
      className="bg-[#111111] py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
          Latest
        </p>
        <h2 className="font-barlow-condensed font-bold uppercase text-white text-4xl mb-8">
          What&apos;s Going On
        </h2>

        {/* Viewport — clips slides that are off-screen during transition */}
        <div className="overflow-hidden">
          {/* Track — all slides in one flex row; translateX drives the animation */}
          <div
            className="flex"
            style={{
              width: `${trackWidthPct}%`,
              transform: `translateX(-${translatePct}%)`,
              transition: shouldAnimate
                ? "transform 400ms ease-in-out"
                : "none",
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide._id}
                className="flex-shrink-0 px-3"
                style={{ width: `${slideWidthPct}%` }}
              >
                <SlideCard slide={slide} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls: prev · page dots · next */}
        {numPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: numPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === currentPage
                    ? "w-3 h-3 bg-[#C8EFCA]"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}

            <button
              onClick={next}
              aria-label="Next"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
