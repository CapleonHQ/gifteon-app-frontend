import Hero from '@/components/Homepage/Hero'
import StatsFeatures from '@/components/Homepage/StatsFeatures'
import HowItWorks from '@/components/Homepage/HowItWorks'
import Testimonials from '@/components/Homepage/Testimonials'
import CtaSection from '@/components/Homepage/CtaSection'
// import Waitlist from '../../components/Homepage/WaitList'

export default function Home() {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      <Hero />
      <StatsFeatures />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
      {/* <Waitlist /> */}
    </div>
  )
}
