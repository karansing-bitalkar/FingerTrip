import { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Sparklines,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Base data sets ───────────────────────────────────────────────────────────
const ALL_MONTHLY = [
  { month: 'Oct', bookings: 340, revenue: 89000, newUsers: 1800, avgOrder: 2618 },
  { month: 'Nov', bookings: 410, revenue: 112000, newUsers: 2400, avgOrder: 2732 },
  { month: 'Dec', bookings: 520, revenue: 145000, newUsers: 3200, avgOrder: 2788 },
  { month: 'Jan', bookings: 440, revenue: 118000, newUsers: 2600, avgOrder: 2682 },
  { month: 'Feb', bookings: 490, revenue: 132000, newUsers: 2900, avgOrder: 2694 },
  { month: 'Mar', bookings: 580, revenue: 158000, newUsers: 3700, avgOrder: 2724 },
  { month: 'Apr', bookings: 320, revenue: 88000, newUsers: 2000, avgOrder: 2750 },
];

const TOP_DESTINATIONS_DATA = [
  { name: 'Bali',        value: 1840, revenue: 2800000, color: '#F97316' },
  { name: 'Switzerland', value: 1240, revenue: 3950000, color: '#10B981' },
  { name: 'Maldives',    value: 980,  revenue: 4900000, color: '#0FA4AF' },
  { name: 'Dubai',       value: 1580, revenue: 2100000, color: '#8B5CF6' },
  { name: 'Kashmir',     value: 2100, revenue: 1890000, color: '#F59E0B' },
];

const VENDOR_PERF = [
  { name: 'Azure Horizons', revenue: 1240000, bookings: 310, rating: 4.9, trend: [120, 140, 135, 160, 150, 175, 80], up: true, change: '+14%' },
  { name: 'Alpine Dreams',  revenue: 980000,  bookings: 224, rating: 4.8, trend: [80, 90, 88, 95, 102, 110, 65],  up: true, change: '+8%' },
  { name: 'Himalayan Trails', revenue: 1560000, bookings: 528, rating: 4.9, trend: [200, 195, 220, 215, 240, 235, 140], up: true, change: '+22%' },
  { name: 'Desert Pearl',   revenue: 720000,  bookings: 180, rating: 4.7, trend: [70, 65, 68, 72, 80, 75, 45],   up: false, change: '-3%' },
  { name: 'Sunrise Travels', revenue: 1100000, bookings: 340, rating: 4.8, trend: [130, 140, 142, 148, 155, 160, 90], up: true, change: '+12%' },
];

const deviceData = [
  { name: 'Mobile',  value: 58, color: '#F97316' },
  { name: 'Desktop', value: 32, color: '#10B981' },
  { name: 'Tablet',  value: 10, color: '#8B5CF6' },
];

type DateRange = '7d' | '30d' | '90d';

const RANGE_SLICE: Record<DateRange, number> = { '7d': 2, '30d': 4, '90d': 7 };

// Custom tooltip component
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-orange-100 rounded-xl shadow-lg p-3 text-sm">
      <div className="font-bold text-gray-800 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-600 capitalize">{p.name}:</span>
          <span className="font-semibold text-gray-900">
            {p.name === 'revenue' ? `$${Number(p.value).toLocaleString()}` : Number(p.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-orange-100 rounded-xl shadow-lg p-3 text-sm">
      <div className="font-bold text-gray-800">{payload[0].name}</div>
      <div className="text-gray-600">{payload[0].value.toLocaleString()} bookings</div>
    </div>
  );
};

// Tiny inline sparkline using SVG
function MiniSparkline({ data, color, up }: { data: number[]; color: string; up: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 80, H = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x},${y}`;
  }).join(' ');
  const fillPts = `0,${H} ${pts} ${W},${H}`;
  return (
    <svg width={W} height={H} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#sg-${color.replace('#', '')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const kpiDef = [
  { label: 'Total Revenue',   value: '$842K', change: '+18%', up: true,  icon: <DollarSign className="w-5 h-5" />, color: 'bg-orange-50 text-orange-500',  accent: 'bg-orange-500' },
  { label: 'Total Bookings',  value: '3,100', change: '+22%', up: true,  icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-500', accent: 'bg-emerald-500' },
  { label: 'New Users',       value: '18.6K', change: '+31%', up: true,  icon: <Users className="w-5 h-5" />,    color: 'bg-blue-50 text-blue-500',      accent: 'bg-blue-500' },
  { label: 'Avg. Order Value',value: '$2,718', change: '+5%', up: true,  icon: <Globe className="w-5 h-5" />,   color: 'bg-purple-50 text-purple-500',  accent: 'bg-purple-500' },
];

// Renderized custom label for donut
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }: any) => {
  if (percent < 0.08) return null;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#374151" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11} fontWeight={600}>
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
};

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [activeDestination, setActiveDestination] = useState<string | null>(null);

  const monthlyData = useMemo(() => ALL_MONTHLY.slice(-RANGE_SLICE[dateRange]), [dateRange]);

  const totalRevenue = useMemo(() => monthlyData.reduce((s, d) => s + d.revenue, 0), [monthlyData]);
  const totalBookings = useMemo(() => monthlyData.reduce((s, d) => s + d.bookings, 0), [monthlyData]);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Analytics</h1>
          <p className="text-gray-500 mt-1">Platform performance insights and data trends</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button key={r} onClick={() => setDateRange(r)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${dateRange === r ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiDef.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-1.5 h-full ${kpi.accent} rounded-r-2xl opacity-60`} />
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center`}>{kpi.icon}</div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${kpi.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {kpi.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 font-display mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Row 1: Revenue Bar + Bookings Trend Line */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-display">Monthly Revenue</h2>
              <p className="text-xs text-gray-400 mt-0.5">Total: ${(totalRevenue / 1000).toFixed(0)}k for period</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" /> +18%
              </div>
              <div className="text-xs text-gray-400">vs. last period</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} barSize={28}>
              <defs>
                <linearGradient id="barRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#fff7ed', radius: 6 }} />
              <Bar dataKey="revenue" fill="url(#barRevGrad)" radius={[7, 7, 0, 0]} name="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Trend Line */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-display">Bookings Trend</h2>
              <p className="text-xs text-gray-400 mt-0.5">{totalBookings.toLocaleString()} total bookings in period</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#0FA4AF] inline-block" />Bookings</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#8B5CF6] inline-block" />Users</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="lineBookGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0FA4AF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0FA4AF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
              <Line type="monotone" dataKey="bookings" stroke="#0FA4AF" strokeWidth={2.5}
                dot={{ fill: '#0FA4AF', r: 4, strokeWidth: 2, stroke: 'white' }}
                activeDot={{ r: 6 }} name="bookings" />
              <Line type="monotone" dataKey="newUsers" stroke="#8B5CF6" strokeWidth={2.5}
                dot={{ fill: '#8B5CF6', r: 4, strokeWidth: 2, stroke: 'white' }}
                activeDot={{ r: 6 }} name="newUsers" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Top 5 Destinations Donut + Device split */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Donut chart - top 5 destinations */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-display">Top 5 Destinations</h2>
              <p className="text-xs text-gray-400 mt-0.5">Bookings share by destination</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={TOP_DESTINATIONS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, i) => setActiveDestination(TOP_DESTINATIONS_DATA[i].name)}
                  onMouseLeave={() => setActiveDestination(null)}
                >
                  {TOP_DESTINATIONS_DATA.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      opacity={activeDestination === null || activeDestination === entry.name ? 1 : 0.4}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {TOP_DESTINATIONS_DATA.map((dest) => {
                const total = TOP_DESTINATIONS_DATA.reduce((s, d) => s + d.value, 0);
                const pct = Math.round((dest.value / total) * 100);
                const isActive = activeDestination === dest.name;
                return (
                  <div
                    key={dest.name}
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${isActive ? 'bg-orange-50 border border-orange-100' : 'hover:bg-gray-50'}`}
                    onMouseEnter={() => setActiveDestination(dest.name)}
                    onMouseLeave={() => setActiveDestination(null)}
                  >
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: dest.color }} />
                    <span className="text-sm text-gray-700 font-medium flex-1">{dest.name}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{dest.value.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">{pct}%</div>
                    </div>
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: dest.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Device + Avg Order Value */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-base font-bold text-gray-900 font-display mb-4">Traffic by Device</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={80} height={80}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={24} outerRadius={36} paddingAngle={4} dataKey="value">
                    {deviceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {deviceData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                      <span className="text-sm text-gray-600">{d.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white flex-1">
            <div className="text-sm font-medium text-white/80 mb-2">Average Order Value</div>
            <div className="text-3xl font-bold font-display mb-1">$2,718</div>
            <div className="flex items-center gap-1 text-white/80 text-xs">
              <TrendingUp className="w-3.5 h-3.5" /> +5% vs last {dateRange === '7d' ? 'week' : dateRange === '30d' ? 'month' : 'quarter'}
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="white" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="avgOrder" stroke="white" strokeWidth={2} fill="url(#avgGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Vendor Performance Table with Sparklines */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-display">Vendor Performance</h2>
            <p className="text-xs text-gray-400 mt-0.5">Revenue, bookings, and trend for top vendors</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                {['Vendor', 'Revenue', 'Bookings', 'Rating', 'Trend', 'Change'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {VENDOR_PERF.map((v, i) => (
                <motion.tr
                  key={v.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="hover:bg-orange-50/30 transition-colors"
                >
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {v.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{v.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-bold text-gray-900 text-sm">${(v.revenue / 1000000).toFixed(2)}M</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-sm text-gray-700">{v.bookings.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500 text-xs">★</span>
                      <span className="text-sm font-semibold text-gray-800">{v.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <MiniSparkline data={v.trend} color={v.up ? '#10B981' : '#EF4444'} up={v.up} />
                  </td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${v.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                      {v.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {v.change}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Revenue area + Destination revenue bars */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Revenue by Destination</h2>
          <div className="space-y-4">
            {TOP_DESTINATIONS_DATA.sort((a, b) => b.revenue - a.revenue).map((dest, i) => {
              const max = Math.max(...TOP_DESTINATIONS_DATA.map(d => d.revenue));
              return (
                <div key={dest.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{i + 1}</span>
                      <span className="text-sm font-semibold text-gray-800">{dest.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">${(dest.revenue / 1000000).toFixed(1)}M</span>
                      <span className="text-xs text-gray-400 ml-2">({dest.value.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(dest.revenue / max) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: dest.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Revenue vs Bookings</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bookAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0FA4AF" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0FA4AF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#revAreaGrad)" dot={false} name="revenue" />
              <Area yAxisId="right" type="monotone" dataKey="bookings" stroke="#0FA4AF" strokeWidth={2} fill="url(#bookAreaGrad)" dot={false} name="bookings" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
