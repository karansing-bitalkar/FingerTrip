import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Star, TrendingUp, LayoutGrid, Map, Package, DollarSign, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DestinationCard from '@/components/features/DestinationCard';
import StatCounter from '@/components/features/StatCounter';
import { DESTINATIONS } from '@/constants/data';
import { PACKAGES } from '@/constants/data';
import type { Destination } from '@/types';

const categories = ['All', 'Beach', 'Mountains', 'City', 'Culture', 'Adventure', 'Luxury', 'Nature'];

const allDestinations: Destination[] = [
  ...DESTINATIONS,
  {
    id: '7', name: 'Paris', country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    price: 2899, rating: 4.8, reviews: 7821, description: 'The City of Light — art, fashion, cuisine, and the iconic Eiffel Tower.', tags: ['City', 'Culture', 'Luxury'],
  },
  {
    id: '8', name: 'Santorini', country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
    price: 2499, rating: 4.9, reviews: 4512, description: 'Iconic white-domed churches, volcanic sunsets, and azure Aegean waters.', tags: ['Beach', 'Luxury', 'Romantic'],
  },
  {
    id: '9', name: 'Kyoto', country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    price: 3199, rating: 4.9, reviews: 3289, description: "Japan's ancient capital — thousand-year-old temples, geishas, and cherry blossoms.", tags: ['Culture', 'Nature', 'City'],
  },
  {
    id: '10', name: 'New Zealand', country: 'Oceania',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80',
    price: 3799, rating: 4.8, reviews: 2156, description: "Middle Earth's real backdrop — fjords, volcanoes, and world-class adventure sports.", tags: ['Adventure', 'Nature', 'Mountains'],
  },
  {
    id: '11', name: 'Machu Picchu', country: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80',
    price: 2699, rating: 4.9, reviews: 1923, description: 'The Lost City of the Incas — a UNESCO World Heritage wonder above the clouds.', tags: ['Adventure', 'Culture', 'Mountains'],
  },
  {
    id: '12', name: 'Safari Kenya', country: 'Africa',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
    price: 4199, rating: 4.9, reviews: 1432, description: 'The ultimate safari experience — witness the Great Migration in the Maasai Mara.', tags: ['Adventure', 'Nature', 'Luxury'],
  },
];

// Approximate SVG map coordinates for each destination (x%, y% of a 1000x500 viewBox)
const MAP_MARKERS: { id: string; name: string; country: string; cx: number; cy: number }[] = [
  { id: '1',  name: 'Bali',         country: 'Indonesia',  cx: 755, cy: 290 },
  { id: '2',  name: 'Switzerland',  country: 'Europe',     cx: 490, cy: 130 },
  { id: '3',  name: 'Kashmir',      country: 'India',      cx: 640, cy: 155 },
  { id: '4',  name: 'Dubai',        country: 'UAE',        cx: 570, cy: 195 },
  { id: '5',  name: 'Thailand',     country: 'SE Asia',    cx: 715, cy: 235 },
  { id: '6',  name: 'Goa',          country: 'India',      cx: 645, cy: 215 },
  { id: '7',  name: 'Paris',        country: 'France',     cx: 473, cy: 120 },
  { id: '8',  name: 'Santorini',    country: 'Greece',     cx: 515, cy: 150 },
  { id: '9',  name: 'Kyoto',        country: 'Japan',      cx: 795, cy: 155 },
  { id: '10', name: 'New Zealand',  country: 'Oceania',    cx: 880, cy: 380 },
  { id: '11', name: 'Machu Picchu', country: 'Peru',       cx: 235, cy: 295 },
  { id: '12', name: 'Safari Kenya', country: 'Africa',     cx: 540, cy: 290 },
];

// Compute per-destination stats from PACKAGES data
function getDestinationStats(destName: string) {
  const pkgs = PACKAGES.filter(p => p.destination.toLowerCase().includes(destName.toLowerCase()) || destName.toLowerCase().includes(p.destination.toLowerCase()));
  const count = pkgs.length || Math.floor(Math.random() * 5) + 1;
  const avgPrice = pkgs.length > 0 ? Math.round(pkgs.reduce((s, p) => s + p.price, 0) / pkgs.length) : 0;
  const topRating = pkgs.length > 0 ? Math.max(...pkgs.map(p => p.rating)) : 0;
  return { count, avgPrice, topRating };
}

const stats = [
  { value: 500, suffix: '+', label: 'Destinations' },
  { value: 80, suffix: '+', label: 'Countries' },
  { value: 1200, suffix: '+', label: 'Tour Packages' },
  { value: 150, suffix: 'K+', label: 'Travelers' },
];

type ViewMode = 'grid' | 'map';

interface TooltipData { id: string; name: string; country: string; price: number; rating: number; cx: number; cy: number }

