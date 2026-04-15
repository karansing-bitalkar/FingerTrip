import { useState } from 'react';
import { Search, Edit, Trash2, UserPlus, Eye, X } from 'lucide-react';
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
];

const EMPTY_FORM = { name: '', email: '', role: 'traveler', status: 'active', location: '', phone: '' };

function UserModal({ isOpen, onClose, title, form, setForm, onSave }: {
  isOpen: boolean; onClose: () => void; title: string;
  form: typeof EMPTY_FORM; setForm: (f: typeof EMPTY_FORM) => void; onSave: () => void;
}) {
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-7 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="john@email.com" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+1 555 000 0000" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Location</label>
                  <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} placeholder="City, Country" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Role</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
                    <option value="traveler">Traveler</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={onSave} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">Save Changes</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ViewModal({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: User | null }) {
  return (
    <AnimatePresence>
      {isOpen && user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">User Details</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-4 mb-6 p-4 bg-purple-50 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize mt-1 inline-block ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'vendor' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{user.role}</span>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'User ID', value: user.id },
                { label: 'Location', value: user.location },
                { label: 'Phone', value: user.phone || 'N/A' },
                { label: 'Joined', value: user.joined },
                { label: 'Bookings', value: String(user.bookings) },
                { label: 'Total Spent', value: user.spent },
                { label: 'Status', value: user.status },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{row.label}</span>
                  <span className="text-gray-900 font-semibold capitalize">{row.value}</span>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full mt-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl">Close</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminUsers() {
  const [userList, setUserList] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });

  const filtered = userList.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAdd = () => {
    if (!addForm.name || !addForm.email) return;
    const newUser: User = {
      id: `U${String(userList.length + 1).padStart(3, '0')}`,
      ...addForm,
      joined: new Date().toISOString().split('T')[0],
      bookings: 0,
      spent: '$0',
    };
    setUserList((prev) => [newUser, ...prev]);
    setAddModal(false);
    setAddForm({ ...EMPTY_FORM });
    toast.success('User added successfully!');
  };

  const handleEdit = (user: User) => {
    setSelected(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status, location: user.location, phone: user.phone || '' });
    setEditModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setUserList((prev) => prev.map((u) => u.id === selected.id ? { ...u, ...editForm } : u));
    setEditModal(false);
    toast.success('User updated successfully!');
  };

  const handleView = (user: User) => { setSelected(user); setViewModal(true); };
  const handleDelete = (user: User) => { setSelected(user); setDeletePopup(true); };
  const confirmDelete = () => {
    if (!selected) return;
    setUserList((prev) => prev.filter((u) => u.id !== selected.id));
    toast.success('User deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Users</h1>
          <p className="text-gray-500 mt-1">{userList.length} registered users on platform</p>
        </div>
        <button
          onClick={() => { setAddForm({ ...EMPTY_FORM }); setAddModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg hover:shadow-purple-200 transition-all"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: userList.length, color: 'bg-purple-50 text-purple-600' },
          { label: 'Active', value: userList.filter((u) => u.status === 'active').length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Travelers', value: userList.filter((u) => u.role === 'traveler').length, color: 'bg-orange-50 text-orange-600' },
          { label: 'Vendors', value: userList.filter((u) => u.role === 'vendor').length, color: 'bg-blue-50 text-blue-600' },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.color} border border-transparent`}>
            <div className="text-2xl font-bold font-display">{s.value}</div>
            <div className="text-sm mt-0.5 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'traveler', 'vendor', 'admin'].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${roleFilter === r ? 'bg-purple-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'}`}>
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['User', 'Role', 'Location', 'Joined', 'Bookings', 'Total Spent', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => (
                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/50 transition-colors">
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
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'vendor' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{user.role}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{user.location}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{user.joined}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{user.bookings}</td>
                  <td className="px-5 py-4 font-bold text-gray-900">{user.spent}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : user.status === 'suspended' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{user.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleView(user)} className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors" title="View">
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
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UserModal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New User" form={addForm} setForm={setAddForm} onSave={handleAdd} />
      <UserModal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit User" form={editForm} setForm={setEditForm} onSave={handleSave} />
      <ViewModal isOpen={viewModal} onClose={() => setViewModal(false)} user={selected} />

      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Delete User?" message={`Delete "${selected?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete} confirmLabel="Delete" />
    </div>
  );
}
