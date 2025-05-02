"use client";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'ai'; text: string}[]>([]);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);

  const handleSend = async (messageToSend?: string) => {
    const userMessage = messageToSend || input.trim();
    if (!userMessage) return;
    
    setLoading(true);
    
    // Add user message to chat history if it's a new message (not a retry)
    if (!messageToSend) {
      setChatHistory(prev => [...prev, {type: 'user', text: userMessage}]);
      setInput("");
    }

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();
      let aiResponse = "";

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiResponse = data.candidates[0].content.parts[0].text;
        setRetryMessage(null); // Clear any retry state
      } else if (data?.error?.message) {
        // Store the failed message for retry
        setRetryMessage(userMessage);
        
        if (data.error.message.includes("API key not configured")) {
          aiResponse = "The chatbot is not properly configured. Please contact the site administrator.";
        } else if (data.error.message.includes("overloaded") || data.error.message.includes("quota")) {
          aiResponse = "The AI service is currently experiencing high traffic. You can try again in a moment or ask a different question.";
        } else {
          aiResponse = `Error: ${data.error.message}`;
        }
      } else {
        aiResponse = "No response from Gemini. Please try again later.";
        setRetryMessage(userMessage);
      }

      // Add AI response to chat history
      setChatHistory(prev => [...prev, {type: 'ai', text: aiResponse}]);
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setChatHistory(prev => [...prev, {type: 'ai', text: "Sorry, I couldn't connect to the AI service. Please check your internet connection and try again."}]);
      setRetryMessage(userMessage);
    }

    setLoading(false);
  };

  const handleRetry = () => {
    if (retryMessage) {
      handleSend(retryMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="bg-green-600 text-white p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">E-Waste Education Assistant</h2>
      </div>
      
      <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="font-medium">Ask me anything about e-waste!</p>
            <p className="text-sm max-w-md mx-auto">
              I can help with recycling methods, environmental impact, disposal guidelines, and more.
            </p>
          </div>
        ) : (
          <>
            {chatHistory.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-green-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </motion.div>
            ))}
            
            {retryMessage && chatHistory[chatHistory.length - 1].type === 'ai' && (
              <div className="flex justify-center">
                <button 
                  onClick={handleRetry}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              </div>
            )}
          </>
        )}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg rounded-tl-none p-4 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <textarea
            className="flex-grow p-3 border border-gray-300 rounded-l-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent max-h-20"
            placeholder="Type your question about e-waste..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium p-3 rounded-r-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by Google Gemini AI • Ask about e-waste management, recycling, or environmental impact
        </p>
      </div>
    </div>
  );
};

export default GeminiChat;
