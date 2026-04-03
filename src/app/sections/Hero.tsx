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
        <div className="relative w-full bg-black text-white overflow-hidden" id="home">
            <Nav />

            {/* RADIAL GLOW */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px] bg-[radial-gradient(circle,_#7a0f0f_0%,_transparent_70%)] opacity-70 blur-2xl" />
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden lg:flex relative max-w-[1440px] mx-auto px-[40px] sm:px-[80px] min-h-[700px] h-[100vh] max-h-[1080px] items-center justify-center overflow-hidden">
                <style>
                    {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    `}
                </style>

                <div className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] flex items-center">

                    {/* IMAGE */}
                    <div className="absolute inset-0 w-full h-full flex justify-center pointer-events-none" data-aos="fade-up">
                        <Image
                            src={Image_hero}
                            alt="Magician"
                            fill
                            className="object-contain object-bottom z-10"
                            priority
                        />
                    </div>

                    {/* TEXT ALIGNMENT */}
                    <div className="relative z-20 flex flex-col justify-between h-full w-full py-12" data-aos="fade-up">
                        {/* Top Text */}
                        <div className="max-w-[400px]">
                            <p className="text-base text-[#F5F5F5] leading-relaxed">
                                I do believe that <br />
                                <span className="text-[#B9B9B9]">
                                    magic is a powerful communication <br />
                                    and expression medium.
                                </span>
                            </p>
                        </div>

                        {/* Bottom Text */}
                        <div className="mt-auto pb-4">
                            <p className="uppercase text-sm xl:text-base tracking-widest text-[#B9B9B9] mb-4">
                                Magician & Mentalist from Nepal
                            </p>

                            <h1 className="uppercase big-shoulders text-[90px] xl:text-[110px] 2xl:text-[130px] font-extrabold leading-[0.95] text-[#F0EBE6]">
                                SAMAN <br /> MAHARJAN
                            </h1>
                        </div>
                    </div>

                    {/* FLOATING CARD */}
                    <div
                        className="absolute right-[10%] xl:right-[15%] top-[20%] w-[130px] xl:w-[180px] z-30"
                        style={{
                            animation: "float 4s ease-in-out infinite",
                        }}
                    >
                        <Image src={Image_card} alt="cards" className="w-full h-auto" />
                    </div>

                    {/* RIGHT LIST */}
                    <ul className="absolute top-[10px] -right-4 xl:right-[20px] flex flex-col gap-3 xl:gap-4 text-right text-lg xl:text-xl z-40 geist font-medium">
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
            </div>

            {/* ================= MOBILE & TABLET ================= */}
            <div className="lg:hidden relative px-6 md:px-12 pt-[20px] pb-12 flex flex-col items-center text-center min-h-[100svh] justify-center overflow-hidden">
                <style>
                    {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    `}
                </style>

                <p className="text-sm md:text-base text-[#F5F5F5] mb-8 md:mb-12 max-w-[400px] z-20" data-aos="fade-up">
                    I do believe that <br />
                    <span className="text-[#B9B9B9]">
                        magic is a powerful communication <br />
                        and expression medium.
                    </span>
                </p>

                {/* IMAGE & FLOATING ASSETS CONTAINER */}
                <div className="relative w-full max-w-[450px] md:max-w-[600px] h-[45vh] min-h-[350px] mb-8 z-10" data-aos="fade-up">
                    <Image
                        src={Image_hero}
                        alt="Magician"
                        fill
                        className="object-contain object-bottom"
                        priority
                    />

                    {/* FLOATING CARD */}
                    <div
                        className="absolute right-0 md:right-[10%] top-[15%] w-[90px] md:w-[130px]"
                        style={{ animation: "float 4s ease-in-out infinite" }}
                    >
                        <Image src={Image_card} alt="cards" className="w-full h-auto" />
                    </div>
                </div>

                {/* BOTTOM TEXT */}
                <div className="flex flex-col items-center justify-end z-20 mt-auto">
                    <p className="uppercase text-xs md:text-sm tracking-widest text-[#B9B9B9] mb-3 md:mb-4">
                        Magician & Mentalist from Nepal
                    </p>

                    <h1
                        className="uppercase big-shoulders text-[65px] md:text-[90px] font-extrabold leading-[0.95] text-[#F0EBE6]"
                        data-aos="fade-up"
                    >
                        SAMAN <br /> MAHARJAN
                    </h1>
                </div>
            </div>
        </div>
    )
}