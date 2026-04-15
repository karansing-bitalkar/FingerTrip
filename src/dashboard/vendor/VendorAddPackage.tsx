import { useState } from 'react';
import { PlusCircle, X, Save, ImageIcon } from 'lucide-react';
import Popup from '@/components/features/Popup';

const categories = ['Luxury', 'Adventure', 'Wellness', 'Nature', 'City', 'Cultural'];

export default function VendorAddPackage() {
  const [form, setForm] = useState({
    title: '',
    destination: '',
    category: 'Luxury',
    duration: '',
    price: '',
    originalPrice: '',
    description: '',
    includes: [''],
    itinerary: [''],
    imageUrl: '',
  });
  const [successPopup, setSuccessPopup] = useState(false);

  const addInclude = () => setForm({ ...form, includes: [...form.includes, ''] });
  const removeInclude = (i: number) => setForm({ ...form, includes: form.includes.filter((_, idx) => idx !== i) });
  const updateInclude = (i: number, val: string) => setForm({ ...form, includes: form.includes.map((item, idx) => idx === i ? val : item) });

  const addDay = () => setForm({ ...form, itinerary: [...form.itinerary, ''] });
  const removeDay = (i: number) => setForm({ ...form, itinerary: form.itinerary.filter((_, idx) => idx !== i) });
  const updateDay = (i: number, val: string) => setForm({ ...form, itinerary: form.itinerary.map((item, idx) => idx === i ? val : item) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessPopup(true);
    setForm({ title: '', destination: '', category: 'Luxury', duration: '', price: '', originalPrice: '', description: '', includes: [''], itinerary: [''], imageUrl: '' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">Add New Package</h1>
        <p className="text-gray-500 mt-1">Create a new travel package to list on FingerTrip</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-900 font-display">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Package Title *</label>
              <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. Bali Luxury Retreat" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Destination *</label>
              <input required type="text" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. Bali, Indonesia" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Duration *</label>
              <input required type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. 7 Days / 6 Nights" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Price per Person ($) *</label>
              <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="2499" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Original Price ($)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="3199 (for discount display)" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Description *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              placeholder="Describe your package — highlight unique experiences, accommodations, and key attractions..." />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              <ImageIcon className="w-4 h-4 inline mr-1" /> Package Image URL
            </label>
            <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 font-display">Itinerary</h2>
            <button type="button" onClick={addDay} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium hover:text-orange-700">
              <PlusCircle className="w-4 h-4" /> Add Day
            </button>
          </div>
          {form.itinerary.map((day, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <input type="text" value={day} onChange={(e) => updateDay(i, e.target.value)}
                className="flex-1 px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder={`Day ${i + 1} activities...`} />
              {form.itinerary.length > 1 && (
                <button type="button" onClick={() => removeDay(i)} className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Includes */}
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 font-display">What's Included</h2>
            <button type="button" onClick={addInclude} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium hover:text-orange-700">
              <PlusCircle className="w-4 h-4" /> Add Item
            </button>
          </div>
          {form.includes.map((item, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
              <input type="text" value={item} onChange={(e) => updateInclude(i, e.target.value)}
                className="flex-1 px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. Round-trip flights" />
              {form.includes.length > 1 && (
                <button type="button" onClick={() => removeInclude(i)} className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="submit"
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-emerald-200 hover:shadow-emerald-300 hover:scale-[1.01] transition-all">
          <Save className="w-5 h-5" /> Publish Package
        </button>
      </form>

      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Package Published! 🎉"
        message="Your package has been submitted for review and will be live within 24 hours." />
    </div>
  );
}
