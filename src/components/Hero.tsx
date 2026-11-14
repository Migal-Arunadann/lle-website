import { useEffect, useRef, useState } from "react";
import InteractiveHoverButton from "./InteractiveHoverButton";
import {
  Asterisk,
  CountUp,
  ScrambleWord,
} from "../lib/motion";
import { STATS } from "../lib/data";
import { goRoute, goSection } from "../lib/router";

const WORDS = ["SELL.", "SCALE.", "CONVERT.", "LEAD."];

const PILLARS = [
  "Websites",
  "E-Commerce",
  "Shopify",
  "Medical Content",
  "Android & Apps",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play the video smoothly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="top" className="relative min-h-[96vh] overflow-hidden bg-ink">
      {/* ------------------------------------------------------------ */}
      {/* 1. Full-size background video with cinematic grading         */}
      {/* ------------------------------------------------------------ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="./hero-video-poster.jpg"
          style={{
            objectPosition: "100% center",
            transform: "scale(1.08) translate(3%, 0)",
            filter: "brightness(0.72) contrast(1.15)",
          }}
          className="h-full w-full object-cover transition-all duration-700"
        >
          <source src="./hero-pexels-office.mp4" type="video/mp4" />
          <source src="./hero-programming-dark.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient overlays: deep charcoal on left for razor-sharp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 via-45% to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-ink/20" />

        {/* Ambient brand glow points */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[440px] w-[440px] rounded-full bg-coral/[0.07] blur-[130px]" />
        <div className="pointer-events-none absolute right-12 bottom-1/3 h-[420px] w-[420px] rounded-full bg-aqua/[0.06] blur-[120px]" />

        {/* Subtle grid lines pattern */}
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* 2. Foreground Hero Content                                   */}
      {/* ------------------------------------------------------------ */}
      <div className="relative z-10 mx-auto flex min-h-[96vh] max-w-7xl flex-col justify-between px-5 pt-28 pb-8 md:px-8 md:pt-36">
        <div>
          {/* Top meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line/90 bg-ink-2/90 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/90 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
              </span>
              <span>Digital Growth Studio</span>
              <span className="text-line">/</span>
              <span className="text-coral">Listen · Learn · Engage</span>
            </div>

            {/* Video playback controller */}
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause background reel" : "Play background reel"}
              className="group inline-flex items-center gap-2.5 rounded-full border border-line/80 bg-ink-2/80 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist backdrop-blur-md transition-all hover:border-coral/80 hover:text-paper"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink-3 text-coral">
                {isPlaying ? (
                  <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 3h3v10H4zM9 3h3v10H9z" />
                  </svg>
                ) : (
                  <svg className="h-2 w-2 translate-x-0.5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 3l9 5-9 5z" />
                  </svg>
                )}
              </span>
              <span>{isPlaying ? "Reel Active" : "Reel Paused"}</span>
            </button>
          </div>

          {/* Monumental Headline */}
          <div className="mt-8 max-w-5xl">
            <h1 className="font-display font-extrabold uppercase tracking-tight">
              <span className="block text-[12vw] leading-[0.88] text-paper sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[7.6rem]">
                We make brands
              </span>
              <span className="block text-[12vw] leading-[0.92] text-coral sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[7.6rem] drop-shadow-[0_4px_36px_rgba(255,77,46,0.25)]">
                <ScrambleWord words={WORDS} />
              </span>
            </h1>

            {/* Subtext description */}
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-mist md:text-lg font-normal">
              LLE Social Media crafts high-impact{" "}
              <span className="text-paper font-semibold">Websites</span>,{" "}
              <span className="text-paper font-semibold">E-Commerce & Shopify Stores</span>,{" "}
              <span className="text-paper font-semibold">Medical Content</span>, and{" "}
              <span className="text-paper font-semibold">Mobile Apps</span>. We build digital
              experiences engineered to turn curiosity into customers and scale businesses.
            </p>

            {/* Action buttons sitting cleanly in front */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <InteractiveHoverButton
                href="about-us"
                onClick={() => goRoute("about-us")}
                className="border-coral bg-coral/15 px-7 py-4 backdrop-blur-md shadow-xl hover:bg-coral hover:text-ink"
                dotClass="bg-coral"
                textClass="text-coral"
                hoverTextClass="text-ink"
              >
                More on LLE Social Media
              </InteractiveHoverButton>

              <InteractiveHoverButton
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  goSection("work");
                }}
                className="border-line/90 bg-ink-2/70 px-7 py-4 backdrop-blur-md hover:border-paper"
                dotClass="bg-paper"
                textClass="text-paper"
                hoverTextClass="text-ink"
              >
                See Our Works
              </InteractiveHoverButton>
            </div>

            {/* Capability chips */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {PILLARS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-ink-2/75 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/80 backdrop-blur-sm shadow-sm"
                >
                  <Asterisk className="h-2.5 w-2.5 text-coral" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 3. Stat Strip HUD                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="mt-14">
          <div className="rounded-2xl border border-line/80 bg-ink-2/80 p-6 backdrop-blur-md shadow-2xl sm:p-7">
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-3 sm:px-6 ${
                    i > 0 ? "sm:border-l sm:border-line/70" : ""
                  }`}
                >
                  <p className="font-display text-3xl font-bold text-paper md:text-4xl lg:text-5xl">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mist md:text-[11px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom scroll cue */}
          <div className="flex items-center justify-between pt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-mist/75">
              Scroll · Discover the Crafts
            </p>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                goSection("about");
              }}
              aria-label="Scroll to next section"
              className="group flex items-center gap-2 font-mono text-xs text-coral transition-colors hover:text-paper"
            >
              <span className="hidden uppercase tracking-[0.2em] sm:inline text-[10px]">
                Explore
              </span>
              <span className="animate-cue rounded-full border border-coral/40 p-1.5 transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-ink">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M8 2v11M3 9l5 5 5-5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
