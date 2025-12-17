"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

// Test data structure
interface TestItem {
  name: string
  normalRange: string
}

interface TestCategory {
  name: string
  tests: TestItem[]
}

// All test categories and tests
const testCategories: TestCategory[] = [
  {
    name: "HEMATOLOGY",
    tests: [
      { name: "FBC", normalRange: "See individual parameters" },
      { name: "HB%", normalRange: "M: 13.5-17.5 g/dL, F: 12.0-15.5 g/dL" },
      { name: "ESR", normalRange: "M: 0-15 mm/hr, F: 0-20 mm/hr" },
      { name: "Peripheral Smear", normalRange: "Normal" },
      { name: "MP Smear", normalRange: "Negative" },
    ],
  },
  {
    name: "CHEMICAL PATHOLOGY",
    tests: [
      { name: "Glucose (F)", normalRange: "70-100 mg/dL" },
      { name: "Glucose (R)", normalRange: "< 140 mg/dL" },
      { name: "HBA1C", normalRange: "< 5.7%" },
    ],
  },
  {
    name: "LIPID PROFILE",
    tests: [
      { name: "Triglyceride", normalRange: "< 150 mg/dL" },
      { name: "Cholesterol", normalRange: "< 200 mg/dL" },
      { name: "LDL", normalRange: "< 100 mg/dL" },
      { name: "HDL", normalRange: "M: > 40 mg/dL, F: > 50 mg/dL" },
    ],
  },
  {
    name: "KIDNEY PROFILE",
    tests: [
      { name: "Blood Urea", normalRange: "7-20 mg/dL" },
      { name: "S. Creatinine", normalRange: "M: 0.7-1.3 mg/dL, F: 0.6-1.1 mg/dL" },
      { name: "Calcium", normalRange: "8.5-10.5 mg/dL" },
      { name: "Uric Acid", normalRange: "M: 3.4-7.0 mg/dL, F: 2.4-6.0 mg/dL" },
      { name: "Electrolytes", normalRange: "See individual parameters" },
      { name: "Sodium", normalRange: "136-145 mEq/L" },
      { name: "Potassium", normalRange: "3.5-5.0 mEq/L" },
      { name: "Chloride", normalRange: "98-107 mEq/L" },
    ],
  },
  {
    name: "LIVER FUNCTION TEST",
    tests: [
      { name: "SBR", normalRange: "Total: 0.1-1.2 mg/dL" },
      { name: "SGPT", normalRange: "M: 10-40 U/L, F: 7-35 U/L" },
      { name: "SGOT", normalRange: "M: 10-40 U/L, F: 9-32 U/L" },
      { name: "ALP", normalRange: "44-147 U/L" },
      { name: "S. Albumin", normalRange: "3.5-5.0 g/dL" },
      { name: "S. Protein", normalRange: "6.0-8.3 g/dL" },
    ],
  },
  {
    name: "CARDIAC PROFILE",
    tests: [
      { name: "CPK", normalRange: "M: 39-308 U/L, F: 26-192 U/L" },
      { name: "LGK", normalRange: "See individual parameters" },
      { name: "SGOT", normalRange: "M: 10-40 U/L, F: 9-32 U/L" },
    ],
  },
  {
    name: "COAGULATION PROFILE",
    tests: [
      { name: "PT", normalRange: "11-13.5 seconds" },
      { name: "APTT", normalRange: "25-35 seconds" },
      { name: "BT", normalRange: "2-7 minutes" },
      { name: "CT", normalRange: "2-8 minutes" },
    ],
  },
  {
    name: "HAEMOLYTIC SCREENING",
    tests: [{ name: "G6PD Screening", normalRange: "Normal" }],
  },
  {
    name: "CLINICAL PATHOLOGY",
    tests: [
      { name: "Urine RE", normalRange: "Normal" },
      { name: "Stool RE", normalRange: "Normal" },
      { name: "Semen Analysis", normalRange: "See parameters" },
    ],
  },
  {
    name: "MICROBIOLOGY",
    tests: [
      { name: "HBs", normalRange: "Negative" },
      { name: "HCV", normalRange: "Negative" },
      { name: "ICT Typhidot", normalRange: "Negative" },
      { name: "ICT MP", normalRange: "Negative" },
      { name: "ICT for TB", normalRange: "Negative" },
      { name: "RAF", normalRange: "Negative" },
      { name: "WIDAL", normalRange: "< 1:80" },
      { name: "ASO Titre", normalRange: "< 200 IU/mL" },
      { name: "Toxoplasmosis", normalRange: "Negative" },
      { name: "Brucella", normalRange: "Negative" },
      { name: "HIV", normalRange: "Negative" },
      { name: "H. Pylori", normalRange: "Negative" },
      { name: "VDRL", normalRange: "Non-reactive" },
      { name: "HAV", normalRange: "Negative" },
      { name: "HBEAG", normalRange: "Negative" },
      { name: "Blood Group", normalRange: "A, B, AB, O" },
      { name: "Pregnancy", normalRange: "Positive/Negative" },
      { name: "T3", normalRange: "80-200 ng/dL" },
      { name: "T4", normalRange: "4.5-12.0 μg/dL" },
      { name: "TSH", normalRange: "0.4-4.0 mIU/L" },
      { name: "LH", normalRange: "M: 1.5-9.3 mIU/mL, F: 1.0-11.4 mIU/mL" },
      { name: "FSH", normalRange: "M: 1.4-18.1 mIU/mL, F: 3.5-12.5 mIU/mL" },
      { name: "Prolactin", normalRange: "M: 2-18 ng/mL, F: 3-30 ng/mL" },
      { name: "TET", normalRange: "As per test" },
      { name: "OTHER", normalRange: "As per test" },
    ],
  },
]

