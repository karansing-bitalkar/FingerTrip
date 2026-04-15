import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const posts = [
  { id: 1, title: '10 Hidden Gems in Bali That Most Tourists Miss', excerpt: "Beyond the crowds of Kuta and Ubud lies a Bali few travelers discover. We've spent weeks exploring hidden waterfalls, secret temples, and untouched beaches.", image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', category: 'Destinations', author: 'Priya Mehta', date: 'April 5, 2026', readTime: '8 min read', featured: true },
  { id: 2, title: 'The Ultimate Switzerland Rail Pass Guide for 2026', excerpt: 'Everything you need to know about navigating Switzerland by train — passes, routes, and insider tips from seasoned Alpine travelers.', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', category: 'Travel Tips', author: 'James Wilson', date: 'April 2, 2026', readTime: '12 min read', featured: false },
  { id: 3, title: "Kashmir in February: Snow, Silence, and Soul", excerpt: "A personal account of spending Valentine's week on a Dal Lake houseboat with Gulmarg's fresh powder snow calling at dawn.", image: 'https://images.unsplash.com/photo-1566836610593-62a64888a216?w=600&q=80', category: 'Stories', author: 'Aryan Kapoor', date: 'March 28, 2026', readTime: '6 min read', featured: false },
  { id: 4, title: 'Dubai in 5 Days: The Perfect Luxury Itinerary', excerpt: 'From sunrise at Burj Khalifa to a private desert safari dinner — the definitive guide to experiencing Dubai at its most luxurious.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', category: 'Guides', author: 'Sarah Chen', date: 'March 22, 2026', readTime: '10 min read', featured: false },
  { id: 5, title: 'How Wellness Travel Changed My Life: A Bali Retreat Story', excerpt: 'Seven days of yoga, meditation, and Balinese healing ceremonies transformed not just my body but my entire relationship with travel.', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80', category: 'Wellness', author: 'Emma Williams', date: 'March 15, 2026', readTime: '9 min read', featured: false },
  { id: 6, title: '5 Budget Travel Hacks That Will Change Your Trip', excerpt: 'Save hundreds on your next trip with these proven strategies — from flight booking timing to hidden accommodation gems.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80', category: 'Travel Tips', author: 'Tom Bradley', date: 'March 10, 2026', readTime: '7 min read', featured: false },
  { id: 7, title: 'The Street Food Guide to Southeast Asia', excerpt: "From Bangkok pad thai to Vietnamese pho — a culinary journey through the region's most iconic dishes and where to find them.", image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80', category: 'Guides', author: 'Mei Lin', date: 'March 5, 2026', readTime: '11 min read', featured: false },
];

const CATEGORIES = ['All', 'Destinations', 'Guides', 'Stories', 'Wellness', 'Travel Tips'];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const featured = posts.find(p => p.featured)!;
  const restAll = posts.filter(p => !p.featured);

  const filteredRest = activeCategory === 'All' ? restAll : restAll.filter(p => p.category === activeCategory);

  // Count per category
  const categoryCounts: Record<string, number> = { All: posts.length };
  CATEGORIES.slice(1).forEach(cat => {
    categoryCounts[cat] = posts.filter(p => p.category === cat).length;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 font-display mb-4">FingerTrip <span className="text-gradient">Journal</span></h1>
            <p className="text-gray-500 text-lg">Stories, guides, and inspiration for your next adventure</p>
          </motion.div>

          {/* Featured Post */}
          <Link to={`/blogs/${featured.id}`}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="card-hover relative h-80 lg:h-96 rounded-3xl overflow-hidden cursor-pointer group">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">✨ Featured</span>
                <h2 className="text-3xl font-bold text-white font-display mb-3 max-w-2xl">{featured.title}</h2>
                <p className="text-white/80 text-sm max-w-xl mb-4 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-white/70 text-xs">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{featured.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Category Filter Bar */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-900 font-display">Latest Articles</h2>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                      : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  {cat}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === cat ? 'bg-white/25 text-white' : 'bg-orange-100 text-orange-500'
                  }`}>
                    {categoryCounts[cat] || 0}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredRest.map((post, i) => (
                <Link key={post.id} to={`/blogs/${post.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="card-hover bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden cursor-pointer group h-full flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 font-display group-hover:text-orange-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        <span className="text-orange-500 font-medium hover:underline flex items-center gap-1">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}

              {filteredRest.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 font-medium">No articles in this category yet.</p>
                  <button onClick={() => setActiveCategory('All')} className="mt-3 text-orange-500 text-sm font-semibold hover:underline flex items-center gap-1 mx-auto">
                    <X className="w-4 h-4" /> Clear filter
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
}
