import { useState } from 'react';
import { Save, Bell, Globe, CreditCard } from 'lucide-react';
import Popup from '@/components/features/Popup';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'FingerTrip',
    supportEmail: 'support@fingertrip.com',
    supportPhone: '+1 800 346-4378',
    currency: 'USD',
    timezone: 'UTC+0',
    commissionRate: '15',
    maxBookingsPerDay: '500',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoApproveVendors: false,
    twoFactorAuth: true,
  });
  const [successPopup, setSuccessPopup] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessPopup(true);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)} className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-[#0FA4AF]' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? 'left-5' : 'left-0.5'}`} />
    </button>
  );

  const inputClass = "w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-[#003135] font-display">Settings</h1>
        <p className="text-gray-500 mt-1">Configure platform-wide settings and preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
          <h2 className="flex items-center gap-2 font-bold text-[#003135] font-display mb-5">
            <Globe className="w-5 h-5 text-[#0FA4AF]" /> General Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Platform Name', key: 'siteName', type: 'text' },
              { label: 'Support Email', key: 'supportEmail', type: 'email' },
              { label: 'Support Phone', key: 'supportPhone', type: 'tel' },
              { label: 'Default Currency', key: 'currency', type: 'text' },
              { label: 'Timezone', key: 'timezone', type: 'text' },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">{f.label}</label>
                <input type={f.type} value={settings[f.key as keyof typeof settings] as string}
                  onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                  className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        {/* Business */}
        <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
          <h2 className="flex items-center gap-2 font-bold text-[#003135] font-display mb-5">
            <CreditCard className="w-5 h-5 text-[#0FA4AF]" /> Business Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Commission Rate (%)</label>
              <input type="number" value={settings.commissionRate}
                onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Max Bookings Per Day</label>
              <input type="number" value={settings.maxBookingsPerDay}
                onChange={(e) => setSettings({ ...settings, maxBookingsPerDay: e.target.value })}
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm p-6">
          <h2 className="flex items-center gap-2 font-bold text-[#003135] font-display mb-5">
            <Bell className="w-5 h-5 text-[#0FA4AF]" /> Notifications & Security
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Send system alerts via email', key: 'emailNotifications' },
              { label: 'SMS Notifications', desc: 'Send critical alerts via SMS', key: 'smsNotifications' },
              { label: 'Auto-Approve Vendors', desc: 'Skip manual review for new vendors', key: 'autoApproveVendors' },
              { label: '2-Factor Authentication', desc: 'Require 2FA for admin accounts', key: 'twoFactorAuth' },
              { label: 'Maintenance Mode', desc: 'Take platform offline for maintenance', key: 'maintenanceMode' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </div>
                <Toggle value={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(v) => setSettings({ ...settings, [item.key]: v })} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl shadow-lg hover:shadow-[#0FA4AF]/30 transition-all">
          <Save className="w-5 h-5" /> Save Settings
        </button>
      </form>

      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Settings Saved!" message="Platform settings have been updated successfully." />
    </div>
  );
}
