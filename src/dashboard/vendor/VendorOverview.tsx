import { motion } from 'framer-motion';
import { Package, ShoppingBag, DollarSign, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredUser } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Oct', earnings: 12400 },
  { month: 'Nov', earnings: 18200 },
  { month: 'Dec', earnings: 24600 },
  { month: 'Jan', earnings: 19800 },
  { month: 'Feb', earnings: 22300 },
  { month: 'Mar', earnings: 28900 },
  { month: 'Apr', earnings: 15200 },
];

const recentOrders = [
  { id: 'ORD001', package: 'Bali Spiritual Retreat', traveler: 'Alex Johnson', date: '2026-04-05', amount: 1899, status: 'confirmed' },
  { id: 'ORD002', package: 'Bali Spiritual Retreat', traveler: 'Sarah Chen', date: '2026-04-03', amount: 1899, status: 'confirmed' },
  { id: 'ORD003', package: 'Kashmir Paradise Tour', traveler: 'Raj Patel', date: '2026-04-01', amount: 1299, status: 'pending' },
  { id: 'ORD004', package: 'Thailand Island Hopping', traveler: 'Emma Wilson', date: '2026-03-28', amount: 1599, status: 'confirmed' },
];

export default function VendorOverview() {
  const user = getStoredUser();
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#003135] to-[#024950] rounded-3xl p-7 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-48 h-48 rounded-full bg-[#0FA4AF] absolute -top-10 -right-10" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-display mb-1">Vendor Dashboard</h1>
          <p className="text-[#AFDDE5]/70">Welcome back, {user?.name} — here's your business overview</p>
          <div className="flex gap-3 mt-5">
            <Link to="/vendor-dashboard/add-package" className="px-5 py-2.5 bg-[#0FA4AF] text-white text-sm font-semibold rounded-xl hover:bg-[#0FA4AF]/80 transition-colors">
              + Add Package
            </Link>
            <Link to="/vendor-dashboard/orders" className="px-5 py-2.5 bg-white/15 border border-white/25 text-white text-sm font-semibold rounded-xl hover:bg-white/25 transition-colors">
              View Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Active Packages', value: '28', change: '+3 this month', icon: <Package className="w-5 h-5" />, color: 'bg-[#0FA4AF]/10 text-[#0FA4AF]' },
          { label: 'Total Orders', value: '184', change: '+12 this month', icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-[#AFDDE5]/40 text-[#003135]' },
          { label: 'Revenue (MTD)', value: '$28,900', change: '+26% vs last month', icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Avg. Rating', value: '4.8★', change: '2,156 reviews', icon: <Star className="w-5 h-5" />, color: 'bg-[#964734]/10 text-[#964734]' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[#003135] font-display mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#003135] font-display">Revenue Overview</h2>
          <Link to="/vendor-dashboard/earnings" className="flex items-center gap-1 text-[#0FA4AF] text-sm font-medium hover:gap-2 transition-all">
            Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6f6f8" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
            <Bar dataKey="earnings" fill="url(#vendorGradient)" radius={[6, 6, 0, 0]} />
            <defs>
              <linearGradient id="vendorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0FA4AF" />
                <stop offset="100%" stopColor="#AFDDE5" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-[#003135] font-display">Recent Orders</h2>
          <Link to="/vendor-dashboard/orders" className="flex items-center gap-1 text-[#0FA4AF] text-sm font-medium hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-5 hover:bg-[#f0fafb] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm">{order.package}</div>
                <div className="text-xs text-gray-400 mt-0.5">#{order.id} · {order.traveler} · {order.date}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-[#003135]">${order.amount.toLocaleString()}</div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize inline-block mt-1 ${order.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'My Packages', path: '/vendor-dashboard/packages', color: 'bg-[#AFDDE5]/30 border-[#AFDDE5] text-[#003135]' },
          { label: 'Add Package', path: '/vendor-dashboard/add-package', color: 'bg-[#0FA4AF]/10 border-[#0FA4AF]/30 text-[#024950]' },
          { label: 'Earnings', path: '/vendor-dashboard/earnings', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Reviews', path: '/vendor-dashboard/reviews', color: 'bg-[#964734]/10 border-[#964734]/30 text-[#964734]' },
        ].map((link) => (
          <Link key={link.label} to={link.path}
            className={`flex items-center justify-center py-3 rounded-xl border text-sm font-semibold ${link.color} hover:shadow-md transition-all`}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
