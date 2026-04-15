import { useState } from 'react';
import { Eye, CheckCircle, X, User, Mail, Package, Calendar, Users, DollarSign, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '@/components/features/Popup';

const orders = [
  { id: 'ORD001', package: 'Bali Spiritual Retreat', traveler: 'Alex Johnson', email: 'alex@email.com', phone: '+1 555 0101', travelers: 1, date: '2026-05-10', amount: 1899, status: 'confirmed', booked: '2026-04-07', paymentStatus: 'paid' },
  { id: 'ORD002', package: 'Bali Spiritual Retreat', traveler: 'Sarah Chen', email: 'sarah@email.com', phone: '+44 20 7946 0958', travelers: 2, date: '2026-05-22', amount: 3798, status: 'confirmed', booked: '2026-04-03', paymentStatus: 'paid' },
  { id: 'ORD003', package: 'Kashmir Paradise Tour', traveler: 'Raj Patel', email: 'raj@email.com', phone: '+91 98765 43210', travelers: 4, date: '2026-06-08', amount: 5196, status: 'pending', booked: '2026-04-01', paymentStatus: 'pending' },
  { id: 'ORD004', package: 'Thailand Island Hopping', traveler: 'Emma Wilson', email: 'emma@email.com', phone: '+61 2 9374 4000', travelers: 2, date: '2026-07-15', amount: 3198, status: 'confirmed', booked: '2026-03-28', paymentStatus: 'paid' },
  { id: 'ORD005', package: 'Bali Spiritual Retreat', traveler: 'Kenji Tanaka', email: 'kenji@email.com', phone: '+81 3 1234 5678', travelers: 1, date: '2026-04-25', amount: 1899, status: 'completed', booked: '2026-03-20', paymentStatus: 'paid' },
];

type Order = typeof orders[0];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
};

function OrderViewModal({ isOpen, onClose, order }: { isOpen: boolean; onClose: () => void; order: Order | null }) {
  return (
    <AnimatePresence>
      {isOpen && order && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003135] to-[#024950] p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-xs font-mono text-[#AFDDE5]/60 mb-1">Order #{order.id}</div>
              <h3 className="text-lg font-bold text-white font-display">{order.package}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  Payment: {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-3">
              {/* Traveler Info */}
              <div className="bg-[#f0fafb] rounded-2xl p-4 border border-[#AFDDE5]/40">
                <div className="text-xs font-bold text-[#003135] uppercase tracking-wide mb-3">Traveler Information</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <User className="w-4 h-4 text-[#0FA4AF] shrink-0" />
                    <span className="font-semibold text-gray-900">{order.traveler}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#0FA4AF] shrink-0" />
                    {order.email}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#0FA4AF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {order.phone}
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-2.5">
                {[
                  { icon: <Package className="w-4 h-4 text-[#0FA4AF]" />, label: 'Package', value: order.package },
                  { icon: <Calendar className="w-4 h-4 text-[#0FA4AF]" />, label: 'Travel Date', value: order.date },
                  { icon: <Users className="w-4 h-4 text-[#0FA4AF]" />, label: 'Travelers', value: `${order.travelers} ${order.travelers === 1 ? 'Person' : 'People'}` },
                  { icon: <CreditCard className="w-4 h-4 text-[#0FA4AF]" />, label: 'Booked On', value: order.booked },
                  { icon: <DollarSign className="w-4 h-4 text-[#964734]" />, label: 'Total Amount', value: `$${order.amount.toLocaleString()}` },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {row.icon} {row.label}
                    </div>
                    <span className={`text-sm font-semibold ${row.label === 'Total Amount' ? 'text-[#964734] text-base' : 'text-gray-900'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full mt-2 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function VendorOrders() {
  const [orderList, setOrderList] = useState(orders);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState('all');

  const filtered = orderList.filter((o) => filter === 'all' || o.status === filter);

  const handleView = (order: Order) => { setSelected(order); setViewModal(true); };
  const handleConfirm = (order: Order) => { setSelected(order); setConfirmPopup(true); };
  const doConfirm = () => {
    if (!selected) return;
    setOrderList((prev) => prev.map((o) => o.id === selected.id ? { ...o, status: 'confirmed', paymentStatus: 'paid' } : o));
    setSuccessPopup(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">Orders</h1>
        <p className="text-gray-500 mt-1">{orderList.length} total orders</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orderList.length, color: 'bg-orange-50 text-orange-600' },
          { label: 'Confirmed', value: orderList.filter((o) => o.status === 'confirmed').length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Pending', value: orderList.filter((o) => o.status === 'pending').length, color: 'bg-amber-50 text-amber-600' },
          { label: 'Revenue', value: `$${orderList.filter((o) => o.status !== 'cancelled').reduce((a, o) => a + o.amount, 0).toLocaleString()}`, color: 'bg-blue-50 text-blue-600' },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.color} border border-transparent`}>
            <div className="text-2xl font-bold font-display">{s.value}</div>
            <div className="text-sm mt-0.5 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'}`}>
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 border-b border-orange-100">
              <tr>
                {['Order ID', 'Package', 'Traveler', 'Travel Date', 'Travelers', 'Amount', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-gray-400">#{order.id}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{order.package}</td>
                  <td className="px-5 py-4">
                    <div className="text-gray-900">{order.traveler}</div>
                    <div className="text-xs text-gray-400">{order.email}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{order.date}</td>
                  <td className="px-5 py-4 text-gray-500">{order.travelers}</td>
                  <td className="px-5 py-4 font-bold text-gray-900">${order.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(order)}
                        className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleConfirm(order)}
                          className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-100 hover:scale-110 transition-all"
                          title="Confirm Order"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order View Modal */}
      <OrderViewModal isOpen={viewModal} onClose={() => setViewModal(false)} order={selected} />

      <Popup isOpen={confirmPopup} onClose={() => setConfirmPopup(false)} type="confirm"
        title="Confirm Order?" message={`Confirm order ${selected?.id} for ${selected?.traveler}?`}
        onConfirm={doConfirm} confirmLabel="Confirm Order" />
      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Order Confirmed!" message="The order has been confirmed. Traveler will be notified." />
    </div>
  );
}
