"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ⚠️ Adjust path to your local SplitText file
// import SplitText from "@/lib/gsap/SplitText";
import SplitText from "/Library/";

export default function HorizontalText() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        if (!wrapperRef.current || !textRef.current) return;

        gsap.registerPlugin(ScrollTrigger, SplitText);

        const ctx = gsap.context(() => {
            // Split text into chars
            const split = new SplitText(textRef.current, { type: "chars" });

            // Horizontal scroll animation
            const scrollTween = gsap.to(textRef.current, {
                x: () =>
                    -(textRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: () => "+=" + textRef.current!.scrollWidth,
                    pin: true,
                    scrub: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Character animation
            split.chars.forEach((char: HTMLElement) => {
                gsap.from(char, {
                    yPercent: gsap.utils.random(-200, 200),
                    rotation: gsap.utils.random(-20, 20),
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: char,
                        containerAnimation: scrollTween,
                        start: "left 100%",
                        end: "left 30%",
                        scrub: true,
                    },
                });
            });
        }, wrapperRef);

        return () => ctx.revert(); // cleanup
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="h-screen overflow-hidden flex items-center"
        >
            <div className="container mx-auto">
                <h3
                    ref={textRef}
                    className="flex w-max whitespace-nowrap gap-[4vw] pl-[100vw] text-[clamp(2rem,10vw,12rem)] font-semibold leading-[1.1]"
                >
                    The containerAnimation property allows us to create ScrollTriggered
                    animations within a container that's animated horizontally. It's like
                    having nested ScrollTriggers!
                </h3>
            </div>
        </section>
    );
}