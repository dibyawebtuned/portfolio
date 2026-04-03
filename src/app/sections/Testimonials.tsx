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
        text: "It was the best money I've spent so far in Kathmandu in magic show, Absolutely hilarious! And he is such a nice person! Will definitely go see him again. Thank you for the amazing involvement."
    },
    {
        name: "-Shristi Miya",
        text: "Great time at the show. Saman thank you for making my time with my friend, Magic was mind blowing, You all were great. Keep Loving Magic and keep rising."
    },
    {
        name: "Emily Davis",
        text: "Professional, engaging, and incredibly talented."
    }
]


const Testimonials = () => {
    return (
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">
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

            {/* Brightened Background Gradient Glow */}
            <div
                className="absolute bottom-0 left-0 w-[800px] h-[800px] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at bottom left, rgba(241, 51, 51, 0.6) 0%, rgba(7,7,7,0) 40%)"
                }}
            />

            <div className='relative max-w-[1440px] mx-auto px-[20px] md:px-[80px] py-[50px] md:py-[100px] flex flex-col gap-[50px] z-10'>
                {/* ========== HEADER ========== */}
                <div className="flex flex-col items-center text-center px-4">
                    <h1 className="big-shoulders text-[#F0EBE6] font-bold mb-4 sm:mb-5 md:mb-6 leading-tight tracking-[0.02em] text-[48px] lg:text-[64px] xl:text-[87px]">
                        Testimonials
                    </h1>

                    <p className="mt-4 max-w-md sm:max-w-xl lg:max-w-2xl text-sm sm:text-base text-center opacity-80">
                        Audience and Client Testimonials That Showcase Real Experiences and the Value We Bring to Every Event
                    </p>
                </div>

                <div>
                    {/* NAVIGATION */}
                    <div className="flex justify-end gap-3 mb-5">
                        <button className="testimonial-prev w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="testimonial-next w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                            <ChevronRight size={18} />
                        </button>
                    </div>

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
                        navigation={{
                            nextEl: ".testimonial-next",
                            prevEl: ".testimonial-prev",
                        }}
                        pagination={{
                            el: ".custom-pagination",
                            clickable: true,
                        }}
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
                                    className="rounded-2xl p-6 h-full backdrop-blur-md transition"
                                    style={{
                                        background: "linear-gradient(to bottom, #F13333 0%, #070707 100%)",
                                        // border: "1px solid rgba(255, 255, 255, 0.1)"
                                    }}
                                >
                                    {/* Quote Icon */}
                                    <Quote className="w-8 h-8 text-[#F0EBE6] mb-4 opacity-70" />

                                    <p className="geist text-[15px] opacity-80 mb-6">
                                        “{item.text}”
                                    </p>
                                    <h3 className="big-shoulders big-shoulders-medium text-[21px] text-[#F0EBE6]">
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
        </div>
    )
}

export default Testimonials