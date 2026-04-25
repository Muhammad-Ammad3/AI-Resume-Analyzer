import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAnalysis } from "../context/AnalysisContext";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";

const Chatbot = () => {
  const { state } = useAnalysis(); 
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hey! I'm your AI Resume Coach. I've seen your analysis. Ask me how to fix your gaps or improve your score!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
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
      const analysisContext = state.analysis 
        ? `User's Resume Score: ${state.analysis.score}%. 
           Matched Keywords: ${state.analysis.keywords.matched.join(", ")}. 
           Missing Keywords: ${state.analysis.keywords.missing.join(", ")}. 
           Strengths: ${state.analysis.strengths.join(", ")}. 
           Improvements: ${state.analysis.improvements.join(", ")}.`
        : "No resume analysis available yet.";

      const systemMsg = {
        role: "system",
        content: `You are an expert Career Coach. Use this context to help the user: ${analysisContext}. 
                  Provide short, actionable, and professional advice.`
      };

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [systemMsg, ...updatedMessages], 
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const aiReply =
        response.data?.choices?.[0]?.message?.content || "I'm having trouble connecting to my brain. Try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("API ERROR:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ I hit a snag. Please check your connection or API key.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden bg-white/50 backdrop-blur-sm">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] p-3 md:p-4 rounded-[1.2rem] md:rounded-3xl text-sm leading-relaxed shadow-sm ${
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
            AI Coach is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 bg-white border-t border-slate-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 md:gap-3 bg-slate-50 p-1.5 md:p-2 rounded-2xl border border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-400 transition-all"
        >
          <button type="button" className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors hidden xs:block">
            <PaperClipIcon className="w-5 h-5" />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm px-2 py-1 md:py-2 text-slate-700 placeholder:text-slate-400"
            placeholder="Ask me how to improve..."
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-2 md:p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              !input.trim() || loading
                ? "bg-slate-200 text-slate-400"
                : "bg-indigo-600 text-white shadow-md hover:scale-105 active:scale-95"
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