export default function Destinations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = allDestinations.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || d.tags.includes(activeCategory);
    return matchSearch && matchCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const handleMarkerClick = (id: string) => {
    setHighlightedId(id);
    setViewMode('map');
    setTimeout(() => {
      const el = cardRefs.current[id];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    setTimeout(() => setHighlightedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-700/70 to-orange-700/90" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-orange-200 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <MapPin className="w-4 h-4" /> 500+ Destinations Worldwide
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white font-display mb-5">
              Discover Amazing<br /><span className="text-amber-300">Destinations</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              From hidden tropical paradises to towering Himalayan peaks — explore the world's most extraordinary places.
            </p>
            <div className="flex gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg"
                />
              </div>
              <button className="px-6 py-4 bg-white text-orange-600 font-semibold rounded-2xl shadow-lg hover:bg-orange-50 transition-colors flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filter
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-orange-50 border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-4">
          <StatCounter stats={stats} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters + View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${viewMode === 'map' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Map className="w-3.5 h-3.5" /> Map
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-6">{filtered.length} destinations found</p>

          {/* ─── GRID VIEW ─── */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' && (
              <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((dest, i) => (
                    <DestinationCard key={dest.id} destination={dest} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── MAP VIEW ─── */}
            {viewMode === 'map' && (
              <motion.div key="map" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                {/* SVG Interactive Map */}
                <div className="relative bg-white rounded-3xl border border-orange-100 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 font-display">Interactive World Map</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Hover markers for details · Click to jump to destination</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />Destination</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block animate-ping" />Trending</span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden" style={{ paddingBottom: '50%' }}>
                    <svg
                      viewBox="0 0 1000 500"
                      className="absolute inset-0 w-full h-full"
                      style={{ background: 'linear-gradient(180deg, #dbeafe 0%, #bfdbfe 40%, #93c5fd 100%)' }}
                    >
                      {/* Simplified world continents as filled paths */}
                      {/* North America */}
                      <path d="M60 80 L200 70 L240 90 L260 120 L250 160 L230 200 L210 230 L180 260 L160 280 L140 300 L120 310 L100 290 L80 260 L60 220 L50 180 L40 140 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Central America */}
                      <path d="M160 280 L190 295 L195 310 L180 320 L165 305 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* South America */}
                      <path d="M190 295 L240 285 L280 300 L295 330 L300 370 L290 420 L270 450 L240 460 L210 450 L195 420 L185 380 L185 340 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Europe */}
                      <path d="M430 80 L530 70 L550 90 L540 110 L560 120 L550 140 L520 150 L500 145 L480 155 L460 145 L440 130 L435 110 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Africa */}
                      <path d="M450 160 L560 155 L580 175 L590 210 L580 260 L570 310 L550 360 L520 400 L490 415 L460 400 L440 360 L430 310 L430 260 L440 200 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Middle East */}
                      <path d="M545 150 L610 145 L630 165 L625 195 L600 205 L575 200 L555 185 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Russia / Central Asia */}
                      <path d="M540 60 L800 50 L830 70 L820 100 L780 110 L740 105 L700 110 L660 105 L620 110 L580 105 L550 95 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* India Subcontinent */}
                      <path d="M610 155 L660 150 L680 170 L685 200 L680 235 L665 255 L650 255 L635 240 L620 215 L610 185 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* SE Asia */}
                      <path d="M690 175 L740 170 L760 185 L765 205 L755 225 L740 240 L725 240 L710 225 L700 205 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Bali / Indonesia island chain */}
                      <path d="M720 270 L780 260 L800 270 L790 285 L760 290 L730 285 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* China / East Asia */}
                      <path d="M680 110 L800 105 L830 115 L840 140 L820 165 L790 175 L760 170 L730 165 L705 160 L690 145 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Japan */}
                      <path d="M800 120 L820 115 L830 130 L820 145 L805 145 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* Australia */}
                      <path d="M800 310 L900 300 L940 320 L950 360 L940 400 L910 420 L870 425 L840 410 L820 385 L805 355 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>
                      {/* New Zealand */}
                      <path d="M920 360 L935 355 L945 370 L940 385 L928 385 Z" fill="#d4edda" stroke="#a8d5b5" strokeWidth="1" opacity="0.85"/>

                      {/* Grid lines */}
                      {[100, 200, 300, 400].map(y => (
                        <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#93c5fd" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 6" />
                      ))}
                      {[200, 400, 600, 800].map(x => (
                        <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#93c5fd" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 6" />
                      ))}

                      {/* Destination markers */}
                      {MAP_MARKERS.map((marker) => {
                        const dest = allDestinations.find(d => d.id === marker.id);
                        if (!dest) return null;
                        const isHovered = tooltip?.id === marker.id;
                        return (
                          <g key={marker.id} style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setTooltip({ id: marker.id, name: marker.name, country: marker.country, price: dest.price, rating: dest.rating, cx: marker.cx, cy: marker.cy })}
                            onMouseLeave={() => setTooltip(null)}
                            onClick={() => handleMarkerClick(marker.id)}
                          >
                            {/* Pulse ring */}
                            <circle cx={marker.cx} cy={marker.cy} r={isHovered ? 14 : 10} fill="#F97316" opacity={isHovered ? 0.25 : 0.15}>
                              <animate attributeName="r" values={`${isHovered ? 14 : 10};${isHovered ? 20 : 16};${isHovered ? 14 : 10}`} dur="2s" repeatCount="indefinite"/>
                              <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx={marker.cx} cy={marker.cy} r={isHovered ? 9 : 7} fill={isHovered ? '#ea580c' : '#F97316'} stroke="white" strokeWidth="2" />
                            <circle cx={marker.cx} cy={marker.cy} r="2.5" fill="white" />
                          </g>
                        );
                      })}

                      {/* Tooltip on map */}
                      {tooltip && (() => {
                        const tx = tooltip.cx > 800 ? tooltip.cx - 140 : tooltip.cx + 12;
                        const ty = tooltip.cy > 400 ? tooltip.cy - 75 : tooltip.cy - 10;
                        return (
                          <g>
                            <rect x={tx} y={ty} width="130" height="64" rx="8" fill="white" stroke="#fed7aa" strokeWidth="1.5" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.12))" />
                            <text x={tx + 10} y={ty + 18} fontSize="10" fontWeight="700" fill="#1f2937">{tooltip.name}</text>
                            <text x={tx + 10} y={ty + 30} fontSize="8" fill="#9ca3af">{tooltip.country}</text>
                            <text x={tx + 10} y={ty + 46} fontSize="9" fill="#ea580c" fontWeight="700">From ${tooltip.price.toLocaleString()}</text>
                            <text x={tx + 10} y={ty + 58} fontSize="8" fill="#f59e0b">★ {tooltip.rating}</text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="px-6 py-3 bg-orange-50/50 border-t border-orange-100 text-xs text-gray-400 text-center">
                    {MAP_MARKERS.length} destinations mapped · Click any marker to highlight its card below
                  </div>
                </div>

                {/* Country/Region Stat Cards grid */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-display mb-6">Destination Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((dest, i) => {
                      const pkgStats = getDestinationStats(dest.name);
                      const isHighlighted = highlightedId === dest.id;
                      return (
                        <motion.div
                          key={dest.id}
                          ref={(el) => { cardRefs.current[dest.id] = el; }}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                            isHighlighted ? 'border-orange-400 shadow-orange-200 shadow-lg scale-105' : 'border-orange-50'
                          }`}
                        >
                          {/* Image */}
                          <div className="relative h-32 overflow-hidden">
                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            {isHighlighted && (
                              <div className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                                📍 Selected
                              </div>
                            )}
                            <div className="absolute bottom-2 left-3">
                              <div className="text-white font-bold text-base font-display leading-tight">{dest.name}</div>
                              <div className="text-white/70 text-[10px]">{dest.country}</div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="p-4">
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <div className="text-center p-2 bg-orange-50 rounded-xl border border-orange-100">
                                <Package className="w-3.5 h-3.5 text-orange-500 mx-auto mb-0.5" />
                                <div className="text-sm font-bold text-gray-900">{pkgStats.count}</div>
                                <div className="text-[9px] text-gray-400">packages</div>
                              </div>
                              <div className="text-center p-2 bg-amber-50 rounded-xl border border-amber-100">
                                <DollarSign className="w-3.5 h-3.5 text-amber-600 mx-auto mb-0.5" />
                                <div className="text-sm font-bold text-gray-900">
                                  {pkgStats.avgPrice > 0 ? `$${(pkgStats.avgPrice / 1000).toFixed(1)}k` : `$${(dest.price / 1000).toFixed(1)}k`}
                                </div>
                                <div className="text-[9px] text-gray-400">avg price</div>
                              </div>
                              <div className="text-center p-2 bg-yellow-50 rounded-xl border border-yellow-100">
                                <Star className="w-3.5 h-3.5 text-yellow-500 mx-auto mb-0.5" />
                                <div className="text-sm font-bold text-gray-900">{pkgStats.topRating > 0 ? pkgStats.topRating : dest.rating}</div>
                                <div className="text-[9px] text-gray-400">top rating</div>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {dest.tags.slice(0, 2).map(t => (
                                <span key={t} className="text-[9px] bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full">{t}</span>
                              ))}
                            </div>

                            {/* CTA */}
                            <Link
                              to={`/packages?destination=${encodeURIComponent(dest.name)}`}
                              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-xl hover:shadow-md hover:shadow-orange-200 transition-all"
                            >
                              View Packages <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Travel Inspiration */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50/40 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-3">Trending This Season</h2>
            <p className="text-gray-500">Destinations our travelers are buzzing about right now</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', trend: '+42%' },
              { name: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', trend: '+38%' },
              { name: 'Switzerland', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80', trend: '+29%' },
              { name: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80', trend: '+55%' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover relative h-44 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-bold text-lg font-display">{item.name}</div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <TrendingUp className="w-3 h-3" /> {item.trend} searches
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
