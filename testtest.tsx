"use client"

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const testimonials = [
    {
        name: "-Subash Achraya",
        text: "We got tickets from our friends because they didn't want to go. We didn't think it was going to be good but we went to try it out and I have to say it was one of the best magic show watched till date."
    },
    {
        name: "-Emily Coff",
        text: "It was the best money I've spent so far in Kathmandu in magic show, Absolutely hilarious! And he is such a nice person!"
    },
    {
        name: "-Shristi Miya",
        text: "Great time at the show. Saman thank you for making my time with my friend, Magic was mind blowing."
    },
    {
        name: "Emily Davis",
        text: "Professional, engaging, and incredibly talented."
    }
]

const Testimonials = () => {
    return (
        <div className="relative w-full bg-black overflow-hidden text-white">

            {/* INLINE STYLES (No external CSS needed) */}
            <style jsx global>
                {`
                .custom-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(255,255,255,0.3);
                    opacity: 1;
                    margin: 0 6px !important;
                    border-radius: 999px;
                    transition: all 0.3s ease;
                }

                .custom-pagination .swiper-pagination-bullet-active {
                    width: 24px;
                    background: #F13333;
                    box-shadow: 0 0 10px #F13333;
                }

                @media (max-width: 768px) {
                    .testimonial-prev,
                    .testimonial-next {
                        display: none;
                    }
                }
            `}
            </style>

            {/* Gradient */}
            <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at bottom left, rgba(241,51,51,0.6) 0%, rgba(7,7,7,0) 50%)"
                }}
            />

            <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20 lg:py-[100px] flex flex-col gap-10 z-10">

                {/* HEADER */}
                <div className="flex flex-col items-center text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[87px] text-[#F0EBE6] big-shoulders big-shoulders-bold tracking-wide">
                        Testimonials
                    </h1>

                    <p className="mt-4 max-w-md sm:max-w-xl lg:max-w-2xl text-sm sm:text-base opacity-80">
                        Audience and Client Testimonials That Showcase Real Experiences and the Value We Bring to Every Event
                    </p>
                </div>

                {/* NAVIGATION */}
                <div className="flex justify-end gap-3">
                    <button className="testimonial-prev w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="testimonial-next w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* SWIPER */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".testimonial-next",
                        prevEl: ".testimonial-prev",
                    }}
                    pagination={{
                        el: ".custom-pagination",
                        clickable: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="rounded-2xl p-5 sm:p-6 h-full backdrop-blur-md flex flex-col justify-between"
                                style={{
                                    background: "linear-gradient(to bottom, #F13333 0%, #070707 100%)",
                                }}
                            >
                                <div>
                                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#F0EBE6] mb-3 opacity-70" />

                                    <p className="text-sm sm:text-[15px] opacity-80 mb-4">
                                        “{item.text}”
                                    </p>
                                </div>

                                <h3 className="text-base sm:text-lg big-shoulders text-[#F0EBE6]">
                                    {item.name}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* PAGINATION */}
                <div className="custom-pagination flex justify-center mt-6"></div>

            </div>
        </div>
    )
}

export default Testimonials