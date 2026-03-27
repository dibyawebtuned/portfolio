import React from 'react';
import Image from 'next/image';

export default function MagicianPortfolio() {
    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" />
        </div>
    );
}