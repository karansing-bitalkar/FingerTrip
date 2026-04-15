import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, MapPin, Clock, Star, Heart, DollarSign, TrendingUp, Package } from 'lucide-react';
import { TRAVELER_BOOKINGS, PACKAGES, DESTINATIONS } from '@/constants/data';
import { getStoredUser } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import type { Package as TPackage } from '@/types';

// ─── Countdown Timer ───────────────────────────────────────────────
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function CountdownWidget({ booking }: { booking: typeof TRAVELER_BOOKINGS[0] }) {
  const t = useCountdown(booking.date);
  return (
    <div className="bg-gradient-to-br from-[#003135] to-[#024950] rounded-3xl p-6 text-white relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#0FA4AF]/20 rounded-full" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#AFDDE5]/10 rounded-full -translate-x-1/2 translate-y-1/2" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-[#AFDDE5]" />
          <span className="text-[#AFDDE5] text-xs font-semibold uppercase tracking-wide">Next Trip Countdown</span>
        </div>
        <p className="text-white font-bold text-sm mb-4 truncate">{booking.packageTitle}</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Days', value: t.days },
            { label: 'Hours', value: t.hours },
            { label: 'Mins', value: t.minutes },
            { label: 'Secs', value: t.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="text-center bg-white/10 rounded-xl py-2.5 px-1">
              <div className="text-2xl font-bold font-display text-white leading-none">
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-[#AFDDE5]/70 text-[10px] mt-0.5 font-medium">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[#AFDDE5]/70 text-xs">
          <MapPin className="w-3 h-3" /> {booking.destination} · {booking.date}
        </div>
      </div>
    </div>
  );
}

// ─── Spending Donut ─────────────────────────────────────────────────
const SPENDING_DATA = [
  { name: 'Maldives', value: 9998, color: '#F97316' },
  { name: 'Bali', value: 1899, color: '#0FA4AF' },
  { name: 'Kashmir', value: 5196, color: '#964734' },
];
const TOTAL_SPENT = SPENDING_DATA.reduce((s, d) => s + d.value, 0);

const SpendingTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-orange-100 rounded-xl shadow-lg p-2.5 text-xs">
      <div className="font-bold text-gray-800">{payload[0].name}</div>
      <div className="text-[#964734] font-semibold">${payload[0].value.toLocaleString()}</div>
    </div>
  );
};

// ─── Status colors ──────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-[#AFDDE5]/50 text-[#024950]',
};

const statusDot: Record<string, string> = {
  confirmed: 'bg-emerald-500',
  pending: 'bg-amber-500',
  cancelled: 'bg-red-500',
  completed: 'bg-[#0FA4AF]',
};

