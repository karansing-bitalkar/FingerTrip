import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants/data';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Quote Icon */}
          <div className="w-14 h-14 bg-gradient-to-br from-[#003135] to-[#0FA4AF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#003135]/20">
            <Quote className="w-7 h-7 text-white" />
          </div>

          {/* Comment */}
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 italic">
            "{t.comment}"
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'text-[#964734] fill-[#964734]' : 'text-gray-200'}`} />
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#AFDDE5] shadow-md"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'; }}
            />
            <div className="text-left">
              <div className="font-bold text-[#003135]">{t.name}</div>
              <div className="text-sm text-gray-500">{t.location}</div>
              <div className="text-xs text-[#964734] font-medium mt-0.5">📍 {t.package}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="w-10 h-10 rounded-full bg-[#AFDDE5]/40 text-[#003135] flex items-center justify-center hover:bg-[#0FA4AF]/20 transition-colors border border-[#AFDDE5]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-8 h-2.5 bg-[#0FA4AF]' : 'w-2.5 h-2.5 bg-[#AFDDE5] hover:bg-[#0FA4AF]/50'
            }`}
          />
        ))}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)}
          className="w-10 h-10 rounded-full bg-[#AFDDE5]/40 text-[#003135] flex items-center justify-center hover:bg-[#0FA4AF]/20 transition-colors border border-[#AFDDE5]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
