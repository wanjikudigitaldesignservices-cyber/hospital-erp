import React from 'react';

export default function InventoryPage() {
  const inventoryItems = [
    { id: 1, name: "Amoxicillin 500mg", sku: "MED-AMX-500", generic: "Amoxicillin", branch: "Ruaka", quantity: 12, status: "Low Stock", expiry: "2027-01-15" },
    { id: 2, name: "Amoxicillin 500mg", sku: "MED-AMX-500", generic: "Amoxicillin", branch: "Kitisuru", quantity: 450, status: "Optimal", expiry: "2027-04-20" },
    { id: 3, name: "Paracetamol IV", sku: "MED-PAR-IV", generic: "Acetaminophen", branch: "Karen", quantity: 0, status: "Out of Stock", expiry: "N/A" },
    { id: 4, name: "Lidocaine 2%", sku: "MED-LID-02", generic: "Lidocaine", branch: "Kitisuru", quantity: 45, status: "Expiring Soon", expiry: "2026-10-01" },
    { id: 5, name: "Ciprofloxacin 500mg", sku: "MED-CIP-500", generic: "Ciprofloxacin", branch: "Karen", quantity: 320, status: "Optimal", expiry: "2028-05-12" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacy &amp; Central Inventory</h1>
          <p className="text-sm text-slate-500">Manage stock across all branches and request transfers.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
            Request Transfer
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition">
            + Add New Stock
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50">
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Branches</option>
              <option>Karen</option>
              <option>Kitisuru</option>
              <option>Ruaka</option>
            </select>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Statuses</option>
              <option>Optimal</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
              <option>Expiring Soon</option>
            </select>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by Name or SKU..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                <th className="px-6 py-4 font-medium">Item Name &amp; SKU</th>
                <th className="px-6 py-4 font-medium">Generic Name</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium">Expiry Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.sku}</p>
                  </td>
                  <td className="px-6 py-4">{item.generic}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{item.branch}</td>
                  <td className="px-6 py-4">{item.quantity} units</td>
                  <td className="px-6 py-4 text-slate-500">{item.expiry}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      item.status === 'Low Stock' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      item.status === 'Out of Stock' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium mr-3">Edit</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Transfer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-white">
          <span>Showing 1 to 5 of 1,240 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-slate-200 bg-emerald-50 text-emerald-700 rounded font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
