import { motion } from 'framer-motion';
import { ShoppingBag, Heart, DollarSign, TrendingUp, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRAVELER_BOOKINGS } from '@/constants/data';
import { getStoredUser } from '@/hooks/useAuth';

const stats = [
  { label: 'Total Trips', value: '8', change: '+2 this year', icon: <MapPin className="w-5 h-5" />, color: 'bg-[#AFDDE5]/40 text-[#003135]' },
  { label: 'Upcoming Trips', value: '2', change: 'Next: Jun 15', icon: <Clock className="w-5 h-5" />, color: 'bg-[#0FA4AF]/10 text-[#024950]' },
  { label: 'Total Spent', value: '$17,093', change: '+$9,998 this year', icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Wishlist Items', value: '12', change: '3 on sale now', icon: <Heart className="w-5 h-5" />, color: 'bg-[#964734]/10 text-[#964734]' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-[#AFDDE5]/50 text-[#024950]',
};

export default function TravelerOverview() {
  const user = getStoredUser();

  return (
    <div className="space-y-8">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-[#003135] to-[#024950] rounded-3xl p-7 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-48 h-48 rounded-full bg-[#0FA4AF] absolute -top-10 -right-10" />
          <div className="w-32 h-32 rounded-full bg-[#AFDDE5] absolute bottom-5 right-10" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-display mb-1">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-[#AFDDE5]/70">Ready for your next adventure?</p>
          <div className="flex gap-3 mt-5">
            <Link to="/packages" className="px-5 py-2.5 bg-[#0FA4AF] text-white text-sm font-semibold rounded-xl hover:bg-[#0FA4AF]/80 transition-colors">
              Browse Packages
            </Link>
            <Link to="/traveler-dashboard/bookings" className="px-5 py-2.5 bg-white/15 border border-white/25 text-white text-sm font-semibold rounded-xl hover:bg-white/25 transition-colors">
              My Bookings
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[#003135] font-display mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-[#003135] font-display">Recent Bookings</h2>
          <Link to="/traveler-dashboard/bookings" className="flex items-center gap-1 text-[#0FA4AF] text-sm font-medium hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {TRAVELER_BOOKINGS.map((booking) => (
            <div key={booking.id} className="flex items-center gap-4 p-5 hover:bg-[#f0fafb] transition-colors">
              <img src={booking.image} alt={booking.destination} className="w-16 h-12 rounded-xl object-cover shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=80'; }} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{booking.packageTitle}</div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#964734]" /> {booking.destination}
                  <span>•</span>
                  <Clock className="w-3 h-3" /> {booking.date}
                  <span>•</span>
                  {booking.travelers} travelers
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[#003135] text-sm">${booking.amount.toLocaleString()}</div>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 inline-block capitalize ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Destinations */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#003135] font-display">Recommended For You</h2>
          <Link to="/destinations" className="text-[#0FA4AF] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&q=80', price: '$2,499', rating: 4.9 },
            { name: 'Kyoto', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=80', price: '$3,199', rating: 4.9 },
            { name: 'New Zealand', img: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=300&q=80', price: '$3,799', rating: 4.8 },
          ].map((dest) => (
            <Link to="/destinations" key={dest.name} className="relative h-36 rounded-2xl overflow-hidden group cursor-pointer block">
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="text-white font-bold font-display">{dest.name}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#AFDDE5] font-bold">{dest.price}</span>
                  <span className="text-white/70 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#AFDDE5] fill-[#AFDDE5]" /> {dest.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
