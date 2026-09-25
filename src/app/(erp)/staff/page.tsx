import React from 'react';

export default function StaffPage() {
  const staffMembers = [
    { id: "EMP-001", name: "Dr. John Doe", role: "Branch Manager & Physician", branch: "Kitisuru", contact: "0712345678", status: "On Duty" },
    { id: "EMP-002", name: "Mary Wanjiku", role: "Head Pharmacist", branch: "Karen", contact: "0722345678", status: "On Duty" },
    { id: "EMP-003", name: "James Omondi", role: "Registered Nurse", branch: "Ruaka", contact: "0733345678", status: "Off Duty" },
    { id: "EMP-004", name: "Sarah Jenkins", role: "Receptionist", branch: "Kitisuru", contact: "0744345678", status: "On Leave" },
  ];

  const shiftRoster = [
    { day: "Today", shift: "Morning (08:00 - 16:00)", staff: "Dr. John Doe, Sarah Jenkins" },
    { day: "Today", shift: "Evening (16:00 - 00:00)", staff: "Dr. Peter Kamau, Alice M." },
    { day: "Tomorrow", shift: "Morning (08:00 - 16:00)", staff: "Dr. John Doe, Mary Wanjiku" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HR &amp; Staff Management</h1>
          <p className="text-sm text-slate-500">Manage employee directories, duty rosters, and attendance across all branches.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition">
          + Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Staff Directory Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-900">Staff Directory</h2>
            <div className="flex gap-2">
              <select className="px-3 py-1 border border-slate-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>All Branches</option>
                <option>Karen</option>
                <option>Kitisuru</option>
                <option>Ruaka</option>
              </select>
            </div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-white text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Employee</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Primary Branch</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staffMembers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{staff.name}</p>
                        <p className="text-xs text-slate-500">{staff.id} • {staff.contact}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{staff.role}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{staff.branch}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        staff.status === 'On Duty' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        staff.status === 'Off Duty' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {staff.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shift Rosters Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-bold text-slate-900">Duty Roster (Kitisuru)</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {shiftRoster.map((roster, idx) => (
                <li key={idx} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <p className="text-xs font-semibold text-emerald-600 mb-1">{roster.day} • {roster.shift}</p>
                  <p className="text-sm font-medium text-slate-900">{roster.staff}</p>
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-2 border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-lg font-medium text-sm hover:bg-emerald-100 transition-colors">
              Manage Full Schedule
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
