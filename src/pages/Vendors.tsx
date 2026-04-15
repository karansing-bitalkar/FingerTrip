import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, CheckCircle, Package, MapPin, ArrowRight, Building2, X, BarChart2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { VENDORS } from '@/constants/data';

const VENDOR_EXTRA_RESPONSE: Record<string, string> = {
  '1': '< 2 hours', '2': '< 3 hours', '3': '< 1 hour',
  '4': '< 2 hours', '5': '< 2 hours', '6': '< 3 hours',
};
const VENDOR_CREDENTIALS: Record<string, string[]> = {
  '1': ['IATA Certified', 'ISO 9001:2015', 'ATOL Protected'],
  '2': ['Swiss Tourism Board', 'IATA Certified', 'TripAdvisor Excellence'],
  '3': ['Ministry of Tourism India', 'IATA Certified', 'Eco-Tourism Certified'],
  '4': ['DTCM Licensed', 'IATA Certified', 'Five-Star Partner'],
  '5': ['Indonesia Ministry of Tourism', 'IATA Certified', 'Green Tourism Award'],
  '6': ['TAT Certified', 'IATA Certified', 'Responsible Tourism'],
};

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
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareVendors = VENDORS.filter((v) => compareIds.includes(v.id));

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
                {/* Compare checkbox */}
                <div className="px-5 pt-4 pb-0 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compareIds.includes(vendor.id)}
                      onChange={() => toggleCompare(vendor.id)}
                      disabled={!compareIds.includes(vendor.id) && compareIds.length >= 3}
                      className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-gray-500">
                      {compareIds.includes(vendor.id) ? 'Added to compare' : compareIds.length >= 3 ? 'Max 3 selected' : 'Compare'}
                    </span>
                  </label>
                  {compareIds.includes(vendor.id) && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">Selected</span>
                  )}
                </div>

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

      {/* ─── Sticky Compare Bar ─── */}
      <AnimatePresence>
        {compareIds.length >= 2 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-orange-100 shadow-2xl px-4 py-4"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-gray-900 text-sm">{compareIds.length} vendors selected</span>
              </div>
              <div className="flex gap-3 flex-1 flex-wrap">
                {compareVendors.map((v) => (
                  <div key={v.id} className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5">
                    <img src={v.logo} alt={v.name} className="w-6 h-6 rounded-lg object-cover" />
                    <span className="text-xs font-semibold text-orange-800">{v.name}</span>
                    <button onClick={() => toggleCompare(v.id)} className="text-orange-400 hover:text-orange-600 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setCompareIds([])} className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  Clear
                </button>
                <button
                  onClick={() => setCompareOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all text-sm"
                >
                  <BarChart2 className="w-4 h-4" /> Compare Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Compare Modal ─── */}
      <AnimatePresence>
        {compareOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCompareOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-white" />
                  <h3 className="text-xl font-bold text-white font-display">Vendor Comparison</h3>
                </div>
                <button onClick={() => setCompareOpen(false)} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-orange-50 bg-orange-50/50">
                      <td className="px-6 py-4 text-xs font-bold text-gray-400 uppercase w-36">Attribute</td>
                      {compareVendors.map((v) => (
                        <td key={v.id} className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-orange-100">
                              <img src={v.logo} alt={v.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold text-gray-900 text-sm text-center leading-tight">{v.name}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        label: 'Rating',
                        render: (v: typeof compareVendors[0]) => (
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-bold text-gray-900">{v.rating}</span>
                            <span className="text-xs text-gray-400">/ 5.0</span>
                          </div>
                        ),
                      },
                      {
                        label: 'Reviews',
                        render: (v: typeof compareVendors[0]) => (
                          <span className="font-semibold text-gray-800">{v.reviews.toLocaleString()}</span>
                        ),
                      },
                      {
                        label: 'Packages',
                        render: (v: typeof compareVendors[0]) => (
                          <span className="font-semibold text-gray-800">{v.packages} packages</span>
                        ),
                      },
                      {
                        label: 'Response Time',
                        render: (v: typeof compareVendors[0]) => (
                          <span className="font-semibold text-emerald-600">{VENDOR_EXTRA_RESPONSE[v.id] || 'N/A'}</span>
                        ),
                      },
                      {
                        label: 'Verified',
                        render: (v: typeof compareVendors[0]) => (
                          v.verified
                            ? <span className="flex items-center justify-center gap-1 text-emerald-600 font-semibold text-xs"><CheckCircle className="w-4 h-4" /> Verified</span>
                            : <span className="text-gray-400 text-xs">Not verified</span>
                        ),
                      },
                      {
                        label: 'Credentials',
                        render: (v: typeof compareVendors[0]) => (
                          <div className="flex flex-col gap-1 items-center">
                            {(VENDOR_CREDENTIALS[v.id] || []).map((c) => (
                              <span key={c} className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">
                                <Award className="w-2.5 h-2.5" /> {c}
                              </span>
                            ))}
                          </div>
                        ),
                      },
                      {
                        label: 'Specialties',
                        render: (v: typeof compareVendors[0]) => (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {v.specialties.map((s) => (
                              <span key={s} className="text-[10px] bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full">{s}</span>
                            ))}
                          </div>
                        ),
                      },
                      {
                        label: 'Location',
                        render: (v: typeof compareVendors[0]) => (
                          <span className="flex items-center justify-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3.5 h-3.5 text-orange-400" /> {v.location}
                          </span>
                        ),
                      },
                    ].map((row) => (
                      <tr key={row.label} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">{row.label}</td>
                        {compareVendors.map((v) => (
                          <td key={v.id} className="px-6 py-4 text-center text-sm">{row.render(v)}</td>
                        ))}
                      </tr>
                    ))}
                    {/* View Profile Row */}
                    <tr className="bg-orange-50/30">
                      <td className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Profile</td>
                      {compareVendors.map((v) => (
                        <td key={v.id} className="px-6 py-4 text-center">
                          <Link to={`/vendors/${v.id}`} onClick={() => setCompareOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-800 transition-colors">
                            View Profile <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
