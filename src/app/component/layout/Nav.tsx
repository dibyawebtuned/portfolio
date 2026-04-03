"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import Logo_Image from "../../../../public/assets/img/Logo icon SM-01 (1).png";
import Image_popup from "../../../../public/assets/img/saman_1.png";
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

    // SCROLL LOCK — prevents background page scroll when modal or mobile menu is open
    useEffect(() => {
        if (modalOpen || mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [modalOpen, mobileOpen]);

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
                                    {`LET'S TALK`}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setMobileOpen(true)}
                            className="border p-3 rounded-full cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
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
                        className="absolute top-4 right-5 sm:right-20 p-3 border rounded-full cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <ul className='flex flex-col gap-[10px] items-center'>
                        <li><Link href="#home" className='uppercase text-xl'>Home</Link></li>
                        <li><Link href="" className='uppercase text-xl'>Services</Link></li>
                        <li><Link href="#work" className='uppercase text-xl'>Work</Link></li>
                        {/* <li><Link href="" className='uppercase text-xl'>Gallery</Link></li> */}
                        <li><Link href="" className='uppercase text-xl'>Contact</Link></li>
                    </ul>

                    <span className="uppercase text-xl">
                        BASED IN <span className="text-red-600">KATHMANDU</span>
                    </span>

                    <Link href="#showreel" onClick={() => setMobileOpen(false)} className="px-8 py-3 border rounded-full">
                        BUY TICKETS
                    </Link>

                    <button onClick={() => { setModalOpen(true); setMobileOpen(false); }} className="px-8 py-3 border rounded-full">
                        {`LET'S TALK`}
                    </button>
                </div>
            )}

            {/* ================= MODAL ================= */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
                    {/* Modal Box */}
                    <div className="
                        relative w-full max-w-5xl h-[90vh]
                        bg-[#0E0E0E] rounded-2xl border border-white/10
                        flex flex-col md:flex-row
                        overflow-hidden
                        transition-all duration-300 ease-in-out
                        hover:border-[#F13333]/60
                        hover:scale-[1.02]
                    ">
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="
                                absolute top-4 right-4 z-10 p-2 rounded-full border border-white/20
                                text-white/70 hover:bg-[#F13333] hover:text-white hover:border-[#F13333]
                                cursor-pointer transition-all duration-300 ease-in-out
                            "
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Image — fixed, does NOT scroll */}
                        <div className="relative w-full md:w-[45%] h-[200px] md:h-full shrink-0">
                            <Image src={Image_popup} alt="experience" fill className="object-cover object-center" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>

                        {/* Right Panel — this is the ONLY thing that scrolls */}
                        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 md:p-6 flex flex-col justify-center">
                            {/* Heading */}
                            <div className="mb-6 text-white">
                                <h2 className="big-shoulders text-3xl md:text-4xl font-bold leading-tight">
                                    Book an <span className="text-[#F13333]">Experience</span> <br />
                                    Your Guests Will Never Forget
                                </h2>
                                <p className="text-sm text-white/70 mt-2 max-w-md">
                                    Looking for a magician for your corporate event? Saman is a professional magician.
                                </p>
                            </div>

                            {/* Form */}
                            <form className="flex flex-col gap-4">
                                <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                                    <input type="text" placeholder="Full Name" className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none hover:border-[#F13333] focus:border-[#F13333] transition-colors duration-300 ease-in-out" required />
                                    <input type="email" placeholder="Email" className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" required />
                                </div>

                                <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                                    <input type="number" placeholder="Phone Number" className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" required />
                                    <input type="text" placeholder="Event Location" className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" required />
                                </div>

                                <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                                    <input type="text" placeholder="Event Day" className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" required />
                                    <input type="number" placeholder="Estimated Guests" className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" required />
                                </div>

                                <input type="text" placeholder="How did you hear about Saman Maharjan?" className="bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" required />

                                <textarea placeholder="Info About Your Event" className="bg-white/5 border border-white/10 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#F13333] hover:border-[#F13333] transition-colors duration-300 ease-in-out" rows={4} required />

                                <button type="submit" className="mt-2 bg-[#F13333] text-white py-3 rounded-md font-semibold hover:bg-[#d92b2b] transition-all duration-300 ease-in-out cursor-pointer">
                                    Send Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Nav;