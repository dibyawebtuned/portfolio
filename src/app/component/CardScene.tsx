"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  { img: "https://picsum.photos/300/400?1" },
  { img: "https://picsum.photos/300/400?2" },
  { img: "https://picsum.photos/300/400?3" },
  { img: "https://picsum.photos/300/400?4" },
  { img: "https://picsum.photos/300/400?5" },
  { img: "https://picsum.photos/300/400?6" },
  { img: "https://picsum.photos/300/400?7" },
  { img: "https://picsum.photos/300/400?8" },
  { img: "https://picsum.photos/300/400?9" },
  { img: "https://picsum.photos/300/400?10" },
];

const FAN_DEG = 80;
const N = CARDS.length;

const fanAngles = CARDS.map(
  (_, i) => -FAN_DEG / 2 + (i / (N - 1)) * FAN_DEG
);

function ease(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function CardFanSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const wrapsRef = useRef<HTMLDivElement[]>([]);
  const tarotRef = useRef<HTMLDivElement>(null);
  const curAngleRef = useRef<number[]>(new Array(N).fill(0));
  const curYRef = useRef<number[]>(new Array(N).fill(0));
  const rafRef = useRef<number>(0);
  const scrollPRef = useRef(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    function tick() {
      rafRef.current = requestAnimationFrame(tick);

      // Derive scroll progress 0→1 from how far the outer container has scrolled past the viewport top
      const rect = outer!.getBoundingClientRect();
      const scrollable = outer!.scrollHeight - window.innerHeight;
      const raw = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;

      // Smooth the progress value
      scrollPRef.current += (raw - scrollPRef.current) * 0.06;
      const sc = scrollPRef.current;

      const phase1 = Math.min(sc / 0.4, 1);
      const phase2 = Math.max((sc - 0.4) / 0.6, 0);

      wrapsRef.current.forEach((wrap, i) => {
        if (!wrap) return;
        const isCenter = i === Math.floor(N / 2);
        const moveX = phase1 * 440;
        const prog = ease(phase2);
        const angle = fanAngles[i] * prog;
        curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.08;
        const arc = -50 * Math.sin(prog * Math.PI);
        curYRef.current[i] += (arc - curYRef.current[i]) * 0.08;

        wrap.style.transform = `translateX(${moveX}px) rotateZ(${curAngleRef.current[i]}deg) translateY(${curYRef.current[i]}px)`;
        wrap.style.opacity =
          phase1 < 1
            ? isCenter ? "1" : "0"
            : String(Math.min(1, phase2 * 1.2));
      });

      const tarot = tarotRef.current;
      if (!tarot) return;

      if (sc >= 0.99) {
        tarot.style.opacity = "1";
        const lastCard = wrapsRef.current[N - 1]?.getBoundingClientRect();
        if (lastCard) {
          tarot.style.top = `${window.innerHeight / 2 - tarot.offsetHeight / 2}px`;
          tarot.style.left = `${lastCard.left - tarot.offsetWidth - 20}px`;
        }
      } else {
        tarot.style.opacity = "0";
      }
    }

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @keyframes hint-bob {
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>

      {/*
        OUTER: tall scroll container (300vh).
        This is what gives the section its "scroll budget".
        The page scrolls normally through it — no wheel hijacking needed.
        Increase to 400vh or 500vh for a slower, longer animation.
      */}
      <div
        ref={outerRef}
        style={{ height: "300vh", background: "#0d0500" }}
      >
        {/*
          INNER: sticky viewport panel.
          Sticks to top of screen while the outer div scrolls behind it.
          This is the correct pattern for scroll-driven animations in React/Next.js.
        */}
        <div
          className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
          style={{
            height: "100vh",
            fontFamily: "Georgia, serif",
            perspective: "900px",
          }}
        >
          {/* Fan root — centred in the sticky panel */}
          <div className="relative" style={{ width: 1000, height: 400 }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => { if (el) wrapsRef.current[i] = el; }}
                className="absolute cursor-pointer"
                style={{
                  width: 250,
                  height: 350,
                  bottom: 0,
                  left: 0,
                  transformOrigin: "center bottom",
                  opacity: 0,
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
                    background: "#111",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.img}
                    alt={`Card ${i + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ filter: "contrast(1.05) saturate(1.05)" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 text-[10px] tracking-[0.4em]"
            style={{ animation: "hint-bob 2s infinite" }}
          >
            SCROLL ↓
          </div>

          {/*
            Tarot text — stays fixed in the viewport.
            top/left are computed in the RAF loop using getBoundingClientRect
            of the last card, which is viewport-relative, so fixed is correct here.
          */}
          <div
            ref={tarotRef}
            className="fixed text-white pointer-events-none max-w-[300px]"
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              opacity: 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <h2 className="mb-2.5 text-[22px] font-serif">The Journey Ahead</h2>
            <p className="text-base font-serif">
              The cards reveal hidden truths. Courage and wisdom guide you. Trust
              your instincts, embrace change, and let your inner light illuminate
              the path ahead. Challenges may arise, but clarity and insight will
              lead you to fulfillment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}