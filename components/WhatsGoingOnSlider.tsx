"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    <div className="flex-1 min-w-0 border border-[#1B5E20]/60 rounded-xl overflow-hidden">
      {/* Badge + title */}
      <div className="px-5 md:px-6 pt-6 pb-3">
        <span className="inline-block font-barlow font-semibold uppercase text-[11px] tracking-[0.1em] text-[#C8EFCA] bg-[#1B5E20]/30 px-2 py-0.5 rounded mb-3">
          {slide.type}
        </span>
        <h3 className="font-barlow-condensed font-bold uppercase text-white text-xl md:text-2xl leading-tight line-clamp-2">
          {slide.title}
        </h3>
      </div>

      {/* Image — 16:9 aspect ratio, only when present */}
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
          <p className="font-barlow text-white/65 text-sm leading-relaxed">
            {slide.description.length > 150
              ? slide.description.slice(0, 150).trimEnd() + "…"
              : slide.description}
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
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  // Start false to avoid hydration mismatch — flips to true client-side
  const [isDesktop, setIsDesktop] = useState(false);
  const resetKeyRef = useRef(0);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const step = isDesktop && slides.length >= 2 ? 2 : 1;
  const numPages = Math.ceil(slides.length / step);
  const currentPage = Math.floor(current / step);

  const goToPage = (pageIndex: number) => {
    resetKeyRef.current += 1;
    setVisible(false);
    setTimeout(() => {
      setCurrent(pageIndex * step);
      setVisible(true);
    }, 180);
  };

  const prev = () => goToPage((currentPage - 1 + numPages) % numPages);
  const next = () => goToPage((currentPage + 1) % numPages);

  useEffect(() => {
    if (paused || numPages <= 1) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => {
          const page = Math.floor(c / step);
          return ((page + 1) % numPages) * step;
        });
        setVisible(true);
      }, 180);
    }, 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, numPages, step, resetKeyRef.current]);

  if (!slides.length) return null;

  const visibleSlides = Array.from(
    { length: step },
    (_, i) => slides[(current + i) % slides.length]
  );

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

        {/* Slide area — flex row; 1 card mobile, 2 cards desktop */}
        <div
          className="flex gap-6 transition-opacity duration-150"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {visibleSlides.map((slide, i) => (
            <SlideCard key={`${slide._id}-${i}`} slide={slide} />
          ))}
        </div>

        {/* Controls: prev · page dots · next */}
        {numPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 text-white/60 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
