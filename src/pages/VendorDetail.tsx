import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Star, CheckCircle, MapPin, Package, Mail,
  Phone, Globe, Award, Shield, ChevronLeft, ChevronRight,
  Building2, Send, User, MessageSquare, ThumbsUp, Clock
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/features/PackageCard';
import { VENDORS, PACKAGES, TESTIMONIALS } from '@/constants/data';
import { toast } from 'sonner';

const REVIEWS_PER_PAGE = 3;

const VENDOR_EXTRA: Record<string, {
  phone: string; email: string; website: string;
  founded: string; totalBookings: number; responseTime: string;
  credentials: string[];
}> = {
  '1': { phone: '+1 (800) 123-4567', email: 'support@azurehorizons.com', website: 'azurehorizons.com', founded: '2010', totalBookings: 8420, responseTime: '< 2 hours', credentials: ['IATA Certified', 'ISO 9001:2015', 'ATOL Protected'] },
  '2': { phone: '+41 44 500 1234', email: 'info@alpinedreams.ch', website: 'alpinedreams.ch', founded: '2012', totalBookings: 5130, responseTime: '< 3 hours', credentials: ['Swiss Tourism Board', 'IATA Certified', 'TripAdvisor Excellence'] },
  '3': { phone: '+91 194 246 0000', email: 'contact@himalayantrails.in', website: 'himalayantrails.in', founded: '2008', totalBookings: 14300, responseTime: '< 1 hour', credentials: ['Ministry of Tourism India', 'IATA Certified', 'Eco-Tourism Certified'] },
  '4': { phone: '+971 4 555 8890', email: 'travel@desertpearl.ae', website: 'desertpearl.ae', founded: '2014', totalBookings: 4210, responseTime: '< 2 hours', credentials: ['DTCM Licensed', 'IATA Certified', 'Five-Star Partner'] },
  '5': { phone: '+62 361 123 456', email: 'hello@sunrisetravels.com', website: 'sunrisetravels.com', founded: '2011', totalBookings: 9870, responseTime: '< 2 hours', credentials: ['Indonesia Ministry of Tourism', 'IATA Certified', 'Green Tourism Award'] },
  '6': { phone: '+66 2 555 7890', email: 'hello@thaidiscovery.com', website: 'thaidiscovery.com', founded: '2013', totalBookings: 7650, responseTime: '< 3 hours', credentials: ['TAT Certified', 'IATA Certified', 'Responsible Tourism'] },
};

const TABS = ['Packages', 'Reviews', 'Contact'];

const ratingBreakdown = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 20 },
  { stars: 3, pct: 7 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 2 },
];

