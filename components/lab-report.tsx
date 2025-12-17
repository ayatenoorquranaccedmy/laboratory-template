import { FlaskConical } from "lucide-react"

export default function LabReport() {
  return (
    <div
      className="bg-white shadow-lg rounded-sm overflow-hidden print:shadow-none print:rounded-none"
      style={{ maxWidth: "8.5in", margin: "0 auto" }}
    >
      {/* Header Section */}
      <div className="border-b-2 border-green-600 bg-gradient-to-r from-green-50 to-white p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Logo Area */}
          <div className="w-14 h-14 border-2 border-green-300 rounded flex items-center justify-center bg-green-50 flex-shrink-0">
            <FlaskConical className="w-7 h-7 text-green-600" />
          </div>

          {/* Lab Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-green-700 leading-tight">Green Laboratory</h1>
            <p className="text-sm text-green-600 font-semibold">Dabgari Garden</p>
            <p className="text-xs text-gray-700">Address: Dabgari Garden | Contact: [Phone]</p>
          </div>

          {/* Logo Space */}
          <div className="w-14 h-14 border-2 border-dashed border-green-300 rounded flex items-center justify-center bg-green-50 flex-shrink-0">
            <span className="text-xs text-gray-400">Logo</span>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="p-4 border-b-2 border-green-200">
        <div>
          {/* Patient Information */}
          <div>
            <h3 className="text-sm font-bold text-green-700 mb-2 pb-1 border-b border-green-300">PATIENT INFO</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600 w-24">Patient Name:</label>
                <div className="flex-1 border-b border-gray-300 h-5"></div>
              </div>
              <div className="flex justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600 w-24">Father Name:</label>
                <div className="flex-1 border-b border-gray-300 h-5"></div>
              </div>
              <div className="flex justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600 w-24">Age/Gender:</label>
                <div className="flex-1 border-b border-gray-300 h-5"></div>
              </div>
              <div className="flex justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600 w-24">Contact:</label>
                <div className="flex-1 border-b border-gray-300 h-5"></div>
              </div>
              <div className="flex justify-between gap-2">
                <label className="text-xs font-semibold text-gray-600 w-24">Patient ID:</label>
                <div className="flex-1 border-b border-gray-300 h-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="p-4 border-b-2 border-green-200">
        <h3 className="text-sm font-bold text-green-700 mb-2 pb-1 border-b border-green-300">TEST RESULTS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-green-100 border-b border-green-300">
                <th className="px-2 py-1.5 text-left font-bold text-green-700 border-r border-green-300">Parameter</th>
                <th className="px-2 py-1.5 text-center font-bold text-green-700 border-r border-green-300 w-16">
                  Result
                </th>
                <th className="px-2 py-1.5 text-center font-bold text-green-700 border-r border-green-300 w-12">
                  Unit
                </th>
                <th className="px-2 py-1.5 text-center font-bold text-green-700 border-r border-green-300 w-20">
                  Normal Range
                </th>
                <th className="px-2 py-1.5 text-left font-bold text-green-700 w-20">Comments</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-b border-green-100">
                  <td className="px-2 py-1 border-r border-green-100 h-5"></td>
                  <td className="px-2 py-1 border-r border-green-100 h-5"></td>
                  <td className="px-2 py-1 border-r border-green-100 h-5"></td>
                  <td className="px-2 py-1 border-r border-green-100 h-5"></td>
                  <td className="px-2 py-1 h-5"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-6 mb-3">
        <div className="border-t border-gray-400 pt-2 text-center">
          <div className="h-8 mb-1"></div>
          <p className="text-xs font-semibold text-gray-700">Technician</p>
          <p className="text-xs text-gray-600">Name: _______</p>
        </div>
        <div className="border-t border-gray-400 pt-2 text-center">
          <div className="h-8 mb-1"></div>
          <p className="text-xs font-semibold text-gray-700">Authorized By</p>
          <p className="text-xs text-gray-600">Name: _______</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-green-200 pt-3 mt-1 text-xs text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <p className="font-semibold text-gray-800 mb-0.5">Note:</p>
            <p>This is a computer-generated report and does not require a signature.</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-0.5">Consultant Pathologist:</p>
            <p>Dr. Ayub Khan</p>
            <p>M.B.B.S (PMDC), R.M.P</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-0.5">Laboratory Address:</p>
            <p>Green Medical Laboratory</p>
            <p>First Floor, Cantonment Plaza</p>
            <p>Near Ibrahimi Medical Center</p>
            <p>Dabgari Garden, Peshawar</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
