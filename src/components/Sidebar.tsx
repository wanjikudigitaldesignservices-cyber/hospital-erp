import Link from "next/link";
import React from "react";

const Sidebar = () => {
  // In a real application, you would determine the available links based on the user's role.
  const menuItems = [
    { name: "Dashboard", href: "/" },
    { name: "Patients", href: "/patients" },
    { name: "Appointments", href: "/appointments" },
    { name: "Pharmacy & Inventory", href: "/inventory" },
    { name: "Billing", href: "/billing" },
    { name: "Staff (HR)", href: "/staff" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex-shrink-0 hidden md:flex flex-col h-full shadow-lg">
      <div className="p-6 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wider text-emerald-400">MedCore ERP</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors duration-200"
              >
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold">Dr. John Doe</p>
            <p className="text-xs text-slate-400">Branch Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
