import { useState } from 'react';
import { Search, Eye, CheckCircle, X, Edit, Trash2, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '@/components/features/Popup';
import { toast } from 'sonner';

interface Booking {
  id: string;
  package: string;
  traveler: string;
  travelerEmail: string;
  vendor: string;
  date: string;
  travelers: number;
  amount: number;
  status: string;
  booked: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  { id: 'BK001', package: 'Maldives Luxury Escape', traveler: 'Alex Johnson', travelerEmail: 'alex@email.com', vendor: 'Azure Horizons', date: '2026-06-15', travelers: 2, amount: 9998, status: 'confirmed', booked: '2026-04-07' },
  { id: 'BK002', package: 'Bali Spiritual Retreat', traveler: 'Sarah Chen', travelerEmail: 'sarah@email.com', vendor: 'Sunrise Travels Co.', date: '2026-05-22', travelers: 2, amount: 3798, status: 'confirmed', booked: '2026-04-03' },
  { id: 'BK003', package: 'Kashmir Paradise Tour', traveler: 'Raj Patel', travelerEmail: 'raj@email.com', vendor: 'Himalayan Trails Co.', date: '2026-08-20', travelers: 4, amount: 5196, status: 'pending', booked: '2026-04-01' },
  { id: 'BK004', package: 'Swiss Alps Adventure', traveler: 'Emma Wilson', travelerEmail: 'emma@email.com', vendor: 'Alpine Dreams', date: '2026-07-10', travelers: 1, amount: 5499, status: 'confirmed', booked: '2026-03-28' },
  { id: 'BK005', package: 'Dubai Premium Tour', traveler: 'Kenji Tanaka', travelerEmail: 'kenji@email.com', vendor: 'Desert Pearl', date: '2026-09-05', travelers: 2, amount: 2799, status: 'pending', booked: '2026-03-25' },
  { id: 'BK006', package: 'Thailand Island Hopping', traveler: 'Priya Sharma', travelerEmail: 'priya@email.com', vendor: 'Thai Discovery', date: '2026-05-30', travelers: 3, amount: 1599, status: 'completed', booked: '2026-03-20' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
};

const EMPTY_FORM = { package: '', traveler: '', travelerEmail: '', vendor: '', date: '', travelers: '2', amount: '', status: 'pending' };

function BookingModal({ isOpen, onClose, title, form, setForm, onSave }: {
  isOpen: boolean; onClose: () => void; title: string;
  form: typeof EMPTY_FORM; setForm: (f: typeof EMPTY_FORM) => void; onSave: () => void;
}) {
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-7 border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Package Name *</label>
                <input type="text" value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })} className={inputClass} placeholder="e.g. Maldives Luxury Escape" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Traveler Name *</label>
                  <input type="text" value={form.traveler} onChange={(e) => setForm({ ...form, traveler: e.target.value })} className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Traveler Email</label>
                  <input type="email" value={form.travelerEmail} onChange={(e) => setForm({ ...form, travelerEmail: e.target.value })} className={inputClass} placeholder="john@email.com" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Vendor</label>
                  <input type="text" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} className={inputClass} placeholder="Vendor Name" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Travel Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Travelers</label>
                  <input type="number" min="1" value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Amount ($)</label>
                  <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass} placeholder="2499" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200">Cancel</button>
                <button onClick={onSave} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg">Save Booking</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ViewBookingModal({ isOpen, onClose, booking }: { isOpen: boolean; onClose: () => void; booking: Booking | null }) {
  return (
    <AnimatePresence>
      {isOpen && booking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900 font-display">Booking Details</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl mb-5">
              <div className="font-bold text-gray-900 text-lg">{booking.package}</div>
              <div className="text-sm text-gray-500 mt-1">Booking ID: <span className="font-mono font-semibold">#{booking.id}</span></div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize mt-2 inline-block ${statusColors[booking.status]}`}>{booking.status}</span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Traveler', value: booking.traveler },
                { label: 'Email', value: booking.travelerEmail },
                { label: 'Vendor', value: booking.vendor },
                { label: 'Travel Date', value: booking.date },
                { label: 'Travelers', value: String(booking.travelers) },
                { label: 'Amount', value: `$${booking.amount.toLocaleString()}` },
                { label: 'Booked On', value: booking.booked },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{row.label}</span>
                  <span className="text-gray-900 font-semibold">{row.value}</span>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full mt-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl">Close</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [cancelPopup, setCancelPopup] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });

  const filtered = bookings.filter((b) => {
    const matchSearch = b.package.toLowerCase().includes(search.toLowerCase()) || b.traveler.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = filtered.filter((b) => b.status !== 'cancelled').reduce((a, b) => a + b.amount, 0);

  const handleAdd = () => {
    if (!addForm.package || !addForm.traveler) return;
    const newBooking: Booking = {
      id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
      package: addForm.package,
      traveler: addForm.traveler,
      travelerEmail: addForm.travelerEmail,
      vendor: addForm.vendor,
      date: addForm.date || '2026-12-01',
      travelers: Number(addForm.travelers),
      amount: Number(addForm.amount) || 0,
      status: addForm.status,
      booked: new Date().toISOString().split('T')[0],
    };
    setBookings((prev) => [newBooking, ...prev]);
    setAddModal(false);
    setAddForm({ ...EMPTY_FORM });
    toast.success('Booking created successfully!');
  };

  const handleEdit = (b: Booking) => {
    setSelected(b);
    setEditForm({ package: b.package, traveler: b.traveler, travelerEmail: b.travelerEmail, vendor: b.vendor, date: b.date, travelers: String(b.travelers), amount: String(b.amount), status: b.status });
    setEditModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setBookings((prev) => prev.map((b) => b.id === selected.id ? { ...b, ...editForm, travelers: Number(editForm.travelers), amount: Number(editForm.amount) } : b));
    setEditModal(false);
    toast.success('Booking updated successfully!');
  };

  const handleConfirm = (b: Booking) => { setSelected(b); setConfirmPopup(true); };
  const handleCancel = (b: Booking) => { setSelected(b); setCancelPopup(true); };
  const handleDelete = (b: Booking) => { setSelected(b); setDeletePopup(true); };

  const doConfirm = () => {
    if (!selected) return;
    setBookings((prev) => prev.map((b) => b.id === selected.id ? { ...b, status: 'confirmed' } : b));
    toast.success('Booking confirmed!');
  };

  const doCancel = () => {
    if (!selected) return;
    setBookings((prev) => prev.map((b) => b.id === selected.id ? { ...b, status: 'cancelled' } : b));
    toast.success('Booking cancelled.');
  };

  const confirmDelete = () => {
    if (!selected) return;
    setBookings((prev) => prev.filter((b) => b.id !== selected.id));
    toast.success('Booking deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage all platform bookings</p>
        </div>
        <button
          onClick={() => { setAddForm({ ...EMPTY_FORM }); setAddModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl text-sm shadow-lg hover:shadow-orange-200 transition-all"
        >
          <PlusCircle className="w-4 h-4" /> Add Booking
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length, color: 'bg-orange-50 text-orange-600' },
          { label: 'Confirmed', value: bookings.filter((b) => b.status === 'confirmed').length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Pending', value: bookings.filter((b) => b.status === 'pending').length, color: 'bg-amber-50 text-amber-600' },
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'bg-blue-50 text-blue-600' },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.color}`}>
            <div className="text-2xl font-bold font-display">{s.value}</div>
            <div className="text-sm mt-0.5 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'}`}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['ID', 'Package', 'Traveler', 'Vendor', 'Date', 'Amount', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((booking) => (
                <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-gray-400">#{booking.id}</td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900 max-w-[160px] truncate">{booking.package}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-gray-900">{booking.traveler}</div>
                    <div className="text-xs text-gray-400">{booking.travelerEmail}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{booking.vendor}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{booking.date}</td>
                  <td className="px-5 py-4 font-bold text-gray-900">${booking.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => { setSelected(booking); setViewModal(true); }} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100" title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleEdit(booking)} className="w-7 h-7 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center hover:bg-orange-100" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => handleConfirm(booking)} className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-100" title="Confirm">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleCancel(booking)} className="w-7 h-7 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-100" title="Cancel">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(booking)} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BookingModal isOpen={addModal} onClose={() => setAddModal(false)} title="Create New Booking" form={addForm} setForm={setAddForm} onSave={handleAdd} />
      <BookingModal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Booking" form={editForm} setForm={setEditForm} onSave={handleSave} />
      <ViewBookingModal isOpen={viewModal} onClose={() => setViewModal(false)} booking={selected} />

      <Popup isOpen={confirmPopup} onClose={() => setConfirmPopup(false)} type="confirm"
        title="Confirm Booking?" message={`Confirm booking #${selected?.id}? The traveler will be notified.`}
        onConfirm={doConfirm} confirmLabel="Confirm" />
      <Popup isOpen={cancelPopup} onClose={() => setCancelPopup(false)} type="confirm"
        title="Cancel Booking?" message={`Cancel booking #${selected?.id}? This cannot be undone.`}
        onConfirm={doCancel} confirmLabel="Cancel Booking" />
      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Delete Booking?" message={`Permanently delete booking #${selected?.id}?`}
        onConfirm={confirmDelete} confirmLabel="Delete" />
    </div>
  );
}
