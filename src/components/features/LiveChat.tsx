import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Headphones, Star } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  read?: boolean;
}

const QUICK_REPLIES = [
  'How do I book a package?',
  'What is the cancellation policy?',
  'Can I modify my booking?',
  'How do I track my trip?',
];

const AUTO_RESPONSES: Record<string, string> = {
  'book': 'Booking is easy! Browse our packages, click "Book Now", fill in your traveler details, and confirm payment. Need help with a specific package?',
  'cancel': 'Our cancellation policy allows free cancellation up to 48 hours before departure. After that, a 20% fee applies. Would you like more details?',
  'modify': 'Yes, you can modify your booking up to 7 days before travel. Visit "My Bookings" in your dashboard or let me know what changes you need.',
  'track': 'You can track your trip in real-time from your Traveler Dashboard under "My Bookings". Need your booking ID?',
  'price': 'All our prices are inclusive of taxes and fees. No hidden charges! Want me to help find a package within your budget?',
  'default': 'Thanks for reaching out! A support specialist will assist you shortly. In the meantime, I can help with common queries. What do you need?',
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 Welcome to FingerTrip Support. I'm Maya, your travel assistant. How can I help you plan your perfect journey today?",
      sender: 'support',
      time: formatTime(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: text.trim(), sender: 'user', time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutoResponse(text),
        sender: 'support',
        time: formatTime(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <AnimatePresence>
          {!isOpen && unread > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#964734] rounded-full flex items-center justify-center text-white text-xs font-bold z-10"
            >
              {unread}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] text-white shadow-2xl shadow-[#0FA4AF]/30 flex items-center justify-center relative"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-2xl animate-ping bg-[#0FA4AF]/30 pointer-events-none" />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden shadow-2xl shadow-[#003135]/25 border border-[#AFDDE5]/40"
            style={{ height: isMinimized ? 'auto' : '520px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003135] to-[#024950] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#0FA4AF]/30 flex items-center justify-center border border-[#AFDDE5]/30">
                    <Headphones className="w-5 h-5 text-[#AFDDE5]" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#003135]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Maya — Travel Assistant</div>
                  <div className="text-xs text-[#AFDDE5]/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                    Online · Typically replies instantly
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
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

            {!isMinimized && (
              <>
                {/* Rating bar */}
                <div className="bg-[#AFDDE5]/20 border-b border-[#AFDDE5]/30 px-5 py-2 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-[#964734] fill-[#964734]" />)}
                  </div>
                  <span className="text-xs text-[#024950] font-medium">4.9/5 · 3,240 reviews</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f0fafb] to-white p-4 space-y-3" style={{ height: '300px' }}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
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
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-br from-[#003135] to-[#024950] text-white rounded-tr-sm'
                              : 'bg-white border border-[#AFDDE5]/50 text-gray-700 rounded-tl-sm shadow-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className={`text-[10px] text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
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
                          <div className="w-2 h-2 bg-[#0FA4AF] rounded-full chat-dot" />
                          <div className="w-2 h-2 bg-[#0FA4AF] rounded-full chat-dot" />
                          <div className="w-2 h-2 bg-[#0FA4AF] rounded-full chat-dot" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick replies */}
                <div className="px-4 py-2 bg-white border-t border-[#AFDDE5]/30 flex gap-2 overflow-x-auto scrollbar-hide">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="whitespace-nowrap text-xs px-3 py-1.5 bg-[#AFDDE5]/30 text-[#024950] border border-[#AFDDE5] rounded-full hover:bg-[#0FA4AF]/20 transition-colors font-medium shrink-0"
                    >
                      {qr}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="bg-white border-t border-[#AFDDE5]/40 px-4 py-3 flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm bg-[#f0fafb] border border-[#AFDDE5] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 text-gray-700 placeholder-gray-400"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] text-white flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
