"use client";

import React from 'react'
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from 'next/link'
import Image from 'next/image'
import Logo_Image from "../../../../public/assets/img/Logo icon SM-01 (1).png"

const Nav = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className='w-full'>
            <div className='max-w-[1440px] mx-auto px-[80px] flex justify-between items-center py-[10px]'>
                <div>
                    <Image src={Logo_Image} alt="" />
                </div>

                <div className='flex items-center gap-[15px]'>
                    <div className='flex gap-[15px] items-center'>
                        <span className='uppercase'>based in kathmandu</span>

                        <Link href="" className='px-[20px] py-[13px] border border-[#F0EBE6] rounded-[27px]'>WATCH SHOWREEL</Link>
                        <Link href="" className='px-[20px] py-[13px] border border-[#F0EBE6] rounded-[27px]'>LET’S TALK</Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="">
                        <button onClick={() => setMobileOpen(!mobileOpen)} className='border border-[#F0EBE6] p-[11px] rounded-full'>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="bg-black px-6 py-4 space-y-4">
                    <span className="block text-white">
                        BASED IN <span className="text-red-600 font-semibold">KATHMANDU</span>
                    </span>
                    <Link
                        href="#showreel"
                        className="block px-4 py-2 border border-white rounded-full text-white text-center"
                    >
                        WATCH SHOWREEL
                    </Link>
                    <Link
                        href="#contact"
                        className="block px-4 py-2 border border-white rounded-full text-white text-center"
                    >
                        LET’S TALK
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Nav