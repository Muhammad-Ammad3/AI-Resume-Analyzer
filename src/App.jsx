// import React, { useState } from 'react';
// import Header from './components/Header';
// import ResumeUpload from './components/ResumeUpload';
// import JobDescriptionUpload from './components/JobDescriptionUpload';
// import AnalysisResults from './components/AnalysisResults';
// import Chatbot from './components/Chatbot';
// import { AnalysisProvider } from './context/AnalysisContext';

// function App() {
//   const [step, setStep] = useState(1);

//   return (
//     <AnalysisProvider>
//       <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">

//         <Header />

//         <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold bg-linear-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent mb-6">
//               AI Resume Analyzer
//             </h1>

//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Upload your resume and job description to get AI-powered insights, keyword matching, and personalized improvement suggestions.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-start">

//             {/* LEFT SIDE */}
//             <div className="space-y-8">
//               {step === 1 && <ResumeUpload setStep={setStep} />}
//               {step === 2 && <JobDescriptionUpload setStep={setStep} />}
//               {step === 3 && <AnalysisResults />}
//             </div>

//             {/* RIGHT SIDE */}
//             <Chatbot />

//           </div>
//         </main>
//       </div>
//     </AnalysisProvider>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ResumeUpload from "./components/ResumeUpload";
import JobDescriptionUpload from "./components/JobDescriptionUpload";
import AnalysisResults from "./components/AnalysisResults";
import Chatbot from "./components/Chatbot";
import { AnalysisProvider, useAnalysis } from "./context/AnalysisContext";

const AppContent = () => {
  const [step, setStep] = useState(1);
  const { dispatch } = useAnalysis();

  // 1. FIX: Pehli baar load hone par state reset
  useEffect(() => {
    dispatch({ type: "RESET_ALL" });
  }, [dispatch]);

  // 2. NEW: Jab bhi Step change ho (khass kar Step 3 par), page upar jaye
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smoothly upar jayega
    });
  }, [step]); // Jab bhi 'step' ki value badlegi, ye chalega

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 relative selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
      {/* 🌌 BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-10%] w-80 h-80 md:w-160 md:h-160 bg-indigo-50 rounded-full blur-[80px] md:blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-5%] left-[-10%] w-70 h-70 md:w-140 md:h-140 bg-emerald-50 rounded-full blur-[70px] md:blur-[100px] opacity-60"></div>
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-20 relative z-10">
        {/* 🏆 HERO SECTION (Step 1 & 2 ke liye) */}
        {step < 3 && (
          <div className="text-center mb-12 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
                Powered by Gemini 1.5 Flash
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-[1.1] px-2">
              Optimize Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Career
              </span>{" "}
              <br className="hidden sm:block" />
              with AI Precision
            </h1>

            <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto font-medium px-4">
              Bridge the gap between your resume and your dream job using
              industrial-grade AI analysis.
            </p>

            {/* STEP INDICATORS */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mt-10">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-bold transition-all duration-500 ${
                      step === s
                        ? "bg-indigo-600 text-white shadow-lg scale-110"
                        : step > s
                          ? "bg-emerald-500 text-white"
                          : "bg-white border border-slate-200 text-slate-400"
                    }`}
                  >
                    {step > s ? "✓" : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-8 md:w-12 h-1 rounded-full transition-colors duration-500 ${step > s ? "bg-emerald-500" : "bg-slate-200"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* 🎛 MAIN CONTENT AREA */}
        <div
          className={`grid ${step === 3 ? "lg:grid-cols-12" : "max-w-2xl mx-auto"} gap-8 lg:gap-12 items-start min-h-[400px]`}
        >
          {/* LEFT SIDE: RESULTS (Step 3 par Mobile par upar) */}
          <div
            className={`${step === 3 ? "lg:col-span-7 order-1" : "w-full"} space-y-6 md:space-y-8`}
          >
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-1.5 md:p-2 shadow-xl border border-slate-100 overflow-hidden transition-all duration-500">
              <div className="bg-slate-50/50 rounded-[1.8rem] md:rounded-4xl overflow-hidden min-h-[350px] md:min-h-[450px]">
                {step === 1 && <ResumeUpload setStep={setStep} />}
                {step === 2 && <JobDescriptionUpload setStep={setStep} />}
                {step === 3 && <AnalysisResults setStep={setStep} />}
              </div>
            </div>

            {/* PERKS (Only on Step 1 & 2) */}
            {step < 3 && (
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-4 md:p-6 bg-white rounded-3xl md:rounded-4xl border border-slate-100 shadow-sm text-center">
                  <div className="text-indigo-600 font-black text-xl md:text-2xl mb-1">
                    98%
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                    ATS Accuracy
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-white rounded-3xl md:rounded-4xl border border-slate-100 shadow-sm text-center">
                  <div className="text-emerald-600 font-black text-xl md:text-2xl mb-1">
                    ~2s
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Analysis Speed
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: CHATBOT (Step 3 par Mobile par neeche) */}
          {step === 3 && (
            <div className="lg:col-span-5 order-2 space-y-6 animate-in fade-in slide-in-from-bottom-4 lg:slide-in-from-right-4 duration-700">
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-3 shadow-xl border border-slate-100 h-[550px] md:h-162 flex flex-col">
                <div className="flex items-center gap-3 p-4 border-b border-slate-50">
                  <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <SparklesIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-slate-800 truncate">
                      Career AI Assistant
                    </h3>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                      Online & Ready
                    </p>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden p-1 md:p-2">
                  <Chatbot />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AnalysisProvider>
      <AppContent />
    </AnalysisProvider>
  );
}

const SparklesIcon = (props) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
    />
  </svg>
);

export default App;
