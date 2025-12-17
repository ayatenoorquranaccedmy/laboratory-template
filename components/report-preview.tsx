"use client"

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
}

interface ReportPreviewProps {
  data: ReportData
}

export default function ReportPreview({ data }: ReportPreviewProps) {
  // Group selected tests by category
  const testsByCategory: Record<string, SelectedTest[]> = {}
  
  data.selectedTests
    .filter((test) => test.checked)
    .forEach((test) => {
      if (!testsByCategory[test.category]) {
        testsByCategory[test.category] = []
      }
      testsByCategory[test.category].push(test)
    })

  const categories = Object.keys(testsByCategory)

  return (
    <div className="bg-white p-8 md:p-10 rounded-lg print:rounded-none shadow-lg print:shadow-none border print:border-none print:p-6">
      {/* Header */}
      <div className="border-b-4 border-green-600 pb-1 mb-2 print:border-b-2">
        <div className="flex items-start justify-between mb-4 print:mb-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center print:w-12 print:h-12">
              <span className="text-white font-bold text-2xl print:text-xl">GL</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-700 print:text-2xl">GREEN MEDICAL LABORATORY</h1>
              <p className="text-gray-600 font-semibold print:text-sm">Dabgari Garden Peshawar</p>
              <p className="text-gray-500 text-sm print:text-xs">+92 313 9516796 | +92 322 5048966</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600 print:text-sm">
              <span className="font-semibold">Date:</span> {data.date}
            </p>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="mb-4 print:mb-3">
        <h2 className="text-lg font-bold text-green-700 mb-3 pb-2 border-b-2 border-green-300 print:text-base print:mb-2 print:pb-1">
          Patient Information
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 print:gap-2">
          <div>
            <p className="text-gray-600 text-sm font-semibold print:text-xs">Name</p>
            <p className="text-gray-900 font-semibold print:text-sm">{data.patientName}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold print:text-xs">Age</p>
            <p className="text-gray-900 font-semibold print:text-sm">{data.age} Years</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold print:text-xs">Gender</p>
            <p className="text-gray-900 font-semibold print:text-sm">{data.gender}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold print:text-xs">Referred By</p>
            <p className="text-gray-900 font-semibold print:text-sm">{data.referredByDoctor}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold print:text-xs mb-1">Investigation</p>
            <p className="text-gray-900 font-semibold print:text-sm  border-gray-300 pb-1">{data.investigation || "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm font-semibold print:text-xs mb-1">Specimen</p>
            <p className="text-gray-900 font-semibold print:text-sm  border-gray-300 pb-1">{data.specimen || "-"}</p>
          </div>
        </div>
      </div>
      {/* Test Results Section - Only Selected Tests */}
      {categories.length > 0 ? (
        <div className="mb-6 print:mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-base print:mb-3 print:pb-1">
            TEST RESULTS
          </h2>

          <div className="space-y-5 print:space-y-4">
            {categories.map((categoryName, categoryIndex) => {
              const tests = testsByCategory[categoryName]
              return (
                <div
                  key={categoryIndex}
                  className="border border-gray-400 rounded-sm overflow-hidden print:border-gray-500 print:break-inside-avoid shadow-sm print:shadow-none"
                >
                  {/* Category Header - Gray Bar */}
                  <div className="bg-gray-300 px-4 py-2.5 print:bg-gray-400 print:px-3 print:py-2">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 uppercase tracking-wide print:text-sm">
                      {categoryName}
                    </h3>
                  </div>

                  {/* Tests Table */}
                  <div className="overflow-x-auto print:overflow-visible">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-300 print:bg-gray-200">
                          <th className="px-4 py-2.5 text-left text-sm font-bold text-gray-800 print:px-3 print:py-1.5 print:text-xs">
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
                        {tests.map((test, testIndex) => (
                          <tr
                            key={testIndex}
                            className={`border-b border-gray-200 print:border-gray-300 ${
                              testIndex % 2 === 0 ? "bg-white" : "bg-gray-50 print:bg-white"
                            }`}
                          >
                            {/* Test Name Column */}
                            <td className="px-4 py-2.5 text-sm font-medium text-gray-800 print:px-3 print:py-1.5 print:text-xs">
                              {test.testName}
                            </td>

                            {/* Result Column */}
                            <td className="px-4 py-2.5 text-sm text-gray-800 print:px-3 print:py-1.5 print:text-xs border-l border-gray-200 font-semibold">
                              {test.result || "-"}
                            </td>

                            {/* Normal Range Column */}
                            <td className="px-4 py-2.5 text-sm text-gray-700 print:px-3 print:py-1.5 print:text-xs border-l border-gray-200">
                              {test.normalRange}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="mb-6 print:mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-base print:mb-3 print:pb-1">
            TEST RESULTS
          </h2>
          <p className="text-gray-500 text-center py-8">No tests selected</p>
        </div>
      )}

      {/* Footer Section */}
      <div className="mt-10 pt-6 border-t-2 border-gray-400 print:mt-6 print:pt-4 print:border-t-2 print:border-gray-500 print:footer-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:gap-4 print:grid-cols-3">
          {/* Note */}
          <div className="text-sm text-gray-700 print:text-xs print:leading-relaxed">
            <p className="font-semibold mb-1.5 print:mb-1 text-gray-800">Note:</p>
            <p className="text-gray-700">This is a computer-generated report and does not require a signature.</p>
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
  )
}
