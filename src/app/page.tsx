import React from 'react'
import Herosection from './sections/Hero'
import LogoMarquee from './sections/LogoMarquee'
import Testimonials from './sections/Testimonials'
import About from './sections/About'
import Aboutme from './sections/Aboutme'
import Marquee from '../../test'
import Services from './sections/Services'
import CardScene from './component/CardScene'
import FAQAccordion from './sections/Faq'
import Banner from './sections/Banner'
import BentoGallery from './sections/Gallery'
import SplitText from '../../marked'

import CharacterSplit from '../../characters'

// import Footer from '../../test_two'

import HoverFollowImages from '../../cursor'


const page = () => {
  return (
    <div>
      <Herosection />
      <LogoMarquee />
      <About />
      <Marquee />
      <CardScene />
      <Services />
      <Testimonials />
      <BentoGallery />
      <FAQAccordion />
      <Banner />
      {/* <SplitText /> */}
      {/* <LogoMarquee /> */}

      {/* <Aboutme /> */}
      {/* <Footer /> */}
      {/* <CharacterSplit /> */}

      {/* <HoverFollowImages/> */}

    </div>
  )
}

export default page