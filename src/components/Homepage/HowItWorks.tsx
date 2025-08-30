'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Share2,
  Heart,
  CreditCard,
  MessageCircle,
  Smartphone,
  Globe,
} from 'lucide-react'

const HowItWorks = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const howItWorksSteps = [
    {
      number: '1.',
      title: 'Create Your Page',
      description:
        'Choose from beautiful templates and personalize with photos, stories, and gift preferences. Set up takes just minutes.',
      icon: Calendar,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
    {
      number: '2.',
      title: 'Share & Invite',
      description:
        'Share your celebration page across social media, messaging apps, or generate QR codes for easy access.',
      icon: Share2,
      gradient: 'from-[#EC4899] to-[#A855F7]',
    },
    {
      number: '3.',
      title: 'Collect & Celebrate',
      description:
        'Receive gifts, messages, and well-wishes in real-time. Track progress and thank contributors personally.',
      icon: Heart,
      gradient: 'from-[#A855F7] to-[#3B82F6]',
    },
  ]

  const features = [
    {
      title: 'Easy Celebration Setup',
      description:
        'Create beautiful, personalized celebration pages in minutes with our intuitive templates',
      icon: Calendar,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
    {
      title: 'Social Sharing',
      description:
        'Share your celebration across all platforms with QR codes and optimized social links',
      icon: Share2,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
    {
      title: 'Secure Payments',
      description:
        'Safe, fast payment processing with multiple options for contributors worldwide',
      icon: CreditCard,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
    {
      title: 'Personal Messages',
      description:
        'Collect heartfelt messages, photos, and videos from friends and family',
      icon: MessageCircle,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
    {
      title: 'Mobile-First Design',
      description:
        'Perfectly optimized experience across all devices and screen sizes',
      icon: Smartphone,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
    {
      title: 'Global Reach',
      description:
        'Connect with friends and family anywhere in the world, regardless of location',
      icon: Globe,
      gradient: 'from-[#F97316] to-[#EC4899]',
    },
  ]

  return (
    <>
      {/* How Gifteon Works Section */}
      <motion.section
        id='how-it-works'
        className='bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#FAF5FF] px-4 sm:px-6 lg:px-8 py-16 sm:py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <motion.div
            className='text-center mb-12 sm:mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl sm:text-4xl  font-bold text-[#111827] mb-4'>
              How Giftseon Works
            </h2>
            <p className='text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed'>
              Simple steps to create memorable celebrations
            </p>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            className='grid md:grid-cols-3 gap-6'
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            {howItWorksSteps.map((step) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.number}
                  className='text-center group'
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent
                      className='w-8 h-8 sm:w-10 sm:h-10 text-white'
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className='text-xl sm:text-2xl sm:leading-8 font-semibold text-[#111827] mb-[14px]'>
                    {step.number} {step.title}
                  </h3>
                  <p className='text-base text-[#4B5563] leading-[26px] max-w-sm mx-auto'>
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Everything You Need Section */}
      <motion.section
        id='features'
        className='px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <motion.div
            className='text-center mb-12 sm:mb-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl sm:text-4xl  font-bold text-[#111827] mb-4'>
              Everything You Need
            </h2>
            <p className='text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed'>
              Powerful features designed for seamless celebrations
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className='grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className='group border border-[#F3F4F6] rounded-2xl p-6 sm:p-8'
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent
                      className='w-6 h-6 text-white'
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className='text-xl leading-7 font-semibold text-[#111827] mb-2.5'>
                    {feature.title}
                  </h3>
                  <p className='text-base text-[#4B5563] leading-6'>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}

export default HowItWorks
