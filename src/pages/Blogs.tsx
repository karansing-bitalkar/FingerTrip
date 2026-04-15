import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const posts = [
  {
    id: 1,
    title: '10 Hidden Gems in Bali That Most Tourists Miss',
    excerpt: "Beyond the crowds of Kuta and Ubud lies a Bali few travelers discover. We've spent weeks exploring hidden waterfalls, secret temples, and untouched beaches that will leave you speechless.",
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    category: 'Destinations',
    author: 'Priya Mehta',
    date: 'April 5, 2026',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'The Ultimate Switzerland Rail Pass Guide for 2026',
    excerpt: 'Everything you need to know about navigating Switzerland by train — passes, routes, and insider tips from seasoned Alpine travelers.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
    category: 'Travel Tips',
    author: 'James Wilson',
    date: 'April 2, 2026',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Kashmir in February: Snow, Silence, and Soul',
    excerpt: 'A personal account of spending Valentine\'s week on a Dal Lake houseboat with Gulmarg\'s fresh powder snow calling at dawn.',
    image: 'https://images.unsplash.com/photo-1566836610593-62a64888a216?w=600&q=80',
    category: 'Stories',
    author: 'Aryan Kapoor',
    date: 'March 28, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Dubai in 5 Days: The Perfect Luxury Itinerary',
    excerpt: 'From sunrise at Burj Khalifa to a private desert safari dinner — the definitive guide to experiencing Dubai at its most luxurious.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    category: 'Guides',
    author: 'Sarah Chen',
    date: 'March 22, 2026',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'How Wellness Travel Changed My Life: A Bali Retreat Story',
    excerpt: 'Seven days of yoga, meditation, and Balinese healing ceremonies transformed not just my body but my entire relationship with travel.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
    category: 'Wellness',
    author: 'Emma Williams',
    date: 'March 15, 2026',
    readTime: '9 min read',
    featured: false,
  },
];

export default function Blogs() {
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

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
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-display">Latest Articles</h2>
            <div className="flex gap-2">
              {['All', 'Destinations', 'Guides', 'Stories', 'Wellness'].map((cat) => (
                <button key={cat} className="px-3 py-1.5 text-xs rounded-lg font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-hover bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden cursor-pointer group">
                <div className="relative h-44 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 font-display">{post.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span className="text-orange-500 font-medium hover:underline flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
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
