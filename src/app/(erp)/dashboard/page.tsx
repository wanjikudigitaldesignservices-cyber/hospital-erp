'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import type { UserRole } from '@/lib/roles';
import { ROLE_LABELS } from '@/lib/roles';

// ─── Role-Specific Dashboard Components ────────────────────────────

function AdminDashboard() {
  const metrics = [
    { label: 'Total Revenue (Today)', value: 'Ksh 452,000', change: '+12%', icon: '💰' },
    { label: 'Patient Volume', value: '342', change: '+5%', icon: '🏥' },
    { label: 'Active Doctors', value: '24', change: '0%', icon: '👨‍⚕️' },
    { label: 'Critical Stock Alerts', value: '8', change: '-2', icon: '⚠️', isAlert: true },
  ];
  const branches = [
    { branch: 'MedCore Karen', patients: 120, revenue: 'Ksh 180,000', status: 'Operational' },
    { branch: 'MedCore Kitisuru', patients: 145, revenue: 'Ksh 195,000', status: 'Operational' },
    { branch: 'MedCore Ruaka', patients: 77, revenue: 'Ksh 77,000', status: 'High Wait Times' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <span className="text-2xl">{m.icon}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : m.isAlert ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>{m.change}</span>
            </div>
            <p className={`text-2xl font-bold mt-3 ${m.isAlert ? 'text-rose-600' : 'text-slate-900'}`}>{m.value}</p>
            <p className="text-xs text-slate-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100"><h2 className="text-lg font-bold">Branch Performance</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-3">Branch</th><th className="px-5 py-3">Patients</th><th className="px-5 py-3">Revenue</th><th className="px-5 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {branches.map((b, i) => (
                <tr key={i} className="hover:bg-slate-50"><td className="px-5 py-3 font-medium">{b.branch}</td><td className="px-5 py-3">{b.patients}</td><td className="px-5 py-3">{b.revenue}</td>
                  <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.status === 'Operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DoctorDashboard({ userName }: { userName: string }) {
  const queue = [
    { time: '09:00', patient: 'Mary Wambui', type: 'Follow-up', status: 'In Consultation' },
    { time: '09:30', patient: 'Peter Otieno', type: 'New Visit', status: 'Waiting' },
    { time: '10:00', patient: 'Esther Nyambura', type: 'Lab Results', status: 'Scheduled' },
    { time: '10:30', patient: 'James Kipchoge', type: 'Referral', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">👨‍⚕️</p><p className="text-2xl font-bold mt-2">4</p><p className="text-xs text-slate-500">Today&apos;s Appointments</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">🔬</p><p className="text-2xl font-bold mt-2">2</p><p className="text-xs text-slate-500">Pending Lab Results</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">📋</p><p className="text-2xl font-bold mt-2">12</p><p className="text-xs text-slate-500">Active Patients</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100"><h2 className="text-lg font-bold">Today&apos;s Patient Queue</h2></div>
        <div className="divide-y divide-slate-100">
          {queue.map((q, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-slate-400 w-12">{q.time}</span>
                <div><p className="font-medium text-sm">{q.patient}</p><p className="text-xs text-slate-500">{q.type}</p></div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${q.status === 'In Consultation' ? 'bg-blue-100 text-blue-700' : q.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{q.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PharmacistDashboard() {
  const alerts = [
    { name: 'Amoxicillin 500mg', branch: 'Ruaka', qty: 2, status: 'Critical' },
    { name: 'Paracetamol IV', branch: 'Karen', qty: 0, status: 'Out of Stock' },
    { name: 'Lidocaine 2%', branch: 'Kitisuru', qty: 12, status: 'Low Stock' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">💊</p><p className="text-2xl font-bold mt-2">1,862</p><p className="text-xs text-slate-500">Total Items in Stock</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">⚠️</p><p className="text-2xl font-bold mt-2 text-rose-600">3</p><p className="text-xs text-slate-500">Stock Alerts</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">📦</p><p className="text-2xl font-bold mt-2">7</p><p className="text-xs text-slate-500">Pending Dispenses</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100"><h2 className="text-lg font-bold text-rose-600">Stock Alerts</h2></div>
        <div className="divide-y divide-slate-100">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div><p className="font-medium text-sm">{a.name}</p><p className="text-xs text-slate-500">{a.branch} Branch</p></div>
              <div className="text-right">
                <p className="text-sm font-bold text-rose-600">{a.qty} units</p>
                <span className={`text-xs font-medium ${a.status === 'Out of Stock' ? 'text-rose-600' : 'text-amber-600'}`}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NurseDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">🩺</p><p className="text-2xl font-bold mt-2">8</p><p className="text-xs text-slate-500">Patients in Ward</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">💉</p><p className="text-2xl font-bold mt-2">5</p><p className="text-xs text-slate-500">Vitals Due This Hour</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">📝</p><p className="text-2xl font-bold mt-2">3</p><p className="text-xs text-slate-500">Care Plans Pending</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold mb-4">Ward Rounds Schedule</h2>
        <div className="space-y-3">
          {['Room 201 - Mary Wambui (Vitals + IV change)', 'Room 204 - Peter Otieno (Post-op check)', 'Room 207 - Esther Nyambura (Medication admin)'].map((task, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <input type="checkbox" className="w-4 h-4 accent-emerald-600" />
              <span className="text-sm">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReceptionistDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">🚶</p><p className="text-2xl font-bold mt-2">12</p><p className="text-xs text-slate-500">Patients in Queue</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">✅</p><p className="text-2xl font-bold mt-2">45</p><p className="text-xs text-slate-500">Checked In Today</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">📅</p><p className="text-2xl font-bold mt-2">18</p><p className="text-xs text-slate-500">Upcoming Appointments</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-2xl">💳</p><p className="text-2xl font-bold mt-2">6</p><p className="text-xs text-slate-500">Pending Payments</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition border border-emerald-200">+ Register New Patient</button>
          <button className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-100 transition border border-blue-200">+ Schedule Appointment</button>
          <button className="p-4 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition border border-amber-200">Check In Patient</button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-xl text-sm font-semibold hover:bg-purple-100 transition border border-purple-200">Generate Invoice</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const role = (session?.user as any)?.role as UserRole;
  const userName = session?.user?.name || 'User';
  const branchName = (session?.user as any)?.branch_name || '';

  const greetingTime = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greetingTime}, {userName.split(' ')[0]}!</h1>
          <p className="text-sm text-slate-500">{ROLE_LABELS[role]} Portal &mdash; {branchName}</p>
        </div>
        <div className="text-sm text-slate-500">
          {new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {(role === 'SUPER_ADMIN' || role === 'BRANCH_MANAGER') && <AdminDashboard />}
      {role === 'DOCTOR' && <DoctorDashboard userName={userName} />}
      {role === 'PHARMACIST' && <PharmacistDashboard />}
      {role === 'NURSE' && <NurseDashboard />}
      {role === 'RECEPTIONIST' && <ReceptionistDashboard />}
    </div>
  );
}
