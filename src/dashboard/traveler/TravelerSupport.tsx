import { useState } from 'react';
import { MessageSquare, Send, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import Popup from '@/components/features/Popup';

const tickets = [
  { id: 'TK001', subject: 'Maldives booking confirmation delay', status: 'resolved', date: '2026-04-01', priority: 'high' },
  { id: 'TK002', subject: 'Request to add extra traveler to Kashmir trip', status: 'open', date: '2026-03-28', priority: 'medium' },
  { id: 'TK003', subject: 'Invoice required for tax purposes', status: 'resolved', date: '2026-03-15', priority: 'low' },
];

const faqs = [
  { q: 'How do I modify my booking?', a: 'Go to My Bookings, click the Edit button on your booking, make your changes, and save. Changes are reflected immediately.' },
  { q: 'What is the cancellation policy?', a: '30+ days: Full refund. 15-29 days: 75% refund. 7-14 days: 50% refund. Less than 7 days: No refund (except force majeure).' },
  { q: 'How long does refund take?', a: 'Refunds are processed within 5-7 business days and appear in your original payment method within 10 business days.' },
  { q: 'Can I transfer my booking?', a: 'Bookings can be transferred to another traveler up to 14 days before the trip. Contact support with both traveler details.' },
];

export default function TravelerSupport() {
  const [form, setForm] = useState({ subject: '', priority: 'medium', message: '' });
  const [successPopup, setSuccessPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessPopup(true);
    setForm({ subject: '', priority: 'medium', message: '' });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">Support Center</h1>
        <p className="text-gray-500 mt-1">Get help from our travel experts</p>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Phone className="w-5 h-5 text-orange-500" />, title: 'Call Us', value: '+1 800 FINGER-TRIP', sub: 'Mon-Sat 9AM-9PM', bg: 'bg-orange-50 border-orange-100' },
          { icon: <Mail className="w-5 h-5 text-blue-500" />, title: 'Email', value: 'support@fingertrip.com', sub: 'Response within 2 hours', bg: 'bg-blue-50 border-blue-100' },
          { icon: <MessageSquare className="w-5 h-5 text-emerald-500" />, title: 'Live Chat', value: 'Chat with an agent', sub: '24/7 Available', bg: 'bg-emerald-50 border-emerald-100' },
        ].map((c) => (
          <div key={c.title} className={`p-5 rounded-2xl border ${c.bg}`}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">{c.icon}</div>
            <div className="font-bold text-gray-900 text-sm">{c.title}</div>
            <div className="text-gray-700 text-sm mt-1">{c.value}</div>
            <div className="text-gray-400 text-xs mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submit Ticket */}
        <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Submit a Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Subject</label>
              <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High — Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                placeholder="Describe your issue in detail..." />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all">
              <Send className="w-4 h-4" /> Submit Ticket
            </button>
          </form>
        </div>

        {/* Recent Tickets & FAQ */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 font-display mb-4">My Tickets</h2>
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 bg-orange-50/50 rounded-xl border border-orange-50">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{ticket.subject}</div>
                    <div className="text-xs text-gray-400 mt-0.5">#{ticket.id} · {ticket.date}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-orange-50 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 font-display mb-4">Quick FAQs</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-orange-50/50 transition-colors">
                    <span className="text-sm font-medium text-gray-900">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-orange-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Ticket Submitted!" message="Your support ticket has been received. We'll respond within 2 hours." />
    </div>
  );
}
