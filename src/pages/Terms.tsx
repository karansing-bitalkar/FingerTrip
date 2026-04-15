import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Terms() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using FingerTrip\'s website, mobile application, or services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately. FingerTrip reserves the right to update these terms with 30 days notice.' },
    { title: '2. User Accounts', content: 'You must be 18+ to create an account. You are responsible for maintaining account security and all activities under your account. FingerTrip accounts are non-transferable. We reserve the right to suspend accounts that violate our policies.' },
    { title: '3. Booking & Payments', content: 'All bookings are subject to vendor availability and confirmation. Prices are in USD unless stated otherwise and include applicable taxes. Payment is processed securely at time of booking. FingerTrip acts as an intermediary between travelers and vendors.' },
    { title: '4. Cancellation & Refund Policy', content: '30+ days before travel: Full refund. 15-29 days: 75% refund. 7-14 days: 50% refund. Less than 7 days: No refund. Force majeure events (natural disasters, pandemics, government restrictions) may qualify for full refunds at our discretion.' },
    { title: '5. Vendor Terms', content: 'Vendors must maintain valid licenses, accurate listings, and professional service standards. FingerTrip charges a platform commission of 15% on all bookings. Vendors receive payments within 7 business days after trip completion.' },
    { title: '6. Prohibited Activities', content: 'Users may not use FingerTrip for fraudulent bookings, harassment, unauthorized data collection, competitive intelligence gathering, or any activity violating applicable laws. Violations may result in immediate account termination.' },
    { title: '7. Limitation of Liability', content: 'FingerTrip is not liable for vendor service quality, travel delays, acts of nature, or events beyond our control. Our maximum liability is limited to the amount paid for the specific booking in question.' },
    { title: '8. Dispute Resolution', content: 'Disputes shall be resolved through binding arbitration under the rules of the American Arbitration Association. Class action lawsuits are waived. These terms are governed by the laws of New York State.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 font-display mb-3">Terms of Service</h1>
          <p className="text-gray-500">Last updated: April 8, 2026 · Effective: May 1, 2026</p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <h2 className="text-xl font-bold text-gray-900 font-display mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
