import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, MapPin, Star, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DESTINATIONS } from '@/constants/data';

const QUESTIONS = [
  {
    id: 1,
    question: 'What is your travel style?',
    icon: '🧭',
    options: [
      { label: 'Adventure & Thrills', value: 'adventure', tags: ['Adventure', 'Mountains'] },
      { label: 'Relax & Unwind', value: 'relax', tags: ['Beach', 'Luxury'] },
      { label: 'Culture & History', value: 'culture', tags: ['Culture', 'City'] },
      { label: 'Nature & Wildlife', value: 'nature', tags: ['Nature', 'Adventure'] },
    ],
  },
  {
    id: 2,
    question: "What's your ideal budget per person?",
    icon: '💰',
    options: [
      { label: 'Budget ($500–$1,000)', value: 'budget', maxPrice: 1000 },
      { label: 'Mid-Range ($1,000–$2,500)', value: 'mid', maxPrice: 2500 },
      { label: 'Premium ($2,500–$4,000)', value: 'premium', maxPrice: 4000 },
      { label: 'Luxury (No limit)', value: 'luxury', maxPrice: Infinity },
    ],
  },
  {
    id: 3,
    question: 'What climate do you prefer?',
    icon: '☀️',
    options: [
      { label: 'Tropical & Warm', value: 'tropical', tags: ['Beach', 'Nature'] },
      { label: 'Cool & Alpine', value: 'alpine', tags: ['Mountains', 'Adventure'] },
      { label: 'Dry & Desert', value: 'desert', tags: ['Luxury', 'City'] },
      { label: 'Temperate & Mild', value: 'temperate', tags: ['Culture', 'City'] },
    ],
  },
  {
    id: 4,
    question: 'How long would you like to travel?',
    icon: '📅',
    options: [
      { label: 'Weekend Getaway (2–4 days)', value: 'weekend', minDays: 0, maxDays: 4 },
      { label: 'Short Trip (5–7 days)', value: 'short', minDays: 5, maxDays: 7 },
      { label: 'Extended Vacation (8–14 days)', value: 'extended', minDays: 8, maxDays: 14 },
      { label: 'Long Journey (15+ days)', value: 'long', minDays: 15, maxDays: 999 },
    ],
  },
  {
    id: 5,
    question: "Who are you travelling with?",
    icon: '👥',
    options: [
      { label: 'Solo Adventure', value: 'solo', tags: ['Adventure', 'Culture'] },
      { label: 'Romantic Couple', value: 'couple', tags: ['Luxury', 'Beach', 'Romantic'] },
      { label: 'Family with Kids', value: 'family', tags: ['Beach', 'City', 'Nature'] },
      { label: 'Friends Group', value: 'friends', tags: ['Adventure', 'Party', 'City'] },
    ],
  },
];

type Answers = Record<number, string>;

