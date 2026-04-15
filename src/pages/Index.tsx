import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Shield, Zap, Lock, Navigation, TrendingUp, Award, Users, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/features/HeroSlider';
import SearchBar from '@/components/features/SearchBar';
import DestinationCard from '@/components/features/DestinationCard';
import PackageCard from '@/components/features/PackageCard';
import TestimonialSlider from '@/components/features/TestimonialSlider';
import StatCounter from '@/components/features/StatCounter';
import BookingWizard from '@/components/features/BookingWizard';
import { DESTINATIONS, PACKAGES } from '@/constants/data';

const stats = [
  { value: 150000, suffix: '+', label: 'Happy Travelers' },
  { value: 500, suffix: '+', label: 'Destinations' },
  { value: 1200, suffix: '+', label: 'Tour Packages' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Easy Booking',
    desc: 'Book your dream trip in under 3 minutes with our streamlined, intuitive platform.',
    iconColor: '#0FA4AF',
    bg: 'bg-[#AFDDE5]/30',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Trusted Vendors',
    desc: 'All vendors are verified, rated, and reviewed by thousands of real travelers.',
    iconColor: '#003135',
    bg: 'bg-[#003135]/10',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Secure Payments',
    desc: '256-bit SSL encryption protects every transaction. Your money is always safe.',
    iconColor: '#964734',
    bg: 'bg-[#964734]/10',
  },
  {
    icon: <Navigation className="w-6 h-6" />,
    title: 'Live Tracking',
    desc: 'Real-time booking updates, itinerary tracking, and 24/7 traveler support.',
    iconColor: '#024950',
    bg: 'bg-[#024950]/10',
  },
];

const offers = [
  {
    title: 'Monsoon Madness',
    desc: 'Up to 35% off on all Asian destinations this season',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
    badge: 'Limited Time',
    color: 'from-[#003135]/80 to-[#024950]/70',
    code: 'MONSOON35',
  },
  {
    title: 'Honeymoon Special',
    desc: 'Exclusive packages crafted for couples — Maldives, Bali & more',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
    badge: 'Most Popular',
    color: 'from-[#964734]/80 to-[#003135]/60',
    code: 'LOVE2026',
  },
  {
    title: 'Group Adventures',
    desc: 'Travel with friends — special pricing for 6+ travelers',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    badge: 'Group Deals',
    color: 'from-[#024950]/80 to-[#0FA4AF]/60',
    code: 'GROUP20',
  },
];

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <BookingWizard isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Search Bar */}
      <SearchBar />

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-[#003135]/5 via-[#AFDDE5]/30 to-[#003135]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatCounter stats={stats} />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-[#0FA4AF] bg-[#AFDDE5]/30 px-4 py-1.5 rounded-full border border-[#AFDDE5]">
              Explore The World
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003135] font-display mt-4 mb-4">
              Featured <span className="text-gradient">Destinations</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From tropical paradises to majestic mountain ranges — discover the world's most captivating destinations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#0FA4AF] text-[#003135] font-semibold rounded-2xl hover:bg-[#003135] hover:text-white hover:border-[#003135] transition-all duration-200"
            >
              View All Destinations <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Packages */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#AFDDE5]/20 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4"
          >
            <div>
              <span className="text-sm font-semibold text-[#0FA4AF] bg-[#AFDDE5]/30 px-4 py-1.5 rounded-full border border-[#AFDDE5]">
                🔥 Hot Right Now
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#003135] font-display mt-4">
                Trending <span className="text-gradient">Packages</span>
              </h2>
            </div>
            <Link to="/packages" className="flex items-center gap-2 text-[#0FA4AF] font-semibold hover:gap-3 transition-all">
              All Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.filter((p) => p.trending).slice(0, 6).map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
          {/* Book Now CTA */}
          <div className="text-center mt-10">
            <button
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#964734] to-[#0FA4AF] text-white font-bold rounded-2xl shadow-xl shadow-[#964734]/20 hover:shadow-[#0FA4AF]/30 hover:scale-105 transition-all duration-200"
            >
              Book Your Journey Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why FingerTrip */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-[#0FA4AF] bg-[#AFDDE5]/30 px-4 py-1.5 rounded-full border border-[#AFDDE5]">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003135] font-display mt-4 mb-4">
              The FingerTrip <span className="text-gradient">Difference</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We've reimagined travel booking from the ground up — for the modern explorer.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover group p-7 bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm"
              >
                <div className={`w-14 h-14 ${feat.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  style={{ color: feat.iconColor }}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-[#003135] font-display mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Trust badges */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Award className="w-5 h-5 text-[#964734]" />, text: 'Best Travel Platform 2025' },
              { icon: <Users className="w-5 h-5 text-[#0FA4AF]" />, text: '150K+ Happy Travelers' },
              { icon: <Globe className="w-5 h-5 text-[#003135]" />, text: '500+ Destinations' },
              { icon: <CheckCircle className="w-5 h-5 text-[#024950]" />, text: 'IATA Certified' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm"
              >
                {badge.icon}
                <span className="text-sm font-medium text-[#003135]">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers & Deals */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#AFDDE5]/15 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-[#0FA4AF] bg-[#AFDDE5]/30 px-4 py-1.5 rounded-full border border-[#AFDDE5]">
              Hot Deals
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003135] font-display mt-4 mb-4">
              Exclusive <span className="text-gradient">Offers</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-hover relative overflow-hidden rounded-3xl h-64 cursor-pointer group"
              >
                <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${offer.color}`} />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div className="self-start bg-white/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                    {offer.badge}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display mb-1">{offer.title}</h3>
                    <p className="text-white/85 text-sm mb-4">{offer.desc}</p>
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 border border-white/40 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg">
                        Code: {offer.code}
                      </span>
                      <button onClick={() => setBookingOpen(true)} className="text-white text-sm font-semibold hover:underline">
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-[#0FA4AF] bg-[#AFDDE5]/30 px-4 py-1.5 rounded-full border border-[#AFDDE5]">
              Real Experiences
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003135] font-display mt-4 mb-4">
              Travelers <span className="text-gradient">Love Us</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Over 150,000 travelers have trusted FingerTrip for their dream vacations.
            </p>
          </motion.div>
          <div className="bg-gradient-to-br from-[#003135]/5 to-[#AFDDE5]/30 rounded-3xl p-10 border border-[#AFDDE5]">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003135] via-[#024950] to-[#003135] p-12 text-center shadow-2xl shadow-[#003135]/30"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-10 w-32 h-32 bg-[#0FA4AF] rounded-full" />
              <div className="absolute bottom-4 left-6 w-24 h-24 bg-[#AFDDE5] rounded-full" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-display mb-4">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-[#AFDDE5]/80 text-lg mb-8 max-w-xl mx-auto">
                Join 150,000+ travelers who've discovered their dream destinations with FingerTrip.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#964734] to-[#0FA4AF] text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all shadow-lg"
                >
                  Start Booking Now
                </button>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white/15 border-2 border-[#AFDDE5]/40 text-white font-bold rounded-2xl hover:bg-white/25 transition-colors"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
