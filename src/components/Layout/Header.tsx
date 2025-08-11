'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gift, Menu, X } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const headerLinks = [
    {
      link: '/#how-it-works',
      label: 'How it Works',
    },
    {
      link: '/#features',
      label: 'Features',
    },
    {
      link: '/#stories',
      label: 'Stories',
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        className='relative z-50 px-4 sm:px-6 lg:px-8 py-4 bg-white'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {/* Logo */}
          <Link href='/'>
            <motion.div
              className='flex items-center space-x-2'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center'>
                <Gift className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
              </div>
              <span className='text-xl sm:text-2xl font-bold text-[#EA580C]'>
                Gifteon
              </span>
            </motion.div>
          </Link>
          <div className='flex items-center gap-8'>
            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-8'>
              {headerLinks.map((item, index) => (
                <Link href={item.link} key={index}>
                  <motion.span
                    className='text-[#374151] hover:text-gray-800 transition-colors duration-200 font-medium'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <motion.button
              className='hidden md:block bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Celebration
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className='md:hidden p-2 text-gray-600'
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Blur Overlay */}
            <motion.div
              className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />

            {/* Sidebar */}
            <motion.div
              className='fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 md:hidden border-l border-gray-200/50'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className='p-6 space-y-6'>
                {/* Close Button */}
                <div className='flex justify-end'>
                  <motion.button
                    onClick={toggleMobileMenu}
                    className='p-2 text-gray-600'
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className='space-y-4'>
                  {headerLinks.map((item, index) => (
                    <Link
                      href={item.link}
                      key={index}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span
                        className='block text-lg text-[#374151] hover:text-gray-800 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-gray-50/70'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ x: 5 }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA Button */}
                <motion.button
                  className='w-full bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white px-6 py-4 rounded-xl font-semibold mt-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Celebration
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
