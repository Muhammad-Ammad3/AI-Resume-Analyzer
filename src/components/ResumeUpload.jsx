import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAnalysis } from "../context/AnalysisContext";
import mammoth from "mammoth/mammoth.browser";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  CloudArrowUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const ResumeUpload = ({ setStep }) => {
  const { dispatch } = useAnalysis();
  const [error, setError] = useState("");
  const [fileStatus, setFileStatus] = useState("idle"); // idle, loading, success, error

  const extractPDFText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n";
    }
    return text;
  };

  const extractEmail = (text) => {
    const match = text.match(/[\w.-]+@[\w.-]+\.\w+/g);
    return match ? match[0] : "N/A";
  };

  const extractPhone = (text) => {
    const match = text.match(
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
    );
    return match ? match[0] : "N/A";
  };

  const extractSkills = (text) => {
    const match = text.match(
      /(skills|technologies|tools|competencies):?\s*([^\n\r]+)/i,
    );
    return match
      ? match[2]
          .split(/[,|/]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
  };

  const parseResumeText = (text) => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    return {
      rawText: text,
      name: lines[0] || "User",
      email: extractEmail(text),
      phone: extractPhone(text),
      skills: extractSkills(text),
    };
  };

  const parseResume = async (file) => {
    const type = file.name.split(".").pop().toLowerCase();
    setFileStatus("loading");
    setError("");

    try {
      let text = "";

      if (type === "docx") {
        const buffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        text = result.value;
      } else if (type === "pdf") {
        text = await extractPDFText(file);
      } else {
        throw new Error("Only PDF or DOCX files are supported");
      }

      if (!text || text.trim().length === 0) {
        throw new Error("The file seems to be empty or unreadable.");
      }

      const resumeData = parseResumeText(text);
      dispatch({ type: "SET_RESUME", payload: resumeData });
      setFileStatus("success");

      setTimeout(() => setStep(2), 1500);
    } catch (err) {
      console.error("Parsing Error:", err);
      setError(
        err.message || "Failed to parse resume. Please try another file.",
      );
      setFileStatus("error");
    }
  };

  const onDrop = useCallback((files) => {
    if (files[0]) {
      parseResume(files[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* HEADER SECTION */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-4">
          Step 1: Upload Resume
        </div>
        <h3 className="text-2xl font-black text-gray-900">
          Upload Your Resume
        </h3>
      </div>

      {/* DROPZONE AREA */}
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-4xl p-10 lg:p-16 transition-all duration-300 flex flex-col items-center text-center ${
          isDragActive
            ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]"
            : fileStatus === "success"
              ? "border-emerald-500 bg-emerald-50/30"
              : fileStatus === "error"
                ? "border-red-200 bg-red-50/30"
                : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        {/* Dynamic Icons */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 ${
            fileStatus === "success"
              ? "bg-emerald-500 text-white"
              : fileStatus === "loading"
                ? "bg-indigo-600 text-white animate-pulse"
                : fileStatus === "error"
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-100 text-gray-400"
          }`}
        >
          {fileStatus === "success" ? (
            <CheckCircleIcon className="w-8 h-8" />
          ) : fileStatus === "loading" ? (
            <SparklesIcon className="w-8 h-8" />
          ) : fileStatus === "error" ? (
            <ExclamationCircleIcon className="w-8 h-8" />
          ) : (
            <CloudArrowUpIcon className="w-8 h-8" />
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-bold text-gray-800">
            {fileStatus === "loading"
              ? "AI is Reading..."
              : fileStatus === "success"
                ? "Resume Loaded!"
                : fileStatus === "error"
                  ? "Something went wrong"
                  : isDragActive
                    ? "Drop it now!"
                    : "Click or Drag Resume"}
          </h4>
          <p className="text-sm text-gray-500 font-medium">
            {fileStatus === "error" ? error : "PDF or DOCX (Max 10MB)"}
          </p>
        </div>
      </div>

      {/* ERROR RESET BUTTON */}
      {fileStatus === "error" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFileStatus("idle");
            setError("");
          }}
          className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
        >
          Try Again
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      )}

      {/* FORMAT SUPPORT FOOTER */}
      {fileStatus === "idle" && (
        <div className="mt-8 flex justify-center items-center gap-4 opacity-50 grayscale">
          <DocumentTextIcon className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
            Secure AI Processing
          </span>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
