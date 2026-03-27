"use client";

import React from "react";

const MagicCards = () => {
    const images = [
        "/assets/img/saman_1.png",
        "/assets/img/saman_2.png",
        "/assets/img/saman_3.png",
        "/assets/img/saman_4.png",
    ];

    return (
        <section className="w-full bg-[radial-gradient(circle_at_center,#2b0000,#000)] py-28 flex justify-center">
            {/* Parent with perspective */}
            <div className="flex items-center justify-center -space-x-10 md:-space-x-16 perspective-[1440px]">

                {/* Card 1 */}
                <div className="w-[220px] h-[320px] md:w-[325px] md:h-[370px]
          rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transform rotate-[-15deg] translate-y-10
          transition-all duration-500 hover:scale-105 hover:rotate-0 hover:-translate-y-6 hover:z-20
          [transform-style:preserve-3d]">
                    <img src={images[0]} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Card 2 */}
                <div className="w-[220px] h-[320px] md:w-[325px] md:h-[370px]
          rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transform rotate-[-5deg] -translate-y-6
          transition-all duration-500 hover:scale-105 hover:rotate-0 hover:-translate-y-6 hover:z-20
          [transform-style:preserve-3d]">
                    <img src={images[1]} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Card 3 */}
                <div className="w-[220px] h-[320px] md:w-[325px] md:h-[370px]
          rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transform rotate-[5deg] translate-y-12
          transition-all duration-500 hover:scale-105 hover:rotate-0 hover:-translate-y-6 hover:z-20
          [transform-style:preserve-3d]">
                    <img src={images[2]} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Card 4 */}
                <div className="w-[220px] h-[320px] md:w-[325px] md:h-[370px]
          rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transform rotate-[15deg] -translate-y-4
          transition-all duration-500 hover:scale-105 hover:rotate-0 hover:-translate-y-6 hover:z-20
          [transform-style:preserve-3d]">
                    <img src={images[3]} alt="" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
};

export default MagicCards;