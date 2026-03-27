"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Marquee from "react-fast-marquee"

const items = [
    "Virtual Shows",
    "Corporate Events",
    "Private Events",
    "Special Events"
]

const Footer = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length)
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    return (
        <footer className='w-full bg-[#070707] text-white'>
            <div className='max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20'>
                <div className='py-16 md:py-24 flex flex-col gap-12 md:gap-16'>
                    {/* ================= TOP SECTION ================= */}
                    <div className='flex flex-col lg:flex-row justify-between'>
                        {/* MAIL */}
                        <div className='flex-6 flex flex-col gap-2'>
                            <span className='uppercase text-[#D3D3D3] text-sm md:text-base geist geist-regular'>
                                Reach Out Anytime
                            </span>

                            <Link href="" className='geist text-[#D3D3D3] text-2xl sm:text-3xl md:text-5xl lg:text-[57px] font-medium break-all'>
                                bookings@samanmaharjan.com.np
                            </Link>
                        </div>

                        {/* LINKS */}
                        <div className='flex-4 flex justify-end gap-10 sm:gap-[150px]'>
                            <ul className='flex flex-col gap-2 geist text-[18px] text-[#D3D3D3]'>
                                <li><Link href="" className='hover:text-[#F13333] transition-colors duration-300 ease-in-out'>Instagram</Link></li>
                                <li><Link href="" className='hover:text-[#F13333] transition-colors duration-300 ease-in-out'>YouTube</Link></li>
                                <li><Link href="" className='hover:text-[#F13333] transition-colors duration-300 ease-in-out'>Tiktok</Link></li>
                            </ul>

                            <ul className='flex flex-col gap-2 geist text-[18px] text-[#D3D3D3]'>
                                <li><Link href="" className='hover:text-[#F13333] transition-colors duration-300 ease-in-out'>Contact</Link></li>
                                <li><Link href="" className='hover:text-[#F13333] transition-colors duration-300 ease-in-out'>Privacy Policy</Link></li>
                                <li><Link href="" className='hover:text-[#F13333] transition-colors duration-300 ease-in-out'>Terms of Use</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* ================= MARQUEE + LIST ================= */}
                    <div className='flex flex-col gap-[60px]'>
                        <div className='grid grid-cols-1 sm:grid-cols-12 items-center gap-6'>
                            {/* MARQUEE */}
                            <div className='sm:col-span-7 overflow-hidden'>
                                <Marquee
                                    speed={40}
                                    gradient={false}
                                    className="!overflow-hidden"
                                >
                                    <span className="big-shoulders mx-6 text-4xl sm:text-6xl md:text-7xl lg:text-[107px] font-bold text-[#F13333] whitespace-nowrap">
                                        SAMAN MAHARJAN
                                    </span>

                                    <span className="big-shoulders mx-6 text-4xl sm:text-6xl md:text-7xl lg:text-[107px] font-bold text-[#F13333] whitespace-nowrap">
                                        MAGICIAN
                                    </span>

                                    <span className="big-shoulders mx-6 text-4xl sm:text-6xl md:text-7xl lg:text-[107px] font-bold text-[#F13333] whitespace-nowrap">
                                        MENTALIST
                                    </span>
                                </Marquee>
                            </div>

                            {/* BLINKING LIST */}
                            <div className='sm:col-span-5 flex md:justify-end'>
                                <ul className='flex flex-col gap-2 text-left md:text-right text-sm sm:text-base md:text-lg'>
                                    {items.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`geist transition-all duration-500 ${index === activeIndex
                                                ? "opacity-100 translate-x-0 font-medium"
                                                : "opacity-30 translate-x-2 font-medium"
                                                }`}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* ================= BOTTOM ================= */}
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-[16px] opacity-70 geist'>
                            {/* <span>© 2026 SAMAN MAHARJAN. ALL RIGHTS RESERVED.</span> */}
                            <span>© {new Date().getFullYear()} SAMAN MAHARJAN. ALL RIGHTS RESERVED.</span>
                            <span>KEEP LOVING MAGIC</span>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer