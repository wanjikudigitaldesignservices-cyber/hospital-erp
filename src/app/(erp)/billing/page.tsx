import React from 'react';

export default function BillingPage() {
  const invoices = [
    { id: "INV-2026-001", patient: "Sarah Jenkins", date: "2026-09-24", amount: "Ksh 4,500", method: "M-Pesa", status: "Paid" },
    { id: "INV-2026-002", patient: "Grace Mutua", date: "2026-09-24", amount: "Ksh 12,000", method: "Insurance (NHIF)", status: "Pending Claim" },
    { id: "INV-2026-003", patient: "Michael Njenga", date: "2026-09-23", amount: "Ksh 1,200", method: "Cash", status: "Paid" },
    { id: "INV-2026-004", patient: "David Ochieng", date: "2026-09-22", amount: "Ksh 5,500", method: "None", status: "Overdue" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing &amp; Invoicing</h1>
          <p className="text-sm text-slate-500">Manage patient payments, M-Pesa, and Insurance claims.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition">
          + Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
          <p className="text-sm font-medium text-slate-500">Total Revenue (Today)</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">Ksh 45,200</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
          <p className="text-sm font-medium text-slate-500">Pending Insurance Claims</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">Ksh 112,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-rose-500">
          <p className="text-sm font-medium text-slate-500">Overdue Payments</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">Ksh 15,500</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Invoice or Patient..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <button className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Payment Method</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4">{inv.date}</td>
                  <td className="px-6 py-4 text-slate-900">{inv.patient}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{inv.amount}</td>
                  <td className="px-6 py-4">{inv.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      inv.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Print</button>
                    <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">View</button>
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
