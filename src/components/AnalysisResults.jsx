// import React from "react";
// import { useAnalysis } from "../context/AnalysisContext";
// import {
//   ChartBarIcon,
//   CheckCircleIcon,
//   ExclamationTriangleIcon,
//   SparklesIcon,
//   StarIcon,
//   LightBulbIcon,
//   ArrowTrendingUpIcon,
//   DocumentTextIcon,
//   TrophyIcon,
//   FireIcon,
// } from "@heroicons/react/24/outline";

// const AnalysisResults = () => {
//   const { state } = useAnalysis();

//   if (!state || !state.analysis) {
//     return (
//       <div className="min-h-37.5 flex items-center justify-center">
//         <div className="text-center p-12">
//           <SparklesIcon className="w-24 h-24 text-gray-300 mx-auto mb-8 animate-pulse" />
//           <h3 className="text-2xl font-bold text-gray-500 mb-2">
//             Analysis Loading...
//           </h3>
//           <p className="text-gray-400">AI is processing your resume</p>
//         </div>
//       </div>
//     );
//   }

//   const {
//     score,
//     keywords,
//     suggestions,
//     matchPercentage,
//     strengths = [],
//     improvements = [],
//   } = state.analysis;

//   const getScoreColor = (score) => {
//     if (score >= 85) return "from-emerald-500 to-teal-600";
//     if (score >= 70) return "from-amber-500 to-orange-500";
//     return "from-red-500 to-rose-600";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 85)
//       return { label: "👑 Excellent", color: "text-emerald-600" };
//     if (score >= 70) return { label: "✅ Good", color: "text-amber-600" };
//     if (score >= 60) return { label: "⚠️ Fair", color: "text-orange-600" };
//     return { label: "🔧 Needs Work", color: "text-red-600" };
//   };

//   return (
//     <div className="space-y-8 p-4 sm:p-6 lg:p-8">
//       {/* 🎯 Score Card */}
//       <section className="card overflow-hidden relative">
//         <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-white to-blue-50/50"></div>
//         <div className="relative text-center p-6 sm:p-8 lg:p-12">
//           <div className="inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold bg-linear-to-r from-emerald-100 via-teal-100 to-emerald-100 text-emerald-800 mb-8 shadow-xl backdrop-blur-sm border border-emerald-200/50">
//             <SparklesIcon className="w-5 h-5 mr-2" />
//             AI-Powered Resume Score
//           </div>

//           <div
//             className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 lg:mb-8"
//             style={{
//               color:
//                 score > 80 ? "#10b981" : score > 60 ? "#f59e0b" : "#ef4444",
//             }}
//           >
//             {score}
//             <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-400">
//               %
//             </span>
//           </div>

//           <div className="w-full max-w-md mx-auto bg-gray-200/50 backdrop-blur-sm rounded-2xl h-5 sm:h-6 lg:h-8 mb-8 shadow-inner overflow-hidden">
//             <div
//               className={`bg-linear-to-r ${getScoreColor(score)} h-5 sm:h-6 lg:h-8 rounded-2xl shadow-2xl transition-all duration-1500 origin-left flex items-center justify-center`}
//               style={{ width: `${Math.min(score, 100)}%` }}
//             >
//               {score >= 40 && (
//                 <span className="text-xs sm:text-sm lg:text-base font-black text-white drop-shadow-lg px-3 whitespace-nowrap">
//                   {score}%
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <p
//               className={`text-2xl sm:text-3xl lg:text-4xl font-black ${getScoreLabel(score).color}`}
//             >
//               {getScoreLabel(score).label}
//             </p>
//             <p className="text-xl sm:text-2xl text-gray-600 font-semibold">
//               Keyword Match:{" "}
//               <span className="text-primary-600 font-black">
//                 {matchPercentage}%
//               </span>
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 📊 Keyword Analysis */}
//       <section className="card">
//         <div className="p-6 sm:p-8 lg:p-10">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-10 flex items-center justify-center lg:justify-start">
//             <ChartBarIcon className="w-12 h-12 mr-4 text-primary-600 shadow-lg rounded-2xl p-3 bg-primary-50" />
//             Keyword Intelligence
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full max-w-5xl mx-auto p-4">
//             {/* FOUND KEYWORDS CARD */}
//             <article className="group p-6 sm:p-8 bg-linear-to-br from-emerald-50 to-emerald-100/50 backdrop-blur-sm border-2 border-emerald-200/50 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-emerald-300 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center mb-6">
//                   <div className="w-16 h-16 bg-emerald-500/20 border-4 border-emerald-500/30 rounded-3xl flex items-center justify-center mr-5 shadow-2xl group-hover:scale-110 transition-transform">
//                     <CheckCircleIcon className="w-8 h-8 text-emerald-600 drop-shadow-lg" />
//                   </div>
//                   <div>
//                     <h3 className="font-black text-xl text-emerald-800 mb-0">
//                       Found
//                     </h3>
//                     <div className="flex items-baseline gap-1">
//                       <p className="text-4xl font-black text-emerald-700">
//                         {keywords.matched.length}
//                       </p>
//                       <span className="text-sm text-emerald-600 font-semibold italic">
//                         / {keywords.required.length}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 content-start">
//                   {keywords.matched.length > 0 ? (
//                     keywords.matched.slice(0, 12).map((keyword, i) => (
//                       <span
//                         key={i}
//                         className="bg-emerald-200/70 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-bold border border-emerald-300/50 shadow-sm hover:bg-emerald-300 transition-colors"
//                       >
//                         {keyword}
//                       </span>
//                     ))
//                   ) : (
//                     <p className="text-emerald-600/60 text-sm italic">
//                       No matches found yet
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </article>

