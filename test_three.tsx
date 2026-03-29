"use client";

import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import Logo_Image from "../../../../public/assets/img/Logo icon SM-01 (1).png";

const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="w-full fixed top-0 left-0 z-50">
            {/* Navbar Container */}
                        <div className='max-w-[1440px] mx-auto px-[80px] flex justify-between items-center py-[10px]'>
                {/* Logo */}
                <div>
                    <Image src={Logo_Image} alt="Logo" className="w-20 h-auto" />
                </div>

                <div className='flex items-center gap-[15px]'>
                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <span className="uppercase text-sm">based in kathmandu</span>
                        <Link href="#showreel" className="px-6 py-2 border border-[#F0EBE6] rounded-[27px]">
                            WATCH SHOWREEL
                        </Link>
                        <Link href="#contact" className="px-6 py-2 border border-[#F0EBE6] rounded-[27px]">
                            LET’S TALK
                        </Link>
                    </div>

                    {/* Hamburger Button (always visible) */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="border border-[#F0EBE6] p-3 rounded-full md:block"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Fullscreen Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black text-white z-50 flex flex-col justify-center items-center space-y-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-6 right-6 p-3 border border-white rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <span className="uppercase text-xl md:text-2xl">
                        BASED IN <span className="text-red-600 font-semibold">KATHMANDU</span>
                    </span>

                    <Link
                        href="#showreel"
                        onClick={() => setMobileOpen(false)}
                        className="block px-8 py-3 border border-white rounded-full text-center text-lg md:text-xl"
                    >
                        WATCH SHOWREEL
                    </Link>

                    <Link
                        href="#contact"
                        onClick={() => setMobileOpen(false)}
                        className="block px-8 py-3 border border-white rounded-full text-center text-lg md:text-xl"
                    >
                        LET’S TALK
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Nav;