"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ReportForm from "@/components/report-form"
import ReportPreview from "@/components/report-preview"

interface SelectedTest {
  category: string
  testName: string
  result: string
  normalRange: string
  checked: boolean
}

interface ReportData {
  patientName: string
  fatherName: string
  age: string
  gender: string
  contactNumber: string
  patientId: string
  reportNumber: string
  date: string
  testName: string
  sampleType: string
  collectionDate: string
  reportDate: string
  technicianName: string
  referredByDoctor: string
  investigation: string
  specimen: string
  selectedTests: SelectedTest[]
  notes: string
  shouldPrint?: boolean
}

export default function Home() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (data: ReportData) => {
    setReportData(data)
  }

  const handlePrint = () => {
    if (reportRef.current) {
      window.print()
    }
  }

  const handleBack = () => {
    setReportData(null)
  }

  // Auto-print when report is generated with shouldPrint flag
  useEffect(() => {
    if (reportData?.shouldPrint && reportRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.print()
        // Reset shouldPrint flag after printing
        setReportData((prev) => prev ? { ...prev, shouldPrint: false } : null)
      }, 300)
    }
  }, [reportData])

  // Hide browser UI elements during print
  useEffect(() => {
    const handleBeforePrint = () => {
      // Hide any browser UI elements
      document.body.style.margin = "0"
      document.body.style.padding = "0"
    }

    const handleAfterPrint = () => {
      // Restore styles if needed
    }

    window.addEventListener("beforeprint", handleBeforePrint)
    window.addEventListener("afterprint", handleAfterPrint)

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint)
      window.removeEventListener("afterprint", handleAfterPrint)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!reportData ? (
        <ReportForm onSubmit={handleSubmit} />
      ) : (
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex gap-3 justify-end no-print">
              <Button onClick={handleBack} variant="outline" className="border-gray-300 bg-transparent">
                Back to Form
              </Button>
              <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700 text-white">
                Print / Save as PDF
              </Button>
            </div>

            <div ref={reportRef}>
              <ReportPreview data={reportData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