export default function TestResultsSection() {
  const [testResults, setTestResults] = useState<Record<string, { checked: boolean; result: string }>>({})

  const handleCheckboxChange = (categoryName: string, testName: string, checked: boolean) => {
    const key = `${categoryName}-${testName}`
    setTestResults((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        checked,
        result: prev[key]?.result || "",
      },
    }))
  }

  const handleResultChange = (categoryName: string, testName: string, value: string) => {
    const key = `${categoryName}-${testName}`
    setTestResults((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        checked: prev[key]?.checked || false,
        result: value,
      },
    }))
  }

  return (
    <div className="bg-white w-full print:bg-white" style={{ minHeight: "100vh" }}>
      {/* Test Results Section */}
      <div className="p-4 md:p-6 lg:p-8 print:p-6">
        <div className="max-w-7xl mx-auto print:max-w-full">
          {/* Section Title */}
          <div className="mb-6 print:mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 print:text-xl border-b-2 border-gray-400 pb-2 print:pb-1">
              TEST RESULTS
            </h2>
          </div>

          {/* Test Categories */}
          <div className="space-y-5 print:space-y-4">
            {testCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="border border-gray-400 rounded-sm overflow-hidden print:border-gray-500 print:break-inside-avoid shadow-sm print:shadow-none"
              >
                {/* Category Header - Gray Bar */}
                <div className="bg-gray-300 px-4 py-2.5 print:bg-gray-400 print:px-3 print:py-2">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 uppercase tracking-wide print:text-sm">
                    {category.name}
                  </h3>
                </div>

                {/* Tests Table */}
                <div className="overflow-x-auto print:overflow-visible">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-300 print:bg-gray-200">
                        <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-700 w-12 print:px-2 print:py-1.5 print:text-xs">
                          {/* Checkbox column - empty header */}
                        </th>
                        <th className="px-4 py-2.5 text-left text-sm font-bold text-gray-800 print:px-3 print:py-1.5 print:text-xs border-l border-gray-300">
                          TEST
                        </th>
                        <th className="px-4 py-2.5 text-left text-sm font-bold text-gray-800 print:px-3 print:py-1.5 print:text-xs border-l border-gray-300">
                          RESULT
                        </th>
                        <th className="px-4 py-2.5 text-left text-sm font-bold text-gray-800 print:px-3 print:py-1.5 print:text-xs border-l border-gray-300">
                          NORMAL RANGE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.tests.map((test, testIndex) => {
                        const key = `${category.name}-${test.name}`
                        const testData = testResults[key] || { checked: false, result: "" }

                        return (
                          <tr
                            key={testIndex}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors print:border-gray-300 print:hover:bg-transparent ${
                              testIndex % 2 === 0 ? "bg-white" : "bg-gray-50 print:bg-white"
                            }`}
                          >
                            {/* Checkbox Column */}
                            <td className="px-3 py-2.5 print:px-2 print:py-1.5 align-middle">
                              <div className="print:hidden">
                                <Checkbox
                                  checked={testData.checked}
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange(category.name, test.name, checked === true)
                                  }
                                  className="border-gray-400"
                                />
                              </div>
                              <div className="hidden print:block text-center text-sm">
                                {testData.checked ? "☑" : "☐"}
                              </div>
                            </td>

                            {/* Test Name Column */}
                            <td className="px-4 py-2.5 text-sm font-medium text-gray-800 print:px-3 print:py-1.5 print:text-xs border-l border-gray-200">
                              {test.name}
                            </td>

                            {/* Result Input Column */}
                            <td className="px-4 py-2.5 print:px-3 print:py-1.5 border-l border-gray-200">
                              <div className="print:hidden">
                                <Input
                                  type="text"
                                  value={testData.result}
                                  onChange={(e) => handleResultChange(category.name, test.name, e.target.value)}
                                  placeholder=""
                                  className="w-full h-9 text-sm border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 bg-white"
                                />
                              </div>
                              <div className="hidden print:block text-xs text-gray-800 min-h-[1.25rem] border-b border-gray-400 pb-0.5">
                                {testData.result || " "}
                              </div>
                            </td>

                            {/* Normal Range Column */}
                            <td className="px-4 py-2.5 text-sm text-gray-700 print:px-3 print:py-1.5 print:text-xs border-l border-gray-200">
                              {test.normalRange}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-10 pt-6 border-t-2 border-gray-400 print:mt-6 print:pt-4 print:border-t border-gray-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 print:px-6 print:max-w-full">
          <div className="space-y-4 print:space-y-3">
            {/* Note */}
            <div className="text-sm text-gray-700 print:text-xs print:leading-relaxed">
              <p className="font-semibold mb-1.5 print:mb-1 text-gray-800">Note:</p>
              <p className="text-gray-700">
                This is a computer-generated report and does not require a signature.
              </p>
            </div>

            {/* Consultant Pathologist */}
            <div className="text-sm text-gray-700 print:text-xs print:leading-relaxed">
              <p className="font-semibold mb-1.5 print:mb-1 text-gray-800">Consultant Pathologist:</p>
              <p className="text-gray-700">Dr. Ayub Khan</p>
              <p className="text-gray-700">M.B.B.S (PMDC), R.M.P</p>
            </div>

            {/* Laboratory Address */}
            <div className="text-sm text-gray-700 print:text-xs print:leading-relaxed">
              <p className="font-semibold mb-1.5 print:mb-1 text-gray-800">Laboratory Address:</p>
              <p className="text-gray-700">Green Medical Laboratory</p>
              <p className="text-gray-700">First Floor, Cantonment Plaza</p>
              <p className="text-gray-700">Near Ibrahimi Medical Center</p>
              <p className="text-gray-700">Dabgari Garden, Peshawar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
