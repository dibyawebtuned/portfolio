"use client"

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const testimonials = [
    {
        name: "John Doe",
        text: "Absolutely mind-blowing performance. The audience was speechless!"
    },
    {
        name: "Sarah Smith",
        text: "One of the best entertainers we've ever hired. Highly recommended."
    },
    {
        name: "Michael Lee",
        text: "A magical experience from start to finish. Truly unforgettable."
    },
    {
        name: "Emily Davis",
        text: "Professional, engaging, and incredibly talented."
    }
]

const Testimonials = () => {
    return (
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" />

            <div className='max-w-[1440px] mx-auto px-[80px] py-[100px] flex flex-col  gap-[50px]'>
                {/* ========== HEADER ========== */}
                <div className='flex flex-col items-center'>
                    <h1 className='text-[87px] text-[#F0EBE6] uppercase'>Testimonials</h1>
                    <p className='m-0 text-[18px]'>Audience and Client Testimonials That Showcase Real Experiences and the Value We Bring to Every Event</p>
                </div>

                <div>
                    {/* CAROUSEL */}
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="rounded-2xl p-6 h-full backdrop-blur-md hover:opacity-90 transition"
                                    style={{
                                        background: "linear-gradient(to bottom, #F13333 0%, #070707 100%)",
                                        // border: "1px solid rgba(255, 255, 255, 0.1)"
                                    }}
                                >
                                    <p className="text-sm md:text-base opacity-80 mb-6">
                                        “{item.text}”
                                    </p>
                                    <h3 className="font-semibold text-lg">
                                        {item.name}
                                    </h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Testimonials