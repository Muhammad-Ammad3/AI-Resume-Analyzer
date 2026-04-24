// import React, { createContext, useContext, useReducer } from "react";

// const AnalysisContext = createContext();

// const initialState = {
//   resumeData: null,
//   jobDescription: null,
//   analysis: null,
//   keywords: { matched: [], missing: [], required: [] },
//   suggestions: [],
//   isAnalyzing: false,
// };

// function reducer(state, action) {
//   switch (action.type) {

//     case "SET_RESUME":
//       return {
//         ...state,
//         resumeData: action.payload,
//         analysis: null,
//         keywords: { matched: [], missing: [], required: [] },
//         suggestions: [],
//       };

//     case "SET_JOB_DESCRIPTION":
//       return {
//         ...state,
//         jobDescription: action.payload,
//         analysis: null,
//       };

//     case "SET_ANALYSIS": {
//       const payload = action.payload || {};

//       return {
//         ...state,
//         analysis: {
//           score: payload.score || 0,
//           keywords: {
//             matched: payload.keywords?.matched || [],
//             missing: payload.keywords?.missing || [],
//             required: payload.keywords?.required || [],
//           },
//           suggestions: payload.suggestions || [],
//           matchPercentage: payload.matchPercentage || 0,
//           strengths: payload.strengths || [],
//           improvements: payload.improvements || [],
//         },
//         keywords: {
//           matched: payload.keywords?.matched || [],
//           missing: payload.keywords?.missing || [],
//           required: payload.keywords?.required || [],
//         },
//         suggestions: payload.suggestions || [],
//       };
//     }

//     case "SET_ANALYZING":
//       return {
//         ...state,
//         isAnalyzing: action.payload,
//       };

//     case "RESET_ALL":
//       return initialState;

//     default:
//       return state;
//   }
// }

// export function AnalysisProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <AnalysisContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AnalysisContext.Provider>
//   );
// }

// export const useAnalysis = () => {
//   const context = useContext(AnalysisContext);
//   if (!context) {
//     throw new Error("useAnalysis must be used within AnalysisProvider");
//   }
//   return context;
// };

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
      return {
        ...state,
        resumeData: action.payload,
        analysis: null, // Reset analysis when new resume is uploaded
      };

    case "SET_JOB_DESCRIPTION":
      return {
        ...state,
        jobDescription: action.payload,
        analysis: null, // Reset analysis when new JD is uploaded
      };

    case "SET_ANALYSIS":
      return {
        ...state,
        analysis: {
          score: action.payload?.score || 0,
          keywords: {
            required: action.payload?.keywords?.required || [],
            matched: action.payload?.keywords?.matched || [],
            missing: action.payload?.keywords?.missing || [],
          },
          matchPercentage: action.payload?.matchPercentage || 0,
          suggestions: action.payload?.suggestions || [],
          strengths: action.payload?.strengths || [],
          improvements: action.payload?.improvements || [],
        },
        isAnalyzing: false,
      };

    case "SET_ANALYZING":
      return {
        ...state,
        isAnalyzing: action.payload,
      };

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
