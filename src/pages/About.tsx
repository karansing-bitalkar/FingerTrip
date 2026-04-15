import { motion } from 'framer-motion';
import {
  Globe, Award, Heart, Target, Lightbulb, Shield,
  Search, GitCompare, CreditCard, Smile,
  CheckCircle, DollarSign, HeadphonesIcon, Star, Sparkles, Users, Zap, ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatCounter from '@/components/features/StatCounter';

const values = [
  { icon: <Heart className="w-6 h-6" />, title: 'Traveler First', desc: 'Every decision we make starts with one question: How does this help our travelers?', color: 'text-rose-500 bg-rose-50' },
  { icon: <Shield className="w-6 h-6" />, title: 'Trust & Safety', desc: 'We verify every vendor, protect every payment, and guarantee every booking.', color: 'text-blue-500 bg-blue-50' },
  { icon: <Lightbulb className="w-6 h-6" />, title: 'Innovation', desc: 'Constantly reimagining travel technology to make booking simpler and smarter.', color: 'text-amber-500 bg-amber-50' },
  { icon: <Target className="w-6 h-6" />, title: 'Excellence', desc: 'We hold ourselves and our vendors to the highest standards of service quality.', color: 'text-emerald-500 bg-emerald-50' },
];

const milestones = [
  { year: '2019', event: 'FingerTrip founded in Mumbai by Aryan & Priya' },
  { year: '2020', event: 'Launched with 50 vendors and 10,000 travelers' },
  { year: '2021', event: 'Expanded to 25 countries, raised Series A funding' },
  { year: '2022', event: 'Crossed 50,000 bookings, launched mobile apps' },
  { year: '2023', event: '100,000+ travelers, won "Best Travel Startup" award' },
  { year: '2024', event: '200+ vendors, expanded to Middle East & Europe' },
  { year: '2025', event: '150,000+ travelers, launched Premium Concierge service' },
  { year: '2026', event: 'Global expansion — targeting 1M travelers by 2027' },
];

const stats = [
  { value: 150000, suffix: '+', label: 'Happy Travelers' },
  { value: 200, suffix: '+', label: 'Verified Vendors' },
  { value: 80, suffix: '+', label: 'Countries' },
  { value: 7, suffix: '', label: 'Years of Excellence' },
];

const goalCards = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: 'Make Luxury Accessible',
    desc: 'We break down barriers so every traveler can access premium destinations without compromise.',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50 border-orange-100',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Connect with Trusted Vendors',
    desc: 'We rigorously vet and onboard vendors who share our passion for extraordinary experiences.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 border-blue-100',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Seamless Booking Experience',
    desc: 'From discovery to departure — our platform makes every step of travel planning effortless.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 border-emerald-100',
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'Premium Destinations',
    desc: 'Explore handpicked destinations curated for unforgettable journeys and once-in-a-lifetime memories.',
    color: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50 border-purple-100',
  },
];

const visionPoints = [
  { icon: <Globe className="w-6 h-6 text-orange-500" />, title: "World's Trusted Marketplace", desc: 'Become the go-to global platform connecting millions of travelers with verified, premium travel vendors.' },
  { icon: <Sparkles className="w-6 h-6 text-amber-500" />, title: 'AI-Powered Recommendations', desc: 'Leverage cutting-edge AI to deliver hyper-personalized travel suggestions based on your unique preferences.' },
  { icon: <Globe className="w-6 h-6 text-blue-500" />, title: 'Global Destination Coverage', desc: 'Expand our network to 150+ countries, ensuring every corner of the world is just a click away.' },
  { icon: <Zap className="w-6 h-6 text-emerald-500" />, title: 'Future-Ready Technology', desc: 'Build the most advanced travel tech stack — AR previews, real-time pricing, and instant confirmations.' },
];

