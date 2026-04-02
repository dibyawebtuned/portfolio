"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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

        // 🔥 Cleanup (VERY IMPORTANT in Next.js)
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            gsap.killTweensOf("*");
        };
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="overflow-hidden h-screen flex items-center"
        >
            <div className="container mx-auto">
                <h3
                    ref={textRef}
                    className="flex w-max whitespace-nowrap gap-[4vw] pl-[100vw] font-semibold leading-tight text-[clamp(2rem,10vw,12rem)]"
                >
                    The containerAnimation property allows us to create ScrollTriggered
                    animations within a container that is animated horizontally.
                </h3>
            </div>
        </section>
    );
}