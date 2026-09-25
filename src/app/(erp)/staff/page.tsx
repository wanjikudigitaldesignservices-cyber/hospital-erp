'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ROLE_LABELS, type UserRole } from '@/lib/roles';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  branch: { name: string };
  createdAt: string;
}

export default function StaffPage() {
  const { data: session } = useSession();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [newStaffName, setNewStaffName] = useState('');

  // Form state
  const [form, setForm] = useState({ name: '', email: '', role: 'DOCTOR', branch_id: 'branch-karen' });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/staff');
      if (res.ok) {
        const data = await res.json();
        setStaff(data);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setGeneratedPassword('');

    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setGeneratedPassword(data.temporaryPassword);
        setNewStaffName(data.staff.name);
        setForm({ name: '', email: '', role: 'DOCTOR', branch_id: 'branch-karen' });
        fetchStaff();
      } else {
        alert(data.error || 'Failed to add staff');
      }
    } catch (e) { alert('Network error'); }
    setSubmitting(false);
  };

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: 'bg-purple-100 text-purple-700',
    BRANCH_MANAGER: 'bg-blue-100 text-blue-700',
    DOCTOR: 'bg-emerald-100 text-emerald-700',
    NURSE: 'bg-teal-100 text-teal-700',
    PHARMACIST: 'bg-amber-100 text-amber-700',
    RECEPTIONIST: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HR &amp; Staff Management</h1>
          <p className="text-sm text-slate-500">Manage employees, add new staff, and assign roles across branches.</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setGeneratedPassword(''); }}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 shadow-sm transition flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Branch</th>
                <th className="px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-slate-400">Loading staff...</td></tr>
              ) : staff.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-slate-400">No staff members found</td></tr>
              ) : staff.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3 font-medium text-slate-900">{s.name}</td>
                  <td className="px-5 py-3 text-slate-600">{s.email}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[s.role] || 'bg-slate-100 text-slate-600'}`}>
                      {ROLE_LABELS[s.role as UserRole] || s.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{s.branch.name}</td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{new Date(s.createdAt).toLocaleDateString('en-KE')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl">&times;</button>

            {generatedPassword ? (
              /* Success State — show generated password */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Staff Member Added!</h3>
                <p className="text-sm text-slate-500 mb-6">{newStaffName} has been registered successfully.</p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-xs text-amber-600 font-semibold mb-1">🔑 Temporary Password (share securely)</p>
                  <p className="text-2xl font-mono font-bold text-slate-900 tracking-wider">{generatedPassword}</p>
                  <p className="text-xs text-amber-500 mt-2">This password will not be shown again. The staff member should change it on first login.</p>
                </div>

                <button
                  onClick={() => { navigator.clipboard.writeText(generatedPassword); }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition mr-2"
                >
                  📋 Copy Password
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form State */
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Add New Staff Member</h3>
                <p className="text-sm text-slate-500 mb-5">The system will auto-generate a secure password.</p>

                <form onSubmit={handleAddStaff} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Dr. Amina Osei"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. amina@medcore.co.ke"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role / Department</label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="DOCTOR">Doctor</option>
                      <option value="NURSE">Nurse</option>
                      <option value="PHARMACIST">Pharmacist</option>
                      <option value="RECEPTIONIST">Receptionist</option>
                      <option value="BRANCH_MANAGER">Branch Manager</option>
                      <option value="SUPER_ADMIN">System Administrator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assign to Branch</label>
                    <select
                      value={form.branch_id}
                      onChange={(e) => setForm({ ...form, branch_id: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="branch-karen">MedCore Karen</option>
                      <option value="branch-kitisuru">MedCore Kitisuru</option>
                      <option value="branch-ruaka">MedCore Ruaka</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-50">
                      {submitting ? 'Creating...' : 'Create Staff Account'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
