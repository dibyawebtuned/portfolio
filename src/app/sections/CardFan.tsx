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

        // Adjust translation and arcs depending on screen size
        const isMobile = window.innerWidth < 768;
        const maxMove = isMobile ? window.innerWidth * 0.05 : 440;
        const moveX = sc * maxMove;

        const angleValue = isMobile ? fanAngles[i] * 0.85 : fanAngles[i];
        const angle = angleValue * ease(sc);

        curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.04;

        const arcMax = isMobile ? -25 : -50;
        const arc = arcMax * Math.sin(ease(sc) * Math.PI);
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
        className="relative w-full overflow-hidden flex items-center justify-center bg-[#0f0f0f]"
        style={{
          height: "85svh",
          background: "#0f0f0f",
          perspective: "900px",
        }}
      >
        <div className="relative w-full max-w-[1000px] h-[550px] md:h-[400px]">
          <div className="absolute inset-0">
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) wrapsRef.current[i] = el;
                }}
                className="absolute cursor-pointer w-[140px] h-[200px] left-1/2 -ml-[70px] bottom-[20px] md:w-[250px] md:h-[350px] md:left-[200px] md:-ml-0 md:bottom-0"
                style={{
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
            className="absolute text-white pointer-events-none w-full px-5 md:px-0 md:max-w-[500px] z-10 left-0 top-[20px] text-center md:left-[-90px] md:top-[50%] -translate-y-0 md:-translate-y-1/2 md:text-left"
            style={{
              opacity: 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <h2 className="big-shoulders text-[#F0EBE6] font-bold mb-3 sm:mb-5 md:mb-6 leading-tight tracking-[0.02em] text-[40px] md:text-[48px] lg:text-[64px] xl:text-[87px]">
              The Story
            </h2>

            <p className="geist text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed px-[15px] md:px-0 text-white/80 md:text-white">
              Saman has been enthralled by magic since 2010. He recalls what he was like as a child.
              He purchased a few tricks and started practicing them with his family and friends.
              After meeting a couple in Pokhara in 2013, Saman was asked to perform a stand-up act at
              their wedding. The reactions to his then-amateurish performance as a magician were astounding,
              and Saman understood he had the ability to develop his newfound pleasure into something
              considerably more professional. He has performed as a Magician in Kathmandu for a range
              of events including corporate events, private parties, weddings, formal dinners, celebrity
              appearances, trade fairs, and festivals. Elevate your next corporate event with a captivating
              and thought-provoking performance that blends magic and keynote speaking to inspire and encourage
              creativity with your audience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}