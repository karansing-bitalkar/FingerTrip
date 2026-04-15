import { useState, useMemo } from 'react';
import { Search, Edit, Trash2, UserPlus, X, ChevronLeft, ChevronRight, Calendar, Phone, MapPin, Activity, ToggleLeft, ToggleRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '@/components/features/Popup';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  joined: string;
  bookings: number;
  spent: string;
  status: string;
  phone?: string;
}

const INITIAL_USERS: User[] = [
  { id: 'U001', name: 'Alex Johnson', email: 'alex@email.com', role: 'traveler', location: 'New York, USA', joined: '2024-03-15', bookings: 8, spent: '$17,093', status: 'active', phone: '+1 555 0101' },
  { id: 'U002', name: 'Sarah Chen', email: 'sarah@email.com', role: 'traveler', location: 'London, UK', joined: '2024-01-20', bookings: 5, spent: '$12,450', status: 'active', phone: '+44 20 7946 0958' },
  { id: 'U003', name: 'Raj Patel', email: 'raj@email.com', role: 'traveler', location: 'Mumbai, India', joined: '2023-11-05', bookings: 12, spent: '$24,780', status: 'active', phone: '+91 98765 43210' },
  { id: 'U004', name: 'Emma Wilson', email: 'emma@email.com', role: 'traveler', location: 'Sydney, AU', joined: '2025-02-10', bookings: 3, spent: '$6,890', status: 'inactive', phone: '+61 2 9374 4000' },
  { id: 'U005', name: 'Kenji Tanaka', email: 'kenji@email.com', role: 'traveler', location: 'Tokyo, JP', joined: '2024-07-22', bookings: 6, spent: '$15,200', status: 'active', phone: '+81 3 1234 5678' },
  { id: 'U006', name: 'Priya Sharma', email: 'priya@email.com', role: 'traveler', location: 'Bangalore, IN', joined: '2024-05-12', bookings: 4, spent: '$8,940', status: 'active', phone: '+91 80 1234 5678' },
  { id: 'U007', name: 'Sunrise Travels Co.', email: 'vendor@fingertrip.com', role: 'vendor', location: 'Mumbai, India', joined: '2023-09-01', bookings: 184, spent: '$141,200', status: 'active', phone: '+91 22 4455 6677' },
  { id: 'U008', name: 'Marco Rossi', email: 'marco@email.com', role: 'traveler', location: 'Rome, Italy', joined: '2024-09-14', bookings: 2, spent: '$4,100', status: 'suspended', phone: '+39 06 1234 5678' },
  { id: 'U009', name: 'Mei Lin', email: 'meilin@email.com', role: 'traveler', location: 'Shanghai, CN', joined: '2025-01-03', bookings: 7, spent: '$19,450', status: 'active', phone: '+86 21 1234 5678' },
  { id: 'U010', name: 'FingerTrip Admin', email: 'admin@fingertrip.com', role: 'admin', location: 'Global', joined: '2023-01-01', bookings: 0, spent: '$0', status: 'active', phone: '+1 800 0000 000' },
];

const ACTIVITY_LOG: Record<string, string[]> = {
  U001: ['Booked Maldives Luxury Escape — Apr 7, 2026', 'Updated profile photo — Mar 20, 2026', 'Added 3 packages to wishlist — Mar 15, 2026', 'Completed Bali Spiritual Retreat — Mar 10, 2026'],
  U002: ['Booked Swiss Alps Adventure — Feb 12, 2026', 'Wrote review for Kashmir Tour — Jan 30, 2026'],
  default: ['Account created', 'Email verified', 'First login recorded'],
};

const EMPTY_FORM = { name: '', email: '', role: 'traveler', status: 'active', location: '', phone: '' };

const roleBadge: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  vendor: 'bg-emerald-100 text-emerald-700',
  traveler: 'bg-orange-100 text-orange-700',
};