//             {/* MISSING KEYWORDS CARD */}
//             <article className="group p-6 sm:p-8 bg-linear-to-br from-orange-50 to-orange-100/40 backdrop-blur-md border-2 border-orange-200/60 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-start justify-between mb-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-orange-100 border-4 border-orange-200 rounded-3xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
//                       <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-xl text-orange-800 leading-none mb-1">
//                         Missing
//                       </h3>
//                       <p className="text-4xl font-black text-orange-700 leading-none">
//                         {keywords.missing.length}
//                       </p>
//                       <span className="text-[10px] text-orange-600 font-bold uppercase tracking-tighter">
//                         Critical Gaps
//                       </span>
//                     </div>
//                   </div>

//                   {keywords.missing.length > 0 && (
//                     <div className="px-3 py-1 rounded-full bg-orange-200 text-orange-800 text-[10px] font-black border border-orange-300 uppercase animate-pulse">
//                       Needs Attention
//                     </div>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   {keywords.missing.length > 0 ? (
//                     keywords.missing.slice(0, 8).map((keyword, i) => (
//                       <span
//                         key={i}
//                         className="flex items-center gap-2 bg-white/60 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-xl text-xs font-bold border border-orange-200 transition shadow-sm"
//                       >
//                         <span className="text-orange-500">＋</span> {keyword}
//                       </span>
//                     ))
//                   ) : (
//                     <div className="col-span-2 text-center py-8 bg-orange-50/50 rounded-2xl border border-dashed border-orange-200">
//                       <p className="text-orange-600 font-bold text-sm italic">
//                         🎉 Perfect Match! No gaps found.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </article>
//           </div>
//         </div>
//       </section>

//       {/* remaining code unchanged */}
//     </div>
//   );
// };

// export default AnalysisResults;

