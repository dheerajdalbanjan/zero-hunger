"use client"

import React from 'react'
import {motion} from 'framer-motion'

const Hero = () => {
  return (
    <div className=' md:px-0 px-4 w-full py-16 bg-gradient-to-r from-[#E8C872]  to-[#637A9F] '>
       <div className='max-w-7xl mx-auto flex items-start justify-center flex-col space-y-5'>
       
        <motion.h2 initial={{translateY:-35}} whileInView={{translateY:0}} className='text-4xl font-bold opacity-35'>Goal: 2</motion.h2>
        <motion.h2 initial={{translateY:35}} whileInView={{translateY:0}} className='text-5xl  text-neutral-700  font-bold max-w-5xl'>End hunger, achieve food security and improved nutrition and promote sustainable agriculture.</motion.h2>
        </div>
    
    </div>
  )
}

export default Hero ; 