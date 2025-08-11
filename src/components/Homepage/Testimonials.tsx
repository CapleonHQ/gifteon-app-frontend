'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const Testimonials = () => {
  const swiperRef = useRef(null)

  const testimonials = [
    {
      name: 'James Oduya',
      role: 'Content Creator',
      avatar: 'J',
      avatarColor: 'bg-gradient-to-br from-orange-400 to-red-500',
      quote:
        "Gifteon has transformed how I connect with my audience. It's not just about gifts - it's about building a real community around my creative work.",
    },
    {
      name: 'Sarah Adebayo',
      role: 'Event Planner',
      avatar: 'S',
      avatarColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
      quote:
        'Planning celebrations became so much easier with Gifteon. My clients love how their guests can contribute meaningfully to special moments.',
    },
    {
      name: 'Michael Chen',
      role: 'Entrepreneur',
      avatar: 'M',
      avatarColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      quote:
        'We used Gifteon for our startup launch party. The community response was incredible - it felt like everyone was truly part of our journey.',
    },
    {
      name: 'Aisha Mohammed',
      role: 'Teacher',
      avatar: 'A',
      avatarColor: 'bg-gradient-to-br from-green-400 to-teal-500',
      quote:
        "My students surprised me with a Gifteon page for Teacher's Day. The heartfelt messages and support meant more than any gift ever could.",
    },
  ]

  // Swiper configuration
  const swiperConfig = {
    modules: [Pagination, Autoplay, EffectFade],
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      bulletClass: 'swiper-pagination-bullet custom-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
    },
    navigation: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: true,
    speed: 600,
    /* eslint-disable @typescript-eslint/no-explicit-any  */
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper
    },
  }

  return (
    <div
      className='bg-gradient-to-b from-[#FAF5FF] to-[#FDF2F8] py-16 sm:py-20 relative overflow-hidden'
      id='stories'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-12 sm:mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl sm:text-4xl  font-bold text-[#111827] mb-4'>
            Stories from Our Community
          </h2>
          <p className='text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto leading-relaxed'>
            Real experiences from real celebrations
          </p>
        </motion.div>

        {/* Testimonial Slider with SwiperJS */}
        <div className='relative max-w-[992px] mx-auto'>
          <Swiper {...swiperConfig} className='testimonials-swiper'>
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className='bg-white rounded-2xl p-8  shadow-xl hover:shadow-2xl transition-shadow duration-300'
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6'>
                    {/* Avatar */}
                    <motion.div
                      className={`w-14 h-14 sm:w-16 sm:h-16 ${testimonial.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <span className='text-xl font-bold text-white'>
                        {testimonial.avatar}
                      </span>
                    </motion.div>

                    {/* User Info */}
                    <div className='text-left'>
                      <h3 className='text-xl leading-7 font-bold text-[#111827]'>
                        {testimonial.name}
                      </h3>
                      <p className='text-base text-[#4B5563]'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className='text-lg text-[#374151] italic leading-[29.25px]'>
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
