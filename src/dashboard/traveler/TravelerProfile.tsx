import { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Lock, Eye, EyeOff, CheckCircle, Globe, FileText } from 'lucide-react';
import { getStoredUser, storeUser } from '@/hooks/useAuth';
import { toast } from 'sonner';

function getPasswordStrength(password: string): { score: number; label: string; color: string; barColor: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Very Weak', color: 'text-red-500', barColor: 'bg-red-500' };
  if (score === 2) return { score, label: 'Weak', color: 'text-orange-400', barColor: 'bg-orange-400' };
  if (score === 3) return { score, label: 'Fair', color: 'text-amber-500', barColor: 'bg-amber-400' };
  if (score === 4) return { score, label: 'Strong', color: 'text-emerald-500', barColor: 'bg-emerald-400' };
  return { score, label: 'Very Strong', color: 'text-emerald-600', barColor: 'bg-emerald-600' };
}

const TABS = ['Personal Info', 'Change Password', 'Notifications'];

const EMAIL_PREFS_DEFAULT = {
  bookingConfirmations: true,
  tripReminders: true,
  paymentReceipts: true,
  reviewRequests: true,
  specialOffers: false,
  newsletter: false,
};

export default function TravelerProfile() {
  const user = getStoredUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: 'Passionate traveler exploring the world one destination at a time. Love adventure, culture, and authentic local experiences.',
    passport: 'A12345678',
    nationality: 'American',
    emergencyContact: '+1 555 999 0000',
  });

  const [emailPrefs, setEmailPrefs] = useState(EMAIL_PREFS_DEFAULT);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getPasswordStrength(pwForm.newPw);
  const pwReqs = [
    { met: pwForm.newPw.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(pwForm.newPw), text: 'One uppercase letter' },
    { met: /[0-9]/.test(pwForm.newPw), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(pwForm.newPw), text: 'One special character' },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setAvatarPreview(result);
      toast.success('Avatar preview updated — save to apply.');
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      storeUser({ ...user, name: form.name, phone: form.phone, location: form.location, avatar: avatarPreview || undefined });
    }
    toast.success('Profile updated successfully!');
  };

  const handlePrefsSave = () => {
    toast.success('Email notification preferences saved!');
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwForm.current) { toast.error('Please enter your current password.'); return; }
    if (pwForm.newPw !== pwForm.confirm) { toast.error('New passwords do not match.'); return; }
    if (strength.score < 3) { toast.error('Password is too weak — please choose a stronger one.'); return; }
    toast.success('Password changed successfully!');
    setPwForm({ current: '', newPw: '', confirm: '' });
  };

  const inputClass = 'w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition';
  const iconInputClass = 'w-full pl-10 pr-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition';

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information and account security</p>
      </div>

      {/* Avatar Card */}
      <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-orange-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-3xl font-bold select-none">
                {form.name.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg"
              title="Upload avatar"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">{form.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-full capitalize font-medium">{user?.role}</span>
              <span className="text-xs text-gray-400">Member since {user?.joinedDate || '2024'}</span>
            </div>
          </div>
          <div className="ml-auto hidden sm:block">
            <div className="text-right text-xs text-gray-400 mb-1">Click camera to upload</div>
            <div className="text-right text-xs text-gray-300">JPG, PNG, WebP · Max 5MB</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === i ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Info Tab */}
      {activeTab === 0 && (
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-6">Personal Information</h2>
          <form onSubmit={handleProfileSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={iconInputClass} placeholder="Your full name" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input type="email" value={form.email} disabled
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-400 cursor-not-allowed" />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Email cannot be changed here</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={iconInputClass} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={iconInputClass} placeholder="City, Country" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Nationality</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                    className={iconInputClass} placeholder="e.g. American" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Emergency Contact</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                    className={iconInputClass} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Passport Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.passport} onChange={(e) => setForm({ ...form, passport: e.target.value })}
                    className={iconInputClass} placeholder="e.g. A12345678" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Bio</label>
                <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className={`${inputClass} resize-none`} placeholder="Tell us a bit about yourself..." />
              </div>
            </div>
            <button type="submit"
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Notifications Preferences Tab */}
      {activeTab === 2 && (
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-1">Email Notification Preferences</h2>
          <p className="text-gray-400 text-sm mb-6">Choose which emails you'd like to receive from FingerTrip.</p>
          <div className="space-y-3">
            {[
              { key: 'bookingConfirmations', label: 'Booking Confirmations', desc: 'Receive confirmation emails whenever a booking is placed or updated.', icon: '✅' },
              { key: 'tripReminders', label: 'Trip Reminders', desc: 'Get reminders 7 days and 1 day before your scheduled trip.', icon: '🔔' },
              { key: 'paymentReceipts', label: 'Payment Receipts', desc: 'Receive a receipt email for every successful payment.', icon: '🧾' },
              { key: 'reviewRequests', label: 'Review Requests', desc: 'After a completed trip, we will ask you to share your experience.', icon: '⭐' },
              { key: 'specialOffers', label: 'Special Offers & Deals', desc: 'Be the first to know about exclusive discounts and limited-time packages.', icon: '🎁' },
              { key: 'newsletter', label: 'FingerTrip Newsletter', desc: 'Monthly travel inspiration, destination guides, and platform updates.', icon: '📰' },
            ].map(({ key, label, desc, icon }) => {
              const checked = emailPrefs[key as keyof typeof emailPrefs];
              return (
                <label key={key} className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checked ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-100 hover:border-orange-100'}` }>
                  <div className="flex items-center h-6 mt-0.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setEmailPrefs((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base">{icon}</span>
                      <span className="font-semibold text-gray-900 text-sm">{label}</span>
                      {checked && <span className="text-[10px] text-orange-600 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">ON</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </label>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-5 border-t border-orange-50">
            <button
              onClick={handlePrefsSave}
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
            <button
              type="button"
              onClick={() => setEmailPrefs(EMAIL_PREFS_DEFAULT)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      )}

      {/* Change Password Tab */}
      {activeTab === 1 && (
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-2">Change Password</h2>
          <p className="text-gray-400 text-sm mb-6">Choose a strong password to keep your account secure.</p>
          <form onSubmit={handlePasswordSave} className="space-y-5 max-w-md">
            {/* Current Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Current Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showCurrent ? 'text' : 'password'} required
                  value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your current password"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-orange-500 transition-colors">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showNew ? 'text' : 'password'} required
                  value={pwForm.newPw} onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Choose a strong password"
                />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-orange-500 transition-colors">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength Meter */}
              {pwForm.newPw.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Password strength</span>
                    <span className={`text-xs font-semibold ${strength.color}`}>{strength.label}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          s <= strength.score ? strength.barColor : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                    {pwReqs.map((req) => (
                      <div key={req.text} className={`flex items-center gap-1.5 text-[11px] ${req.met ? 'text-emerald-600' : 'text-gray-400'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${req.met ? 'bg-emerald-100 border-emerald-400' : 'border-gray-200'}`}>
                          {req.met && <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />}
                        </div>
                        {req.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Confirm New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'} required
                  value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 bg-orange-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
                    pwForm.confirm.length > 0
                      ? pwForm.newPw === pwForm.confirm
                        ? 'border-emerald-400 focus:ring-emerald-400/40'
                        : 'border-red-300 focus:ring-red-400/30'
                      : 'border-orange-100 focus:ring-orange-400'
                  }`}
                  placeholder="Re-enter new password"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-orange-500 transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pwForm.confirm.length > 0 && pwForm.newPw === pwForm.confirm && (
                <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Passwords match
                </p>
              )}
              {pwForm.confirm.length > 0 && pwForm.newPw !== pwForm.confirm && (
                <p className="text-xs text-red-500 mt-1.5">Passwords do not match</p>
              )}
            </div>

            <button type="submit"
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all">
              <Lock className="w-4 h-4" /> Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
