"use client";

import { useEffect, useRef } from "react";

export default function SplitText() {
    const textRef = useRef<HTMLHeadingElement | null>(null);
    const animationRef = useRef<any>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            // @ts-ignore (SplitText is external)
            const SplitText = (await import("gsap/SplitText")).default || (window as any).SplitText;

            // @ts-ignore (ScrollTrigger is external)
            const ScrollTriggerModule = (await import("gsap/ScrollTrigger")).default || (window as any).ScrollTrigger;

            if (!textRef.current || !SplitText || !ScrollTriggerModule) return;

            gsap.registerPlugin(SplitText, ScrollTriggerModule);

            document.fonts.ready.then(() => {
                gsap.set(textRef.current, { opacity: 1 });

                const splitInstance = new SplitText(textRef.current, {
                    type: "lines,words",
                    linesClass: "line",
                });

                animationRef.current = gsap.from(splitInstance.lines, {
                    duration: 1.2,
                    yPercent: 120,
                    opacity: 0,
                    stagger: 0.25,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%", // Trigger when top of element hits 80% of viewport height
                        toggleActions: "play none none none", // Play once
                    },
                });
            });
        };

        loadGSAP();
    }, []);

    const handleReplay = () => {
        if (animationRef.current) {
            animationRef.current.timeScale(0.3).restart();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(129%_99%_at_112%_85%,rgb(223,220,255)_20%,rgb(166,158,255)_90%)] p-10">
            <h1
                ref={textRef}
                className="opacity-0 text-center text-[clamp(2rem,5vw,3rem)] font-black text-black max-w-[80vw]"
            >
                The text in this paragraph is split by words and lines and animated beautifully.
            </h1>

            <button
                onClick={handleReplay}
                className="mt-5 px-6 py-3 rounded-full border-4 border-black uppercase font-semibold cursor-pointer"
            >
                Replay Slowly
            </button>
        </div>
    );
}