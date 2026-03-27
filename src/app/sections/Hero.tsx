import React from 'react';
import Image from 'next/image';

export default function MagicianPortfolio() {
    return (
        // <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white">
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" />


            <div className='relative max-w-[1440px] mx-auto px-[80px] py-[20px] border-2 border-red-600'>
                <div>
                    <span></span>
                </div>

                <div></div>
            </div>
        </div>
    );
}