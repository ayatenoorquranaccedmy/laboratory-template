import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MetaMaskErrorHandler } from '@/components/metamask-error-handler'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://greenmedicallab.com'),
  title: {
    template: '%s | Green Medical Laboratory',
    default: 'Green Medical Laboratory - Professional Lab Reports & Medical Testing | Peshawar',
  },
  description: 'Green Medical Laboratory in Peshawar provides accurate medical test reports, blood tests, and comprehensive laboratory services. Generate professional lab reports instantly.',
  keywords: [
    'medical laboratory',
    'lab reports',
    'blood test',
    'medical testing',
    'laboratory services',
    'Peshawar lab',
    'clinical pathology',
    'health diagnostics',
    'medical reports',
    'pathology lab',
  ],
  authors: [{ name: 'Green Medical Laboratory' }],
  creator: 'Green Medical Laboratory',
  publisher: 'Green Medical Laboratory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Green Medical Laboratory',
    title: 'Green Medical Laboratory - Professional Lab Reports & Medical Testing',
    description: 'Green Medical Laboratory in Peshawar provides accurate medical test reports, blood tests, and comprehensive laboratory services. Generate professional lab reports instantly.',
    images: [
      {
        url: '/logo1.png',
        width: 1200,
        height: 630,
        alt: 'Green Medical Laboratory Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green Medical Laboratory - Professional Lab Reports & Medical Testing',
    description: 'Generate professional medical lab reports instantly. Blood tests, pathology reports, and comprehensive laboratory services in Peshawar.',
    images: ['/logo1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'Medical Laboratory',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <MetaMaskErrorHandler />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
