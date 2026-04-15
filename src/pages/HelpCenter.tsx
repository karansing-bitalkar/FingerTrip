import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, Book, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const categories = [
  { title: 'Getting Started', icon: '🚀', count: 12, desc: 'How to create account, login, and book your first trip' },
  { title: 'Bookings', icon: '📅', count: 18, desc: 'Managing reservations, changes, and cancellations' },
  { title: 'Payments', icon: '💳', count: 9, desc: 'Payment methods, invoices, and refund processing' },
  { title: 'Vendors', icon: '🏢', count: 14, desc: 'Partner registration, package management, and payouts' },
  { title: 'Destinations', icon: '🗺️', count: 22, desc: 'Visa information, travel advisories, and local tips' },
  { title: 'Account', icon: '👤', count: 11, desc: 'Profile, privacy settings, and notification preferences' },
];

const topArticles = [
  'How to book a package on FingerTrip',
  'Understanding the cancellation policy',
  'How to add travelers to a booking',
  'Vendor registration guide',
  'Setting up payment methods',
  'Requesting a refund step-by-step',
  'How to write a review',
  'Changing or upgrading your package',
];

export default function HelpCenter() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'How do I book a travel package?', a: 'Browse packages at fingertrip.com/packages, select your preferred package, click "Book Now", fill in traveler details, choose payment method, and confirm. You will receive a confirmation email immediately.' },
    { q: 'Can I cancel my booking?', a: 'Yes. Go to My Bookings → select booking → click Cancel. Refunds are processed per our cancellation policy: full refund if 30+ days before travel, 75% at 15-29 days, 50% at 7-14 days.' },
    { q: 'How do I become a vendor?', a: 'Click "Get Started" → select "Vendor" → complete registration → submit company details and license. Our team verifies within 48 hours and you can start listing packages.' },
    { q: 'When will I receive my refund?', a: 'After cancellation approval, refunds are processed within 5-7 business days and appear in your original payment method within 10 business days total.' },
    { q: 'How are vendors verified?', a: "Every vendor undergoes license verification, background check, quality audit, and insurance confirmation. We also review 12 months of business history before granting 'Verified' status." },
    { q: 'Is my payment information secure?', a: 'Absolutely. We use 256-bit SSL encryption, PCI-DSS compliant payment processing, and never store card details on our servers. All transactions are tokenized for maximum security.' },
  ];

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-orange-600 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <HelpCircle className="w-14 h-14 text-white/80 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white font-display mb-4">How Can We Help?</h1>
          <p className="text-white/80 text-lg mb-8">Search our knowledge base or browse categories below</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search help articles..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-xl text-lg" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {categories.map((cat, i) => (
              <motion.button key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-hover text-left p-5 bg-white rounded-2xl border border-orange-50 shadow-sm hover:border-orange-200 transition-all">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{cat.desc}</p>
                <p className="text-orange-500 text-xs font-medium">{cat.count} articles</p>
              </motion.button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {filtered.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-orange-50/50 transition-colors">
                      <span className="font-medium text-gray-900">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-orange-500 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">Popular Articles</h2>
              <div className="space-y-2">
                {topArticles.map((article, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-orange-50 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer">
                    <Book className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-sm text-gray-700">{article}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-gray-900 mb-3">Still need help?</h3>
                <p className="text-gray-500 text-sm mb-4">Our support team is available 24/7 to assist you.</p>
                <div className="flex gap-3">
                  <Link to="/contact" className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
                    <MessageCircle className="w-4 h-4" /> Contact Us
                  </Link>
                  <a href="tel:+18003464378" className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4" /> Call Us
                  </a>
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
