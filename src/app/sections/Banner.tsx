"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Banner = () => {
    return (
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-70 pointer-events-none blur-3xl" />


            <div className='relative max-w-[1440px] mx-auto px-[80px]'>
                {/* =========== BANNER CONTAINER =========== */}
                <div>
                    <h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-[#F0EBE6] big-shoulders big-shoulders-bold tracking-wide">
                        Witness the Magic
                    </h1>

                    <p
                        className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-center opacity-80">
                        Saman brings wonder to life with breathtaking magic performances for every occasion.
                        Close-up tricks, mentalism, and unforgettable moments await.
                    </p>
                </div>

                {/* =========== BUTTONS =========== */}
                <div className='flex items-center gap-[20px]'>
                    <button className="mt-8 px-8 py-4 bg-gradient-to-r from-[#2b0000] via-[#F13333] to-[#ff4c4c] rounded-lg text-white font-semibold shadow-lg">
                        Book a Show
                    </button>

                    <button className="mt-8 px-8 py-4 bg-gradient-to-r from-[#2b0000] via-[#F13333] to-[#ff4c4c] rounded-lg text-white font-semibold shadow-lg">
                        Book a Show
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner