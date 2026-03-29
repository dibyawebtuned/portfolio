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
        <div className="w-full bg-black py-6 md:py-8">
            <Marquee
                speed={40} // slightly slower = smoother feel on all screens
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
                                alt="logo"
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