export default function VendorDetail() {
  const { id } = useParams<{ id: string }>();
  const vendor = VENDORS.find((v) => v.id === id);
  const extra = (id && VENDOR_EXTRA[id]) || VENDOR_EXTRA['1'];

  const [activeTab, setActiveTab] = useState(0);
  const [reviewPage, setReviewPage] = useState(1);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#f0fafb]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <Building2 className="w-16 h-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Vendor Not Found</h1>
          <p className="text-gray-500 mb-6">The vendor ID <span className="font-mono font-semibold">{id}</span> does not exist.</p>
          <Link to="/vendors" className="px-6 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl">
            Back to Vendors
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Vendor's packages
  const vendorPackages = PACKAGES.filter((p) => p.vendor === vendor.name);

  // Reviews (use testimonials that match or all for demo)
  const allReviews = TESTIMONIALS.filter((t) =>
    vendorPackages.some((p) => p.title === t.package)
  ).length > 0
    ? TESTIMONIALS.filter((t) => vendorPackages.some((p) => p.title === t.package))
    : TESTIMONIALS;

  const totalReviewPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const pagedReviews = allReviews.slice(
    (reviewPage - 1) * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success(`Message sent to ${vendor.name}! They'll respond within ${extra.responseTime}.`);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const avgRating = vendor.rating;
  const totalReviews = vendor.reviews;

  return (
    <div className="min-h-screen bg-[#f0fafb]">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-20 pb-0 bg-gradient-to-br from-[#003135] via-[#024950] to-[#003135] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <img src={vendor.logo} alt="" className="w-full h-full object-cover blur-sm scale-110" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-0">
          <Link to="/vendors" className="inline-flex items-center gap-2 text-[#AFDDE5]/70 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Vendors
          </Link>

          {/* Profile Card — overlaps into content area */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-[#003135]/20 border border-[#AFDDE5]/20 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 mb-0 translate-y-8">
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl border-4 border-[#AFDDE5]/30 overflow-hidden bg-[#f0fafb] shadow-lg">
                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=100&q=80`; }} />
              </div>
              {vendor.verified && (
                <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-3 justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-bold text-gray-900 font-display">{vendor.name}</h1>
                    {vendor.verified && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <Shield className="w-3 h-3" /> Verified Partner
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0FA4AF]" /> {vendor.location}</span>
                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#0FA4AF]" /> {vendor.packages} packages</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0FA4AF]" /> Since {extra.founded}</span>
                  </div>
                </div>

                {/* Rating pill */}
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <div>
                    <div className="text-xl font-bold text-gray-900 leading-none">{avgRating}</div>
                    <div className="text-[10px] text-gray-400">{totalReviews.toLocaleString()} reviews</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-4 max-w-2xl">{vendor.description}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {vendor.specialties.map((s) => (
                  <span key={s} className="text-xs bg-[#AFDDE5]/30 text-[#024950] border border-[#AFDDE5]/50 px-3 py-1 rounded-full font-medium">{s}</span>
                ))}
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-2">
                {extra.credentials.map((c) => (
                  <span key={c} className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                    <Award className="w-3 h-3" /> {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-3 sm:gap-4 shrink-0 sm:border-l sm:border-[#AFDDE5]/30 sm:pl-6">
              {[
                { label: 'Total Bookings', value: extra.totalBookings.toLocaleString(), icon: <ThumbsUp className="w-4 h-4 text-[#0FA4AF]" /> },
                { label: 'Response Time', value: extra.responseTime, icon: <Clock className="w-4 h-4 text-[#0FA4AF]" /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#f0fafb] rounded-2xl border border-[#AFDDE5]/30 p-3 text-center min-w-[110px]">
                  <div className="flex justify-center mb-1">{stat.icon}</div>
                  <div className="font-bold text-gray-900 text-sm">{stat.value}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="pt-16 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Tab Nav */}
          <div className="flex gap-1 bg-white border border-[#AFDDE5]/30 p-1.5 rounded-2xl w-fit shadow-sm mb-8">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  activeTab === i
                    ? 'bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-[#f0fafb]'
                }`}
              >
                {tab}
                {tab === 'Packages' && <span className="ml-1.5 text-[10px] opacity-70">({vendorPackages.length || PACKAGES.length})</span>}
                {tab === 'Reviews' && <span className="ml-1.5 text-[10px] opacity-70">({allReviews.length})</span>}
              </button>
            ))}
          </div>

          {/* PACKAGES TAB */}
          {activeTab === 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              {vendorPackages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {vendorPackages.map((pkg, i) => (
                    <PackageCard key={pkg.id} pkg={pkg} index={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {PACKAGES.slice(0, 3).map((pkg, i) => (
                    <PackageCard key={pkg.id} pkg={pkg} index={i} />
                  ))}
                </div>
              )}
              <div className="mt-8 text-center">
                <Link to="/packages" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#AFDDE5] text-[#003135] font-semibold rounded-xl hover:border-[#0FA4AF] transition-colors">
                  View All Packages on FingerTrip →
                </Link>
              </div>
            </motion.div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 1 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-3 gap-8">
              {/* Left: Rating breakdown */}
              <div className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6 h-fit">
                <h3 className="font-bold text-gray-900 text-lg font-display mb-2">Rating Breakdown</h3>
                <div className="flex items-end gap-3 mb-6">
                  <div className="text-6xl font-bold text-gray-900 font-display leading-none">{avgRating}</div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(avgRating) ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{totalReviews.toLocaleString()} verified reviews</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {ratingBreakdown.map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16 shrink-0">
                        <span className="text-sm font-semibold text-gray-700">{stars}</span>
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      </div>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  {[
                    { label: 'Accommodation', score: 4.8 },
                    { label: 'Service', score: 4.9 },
                    { label: 'Value', score: 4.7 },
                    { label: 'Itinerary', score: 4.8 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0FA4AF] rounded-full" style={{ width: `${(item.score / 5) * 100}%` }} />
                        </div>
                        <span className="font-semibold text-gray-800 text-xs w-6">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Review list */}
              <div className="lg:col-span-2 space-y-4">
                {pagedReviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-5"
                  >
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border-2 border-[#AFDDE5]/30"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${review.name}&background=random`; }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                          <div>
                            <span className="font-bold text-gray-900 text-sm">{review.name}</span>
                            <span className="text-xs text-gray-400 ml-2 flex items-center gap-1 inline-flex">
                              <MapPin className="w-3 h-3" /> {review.location}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 my-1.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}`} />
                          ))}
                          <span className="text-xs font-semibold text-gray-700 ml-1">{review.rating}.0</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">{review.comment}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-[#AFDDE5]/30 text-[#024950] border border-[#AFDDE5]/40 px-2.5 py-0.5 rounded-full font-medium">
                            {review.package}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-gray-400 ml-auto">
                            <ThumbsUp className="w-3 h-3" /> Helpful
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination */}
                {totalReviewPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                      disabled={reviewPage === 1}
                      className="w-10 h-10 rounded-xl border border-[#AFDDE5] bg-white flex items-center justify-center text-[#003135] hover:border-[#0FA4AF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(totalReviewPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setReviewPage(i + 1)}
                        className={`w-10 h-10 rounded-xl border font-semibold text-sm transition-colors ${
                          reviewPage === i + 1
                            ? 'bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white border-transparent'
                            : 'border-[#AFDDE5] bg-white text-gray-600 hover:border-[#0FA4AF]'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setReviewPage((p) => Math.min(totalReviewPages, p + 1))}
                      disabled={reviewPage === totalReviewPages}
                      className="w-10 h-10 rounded-xl border border-[#AFDDE5] bg-white flex items-center justify-center text-[#003135] hover:border-[#0FA4AF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 2 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 font-display text-lg mb-5">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Phone className="w-5 h-5 text-[#0FA4AF]" />, label: 'Phone', value: extra.phone, href: `tel:${extra.phone}` },
                      { icon: <Mail className="w-5 h-5 text-[#0FA4AF]" />, label: 'Email', value: extra.email, href: `mailto:${extra.email}` },
                      { icon: <Globe className="w-5 h-5 text-[#0FA4AF]" />, label: 'Website', value: extra.website, href: `https://${extra.website}` },
                      { icon: <MapPin className="w-5 h-5 text-[#0FA4AF]" />, label: 'Location', value: vendor.location, href: undefined },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4 p-4 bg-[#f0fafb] rounded-2xl border border-[#AFDDE5]/30 hover:border-[#0FA4AF]/50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#AFDDE5]/30 flex items-center justify-center shrink-0">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-semibold text-[#003135] hover:text-[#0FA4AF] transition-colors truncate block">{item.value}</a>
                          ) : (
                            <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#003135] to-[#024950] rounded-3xl p-6 text-white">
                  <h4 className="font-bold font-display mb-1">Typical Response Time</h4>
                  <p className="text-[#AFDDE5]/80 text-sm mb-3">This vendor responds within</p>
                  <div className="text-3xl font-bold text-[#0FA4AF]">{extra.responseTime}</div>
                  <p className="text-[#AFDDE5]/60 text-xs mt-2">Business hours: Mon–Sat, 9am–7pm local time</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 font-display text-lg mb-1">Send a Message</h3>
                <p className="text-gray-400 text-sm mb-6">Have a question? Reach out to {vendor.name} directly.</p>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Your Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input type="text" required value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#f0fafb] border border-[#AFDDE5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 transition"
                          placeholder="Alex Johnson" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input type="email" required value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#f0fafb] border border-[#AFDDE5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 transition"
                          placeholder="you@email.com" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Subject *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input type="text" required value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f0fafb] border border-[#AFDDE5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 transition"
                        placeholder="Inquiry about Maldives package..." />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Message *</label>
                    <textarea required rows={5} value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 transition resize-none"
                      placeholder="I'm interested in booking the Maldives Luxury Escape for 2 people in June..." />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-bold rounded-xl shadow-lg hover:shadow-[#0FA4AF]/30 transition-all disabled:opacity-70">
                    {sending ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</span>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
