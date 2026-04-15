import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Headphones, Star, Bot, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

const QUICK_REPLIES = [
  'How do I book a package?',
  'Cancellation policy?',
  'Modify my booking',
  'Track my trip',
];

const AUTO_RESPONSES: Record<string, string> = {
  'book': 'Booking is easy! Browse our packages, click "Book Now", fill in your traveler details, and confirm payment. Need help with a specific package?',
  'cancel': 'Our cancellation policy allows free cancellation up to 48 hours before departure. After that, a 20% fee applies. Would you like more details?',
  'modify': 'Yes, you can modify your booking up to 7 days before travel. Visit "My Bookings" in your dashboard or let me know what changes you need.',
  'track': 'You can track your trip in real-time from your Traveler Dashboard under "My Bookings". Need your booking ID?',
  'price': 'All our prices are inclusive of taxes and fees. No hidden charges! Want me to help find a package within your budget?',
  'refund': "Refunds are processed within 5–7 business days once approved. You'll receive an email confirmation when it's initiated.",
  'visa': "Visa requirements depend on your nationality and destination. We recommend checking your country's embassy website or ask me about a specific destination!",
  'hello': "Hello! 😊 Great to hear from you. How can I help make your travel dreams come true today?",
  'hi': "Hi there! 👋 How can I assist you with your travel plans today?",
  'default': "Thanks for reaching out! I'm here to help with your travel needs. You can ask me about bookings, packages, cancellations, or anything else travel-related. What would you like to know?",
};

function getAutoResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, response] of Object.entries(AUTO_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return AUTO_RESPONSES.default;
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 Welcome to FingerTrip Support. I'm Maya, your AI travel assistant. How can I help you plan your perfect journey today?",
      sender: 'support',
      time: formatTime(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (!isMinimized) scrollToBottom();
  }, [messages, isTyping, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
      scrollToBottom(false);
    }
  }, [isOpen, isMinimized]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: `u-${Date.now()}`, text: text.trim(), sender: 'user', time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `s-${Date.now()}`,
        text: getAutoResponse(text),
        sender: 'support',
        time: formatTime(),
      };
      setMessages((prev) => [...prev, reply]);
      if (!isOpen || isMinimized) setUnread((n) => n + 1);
    }, 2000 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnread(0);
  };

  return (
    <>
      {/* ─── Floating Bubble Button ─── */}
      <div className="fixed bottom-24 right-6 z-[60]">
        {/* Unread badge */}
        <AnimatePresence>
          {!isOpen && unread > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#964734] rounded-full flex items-center justify-center text-white text-xs font-bold z-10 shadow-md"
            >
              {unread}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="bubble"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={openChat}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] text-white shadow-2xl shadow-[#0FA4AF]/30 flex items-center justify-center relative"
              aria-label="Open chat"
            >
              <MessageCircle className="w-6 h-6" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-2xl animate-ping bg-[#0FA4AF]/30 pointer-events-none" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.88, y: 40, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden shadow-2xl shadow-[#003135]/25 border border-[#AFDDE5]/40 flex flex-col"
            style={{ maxHeight: isMinimized ? 'auto' : '540px' }}
          >
            {/* ── Header ── */}
            <div className="bg-gradient-to-r from-[#003135] to-[#024950] px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#0FA4AF]/30 flex items-center justify-center border border-[#AFDDE5]/30">
                    <Headphones className="w-5 h-5 text-[#AFDDE5]" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#003135]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Maya — AI Travel Assistant</div>
                  <div className="text-xs text-[#AFDDE5]/80 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                    Online · Typically replies in 2s
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {unread > 0 && (
                  <div className="w-5 h-5 bg-[#964734] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {unread}
                  </div>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-red-500/40 flex items-center justify-center text-white/80 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Collapsed state ── */}
            {isMinimized && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                className="bg-white px-5 py-3 border-t border-[#AFDDE5]/30 cursor-pointer hover:bg-[#f0fafb] transition-colors"
                onClick={() => setIsMinimized(false)}
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-4 h-4 text-[#0FA4AF]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 truncate">
                      {messages[messages.length - 1]?.text.slice(0, 50)}...
                    </p>
                  </div>
                  {unread > 0 && (
                    <span className="w-5 h-5 bg-[#964734] rounded-full text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Full expanded panel ── */}
            {!isMinimized && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                className="flex flex-col flex-1 overflow-hidden"
              >
                {/* Rating sub-header */}
                <div className="bg-[#AFDDE5]/20 border-b border-[#AFDDE5]/30 px-5 py-2 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-[#964734] fill-[#964734]" />)}
                    <span className="text-xs text-[#024950] font-semibold">4.9/5 · 3,240 reviews</span>
                  </div>
                  <span className="text-[10px] text-gray-400">AI-powered support</span>
                </div>

                {/* Messages container */}
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f0fafb] to-white p-4 space-y-3"
                  style={{ minHeight: 220, maxHeight: 300 }}
                >
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                    >
                      {msg.sender === 'support' && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-auto">
                          M
                        </div>
                      )}
                      <div className="max-w-[78%]">
                        <div
                          className={`px-4 py-2.5 text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-br from-[#003135] to-[#024950] text-white rounded-2xl rounded-tr-sm'
                              : 'bg-white border border-[#AFDDE5]/50 text-gray-700 rounded-2xl rounded-tl-sm shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className={`text-[10px] text-gray-400 mt-1 flex items-center gap-1 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                          {msg.sender === 'support' && <Bot className="w-3 h-3" />}
                          {msg.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="flex items-end gap-2"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          M
                        </div>
                        <div className="bg-white border border-[#AFDDE5]/50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                          {[0, 1, 2].map(i => (
                            <div key={i} className="w-2 h-2 bg-[#0FA4AF] rounded-full"
                              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>

                {/* Scroll to bottom button */}
                <AnimatePresence>
                  {showScrollBtn && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => scrollToBottom()}
                      className="absolute right-4 bottom-[140px] w-8 h-8 bg-white border border-[#AFDDE5] rounded-full shadow-md flex items-center justify-center text-[#003135] hover:bg-[#f0fafb] transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Quick reply chips */}
                <div className="px-4 py-2.5 bg-white border-t border-[#AFDDE5]/30 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      disabled={isTyping}
                      className="whitespace-nowrap text-xs px-3 py-1.5 bg-[#f0fafb] text-[#024950] border border-[#AFDDE5] rounded-full hover:bg-[#AFDDE5]/40 transition-colors font-medium shrink-0 disabled:opacity-50"
                    >
                      {qr}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="bg-white border-t border-[#AFDDE5]/40 px-4 py-3 flex items-center gap-3 shrink-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isTyping ? 'Maya is typing…' : 'Type your message...'}
                    disabled={isTyping}
                    className="flex-1 text-sm bg-[#f0fafb] border border-[#AFDDE5] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 text-gray-700 placeholder-gray-400 disabled:opacity-60"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] text-white flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