const steps = [
  {
    number: '01',
    icon: <Search className="w-8 h-8" />,
    title: 'Search Destinations',
    desc: 'Browse hundreds of curated destinations and travel packages tailored to every style and budget.',
    color: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-200',
  },
  {
    number: '02',
    icon: <GitCompare className="w-8 h-8" />,
    title: 'Compare Packages',
    desc: 'Side-by-side comparison of itineraries, vendors, prices, and reviews to find your perfect match.',
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-200',
  },
  {
    number: '03',
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Book Securely',
    desc: 'Instant, encrypted booking with flexible payment options and 100% money-back guarantee.',
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-200',
  },
  {
    number: '04',
    icon: <Smile className="w-8 h-8" />,
    title: 'Enjoy Your Journey',
    desc: 'Travel with confidence — our 24/7 concierge team is always there to support you on the road.',
    color: 'from-purple-500 to-violet-500',
    shadow: 'shadow-purple-200',
  },
];

const strategyCards = [
  { icon: <CheckCircle className="w-6 h-6" />, title: 'Curated Trusted Vendors', desc: 'Every vendor passes a strict 10-point verification process before joining our platform.', color: 'bg-emerald-50 border-emerald-100 text-emerald-600' },
  { icon: <DollarSign className="w-6 h-6" />, title: 'Competitive Pricing', desc: 'Direct vendor partnerships eliminate unnecessary markups — you always get the best price.', color: 'bg-orange-50 border-orange-100 text-orange-600' },
  { icon: <Shield className="w-6 h-6" />, title: 'Secure Transactions', desc: 'Bank-grade encryption, PCI DSS compliance, and fraud protection on every booking.', color: 'bg-blue-50 border-blue-100 text-blue-600' },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: '24/7 Customer Support', desc: 'Round-the-clock multilingual support via chat, phone, and email — wherever you are.', color: 'bg-purple-50 border-purple-100 text-purple-600' },
  { icon: <Star className="w-6 h-6" />, title: 'Quality Assurance', desc: 'Ongoing monitoring of vendor performance with real traveler reviews and ratings.', color: 'bg-amber-50 border-amber-100 text-amber-600' },
  { icon: <Sparkles className="w-6 h-6" />, title: 'Personalized Experiences', desc: 'AI-driven recommendations tailored to your travel history, preferences, and budget.', color: 'bg-rose-50 border-rose-100 text-rose-600' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-orange-600 bg-orange-100 border border-orange-200 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Globe className="w-4 h-4" /> Our Story
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 font-display mb-5">
              We're on a Mission to Make<br /><span className="text-gradient">Travel Extraordinary</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Founded in 2019, FingerTrip was born from a simple belief: that booking a premium travel experience should be as magical as the journey itself. We've spent 7 years building the platform that travelers and vendors deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white border-y border-orange-100">
        <div className="max-w-5xl mx-auto">
          <StatCounter stats={stats} />
        </div>
      </section>

      {/* Mission Section — Zig-Zag: Image Left, Text Right */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">Our Mission</span>
              <h2 className="text-4xl font-bold text-gray-900 font-display mt-4 mb-6">
                Making the World's Best Destinations Accessible to Everyone
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that transformative travel experiences shouldn't be reserved for the privileged few. FingerTrip democratizes access to premium travel by connecting travelers directly with trusted local vendors — eliminating middlemen and inflated prices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our technology and human expertise combine to deliver journeys that are not just vacations — they're life-changing experiences that stay with you forever.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['IATA Certified', 'ISO 27001 Secured', 'NASSCOM Member', 'Travel Award 2025'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <Award className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80" alt="Travel" className="rounded-2xl h-52 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80" alt="Team" className="rounded-2xl h-52 w-full object-cover mt-8" />
                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" alt="Dubai" className="rounded-2xl h-52 w-full object-cover -mt-8" />
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" alt="Bali" className="rounded-2xl h-52 w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">Our Core Values</h2>
            <p className="text-gray-500 text-lg">The principles that guide every decision at FingerTrip</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 bg-white rounded-2xl border border-orange-50 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 ${val.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{val.icon}</div>
                <h3 className="font-bold text-gray-900 font-display mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR GOAL — Zig-Zag: Text Left, Cards Right ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Side */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">Our Goal</span>
              <h2 className="text-4xl font-bold text-gray-900 font-display mt-4 mb-6">
                Building a Travel Platform That Truly Works for You
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our goal is simple — make luxury travel simple, accessible, and deeply personal. We're building the world's most trusted travel marketplace where every booking feels premium, every vendor is vetted, and every journey is unforgettable.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From the moment you search a destination to the moment you return home, FingerTrip is your trusted companion — handling every detail so you can focus on the magic of travel.
              </p>
              <a href="/packages" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all text-sm">
                Explore Packages <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Cards Side */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goalCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-2xl border ${card.bg} hover:shadow-md transition-all duration-200`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 font-display mb-2 text-sm">{card.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR VISION — Zig-Zag: Cards Left, Text Right ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#003135]/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Vision Points Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 order-2 lg:order-1">
              {visionPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 font-display text-sm mb-1">{point.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Text Right */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">Our Vision</span>
              <h2 className="text-4xl font-bold text-gray-900 font-display mt-4 mb-6">
                The Future of Travel — Powered by Trust & Technology
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                We envision a world where planning your dream vacation is as exciting as the trip itself. FingerTrip is building the infrastructure of tomorrow's travel — intelligent, inclusive, and boundless.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                By 2027, we aim to serve 1 million travelers across 150+ countries, powered by AI-driven personalization, instant vendor access, and the world's most trusted travel marketplace.
              </p>
              {/* Vision Highlight */}
              <div className="bg-gradient-to-r from-[#003135] to-[#024950] rounded-2xl p-5 text-white">
                <div className="text-3xl font-bold font-display mb-1">1M+</div>
                <div className="text-[#AFDDE5]/80 text-sm">Travelers by 2027 — Our North Star</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW FINGERTRIP WORKS — Full width steps ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">How It Works</span>
            <h2 className="text-4xl font-bold text-gray-900 font-display mt-4 mb-4">How FingerTrip Works</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Four simple steps from dreaming to doing — your perfect journey starts here.</p>
          </motion.div>

          {/* Steps — Zig-Zag alternating layout */}
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Icon Block */}
                <div className={`flex justify-center ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-2xl ${step.shadow}`}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center">
                      <span className={`text-lg font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Text Block */}
                <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                  <div className={`text-sm font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}>Step {step.number}</div>
                  <h3 className="text-3xl font-bold text-gray-900 font-display mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-8 h-px bg-gray-300" />
                      <span>Then next →</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STRATEGY — Bento Grid ── */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">Our Strategy</span>
            <h2 className="text-4xl font-bold text-gray-900 font-display mt-4 mb-4">Why Travelers Choose FingerTrip</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Six strategic pillars that make every FingerTrip experience truly exceptional.</p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {strategyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border ${card.color.replace('text-', 'border-').replace('-600', '-100').replace('text', 'border')} bg-white hover:shadow-lg transition-all duration-200 border border-gray-100 group`}
              >
                <div className={`w-12 h-12 rounded-2xl ${card.color.split(' ').filter(c => c.startsWith('bg-')).join(' ')} flex items-center justify-center mb-4 ${card.color.split(' ').filter(c => c.startsWith('text-')).join(' ')} group-hover:scale-110 transition-transform duration-200`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 font-display mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">Our Journey</h2>
            <p className="text-gray-500">7 years of growth, milestones, and memories</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-300 to-amber-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 text-${i % 2 === 0 ? 'right' : 'left'}`}>
                    <div className={`inline-block p-4 bg-white rounded-2xl border border-orange-100 shadow-sm ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <p className="text-sm text-gray-600">{m.event}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 z-10 shadow-lg">
                    {m.year.slice(2)}
                  </div>
                  <div className="flex-1">
                    <span className={`text-orange-600 font-bold text-sm ${i % 2 === 0 ? 'text-left' : 'text-right block'}`}>{m.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
