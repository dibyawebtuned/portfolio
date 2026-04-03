"use client";

import { useEffect, useRef } from "react";

// ✅ Correct GSAP types
import gsap from "gsap";

const Banner = () => {
    const textRef = useRef<HTMLHeadingElement | null>(null);

    // ✅ Properly typed refs
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const splitRef = useRef<any>(null); // We didn't import SplitTextType properly, and that's fine
    const ctxRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        const init = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            const SplitTextModule = await import("gsap/SplitText");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const SplitText = SplitTextModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;

            if (!textRef.current) return;

            // ✅ Register plugins
            gsap.registerPlugin(SplitText, ScrollTrigger);

            // ✅ Wait for fonts
            await document.fonts.ready;

            // ✅ GSAP context (React-safe)
            ctxRef.current = gsap.context(() => {
                // cleanup old instances
                splitRef.current?.revert();
                animationRef.current?.kill();

                // split text
                splitRef.current = new SplitText(textRef.current!, {
                    type: "chars",
                });

                // animation
                animationRef.current = gsap.from(splitRef.current.chars, {
                    x: 150,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }, textRef);
        };

        init();

        // ✅ Cleanup (VERY important)
        return () => {
            ctxRef.current?.revert();
            splitRef.current?.revert();
            animationRef.current?.kill();
        };
    }, []);

    const handleReplay = () => {
        animationRef.current?.restart();
    };

    return (
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">
            
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: "url('/assets/img/One.png')",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-70 pointer-events-none blur-3xl" />

            {/* Content */}
            <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[80px] py-[50px] md:py-[100px]">
                
                <div className="text-center">
                    <h1
                        ref={textRef}
                        className="big-shoulders text-[#F0EBE6] font-bold mb-4 sm:mb-5 md:mb-6 leading-tight tracking-[0.02em] text-[48px] lg:text-[64px] xl:text-[87px]"
                    >
                        Witness the Magic
                    </h1>

                    <p className="mt-4 mx-auto max-w-full md:max-w-2xl lg:max-w-3xl 
                        text-sm sm:text-base md:text-lg lg:text-xl 
                        leading-relaxed sm:leading-snug md:leading-relaxed 
                        text-center opacity-80">
                        Saman brings wonder to life with breathtaking magic performances for every occasion.
                        Close-up tricks, mentalism, and unforgettable moments await.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-[20px] flex-wrap">
                    <button className="mt-8 px-8 py-4 border border-white rounded-lg text-white font-semibold shadow-lg">
                        Book a Show
                    </button>

                    <button className="mt-8 px-8 py-4 border border-white rounded-lg text-white font-semibold shadow-lg">
                        Learn More
                    </button>

                    {/* Replay Button */}
                    <button
                        onClick={handleReplay}
                        className="mt-8 px-6 py-4 border border-red-400 rounded-lg text-red-400 font-semibold"
                    >
                        Replay Animation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;