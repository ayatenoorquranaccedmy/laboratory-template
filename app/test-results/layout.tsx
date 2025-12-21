import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Results - View Laboratory Test Reports',
  description: 'View and print comprehensive laboratory test results. Access detailed pathology reports, blood test results, and medical diagnostics from Green Medical Laboratory.',
  keywords: [
    'test results',
    'laboratory reports',
    'pathology results',
    'blood test results',
    'medical test reports',
    'lab test view',
    'clinical results',
    'diagnostic reports',
  ],
  openGraph: {
    title: 'Test Results - Laboratory Test Reports | Green Medical Laboratory',
    description: 'View and print comprehensive laboratory test results. Access detailed pathology reports and medical diagnostics.',
    url: '/test-results',
    type: 'website',
  },
  twitter: {
    title: 'Test Results - Laboratory Test Reports',
    description: 'View and print comprehensive laboratory test results from Green Medical Laboratory.',
  },
  alternates: {
    canonical: '/test-results',
  },
}

export default function TestResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