// ─── Main Component ─────────────────────────────────────────────────
export default function TravelerOverview() {
  const user = getStoredUser();
  const { wishlist } = useWishlist();

  // Upcoming bookings sorted by date
  const upcomingBooking = useMemo(() =>
    TRAVELER_BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'pending')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0],
    []
  );

  // Personalized recommendations: based on past bookings destinations
  const bookedDestinations = new Set(TRAVELER_BOOKINGS.map(b => b.destination.toLowerCase()));
  const recommendedPackages: TPackage[] = useMemo(() => {
    // Find packages from destinations they've visited (different packages) or similar destinations
    const alreadyBooked = new Set(TRAVELER_BOOKINGS.map(b => b.packageTitle));
    return PACKAGES
      .filter(p => !alreadyBooked.has(p.title))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, []);

  const stats = [
    { label: 'Total Trips', value: '8', change: '+2 this year', icon: <MapPin className="w-5 h-5" />, color: 'bg-[#AFDDE5]/40 text-[#003135]' },
    { label: 'Upcoming Trips', value: '2', change: 'Next: Jun 15', icon: <Clock className="w-5 h-5" />, color: 'bg-[#0FA4AF]/10 text-[#024950]' },
    { label: 'Total Spent', value: `$${TOTAL_SPENT.toLocaleString()}`, change: '+$9,998 this year', icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Wishlist', value: String(wishlist.length || 12), change: '3 on sale now', icon: <Heart className="w-5 h-5" />, color: 'bg-[#964734]/10 text-[#964734]' },
  ];

  return (
    <div className="space-y-7">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-[#003135] to-[#024950] rounded-3xl p-7 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-[#0FA4AF] absolute -top-10 -right-10" />
          <div className="w-32 h-32 rounded-full bg-[#AFDDE5] absolute bottom-5 right-10" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-display mb-1">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Countdown + Spending split */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Countdown */}
        <div className="lg:col-span-3">
          {upcomingBooking ? (
            <CountdownWidget booking={upcomingBooking} />
          ) : (
            <div className="bg-gradient-to-br from-[#003135] to-[#024950] rounded-3xl p-6 text-center text-white h-full flex flex-col items-center justify-center">
              <Package className="w-10 h-10 text-[#AFDDE5]/50 mb-3" />
              <p className="font-semibold text-[#AFDDE5]">No upcoming trips</p>
              <Link to="/packages" className="mt-3 px-5 py-2 bg-[#0FA4AF] rounded-xl text-sm font-semibold text-white hover:bg-[#0FA4AF]/80 transition-colors">
                Browse Packages
              </Link>
            </div>
          )}
        </div>

        {/* Spending Donut */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#AFDDE5]/40 shadow-sm p-5">
          <h3 className="text-sm font-bold text-[#003135] font-display mb-1">Spending Breakdown</h3>
          <p className="text-xs text-gray-400 mb-3">Total: <span className="font-bold text-[#964734]">${TOTAL_SPENT.toLocaleString()}</span></p>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width={90} height={90}>
              <PieChart>
                <Pie data={SPENDING_DATA} cx="50%" cy="50%" innerRadius={26} outerRadius={40} paddingAngle={4} dataKey="value">
                  {SPENDING_DATA.map((e, i) => <Cell key={i} fill={e.color} stroke="white" strokeWidth={2} />)}
                </Pie>
                <Tooltip content={<SpendingTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {SPENDING_DATA.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">${(d.value / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Avg per trip</span>
              <span className="font-bold text-[#003135]">${(TOTAL_SPENT / TRAVELER_BOOKINGS.length).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Booking Status Cards */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-gray-50">
          <h2 className="text-lg font-bold text-[#003135] font-display">Recent Bookings</h2>
          <Link to="/traveler-dashboard/bookings" className="flex items-center gap-1 text-[#0FA4AF] text-sm font-medium hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {TRAVELER_BOOKINGS.map((booking) => (
            <motion.div key={booking.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 p-4 hover:bg-[#f0fafb] transition-colors"
            >
              <img src={booking.image} alt={booking.destination} className="w-14 h-11 rounded-xl object-cover shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=80'; }} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{booking.packageTitle}</div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#964734]" /> {booking.destination}
                  <span>·</span>
                  <Clock className="w-3 h-3" /> {booking.date}
                </div>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <div className="font-bold text-[#003135] text-sm">${booking.amount.toLocaleString()}</div>
                <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${statusColors[booking.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[booking.status]}`} />
                  {booking.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wishlist Quick-Access Strip */}
      {wishlist.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#964734] fill-[#964734]" />
              <h2 className="text-base font-bold text-[#003135] font-display">Wishlist</h2>
              <span className="text-xs bg-[#964734]/10 text-[#964734] font-bold px-2 py-0.5 rounded-full">{wishlist.length}</span>
            </div>
            <Link to="/traveler-dashboard/wishlist" className="flex items-center gap-1 text-[#0FA4AF] text-sm font-medium hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {wishlist.slice(0, 5).map((pkg) => (
              <Link key={pkg.id} to={`/packages/${pkg.id}`}
                className="shrink-0 w-44 rounded-xl overflow-hidden border border-[#AFDDE5]/40 hover:border-[#0FA4AF]/60 transition-colors group"
              >
                <div className="relative h-24">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-[10px] font-bold truncate">{pkg.title}</div>
                    <div className="text-[#AFDDE5] text-[10px] font-bold">${pkg.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended For You */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#003135] font-display">Recommended For You</h2>
            <p className="text-xs text-gray-400 mt-0.5">Based on your past trips to {Array.from(bookedDestinations).slice(0, 2).join(' & ')}</p>
          </div>
          <Link to="/packages" className="text-[#0FA4AF] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/packages/${pkg.id}`} className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer block">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white font-bold text-sm font-display truncate">{pkg.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[#AFDDE5] font-bold text-xs">${pkg.price.toLocaleString()}</span>
                    <span className="text-white/70 flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {pkg.rating}
                    </span>
                  </div>
                </div>
                {pkg.discount && (
                  <div className="absolute top-2 right-2 bg-[#964734] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {pkg.discount}% OFF
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}
