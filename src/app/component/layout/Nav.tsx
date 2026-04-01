"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import Logo_Image from "../../../../public/assets/img/Logo icon SM-01 (1).png";
import Marquee from "react-fast-marquee";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const topNavRef = useRef<HTMLDivElement>(null);
    const bottomNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const topNav = topNavRef.current;
        const bottomNav = bottomNavRef.current;

        if (!nav || !topNav || !bottomNav) return;

        // Initial bottom nav state (hidden)
        gsap.set(bottomNav, { opacity: 0, y: 50, pointerEvents: "none" });

        ScrollTrigger.create({
            trigger: nav,
            start: "bottom top",

            onEnter: () => {
                // Hide top nav
                gsap.to(topNav, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    pointerEvents: "none"
                });

                // Show bottom nav (centered dock)
                gsap.to(bottomNav, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    pointerEvents: "auto"
                });
            },

            onLeaveBack: () => {
                // Show top nav
                gsap.to(topNav, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    pointerEvents: "auto"
                });

                // Hide bottom nav
                gsap.to(bottomNav, {
                    opacity: 0,
                    y: 50,
                    duration: 0.3,
                    pointerEvents: "none"
                });
            }
        });

    }, []);

    return (
        <header className="w-full">
            {/* ================= NAV CONTAINER ================= */}
            <div ref={navRef} className='relative w-full max-w-[1440px] mx-auto px-[20px] md:px-[80px] z-50'>

                {/* ================= TOP NAV ================= */}
                <div ref={topNavRef} className='flex justify-between items-center py-[10px] transition-all duration-300'>
                    {/* Logo */}
                    <div>
                        <Image src={Logo_Image} alt="Logo" className="w-[57px] h-auto" />
                    </div>

                    <div className='flex items-center gap-[15px]'>
                        <div className="hidden md:flex items-center gap-6">
                            <span className="uppercase text-sm flex items-center gap-2">
                                BASED IN
                                <span className="w-[120px] md:w-[160px] overflow-hidden">
                                    <Marquee speed={40} gradient={false} pauseOnHover>
                                        <span className="text-red-600 font-semibold">
                                            KATHMANDU &nbsp; Nepal
                                        </span>
                                    </Marquee>
                                </span>
                            </span>

                            <div className='flex items-center gap-[15px]'>
                                <Link href="https://weeztix.shop/6e4keua6" className="px-6 py-2 border rounded-[27px]">
                                    SHOWS
                                </Link>

                                <Link href="#contact" className="px-6 py-2 border rounded-[27px]">
                                    LET’S TALK
                                </Link>
                            </div>
                        </div>

                        <button
                            onClick={() => setMobileOpen(true)}
                            className="border p-3 rounded-full"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* ================= BOTTOM NAV (DOCK STYLE CENTER) ================= */}
                <div ref={bottomNavRef}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 
                    flex items-center justify-center gap-8 
                    bg-white/30 backdrop-blur-md shadow-xl 
                    rounded-full px-6 py-3 
                    z-50 w-fit"
                >
                    {/* Left links */}
                    <div className='flex items-center gap-6'>
                        <Link href="#home" className="text-sm">Home</Link>
                        <Link href="#about" className="text-sm">About</Link>
                    </div>

                    {/* Center logo */}
                    <div className='flex-shrink-0 w-[40px] h-[40px] mx-4'>
                        <Image src={Logo_Image} alt="Logo" className="w-full h-full" />
                    </div>

                    {/* Right links */}
                    <div className='flex items-center gap-6'>
                        <Link href="#work" className="text-sm">Work</Link>
                        <Link href="#contact" className="text-sm">Contact</Link>
                    </div>
                </div>
            </div>

            {/* ================= MOBILE MENU ================= */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black text-white z-50 flex flex-col justify-center items-center space-y-6">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-4 right-5 sm:right-20 p-3 border rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div>
                        <ul className='flex flex-col gap-[10px] items-center'>
                            <li>
                                <Link href="" className='uppercase text-xl geist geist-regular'>Home</Link>
                            </li>
                            <li>
                                <Link href="" className='uppercase text-xl geist geist-regular'>Services</Link>
                            </li>
                            <li>
                                <Link href="" className='uppercase text-xl geist geist-regular'>Work</Link>
                            </li>
                            <li>
                                <Link href="" className='uppercase text-xl geist geist-regular'>Gallery</Link>
                            </li>
                            <li>
                                <Link href="" className='uppercase text-xl geist geist-regular'>Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <span className="uppercase text-xl">
                        BASED IN <span className="text-red-600">KATHMANDU</span>
                    </span>

                    <Link href="#showreel" onClick={() => setMobileOpen(false)} className="px-8 py-3 border rounded-full">
                        SHOWS
                    </Link>

                    <Link href="#contact" onClick={() => setMobileOpen(false)} className="px-8 py-3 border rounded-full">
                        LET’S TALK
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Nav;