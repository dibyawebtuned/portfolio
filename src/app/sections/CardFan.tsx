"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import Image1 from "../../../public/assets/img/cards/Component_3.png";
import Image2 from "../../../public/assets/img/cards/component_A_leaf.png";
import Image3 from "../../../public/assets/img/cards/component_4_heart.png";
import Image4 from "../../../public/assets/img/cards/component_A_heart.png";
import Image5 from "../../../public/assets/img/cards/compoenent_5_leaf.png";
import Image6 from "../../../public/assets/img/cards/compoenent_5_diamond.png";
import Image7 from "../../../public/assets/img/cards/compoenent_Q_leaf.png";
import Image8 from "../../../public/assets/img/cards/compoenent_Q_heart.png";
import Image9 from "../../../public/assets/img/cards/compoent_A_heart.png";
import Image10 from "../../../public/assets/img/cards/compenent_A_diamond.png";
import Image01 from "../../../public/assets/img/cards/component_4_diamond.png";

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
  { img: Image10 },
  { img: Image01 },
];

const FAN_DEG = 100;
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
    const tick = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      if (!rect) return;

      const viewportMid = window.innerHeight / 2;
      const elMid = rect.top + rect.height / 2;

      const distanceToCenter = Math.abs(viewportMid - elMid);
      const threshold = window.innerHeight * 0.7;

      let raw = 0;
      if (distanceToCenter < threshold) {
        raw = 1 - distanceToCenter / threshold;
      }

      raw = Math.min(1, raw * 1.5);

      scrollPRef.current += (raw - scrollPRef.current) * 0.09;
      const sc = scrollPRef.current;

      wrapsRef.current.forEach((wrap, i) => {
        if (!wrap) return;

        const isCenter = i === Math.floor(N / 2);
        const moveX = sc * 440;
        const angle = fanAngles[i] * ease(sc);

        curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.04;
        const arc = -50 * Math.sin(ease(sc) * Math.PI);
        curYRef.current[i] += (arc - curYRef.current[i]) * 0.04;

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

      rafRef.current = requestAnimationFrame(tick);
    };

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
          height: "85svh",
          background: "#0d0500",
          perspective: "900px",
        }}
      >
        <div className="relative" style={{ width: 1000, height: 400 }}>
          <div className="">
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
                    // boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
                    // background: "#111",
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
          </div>

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
            <h2 className="big-shoulders text-[#F0EBE6] font-bold mb-4 sm:mb-5 md:mb-6 leading-tight tracking-[0.02em] text-[48px] lg:text-[64px] xl:text-[87px]">
              The Journey Ahead
            </h2>

            <p className="geist text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed px-[15px]">
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