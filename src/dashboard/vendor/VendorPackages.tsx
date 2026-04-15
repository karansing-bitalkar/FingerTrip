import { useState } from 'react';
import { Edit, Trash2, Eye, PlusCircle, Search, X, MapPin, Clock, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PACKAGES } from '@/constants/data';
import Modal from '@/components/features/Modal';
import Popup from '@/components/features/Popup';
import { motion, AnimatePresence } from 'framer-motion';
import type { Package } from '@/types';

function PackageViewModal({ isOpen, onClose, pkg }: { isOpen: boolean; onClose: () => void; pkg: Package | null }) {
  return (
    <AnimatePresence>
      {isOpen && pkg && (
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
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header Image */}
            <div className="relative h-52 overflow-hidden shrink-0">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/80 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {pkg.discount > 0 && (
                <div className="absolute top-3 left-3 bg-[#964734] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {pkg.discount}% OFF
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-14">
                <h3 className="text-xl font-bold text-white font-display">{pkg.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-white/80">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#AFDDE5]" />{pkg.destination}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#AFDDE5]" />{pkg.duration}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Price & Rating */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[#964734] font-display">${pkg.price.toLocaleString()}</div>
                  {pkg.originalPrice > pkg.price && (
                    <div className="text-sm text-gray-400 line-through">${pkg.originalPrice.toLocaleString()}</div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-2 rounded-xl border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-gray-900">{pkg.rating}</span>
                  <span className="text-gray-400 text-sm">({pkg.reviews} reviews)</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex gap-2">
                <span className="bg-[#AFDDE5]/40 text-[#024950] text-xs font-semibold px-3 py-1.5 rounded-xl">{pkg.category}</span>
                {pkg.trending && <span className="bg-[#964734]/10 text-[#964734] text-xs font-semibold px-3 py-1.5 rounded-xl">🔥 Trending</span>}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-[#003135] uppercase tracking-wide mb-2">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{pkg.description}</p>
              </div>

              {/* Includes */}
              {pkg.includes && pkg.includes.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#003135] uppercase tracking-wide mb-2">What's Included</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {pkg.includes.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#003135] uppercase tracking-wide mb-2">Itinerary</h4>
                  <div className="space-y-1.5">
                    {pkg.itinerary.map((day: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-[#AFDDE5]/50 text-[#024950] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
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

export default function VendorPackages() {
  const [packages, setPackages] = useState<Package[]>(PACKAGES.slice(0, 5));
  const [search, setSearch] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [selected, setSelected] = useState<Package | null>(null);
  const [editForm, setEditForm] = useState({ title: '', price: 0, duration: '', description: '' });

  const handleEdit = (pkg: Package) => {
    setSelected(pkg);
    setEditForm({ title: pkg.title, price: pkg.price, duration: pkg.duration, description: pkg.description });
    setEditModal(true);
  };

  const handleView = (pkg: Package) => {
    setSelected(pkg);
    setViewModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setPackages((prev) => prev.map((p) => p.id === selected.id ? { ...p, ...editForm } : p));
    setEditModal(false);
    setSuccessPopup(true);
  };

  const handleDelete = (pkg: Package) => { setSelected(pkg); setDeletePopup(true); };
  const confirmDelete = () => {
    if (!selected) return;
    setPackages((prev) => prev.filter((p) => p.id !== selected.id));
    setSuccessPopup(true);
  };

  const filtered = packages.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const inputClass = "w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#003135] font-display">My Packages</h1>
          <p className="text-gray-500 mt-1">{packages.length} active packages</p>
        </div>
        <Link to="/vendor-dashboard/add-package"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl shadow-lg hover:shadow-[#0FA4AF]/25 transition-all text-sm">
          <PlusCircle className="w-4 h-4" /> Add Package
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search packages..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f0fafb] border-b border-[#AFDDE5]/40">
              <tr>
                {['Package', 'Destination', 'Duration', 'Price', 'Rating', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-[#f0fafb] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pkg.image} alt={pkg.title} className="w-10 h-10 rounded-xl object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=100&q=80'; }} />
                      <div className="font-medium text-gray-900 text-sm line-clamp-1">{pkg.title}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{pkg.destination}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{pkg.duration}</td>
                  <td className="px-5 py-4 text-sm font-bold text-[#964734]">${pkg.price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#964734]">★ {pkg.rating}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="w-8 h-8 bg-[#AFDDE5]/30 text-[#024950] rounded-lg flex items-center justify-center hover:bg-[#AFDDE5] hover:scale-110 transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleView(pkg)}
                        className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 hover:scale-110 transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg)}
                        className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400 text-sm">No packages found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package View Modal */}
      <PackageViewModal isOpen={viewModal} onClose={() => setViewModal(false)} pkg={selected} />

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Package" maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Package Title</label>
            <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Price ($)</label>
              <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Duration</label>
              <input type="text" value={editForm.duration} onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Description</label>
            <textarea rows={4} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className={`${inputClass} resize-none`} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setEditModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl hover:shadow-lg transition-all">Save Package</button>
          </div>
        </div>
      </Modal>

      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Delete Package?" message={`Delete "${selected?.title}"? This cannot be undone.`}
        onConfirm={confirmDelete} confirmLabel="Delete" />
      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Success!" message="Package has been updated successfully." />
    </div>
  );
}
