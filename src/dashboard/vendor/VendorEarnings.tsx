import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Oct', earnings: 12400, orders: 18 },
  { month: 'Nov', earnings: 18200, orders: 24 },
  { month: 'Dec', earnings: 24600, orders: 32 },
  { month: 'Jan', earnings: 19800, orders: 26 },
  { month: 'Feb', earnings: 22300, orders: 29 },
  { month: 'Mar', earnings: 28900, orders: 37 },
  { month: 'Apr', earnings: 15200, orders: 20 },
];

const payouts = [
  { id: 'PAY001', period: 'March 2026', amount: 24565, date: '2026-04-01', status: 'paid', orders: 31 },
  { id: 'PAY002', period: 'February 2026', amount: 18955, date: '2026-03-01', status: 'paid', orders: 25 },
  { id: 'PAY003', period: 'January 2026', amount: 16830, date: '2026-02-01', status: 'paid', orders: 22 },
];

export default function VendorEarnings() {
  const totalEarnings = monthlyData.reduce((a, d) => a + d.earnings, 0);
  const currentMonth = monthlyData[monthlyData.length - 1].earnings;
  const prevMonth = monthlyData[monthlyData.length - 2].earnings;
  const change = ((currentMonth - prevMonth) / prevMonth * 100).toFixed(1);
  const isPositive = currentMonth >= prevMonth;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#003135] font-display">Earnings</h1>
        <p className="text-gray-500 mt-1">Track your revenue and payouts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Total Earnings (YTD)', value: `$${totalEarnings.toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-[#0FA4AF]/10 text-[#0FA4AF]', change: '+38% vs last year' },
          { label: 'Current Month', value: `$${currentMonth.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600', change: `${isPositive ? '+' : ''}${change}% vs last month` },
          { label: 'Pending Payout', value: '$15,200', icon: <DollarSign className="w-5 h-5" />, color: 'bg-[#964734]/10 text-[#964734]', change: 'Payout Apr 30, 2026' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-[#003135] font-display mb-1">{s.value}</div>
            <div className="text-sm text-gray-600 mb-1">{s.label}</div>
            <div className={`text-xs font-medium flex items-center gap-1 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#003135] font-display mb-6">Monthly Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0FA4AF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0FA4AF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6f6f8" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
            <Area type="monotone" dataKey="earnings" stroke="#0FA4AF" strokeWidth={2.5} fill="url(#earningsGrad)" dot={{ fill: '#0FA4AF', r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-[#003135] font-display">Payout History</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {payouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-5 hover:bg-[#f0fafb] transition-colors">
              <div>
                <div className="font-semibold text-gray-900">{payout.period}</div>
                <div className="text-xs text-gray-400 mt-0.5">#{payout.id} · {payout.orders} orders · Paid on {payout.date}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-emerald-600">${payout.amount.toLocaleString()}</div>
                <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full capitalize">
                  {payout.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
