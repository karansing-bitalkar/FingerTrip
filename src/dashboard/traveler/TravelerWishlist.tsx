import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Star, Trash2, Share2, Check, Copy, ExternalLink, DollarSign, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PACKAGES } from '@/constants/data';
import { useWishlist } from '@/hooks/useWishlist';
import BookingWizard from '@/components/features/BookingWizard';
import Popup from '@/components/features/Popup';
import { toast } from 'sonner';
import type { Package as TPackage } from '@/types';

export default function TravelerWishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TPackage | null>(null);
  const [bookingPkg, setBookingPkg] = useState<TPackage | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const totalValue = wishlist.reduce((sum, p) => sum + p.price, 0);

  const handleRemove = (pkg: TPackage) => { setSelectedItem(pkg); setDeletePopup(true); };
  const confirmRemove = () => {
    if (!selectedItem) return;
    removeFromWishlist(selectedItem.id);
    setDeletePopup(false);
    toast.success(`"${selectedItem.title}" removed from wishlist.`);
  };

  const handleBook = (pkg: TPackage) => {
    setBookingPkg(pkg);
    setBookingOpen(true);
  };

  const handleShareWishlist = () => {
    const ids = wishlist.map((p) => p.id).join(',');
    const url = `${window.location.origin}/packages?wishlist=${ids}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    toast.success('Wishlist link copied! Share it with friends.');
    setTimeout(() => setShareCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      <BookingWizard isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedPackage={bookingPkg || undefined} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">My Wishlist</h1>
          <p className="text-gray-500 mt-1">
            {wishlist.length === 0 ? 'No packages saved yet' : `${wishlist.length} package${wishlist.length > 1 ? 's' : ''} saved`}
          </p>
        </div>
        {wishlist.length > 0 && (
          <div className="flex items-center gap-3">
            {/* Total Value */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase">Estimated Value</div>
                <div className="text-sm font-bold text-amber-700">${totalValue.toLocaleString()}</div>
              </div>
            </div>
            {/* Share Button */}
            <button
              onClick={handleShareWishlist}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              {shareCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {shareCopied ? 'Link Copied!' : 'Share Wishlist'}
            </button>
          </div>
        )}
      </div>

      {/* Add packages hint */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-orange-50">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <Heart className="w-16 h-16 text-red-200 mx-auto mb-4" />
          </motion.div>
          <h3 className="font-bold text-gray-700 font-display text-xl mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-400 text-sm mb-6">Browse packages and tap the ♡ heart button to save your favorites here.</p>
          <Link to="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
            <Package className="w-4 h-4" /> Browse Packages
          </Link>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlist.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(pkg)}
                    className="absolute top-3 right-3 w-9 h-9 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors shadow-md"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {pkg.discount && (
                    <span className="absolute top-3 left-3 text-[10px] bg-[#964734] text-white font-bold px-2 py-0.5 rounded-full">
                      {pkg.discount}% OFF
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {pkg.destination}
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-white text-xs font-semibold">{pkg.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-[#0FA4AF] font-medium mb-1">{pkg.vendor}</p>
                  <h3 className="font-bold text-gray-900 font-display text-sm mb-1 line-clamp-1">{pkg.title}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-1">{pkg.duration} · {pkg.category}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      {pkg.originalPrice && (
                        <span className="text-xs text-gray-400 line-through block">${pkg.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="text-xl font-bold text-[#964734]">${pkg.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 ml-1">/ person</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="w-9 h-9 rounded-xl bg-[#f0fafb] border border-[#AFDDE5] flex items-center justify-center text-[#0FA4AF] hover:bg-[#AFDDE5]/40 transition-colors"
                        title="View details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleBook(pkg)}
                        className="px-4 py-2 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-xs font-semibold rounded-xl hover:shadow-md transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Quick add from catalog */}
      {wishlist.length > 0 && wishlist.length < PACKAGES.length && (
        <div className="bg-white rounded-2xl border border-orange-50 p-5">
          <h3 className="font-bold text-gray-900 font-display mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-500" /> You Might Also Like
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {PACKAGES.filter((p) => !wishlist.find((w) => w.id === p.id)).slice(0, 4).map((pkg) => (
              <div key={pkg.id} className="shrink-0 w-48 bg-[#f0fafb] rounded-xl border border-[#AFDDE5]/30 overflow-hidden">
                <div className="h-24 overflow-hidden relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-900 line-clamp-1 mb-0.5">{pkg.title}</p>
                  <p className="text-xs font-bold text-[#964734] mb-2">${pkg.price.toLocaleString()}</p>
                  <Link to={`/packages/${pkg.id}`}
                    className="text-[10px] text-[#0FA4AF] font-semibold hover:text-[#003135] transition-colors">
                    View Package →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Popup
        isOpen={deletePopup}
        onClose={() => setDeletePopup(false)}
        type="confirm"
        title="Remove from Wishlist?"
        message={`Remove "${selectedItem?.title}" from your wishlist?`}
        onConfirm={confirmRemove}
        confirmLabel="Remove"
      />
    </div>
  );
}
