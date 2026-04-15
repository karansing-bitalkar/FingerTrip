import { useState } from 'react';
import { Save, Camera } from 'lucide-react';
import { getStoredUser, storeUser } from '@/hooks/useAuth';
import Popup from '@/components/features/Popup';

export default function VendorProfile() {
  const user = getStoredUser();
  const [form, setForm] = useState({
    companyName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91 22 4455 6677',
    location: user?.location || 'Mumbai, India',
    website: 'https://sunrisetravels.com',
    description: 'Sunrise Travels Co. specializes in curated Bali and Southeast Asia experiences. With 12 years of expertise, we craft transformative wellness and adventure journeys that connect travelers with authentic local culture.',
    established: '2012',
    licenseNo: 'IATA-2012-MH-00234',
    specialties: 'Wellness Retreats, Island Hopping, Spiritual Tours',
  });
  const [successPopup, setSuccessPopup] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) storeUser({ ...user, name: form.companyName, phone: form.phone, location: form.location });
    setSuccessPopup(true);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">Vendor Profile</h1>
        <p className="text-gray-500 mt-1">Manage your company information and branding</p>
      </div>

      {/* Company Header */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
              {form.companyName.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 shadow-md">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">{form.companyName}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">✅ Verified Vendor</span>
              <span className="text-xs text-gray-400">Since {form.established}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 font-display mb-6">Company Information</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Company Name</label>
              <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Website</label>
              <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">License No.</label>
              <input type="text" value={form.licenseNo} onChange={(e) => setForm({ ...form, licenseNo: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Year Established</label>
              <input type="text" value={form.established} onChange={(e) => setForm({ ...form, established: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Specialties</label>
            <input type="text" value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. Luxury Beach, Wellness Retreats, Adventure" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Company Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>
          <button type="submit" className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-100 hover:shadow-emerald-200 transition-all">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </form>
      </div>

      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Profile Updated!" message="Your vendor profile has been saved successfully." />
    </div>
  );
}
