"use client"

import React from "react"
import Marquee from "react-fast-marquee"
import Image from "next/image"

const logos = [
    "/assets/img/sponsr/image_1.png",
    "/assets/img/sponsr/image_2.png",
    "/assets/img/sponsr/image_3.png",
    "/assets/img/sponsr/image_4.png",
    "/assets/img/sponsr/image_5.png",
    "/assets/img/sponsr/image_1.png",
    "/assets/img/sponsr/image_2.png",
    "/assets/img/sponsr/image_3.png",
]

const LogoMarquee = () => {
    return (
        <div className="relative w-full bg-black py-6 overflow-hidden">
            {/* LEFT GRADIENT */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-50 z-10 bg-gradient-to-r from-black to-transparent" />

            {/* RIGHT GRADIENT */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-50 z-10 bg-gradient-to-l from-black to-transparent" />

            <Marquee
                speed={40}
                pauseOnHover={false}
                gradient={false}
            >
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="mx-4 sm:mx-6 md:mx-10 flex items-center"
                    >
                        <div className="relative h-8 sm:h-10 md:h-12 lg:h-14 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px]">
                            <Image
                                src={logo}
                                alt={`logo-${index}`}
                                fill
                                className="object-contain opacity-70 hover:opacity-100 transition duration-300"
                            />
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    )
}

export default LogoMarquee