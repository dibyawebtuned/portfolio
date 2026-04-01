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
    const [modalOpen, setModalOpen] = useState(false);

    const navRef = useRef<HTMLDivElement>(null);
    const topNavRef = useRef<HTMLDivElement>(null);
    const bottomNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const topNav = topNavRef.current;
        const bottomNav = bottomNavRef.current;

        if (!nav || !topNav || !bottomNav) return;

        gsap.set(bottomNav, { opacity: 0, y: 50, pointerEvents: "none" });

        ScrollTrigger.create({
            trigger: nav,
            start: "bottom top",
            onEnter: () => {
                gsap.to(topNav, { opacity: 0, y: -20, duration: 0.3, pointerEvents: "none" });
                gsap.to(bottomNav, { opacity: 1, y: 0, duration: 0.4, pointerEvents: "auto" });
            },
            onLeaveBack: () => {
                gsap.to(topNav, { opacity: 1, y: 0, duration: 0.3, pointerEvents: "auto" });
                gsap.to(bottomNav, { opacity: 0, y: 50, duration: 0.3, pointerEvents: "none" });
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
                                <Link href="https://weeztix.shop/6e4keua6" className="px-6 py-2 border rounded-[27px] hover:border-[#F13333] hover:text-[#F13333] transition-colors duration-300 ease-in-out" target='_blank'>
                                    BUY TICKETS
                                </Link>

                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="px-6 py-2 border rounded-[27px] cursor-pointer hover:border-[#F13333] hover:text-[#F13333] transition-colors duration-300 ease-in-out"
                                >
                                    LET’S TALK
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setMobileOpen(true)}
                            className="border p-3 rounded-full cursor-pointer"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* ================= BOTTOM NAV ================= */}
                <div ref={bottomNavRef}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 
                    flex items-center justify-center gap-8 
                    bg-white/30 backdrop-blur-md shadow-xl 
                    rounded-full px-6 py-3 
                    z-50 w-fit"
                >
                    <div className='flex items-center gap-6'>
                        <Link href="#home" className="text-sm">Home</Link>
                        <Link href="#about" className="text-sm">About</Link>
                    </div>

                    <div className='flex-shrink-0 w-[40px] h-[40px] mx-4'>
                        <Image src={Logo_Image} alt="Logo" className="w-full h-full" />
                    </div>

                    <div className='flex items-center gap-6'>
                        <Link href="#work" className="text-sm">Work</Link>
                        <button onClick={() => setModalOpen(true)} className="text-sm">Contact</button>
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

                    <ul className='flex flex-col gap-[10px] items-center'>
                        <li><Link href="" className='uppercase text-xl'>Home</Link></li>
                        <li><Link href="" className='uppercase text-xl'>Services</Link></li>
                        <li><Link href="" className='uppercase text-xl'>Work</Link></li>
                        <li><Link href="" className='uppercase text-xl'>Gallery</Link></li>
                        <li><Link href="" className='uppercase text-xl'>Contact</Link></li>
                    </ul>

                    <span className="uppercase text-xl">
                        BASED IN <span className="text-red-600">KATHMANDU</span>
                    </span>

                    <Link href="#showreel" onClick={() => setMobileOpen(false)} className="px-8 py-3 border rounded-full">
                        BUY TICKETS
                    </Link>

                    <button onClick={() => { setModalOpen(true); setMobileOpen(false); }} className="px-8 py-3 border rounded-full">
                        LET’S TALK
                    </button>
                </div>
            )}

            {/* ================= MODAL ================= */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 md:p-8">
                    <div className="bg-white/20 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 relative shadow-lg">
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full border hover:bg-gray-100 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Title */}
                        <h2 className="big-shoulders text-2xl sm:text-3xl font-bold mb-4 text-center">LET’S TALK</h2>

                        {/* Form */}
                        <form className="flex flex-col gap-4">
                            <div className='flex gap-[20px]'>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>

                            <div className='flex gap-[20px]'>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Message"
                                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                                rows={4}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800 transition font-semibold"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Nav;