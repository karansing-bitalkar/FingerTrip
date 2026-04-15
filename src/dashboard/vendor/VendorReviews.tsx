import { Star } from 'lucide-react';

const reviews = [
  { id: '1', traveler: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', package: 'Bali Spiritual Retreat', rating: 5, comment: 'Absolutely magical experience. The villa was stunning and every detail was perfectly arranged. Will definitely book again!', date: 'April 2026', helpful: 24 },
  { id: '2', traveler: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80', package: 'Bali Spiritual Retreat', rating: 5, comment: 'The yoga sessions and spa treatments were world-class. Loved every moment. Our guide was knowledgeable and friendly.', date: 'March 2026', helpful: 18 },
  { id: '3', traveler: 'Raj Patel', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', package: 'Kashmir Paradise Tour', rating: 4, comment: 'Beautiful destination. The houseboat was amazing. Would have liked more flexibility in the itinerary, but overall great trip.', date: 'February 2026', helpful: 12 },
  { id: '4', traveler: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&q=80', package: 'Thailand Island Hopping', rating: 5, comment: 'Best island hopping experience ever. Phi Phi Islands at sunset was unforgettable. Highly recommend Sunrise Travels!', date: 'January 2026', helpful: 31 },
];

export default function VendorReviews() {
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">Reviews</h1>
        <p className="text-gray-500 mt-1">What travelers say about your packages</p>
      </div>

      {/* Rating Summary */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900 font-display">{avgRating}</div>
            <div className="flex gap-1 justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(Number(avgRating)) ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}`} />
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const pct = Math.round((count / reviews.length) * 100);
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-4">{stars}</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <img src={review.avatar} alt={review.traveler} className="w-12 h-12 rounded-xl object-cover shrink-0 border-2 border-orange-100" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-gray-900">{review.traveler}</div>
                    <div className="text-xs text-orange-600 font-medium mt-0.5">{review.package}</div>
                  </div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-xs text-gray-400 hover:text-orange-600 transition-colors">Reply</button>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{review.helpful} found this helpful</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