const statusBadge: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-gray-100 text-gray-500',
  suspended: 'bg-red-100 text-red-600',
};

function UserFormModal({ isOpen, onClose, title, form, setForm, onSave }: {
  isOpen: boolean; onClose: () => void; title: string;
  form: typeof EMPTY_FORM; setForm: (f: typeof EMPTY_FORM) => void; onSave: () => void;
}) {
  const ic = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400';
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-7 border border-gray-100 z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Full Name *</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} placeholder="John Doe" /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email *</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={ic} placeholder="john@email.com" /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={ic} placeholder="+1 555 000 0000" /></div>
              <div><label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Location</label><input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={ic} placeholder="City, Country" /></div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={ic}>
                  <option value="traveler">Traveler</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={ic}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-5">
              <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={onSave} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">Save Changes</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── User Detail Drawer ─────────────────────────────────────────────
function UserDrawer({ user, onClose }: { user: User | null; onClose: () => void }) {
  const [drawerTab, setDrawerTab] = useState<'profile' | 'bookings' | 'activity'>('profile');

  const activityLog = user ? (ACTIVITY_LOG[user.id] || ACTIVITY_LOG.default) : [];

  const mockBookings = user ? [
    { id: `BK-${user.id}-1`, pkg: 'Maldives Luxury Escape', date: '2026-06-15', amount: '$9,998', status: 'confirmed' },
    { id: `BK-${user.id}-2`, pkg: 'Bali Spiritual Retreat', date: '2026-03-10', amount: '$1,899', status: 'completed' },
  ] : [];

  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[95] w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-5 shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white text-xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg font-display">{user.name}</h3>
                    <p className="text-purple-200 text-sm">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white capitalize`}>{user.role}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${user.status === 'active' ? 'bg-emerald-400/30 text-emerald-100' : user.status === 'suspended' ? 'bg-red-400/30 text-red-100' : 'bg-white/20 text-white/70'}`}>{user.status}</span>
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 shrink-0">
              {(['profile', 'bookings', 'activity'] as const).map(tab => (
                <button key={tab} onClick={() => setDrawerTab(tab)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${drawerTab === tab ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50/50' : 'text-gray-400 hover:text-gray-600'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {drawerTab === 'profile' && (
                <div className="space-y-3">
                  {[
                    { icon: <MapPin className="w-4 h-4 text-purple-400" />, label: 'Location', value: user.location },
                    { icon: <Phone className="w-4 h-4 text-purple-400" />, label: 'Phone', value: user.phone || 'N/A' },
                    { icon: <Calendar className="w-4 h-4 text-purple-400" />, label: 'Joined', value: user.joined },
                  ].map(row => (
                    <div key={row.label} className="flex items-center gap-3 p-3.5 bg-purple-50/50 rounded-2xl border border-purple-50">
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">{row.icon}</div>
                      <div>
                        <div className="text-[10px] text-gray-400 font-semibold uppercase">{row.label}</div>
                        <div className="text-sm font-semibold text-gray-800">{row.value}</div>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                      <div className="text-2xl font-bold text-orange-600 font-display">{user.bookings}</div>
                      <div className="text-xs text-orange-500 font-semibold mt-0.5">Total Bookings</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                      <div className="text-2xl font-bold text-emerald-600 font-display">{user.spent}</div>
                      <div className="text-xs text-emerald-500 font-semibold mt-0.5">Total Spent</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">User ID</div>
                    <div className="font-mono text-sm text-gray-700">{user.id}</div>
                  </div>
                </div>
              )}

              {drawerTab === 'bookings' && (
                <div className="space-y-3">
                  {mockBookings.map(b => (
                    <div key={b.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="font-semibold text-gray-900 text-sm">{b.pkg}</div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{b.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{b.date}</span>
                        <span className="font-bold text-[#964734]">{b.amount}</span>
                      </div>
                    </div>
                  ))}
                  {user.role === 'vendor' && (
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center text-sm text-purple-600 font-semibold">
                      Vendor manages {user.bookings} orders
                    </div>
                  )}
                </div>
              )}

              {drawerTab === 'activity' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-bold text-gray-800">Recent Activity</span>
                  </div>
                  {activityLog.map((log, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-2" />
                      <div className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-700 leading-relaxed">{log}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const ITEMS_PER_PAGE = 6;

export default function AdminUsers() {
  const [userList, setUserList] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [drawerUser, setDrawerUser] = useState<User | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => userList.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  }), [userList, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAdd = () => {
    if (!addForm.name || !addForm.email) return;
    setUserList(prev => [{ id: `U${String(prev.length + 1).padStart(3, '0')}`, ...addForm, joined: new Date().toISOString().split('T')[0], bookings: 0, spent: '$0' }, ...prev]);
    setAddModal(false); setAddForm({ ...EMPTY_FORM }); toast.success('User added!');
  };

  const handleEdit = (user: User) => {
    setSelected(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status, location: user.location, phone: user.phone || '' });
    setEditModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setUserList(prev => prev.map(u => u.id === selected.id ? { ...u, ...editForm } : u));
    setEditModal(false); toast.success('User updated!');
  };

  const handleStatusToggle = (user: User) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    setUserList(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'}.`);
  };

  const handleDelete = (user: User) => { setSelected(user); setDeletePopup(true); };
  const confirmDelete = () => {
    if (!selected) return;
    setUserList(prev => prev.filter(u => u.id !== selected.id));
    toast.success('User deleted.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Users</h1>
          <p className="text-gray-500 mt-1">{userList.length} registered users · {userList.filter(u => u.status === 'active').length} active</p>
        </div>
        <button onClick={() => { setAddForm({ ...EMPTY_FORM }); setAddModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg hover:shadow-purple-200 transition-all">
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: userList.length, color: 'bg-purple-50 text-purple-600' },
          { label: 'Active', value: userList.filter(u => u.status === 'active').length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Travelers', value: userList.filter(u => u.role === 'traveler').length, color: 'bg-orange-50 text-orange-600' },
          { label: 'Vendors', value: userList.filter(u => u.role === 'vendor').length, color: 'bg-blue-50 text-blue-600' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.color}`}>
            <div className="text-2xl font-bold font-display">{s.value}</div>
            <div className="text-sm mt-0.5 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'traveler', 'vendor', 'admin'].map(r => (
            <button key={r} onClick={() => { setRoleFilter(r); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${roleFilter === r ? 'bg-purple-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'}`}>
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[780px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['User', 'Role', 'Location', 'Joined', 'Bookings', 'Spent', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((user) => (
                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setDrawerUser(user)}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleBadge[user.role] || 'bg-gray-100 text-gray-500'}`}>{user.role}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{user.location}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{user.joined}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{user.bookings}</td>
                  <td className="px-5 py-4 font-bold text-gray-900">{user.spent}</td>
                  <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => handleStatusToggle(user)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all ${
                        user.status === 'active' ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : user.status === 'suspended' ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
                      }`}
                      title="Toggle status"
                    >
                      {user.status === 'active' ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                      <span className="capitalize">{user.status}</span>
                    </button>
                  </td>
                  <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setDrawerUser(user)} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleEdit(user)} className="w-7 h-7 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(user)} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400">No users found matching your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} users
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${page === i + 1 ? 'bg-purple-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-purple-50'}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 disabled:opacity-40 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <UserFormModal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New User" form={addForm} setForm={setAddForm} onSave={handleAdd} />
      <UserFormModal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit User" form={editForm} setForm={setEditForm} onSave={handleSave} />
      <UserDrawer user={drawerUser} onClose={() => setDrawerUser(null)} />
      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Delete User?" message={`Delete "${selected?.name}"? This cannot be undone.`}
        onConfirm={confirmDelete} confirmLabel="Delete" />
    </div>
  );
}
