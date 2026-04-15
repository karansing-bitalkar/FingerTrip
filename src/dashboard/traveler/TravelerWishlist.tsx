import { useState } from 'react';
import { Heart, MapPin, Star, Trash2, ShoppingCart } from 'lucide-react';
import { DESTINATIONS } from '@/constants/data';
import Popup from '@/components/features/Popup';
import type { Destination } from '@/types';

export default function TravelerWishlist() {
  const [wishlist, setWishlist] = useState<Destination[]>(DESTINATIONS.slice(0, 4));
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Destination | null>(null);
  const [successPopup, setSuccessPopup] = useState(false);

  const handleRemove = (item: Destination) => { setSelectedItem(item); setDeletePopup(true); };
  const confirmRemove = () => { if (!selectedItem) return; setWishlist((prev) => prev.filter((d) => d.id !== selectedItem.id)); setSuccessPopup(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">My Wishlist</h1>
          <p className="text-gray-500 mt-1">{wishlist.length} destinations saved</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-orange-50">
          <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-gray-700 font-display text-xl">Your wishlist is empty</h3>
          <p className="text-gray-400 mt-2">Explore destinations and save your favorites</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-44 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button onClick={() => handleRemove(dest)}
                  className="absolute top-3 right-3 w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-md">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
                  <MapPin className="w-3.5 h-3.5" /> {dest.country}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 font-display">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-gray-700">{dest.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{dest.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-orange-600 font-bold text-lg">${dest.price.toLocaleString()}</div>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded-xl hover:shadow-md transition-all">
                    <ShoppingCart className="w-3.5 h-3.5" /> Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Remove from Wishlist?" message={`Remove "${selectedItem?.name}" from your wishlist?`}
        onConfirm={confirmRemove} confirmLabel="Remove" />
      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Removed" message="Destination removed from your wishlist." />
    </div>
  );
}
