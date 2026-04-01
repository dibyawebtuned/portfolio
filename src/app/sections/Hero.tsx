"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import AOS from "aos"
import "aos/dist/aos.css"

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
    const [activeIndex, setActiveIndex] = useState(0)

    // Auto-cycle list
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length)
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    // Init AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        })
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
                    <div
                        className="relative w-full max-w-[1440px] h-[750px]"
                        data-aos="fade-up"
                    >
                        <Image
                            src={Image_hero}
                            alt="Magician"
                            fill
                            className="object-contain z-10"
                            priority
                        />
                    </div>

                    {/* TEXT */}
                    <div
                        className="absolute top-16 z-20"
                        data-aos="fade-up"
                    >
                        <p className="text-base text-[#F5F5F5] mb-2 max-w-[400px]">
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
                    <div className="absolute right-[-40px] top-[180px] w-[200px] z-30 floating-card">
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
                <p
                    className="text-sm text-[#F5F5F5] mt-6"
                    data-aos="fade-up"
                >
                    I do believe that <br />
                    <span className="text-[#B9B9B9]">
                        magic is a powerful communication <br />
                        and expression medium.
                    </span>
                </p>

                {/* IMAGE */}
                <div
                    className="relative w-full max-w-[520px] h-[300px]"
                    data-aos="fade-up"
                >
                    <Image
                        src={Image_hero}
                        alt="Magician"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* FLOATING CARD */}
                <div className="absolute right-4 top-[120px] w-[100px] floating-card">
                    <Image src={Image_card} alt="cards" />
                </div>

                <p className="uppercase text-xs tracking-widest text-[#B9B9B9] mt-6">
                    Magician & Mentalist from Nepal
                </p>

                <h1
                    className="uppercase big-shoulders text-6xl font-extrabold leading-tight text-[#F0EBE6] mt-2"
                    data-aos="fade-up"
                >
                    SAMAN <br /> MAHARJAN
                </h1>
            </div>
        </div>
    )
}