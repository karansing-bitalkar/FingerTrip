import { useState } from 'react';
import { CheckCircle, X, Eye, Search, Edit, Trash2, Building2, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VENDORS } from '@/constants/data';
import Popup from '@/components/features/Popup';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  name: string;
  logo: string;
  location: string;
  packages: number;
  rating: number;
  reviews: number;
  verified: boolean;
  specialties: string[];
  description: string;
  status: 'active' | 'suspended' | 'pending';
  email?: string;
}

const INITIAL_VENDORS: Vendor[] = VENDORS.map((v, i) => ({
  ...v,
  status: 'active' as const,
  email: `vendor${i + 1}@fingertrip.com`,
}));

const EMPTY_FORM = { name: '', email: '', location: '', specialties: '', description: '', status: 'active' as const };

function VendorFormModal({ isOpen, onClose, title, form, setForm, onSave }: {
  isOpen: boolean; onClose: () => void; title: string;
  form: typeof EMPTY_FORM; setForm: (f: typeof EMPTY_FORM) => void; onSave: () => void;
}) {
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400";
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-7 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Company Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Acme Travels" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="vendor@email.com" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Location</label>
                  <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} placeholder="City, Country" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Vendor['status'] })} className={inputClass}>
                    <option value="active">Active</option>
                    <option value="pending">Pending Verification</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Specialties</label>
                <input type="text" value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} className={inputClass} placeholder="Luxury Beach, Wellness Retreats, ..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} placeholder="Brief company description..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200">Cancel</button>
                <button onClick={onSave} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg">Save Vendor</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ViewVendorModal({ isOpen, onClose, vendor }: { isOpen: boolean; onClose: () => void; vendor: Vendor | null }) {
  return (
    <AnimatePresence>
      {isOpen && vendor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900 font-display">Vendor Details</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl mb-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-emerald-100 shrink-0">
                <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{vendor.name}</div>
                <div className="text-sm text-gray-500">{vendor.location}</div>
                <div className="flex gap-2 mt-1">
                  {vendor.verified && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" />Verified</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${vendor.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{vendor.status}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm mb-5">
              {[
                { label: 'Packages', value: String(vendor.packages) },
                { label: 'Rating', value: `${vendor.rating}★ (${vendor.reviews.toLocaleString()} reviews)` },
                { label: 'Specialties', value: vendor.specialties.join(', ') },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{row.label}</span>
                  <span className="text-gray-900 font-semibold text-right max-w-[200px]">{row.value}</span>
                </div>
              ))}
              <div className="py-2">
                <div className="text-gray-400 font-medium mb-1">Description</div>
                <p className="text-gray-600 text-xs leading-relaxed">{vendor.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl">Close</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [suspendPopup, setSuspendPopup] = useState(false);
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });

  const filtered = vendors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    if (!addForm.name) return;
    const newVendor: Vendor = {
      id: `V${Date.now()}`,
      name: addForm.name,
      logo: `https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&q=80`,
      location: addForm.location,
      packages: 0,
      rating: 0,
      reviews: 0,
      verified: false,
      specialties: addForm.specialties.split(',').map((s) => s.trim()).filter(Boolean),
      description: addForm.description,
      status: addForm.status,
      email: addForm.email,
    };
    setVendors((prev) => [newVendor, ...prev]);
    setAddModal(false);
    setAddForm({ ...EMPTY_FORM });
    toast.success('Vendor added successfully!');
  };

  const handleEdit = (v: Vendor) => {
    setSelected(v);
    setEditForm({ name: v.name, email: v.email || '', location: v.location, specialties: v.specialties.join(', '), description: v.description, status: v.status });
    setEditModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setVendors((prev) => prev.map((v) => v.id === selected.id ? { ...v, ...editForm, specialties: editForm.specialties.split(',').map((s) => s.trim()) } : v));
    setEditModal(false);
    toast.success('Vendor updated successfully!');
  };

  const handleView = (v: Vendor) => { setSelected(v); setViewModal(true); };
  const handleDelete = (v: Vendor) => { setSelected(v); setDeletePopup(true); };
  const handleSuspend = (v: Vendor) => { setSelected(v); setSuspendPopup(true); };

  const confirmDelete = () => {
    if (!selected) return;
    setVendors((prev) => prev.filter((v) => v.id !== selected.id));
    toast.success('Vendor removed from platform.');
  };

  const doSuspend = () => {
    if (!selected) return;
    setVendors((prev) => prev.map((v) => v.id === selected.id ? { ...v, status: 'suspended' as const } : v));
    toast.success(`${selected.name} has been suspended.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Vendors</h1>
          <p className="text-gray-500 mt-1">{vendors.length} vendors on platform</p>
        </div>
        <button
          onClick={() => { setAddForm({ ...EMPTY_FORM }); setAddModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl text-sm shadow-lg hover:shadow-emerald-200 transition-all"
        >
          <PlusCircle className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Vendors', value: vendors.length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Active', value: vendors.filter((v) => v.status === 'active').length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Pending', value: vendors.filter((v) => v.status === 'pending').length, color: 'bg-amber-50 text-amber-600' },
          { label: 'Suspended', value: vendors.filter((v) => v.status === 'suspended').length, color: 'bg-red-50 text-red-600' },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.color}`}>
            <div className="text-2xl font-bold font-display">{s.value}</div>
            <div className="text-sm mt-0.5 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search vendors..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'suspended'].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${statusFilter === s ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((vendor) => (
          <motion.div key={vendor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden shrink-0">
                  <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover opacity-70" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{vendor.name}</h3>
                  <p className="text-xs text-gray-400">{vendor.location}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${vendor.status === 'active' ? 'bg-emerald-100 text-emerald-700' : vendor.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                {vendor.status}
              </span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {vendor.verified && <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" />Verified</span>}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-emerald-50 rounded-xl p-2">
                <div className="font-bold text-emerald-600 text-sm">{vendor.packages}</div>
                <div className="text-xs text-gray-400">Packages</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-2">
                <div className="font-bold text-amber-600 text-sm">{vendor.rating > 0 ? `${vendor.rating}★` : 'New'}</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-2">
                <div className="font-bold text-blue-600 text-sm">{vendor.reviews > 0 ? `${(vendor.reviews / 1000).toFixed(1)}k` : '0'}</div>
                <div className="text-xs text-gray-400">Reviews</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => handleView(vendor)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 text-xs font-medium rounded-xl hover:bg-blue-100 transition-colors" title="View">
                <Eye className="w-3.5 h-3.5" /> View
              </button>
              <button onClick={() => handleEdit(vendor)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-xl hover:bg-emerald-100 transition-colors" title="Edit">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              {vendor.status === 'active' && (
                <button onClick={() => handleSuspend(vendor)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-amber-50 text-amber-600 text-xs font-medium rounded-xl hover:bg-amber-100 transition-colors">
                  <X className="w-3.5 h-3.5" /> Suspend
                </button>
              )}
              <button onClick={() => handleDelete(vendor)} className="w-8 h-8 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <VendorFormModal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New Vendor" form={addForm} setForm={setAddForm} onSave={handleAdd} />
      <VendorFormModal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Vendor" form={editForm} setForm={setEditForm} onSave={handleSave} />
      <ViewVendorModal isOpen={viewModal} onClose={() => setViewModal(false)} vendor={selected} />

      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Remove Vendor?" message={`Remove "${selected?.name}" from the platform? All their packages will be unlisted.`}
        onConfirm={confirmDelete} confirmLabel="Remove" />
      <Popup isOpen={suspendPopup} onClose={() => setSuspendPopup(false)} type="confirm"
        title="Suspend Vendor?" message={`Suspend "${selected?.name}"? They won't be able to list new packages.`}
        onConfirm={doSuspend} confirmLabel="Suspend" />
    </div>
  );
}
