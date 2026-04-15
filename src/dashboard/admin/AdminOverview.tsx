import { motion } from 'framer-motion';
import { Users, Building2, ShoppingBag, DollarSign, TrendingUp, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const platformData = [
  { month: 'Oct', users: 12400, bookings: 340, revenue: 89000 },
  { month: 'Nov', bookings: 410, revenue: 112000, users: 14800 },
  { month: 'Dec', bookings: 520, revenue: 145000, users: 17200 },
  { month: 'Jan', bookings: 440, revenue: 118000, users: 19800 },
  { month: 'Feb', bookings: 490, revenue: 132000, users: 22400 },
  { month: 'Mar', bookings: 580, revenue: 158000, users: 25600 },
  { month: 'Apr', bookings: 320, revenue: 88000, users: 28100 },
];

const categoryData = [
  { name: 'Luxury', value: 35, color: '#964734' },
  { name: 'Adventure', value: 25, color: '#0FA4AF' },
  { name: 'Wellness', value: 20, color: '#024950' },
  { name: 'Cultural', value: 12, color: '#AFDDE5' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

const recentAlerts = [
  { type: 'warning', msg: 'Vendor "BlueSeas Tours" pending verification for 5 days', time: '2 hours ago' },
  { type: 'info', msg: 'New record: 580 bookings in March 2026', time: '1 day ago' },
  { type: 'error', msg: 'Payment gateway timeout detected — 3 failed transactions', time: '3 days ago' },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#003135] to-[#024950] rounded-3xl p-7 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-48 h-48 rounded-full bg-[#0FA4AF] absolute -top-10 -right-10" />
          <div className="w-32 h-32 rounded-full bg-[#AFDDE5] absolute bottom-5 right-10" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-display mb-1">Admin Dashboard</h1>
          <p className="text-[#AFDDE5]/70">Complete platform overview — FingerTrip Global Operations</p>
          <div className="flex gap-3 mt-5">
            <Link to="/admin-dashboard/users" className="px-5 py-2.5 bg-[#0FA4AF] text-white text-sm font-semibold rounded-xl hover:bg-[#0FA4AF]/80 transition-colors">
              Manage Users
            </Link>
            <Link to="/admin-dashboard/analytics" className="px-5 py-2.5 bg-white/15 border border-white/25 text-white text-sm font-semibold rounded-xl hover:bg-white/25 transition-colors">
              View Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Users', value: '150,241', change: '+2,847 this month', icon: <Users className="w-5 h-5" />, color: 'bg-[#AFDDE5]/40 text-[#003135]' },
          { label: 'Active Vendors', value: '214', change: '+8 this month', icon: <Building2 className="w-5 h-5" />, color: 'bg-[#0FA4AF]/10 text-[#0FA4AF]' },
          { label: 'Total Bookings', value: '28,492', change: '+580 this month', icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-[#964734]/10 text-[#964734]' },
          { label: 'Platform Revenue', value: '$4.2M', change: '+18% vs last quarter', icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[#003135] font-display mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#003135] font-display">Platform Bookings Trend</h2>
            <Link to="/admin-dashboard/analytics" className="text-[#0FA4AF] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Analytics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6f6f8" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#964734" strokeWidth={2.5} dot={{ fill: '#964734', r: 4 }} name="Bookings" />
              <Line type="monotone" dataKey="users" stroke="#0FA4AF" strokeWidth={2.5} dot={{ fill: '#0FA4AF', r: 4 }} name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Split */}
        <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#003135] font-display mb-6">Bookings by Category</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-[#003135]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Users', path: '/admin-dashboard/users', color: 'bg-[#AFDDE5]/30 border-[#AFDDE5]' },
          { label: 'Vendors', path: '/admin-dashboard/vendors', color: 'bg-[#0FA4AF]/10 border-[#0FA4AF]/30' },
          { label: 'Bookings', path: '/admin-dashboard/bookings', color: 'bg-[#964734]/10 border-[#964734]/30' },
          { label: 'Analytics', path: '/admin-dashboard/analytics', color: 'bg-emerald-50 border-emerald-200' },
          { label: 'Reports', path: '/admin-dashboard/reports', color: 'bg-purple-50 border-purple-200' },
          { label: 'Settings', path: '/admin-dashboard/settings', color: 'bg-gray-50 border-gray-200' },
        ].map((link) => (
          <Link key={link.label} to={link.path}
            className={`flex items-center justify-center py-3 rounded-xl border text-sm font-semibold text-[#003135] ${link.color} hover:shadow-md transition-all`}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#003135] font-display mb-5">System Alerts</h2>
        <div className="space-y-3">
          {recentAlerts.map((alert, i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
              alert.type === 'warning' ? 'bg-amber-50 border-amber-100' :
              alert.type === 'error' ? 'bg-red-50 border-red-100' : 'bg-[#AFDDE5]/20 border-[#AFDDE5]'
            }`}>
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                alert.type === 'warning' ? 'text-amber-500' :
                alert.type === 'error' ? 'text-red-500' : 'text-[#0FA4AF]'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{alert.msg}</p>
                <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
