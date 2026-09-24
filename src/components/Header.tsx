import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white shadow-sm border-b border-slate-200">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu button could go here */}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-sm">📍 Active Branch: Kitisuru</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
