import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, Star, Check, ChevronRight, BookOpen } from 'lucide-react';
import { useCompare } from '@/hooks/useCompare';
import BookingWizard from '@/components/features/BookingWizard';
import { getStoredUser } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Package } from '@/types';

function getBestIdx(packages: Package[]): number {
  if (!packages.length) return 0;
  let best = 0;
  packages.forEach((p, i) => {
    const score = p.rating * 10 - p.price / 100 + (p.discount || 0) * 0.5;
    const bestScore = packages[best].rating * 10 - packages[best].price / 100 + (packages[best].discount || 0) * 0.5;
    if (score > bestScore) best = i;
  });
  return best;
}

interface TableRow {
  label: string;
  key: keyof Package | 'itineraryDays' | 'includes' | 'vendorRating';
  render?: (pkg: Package) => React.ReactNode;
}

const TABLE_ROWS: TableRow[] = [
  {
    label: 'Price',
    key: 'price',
    render: (pkg) => (
      <div>
        <div className="font-bold text-[#964734] text-lg">${pkg.price.toLocaleString()}</div>
        {pkg.originalPrice && <div className="text-xs text-gray-400 line-through">${pkg.originalPrice.toLocaleString()}</div>}
        <div className="text-[10px] text-gray-400">per person</div>
      </div>
    ),
  },
  {
    label: 'Duration',
    key: 'duration',
    render: (pkg) => <span className="font-semibold text-gray-800 text-sm">{pkg.duration}</span>,
  },
  {
    label: 'Rating',
    key: 'rating',
    render: (pkg) => (
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(pkg.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />)}
        </div>
        <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
        <span className="text-xs text-gray-400">({pkg.reviews})</span>
      </div>
    ),
  },
  {
    label: 'Itinerary Days',
    key: 'itineraryDays',
    render: (pkg) => (
      <div className="space-y-0.5">
        {pkg.itinerary.slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0FA4AF] shrink-0 mt-1.5" />
            <span className="line-clamp-1">{item}</span>
          </div>
        ))}
        {pkg.itinerary.length > 3 && <div className="text-xs text-[#0FA4AF] font-medium">+{pkg.itinerary.length - 3} more</div>}
      </div>
    ),
  },
  {
    label: 'Includes',
    key: 'includes',
    render: (pkg) => (
      <div className="space-y-0.5">
        {(pkg.includes || []).slice(0, 4).map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
            <Check className="w-3 h-3 text-emerald-500 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Discount',
    key: 'discount',
    render: (pkg) => pkg.discount
      ? <span className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-xl">{pkg.discount}% OFF</span>
      : <span className="text-xs text-gray-400">—</span>,
  },
  {
    label: 'Category',
    key: 'category',
    render: (pkg) => <span className="text-xs font-semibold text-[#024950] bg-[#AFDDE5]/30 px-2.5 py-1 rounded-full">{pkg.category || '—'}</span>,
  },
  {
    label: 'Trending',
    key: 'trending',
    render: (pkg) => pkg.trending
      ? <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">🔥 Trending</span>
      : <span className="text-xs text-gray-400">—</span>,
  },
];

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);
  const navigate = useNavigate();
  const bestIdx = getBestIdx(compareList);

  const handleBookBest = (pkg: Package) => {
    const user = getStoredUser();
    if (!user) { toast.error('Please log in to book.'); navigate('/login'); return; }
    setBookingPkg(pkg);
  };

  if (compareList.length < 1) return null;

  return (
    <>
      {/* Sticky bottom bar */}
      <AnimatePresence>
        {compareList.length >= 1 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[55] bg-white border-t-2 border-[#0FA4AF] shadow-2xl shadow-[#003135]/20"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <GitCompare className="w-5 h-5 text-[#0FA4AF]" />
                <span className="font-bold text-[#003135] text-sm">{compareList.length}/3 packages</span>
              </div>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                {compareList.map((pkg) => (
                  <div key={pkg.id} className="flex items-center gap-2 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl px-3 py-2 shrink-0">
                    <img src={pkg.image} alt={pkg.title} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-semibold text-[#003135] max-w-[100px] truncate">{pkg.title}</div>
                      <div className="text-xs text-[#964734] font-bold">${pkg.price.toLocaleString()}</div>
                    </div>
                    <button onClick={() => removeFromCompare(pkg.id)} className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ml-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {[...Array(3 - compareList.length)].map((_, i) => (
                  <div key={i} className="w-36 h-12 border-2 border-dashed border-[#AFDDE5] rounded-xl flex items-center justify-center text-xs text-gray-400 shrink-0">
                    + Add package
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={clearCompare} className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  Clear
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  disabled={compareList.length < 2}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-sm font-bold rounded-xl disabled:opacity-40 hover:shadow-lg transition-all"
                >
                  <GitCompare className="w-4 h-4" /> Compare Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#003135] to-[#024950] px-7 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitCompare className="w-6 h-6 text-[#AFDDE5]" />
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">Package Comparison</h2>
                    <p className="text-[#AFDDE5]/70 text-sm">Side-by-side breakdown</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  {/* Package headers */}
                  <thead>
                    <tr>
                      <th className="w-32 bg-gray-50 border-b border-gray-100 px-5 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Feature</th>
                      {compareList.map((pkg, i) => (
                        <th key={pkg.id} className={`border-b border-gray-100 px-5 py-4 text-center relative ${i === bestIdx ? 'bg-[#AFDDE5]/20' : 'bg-white'}`}>
                          {i === bestIdx && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#0FA4AF] to-[#003135] text-white text-[10px] font-bold py-1 text-center">
                              ⭐ Best Value
                            </div>
                          )}
                          <div className={`${i === bestIdx ? 'pt-4' : ''}`}>
                            <img src={pkg.image} alt={pkg.title} className="w-full h-28 object-cover rounded-xl mb-3"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80'; }} />
                            <div className="font-bold text-[#003135] text-sm font-display line-clamp-1">{pkg.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{pkg.destination}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {/* Comparison rows */}
                  <tbody className="divide-y divide-gray-50">
                    {TABLE_ROWS.map((row) => (
                      <tr key={row.label} className="hover:bg-gray-50/50">
                        <td className="px-5 py-4 bg-gray-50 border-r border-gray-100">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{row.label}</span>
                        </td>
                        {compareList.map((pkg, i) => (
                          <td key={pkg.id} className={`px-5 py-4 text-center ${i === bestIdx ? 'bg-[#AFDDE5]/10' : ''}`}>
                            {row.render ? row.render(pkg) : <span className="text-sm text-gray-700">{String(pkg[row.key as keyof Package] ?? '—')}</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* CTA row */}
                    <tr className="border-t-2 border-[#AFDDE5]">
                      <td className="px-5 py-5 bg-gray-50" />
                      {compareList.map((pkg, i) => (
                        <td key={pkg.id} className={`px-5 py-5 text-center ${i === bestIdx ? 'bg-[#AFDDE5]/10' : ''}`}>
                          <button
                            onClick={() => handleBookBest(pkg)}
                            className={`w-full flex items-center justify-center gap-2 py-3 font-bold text-sm rounded-xl transition-all ${
                              i === bestIdx
                                ? 'bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white shadow-lg shadow-[#0FA4AF]/25 hover:shadow-xl'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {i === bestIdx && <Star className="w-4 h-4 fill-white" />}
                            {i === bestIdx ? 'Book Best' : 'Book Now'}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-7 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                  Best Value is determined by rating, price, and discount score
                </p>
                <button onClick={() => setModalOpen(false)} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Wizard for best pick */}
      {bookingPkg && (
        <BookingWizard isOpen={!!bookingPkg} onClose={() => setBookingPkg(null)} preselectedPackage={bookingPkg} />
      )}
    </>
  );
}
