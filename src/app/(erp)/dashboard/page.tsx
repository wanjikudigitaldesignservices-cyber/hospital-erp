import React from 'react';

export default function Dashboard() {
  // Placeholder data - in reality this would be fetched server-side from Prisma
  const metrics = [
    { label: "Total Revenue (Today)", value: "Ksh 452,000", change: "+12%" },
    { label: "Patient Volume", value: "342", change: "+5%" },
    { label: "Active Doctors", value: "24", change: "0%" },
    { label: "Critical Stock Alerts", value: "8", change: "-2", isAlert: true },
  ];

  const branchMetrics = [
    { branch: "Karen", patients: 120, revenue: "Ksh 180,000", status: "Operational" },
    { branch: "Kitisuru", patients: 145, revenue: "Ksh 195,000", status: "Operational" },
    { branch: "Ruaka", patients: 77, revenue: "Ksh 77,000", status: "High Wait Times" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
        <div className="text-sm text-slate-500">Last updated: Just now</div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
            <span className="text-slate-500 text-sm font-medium">{metric.label}</span>
            <div className="mt-2 flex justify-between items-end">
              <span className={`text-3xl font-bold ${metric.isAlert ? 'text-rose-600' : 'text-slate-900'}`}>
                {metric.value}
              </span>
              <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-emerald-500' : metric.change.startsWith('-') ? 'text-emerald-500' : 'text-slate-400'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout for Charts/Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Branch Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Branch Performance Overview</h2>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Branch</th>
                  <th className="px-6 py-4">Patients Today</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branchMetrics.map((branch, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{branch.branch}</td>
                    <td className="px-6 py-4">{branch.patients}</td>
                    <td className="px-6 py-4">{branch.revenue}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        branch.status === 'Operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {branch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Alerts Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Critical Stock Alerts</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900">Amoxicillin 500mg</p>
                  <p className="text-xs text-slate-500">Ruaka Branch</p>
                </div>
                <span className="text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full text-xs">2 units left</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900">Paracetamol IV</p>
                  <p className="text-xs text-slate-500">Karen Branch</p>
                </div>
                <span className="text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full text-xs">Out of Stock</span>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-900">Lidocaine 2%</p>
                  <p className="text-xs text-slate-500">Kitisuru Branch</p>
                </div>
                <span className="text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full text-xs">Expiring Soon</span>
              </li>
            </ul>
            <button className="w-full mt-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors">
              View All Alerts
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
