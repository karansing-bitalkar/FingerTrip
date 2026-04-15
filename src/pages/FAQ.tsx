import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const faqCategories = [
  {
    category: 'Bookings & Reservations',
    faqs: [
      { q: 'How do I book a package?', a: 'Select any package, click "Book Now", enter traveler details, choose payment method, and confirm. Confirmation arrives in your email within minutes.' },
      { q: 'Can I book for a group?', a: 'Yes! Select the number of travelers during booking. For groups of 6+, contact us for special group pricing. Our concierge team can customize packages for large groups.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking 2-3 months ahead for peak season (Oct-Feb) and 4-6 weeks for off-season. Some packages have blackout dates.' },
      { q: 'Can I book a custom itinerary?', a: 'Absolutely! Contact our concierge team at concierge@fingertrip.com or call us to build a fully custom trip tailored to your preferences and budget.' },
    ],
  },
  {
    category: 'Payments & Pricing',
    faqs: [
      { q: 'What payment methods are accepted?', a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, bank transfers, and UPI (for Indian travelers). All payments are secured by 256-bit SSL.' },
      { q: 'Are there hidden fees?', a: 'Never. Our prices are all-inclusive as described in each package. Taxes and service fees are shown clearly before payment. You pay exactly what you see.' },
      { q: 'Can I pay in installments?', a: 'For bookings over $2,000, we offer an EMI option with 0% interest for 3-6 months through select credit cards. Contact us to set up installment payments.' },
      { q: 'When is payment charged?', a: 'Payment is charged immediately at time of booking for most packages. For custom packages, a 30% deposit is collected upfront with the balance due 30 days before travel.' },
    ],
  },
  {
    category: 'Cancellations & Refunds',
    faqs: [
      { q: 'What is the cancellation policy?', a: '30+ days before travel: Full refund. 15-29 days: 75% refund. 7-14 days: 50% refund. Less than 7 days: No refund. Force majeure events may qualify for full refunds.' },
      { q: 'How long do refunds take?', a: 'After cancellation approval, refunds are processed within 5-7 business days. Allow up to 10 business days for the amount to appear in your original payment method.' },
      { q: 'Can I reschedule instead of cancelling?', a: 'Yes! Rescheduling is free if done 21+ days before travel. A $50 admin fee applies for changes within 7-20 days. Contact support to reschedule.' },
    ],
  },
  {
    category: 'Vendors & Packages',
    faqs: [
      { q: 'How are vendors verified?', a: "All vendors undergo license verification, background checks, quality audits, and are required to maintain comprehensive travel insurance. The 'Verified' badge means they've passed all checks." },
      { q: 'What if my vendor cancels?', a: "In the rare event a vendor cancels, you'll receive a full refund immediately plus a 10% additional credit toward your next booking. We'll also help find an alternative package." },
      { q: 'Can I request a specific vendor?', a: 'Yes! When browsing packages, you can filter by vendor or view vendor profiles. You can also contact us to book directly with your preferred partner vendor.' },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 font-display mb-4">Frequently Asked<br /><span className="text-gradient">Questions</span></h1>
          <p className="text-gray-500 text-lg">Everything you need to know about FingerTrip</p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-xl font-bold text-gray-900 font-display mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                {cat.category}
              </h2>
              <div className="space-y-2">
                {cat.faqs.map((faq, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <motion.div key={key} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <button onClick={() => toggle(key)} className="w-full flex items-center justify-between p-5 text-left hover:bg-orange-50/50 transition-colors">
                        <span className="font-semibold text-gray-900">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-orange-500 shrink-0 transition-transform ${openItems[key] ? 'rotate-180' : ''}`} />
                      </button>
                      {openItems[key] && (
                        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">{faq.a}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
