'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Check, AlertCircle, Sparkles, Users, Bell } from 'lucide-react'

interface WaitlistResponse {
  success: boolean
  message: string
  id?: string
}

interface ErrorResponse {
  error: string
}

const Waitlist = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data: WaitlistResponse | ErrorResponse = await response.json()

      if (response.ok && 'success' in data) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else if ('error' in data) {
        setStatus('error')
        setMessage(data.error)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  const features = [
    {
      icon: Users,
      text: 'Join 1,000+ early users',
    },
    {
      icon: Bell,
      text: 'Get notified first',
    },
    {
      icon: Sparkles,
      text: 'Early access perks',
    },
  ]

  return (
    <motion.section
      id='waitlist'
      className='bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#FAF5FF] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative overflow-hidden'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative Background Elements */}
      <div className='absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/30 to-pink-200/30 rounded-full blur-xl'></div>
      <div className='absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-xl'></div>
      <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-lg'></div>

      <div className='max-w-4xl mx-auto relative z-10'>
        <motion.div
          className='text-center'
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className='inline-flex items-center space-x-2 bg-gradient-to-r from-[#FFEDD5] to-[#FCE7F3] text-[#9A3412] px-4 py-2 rounded-full text-sm mb-6'
          >
            <Sparkles className='w-4 h-4' />
            <span className='font-medium'>Coming Soon</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-6'
          >
            Be the First to{' '}
            <span className='bg-gradient-to-r from-[#EA580C] via-[#DB2777] to-[#9333EA] bg-clip-text text-transparent'>
              Celebrate
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className='text-lg sm:text-xl text-[#4B5563] mb-8 max-w-2xl mx-auto leading-relaxed'
          >
            Join our waitlist to get early access to Giftseon and be among the
            first to create unforgettable celebrations with your loved ones.
          </motion.p>

          {/* Features */}
          <motion.div
            variants={fadeInUp}
            className='flex flex-wrap justify-center gap-6 mb-10'
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.text}
                  className='flex items-center space-x-2 text-[#4B5563]'
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <IconComponent className='w-5 h-5 text-[#EA580C]' />
                  <span className='text-sm sm:text-base'>{feature.text}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Waitlist Form */}
          <motion.div variants={fadeInUp} className='max-w-md mx-auto'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative'>
                <motion.div
                  className='flex bg-white rounded-2xl shadow-lg border border-[#F3F4F6] overflow-hidden'
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className='flex-1 flex items-center px-4'>
                    <Mail className='w-5 h-5 text-[#9CA3AF] mr-3' />
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email address'
                      className='flex-1 py-4 text-[#111827] placeholder-[#9CA3AF] bg-transparent outline-none'
                      disabled={status === 'loading'}
                    />
                  </div>
                  <motion.button
                    type='submit'
                    disabled={status === 'loading' || status === 'success'}
                    className='bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white px-6 py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
                    whileHover={
                      status === 'idle' || status === 'error'
                        ? { scale: 1.05 }
                        : {}
                    }
                    whileTap={
                      status === 'idle' || status === 'error'
                        ? { scale: 0.98 }
                        : {}
                    }
                  >
                    {status === 'loading' ? (
                      <motion.div
                        className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    ) : status === 'success' ? (
                      <Check className='w-5 h-5' />
                    ) : (
                      'Join Waitlist'
                    )}
                  </motion.button>
                </motion.div>
              </div>

              {/* Status Messages */}
              <AnimatePresence mode='wait'>
                {message && (
                  <motion.div
                    className={`flex items-center justify-center space-x-2 text-sm ${
                      status === 'success'
                        ? 'text-green-600'
                        : status === 'error'
                        ? 'text-red-600'
                        : 'text-[#4B5563]'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status === 'success' ? (
                      <Check className='w-4 h-4' />
                    ) : status === 'error' ? (
                      <AlertCircle className='w-4 h-4' />
                    ) : null}
                    <span>{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Privacy Note */}
            <motion.p
              variants={fadeInUp}
              className='text-xs text-[#6B7280] mt-4'
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={fadeInUp}
            className='mt-12 flex items-center justify-center space-x-4'
          >
            <div className='flex -space-x-2'>
              {[
                'bg-purple-500',
                'bg-blue-500',
                'bg-cyan-500',
                'bg-green-500',
                'bg-orange-500',
                'bg-pink-500',
              ].map((color, index) => (
                <motion.div
                  key={index}
                  className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                >
                  {['A', 'B', 'C', 'D', 'E', 'F'][index]}
                </motion.div>
              ))}
              <motion.div
                className='w-8 h-8 bg-[#F3F4F6] border-2 border-white rounded-full flex items-center justify-center text-[#6B7280] text-xs font-semibold'
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                +
              </motion.div>
            </div>
            <div className='text-sm text-[#4B5563]'>
              <span className='font-semibold text-[#EA580C]'>1,000+</span>{' '}
              people already joined
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Waitlist
