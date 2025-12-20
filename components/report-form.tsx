"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TestItem {
  name: string
  normalRange: string
}

interface TestCategory {
  name: string
  tests: TestItem[]
}

// All test categories and tests with pre-filled normal ranges
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
  specimen: string
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
  selectedTests: SelectedTest[]
  notes: string
  shouldPrint?: boolean
}

interface ReportFormProps {
  onSubmit: (data: ReportData) => void
}

const generateReportNumber = () => {
  return `GLR-${Date.now().toString().slice(-8)}`
}

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const [selectedTests, setSelectedTests] = useState<Record<string, SelectedTest>>({})
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const resultInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  
  const [formData, setFormData] = useState<Omit<ReportData, "selectedTests">>({
    patientName: "",
    fatherName: "",
    age: "",
    gender: "Male",
    specimen: "Blood",
    contactNumber: "",
    patientId: "",
    reportNumber: generateReportNumber(),
    date: new Date().toISOString().split("T")[0],
    testName: "Blood Test",
    sampleType: "",
    collectionDate: "",
    reportDate: new Date().toISOString().split("T")[0],
    technicianName: "",
    referredByDoctor: "",
    investigation: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Allow intermediate typing for age, but validate final value on submit
    // Only prevent obviously invalid inputs (negative numbers)
    if (name === "age" && value !== "" && value !== "-") {
      const ageNum = parseInt(value, 10)
      // Allow empty, single digits, or numbers within valid range while typing
      // But prevent values that are clearly out of range
      if (!isNaN(ageNum) && (ageNum < 0 || ageNum > 100)) {
        return // Prevent updating with invalid values
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategorySelect = (categoryName: string) => {
    if (categoryName && !selectedCategories.has(categoryName)) {
      setSelectedCategories((prev) => new Set([...prev, categoryName]))
    }
    setSelectedCategory("") // Reset dropdown after selection
  }

  const handleCategoryRemove = (categoryName: string) => {
    // Remove category from visible/selected categories
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      next.delete(categoryName)
      return next
    })

    // Remove all tests that belong to this category
    setSelectedTests((prev) => {
      const newTests: Record<string, SelectedTest> = {}
      Object.entries(prev).forEach(([key, value]) => {
        if (!key.startsWith(`${categoryName}-`)) {
          newTests[key] = value
        }
      })
      return newTests
    })

    // Clean up any stored input refs for this category
    Object.keys(resultInputRefs.current).forEach((key) => {
      if (key.startsWith(`${categoryName}-`)) {
        delete resultInputRefs.current[key]
      }
    })
  }

  const handleCheckboxChange = (categoryName: string, testName: string, checked: boolean) => {
    const key = `${categoryName}-${testName}`
    if (checked) {
      const test = testCategories
        .find((cat) => cat.name === categoryName)
        ?.tests.find((t) => t.name === testName)
      if (test) {
        setSelectedTests((prev) => ({
          ...prev,
          [key]: {
            category: categoryName,
            testName: testName,
            result: "",
            normalRange: test.normalRange,
            checked: true,
          },
        }))
        // Auto-focus on result input field after a short delay
        setTimeout(() => {
          const inputRef = resultInputRefs.current[key]
          if (inputRef) {
            inputRef.focus()
          }
        }, 10)
      }
    } else {
      setSelectedTests((prev) => {
        const newTests = { ...prev }
        if (newTests[key]) {
          newTests[key] = {
            ...newTests[key],
            checked: false,
            // Keep the result value, just mark as unchecked
          }
        }
        return newTests
      })
    }
  }

  const handleResultChange = (categoryName: string, testName: string, value: string) => {
    const key = `${categoryName}-${testName}`
    setSelectedTests((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        result: value,
      },
    }))
  }

  const handleNormalRangeChange = (categoryName: string, testName: string, value: string) => {
    const key = `${categoryName}-${testName}`
    setSelectedTests((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        normalRange: value,
      },
    }))
  }

  // Handle keyboard navigation (Tab/Enter to next enabled field)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, categoryName: string, testName: string) => {
    if (e.key === "Enter" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault()
      const currentKey = `${categoryName}-${testName}`
      const allTestKeys = Array.from(selectedCategories)
        .flatMap((catName) => {
          const category = testCategories.find((c) => c.name === catName)
          return category?.tests.map((test) => `${catName}-${test.name}`) || []
        })
        .filter((key) => selectedTests[key]?.checked)

      const currentIndex = allTestKeys.indexOf(currentKey)
      if (currentIndex >= 0 && currentIndex < allTestKeys.length - 1) {
        const nextKey = allTestKeys[currentIndex + 1]
        const nextInputRef = resultInputRefs.current[nextKey]
        if (nextInputRef) {
          nextInputRef.focus()
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent, shouldPrintAfterSave: boolean = false) => {
    e.preventDefault()
    
    // Validate age
    const ageNum = parseInt(formData.age, 10)
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 100) {
      alert("Please enter a valid age between 1 and 100.")
      return
    }
    
    // Only include checked tests with results
    const selectedTestsArray = Object.values(selectedTests).filter(
      (test) => test.checked && test.result.trim() !== ""
    )
    
    if (selectedTestsArray.length === 0) {
      alert("Please select at least one test and enter its result.")
      return
    }

    onSubmit({
      ...formData,
      selectedTests: selectedTestsArray,
      shouldPrint: shouldPrintAfterSave,
    })
  }

  // Get visible categories (only selected ones)
  const visibleCategories = testCategories.filter((category) => selectedCategories.has(category.name))

  return (
    <div className="min-h-screen from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-40 h-40 rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src="/logo1.png" 
                alt="Lab Logo" 
                width={160} 
                height={160}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">GREEN MEDICAL LABORATORY</h1>
              <p className="text-gray-600">Dabgari Garden Peshawar</p>
              <p className="text-gray-600">+92 313 9516796 | +92 322 5048966</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Patient Information Section */}
          <Card className="mb-6 p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-300">
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
                <Input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                  min="1"
                  max="100"
                  required
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Referred By Doctor</label>
                <Input
                  type="text"
                  name="referredByDoctor"
                  value={formData.referredByDoctor}
                  onChange={handleInputChange}
                  placeholder="Doctor Name"
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Investigation *</label>
                <Input
                  type="text"
                  name="investigation"
                  value={formData.investigation}
                  onChange={handleInputChange}
                  placeholder="Investigation"
                  required
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specimen *</label>
                <select
                  name="specimen"
                  value={formData.specimen}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Blood</option>
                  <option>Urine</option>
                  <option>Other</option>
                </select>
              </div>
              <div />
            </div>
          </Card>

          {/* Test Results Section - Dynamic Category Selection */}
          <Card className="mb-6 p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-300">Test Results</h2>
            <p className="text-sm text-gray-600 mb-4">Select a test category to load tests. Check tests and enter results.</p>

            {/* Category Selection Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Test Category</label>
              <Select value={selectedCategory} onValueChange={handleCategorySelect}>
                <SelectTrigger className="w-full md:w-80 border-gray-300">
                  <SelectValue placeholder="Choose a test category..." />
                </SelectTrigger>
                <SelectContent>
                  {testCategories.map((category) => (
                    <SelectItem
                      key={category.name}
                      value={category.name}
                      disabled={selectedCategories.has(category.name)}
                    >
                      {category.name}
                      {selectedCategories.has(category.name) && " (Already Added)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Test Categories */}
            {visibleCategories.length > 0 ? (
              <div className="space-y-5">
                {visibleCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border border-gray-300 rounded-sm overflow-hidden">
                    {/* Category Header */}
                    <div className="bg-gray-200 px-4 py-2 flex items-center justify-between gap-2">
                      <h3 className="text-base md:text-lg font-bold text-gray-800 uppercase tracking-wide">
                        {category.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCategoryRemove(category.name)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>

                    {/* Tests Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 w-12"></th>
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-800 border-l border-gray-300">
                              TEST
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-800 border-l border-gray-300">
                              RESULT
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-800 border-l border-gray-300">
                              NORMAL RANGE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.tests.map((test, testIndex) => {
                            const key = `${category.name}-${test.name}`
                            const testData = selectedTests[key]
                            const isChecked = testData?.checked || false

                            return (
                              <tr
                                key={testIndex}
                                className={`border-b border-gray-200 ${
                                  testIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                              >
                                {/* Checkbox Column */}
                                <td className="px-3 py-2 align-middle">
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) =>
                                      handleCheckboxChange(category.name, test.name, checked === true)
                                    }
                                    className="border-gray-400"
                                  />
                                </td>

                                {/* Test Name Column */}
                                <td className="px-4 py-2 text-sm font-medium text-gray-800 border-l border-gray-200">
                                  {test.name}
                                </td>

                                {/* Result Input Column */}
                                <td className="px-4 py-2 border-l border-gray-200">
                                  <Input
                                    type="text"
                                    ref={(el) => {
                                      resultInputRefs.current[key] = el
                                    }}
                                    value={testData?.result || ""}
                                    onChange={(e) => handleResultChange(category.name, test.name, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, category.name, test.name)}
                                    placeholder="Enter result"
                                    disabled={!isChecked}
                                    className={`w-full h-9 text-sm border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 ${
                                      isChecked
                                        ? "bg-white cursor-text"
                                        : "bg-gray-100 cursor-not-allowed opacity-50"
                                    }`}
                                  />
                                </td>

                                {/* Normal Range Column */}
                                <td className="px-4 py-2 border-l border-gray-200">
                                  {isChecked ? (
                                    <Input
                                      type="text"
                                      value={testData?.normalRange || test.normalRange}
                                      onChange={(e) => handleNormalRangeChange(category.name, test.name, e.target.value)}
                                      className="w-full h-9 text-sm border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 bg-white"
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-600">{test.normalRange}</div>
                                  )}
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
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No test categories selected. Please select a category from the dropdown above.</p>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mb-8">
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Save Report
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Save & Print Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
