'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

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

  const goHome = () => {
    router.push('/')
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-48 translate-x-48'></div>
      <div className='absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-36 -translate-x-36'></div>

      {/* Floating Dots */}
      <motion.div className='absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full' />
      <motion.div
        className='absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full'
        animate={{
          y: [15, -15, 15],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className='absolute bottom-32 left-32 w-2 h-2 bg-pink-400 rounded-full'
        animate={{
          y: [-8, 8, -8],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Main Content */}
      <div className='text-center max-w-lg mx-auto relative z-10'>
        <motion.div
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          {/* 404 Number */}
          <motion.div variants={fadeInUp} className='mb-8'>
            <motion.h1
              className='text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent leading-none'
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={fadeInUp} className='mb-8 space-y-4'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800'>
              Page Not Found
            </h2>
            <p className='text-lg sm:text-xl text-gray-600 leading-relaxed max-w-md mx-auto'>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <motion.button
              className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={goHome}
            >
              <Home className='w-5 h-5' />
              <span>Go Home</span>
            </motion.button>

            {/* <motion.button
              className='border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className='w-5 h-5' />
              <span>Go Back</span>
            </motion.button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}
