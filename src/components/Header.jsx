// import React from 'react';

// const Header = () => {
//   return (
//     <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">

//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-linear-to-r from-primary-500 to-indigo-500 rounded-xl flex items-center justify-center">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>

//             <span className="text-2xl font-bold text-gray-900">
//               ResumeAI
//             </span>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 🚀 LOGO SECTION */}
          <div className="flex items-center gap-3 lg:gap-4 group cursor-pointer">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
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

            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight leading-none">
                Resume<span className="text-indigo-600">AI</span>
              </h1>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                Smart Analysis
              </span>
            </div>
          </div>

          {/* 🛠 ACTIONS SECTION */}
          <div className="flex items-center gap-3 lg:gap-6">
            {/* Status (Hidden on small mobile) */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">
                  Resume OK
                </span>
              </div>
            </div>

            {/* Main Buttons */}
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="px-5 py-2.5 lg:px-6 lg:py-3 bg-gray-900 text-white text-xs lg:text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95">
                New Scan
              </button>

              <div className="px-3 py-2.5 lg:px-4 lg:py-3 bg-linear-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-lg shadow-orange-100 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-default">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-wider">
                  PRO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
