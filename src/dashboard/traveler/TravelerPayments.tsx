import { CreditCard, DollarSign, TrendingDown, CheckCircle, Clock } from 'lucide-react';

const payments = [
  { id: 'PAY001', desc: 'Maldives Luxury Escape', date: '2026-04-07', amount: 9998, method: 'Visa •••• 4242', status: 'paid', type: 'debit' },
  { id: 'PAY002', desc: 'Bali Spiritual Retreat', date: '2026-02-15', amount: 1899, method: 'Mastercard •••• 8888', status: 'paid', type: 'debit' },
  { id: 'PAY003', desc: 'Refund — Kashmir tour cancellation', date: '2026-01-28', amount: 650, method: 'Bank Transfer', status: 'refunded', type: 'credit' },
  { id: 'PAY004', desc: 'Kashmir Paradise Tour — Deposit', date: '2026-03-20', amount: 390, method: 'PayPal', status: 'pending', type: 'debit' },
];

const statusStyles: Record<string, string> = {
  paid: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  refunded: 'bg-blue-100 text-blue-700',
};

export default function TravelerPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">Payments</h1>
        <p className="text-gray-500 mt-1">Track all your payment transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Total Spent', value: '$17,093', icon: <DollarSign className="w-5 h-5" />, color: 'bg-orange-50 text-orange-500' },
          { label: 'Pending Payments', value: '$390', icon: <Clock className="w-5 h-5" />, color: 'bg-amber-50 text-amber-500' },
          { label: 'Total Refunds', value: '$650', icon: <TrendingDown className="w-5 h-5" />, color: 'bg-blue-50 text-blue-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-orange-50 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 font-display">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900 font-display">Transaction History</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-5 hover:bg-orange-50/30 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.type === 'debit' ? 'bg-red-50' : 'bg-emerald-50'}`}>
                {p.type === 'debit' ? <CreditCard className="w-5 h-5 text-red-500" /> : <CheckCircle className="w-5 h-5 text-emerald-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm truncate">{p.desc}</div>
                <div className="text-xs text-gray-400 mt-0.5">{p.date} · {p.method} · #{p.id}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`font-bold text-sm ${p.type === 'debit' ? 'text-gray-900' : 'text-emerald-600'}`}>
                  {p.type === 'debit' ? '-' : '+'}${p.amount.toLocaleString()}
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize mt-1 inline-block ${statusStyles[p.status]}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Cards */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Saved Payment Methods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { type: 'Visa', number: '•••• •••• •••• 4242', expires: '12/28', color: 'from-blue-600 to-blue-800' },
            { type: 'Mastercard', number: '•••• •••• •••• 8888', expires: '09/27', color: 'from-orange-600 to-red-700' },
          ].map((card) => (
            <div key={card.number} className={`p-5 bg-gradient-to-br ${card.color} rounded-2xl text-white`}>
              <div className="flex justify-between items-start mb-6">
                <CreditCard className="w-6 h-6" />
                <span className="text-sm font-bold">{card.type}</span>
              </div>
              <div className="font-mono text-lg tracking-wider mb-2">{card.number}</div>
              <div className="text-xs text-white/70">Expires {card.expires}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
