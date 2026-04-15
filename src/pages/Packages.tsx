import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, Star, X, ChevronUp, ChevronDown, Calendar, Users, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/features/PackageCard';
import CompareBar from '@/components/features/CompareBar';
import { PACKAGES } from '@/constants/data';
import type { Package } from '@/types';

const categories = ['All', 'Luxury', 'Adventure', 'Wellness', 'Nature', 'City'];
const durations = ['All', '1-5 Days', '6-10 Days', '11-15 Days', '15+ Days'];

const COUNTRIES = [
  'All Destinations', 'Maldives', 'Switzerland', 'Kashmir', 'Dubai', 'Bali',
  'Thailand', 'France', 'Goa', 'Japan', 'Italy', 'Greece', 'Australia',
];

const extraPackages: Package[] = [
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

const allPackages = [...PACKAGES, ...extraPackages];

export default function Packages() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [duration, setDuration] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('trending');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [destination, setDestination] = useState('All Destinations');
  const [travelers, setTravelers] = useState(1);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const hasActiveFilters = search || category !== 'All' || maxPrice < 10000 || dateFrom || dateTo || destination !== 'All Destinations' || travelers > 1 || duration !== 'All';

  const clearAllFilters = () => {
    setPage(1);
    setSearch('');
    setCategory('All');
    setDuration('All');
    setMaxPrice(10000);
    setSortBy('trending');
    setDateFrom('');
    setDateTo('');
    setDestination('All Destinations');
    setTravelers(1);
  };

  const allFiltered = allPackages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    const matchPrice = p.price <= maxPrice;
    const matchDest = destination === 'All Destinations' || p.destination.toLowerCase().includes(destination.toLowerCase());
    return matchSearch && matchCat && matchPrice && matchDest;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
    return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
  });

  const totalPages = Math.ceil(allFiltered.length / ITEMS_PER_PAGE);
  const filtered = allFiltered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-orange-200 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              🔥 1,200+ Curated Packages
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white font-display mb-5">
              Premium Travel<br /><span className="text-amber-300">Packages</span>
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Handcrafted journeys for every type of traveler — luxury, adventure, wellness, and culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-orange-500" /> Filters
                  </h3>
                  {hasActiveFilters && (
                    <button onClick={clearAllFilters}
                      className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:text-orange-700 transition-colors">
                      <X className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Package name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                          category === cat ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Max Price: <span className="text-orange-600">${maxPrice.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$500</span>
                    <span>$10,000</span>
                  </div>
                </div>

                {/* Destination Country */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2.5 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Travel Dates
                  </label>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-gray-400 mb-1 block">From</span>
                      <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full px-3 py-2.5 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 mb-1 block">To</span>
                      <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                        className="w-full px-3 py-2.5 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    </div>
                  </div>
                </div>

                {/* Traveler Count */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Travelers
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                      className="w-9 h-9 rounded-xl border border-orange-200 bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-bold text-gray-900 text-lg">{travelers}</span>
                    <button
                      onClick={() => setTravelers((t) => Math.min(20, t + 1))}
                      className="w-9 h-9 rounded-xl border border-orange-200 bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 text-center">{travelers} {travelers === 1 ? 'traveler' : 'travelers'} selected</p>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="trending">Trending</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="discount">Best Discount</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Package Grid */}
            <div className="flex-1">
              {/* Active Filter Chips */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {search && (
                      <span className="flex items-center gap-1.5 text-xs bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 font-medium">
                        🔍 "{search}"
                        <button onClick={() => setSearch('')} className="hover:text-orange-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {category !== 'All' && (
                      <span className="flex items-center gap-1.5 text-xs bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 font-medium">
                        📂 {category}
                        <button onClick={() => setCategory('All')} className="hover:text-orange-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {destination !== 'All Destinations' && (
                      <span className="flex items-center gap-1.5 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 font-medium">
                        🌍 {destination}
                        <button onClick={() => setDestination('All Destinations')} className="hover:text-blue-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {maxPrice < 10000 && (
                      <span className="flex items-center gap-1.5 text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
                        💵 Max ${maxPrice.toLocaleString()}
                        <button onClick={() => setMaxPrice(10000)} className="hover:text-emerald-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {dateFrom && (
                      <span className="flex items-center gap-1.5 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 font-medium">
                        📅 From {dateFrom}
                        <button onClick={() => setDateFrom('')} className="hover:text-purple-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {dateTo && (
                      <span className="flex items-center gap-1.5 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 font-medium">
                        📅 To {dateTo}
                        <button onClick={() => setDateTo('')} className="hover:text-purple-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    {travelers > 1 && (
                      <span className="flex items-center gap-1.5 text-xs bg-teal-100 text-teal-700 px-3 py-1.5 rounded-full border border-teal-200 font-medium">
                        👥 {travelers} travelers
                        <button onClick={() => setTravelers(1)} className="hover:text-teal-900"><X className="w-3 h-3" /></button>
                      </span>
                    )}
                    <button onClick={clearAllFilters}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 transition-colors">
                      <X className="w-3 h-3" /> Clear all
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{allFiltered.length} packages found</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  All packages are verified & rated
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-700 font-display mb-2">No packages found</h3>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-orange-200 text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 disabled:opacity-40 transition-colors">
                    ← Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        page === i + 1 ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-white border border-orange-100 text-gray-600 hover:bg-orange-50'
                      }`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-orange-200 text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 disabled:opacity-40 transition-colors">
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CompareBar />
      <Footer />
    </div>
  );
}
