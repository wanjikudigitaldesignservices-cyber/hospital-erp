'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { getNavItemsForRole, ROLE_LABELS, type UserRole } from '@/lib/roles';

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = (session?.user as any)?.role as UserRole | undefined;
  const userName = session?.user?.name || 'User';
  const branchName = (session?.user as any)?.branch_name || 'Unknown';
  const initials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const navItems = role ? getNavItemsForRole(role) : [];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex-shrink-0 hidden md:flex flex-col h-full shadow-lg">
      {/* Brand */}
      <div className="p-6 flex items-center justify-center border-b border-slate-700">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-2xl">🏥</span>
          <h1 className="text-xl font-bold tracking-wider text-emerald-400">MedCore ERP</h1>
        </Link>
      </div>

      {/* Role Badge */}
      {role && (
        <div className="px-4 pt-4">
          <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
            <p className="text-xs text-emerald-400 font-semibold">{ROLE_LABELS[role]}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">📍 {branchName}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-emerald-400'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile + Logout */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 text-sm">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{userName}</p>
            <p className="text-xs text-slate-400">{role ? ROLE_LABELS[role] : ''}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full px-4 py-2 text-sm text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
