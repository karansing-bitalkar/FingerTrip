import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Globe } from 'lucide-react';

const monthlyData = [
  { month: 'Oct', bookings: 340, revenue: 89000, newUsers: 1800, avgOrder: 2618 },
  { month: 'Nov', bookings: 410, revenue: 112000, newUsers: 2400, avgOrder: 2732 },
  { month: 'Dec', bookings: 520, revenue: 145000, newUsers: 3200, avgOrder: 2788 },
  { month: 'Jan', bookings: 440, revenue: 118000, newUsers: 2600, avgOrder: 2682 },
  { month: 'Feb', bookings: 490, revenue: 132000, newUsers: 2900, avgOrder: 2694 },
  { month: 'Mar', bookings: 580, revenue: 158000, newUsers: 3700, avgOrder: 2724 },
  { month: 'Apr', bookings: 320, revenue: 88000, newUsers: 2000, avgOrder: 2750 },
];

const topDestinations = [
  { name: 'Bali', bookings: 1840, revenue: 2800000 },
  { name: 'Switzerland', bookings: 1240, revenue: 3950000 },
  { name: 'Maldives', bookings: 980, revenue: 4900000 },
  { name: 'Dubai', bookings: 1580, revenue: 2100000 },
  { name: 'Kashmir', bookings: 2100, revenue: 1890000 },
];

const deviceData = [
  { name: 'Mobile', value: 58, color: '#F97316' },
  { name: 'Desktop', value: 32, color: '#10B981' },
  { name: 'Tablet', value: 10, color: '#8B5CF6' },
];

const categoryData = [
  { name: 'Luxury', value: 35, color: '#964734' },
  { name: 'Adventure', value: 25, color: '#0FA4AF' },
  { name: 'Wellness', value: 20, color: '#024950' },
  { name: 'Cultural', value: 12, color: '#AFDDE5' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

const kpis = [
  { label: 'Total Revenue', value: '$842K', change: '+18%', up: true, icon: <DollarSign className="w-5 h-5" />, color: 'bg-orange-50 text-orange-500' },
  { label: 'Total Bookings', value: '3,100', change: '+22%', up: true, icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-500' },
  { label: 'New Users', value: '18,600', change: '+31%', up: true, icon: <Users className="w-5 h-5" />, color: 'bg-blue-50 text-blue-500' },
  { label: 'Avg. Order Value', value: '$2,718', change: '+5%', up: true, icon: <Globe className="w-5 h-5" />, color: 'bg-purple-50 text-purple-500' },
];

type DateRange = '7d' | '30d' | '90d' | '1y';

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Analytics</h1>
          <p className="text-gray-500 mt-1">Platform performance insights and data trends</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((r) => (
            <button key={r} onClick={() => setDateRange(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${dateRange === r ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'}`}>
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : r === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center`}>{kpi.icon}</div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {kpi.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-display mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue & Bookings charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: '#F97316', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Bookings vs New Users</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 4 }} name="Bookings" />
              <Line type="monotone" dataKey="newUsers" stroke="#8B5CF6" strokeWidth={2.5} dot={{ fill: '#8B5CF6', r: 4 }} name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar chart + Device pie */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Monthly Bookings Bar</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#0FA4AF" radius={[5, 5, 0, 0]} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-rows-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-bold text-gray-900 font-display mb-3">Traffic by Device</h2>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={80} height={80}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={25} outerRadius={38} paddingAngle={3} dataKey="value">
                    {deviceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {deviceData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-bold text-gray-900 font-display mb-3">Booking Categories</h2>
            <div className="space-y-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${c.value}%`, backgroundColor: c.color }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">{c.value}%</span>
                  <span className="text-xs text-gray-400 w-16 text-right">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Top Destinations by Revenue</h2>
        <div className="space-y-4">
          {topDestinations.sort((a, b) => b.revenue - a.revenue).map((dest, i) => {
            const max = Math.max(...topDestinations.map((d) => d.revenue));
            const pct = Math.round((dest.revenue / max) * 100);
            const colors = ['#F97316', '#0FA4AF', '#10B981', '#8B5CF6', '#EF4444'];
            return (
              <div key={dest.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{i + 1}</span>
                    <span className="text-sm font-semibold text-gray-800">{dest.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">${(dest.revenue / 1000000).toFixed(1)}M</span>
                    <span className="text-xs text-gray-400 ml-2">({dest.bookings.toLocaleString()} bookings)</span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
