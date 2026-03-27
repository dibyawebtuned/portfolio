import React from 'react'
import Herosection from './sections/Hero'
import Testimonials from './sections/Testimonials'
import About from './sections/About'
import Aboutme from './sections/Aboutme'
import Marquee from '../../test'
import Services from './sections/Services'


import CardScene from './component/CardScene'



const page = () => {
  return (
    <div>
      <About />
      <Marquee />
      <Services/>
      {/* <Herosection /> */}
      {/* <Aboutme /> */}
      <Testimonials />


      {/* <CardScene/> */}
    </div>
  )
}

export default page