"use client"
import React from 'react'

const Banner = () => {
    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden font-sans text-white">

            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: "url('/assets/img/One.png')",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-70 blur-3xl" />

            {/* Content */}
            <div className='relative max-w-[1440px] mx-auto px-[80px] text-center'>
                <h1 className="text-6xl text-[#F0EBE6]">
                    Witness the Magic
                </h1>
            </div>
        </div>
    )
}

export default Banner