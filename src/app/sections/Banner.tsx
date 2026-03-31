"use client"
import React from 'react'

const Banner = () => {
    return (
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">

            {/* ===== Background Image ===== */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    // backgroundImage: "url('/assets/img/banner-bg.jpg')",
                    backgroundImage: "url('/assets/img/One.png')",
                }}
            />

            {/* Optional Dark Overlay (better readability) */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-70 pointer-events-none blur-3xl" />

            {/* Content */}
            <div className='relative max-w-[1440px] mx-auto px-[80px] py-[80px]'>

                <div className="text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-[#F0EBE6] big-shoulders big-shoulders-bold tracking-wide">
                        Witness the Magic
                    </h1>

                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl opacity-80">
                        Saman brings wonder to life with breathtaking magic performances for every occasion.
                        Close-up tricks, mentalism, and unforgettable moments await.
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex items-center justify-center gap-[20px]'>
                    <button className="mt-8 px-8 py-4 border border-white rounded-lg text-white font-semibold shadow-lg">
                        Book a Show
                    </button>

                    <button className="mt-8 px-8 py-4 border border-white rounded-lg text-white font-semibold shadow-lg">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner