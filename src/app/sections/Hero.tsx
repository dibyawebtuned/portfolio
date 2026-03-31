"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Image_hero from "../../../public/assets/img/One.png"
import Image_card from "../../../public/assets/img/cards.png"
import Nav from "../component/layout/Nav"

const items = [
    "Virtual Shows",
    "Corporate Events",
    "Private Events",
    "Special Events",
]

export default function MagicianPortfolio() {

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

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length)
        }, 1500)
        return () => clearInterval(interval)
    }, [])



    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
            {/* NAVIGATION */}
            <Nav />

            {/* RED RADIAL GLOW */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[900px] h-[900px] sm:w-[600px] sm:h-[600px] bg-[radial-gradient(circle,_#7a0f0f_0%,_transparent_70%)] opacity-70 blur-2xl" />
            </div>

            {/* HERO SECTION */}
            <div className="relative max-w-[1440px] mx-auto px-[80px] h-screen flex items-center justify-center">
                {/* HERO IMAGE */}
                <div className="relative w-full">
                    <div className="relative w-full max-w-[600px] sm:max-w-[600px] lg:max-w-[1440px] h-[500px] sm:h-[650px] md:h-[700px] lg:h-[750px]">
                        <Image
                            src={Image_hero}
                            alt="Magician"
                            fill
                            className="object-contain z-10"
                            priority
                        />
                    </div>

                    {/* OVERLAPPING TEXT */}
                    <div className="absolute top-16 z-20">
                        {/* TOP */}
                        <div className="">
                            <p
                                ref={textRef}
                                className="text-sm sm:text-base text-[#F5F5F5] mb-2 max-w-[350px] sm:max-w-[400px]">
                                I do believe that <br />
                                <span className="text-[#B9B9B9]">
                                    magic is a powerful communication <br />
                                    and expression medium.
                                </span>
                            </p>
                        </div>

                        {/* BOTTOM */}
                        <div className="mt-6 absolute bottom-[-500] ">
                            <p className="uppercase text-xs sm:text-sm tracking-widest text-[#B9B9B9] mb-2">
                                Magician & Mentalist from Nepal
                            </p>
                            <h1 className="uppercase big-shoulders text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-extrabold leading-[1.1] tracking-[2%] text-[#F0EBE6]">
                                SAMAN <br /> MAHARJAN
                            </h1>
                        </div>
                    </div>

                    {/* FLOATING CARDS */}
                    <div className="absolute right-[-20px] sm:right-[-40px] top-[150px] sm:top-[180px] w-[150px] sm:w-[180px] md:w-[200px] animate-float z-30">
                        <Image src={Image_card} alt="cards" className="object-contain" />
                    </div>
                </div>

                {/* ROTATING LIST ON RIGHT */}
                <ul className="absolute top-23 right-10 transform -translate-y-1/2 flex flex-col gap-3 text-right text-lg sm:text-xl geist-medium z-40">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`transition-all duration-500 ${index === activeIndex
                                ? "opacity-100 translate-x-0 text-[#F0EBE6]"
                                : "opacity-70 translate-x-2 sm:translate-x-4 text-[#817F7F]"
                                }`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* FLOAT ANIMATION */}
            <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}