'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Gift, AlertCircle, CheckCircle } from 'lucide-react'
import { loginUser, verifyOtp } from '../../../lib/apis/auth'

type LoginStep = 'login' | 'verification' | 'success'

const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState<LoginStep>('login')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for resend
  useEffect(() => {
    if (currentStep === 'verification' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, currentStep])

  // Focus first OTP input when step changes to verification
  useEffect(() => {
    if (currentStep === 'verification') {
      inputRefs.current[0]?.focus()
    }
  }, [currentStep])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await loginUser({ email })
      setCurrentStep('verification')
    } catch (error: any) {
      console.log(error)

      let errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed. Please try again.'

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')

    if (pastedData.length === 6) {
      const newOtp = pastedData.split('').slice(0, 6)
      setOtp(newOtp)
      // Focus the last input after paste
      inputRefs.current[5]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    const { key } = e

    if (key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    } else if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (otp.every((digit) => digit !== '')) {
        setIsLoading(true)
        await verifyOtp({ email, otp: otp.join() })
      }
    } catch (error: any) {
      let errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed. Please try again.'

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    if (canResend) {
      setIsResending(true)
      // Simulate API call
      setTimeout(() => {
        setCountdown(59)
        setCanResend(false)
        setIsResending(false)
        console.log('Resending verification')
      }, 1500)
    }
  }

  const handleBackToLogin = () => {
    setCurrentStep('login')
    setOtp(['', '', '', '', '', ''])
    setError('')
  }

  const handleProceedToDashboard = () => {
    console.log('Proceeding to dashboard')
    // Navigate to dashboard
  }

  const renderLogin = () => (
    <div className='flex-1 flex flex-col gap-4 sm:gap-7 lg:gap-10 justify-center items-center'>
      {/* Welcome Section */}
      <div className='mb-2 flex flex-col items-center'>
        <h2 className='text-4xl sm:text-5xl font-bold text-black mb-2'>
          Welcome back
        </h2>
        <p className='text-black text-lg'>Login to your account to continue</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className='space-y-6 w-full'>
        {/* Error Message */}
        {error && (
          <div className='flex items-start space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg'>
            <AlertCircle className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' />
            <div className='flex-1'>
              <p className='text-red-800 text-sm font-medium'>Login Failed</p>
              <p className='text-red-700 text-sm mt-1'>{error}</p>
            </div>
            <button
              onClick={() => setError('')}
              className='text-red-400 hover:text-red-600 transition-colors'
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        )}

        {/* Email Input */}
        <div>
          <input
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              // Clear error when user starts typing
              if (error) setError('')
            }}
            placeholder='Enter your email address'
            className={`w-full px-4 py-[17px] border rounded-xl outline-hidden focus:ring-1 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
                : 'border-[#4B5563] focus:ring-orange-500 focus:border-transparent'
            }`}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Logging in...</span>
            </div>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className='flex items-center justify-center'>
        <div className='border-t border-black-300 flex-1'></div>
        <span className='px-4 text-black font-bold'>OR</span>
        <div className='border-t border-gray-300 flex-1'></div>
      </div>

      {/* Social Login Buttons */}
      <div className='flex flex-col gap-8 w-full'>
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          {/* Google Button */}
          <button
            type='button'
            onClick={() => handleSocialLogin('google')}
            className='w-full py-3.5 px-[18.5px] border border-[#587DBD] rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-200'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            <span className='font-semibold text-black'>
              Continue with Google
            </span>
          </button>

          {/* Apple Button */}
          <button
            type='button'
            onClick={() => handleSocialLogin('apple')}
            className='w-full py-3.5 px-[18.5px] bg-black text-white rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-200'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
            </svg>
            <span className='font-medium'>Continue with Apple</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className='text-center text-black text-lg font-medium'>
          Don't have an account?{' '}
          <Link
            href='/auth/register'
            className='text-[#F35427] font-semibold hover:text-orange-600 transition-colors duration-200'
          >
            Create new account
          </Link>
        </p>
      </div>
    </div>
  )

  const renderVerification = () => (
    <div className='flex-1 flex flex-col gap-4 sm:gap-7 lg:gap-10 justify-center items-center'>
      {/* Title */}
      <div className='mb-2 flex flex-col items-center text-center'>
        <h2 className='text-2xl sm:text-3xl font-bold text-black mb-2'>
          Have a verification code instead?
        </h2>
        <p className='text-black max-w-md'>
          Enter the code generated from the link sent to{' '}
          <span className='font-semibold'>{email}</span>
        </p>
      </div>

      {/* OTP Form */}
      <form
        onSubmit={handleOtpSubmit}
        className='flex flex-col items-center space-y-6 w-full'
      >
        {/* OTP Input Fields */}
        <div className='flex space-x-2 sm:space-x-4'>
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
              onPaste={index === 0 ? handleOtpPaste : undefined}
              className='w-12 h-12 sm:w-16 sm:h-16 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-200'
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type='submit'
          disabled={isLoading || !otp.every((digit) => digit !== '')}
          className='w-full max-w-sm py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed'
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

      {/* Resend Section */}
      <div className='text-center space-y-3'>
        <div>
          <p className='text-black text-sm mb-2'>
            Not seeing the email in your inbox?
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className='text-[#F35427] font-semibold hover:text-orange-600 transition-colors duration-200 underline disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isResending ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Try sending again'
              )}
            </button>
          ) : (
            <div className='flex items-center justify-center space-x-2 text-black text-sm'>
              <span>You can resend in</span>
              <span className='font-bold text-orange-500'>{countdown}s</span>
            </div>
          )}
        </div>

        {/* Different Email Link */}
        <p className='text-center text-black text-sm'>
          Not your email?{' '}
          <button
            onClick={handleBackToLogin}
            className='text-[#F35427] font-semibold hover:text-orange-600 transition-colors duration-200 underline'
          >
            Enter a different email
          </button>
        </p>
      </div>
    </div>
  )

  const renderSuccess = () => (
    <div className='flex-1 flex flex-col gap-4 sm:gap-7 lg:gap-10 justify-center items-center'>
      {/* Success Icon */}
      <div className='w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mb-4'>
        <CheckCircle className='w-10 h-10 sm:w-12 sm:h-12 text-white' />
      </div>

      {/* Success Message */}
      <div className='mb-2 flex flex-col items-center text-center'>
        <h2 className='text-4xl sm:text-5xl font-bold text-black mb-2'>
          Login Successful
        </h2>
        <p className='text-black text-lg'>
          Your email has been verified successfully
        </p>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handleProceedToDashboard}
        className='w-full max-w-sm py-4 bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold rounded-xl transition-all duration-200 hover:from-orange-600 hover:to-pink-600'
      >
        Continue to Dashboard
      </button>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return renderLogin()
      case 'verification':
        return renderVerification()
      case 'success':
        return renderSuccess()
      default:
        return renderLogin()
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex'>
      {/* Left Side - Form */}
      <div className='flex-1 bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#FAF5FF] relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute bottom-0 left-0 right-0 opacity-10 hidden lg:block'>
          <img
            src='/assets/images/bg-image.png'
            alt='Gift pattern background'
            className='w-full h-48 object-fill object-bottom'
          />
        </div>
        <div className='px-6'>
          <div className='relative z-10 flex flex-col w-full max-w-[560px] mx-auto min-h-screen pt-6 sm:pt-[34px] lg:pt-[56px] gap-4'>
            {/* Logo */}
            <Link href='/'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center'>
                  <Gift className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                </div>
                <span className='text-xl sm:text-2xl font-bold text-[#EA580C]'>
                  Gifsteon
                </span>
              </div>
            </Link>

            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='hidden lg:flex lg:flex-1 relative'>
        <div className='flex-1 bg-red-500'>
          <img
            src='/assets/images/login-right-image.png'
            alt='Gift boxes with balloons'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
