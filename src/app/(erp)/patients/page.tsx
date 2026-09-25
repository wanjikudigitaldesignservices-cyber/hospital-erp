import React from 'react';

export default function PatientsPage() {
  const patients = [
    { id: "PAT-1001", name: "Sarah Jenkins", dob: "1985-04-12", gender: "Female", primaryBranch: "Kitisuru", lastVisit: "2026-09-10", status: "Active" },
    { id: "PAT-1002", name: "David Ochieng", dob: "1990-11-23", gender: "Male", primaryBranch: "Ruaka", lastVisit: "2026-08-05", status: "Active" },
    { id: "PAT-1003", name: "Grace Mutua", dob: "1955-02-18", gender: "Female", primaryBranch: "Karen", lastVisit: "2026-09-22", status: "Active" },
    { id: "PAT-1004", name: "Michael Njenga", dob: "2001-07-30", gender: "Male", primaryBranch: "Kitisuru", lastVisit: "2025-12-14", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Registry (EHR)</h1>
          <p className="text-sm text-slate-500">Unified patient records across all hospital branches.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition">
          + Register New Patient
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50">
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Primary Branch: All</option>
              <option>Karen</option>
              <option>Kitisuru</option>
              <option>Ruaka</option>
            </select>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by ID, Name or Phone..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Patient Details</th>
                <th className="px-6 py-4 font-medium">DOB (Age)</th>
                <th className="px-6 py-4 font-medium">Primary Branch</th>
                <th className="px-6 py-4 font-medium">Last Visit</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{patient.name}</p>
                      <p className="text-xs text-slate-500">{patient.id} • {patient.gender}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{patient.dob}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{patient.primaryBranch}</td>
                  <td className="px-6 py-4 text-slate-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      patient.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">View Medical Record</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
