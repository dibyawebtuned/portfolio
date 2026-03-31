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
    const textRef = useRef<HTMLDivElement | null>(null)
    const animationRef = useRef<any>(null)
    const splitRef = useRef<any>(null)

    useEffect(() => {
        const init = async () => {
            const gsap = (await import("gsap")).default
            const SplitText = (await import("gsap/SplitText")).default
            const ScrollTrigger = (await import("gsap/ScrollTrigger")).default

            if (!textRef.current) return

            gsap.registerPlugin(SplitText, ScrollTrigger)

            document.fonts.ready.then(() => {
                splitRef.current?.revert()
                animationRef.current?.kill()

                splitRef.current = new SplitText(textRef.current, {
                    type: "chars",
                })

                animationRef.current = gsap.from(splitRef.current.chars, {
                    x: 150,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                    },
                })
            })
        }

        init()
    }, [])

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length)
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full bg-black text-white overflow-hidden">
            <Nav />

            {/* RADIAL GLOW */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px] bg-[radial-gradient(circle,_#7a0f0f_0%,_transparent_70%)] opacity-70 blur-2xl" />
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden lg:flex relative max-w-[1440px] mx-auto px-[80px] h-screen items-center justify-center">

                <div className="relative w-full">

                    {/* IMAGE */}
                    <div className="relative w-full max-w-[1440px] h-[750px]">
                        <Image
                            src={Image_hero}
                            alt="Magician"
                            fill
                            className="object-contain z-10"
                            priority
                        />
                    </div>

                    {/* TEXT */}
                    <div className="absolute top-16 z-20">

                        <p
                            ref={textRef}
                            className="text-base text-[#F5F5F5] mb-2 max-w-[400px]"
                        >
                            I do believe that <br />
                            <span className="text-[#B9B9B9]">
                                magic is a powerful communication <br />
                                and expression medium.
                            </span>
                        </p>

                        <div className="mt-6 absolute top-[300px]">
                            <p className="uppercase text-sm tracking-widest text-[#B9B9B9] mb-2">
                                Magician & Mentalist from Nepal
                            </p>

                            <h1 className="uppercase big-shoulders text-[100px] font-extrabold leading-[1.1] text-[#F0EBE6]">
                                SAMAN <br /> MAHARJAN
                            </h1>
                        </div>
                    </div>

                    {/* FLOATING CARD */}
                    <div className="absolute right-[-40px] top-[180px] w-[200px] animate-float z-30">
                        <Image src={Image_card} alt="cards" />
                    </div>
                </div>

                {/* RIGHT LIST */}
                <ul className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col gap-3 text-right text-xl geist-medium z-40">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`transition-all duration-500 ${index === activeIndex
                                ? "opacity-100 translate-x-0 text-[#F0EBE6]"
                                : "opacity-70 translate-x-4 text-[#817F7F]"
                                }`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="lg:hidden relative px-6 pt-5 pb-10 flex flex-col items-center text-center">

                {/* TEXT */}
                <p ref={textRef} className="text-sm text-[#F5F5F5] mt-6">
                    I do believe that <br />
                    <span className="text-[#B9B9B9]">
                        magic is a powerful communication <br />
                        and expression medium.
                    </span>
                </p>

                {/* IMAGE */}
                <div className="relative w-full max-w-[520px] h-[300px]">
                    <Image
                        src={Image_hero}
                        alt="Magician"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* FLOATING CARD */}
                <div className="absolute right-4 top-[120px] w-[100px] animate-float">
                    <Image src={Image_card} alt="cards" />
                </div>

                <p className="uppercase text-xs tracking-widest text-[#B9B9B9] mt-6">
                    Magician & Mentalist from Nepal
                </p>

                <h1 className="uppercase big-shoulders text-6xl font-extrabold leading-tight text-[#F0EBE6] mt-2">
                    SAMAN <br /> MAHARJAN
                </h1>

                {/* MOBILE LIST */}
                <ul className="hidden flex gap-4 mt-6 text-xs">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`transition-all ${index === activeIndex ? "text-white" : "text-gray-500"
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
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}