import localFont from 'next/font/local'

const sfPro = localFont({
  src: [
    // Light - 300
    {
      path: '../../public/assets/fonts/SF-Pro-Text-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SF-Pro-Text-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    // Regular - 400
    {
      path: '../../public/assets/fonts/SF-Pro-Text-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SF-Pro-Text-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    // Medium - 500
    {
      path: '../../public/assets/fonts/SF-Pro-Text-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SF-Pro-Text-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    // Semibold - 600
    {
      path: '../../public/assets/fonts/SF-Pro-Text-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SF-Pro-Text-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    // Bold - 700
    {
      path: '../../public/assets/fonts/SF-Pro-Text-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SF-Pro-Text-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    // Heavy - 800
    {
      path: '../../public/assets/fonts/SF-Pro-Text-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/SF-Pro-Text-HeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
})

export default sfPro
