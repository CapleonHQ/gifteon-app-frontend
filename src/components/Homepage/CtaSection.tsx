// 'use client'

// import React from 'react'
// import { motion } from 'framer-motion'

// const CtaSection = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 30 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   }

//   const staggerContainer = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   return (
//     <motion.section
//       className='relative py-20 overflow-hidden'
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Background Image with Overlay */}
//       <div className='absolute inset-0'>
//         {/* Background Image */}
//         <div
//           className='w-full h-full bg-cover bg-center bg-no-repeat'
//           style={{
//             backgroundImage: `url('/assets/images/cta-bg-image.jpg')`, // Replace with your image path
//           }}
//         />

//         {/* Dark overlay for text readability */}
//         <div className='absolute inset-0 bg-black/50' />
//       </div>

//       {/* Content */}
//       <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//         <motion.div
//           variants={staggerContainer}
//           initial='initial'
//           whileInView='animate'
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             variants={fadeInUp}
//             className='text-3xl sm:text-4xl lg:text-5xl lg:leading-12 font-bold text-white mb-6'
//           >
//             Ready to Create Something Beautiful?
//           </motion.h2>

//           <motion.p
//             variants={fadeInUp}
//             className='text-lg sm:text-xl text-[#FFFFFFE5] mb-6 max-w-3xl mx-auto sm:leading-[32.5px]'
//           >
//             Join thousands of people who&apos;ve made their celebrations
//             unforgettable with Gifteon
//           </motion.p>

//           <motion.div
//             variants={fadeInUp}
//             className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center'
//           >
//             <motion.button
//               className='bg-white text-[#9333EA] px-8 py-[17.12px] rounded-xl font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300'
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Start Your Celebration
//             </motion.button>

//             <motion.button
//               className='border border-white text-white px-8 py-[17.12px] rounded-xl font-bold backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300'
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Learn More
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </motion.section>
//   )
// }

// export default CtaSection

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, AlertCircle, Sparkles } from 'lucide-react'

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

  return (
    <motion.section
      id='waitlist'
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
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className='inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6 border border-white/30'
          >
            <Sparkles className='w-4 h-4' />
            <span className='font-medium'>Coming Soon</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className='text-3xl sm:text-4xl lg:text-5xl lg:leading-12 font-bold text-white mb-6'
          >
            Be the First to Create Something Beautiful
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className='text-lg sm:text-xl text-[#FFFFFFE5] mb-8 max-w-3xl mx-auto sm:leading-[32.5px]'
          >
            Join our waitlist to get early access to Giftseon and be among the
            first to make celebrations unforgettable
          </motion.p>

          {/* Waitlist Form */}
          <motion.div variants={fadeInUp} className='max-w-lg mx-auto mb-8'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Mobile: Stacked Layout */}
              <div className='block sm:hidden space-y-3'>
                <motion.div
                  className='bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl'
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className='flex items-center px-4'>
                    <Mail className='w-5 h-5 text-white/70 mr-3' />
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email address'
                      className='flex-1 py-4 text-white placeholder-white/70 bg-transparent outline-none text-sm'
                      disabled={status === 'loading'}
                    />
                  </div>
                </motion.div>
                <motion.button
                  type='submit'
                  disabled={status === 'loading' || status === 'success'}
                  className='w-full bg-white text-[#9333EA] py-4 px-6 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-2xl'
                  whileHover={
                    status === 'idle' || status === 'error'
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    status === 'idle' || status === 'error'
                      ? { scale: 0.98 }
                      : {}
                  }
                >
                  {status === 'loading' ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <motion.div
                        className='w-5 h-5 border-2 border-[#9333EA] border-t-transparent rounded-full'
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <span>Joining...</span>
                    </div>
                  ) : status === 'success' ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <Check className='w-5 h-5' />
                      <span>Joined!</span>
                    </div>
                  ) : (
                    'Join Waitlist'
                  )}
                </motion.button>
              </div>

              {/* Desktop: Inline Layout */}
              <div className='hidden sm:block'>
                <motion.div
                  className='flex bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl'
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className='flex-1 flex items-center px-6'>
                    <Mail className='w-5 h-5 text-white/70 mr-3' />
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email address'
                      className='flex-1 py-4 text-white placeholder-white/70 bg-transparent outline-none'
                      disabled={status === 'loading'}
                    />
                  </div>
                  <motion.button
                    type='submit'
                    disabled={status === 'loading' || status === 'success'}
                    className='bg-white text-[#9333EA] px-8 py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
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
                        className='w-5 h-5 border-2 border-[#9333EA] border-t-transparent rounded-full'
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
                        ? 'text-green-300'
                        : status === 'error'
                        ? 'text-red-300'
                        : 'text-white/70'
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
          </motion.div>

          {/* Secondary CTA */}
          {/* <motion.div
            variants={fadeInUp}
            className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center'
          >
            <motion.button
              className='border border-white text-white px-8 py-[17.12px] rounded-xl font-bold backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div> */}

          {/* Privacy Note */}
          <motion.p variants={fadeInUp} className='text-xs text-white/60 mt-6'>
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Waitlist
