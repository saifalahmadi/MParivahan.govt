import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, Loader2, Languages, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { chatWithAI } from '../services/api';
import { useTranslation } from 'react-i18next';

const ChatBot = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am GovAssist AI. How can I help you with public welfare schemes today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'kn' ? 'kn-IN' : 'en-IN';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setInput(finalTranscript);
        } else if (interimTranscript) {
          setInput(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please enable it in browser settings.');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    if (!isVoiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = 1.0;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceControl = () => {
    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      setIsVoiceEnabled(!isVoiceEnabled);
      if (!isVoiceEnabled) window.speechSynthesis.cancel();
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI([...messages, userMessage], language);
      const aiReply = response.reply;
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      speak(aiReply);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I am sorry, I am having trouble connecting to the service. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[350px] md:w-[400px] glass rounded-2xl overflow-hidden mb-4 border-2 border-gov-blue/20 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gov-blue p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">GovAssist AI</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Official Assistant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all border ${
                    language === 'kn' ? 'bg-india-saffron border-india-saffron text-white' : 'bg-white/10 border-white/20 text-white'
                  }`}
                >
                  <Languages className="w-3 h-3" />
                  {language === 'kn' ? 'KANNADA' : 'ENGLISH'}
                </button>
                <button 
                  onClick={handleVoiceControl}
                  className={`p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white flex items-center gap-1 ${
                    isSpeaking ? 'bg-white/20' : ''
                  }`}
                >
                  {!isVoiceEnabled ? <VolumeX className="w-4 h-4" /> : 
                   isSpeaking ? (isPaused ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />) : 
                   <Volume2 className="w-4 h-4 opacity-50" />}
                  {isSpeaking && <span className="text-[8px] font-black">{isPaused ? 'PAUSED' : 'PLAYING'}</span>}
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4 bg-gov-light/50"
                  style={{ maxHeight: 'calc(500px - 120px)' }}
                >
                  {messages.map((msg, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                          msg.role === 'user' ? 'bg-india-saffron' : 'bg-gov-deep'
                        }`}>
                          {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-gov-blue text-white rounded-tr-none' 
                            : 'bg-white text-gov-deep border border-gray-100 rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-lg bg-gov-deep flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="p-3 rounded-2xl rounded-tl-none bg-white border border-gray-100 shadow-sm flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-gov-blue" />
                          <span className="text-xs text-gray-400 font-medium">Assistant is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {isListening && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center items-center py-2"
                    >
                      <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full border border-red-100 flex items-center gap-3 shadow-sm">
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [4, 12, 4] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                              className="w-1 bg-red-500 rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Listening...</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening... Speak now!" : "Ask about schemes..."}
                    className={`flex-grow border-none focus:ring-2 rounded-xl px-4 py-2 text-sm outline-none transition-all ${
                      isListening ? 'bg-red-50 ring-2 ring-red-200 text-red-700' : 'bg-gray-50 focus:ring-gov-blue/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {isListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-gov-blue text-white rounded-xl flex items-center justify-center hover:bg-gov-deep disabled:opacity-50 disabled:hover:bg-gov-blue transition-all shadow-lg shadow-blue-900/10"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? 'bg-india-saffron text-white rotate-90' : 'bg-gov-blue text-white'
        }`}
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
