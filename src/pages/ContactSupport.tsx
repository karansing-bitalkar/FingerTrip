import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Popup from '@/components/features/Popup';

export default function ContactSupport() {
  const [form, setForm] = useState({ name: '', email: '', bookingId: '', category: '', message: '', priority: 'normal' });
  const [successPopup, setSuccessPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessPopup(true);
    setForm({ name: '', email: '', bookingId: '', category: '', message: '', priority: 'normal' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-orange-600 to-amber-600">
        <div className="max-w-3xl mx-auto text-center">
          <MessageCircle className="w-14 h-14 text-white/80 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white font-display mb-3">Contact Support</h1>
          <p className="text-white/80 text-lg">Get help from our expert support team — available 24/7</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-orange-100 shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 font-display mb-6">Submit a Support Request</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Your Name *</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Booking ID</label>
                    <input type="text" value={form.bookingId} onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
                      className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. BK001234" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Priority</label>
                    <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High — Urgent</option>
                      <option value="critical">Critical — Travel in 48hrs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Issue Category *</label>
                  <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Select issue type</option>
                    <option>Booking Issue</option>
                    <option>Payment Problem</option>
                    <option>Refund Request</option>
                    <option>Package Change</option>
                    <option>Technical Error</option>
                    <option>Vendor Complaint</option>
                    <option>Account Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Describe Your Issue *</label>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Please describe your issue in detail. Include any relevant dates, booking references, or error messages..." />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all">
                  <Send className="w-5 h-5" /> Submit Support Request
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { icon: <Phone className="w-5 h-5 text-orange-500" />, title: 'Phone Support', detail: '+1 (800) 346-4378', sub: 'Mon-Sat, 9AM-9PM IST', bg: 'bg-orange-50 border-orange-100' },
              { icon: <Mail className="w-5 h-5 text-blue-500" />, title: 'Email Us', detail: 'support@fingertrip.com', sub: 'Response within 2 hours', bg: 'bg-blue-50 border-blue-100' },
              { icon: <MessageCircle className="w-5 h-5 text-emerald-500" />, title: 'Live Chat', detail: 'Start a chat session', sub: '24/7 Available', bg: 'bg-emerald-50 border-emerald-100' },
              { icon: <Clock className="w-5 h-5 text-purple-500" />, title: 'Response Time', detail: 'Under 2 hours', sub: 'For all support tickets', bg: 'bg-purple-50 border-purple-100' },
            ].map((item) => (
              <div key={item.title} className={`p-5 rounded-2xl border ${item.bg}`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">{item.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                <div className="text-gray-700 text-sm mt-1">{item.detail}</div>
                <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Request Submitted!" message="Your support ticket has been created. Expect a response within 2 hours." />
    </div>
  );
}
