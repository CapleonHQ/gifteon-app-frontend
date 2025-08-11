'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cake, Gift, Play, Sparkles, Star } from 'lucide-react'

const Hero = () => {
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
    <main className='relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py:20 bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#FAF5FF]'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          {/* Left Column - Content */}
          <motion.div
            className='text-center lg:text-left'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className='inline-flex items-center space-x-2 bg-gradient-to-r from-[#FFEDD5] to-[#FCE7F3] text-[#9A3412] px-4 py-2 rounded-full text-base mb-6'
            >
              <Sparkles className='w-4 h-4' />
              <span className='leading-6 tracking-[0%]'>
                Celebrating Life&apos;s Special Moments
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className='text-4xl sm:text-5xl lg:text-6xl font-bold lg:leading-[60px] mb-6'
            >
              Make Every{' '}
              <span className='bg-gradient-to-r from-[#EA580C] via-[#DB2777] to-[#9333EA] bg-clip-text text-transparent'>
                Celebration
              </span>{' '}
              Unforgettable
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className='text-lg sm:text-xl text-gray-600 mb-8 md:max-w-[512px] mx-auto lg:mx-0 leading-[32.5px]'
            >
              Craft elegant moments, gather meaningful gifts, and unite loved
              ones in celebration of life&apos;s most cherished events.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
            >
              <motion.button
                className='bg-gradient-to-r from-[#F97316] via-[#F25C5B] to-[#EC4899] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Your Celebration</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>

              <motion.button
                className='border border-[#FED7AA] text-[#C2410C] px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className='w-5 h-5' />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* User Avatars and Trust */}
            <motion.div
              variants={fadeInUp}
              className='flex items-center justify-center lg:justify-start space-x-4 mt-12'
            >
              <div className='flex -space-x-2'>
                {[
                  'bg-purple-500',
                  'bg-blue-500',
                  'bg-cyan-500',
                  'bg-green-500',
                  'bg-orange-500',
                ].map((color, index) => (
                  <motion.div
                    key={index}
                    className={`w-10 h-10 ${color} rounded-full border-2 border-white flex items-center justify-center text-white font-semibold`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  >
                    {['S', 'K', 'C', 'J', 'M'][index]}
                  </motion.div>
                ))}
              </div>
              <div className='flex flex-col'>
                <div className='flex space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 text-yellow-400 fill-current'
                    />
                  ))}
                </div>
                <span className='text-sm text-[#4B5563]'>
                  Trusted by 200k+ users
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            className='relative overflow-visible'
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Floating Elements - Now behind the card */}
            <motion.div
              className='absolute -top-8 -right-8 w-8 h-8 bg-yellow-400 rounded-full z-0'
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div
              className='absolute -bottom-6 -left-6 w-6 h-6 bg-purple-400 rounded-full z-0'
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
            <motion.div
              className='absolute top-12 -left-4 w-4 h-4 bg-pink-400 rounded-full z-0'
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.div
              className='absolute -top-2 left-1/3 w-5 h-5 bg-blue-400 rounded-full z-0'
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />

            <motion.div
              className='bg-white rounded-[16px] shadow-2xl p-6 sm:p-8 relative z-10'
              whileHover={{ y: -5, rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Dashboard Header */}
              <div className='flex items-center space-x-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-r from-[#F472B6] to-[#DB2777] rounded-full flex items-center justify-center'>
                  <Cake className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h3 className='font-bold text-[#111827]'>
                    Sarah&apos;s 28th Birthday
                  </h3>
                  <p className='text-base leading-6 text-[#4B5563]'>
                    Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* Goal Progress */}
              <div className='mb-6 bg-gradient-to-r from-[#FFEDD5] to-[#FCE7F3] p-4 rounded-xl'>
                <div className='flex flex-col sm:flex-row gap-2 justify-between sm:items-center mb-2'>
                  <span className='text-[#374151]'>Goal Progress</span>
                  <span className='font-bold text-[#EA580C]'>
                    ₦85,000 / ₦100,000
                  </span>
                </div>
                <div className='w-full bg-white rounded-full h-3'>
                  <motion.div
                    className='bg-gradient-to-r from-[#F97316] to-[#EC4899] h-3 rounded-full'
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 gap-6'>
                <motion.div
                  className='text-center bg-[#FAF5FF] rounded-lg py-3'
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className='text-2xl leading-8 font-bold text-[#9333EA]'>
                    24
                  </div>
                  <div className='text-sm leading-5 text-[#4B5563]'>
                    Contributors
                  </div>
                </motion.div>
                <motion.div
                  className='text-center bg-[#EFF6FF] rounded-lg py-3'
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className='text-2xl leading-8 font-bold text-[#2563EB]'>
                    48
                  </div>
                  <div className='text-sm leading-5 text-[#4B5563]'>
                    Messages
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative Background Circle */}
            <div className='absolute top-8 right-8 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full -z-10'></div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default Hero
