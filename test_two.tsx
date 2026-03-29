"use client"

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const testimonials = [
  {
    name: "Subash Acharya",
    text: "We got tickets from our friends because they didn't want to go. We didn't think it was going to be good but we went to try it out and I have to say it was one of the best magic show watched till date."
  },
  {
    name: "Emily Coff",
    text: "It was the best money I've spent so far in Kathmandu in magic show, Absolutely hilarious! And he is such a nice person! Will definitely go see him again. Thank you for the amazing involvement."
  },
  {
    name: "Shristi Miya",
    text: "Great time at the show. Saman thank you for making my time with my friend, Magic was mind blowing, You all were great. Keep Loving Magic and keep rising."
  }
]

const Testimonials = () => {
  return (
    <div className="relative w-full bg-black overflow-hidden font-sans text-white">
      {/* Bottom-left radial gradient glow */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom left, rgba(241, 51, 51, 0.6) 0%, rgba(7,7,7,0) 50%)"
        }}
      />

      {/* Top radial glow (optional for extra depth) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(241, 51, 51, 0.2) 0%, rgba(7,7,7,0) 60%)"
        }}
      />

      <div className='relative max-w-[1440px] mx-auto px-[80px] py-[100px] flex flex-col gap-[50px] z-10'>
        {/* Header */}
        <div className='flex flex-col items-center'>
          <h1 className='text-[87px] text-[#F0EBE6] big-shoulders big-shoulders-bold tracking-[2%]'>Testimonials</h1>
          <p className='max-w-2xl mx-auto text-center text-[16px]'>
            Audience and Client Testimonials That Showcase Real Experiences and the Value We Bring to Every Event
          </p>
        </div>

        {/* Carousel */}
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
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="rounded-2xl p-6 h-full backdrop-blur-md hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(to bottom, #F13333 0%, #070707 100%)",
                  boxShadow: "0 10px 30px rgba(241, 51, 51, 0.2)"
                }}
              >
                <p className="text-sm md:text-base opacity-80 mb-6">
                  “{item.text}”
                </p>
                <h3 className="font-semibold text-lg">{item.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Testimonials