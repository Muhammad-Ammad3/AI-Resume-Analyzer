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
        <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-tr from-indigo-500 to-purple-600 rounded-3xl md:rounded-4xl flex items-center justify-center shadow-2xl mb-6">
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
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6 md:gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-gray-50 to-transparent z-0 opacity-50" />

          <div className="relative z-10 text-center shrink-0">
            <div
              className={`text-6xl md:text-8xl font-black bg-linear-to-r ${theme.color} bg-clip-text text-transparent leading-none`}
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
                className={`h-full bg-linear-to-r ${theme.color} transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium italic sm:not-italic">
              Better than {score}% of candidates in our database.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-emerald-50 rounded-3xl] md:rounded-4xl p-4 md:p-6 border border-emerald-100 text-center flex flex-col justify-center">
            <span className="text-2xl md:text-3xl font-black text-emerald-700">
              {keywords.matched.length}
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
              Keywords Found
            </span>
          </div>
          <div className="bg-orange-50 rounded-3xl md:rounded-4xl p-4 md:p-6 border border-orange-100 text-center flex flex-col justify-center">
            <span className="text-2xl md:text-3xl font-black text-orange-700">
              {keywords.missing.length}
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-orange-600 uppercase tracking-tighter">
              Gaps Identified
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-emerald-600 rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl shadow-emerald-100">
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

        <div className="bg-white rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
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

      <div className="pt-6 md:pt-8 border-t border-gray-100 flex justify-center px-4">
        <button
          onClick={handleReset}
          className="group w-full sm:w-auto relative flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-3xl md:rounded-4xl font-black text-base md:text-lg shadow-xl hover:bg-indigo-600 transition-all duration-300"
        >
          <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Analyze New Resume</span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
