"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import Image1 from "../../../public/assets/img/325602704_750515326670699_7945634941744234587_n.jpg";
import Image2 from "../../../public/assets/img/325708854_712621500417857_18698700844415858_n.jpg";
import Image3 from "../../../public/assets/img/325715182_5739234289445565_3939970997686376121_n.jpg";
import Image4 from "../../../public/assets/img/325768321_3408275849391559_8724471947943424731_n.jpg";
import Image5 from "../../../public/assets/img/325809555_689754782788133_7965496872996652222_n.jpg";
import Image6 from "../../../public/assets/img/325898244_123644257071868_1026945039984908365_n.jpg";
import Image7 from "../../../public/assets/img/622120451_18087871415087154_4320207763850126380_n.jpg";
import Image8 from "../../../public/assets/img/622901083_18009066830827379_1187831166489400131_n.jpg";
import Image9 from "../../../public/assets/img/624490739_17976261383817865_5403844401383955609_n.jpg";
import Image10 from "../../../public/assets/img/625159026_18098062882911256_42396779877274350_n.jpg";

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
];

const FAN_DEG = 80;
const N = CARDS.length;

const fanAngles = CARDS.map(
    (_, i) => -FAN_DEG / 2 + (i / (N - 1)) * FAN_DEG
);

function ease(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

            // Responsiveness Checks
            const isMobile = window.innerWidth < 768;
            // On mobile, keep it centered. On desktop, shift right by 22% of screen width.
            const shiftX = isMobile ? 0 : window.innerWidth * 0.22;
            // Slightly reduce the fan angle on mobile to prevent overflow
            const mobileAngleScale = isMobile ? 0.8 : 1;
            // Reduce the upward bounce arc on smaller screens
            const maxArc = isMobile ? -30 : -50;

            wrapsRef.current.forEach((wrap, i) => {
                if (!wrap) return;

                const isCenter = i === Math.floor(N / 2);
                const moveX = sc * shiftX;
                const angle = fanAngles[i] * mobileAngleScale * ease(sc);

                curAngleRef.current[i] += (angle - curAngleRef.current[i]) * 0.04;
                const arc = maxArc * Math.sin(ease(sc) * Math.PI);
                curYRef.current[i] += (arc - curYRef.current[i]) * 0.04;

                // Use calc(-50% + moveX) because we initially center it using left: 50%
                wrap.style.transform = `
          translateX(calc(-50% + ${moveX}px))
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
        <div
            ref={outerRef}
            className="relative w-full overflow-hidden flex items-center justify-center bg-[#0d0500]"
            style={{
                height: "100svh", // 'svh' avoids layout jumps on mobile browsers with dynamic URL bars
                minHeight: "600px",
                perspective: "900px",
            }}
        >
            <div className="relative w-full max-w-7xl h-full mx-auto">

                {/* Tarot Text */}
                <div
                    ref={tarotRef}
                    className="absolute z-10 text-white pointer-events-none w-[90%] md:w-full 
                     max-w-[400px] lg:max-w-[500px] text-center md:text-left drop-shadow-lg"
                    style={{
                        // Position top-center on mobile, middle-left on desktop
                        top: "12%",
                        left: "50%",
                        transform: "translateX(-50%)", // Replaced by CSS classes via Tailwind logic below, keeping minimal inline overrides
                        opacity: 0,
                        transition: "opacity 0.6s ease",
                    }}
                >
                    {/* Overriding inline left/transform with md: utilities to place it properly on larger screens */}
                    <style>{`
            @media (min-width: 768px) {
              div[data-tarot-text] {
                top: 50% !important;
                left: 8% !important;
                transform: translateY(-50%) !important;
              }
            }
          `}</style>

                    <div data-tarot-text className="w-full h-full absolute inset-0 hidden"></div>

                    <h2 className="mb-2.5 text-4xl md:text-5xl font-bold tracking-wide">
                        The Journey Ahead
                    </h2>
                    <p className="text-[14px] md:text-[16px] text-[#F5F5F5] leading-relaxed">
                        The cards reveal hidden truths. Courage and wisdom guide you.
                        Trust your instincts, embrace change, and let your inner light
                        illuminate the path ahead. Challenges may arise, but clarity
                        and insight will lead you to fulfillment.
                    </p>
                </div>

                {/* Cards */}
                {CARDS.map((card, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) wrapsRef.current[i] = el;
                        }}
                        className="absolute cursor-pointer bottom-[10%] md:bottom-[15%] left-1/2 
                       w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] md:w-[250px] md:h-[350px]"
                        style={{
                            transformOrigin: "center bottom",
                            opacity: 0,
                        }}
                    >
                        <div
                            className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative bg-[#111]"
                            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.7)" }}
                        >
                            {typeof card.img === "string" ? (
                                <img
                                    src={card.img}
                                    alt={`Card ${i + 1}`}
                                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                                />
                            ) : (
                                <Image
                                    src={card.img}
                                    alt={`Card ${i + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 180px, 250px"
                                    className="object-cover rounded-xl md:rounded-2xl"
                                    priority={i === 0}
                                />
                            )}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}