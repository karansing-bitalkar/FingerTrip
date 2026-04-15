import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Building2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Popup from '@/components/features/Popup';

const contactInfo = [
  { icon: <Phone className="w-5 h-5" />, title: 'Phone Support', detail: '+1 (800) 346-4378', sub: 'Mon–Sat, 9AM–9PM IST', color: 'bg-orange-50 text-orange-500' },
  { icon: <Mail className="w-5 h-5" />, title: 'Email Us', detail: 'hello@fingertrip.com', sub: 'We reply within 2 hours', color: 'bg-amber-50 text-amber-500' },
  { icon: <MessageCircle className="w-5 h-5" />, title: 'Live Chat', detail: 'Chat with our team', sub: '24/7 Available', color: 'bg-emerald-50 text-emerald-500' },
  { icon: <MapPin className="w-5 h-5" />, title: 'Office', detail: '350 5th Ave, New York', sub: 'Also in Mumbai & Dubai', color: 'bg-blue-50 text-blue-500' },
];

const officeLocations = [
  { city: 'New York', address: '350 5th Avenue, Suite 4200, New York, NY 10118', phone: '+1 (212) 555-0100', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
  { city: 'Mumbai', address: 'Bandra Kurla Complex, Mumbai 400 051, India', phone: '+91 22 6655 7788', img: 'https://images.unsplash.com/photo-1566836610593-62a64888a216?w=400&q=80' },
  { city: 'Dubai', address: 'Dubai Design District, Block 6, Dubai, UAE', phone: '+971 4 555 8890', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
];

const faqs = [
  { q: 'How do I make a booking?', a: 'Simply search your destination, select a package, and complete the booking form. You will receive confirmation within minutes.' },
  { q: 'What is your cancellation policy?', a: 'Cancellations made 30+ days before travel receive a full refund. 15–29 days: 75% refund. 7–14 days: 50% refund.' },
  { q: 'Are all vendors verified?', a: 'Yes, every vendor on FingerTrip goes through a rigorous verification process including license checks, background verification, and quality audits.' },
  { q: 'Can I customize a package?', a: 'Absolutely! Contact our concierge team to create a fully personalized itinerary tailored to your preferences and budget.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [popup, setPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPopup(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-orange-600 bg-orange-100 border border-orange-200 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Headphones className="w-4 h-4" /> 24/7 Support Available
            </span>
            <h1 className="text-5xl font-bold text-gray-900 font-display mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Our travel experts are ready to help you plan the perfect journey. Reach out any way you prefer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 -mt-6 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <motion.div key={info.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>{info.icon}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{info.title}</h3>
              <p className="text-gray-700 text-sm font-medium">{info.detail}</p>
              <p className="text-gray-400 text-xs mt-1">{info.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white rounded-3xl border border-orange-100 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-7">We typically respond within 2 business hours.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email Address *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Subject *</label>
                <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option value="">Select a topic</option>
                  <option>Booking Inquiry</option>
                  <option>Package Customization</option>
                  <option>Vendor Partnership</option>
                  <option>Technical Support</option>
                  <option>Refund & Cancellation</option>
                  <option>General Question</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Message *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  placeholder="Tell us how we can help you..." />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] transition-all">
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-7">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-10">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-orange-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <h2 className="text-xl font-bold text-gray-900 font-display mb-5">Our Offices</h2>
            <div className="space-y-4">
              {officeLocations.map((office) => (
                <div key={office.city} className="flex gap-4 p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
                  <img src={office.img} alt={office.city} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-orange-500" />
                      <span className="font-bold text-gray-900 text-sm">{office.city}</span>
                    </div>
                    <p className="text-gray-500 text-xs">{office.address}</p>
                    <p className="text-orange-600 text-xs font-medium mt-1">{office.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <Popup isOpen={popup} onClose={() => setPopup(false)} type="success"
        title="Message Sent!" message="Thank you for reaching out! Our team will get back to you within 2 business hours." />
    </div>
  );
}
