"use client";

import { useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";

import Image1 from "../../../public/assets/img/cards/black_3.png";
import Image2 from "../../../public/assets/img/cards/4.png";
import Image3 from "../../../public/assets/img/cards/4_3.png";
import Image4 from "../../../public/assets/img/cards/5.png";
import Image5 from "../../../public/assets/img/cards/5_0.png";
import Image6 from "../../../public/assets/img/cards/A.png";
import Image7 from "../../../public/assets/img/cards/A_0.png";
import Image8 from "../../../public/assets/img/cards/A_2.png";
import Image9 from "../../../public/assets/img/cards/A_4.png";
import Image0 from "../../../public/assets/img/cards/Q.png";

type CardType = { img: string | StaticImageData };

const CARDS: CardType[] = [
  { img: Image1 }, { img: Image2 }, { img: Image3 },
  { img: Image4 }, { img: Image5 }, { img: Image6 },
  { img: Image7 }, { img: Image8 }, { img: Image9 },
  { img: Image0 },
];

const FAN_DEG = 80;
const N = CARDS.length;
const fanAngles = CARDS.map((_, i) => -FAN_DEG / 2 + (i / (N - 1)) * FAN_DEG);

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Derive card dimensions from container width */
function getCardSize(containerW: number) {
  // Card aspect ratio ~5:7. Fit N cards in a fan; 35% of container width = good card width.
  const cardW = Math.min(Math.round(containerW * 0.35), 260);
  const cardH = Math.round(cardW * 1.4);
  return { cardW, cardH };
}

export default function CardFanSection() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const stageRef    = useRef<HTMLDivElement>(null);
  const wrapsRef    = useRef<HTMLDivElement[]>([]);
  const tarotRef    = useRef<HTMLDivElement>(null);

  const curAngleRef = useRef<number[]>(new Array(N).fill(0));
  const curYRef     = useRef<number[]>(new Array(N).fill(0));
  const rafRef      = useRef<number>(0);
  const scrollPRef  = useRef(0);

  // Mutable box so the RAF closure always reads fresh values
  const sizeRef = useRef({ cardW: 200, cardH: 280, containerW: 600, isMobile: false });

  /** Recalculate sizes and reposition card origins */
  const recalc = useCallback(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    const containerW = outer.clientWidth;
    const isMobile   = containerW < 640;
    const { cardW, cardH } = getCardSize(containerW);

    sizeRef.current = { cardW, cardH, containerW, isMobile };

    // Stage height: card + some breathing room
    const stageH = cardH + Math.round(cardH * 0.15);
    stage.style.height = `${stageH}px`;

    wrapsRef.current.forEach((wrap) => {
      if (!wrap) return;
      wrap.style.width  = `${cardW}px`;
      wrap.style.height = `${cardH}px`;
      // Center the stack horizontally inside the fan half
      // On mobile the fan occupies full width; on desktop ~60%
      const fanLeft = isMobile
        ? containerW / 2 - cardW / 2           // center of full width
        : containerW * 0.55 - cardW / 2;       // right portion
      wrap.style.left = `${fanLeft}px`;
    });
  }, []);

  useEffect(() => {
    recalc();

    const ro = new ResizeObserver(recalc);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    function tick() {
      rafRef.current = requestAnimationFrame(tick);

      const rect        = outer!.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const elMid       = rect.top + rect.height / 2;
      const distance    = Math.abs(viewportMid - elMid);
      const threshold   = window.innerHeight * 0.7;

      let raw = distance < threshold ? 1 - distance / threshold : 0;
      raw = Math.min(1, raw * 1.5);

      scrollPRef.current += (raw - scrollPRef.current) * 0.15;
      const sc   = scrollPRef.current;
      const prog = ease(sc);

      const { cardW, containerW, isMobile } = sizeRef.current;

      // How far the stack travels horizontally as it fans out
      const moveX = isMobile
        ? 0                                      // no horizontal drift on mobile
        : sc * (containerW * 0.38);              // scales with container

      wrapsRef.current.forEach((wrap, i) => {
        if (!wrap) return;

        const isCenter = i === Math.floor(N / 2);
        const angle    = fanAngles[i] * prog;

        curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.08;

        const arc = -50 * Math.sin(prog * Math.PI);
        curYRef.current[i] += (arc - curYRef.current[i]) * 0.08;

        wrap.style.transform = `
          translateX(${moveX}px)
          rotateZ(${curAngleRef.current[i]}deg)
          translateY(${curYRef.current[i]}px)
        `;
        wrap.style.opacity = isCenter ? "1" : String(Math.min(1, sc * 1.5));
      });

      if (tarotRef.current) {
        tarotRef.current.style.opacity = Math.max(0, (sc - 0.6) * 2.5).toString();
      }
    }

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        .card-fan-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100svh;          /* safe-area aware */
          background: #0d0500;
          perspective: 900px;
        }

        /* ── Stage: the card fan lives here ── */
        .card-fan-stage {
          position: relative;
          width: 100%;
          max-width: 1100px;
          /* height set dynamically by recalc() */
        }

        /* ── Text overlay ── */
        .card-fan-text {
          position: absolute;
          color: #fff;
          pointer-events: none;
          max-width: 420px;
          opacity: 0;
          transition: opacity 0.6s ease;

          /* Desktop: left side, vertically centred */
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Mobile (≤ 639px): text sits below the fan */
        @media (max-width: 639px) {
          .card-fan-text {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            padding: 1.5rem 1rem 2rem;
            max-width: 100%;
          }
          .card-fan-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
          .card-fan-stage {
            /* let the stage shrink to natural height */
            flex-shrink: 0;
          }
        }

        /* Tablet (640 – 1023px): tighten spacing a bit */
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-fan-text {
            max-width: 320px;
            font-size: 15px;
          }
        }
      `}</style>

      <div ref={outerRef} className="card-fan-section">
        <div ref={stageRef} className="card-fan-stage">
          {CARDS.map((card, i) => (
            <div
              key={i}
              ref={(el) => { if (el) wrapsRef.current[i] = el; }}
              className="absolute cursor-pointer"
              style={{
                bottom: 0,
                transformOrigin: "center bottom",
                opacity: i === Math.floor(N / 2) ? 1 : 0,
              }}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden relative border-2 border-green-600"
                style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.7)", background: "#111" }}
              >
                {typeof card.img === "string" ? (
                  <img
                    src={card.img}
                    alt={`Card ${i + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Image
                    src={card.img}
                    alt={`Card ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 260px"
                    className="object-cover rounded-2xl"
                    priority={i === 0}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Tarot Text */}
          <div ref={tarotRef} className="card-fan-text">
            <h2 className="heading mb-2.5 text-5xl big-shoulders font-bold leading-tight">
              The Journey Ahead
            </h2>
            <p className="geist text-[16px] text-[#F5F5F5] leading-relaxed">
              The cards reveal hidden truths. Courage and wisdom guide you.
              Trust your instincts, embrace change, and let your inner light
              illuminate the path ahead. Challenges may arise, but clarity
              and insight will lead you to fulfillment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}