function scoreDestination(dest: typeof DESTINATIONS[0], answers: Answers): number {
  let score = 0;

  // Style match
  const styleQ = QUESTIONS[0].options.find(o => o.value === answers[1]);
  if (styleQ && 'tags' in styleQ) {
    styleQ.tags.forEach(tag => { if (dest.tags.includes(tag)) score += 3; });
  }

  // Budget match
  const budgetQ = QUESTIONS[1].options.find(o => o.value === answers[2]);
  if (budgetQ && 'maxPrice' in budgetQ) {
    if (dest.price <= budgetQ.maxPrice) score += 2;
  }

  // Climate match
  const climateQ = QUESTIONS[2].options.find(o => o.value === answers[3]);
  if (climateQ && 'tags' in climateQ) {
    climateQ.tags.forEach(tag => { if (dest.tags.includes(tag)) score += 2; });
  }

  // Travel companion
  const compQ = QUESTIONS[4].options.find(o => o.value === answers[5]);
  if (compQ && 'tags' in compQ) {
    compQ.tags.forEach(tag => { if (dest.tags.includes(tag)) score += 1; });
  }

  // Bonus for popular destinations
  if (dest.popular) score += 1;
  // Bonus for high rating
  score += dest.rating - 4;

  return score;
}

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const allDestinations = [
    ...DESTINATIONS,
    { id: '7', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', price: 2899, rating: 4.8, reviews: 7821, description: 'City of light.', tags: ['City', 'Culture', 'Luxury'], popular: true },
    { id: '8', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', price: 2499, rating: 4.9, reviews: 4512, description: 'Iconic sunsets.', tags: ['Beach', 'Luxury', 'Romantic'], popular: true },
    { id: '9', name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', price: 3199, rating: 4.9, reviews: 3289, description: 'Ancient capital.', tags: ['Culture', 'Nature', 'City'], popular: false },
    { id: '10', name: 'New Zealand', country: 'Oceania', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80', price: 3799, rating: 4.8, reviews: 2156, description: 'Adventure land.', tags: ['Adventure', 'Nature', 'Mountains'], popular: true },
    { id: '11', name: 'Machu Picchu', country: 'Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', price: 2699, rating: 4.9, reviews: 1923, description: 'Lost city.', tags: ['Adventure', 'Culture', 'Mountains'], popular: false },
  ];

  const results = finished
    ? [...allDestinations]
        .map(d => ({ ...d, score: scoreDestination(d as any, answers) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : [];

  const handleSelect = (value: string) => setSelected(value);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      setFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(q => q - 1);
      setSelected(answers[QUESTIONS[currentQ - 1].id] || null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setFinished(false);
  };

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-[#003135] via-[#024950] to-[#0FA4AF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-[#AFDDE5] bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              🧭 Travel Personality Quiz
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-display mb-4">
              Find Your Perfect <span className="text-[#AFDDE5]">Destination</span>
            </h1>
            <p className="text-white/70 text-base">
              Answer 5 quick questions and we'll match you with the destinations that fit your travel style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz / Results */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                    <span>{Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}% complete</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: `${progress}%` }}
                      animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-gradient-to-r from-[#003135] to-[#0FA4AF] rounded-full"
                    />
                  </div>
                  <div className="flex gap-1.5 mt-2.5">
                    {QUESTIONS.map((_, i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= currentQ ? 'bg-[#0FA4AF]' : 'bg-gray-100'}`} />
                    ))}
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
                  <div className="text-5xl mb-4 text-center">{QUESTIONS[currentQ].icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900 font-display text-center mb-8">
                    {QUESTIONS[currentQ].question}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUESTIONS[currentQ].options.map((opt) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                          selected === opt.value
                            ? 'border-[#0FA4AF] bg-[#AFDDE5]/20 shadow-md'
                            : 'border-gray-100 bg-gray-50 hover:border-[#AFDDE5] hover:bg-[#f0fafb]'
                        }`}
                      >
                        {selected === opt.value && (
                          <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-[#0FA4AF]" />
                        )}
                        <span className={`font-semibold text-sm ${selected === opt.value ? 'text-[#003135]' : 'text-gray-700'}`}>
                          {opt.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={handleBack}
                      disabled={currentQ === 0}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-600 font-semibold rounded-xl text-sm disabled:opacity-40 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!selected}
                      className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-bold rounded-xl text-sm disabled:opacity-40 hover:shadow-lg transition-all"
                    >
                      {currentQ === QUESTIONS.length - 1 ? 'See Results' : 'Next'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Results header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#0FA4AF] to-[#003135] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#0FA4AF]/30"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 font-display mb-2">Your Perfect Matches!</h2>
                  <p className="text-gray-500">Based on your answers, we've found your ideal destinations.</p>
                </div>

                {/* Top 3 results */}
                <div className="space-y-5">
                  {results.map((dest, i) => (
                    <motion.div
                      key={dest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className={`bg-white rounded-3xl border-2 overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                        i === 0 ? 'border-[#0FA4AF]' : 'border-gray-100'
                      }`}
                    >
                      {i === 0 && (
                        <div className="bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-xs font-bold px-5 py-2 flex items-center gap-2">
                          🏆 Best Match For You
                        </div>
                      )}
                      <div className="flex gap-0">
                        <div className="relative w-40 shrink-0">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" style={{ minHeight: 140 }} />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
                          <div className="absolute top-3 left-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center font-bold text-[#003135] text-sm shadow">
                            {i + 1}
                          </div>
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 font-display">{dest.name}</h3>
                              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#964734]" /> {dest.country}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-lg font-bold text-[#964734]">From ${dest.price.toLocaleString()}</div>
                              <div className="flex items-center gap-1 justify-end mt-0.5">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span className="text-xs font-semibold text-gray-700">{dest.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{dest.description}</p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {dest.tags.slice(0, 3).map(t => (
                              <span key={t} className="text-[10px] bg-[#AFDDE5]/30 text-[#024950] border border-[#AFDDE5]/60 px-2 py-0.5 rounded-full font-medium">{t}</span>
                            ))}
                          </div>
                          <Link
                            to="/packages"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-xs font-bold rounded-xl hover:shadow-md transition-all"
                          >
                            Book Now <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-[#AFDDE5] text-[#003135] font-semibold rounded-2xl hover:border-[#0FA4AF] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Retake Quiz
                  </button>
                  <Link
                    to="/destinations"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-bold rounded-2xl hover:shadow-lg transition-all"
                  >
                    Browse All Destinations <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
