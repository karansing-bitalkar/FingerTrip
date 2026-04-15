import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, CheckCircle, Package, MapPin, ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { VENDORS } from '@/constants/data';

const vendorBenefits = [
  { title: 'Global Reach', desc: '150,000+ active travelers on our platform ready to book your packages.', icon: '🌍' },
  { title: 'Zero Setup Cost', desc: 'Create your vendor profile and list packages for free — no upfront fees.', icon: '🆓' },
  { title: 'Smart Dashboard', desc: 'Manage packages, orders, earnings, and reviews from one powerful dashboard.', icon: '📊' },
  { title: 'Marketing Support', desc: 'We promote your top packages across social media and email campaigns.', icon: '📣' },
  { title: 'Secure Payments', desc: 'Receive payouts safely and on time — we handle all payment processing.', icon: '💳' },
  { title: '24/7 Support', desc: 'Dedicated vendor success team always available to help your business grow.', icon: '🎯' },
];

export default function Vendors() {
  const [search, setSearch] = useState('');

  const filtered = VENDORS.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.location.toLowerCase().includes(search.toLowerCase()) ||
    v.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-700 via-teal-600 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-emerald-200 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Building2 className="w-4 h-4" /> 200+ Verified Travel Vendors
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white font-display mb-5">
              Partner With<br /><span className="text-emerald-300">Trusted Vendors</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Every vendor on FingerTrip is thoroughly verified, rated by real travelers, and committed to premium service delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg">
                Become a Vendor
              </Link>
              <a href="#vendors" className="px-8 py-4 bg-white/15 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/25 transition-colors">
                Browse Vendors
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: '200+', label: 'Verified Vendors' },
            { value: '1,200+', label: 'Active Packages' },
            { value: '₹50Cr+', label: 'Revenue Generated' },
            { value: '4.8★', label: 'Average Rating' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-emerald-600 font-display">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor Grid */}
      <section id="vendors" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Featured Vendors</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="h-28 bg-gradient-to-br from-orange-100 to-amber-100 relative">
                  <img src={vendor.logo} alt={vendor.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-md overflow-hidden border-2 border-orange-100">
                      <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {vendor.verified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>

                <div className="p-5 pt-3">
                  <h3 className="text-lg font-bold text-gray-900 font-display mb-1">{vendor.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-400" />{vendor.location}</span>
                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-orange-400" />{vendor.packages} packages</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{vendor.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {vendor.specialties.map((s) => (
                      <span key={s} className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-gray-800 text-sm">{vendor.rating}</span>
                      <span className="text-xs text-gray-400">({vendor.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <Link to={`/vendors/${vendor.id}`} className="flex items-center gap-1 text-orange-600 font-semibold text-sm hover:gap-2 transition-all">
                      View Profile <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Vendor CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">
              Grow Your Travel Business with <span className="text-gradient">FingerTrip</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Join 200+ verified vendors who are scaling their travel businesses and reaching new customers every day.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {vendorBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:scale-105 transition-all">
              Start as a Vendor — It's Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
