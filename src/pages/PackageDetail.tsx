import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Star, Clock, MapPin, Building2, Tag, ChevronLeft,
  ChevronRight, Check, CheckCircle, Shield, Globe, Users, Heart,
  Share2, Copy, Calendar
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingWizard from '@/components/features/BookingWizard';
import AvailabilityCalendar from '@/components/features/AvailabilityCalendar';
import { PACKAGES, TESTIMONIALS, VENDORS } from '@/constants/data';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

const extraPackages = [
  {
    id: '7', title: 'Paris Romantic Escape', destination: 'France', category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    price: 3499, originalPrice: 4299, duration: '7 Days / 6 Nights', rating: 4.8, reviews: 456,
    vendor: 'European Luxe Tours', description: 'Eiffel Tower dinners, Louvre tours, Versailles visits, and Seine river cruises.',
    itinerary: ['Day 1: Arrive Paris', 'Day 2: Eiffel & Champs-Élysées', 'Day 3: Louvre Museum', 'Day 4: Versailles', 'Day 5: Seine Cruise', 'Day 6: Shopping', 'Day 7: Departure'],
    includes: ['Flights', '5-star hotel', 'Guided tours', 'Seine cruise', 'Breakfast'], discount: 19, trending: false,
  },
  {
    id: '8', title: 'Goa Beach Holiday', destination: 'Goa', category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    price: 899, originalPrice: 1199, duration: '5 Days / 4 Nights', rating: 4.6, reviews: 1823,
    vendor: 'Beach Bliss India', description: 'Pristine beaches, water sports, beach shacks, and colonial Old Goa exploration.',
    itinerary: ['Day 1: Arrive Goa', 'Day 2: North Goa Beaches', 'Day 3: Water Sports', 'Day 4: Old Goa & Panjim', 'Day 5: Departure'],
    includes: ['Flights', 'Resort stay', 'Breakfast', 'Water sports', 'City tour'], discount: 25, trending: false,
  },
];
const ALL_PACKAGES = [...PACKAGES, ...extraPackages];

const EXCLUDES = [
  'Visa fees & travel insurance',
  'Personal expenses & shopping',
  'Tips & gratuities',
  'Optional excursions',
  'Meals not listed in itinerary',
];

