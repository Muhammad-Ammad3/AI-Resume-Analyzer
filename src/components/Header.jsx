import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="absolute top-0 left-20 -z-10 w-40 h-10 bg-indigo-500/10 blur-[50px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3 lg:gap-4 group cursor-pointer">
            <div className="relative">
              {/* Outer Glow Animation */}
              <div className="absolute -inset-1 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative w-12 h-12 lg:w-14 lg:h-14 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight leading-none">
                Resume<span className="text-indigo-600"> Analyzer</span>
              </h1>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                Smart Analysis
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
              AI Engine <span className="text-emerald-600">Ready</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
