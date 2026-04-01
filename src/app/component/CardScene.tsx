"use client";

import { useEffect, useRef } from "react";
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
import Image01 from "../../../public/assets/img/cards/Q_0.png";

type CardType = {
  img: string | StaticImageData;
};

const CARDS: CardType[] = [
  { img: Image1 },
  { img: Image2 },
  { img: Image3 },
  { img: Image4 },
  { img: Image5 },
  { img: Image6 },
  { img: Image7 },
  { img: Image8 },
  { img: Image9 },
  { img: Image0 },
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

      const rect = outer.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const elMid = rect.top + rect.height / 2;

      const distanceToCenter = Math.abs(viewportMid - elMid);
      const threshold = window.innerHeight * 0.7;

      let raw = 0;
      if (distanceToCenter < threshold) {
        raw = 1 - distanceToCenter / threshold;
      }

      raw = Math.min(1, raw * 1.5);

      // scrollPRef.current += (raw - scrollPRef.current) * 0.15;
      scrollPRef.current += (raw - scrollPRef.current) * 0.09; // <-- slower
      const sc = scrollPRef.current;

      const prog = ease(sc);

      wrapsRef.current.forEach((wrap, i) => {
        if (!wrap) return;

        const isCenter = i === Math.floor(N / 2);
        const moveX = sc * 440;
        const angle = fanAngles[i] * prog;

        // curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.08;
        curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.04; // <-- slower

        const arc = -50 * Math.sin(prog * Math.PI);
        // curYRef.current[i] += (arc - curYRef.current[i]) * 0.08;
        curYRef.current[i] += (arc - curYRef.current[i]) * 0.04; // <-- slower

        wrap.style.transform = `
          translateX(${moveX}px)
          rotateZ(${curAngleRef.current[i]}deg)
          translateY(${curYRef.current[i]}px)
        `;

        wrap.style.opacity = isCenter
          ? "1"
          : String(Math.min(1, sc * 1.5));
      });

      if (tarotRef.current) {
        tarotRef.current.style.opacity = Math.max(
          0,
          (sc - 0.6) * 2.5
        ).toString();
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

      <div
        ref={outerRef}
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{
          // border: "1px solid red",
          height: "100vh",
          background: "#0d0500",
          // fontFamily: "Georgia, serif",
          perspective: "900px",
        }}
      >
        <div className="relative" style={{ width: 1000, height: 400 }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) wrapsRef.current[i] = el;
              }}
              className="absolute cursor-pointer"
              style={{
                width: 250,
                height: 350,
                bottom: 0,
                left: 200,
                transformOrigin: "center bottom",
                opacity: 0,
              }}
            >
              {/* IMPORTANT: relative required for next/image fill */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden relative"
                style={{
                  boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
                  background: "#111",
                }}
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
                    sizes="250px"
                    className="object-cover rounded-2xl"
                    priority={i === 0}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Tarot Text */}
          <div
            ref={tarotRef}
            className="absolute text-white pointer-events-none max-w-[500px]"
            style={{
              left: -90,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 18,
              lineHeight: 1.5,
              opacity: 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <h2 className="heading mb-2.5 text-5xl big-shoulders font-bold">
              The Journey Ahead
            </h2>
            <p className="geist text-[16px] text-[#F5F5F5]">
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