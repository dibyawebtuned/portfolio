"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagicCards from "../component/UI/MagicCards";

export default function HorizontalScrollText() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!textRef.current || !wrapperRef.current) return;

        const textEl = textRef.current;

        // 🔹 Manual split (same as your HTML version)
        const originalText = textEl.innerText;
        textEl.innerHTML = originalText
            .split("")
            .map((char) =>
                `<span class="char inline-block">${char === " " ? "&nbsp;" : char
                }</span>`
            )
            .join("");

        const chars = textEl.querySelectorAll(".char");

        // 🔹 Horizontal scroll
        const scrollTween = gsap.to(textEl, {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: true,
                scrub: true,
                end: "+=4000",
            },
        });

        // 🔹 Character animations
        chars.forEach((char) => {
            gsap.from(char, {
                yPercent: gsap.utils.random(-200, 200),
                rotation: gsap.utils.random(-20, 20),
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: char,
                    containerAnimation: scrollTween,
                    start: "left 100%",
                    end: "left 30%",
                    scrub: 1,
                },
            });
        });

        // Cleanup (VERY IMPORTANT in Next.js)
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            gsap.killTweensOf("*");
        };
    }, []);

    return (
        <>
            <section
                ref={wrapperRef}
                className="overflow-hidden h-auto flex flex-col items-center"
            >
                <div className="container mx-auto">
                    <h3
                        ref={textRef}
                        className="flex w-max whitespace-nowrap gap-[1vw] pt-[50px] sm:pt-[70px] pl-[50vw] font-semibold leading-tight text-[clamp(2rem,10vw,12rem)]"
                    >
                        Where Magic Meets Mind, Revealing What the Eyes Cannot See.
                    </h3>
                </div>

                <div className="max-w-full sm:max-w-2xl mx-auto">
                    <p className="geist text-center text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed px-[15px]">
                        Attention is everywhere — but true experiences
                        are rare. We create moments that captivate minds
                        and defy explanation.
                    </p>

                    <MagicCards />

                    <p className="geist text-center text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed px-[15px]">
                        His signature style lies in close-up magic —
                        intimate, interactive, and astonishing.
                        Performing directly at tables, he makes objects
                        vanish and reappear in impossible places, often
                        in the very hands of his audience. Cards, cash,
                        borrowed jewelry, strings, even phones become
                        instruments of wonder.
                    </p>
                </div>
            </section>
        </>
    );
}