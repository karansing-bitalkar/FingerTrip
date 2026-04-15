import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DestinationCard from '@/components/features/DestinationCard';
import StatCounter from '@/components/features/StatCounter';
import { DESTINATIONS } from '@/constants/data';
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

const stats = [
  { value: 500, suffix: '+', label: 'Destinations' },
  { value: 80, suffix: '+', label: 'Countries' },
  { value: 1200, suffix: '+', label: 'Tour Packages' },
  { value: 150, suffix: 'K+', label: 'Travelers' },
];

export default function Destinations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

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
            {/* Search */}
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
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
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
          </div>

          <p className="text-gray-500 text-sm mb-6">{filtered.length} destinations found</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
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
