import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly (name, email, payment details), information from your use of our services (booking history, preferences, device data), and information from third-party partners (travel providers, payment processors). We use this data to operate, improve, and personalize your FingerTrip experience.' },
    { title: '2. How We Use Your Information', content: 'Your information is used to process bookings, personalize recommendations, send transactional emails, improve platform features, prevent fraud, and comply with legal obligations. We never sell your personal data to third parties for their marketing purposes.' },
    { title: '3. Data Sharing', content: 'We share data with travel vendors to fulfill your bookings, payment processors to handle transactions, analytics providers (in aggregate form), and law enforcement when legally required. All partners are bound by strict data protection agreements.' },
    { title: '4. Data Security', content: 'We implement 256-bit SSL encryption, secure payment processing via PCI-DSS compliant systems, regular security audits, and strict access controls. However, no internet transmission is 100% secure, and we encourage you to protect your account credentials.' },
    { title: '5. Cookies & Tracking', content: 'We use essential cookies for platform functionality, analytics cookies to understand usage patterns, and marketing cookies to show relevant ads. You can manage cookie preferences through your browser settings or our cookie preference center.' },
    { title: '6. Your Rights', content: 'You have the right to access, correct, delete, or export your personal data. EU/UK residents have additional rights under GDPR. To exercise these rights, contact our Data Protection Officer at privacy@fingertrip.com.' },
    { title: '7. Data Retention', content: 'We retain your account data while your account is active. Booking records are kept for 7 years for legal compliance. After account deletion, we anonymize data within 30 days except where longer retention is legally required.' },
    { title: '8. Contact Us', content: 'For privacy concerns, contact our Data Protection Officer: privacy@fingertrip.com. For general inquiries: hello@fingertrip.com. FingerTrip Inc., 350 5th Avenue, New York, NY 10118.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-[#003135]/5 to-[#AFDDE5]/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-[#AFDDE5]/40 border border-[#AFDDE5] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-[#0FA4AF]" />
          </div>
          <h1 className="text-4xl font-bold text-[#003135] font-display mb-3">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: April 8, 2026 · Effective: May 1, 2026</p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#AFDDE5]/20 border border-[#AFDDE5] rounded-2xl p-5 mb-8">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Summary:</strong> FingerTrip is committed to protecting your privacy. We collect only what we need, protect it rigorously, and never sell your personal data. This policy explains exactly what we collect, how we use it, and your rights as a user.
            </p>
          </div>
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="text-xl font-bold text-[#003135] font-display mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
