import React from 'react'
import MainLayout from '../../components/Layout'

const LandingPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <MainLayout>
      <div className='motion-container'>{children}</div>
    </MainLayout>
  )
}

export default LandingPageLayout
