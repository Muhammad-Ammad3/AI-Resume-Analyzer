// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { useAnalysis } from '../context/AnalysisContext';
// import {
//   ClipboardDocumentCheckIcon,
//   ArrowRightIcon,
//   DocumentIcon,
//   CheckCircleIcon,
//   ExclamationCircleIcon,
//   SparklesIcon
// } from '@heroicons/react/24/outline';

// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

// const JobDescriptionUpload = ({ setStep }) => {
//   const { state, dispatch } = useAnalysis();
//   const [jobText, setJobText] = useState('');
//   const [error, setError] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [fileStatus, setFileStatus] = useState('idle');

//   const extractTextFromPDF = async (arrayBuffer) => {
//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//     let fullText = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const textContent = await page.getTextContent();
//       const pageText = textContent.items.map(item => item.str).join(' ');
//       fullText += pageText + '\n\n';
//     }
//     return fullText.trim();
//   };

//   const extractKeywords = (text) => {
//     const patterns = [
//       /\b(javascript|react|angular|vue|nodejs?|typescript|python|java|docker|aws|git)\b/gi,
//       /\b(leadership?|manager|engineer|developer|designer|team|communication)\b/gi,
//       /\b(developed?|built|led|managed|optimized|created|implemented)\b/gi
//     ];

//     const keywords = new Set();
//     patterns.forEach(pattern => {
//       const matches = text.match(pattern) || [];
//       matches.forEach(m => keywords.add(m.toLowerCase()));
//     });

//     return Array.from(keywords).slice(0, 18);
//   };

//   const generateAnalysis = (resume, jobDesc) => {
//     const jobKeywords = extractKeywords(jobDesc);
//     const resumeText = (resume.rawText || '').toLowerCase();

//     const matched = jobKeywords.filter(k => resumeText.includes(k));

//     const score = Math.round(Math.min(98, 50 + matched.length * 4));

//     return {
//       score,
//       keywords: {
//         required: jobKeywords.slice(0, 12),
//         matched,
//         missing: jobKeywords.filter(k => !matched.includes(k)).slice(0, 10)
//       },
//       matchPercentage: Math.round((matched.length / (jobKeywords.length || 1)) * 100),
//       suggestions: [],
//       strengths: [],
//       improvements: []
//     };
//   };

//   const parseJobDescription = async (file) => {
//     setFileStatus('loading');
//     try {
//       let text = '';
//       const type = file.name.split('.').pop();

//       if (type === 'pdf') {
//         const buffer = await file.arrayBuffer();
//         text = await extractTextFromPDF(buffer);
//       } else {
//         text = await file.text();
//       }

//       setJobText(text);
//       dispatch({ type: 'SET_JOB_DESCRIPTION', payload: text });
//       setFileStatus('success');
//     } catch (e) {
//       setError(e.message);
//       setFileStatus('error');
//     }
//   };

//   const analyzeResume = async () => {
//     setIsAnalyzing(true);

//     setTimeout(() => {
//       const analysis = generateAnalysis(state.resumeData, jobText);
//       dispatch({ type: 'SET_ANALYSIS', payload: analysis });
//       setStep(3);
//       setIsAnalyzing(false);
//     }, 2000);
//   };

//   const onDrop = useCallback((files) => {
//     if (files[0]) parseJobDescription(files[0]);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//       'text/plain': ['.txt']
//     },
//     maxFiles: 1
//   });

//   return (
//     <div className="w-full max-w-4xl mx-auto">

//       {/* HEADER */}
//       <div className="text-center mb-12">
//         <div className="w-24 h-24 bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
//           <ClipboardDocumentCheckIcon className="w-12 h-12 text-white" />
//         </div>

//         <h2 className="text-4xl font-black">
//           Step 2 of 3
//           <span className="block text-2xl font-normal text-gray-600">
//             Job Description
//           </span>
//         </h2>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-10">

//         {/* DROPZONE */}
//         <div
//           {...getRootProps()}
//           className={`p-12 rounded-3xl border-2 cursor-pointer transition-all
//             ${isDragActive
//               ? 'border-emerald-500 bg-linear-to-br from-emerald-50 to-teal-50'
//               : 'border-gray-200 hover:border-emerald-400'
//             }`}
//         >
//           <input {...getInputProps()} />

//           <div className="text-center">
//             <ClipboardDocumentCheckIcon className="w-14 h-14 mx-auto text-gray-500" />
//             <p className="mt-4 font-bold text-lg">
//               {isDragActive ? 'Drop file here' : 'Drag & Drop Job Description'}
//             </p>
//             <p className="text-sm text-gray-500">PDF / TXT supported</p>
//           </div>
//         </div>

//         {/* TEXTAREA */}
//         <div>
//           <textarea
//             value={jobText}
//             onChange={(e) => setJobText(e.target.value)}
//             rows={10}
//             className="w-full p-6 border-2 rounded-2xl"
//             placeholder="Paste job description..."
//           />

