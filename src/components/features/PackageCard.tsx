import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, Tag, Building2, Share2, Copy, Check, Heart } from 'lucide-react';
import BookingWizard from '@/components/features/BookingWizard';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';
import type { Package } from '@/types';

interface Props {
  pkg: Package;
  index?: number;
}

export default function PackageCard({ pkg, index = 0 }: Props) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(pkg.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(pkg);
    toast.success(isWishlisted(pkg.id) ? 'Removed from wishlist' : `Added to wishlist!`);
  };

  const shareText = `Check out ${pkg.title} — ${pkg.duration} from $${pkg.price.toLocaleString()}/person on FingerTrip! ✈️`;
  const shareUrl = `${window.location.origin}/packages`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <>
      <BookingWizard isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedPackage={pkg} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card-hover group bg-white rounded-2xl overflow-hidden shadow-md border border-[#AFDDE5]/30"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Discount Badge */}
          {pkg.discount && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#964734] to-[#0FA4AF] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {pkg.discount}% OFF
            </div>
          )}
          {pkg.trending && (
            <div className="absolute top-3 right-3 bg-[#003135]/80 border border-[#AFDDE5]/30 text-[#AFDDE5] text-xs font-bold px-3 py-1 rounded-full">
              🔥 Trending
            </div>
          )}

          {/* Wishlist heart */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md transition-all duration-200 ${
              wishlisted ? 'bg-red-500 scale-110' : 'bg-white/20 hover:bg-white/40'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 transition-all ${wishlisted ? 'text-white fill-white' : 'text-white'}`} />
          </button>

          {/* Duration on image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
            <Clock className="w-4 h-4 text-[#AFDDE5]" />
            {pkg.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Vendor */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#0FA4AF]" />
            <span className="text-[#024950] font-medium">{pkg.vendor}</span>
          </div>

          <Link to={`/packages/${pkg.id}`} className="hover:text-[#0FA4AF] transition-colors">
          <h3 className="text-lg font-bold text-[#003135] font-display mb-1.5 line-clamp-1">{pkg.title}</h3>
        </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(pkg.rating) ? 'text-[#964734] fill-[#964734]' : 'text-gray-200 fill-gray-200'}`} />
            ))}
            <span className="text-sm font-semibold text-gray-700">{pkg.rating}</span>
            <span className="text-xs text-gray-400">({pkg.reviews} reviews)</span>
          </div>

          {/* Itinerary Preview */}
          <div className="bg-[#AFDDE5]/20 rounded-xl p-3 mb-4 border border-[#AFDDE5]/40">
            <p className="text-xs font-semibold text-[#024950] mb-1.5">Itinerary Highlights</p>
            <div className="space-y-1">
              {pkg.itinerary.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0FA4AF] shrink-0" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
              {pkg.itinerary.length > 3 && (
                <p className="text-xs text-[#0FA4AF] font-medium">+{pkg.itinerary.length - 3} more days</p>
              )}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              {pkg.originalPrice && (
                <span className="text-xs text-gray-400 line-through">${pkg.originalPrice.toLocaleString()}</span>
              )}
              <div className="text-xl font-bold text-[#964734]">${pkg.price.toLocaleString()}</div>
              <span className="text-xs text-gray-400">per person</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Share button */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="w-9 h-9 rounded-xl bg-[#f0fafb] border border-[#AFDDE5] flex items-center justify-center text-[#0FA4AF] hover:bg-[#AFDDE5]/40 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {shareOpen && (
                  <div className="absolute right-0 bottom-11 w-48 bg-white rounded-2xl shadow-xl border border-[#AFDDE5]/50 overflow-hidden z-20">
                    <div className="p-1.5 space-y-0.5">
                      <button onClick={handleCopy} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] transition-colors">
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={handleWhatsApp} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </button>
                      <button onClick={handleTwitter} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.844L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        Twitter / X
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to={`/packages/${pkg.id}`}
                className="px-4 py-2.5 bg-[#f0fafb] border border-[#AFDDE5] text-[#003135] text-xs font-semibold rounded-xl hover:border-[#0FA4AF] transition-all hidden sm:flex items-center"
              >
                Details
              </Link>
              <button
                onClick={() => setBookingOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0FA4AF]/25 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
