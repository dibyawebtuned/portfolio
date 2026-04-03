"use client";

import React, { useState } from 'react';

import Preloader from './component/layout/preloader';

import Herosection from './sections/Hero';
import LogoMarquee from './sections/LogoMarquee';
import Testimonials from './sections/Testimonials';
import About from './sections/About';
import Aboutme from './sections/Aboutme';
import Services from './sections/Services';
import CardFanSection from './sections/CardFan';
import FAQAccordion from './sections/Faq';
import BentoGallery from './sections/Gallery';
import HorizontalScrollText from './sections/ScrollText';
import HorizontalGallery from './sections/HorizontalGallery';

const Page = () => {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      {/*  PRELOADER */}
      {!loadingDone && (
        <Preloader onComplete={() => setLoadingDone(true)} />
      )}

      {/*  MAIN CONTENT */}
      <div
        className={`transition-opacity duration-700 ${loadingDone ? "opacity-100" : "opacity-0"
          }`}
      >
        <Herosection loadingDone={loadingDone} />
        <LogoMarquee />
        <About />

        <HorizontalScrollText />

        <CardFanSection />
        <HorizontalGallery />
        <Services />
        <Testimonials />
        <BentoGallery />
        <FAQAccordion />
      </div>
    </>
  );
};

export default Page;