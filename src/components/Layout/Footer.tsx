'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Gift, Heart } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#' },
      { name: 'Templates', href: '#' },
      { name: 'Mobile App', href: '#' },
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Safety', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
    ],
  }

  return (
    <footer className='bg-[#111827] text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <motion.div
            className='lg:col-span-1'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center space-x-3 mb-3'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center'>
                <Gift className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
              </div>
              <span className='text-xl sm:text-2xl font-bold text-[#EA580C]'>
                Gifteon
              </span>
            </div>
            <p className='text-[#9CA3AF] leading-[24px] max-w-sm'>
              Making every celebration memorable with beautiful, personalized
              gift experiences.
            </p>
          </motion.div>

          {/* Footer Links */}
          <div className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8'>
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                >
                  <h3 className='font-bold mb-4 text-white'>{category}</h3>
                  <ul className='space-y-3'>
                    {links.map((link) => (
                      <motion.li
                        key={link.name}
                        whileHover={{ x: 5 }}
                        className='flex flex-col gap-2'
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <a
                          href={link.href}
                          className='text-[#9CA3AF] hover:text-white transition-colors duration-200 block'
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Bottom Border */}
        <motion.div
          className='border-t border-[#1F2937] mt-12 pt-[34px]'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0'>
            <p className='text-[#9CA3AF] text-sm sm:text-base'>
              © 2025 Gifteon. Made with{' '}
              <motion.span
                className='inline-block'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className='w-4 h-4 text-red-500 inline fill-current' />
              </motion.span>{' '}
              for celebrations worldwide.
            </p>

            {/* Social links could go here */}
            {/* <motion.div
              className='flex space-x-4'
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            > */}
            {/* Add social media icons here if needed */}
            {/* </motion.div> */}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
