'use client';

import { useSession } from 'next-auth/react';
import { ROLE_LABELS, type UserRole } from '@/lib/roles';

const Header = () => {
  const { data: session } = useSession();
  const branchName = (session?.user as any)?.branch_name || 'Loading...';
  const role = (session?.user as any)?.role as UserRole | undefined;

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
      <div className="flex flex-grow items-center justify-between px-4 py-3 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          <h2 className="text-sm font-semibold text-slate-700 hidden sm:block">
            {role && ROLE_LABELS[role]} Portal
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications placeholder */}
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {/* Active Branch Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-xs">📍 {branchName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
