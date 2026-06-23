"use client";

import { useEffect, useRef, useState } from "react";

export type SliderSlide = {
  _id: string;
  type: "NEWS" | "EVENT";
  title: string;
  date: string;
  description?: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WhatsGoingOnSlider({
  slides,
}: {
  slides: SliderSlide[];
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const resetKeyRef = useRef(0);

  const goTo = (index: number) => {
    resetKeyRef.current += 1;
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 180);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setVisible(true);
      }, 180);
    }, 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, slides.length, resetKeyRef.current]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <section
      className="bg-[#111111] py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4">
        <p className="font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#9E9E9E] mb-2">
          Latest
        </p>
        <h2 className="font-barlow-condensed font-bold uppercase text-white text-4xl mb-8">
          What&apos;s Going On
        </h2>

        {/* Slide card */}
        <div
          className="border border-[#1B5E20]/60 rounded-xl p-8 md:p-10 min-h-[180px] transition-opacity duration-150"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <span className="inline-block font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#C8EFCA] bg-[#1B5E20]/30 px-2 py-0.5 rounded mb-4">
            {slide.type}
          </span>
          <h3 className="font-barlow-condensed font-bold uppercase text-white text-2xl md:text-3xl leading-tight mb-2">
            {slide.title}
          </h3>
          <p className="font-barlow text-[#9E9E9E] text-xs mb-3">
            {formatDate(slide.date)}
          </p>
          {slide.description && (
            <p className="font-barlow text-white/65 text-sm leading-relaxed max-w-xl">
              {slide.description.length > 180
                ? slide.description.slice(0, 180).trimEnd() + "…"
                : slide.description}
            </p>
          )}
        </div>

        {/* Controls: prev · dots · next */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-3 h-3 bg-[#C8EFCA]"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}

            <button
              onClick={next}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
