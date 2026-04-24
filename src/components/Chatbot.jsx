// import React, { useState, useRef, useEffect } from "react";
// import { useAnalysis } from "../context/AnalysisContext";
// import { SparklesIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

// const Chatbot = () => {
//   const { state } = useAnalysis();

//   const [messages, setMessages] = useState([
//     {
//       id: "welcome",
//       role: "ai",
//       content:
//         "👋 Hi! I'm your AI Resume Coach. Upload your resume & job description, then ask me anything 🚀",
//       timestamp: new Date(),
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const predefinedQuestions = [
//     "How can I improve my score?",
//     "What keywords should I add?",
//     "Fix my experience section?",
//     "ATS-friendly tips?",
//     "Write better bullets?",
//   ];

//   // ✅ FIXED OPENROUTER FUNCTION
//   const sendMessage = async (content) => {
//     if (!content.trim()) return;

//     const userMessage = {
//       id: `user-${Date.now()}`,
//       role: "user",
//       content,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": window.location.origin,
//           "X-Title": "AI Resume Coach",
//         },
//         body: JSON.stringify({
//           model: "openai/gpt-3.5-turbo", // ✅ more stable than mistral
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are an expert AI Resume Coach. Give short, clear, ATS-friendly answers with actionable advice.",
//             },
//             { role: "user", content },
//           ],
//           temperature: 0.7,
//           max_tokens: 300,
//         }),
//       });

//       const data = await res.json();

//       // ❌ IMPORTANT FIX: proper error handling
//       if (!res.ok) {
//         throw new Error(data?.error?.message || "OpenRouter API Error");
//       }

//       const aiText =
//         data?.choices?.[0]?.message?.content ||
//         "⚠️ No response received from AI.";

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `ai-${Date.now()}`,
//           role: "ai",
//           content: aiText,
//           timestamp: new Date(),
//         },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `ai-${Date.now()}`,
//           role: "ai",
//           content: `❌ Error: ${error.message}`,
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage(input);
//   };

//   return (
//     <div className="w-full lg:w-105 xl:w-120 h-fit bg-linear-to-br from-white/90 via-white to-gray-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6">

//       {/* HEADER */}
//       <div className="flex items-center space-x-4 mb-6">
//         <div className="w-14 h-14 bg-linear-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
//           <SparklesIcon className="w-8 h-8 text-white" />
//         </div>
//         <div>
//           <h2 className="text-xl font-black">AI Resume Coach</h2>
//           <p className="text-xs text-emerald-600 font-semibold">Live Coaching</p>
//         </div>
//       </div>

//       {/* MESSAGES */}
//       <div className="h-125 overflow-y-auto space-y-4 mb-4">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[85%] p-4 rounded-3xl ${
//                 msg.role === "user"
//                   ? "bg-linear-to-r from-primary-600 to-primary-700 text-black"
//                   : "bg-white/80 border border-gray-200"
//               }`}
//             >
//               <p className="text-sm whitespace-pre-line">{msg.content}</p>
//             </div>
//           </div>
//         ))}

//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-white p-3 rounded-2xl">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* QUICK BUTTONS */}
//       {messages.length === 1 && (
//         <div className="grid grid-cols-2 gap-2 mb-4">
//           {predefinedQuestions.map((q, i) => (
//             <button
//               key={i}
//               onClick={() => sendMessage(q)}
//               className="text-xs p-2 bg-gray-100 rounded-xl hover:bg-primary-50"
//             >
//               {q}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* INPUT */}
//       <form onSubmit={handleSubmit} className="flex gap-3">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={state.resumeData ? "Ask anything..." : "Upload resume first"}
//           disabled={!state.resumeData}
//           className="flex-1 px-4 py-3 rounded-2xl border bg-white"
//         />

//         <button
//           type="submit"
//           disabled={!input.trim() || !state.resumeData}
//           className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center"
//         >
//           <PaperAirplaneIcon className="w-5 h-5" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Salaam! I'm your AI Resume Coach. Upload your resume & job description, then ask me anything!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest", // 👈 Ye line zaroori hai
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const aiReply =
        response.data?.choices?.[0]?.message?.content || "No response";

      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("API ERROR:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ API Error: Check API key or model",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden bg-white/50 backdrop-blur-sm sm:bg-transparent">
      {/* 💬 CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] p-3 md:p-4 rounded-[1.2rem] md:rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 animate-pulse px-2">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </span>
            AI is thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ⌨️ INPUT AREA */}
      <div className="p-3 md:p-4 bg-white border-t border-slate-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 md:gap-3 bg-slate-50 p-1.5 md:p-2 rounded-2xl border border-slate-200 transition-focus-within ring-indigo-500/10 focus-within:ring-4 focus-within:border-indigo-400"
        >
          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors hidden xs:block"
          >
            <PaperClipIcon className="w-5 h-5" />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm px-2 py-1 md:py-2 text-slate-700 placeholder:text-slate-400"
            placeholder="Ask something..."
          />

          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors hidden sm:block"
          >
            <FaceSmileIcon className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-2 md:p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              !input.trim() || loading
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:scale-105 active:scale-95"
            }`}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
