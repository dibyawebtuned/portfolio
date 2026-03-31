"use client";

import { useEffect, useRef } from "react";

export default function CharacterSplit() {
    const textRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<any>(null);
    const splitRef = useRef<any>(null);

    useEffect(() => {
        const init = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            // Dynamic imports for plugins
            const SplitTextModule = await import("gsap/SplitText");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const SplitText = SplitTextModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;

            if (!textRef.current || !SplitText || !ScrollTrigger) return;

            gsap.registerPlugin(SplitText, ScrollTrigger);

            document.fonts.ready.then(() => {
                // cleanup previous if exists
                splitRef.current && splitRef.current.revert();
                animationRef.current && animationRef.current.kill();

                // split text into characters
                splitRef.current = new SplitText(textRef.current, {
                    type: "chars",
                });

                // animate characters when section is in viewport
                animationRef.current = gsap.from(splitRef.current.chars, {
                    x: 150,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%", // when top of element hits 80% of viewport
                        toggleActions: "play none none none",
                    },
                });
            });
        };

        init();
    }, []);

    const handleReplay = () => {
        if (animationRef.current) {
            animationRef.current.restart();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
            <div
                ref={textRef}
                className="text-center text-[clamp(2rem,5vw,4rem)] leading-tight max-w-4xl"
            >
                Break apart HTML text into characters for smooth animation.
            </div>

            <button
                onClick={handleReplay}
                className="mt-6 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
                Replay Characters
            </button>
        </div>
    );
}