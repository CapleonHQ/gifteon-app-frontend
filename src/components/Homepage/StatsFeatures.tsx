'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cake, Crown, GraduationCap, Music } from 'lucide-react'

const StatsFeatures = () => {
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

  const stats = [
    { value: '50K+', label: 'Celebrations Created' },
    { value: '₦2.5B+', label: 'Gifts Shared' },
    { value: '200K+', label: 'Happy Users' },
    { value: '99.9%', label: 'Uptime' },
  ]

  const features = [
    {
      icon: Cake,
      title: 'Birthday Celebrations',
      description:
        'Create memorable birthday experiences with personalized gift collections',
      bgColor: 'bg-gradient-to-r from-[#EC4899] to-[#F43F5E]',
    },
    {
      icon: Crown,
      title: 'Weddings & Anniversaries',
      description:
        'Perfect for couples planning their special day or milestone celebrations',
      bgColor: 'bg-gradient-to-r from-[#A855F7] to-[#6366F1]',
    },
    {
      icon: GraduationCap,
      title: 'Graduations',
      description:
        "Celebrate academic achievements and support new graduates' next steps",
      bgColor: 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]',
    },
    {
      icon: Music,
      title: 'Creative Projects',
      description:
        'Support artists, creators, and entrepreneurs launching new ventures',
      bgColor: 'bg-gradient-to-r from-[#F97316] to-[#EAB308]',
    },
  ]

  return (
    <>
      <div className='bg-white relative overflow-hidden'>
        {/* Statistics Section */}
        <motion.section
          className='relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className='max-w-7xl mx-auto'>
            <motion.div
              className='grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16'
              variants={staggerContainer}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className='text-center'
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className='text-3xl sm:text-4xl sm:leading-10 font-bold bg-gradient-to-r from-[#EA580C] to-[#DB2777] bg-clip-text text-transparent mb-2'
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 * index,
                      duration: 0.6,
                      type: 'spring',
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className='text-sm sm:text-base text-[#4B5563]'>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
      {/* Features Section */}
      <div className='bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#FAF5FF] relative overflow-hidden'>
        <motion.section
          className='relative  px-4 sm:px-6 lg:px-8 py-16 sm:py-20'
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
                Perfect for Every Celebration
              </h2>
              <p className='text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed'>
                From birthdays to weddings, graduations to creative projects -
                Gifteon makes every moment special
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'
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
                    className='bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-[#F3F4F6]'
                    variants={fadeInUp}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent
                        className={`w-7 h-7 sm:w-8 sm:h-8 text-white`}
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className='text-xl leading-[28px] font-semibold text-[#111827] mb-2.5'>
                      {feature.title}
                    </h3>
                    <p className='text-[#4B5563] leading-[24px] text-base'>
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default StatsFeatures