const PHOTO_EXTRAS: Record<string, string[]> = {
  '1': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  ],
  '2': [
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  ],
  '3': [
    'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    'https://images.unsplash.com/photo-1582480787029-a4b51d8cec46?w=800&q=80',
  ],
};

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const pkg = ALL_PACKAGES.find((p) => p.id === id);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [activePhoto, setActivePhoto] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [rangeFrom, setRangeFrom] = useState<Date | null>(null);
  const [rangeTo, setRangeTo] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#f0fafb]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="text-6xl mb-4">🗺️</div>
          <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Package Not Found</h1>
          <p className="text-gray-500 mb-6">The package with ID <span className="font-mono">{id}</span> does not exist.</p>
          <Link to="/packages" className="px-6 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl">
            Back to Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const photos = [pkg.image, ...(PHOTO_EXTRAS[pkg.id] || [])];
  const vendor = VENDORS.find((v) => v.name === pkg.vendor) || null;
  const nights = rangeFrom && rangeTo ? Math.round(Math.abs(+rangeTo - +rangeFrom) / (1000 * 60 * 60 * 24)) : 0;
  const baseTotal = pkg.price * travelers;
  const taxes = Math.round(baseTotal * 0.1);
  const grandTotal = baseTotal + taxes;

  const wishlisted = isWishlisted(pkg.id);

  const handleWishlist = () => {
    toggleWishlist(pkg);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const reviews = TESTIMONIALS.filter((t) => t.package === pkg.title).length > 0
    ? TESTIMONIALS.filter((t) => t.package === pkg.title)
    : TESTIMONIALS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f0fafb]">
      <Navbar />
      <BookingWizard isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedPackage={pkg} />

      {/* HERO GALLERY */}
      <section className="pt-20 relative bg-[#003135]">
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[activePhoto]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={photos[activePhoto]}
              alt={pkg.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80'; }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/80 via-transparent to-[#003135]/30" />

          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() => setActivePhoto((a) => (a - 1 + photos.length) % photos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActivePhoto((a) => (a + 1) % photos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activePhoto ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {photos.slice(0, 4).map((ph, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`w-14 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                  i === activePhoto ? 'border-[#0FA4AF]' : 'border-white/30 hover:border-white/70'
                }`}
              >
                <img src={ph} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Badges */}
          <div className="absolute top-6 left-6 flex gap-2 flex-wrap">
            <Link to="/packages" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-sm text-white text-xs rounded-xl hover:bg-black/40 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All Packages
            </Link>
            {pkg.discount && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-[#964734] to-[#0FA4AF] text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                <Tag className="w-3 h-3" /> {pkg.discount}% OFF
              </span>
            )}
            {pkg.trending && (
              <span className="bg-[#003135]/80 border border-[#AFDDE5]/30 text-[#AFDDE5] text-xs font-bold px-3 py-1.5 rounded-xl">
                🔥 Trending
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              onClick={handleWishlist}
              className={`w-10 h-10 rounded-xl backdrop-blur-sm flex items-center justify-center transition-colors ${
                wishlisted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Hero info overlay */}
          <div className="absolute bottom-20 left-6 right-6 sm:right-64">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-[#AFDDE5]/20 border border-[#AFDDE5]/40 text-[#AFDDE5] px-2.5 py-1 rounded-full font-medium capitalize">{pkg.category}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white font-display leading-tight mb-2">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#AFDDE5]" />{pkg.destination}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#AFDDE5]" />{pkg.duration}</span>
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#AFDDE5]" />{pkg.vendor}</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{pkg.rating}</span>
                <span className="text-white/60">({pkg.reviews} reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN — Main content */}
            <div className="flex-1 space-y-8">

              {/* Overview */}
              <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 font-display mb-4">About This Package</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{pkg.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {[
                    { icon: <Clock className="w-5 h-5 text-[#0FA4AF]" />, label: 'Duration', value: pkg.duration },
                    { icon: <Users className="w-5 h-5 text-[#0FA4AF]" />, label: 'Group Size', value: 'Up to 12' },
                    { icon: <Globe className="w-5 h-5 text-[#0FA4AF]" />, label: 'Destination', value: pkg.destination },
                    { icon: <Star className="w-5 h-5 text-amber-400" />, label: 'Rating', value: `${pkg.rating} / 5.0` },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#f0fafb] rounded-xl p-4 border border-[#AFDDE5]/30 text-center">
                      <div className="flex justify-center mb-2">{item.icon}</div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">{item.label}</div>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 font-display mb-6">Day-by-Day Itinerary</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#0FA4AF] to-[#AFDDE5]/30" />
                  <div className="space-y-4">
                    {pkg.itinerary.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="flex gap-4 relative pl-1"
                      >
                        {/* Circle */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                          i === 0 ? 'bg-[#003135] text-white' :
                          i === pkg.itinerary.length - 1 ? 'bg-[#0FA4AF] text-white' :
                          'bg-[#AFDDE5]/50 text-[#003135] border border-[#AFDDE5]'
                        }`}>
                          {i + 1}
                        </div>
                        <div className={`flex-1 p-4 rounded-2xl border transition-all hover:shadow-sm ${
                          i === 0 ? 'bg-[#003135]/5 border-[#003135]/15' :
                          i === pkg.itinerary.length - 1 ? 'bg-[#0FA4AF]/10 border-[#AFDDE5]/50' :
                          'bg-[#f0fafb] border-[#AFDDE5]/30'
                        }`}>
                          <p className="text-sm text-gray-800 font-medium">{item}</p>
                          {i === 0 && <span className="text-[10px] text-[#003135] font-bold bg-[#003135]/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">Arrival Day</span>}
                          {i === pkg.itinerary.length - 1 && <span className="text-[10px] text-[#0FA4AF] font-bold bg-[#0FA4AF]/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">Departure Day</span>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Includes & Excludes */}
              <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 font-display mb-6">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-2 mb-4">
                      <CheckCircle className="w-4 h-4" /> Included
                    </h3>
                    <div className="space-y-3">
                      {pkg.includes.map((item) => (
                        <div key={item} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                          <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-red-500 flex items-center gap-2 mb-4">
                      <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">✕</span>
                      Not Included
                    </h3>
                    <div className="space-y-3">
                      {EXCLUDES.map((item) => (
                        <div key={item} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                          <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-red-400 text-xs font-bold">✕</span>
                          </div>
                          <span className="text-sm text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 font-display mb-2">Availability & Dates</h2>
                <p className="text-gray-400 text-sm mb-5">Select your preferred travel dates to see pricing.</p>
                <AvailabilityCalendar
                  basePrice={pkg.price}
                  onRangeChange={(from, to) => { setRangeFrom(from); setRangeTo(to); }}
                />
              </div>

              {/* Vendor Card */}
              {vendor && (
                <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 font-display mb-4">Your Travel Partner</h2>
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#AFDDE5]/40">
                        <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
                      </div>
                      {vendor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 font-display">{vendor.name}</h3>
                        {vendor.verified && <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">Verified</span>}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0FA4AF]" />{vendor.location}</span>
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{vendor.rating} ({vendor.reviews.toLocaleString()})</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">{vendor.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {vendor.specialties.map((s) => (
                          <span key={s} className="text-xs bg-[#AFDDE5]/30 text-[#024950] border border-[#AFDDE5]/50 px-2.5 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                    <Link to={`/vendors/${vendor.id}`} className="text-sm font-semibold text-[#0FA4AF] hover:text-[#003135] transition-colors shrink-0">
                      View Profile →
                    </Link>
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-display">Traveler Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-gray-900 text-lg">{pkg.rating}</span>
                    <span className="text-gray-400 text-sm">({pkg.reviews} reviews)</span>
                  </div>
                </div>
                {/* Rating bars */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {[5, 4, 3, 2, 1].map((s, i) => {
                    const pcts = [65, 22, 8, 3, 2];
                    return (
                      <div key={s} className="flex flex-col items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(s)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pcts[i]}%` }} />
                        </div>
                        <span className="text-[9px] text-gray-400">{pcts[i]}%</span>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex gap-4 p-4 bg-[#f0fafb] rounded-2xl border border-[#AFDDE5]/30">
                      <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border-2 border-[#AFDDE5]/30"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${r.name}&background=random`; }} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <span className="font-bold text-gray-900 text-sm">{r.name}</span>
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(5)].map((_, j) => <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}`} />)}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{r.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Sticky Book Now Sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Price Card */}
                <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#003135] to-[#024950] px-5 py-4">
                    <div className="flex items-end gap-2">
                      {pkg.originalPrice && (
                        <span className="text-[#AFDDE5]/60 text-sm line-through">${pkg.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="text-3xl font-bold text-white font-display">${pkg.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[#AFDDE5]/70 text-xs mt-0.5">per person · taxes not included</p>
                    {pkg.discount && (
                      <span className="inline-block mt-2 text-xs bg-[#964734] text-white px-2.5 py-0.5 rounded-full font-bold">Save {pkg.discount}%</span>
                    )}
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Travelers stepper */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> Travelers
                      </label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                          className="w-9 h-9 rounded-xl border border-[#AFDDE5] bg-[#f0fafb] flex items-center justify-center text-[#003135] font-bold hover:bg-[#AFDDE5]/30 transition-colors">
                          −
                        </button>
                        <span className="flex-1 text-center font-bold text-gray-900 text-lg">{travelers}</span>
                        <button onClick={() => setTravelers((t) => Math.min(12, t + 1))}
                          className="w-9 h-9 rounded-xl border border-[#AFDDE5] bg-[#f0fafb] flex items-center justify-center text-[#003135] font-bold hover:bg-[#AFDDE5]/30 transition-colors">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Date quick-pick */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Travel Date
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setRangeFrom(e.target.value ? new Date(e.target.value) : null)}
                        className="w-full px-3 py-2.5 bg-[#f0fafb] border border-[#AFDDE5]/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50"
                      />
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-[#f0fafb] rounded-xl p-4 border border-[#AFDDE5]/30 space-y-2.5 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>${pkg.price.toLocaleString()} × {travelers} {travelers === 1 ? 'person' : 'people'}</span>
                        <span className="font-medium">${baseTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Taxes & fees (10%)</span>
                        <span className="font-medium">${taxes.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-[#AFDDE5]/50 pt-2 flex justify-between font-bold">
                        <span className="text-[#003135]">Total</span>
                        <span className="text-[#964734] text-base">${grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingOpen(true)}
                      className="w-full py-4 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#0FA4AF]/25 transition-all flex items-center justify-center gap-2"
                    >
                      Book Now →
                    </button>

                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500" /> Secure checkout</span>
                      <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-[#0FA4AF]" /> Free cancellation</span>
                    </div>
                  </div>
                </div>

                {/* Wishlist & Share */}
                <div className="flex gap-3">
                  <button
                    onClick={handleWishlist}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all ${
                      wishlisted
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'bg-white border-[#AFDDE5] text-gray-600 hover:border-[#0FA4AF]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
                    {wishlisted ? 'Saved' : 'Wishlist'}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#AFDDE5] bg-white text-gray-600 font-semibold text-sm hover:border-[#0FA4AF] transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Share'}
                  </button>
                </div>

                {/* Trust badges */}
                <div className="bg-white rounded-2xl border border-[#AFDDE5]/30 p-4">
                  <p className="text-xs font-bold text-gray-700 mb-3">Why book with FingerTrip?</p>
                  <div className="space-y-2">
                    {[
                      { icon: '🔒', text: 'Secure payment processing' },
                      { icon: '✅', text: 'Verified tour operators' },
                      { icon: '🔄', text: 'Free cancellation (48h)' },
                      { icon: '💬', text: '24/7 traveler support' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
