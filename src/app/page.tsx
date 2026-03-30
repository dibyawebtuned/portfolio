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

// import Footer from '../../test_two'


const page = () => {
  return (
    <div>
      <Herosection />
      <LogoMarquee />
      <About />
      <Marquee />
      <Services />
      <Testimonials />
      <FAQAccordion />
      <Banner />
      <LogoMarquee />

      {/* <Aboutme /> */}
      {/* <CardScene/> */}
      {/* <Footer /> */}
    </div>
  )
}

export default page