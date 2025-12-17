"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import TestResultsSection from "@/components/test-results-section"

export default function TestResultsPage() {
  const reportRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (reportRef.current) {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 print:bg-white print:min-h-0">
      <div className="p-4 md:p-8 print:p-0">
        {/* Print Button */}
        <div className="mb-6 flex gap-3 justify-end no-print">
          <Button
            onClick={handlePrint}
            className="bg-gray-700 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-shadow"
          >
            🖨️ Print / Save as PDF
          </Button>
        </div>

        {/* Test Results Section */}
        <div ref={reportRef} className="bg-white print:bg-white shadow-lg print:shadow-none rounded-lg print:rounded-none">
          <TestResultsSection />
        </div>
      </div>
    </div>
  )
}