//           <button
//             onClick={analyzeResume}
//             disabled={!jobText || !state.resumeData}
//             className="w-full mt-6 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold"
//           >
//             Analyze Resume
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default JobDescriptionUpload;
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAnalysis } from "../context/AnalysisContext";
import {
  ClipboardDocumentCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

import * as pdfjsLib from "pdfjs-dist";

// Worker initialization
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const JobDescriptionUpload = ({ setStep }) => {
  const { state, dispatch } = useAnalysis();
  const [jobText, setJobText] = useState("");
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileStatus, setFileStatus] = useState("idle");

  // --- 🛠️ HELPER FUNCTIONS ---

  const extractTextFromPDF = async (arrayBuffer) => {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  };

  // Basic Algorithm for Matching (Aap baad mein Gemini API se replace kar sakte hain)
  const generateAnalysis = (resume, jobDesc) => {
    const resumeWords = new Set(resume.rawText.toLowerCase().match(/\w+/g));
    const jobWords = jobDesc.toLowerCase().match(/\w+/g) || [];

    // Find matching keywords (Common words filter out karne ke liye length > 3 rakhi hai)
    const requiredKeywords = Array.from(
      new Set(jobWords.filter((w) => w.length > 4)),
    );
    const matched = requiredKeywords
      .filter((w) => resumeWords.has(w))
      .slice(0, 10);
    const missing = requiredKeywords
      .filter((w) => !resumeWords.has(w))
      .slice(0, 8);

    // Dynamic Score Calculation
    const score = Math.min(
      100,
      Math.round((matched.length / (matched.length + missing.length)) * 100) ||
        0,
    );

    return {
      score: score,
      matchPercentage: score,
      keywords: {
        required: requiredKeywords.slice(0, 15),
        matched: matched,
        missing: missing,
      },
      suggestions: [
        `Try to incorporate more keywords like: ${missing.slice(0, 3).join(", ")}`,
        "Quantify your achievements with numbers and data.",
      ],
      strengths: ["Strong alignment in core technologies", "Clear formatting"],
      improvements: ["Add more industry-specific certifications"],
    };
  };

  // --- 🚀 CORE LOGIC ---

  const parseJobDescription = async (file) => {
    setFileStatus("loading");
    setError("");
    try {
      let text = "";
      const type = file.name.split(".").pop().toLowerCase();
      if (type === "pdf") {
        const buffer = await file.arrayBuffer();
        text = await extractTextFromPDF(buffer);
      } else if (type === "txt") {
        text = await file.text();
      } else {
        throw new Error("Please upload PDF or TXT only");
      }

      setJobText(text);
      dispatch({ type: "SET_JOB_DESCRIPTION", payload: text });
      setFileStatus("success");
    } catch (e) {
      setError(e.message || "Failed to read file.");
      setFileStatus("error");
    }
  };

  const analyzeResume = async () => {
    if (!state.resumeData) {
      setError("Please upload your resume first!");
      return;
    }
    if (!jobText.trim()) {
      setError("Please provide a job description.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    // AI Simulation (2.5 seconds delay for realistic feel)
    setTimeout(() => {
      try {
        const analysis = generateAnalysis(state.resumeData, jobText);
        dispatch({ type: "SET_ANALYSIS", payload: analysis });
        setStep(3); // Go to Results
      } catch (err) {
        setError("Analysis failed. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    }, 2500);
  };

  const onDrop = useCallback((files) => {
    if (files[0]) parseJobDescription(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
    maxFiles: 1,
  });

  const canAnalyze = jobText.trim() && state.resumeData;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 lg:py-12">
      {/* 🟢 STEP INDICATOR */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="px-5 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 mb-6">
          Step 2: Target Job
        </div>
        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Match Your <span className="text-indigo-600">Resume</span>
        </h2>
        <p className="text-gray-500 font-medium max-w-xl">
          Paste the job description below or upload the file to see how well you
          match.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* 📂 UPLOAD BOX */}
        <div
          {...getRootProps()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] p-10 transition-all duration-300 flex flex-col items-center text-center ${
            isDragActive
              ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]"
              : fileStatus === "success"
                ? "border-emerald-500 bg-emerald-50/30"
                : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 ${
              fileStatus === "success"
                ? "bg-emerald-500 text-white"
                : "bg-white border border-gray-100 text-gray-400"
            }`}
          >
            {fileStatus === "success" ? (
              <CheckCircleIcon className="w-8 h-8" />
            ) : (
              <CloudArrowUpIcon className="w-8 h-8" />
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {fileStatus === "success" ? "File Uploaded!" : "Upload Job File"}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            Drag & drop PDF or TXT here
          </p>
        </div>

        {/* ⌨️ TEXTAREA & ACTION */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <textarea
              value={jobText}
              onChange={(e) => {
                setJobText(e.target.value);
                setFileStatus(e.target.value ? "success" : "idle");
                setError("");
              }}
              rows={8}
              className="w-full p-6 lg:p-8 rounded-[2rem] bg-white border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-gray-800 font-medium placeholder-gray-300 resize-none shadow-sm"
              placeholder="Or paste the job description text here..."
            />
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-700 text-sm font-bold">
              <ExclamationCircleIcon className="w-5 h-5" />
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={analyzeResume}
            disabled={!canAnalyze || isAnalyzing}
            className={`h-16 lg:h-20 rounded-[1.5rem] font-black text-lg lg:text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
              canAnalyze && !isAnalyzing
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:-translate-y-1"
                : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            {isAnalyzing ? (
              <>
                <SparklesIcon className="w-6 h-6 animate-spin" />
                <span>Scanning Match...</span>
              </>
            ) : (
              <>
                <span>Run AI Analysis</span>
                <ArrowRightIcon className="w-5 h-5" />
              </>
            )}
          </button>

          {/* STATUS CHECK */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${state.resumeData ? "bg-emerald-500" : "bg-gray-200"}`}
              ></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Resume Ready
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${jobText.trim() ? "bg-emerald-500" : "bg-gray-200"}`}
              ></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Job Text Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionUpload;
