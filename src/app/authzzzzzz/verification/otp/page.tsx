'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Gift, Lock, Mail, CheckCircle, ArrowLeft } from 'lucide-react'

type VerificationStep =
  | 'method-selection'
  | 'otp-input'
  | 'magic-link-sent'
  | 'success'
type VerificationMethod = 'otp' | 'magic-link' | ''

const EmailVerificationFlow = () => {
  const [currentStep, setCurrentStep] =
    useState<VerificationStep>('method-selection')
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const [userEmail] = useState('t*******th23@gmail.com') // This would come from props or context

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for magic link resend
  useEffect(() => {
    if (currentStep === 'magic-link-sent' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, currentStep])

  // Focus first OTP input when step changes to OTP
  useEffect(() => {
    if (currentStep === 'otp-input') {
      inputRefs.current[0]?.focus()
    }
  }, [currentStep])

  const handleMethodSelect = (method: VerificationMethod) => {
    setSelectedMethod(method)
  }

  const handleContinueFromMethodSelection = () => {
    if (selectedMethod === 'otp') {
      setCurrentStep('otp-input')
    } else if (selectedMethod === 'magic-link') {
      setCurrentStep('magic-link-sent')
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.every((digit) => digit !== '')) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setCurrentStep('success')
      }, 2000)
    }
  }

  const handleResendMagicLink = () => {
    if (canResend) {
      setCountdown(59)
      setCanResend(false)
      console.log('Resending magic link')
    }
  }

  const handleSwitchToOTP = () => {
    setSelectedMethod('otp')
    setCurrentStep('otp-input')
  }

  const handleBackToMethodSelection = () => {
    setCurrentStep('method-selection')
    setSelectedMethod('')
    setOtp(['', '', '', ''])
  }

  const handleProceedToDashboard = () => {
    console.log('Proceeding to dashboard')
    // Navigate to dashboard
  }

  const renderMethodSelection = () => (
    <>
      {/* Title */}
      <div className='mb-2 flex flex-col text-center items-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4'>
          Verify Your Email Address
        </h2>
        <p className='text-black text-lg'>
          Select your preferred means of verifying your email address
        </p>
      </div>

      {/* Method Selection */}
      <div className='flex flex-col sm:flex-row gap-6 w-full max-w-md'>
        {/* OTP Option */}
        <div
          onClick={() => handleMethodSelect('otp')}
          className={`flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedMethod === 'otp'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className='flex flex-col items-center text-center space-y-3'>
            <div className='w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center'>
              <Lock className='w-6 h-6 text-white' />
            </div>
            <span className='font-semibold text-gray-700'>OTP</span>
          </div>
        </div>

        {/* Magic Link Option */}
        <div
          onClick={() => handleMethodSelect('magic-link')}
          className={`flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedMethod === 'magic-link'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className='flex flex-col items-center text-center space-y-3'>
            <div className='w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center'>
              <Mail className='w-6 h-6 text-white' />
            </div>
            <span className='font-semibold text-gray-700'>Magic Link</span>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinueFromMethodSelection}
        disabled={!selectedMethod}
        className='w-full max-w-md py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Continue
      </button>
    </>
  )

  const renderOtpInput = () => (
    <>
      {/* Back Button */}
      <button
        onClick={handleBackToMethodSelection}
        className='self-start flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4'
      >
        <ArrowLeft className='w-4 h-4' />
        <span>Back</span>
      </button>

      {/* Title */}
      <div className='mb-2 flex flex-col text-center items-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4'>
          Verify Your Email Address
        </h2>
        <p className='text-black text-base'>
          Enter the OTP sent to your email address {userEmail}
        </p>
      </div>

      {/* OTP Form */}
      <form
        onSubmit={handleOtpSubmit}
        className='flex flex-col items-center space-y-8 w-full'
      >
        {/* OTP Input Fields */}
        <div className='flex space-x-4'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className='w-16 h-16 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-200'
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type='submit'
          disabled={isLoading || !otp.every((digit) => digit !== '')}
          className='w-full max-w-md py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify Email Address'
          )}
        </button>
      </form>
    </>
  )

  const renderMagicLinkSent = () => (
    <>
      {/* Back Button */}
      <button
        onClick={handleBackToMethodSelection}
        className='self-start flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4'
      >
        <ArrowLeft className='w-4 h-4' />
        <span>Back</span>
      </button>

      {/* Title and Message */}
      <div className='mb-2 flex flex-col text-center items-center max-w-lg'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4'>
          Verify Your Email Address
        </h2>
        <p className='text-black text-lg mb-6'>
          Almost there 🎉 Just click the verification link we sent to{' '}
          <span className='font-semibold'>sar***@gmail.com</span> to start
          creating memories.
        </p>

        <div className='text-center'>
          <p className='text-black text-base mb-2'>Didn't receive link?</p>

          <div className='flex items-center justify-center space-x-2 text-black'>
            <span>You can resend in</span>
            <span className='font-bold text-orange-500'>{countdown}s</span>
            <span>Or</span>
            <button
              onClick={handleSwitchToOTP}
              className='text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-200 underline'
            >
              use an OTP instead
            </button>
          </div>
        </div>
      </div>

      {/* Resend Button (shown when countdown reaches 0) */}
      {canResend && (
        <button
          onClick={handleResendMagicLink}
          className='w-full max-w-md py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600'
        >
          Resend Magic Link
        </button>
      )}
    </>
  )

  const renderSuccess = () => (
    <>
      {/* Success Icon */}
      <div className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6'>
        <CheckCircle className='w-12 h-12 text-white' />
      </div>

      {/* Success Message */}
      <div className='mb-2 flex flex-col text-center items-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4'>
          Verification Successful
        </h2>
        <p className='text-black text-lg'>
          Your Email address has been verified successfully
        </p>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handleProceedToDashboard}
        className='w-full max-w-md py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600'
      >
        Proceed to Dashboard
      </button>
    </>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'method-selection':
        return renderMethodSelection()
      case 'otp-input':
        return renderOtpInput()
      case 'magic-link-sent':
        return renderMagicLinkSent()
      case 'success':
        return renderSuccess()
      default:
        return renderMethodSelection()
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex'>
      <div className='flex-1 bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#FAF5FF] relative overflow-hidden'>
        <div className='px-6'>
          <div className='relative z-10 flex flex-col w-full max-w-[590px] mx-auto min-h-screen pt-6 sm:pt-[34px] lg:pt-[56px] gap-4'>
            {/* Logo */}
            <Link href='/'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center'>
                  <Gift className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                </div>
                <span className='text-xl sm:text-2xl font-bold text-[#EA580C]'>
                  Giftseon
                </span>
              </div>
            </Link>

            <div className='flex-1 flex items-center justify-center'>
              <div className='flex-1 flex flex-col gap-4 sm:gap-7 lg:gap-10 justify-center items-center p-6 lg:p-[56px]'>
                {renderCurrentStep()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerificationFlow
