import React from 'react';

export default function AppointmentsPage() {
  const queue = [
    { id: "APT-901", patient: "Sarah Jenkins", doctor: "Dr. John Doe", type: "Consultation", time: "09:00 AM", status: "In Consultation" },
    { id: "APT-902", patient: "David Ochieng", doctor: "Dr. Mary Wanjiku", type: "Follow-up", time: "09:30 AM", status: "Waiting" },
    { id: "APT-903", patient: "Walk-in (Grace Mutua)", doctor: "General Physician", type: "Walk-in", time: "10:15 AM", status: "Waiting" },
    { id: "APT-904", patient: "Michael Njenga", doctor: "Dr. John Doe", type: "Consultation", time: "08:30 AM", status: "Pharmacy" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments &amp; Live Queue</h1>
          <p className="text-sm text-slate-500">Manage patient flow for the active branch.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition">
          + Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Calendar/Date Picker Placeholder (Left Sidebar) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[fit-content]">
          <h2 className="font-bold text-slate-900 mb-4">Calendar</h2>
          <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 text-center text-sm text-slate-500 h-64 flex flex-col items-center justify-center">
            <span className="font-semibold text-slate-700">Today, Sep 24</span>
            <p className="mt-2 text-xs">Calendar widget goes here</p>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Available Doctors</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Dr. John Doe (Available)
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Dr. Mary Wanjiku (Busy)
              </li>
            </ul>
          </div>
        </div>

        {/* Live Queue (Right Panel) */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-900">Live Digital Queue</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">2 Waiting</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">1 In Consultation</span>
            </div>
          </div>
          
          <div className="p-0">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-white text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Time / ID</th>
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Doctor</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{item.time}</p>
                      <p className="text-xs text-slate-400">{item.id}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.patient}</td>
                    <td className="px-6 py-4 text-slate-600">{item.doctor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'Waiting' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        item.status === 'In Consultation' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        item.status === 'Pharmacy' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-slate-100 text-slate-700 border-slate-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">Update Status</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
