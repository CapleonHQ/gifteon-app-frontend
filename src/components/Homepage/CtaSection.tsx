'use client'

import React from 'react'
import { motion } from 'framer-motion'

const CtaSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      className='relative py-20 overflow-hidden'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        {/* Background Image */}
        <div
          className='w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('/assets/images/cta-bg-image.jpg')`, // Replace with your image path
          }}
        />

        {/* Dark overlay for text readability */}
        <div className='absolute inset-0 bg-black/50' />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeInUp}
            className='text-3xl sm:text-4xl lg:text-5xl lg:leading-12 font-bold text-white mb-6'
          >
            Ready to Create Something Beautiful?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className='text-lg sm:text-xl text-[#FFFFFFE5] mb-6 max-w-3xl mx-auto sm:leading-[32.5px]'
          >
            Join thousands of people who&apos;ve made their celebrations
            unforgettable with Gifteon
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center'
          >
            <motion.button
              className='bg-white text-[#9333EA] px-8 py-[17.12px] rounded-xl font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Celebration
            </motion.button>

            <motion.button
              className='border border-white text-white px-8 py-[17.12px] rounded-xl font-bold backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CtaSection