import React from "react";
import { useAnalysis } from "../context/AnalysisContext";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  TrophyIcon,
  LightBulbIcon,
  ChartBarIcon,
  CpuChipIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const AnalysisResults = ({ setStep }) => {
  const { state, dispatch } = useAnalysis();

  const handleReset = () => {
    dispatch({ type: "RESET_ALL" });
    setStep(1);
  };

  if (!state || !state.analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 animate-pulse px-4 text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-2xl mb-6">
          <CpuChipIcon className="w-10 h-10 md:w-12 md:h-12 text-white animate-spin-slow" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
          AI Agent Analyzing...
        </h3>
        <p className="text-gray-500 font-medium mt-2 text-sm md:text-base">
          Optimizing your career narrative
        </p>
      </div>
    );
  }

  const { score, keywords, strengths = [], improvements = [] } = state.analysis;

  const getScoreTheme = (s) => {
    if (s >= 85)
      return {
        color: "from-emerald-500 to-teal-600",
        text: "Excellent",
        bg: "bg-emerald-50",
      };
    if (s >= 70)
      return {
        color: "from-blue-500 to-indigo-600",
        text: "Strong",
        bg: "bg-blue-50",
      };
    return {
      color: "from-orange-500 to-red-600",
      text: "Needs Focus",
      bg: "bg-orange-50",
    };
  };

  const theme = getScoreTheme(score);

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 md:pb-20 px-2 sm:px-0">
      {/* 🎯 TOP SUMMARY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6 md:gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent -z-0 opacity-50" />

          <div className="relative z-10 text-center shrink-0">
            <div
              className={`text-6xl md:text-8xl font-black bg-gradient-to-r ${theme.color} bg-clip-text text-transparent leading-none`}
            >
              {score}
              <span className="text-2xl md:text-3xl text-gray-300 font-light">
                %
              </span>
            </div>
            <div
              className={`mt-3 px-4 py-1 rounded-full ${theme.bg} text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${theme.color.split(" ")[1].replace("to-", "text-")}`}
            >
              Overall Match
            </div>
          </div>

          <div className="flex-1 w-full space-y-4 relative z-10 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                AI Match Intelligence
              </h2>
              <span
                className={`font-bold text-sm md:text-base ${theme.color.split(" ")[1].replace("to-", "text-")}`}
              >
                {theme.text}
              </span>
            </div>
            <div className="h-3 md:h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
              <div
                className={`h-full bg-gradient-to-r ${theme.color} transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium italic sm:not-italic">
              Better than {score}% of candidates in our database.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-emerald-50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-emerald-100 text-center flex flex-col justify-center">
            <span className="text-2xl md:text-3xl font-black text-emerald-700">
              {keywords.matched.length}
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
              Keywords Found
            </span>
          </div>
          <div className="bg-orange-50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-orange-100 text-center flex flex-col justify-center">
            <span className="text-2xl md:text-3xl font-black text-orange-700">
              {keywords.missing.length}
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-orange-600 uppercase tracking-tighter">
              Gaps Identified
            </span>
          </div>
        </div>
      </section>

      {/* 📊 KEYWORDS ANALYSIS SECTION */}
      <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
        <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-gray-50 pb-4 md:pb-6">
          <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
          <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight">
            Keyword Distribution
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
              <span className="text-xs md:text-sm font-bold text-gray-700 uppercase">
                Strong Matches
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.matched.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-bold rounded-xl border border-emerald-100"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
              <span className="text-xs md:text-sm font-bold text-gray-700 uppercase">
                Missing Opportunity
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.missing.length > 0 ? (
                keywords.missing.map((k, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-orange-50 text-orange-700 text-[10px] md:text-xs font-bold rounded-xl border border-orange-100"
                  >
                    + {k}
                  </span>
                ))
              ) : (
                <div className="w-full p-4 bg-emerald-50/50 rounded-2xl border-2 border-dashed border-emerald-200 text-center text-emerald-600 font-bold text-[10px] md:text-xs uppercase">
                  Zero Gaps Detected!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 💡 ACTIONABLE INSIGHTS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-emerald-600 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl shadow-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <TrophyIcon className="w-6 h-6 text-emerald-200" />
            <h3 className="text-lg md:text-xl font-black uppercase">
              Competitive Edge
            </h3>
          </div>
          <div className="space-y-3 md:space-y-4">
            {strengths.map((s, i) => (
              <div
                key={i}
                className="flex gap-3 bg-emerald-700/30 p-3 md:p-4 rounded-xl md:rounded-2xl border border-emerald-400/20 backdrop-blur-sm"
              >
                <SparklesIcon className="w-5 h-5 text-emerald-300 shrink-0" />
                <p className="text-xs md:text-sm font-medium">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <LightBulbIcon className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase">
              Action Plan
            </h3>
          </div>
          <div className="space-y-3 md:space-y-4">
            {improvements.map((imp, i) => (
              <div
                key={i}
                className="flex gap-3 bg-orange-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-orange-100"
              >
                <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-xs md:text-sm font-bold text-gray-800">
                  {imp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 RESET BUTTON SECTION */}
      <div className="pt-6 md:pt-8 border-t border-gray-100 flex justify-center px-4">
        <button
          onClick={handleReset}
          className="group w-full sm:w-auto relative flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-base md:text-lg shadow-xl hover:bg-indigo-600 transition-all duration-300"
        >
          <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Analyze New Resume</span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
