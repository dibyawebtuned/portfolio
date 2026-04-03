
"use client";

import React from 'react'

import Herosection from './sections/Hero'
import LogoMarquee from './sections/LogoMarquee'
import Testimonials from './sections/Testimonials'
import About from './sections/About'
import Aboutme from './sections/Aboutme'
import Services from './sections/Services'
import CardFanSection from './sections/CardFan';
import FAQAccordion from './sections/Faq'
// import Banner from './sections/Banner'
import BentoGallery from './sections/Gallery'

// import HorizontalScrollText from '../../test_two'
import HorizontalScrollText from './sections/ScrollText'

import HorizontalGallery from './sections/HorizontalGallery';


const page = () => {
  return (
    <div>
      <Herosection />
      <LogoMarquee />
      <About />

      {/*  */}
      <HorizontalScrollText />

      <CardFanSection />
      <HorizontalGallery />
      <Services />
      <Testimonials />
      <BentoGallery />
      <FAQAccordion />
      {/* <Banner /> */}

    </div>
  )
}

export default page