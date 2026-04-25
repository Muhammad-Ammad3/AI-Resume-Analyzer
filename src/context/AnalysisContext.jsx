import React, { createContext, useContext, useReducer } from "react";

const AnalysisContext = createContext();

const initialState = {
  resumeData: null,
  jobDescription: null,
  analysis: null,
  isAnalyzing: false,
};


const analysisReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESUME":
      return { ...state, resumeData: action.payload, analysis: null };

    case "SET_JOB_DESCRIPTION":
      return { ...state, jobDescription: action.payload, analysis: null };

    case "SET_ANALYSIS":
      return {
        ...state,
        analysis: {
          score: action.payload?.score ?? 0,
          keywords: {
            matched: action.payload?.keywords?.matched ?? [],
            missing: action.payload?.keywords?.missing ?? [],
          },
          strengths: action.payload?.strengths ?? [],
          improvements: action.payload?.improvements ?? [],
          matchPercentage: action.payload?.matchPercentage ?? action.payload?.score ?? 0,
        },
        isAnalyzing: false,
      };

    case "SET_ANALYZING":
      return { ...state, isAnalyzing: action.payload };

    case "RESET_ALL":
      return initialState;

    default:
      return state;
  }
};

export function AnalysisProvider({ children }) {
  const [state, dispatch] = useReducer(analysisReducer, initialState);

  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
