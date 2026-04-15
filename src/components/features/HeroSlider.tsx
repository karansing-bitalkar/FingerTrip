import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import maldivesImg from '@/assets/hero-maldives.jpg';
import himalayaImg from '@/assets/hero-himalaya.jpg';
import dubaiImg from '@/assets/hero-dubai.jpg';

const slides = [
  {
    id: 1,
    title: 'Maldives Luxury',
    subtitle: 'Escape',
    description: 'Drift into paradise — overwater villas, crystalline lagoons, and golden sunsets await in the Indian Ocean.',
    cta: 'Explore Maldives',
    ctaLink: '/packages',
    badge: 'Most Booked',
    rating: '4.9',
    from: 'From $4,999',
    image: maldivesImg,
    gradient: 'from-[#003135]/80 via-[#024950]/50 to-transparent',
  },
  {
    id: 2,
    title: 'Himalayan',
    subtitle: 'Adventure',
    description: "Conquer the world's rooftop — epic trekking, snow-capped vistas, and authentic mountain culture.",
    cta: 'Plan Your Trek',
    ctaLink: '/packages',
    badge: 'Top Rated',
    rating: '4.9',
    from: 'From $1,299',
    image: himalayaImg,
    gradient: 'from-[#003135]/80 via-slate-900/40 to-transparent',
  },
  {
    id: 3,
    title: 'Dubai Premium',
    subtitle: 'Tour',
    description: "The city of tomorrow — soaring skylines, desert luxury, and world-class experiences beyond imagination.",
    cta: 'Discover Dubai',
    ctaLink: '/packages',
    badge: 'Trending Now',
    rating: '4.7',
    from: 'From $2,799',
    image: dubaiImg,
    gradient: 'from-[#964734]/60 via-[#003135]/50 to-transparent',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
              <div className="max-w-2xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full mb-6"
                >
                  <Star className="w-4 h-4 text-[#AFDDE5] fill-[#AFDDE5]" />
                  <span>{slides[current].badge}</span>
                  <span className="w-px h-4 bg-white/40" />
                  <span>★ {slides[current].rating}</span>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-display leading-tight">
                    {slides[current].title}
                    <br />
                    <span style={{
                      background: 'linear-gradient(135deg, #0FA4AF, #AFDDE5)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {slides[current].subtitle}
                    </span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-5 text-lg text-white/85 leading-relaxed max-w-xl"
                >
                  {slides[current].description}
                </motion.p>

                {/* Price & CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <span className="text-[#AFDDE5] text-lg font-medium">{slides[current].from}</span>
                  <Link
                    to={slides[current].ctaLink}
                    className="px-8 py-4 bg-gradient-to-r from-[#964734] to-[#0FA4AF] text-white font-semibold rounded-2xl shadow-lg shadow-[#964734]/40 hover:shadow-[#0FA4AF]/50 hover:scale-105 transition-all duration-200"
                  >
                    {slides[current].cta}
                  </Link>
                  <Link
                    to="/destinations"
                    className="px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/25 transition-all duration-200"
                  >
                    Explore All
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-[#0FA4AF]/40 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-[#0FA4AF]/40 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2.5 bg-[#0FA4AF]' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-6 lg:right-12 z-20 text-white/60 text-sm font-medium">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}
