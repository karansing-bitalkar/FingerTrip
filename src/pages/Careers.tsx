import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Heart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const jobs = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'New York / Remote', type: 'Full-time', level: 'Senior' },
  { title: 'Product Designer (UX/UI)', dept: 'Design', location: 'Mumbai / Remote', type: 'Full-time', level: 'Mid-Senior' },
  { title: 'Vendor Partnership Manager', dept: 'Business Development', location: 'Dubai / Remote', type: 'Full-time', level: 'Senior' },
  { title: 'Data Scientist', dept: 'Engineering', location: 'Remote', type: 'Full-time', level: 'Mid-Senior' },
  { title: 'Travel Content Writer', dept: 'Marketing', location: 'Remote', type: 'Full-time', level: 'Junior-Mid' },
  { title: 'Customer Success Manager', dept: 'Operations', location: 'New York', type: 'Full-time', level: 'Mid' },
  { title: 'iOS Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time', level: 'Senior' },
  { title: 'Marketing Manager — SEO', dept: 'Marketing', location: 'Remote', type: 'Full-time', level: 'Mid-Senior' },
];

const perks = [
  { icon: '✈️', title: 'Free Travel Credits', desc: '$5,000 annual travel credits for employees to explore FingerTrip destinations' },
  { icon: '🏠', title: 'Remote First', desc: 'Work from anywhere in the world — we\'re fully remote-friendly with co-working allowances' },
  { icon: '📈', title: 'Equity', desc: 'Competitive equity packages so you share in FingerTrip\'s growth and success' },
  { icon: '🏥', title: 'Health Benefits', desc: 'Comprehensive health, dental, and vision insurance for you and your family' },
  { icon: '📚', title: 'Learning Budget', desc: '$2,000 annual budget for courses, conferences, and professional development' },
  { icon: '🌴', title: 'Unlimited PTO', desc: 'We trust our team. Take the time you need to recharge and travel the world' },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Briefcase className="w-14 h-14 text-white/80 mx-auto mb-5" />
            <h1 className="text-5xl lg:text-6xl font-bold text-white font-display mb-5">
              Build the Future<br />of <span className="text-amber-300">Travel</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
              Join our global team of 200+ passionate travelers, engineers, and creators building the world's best travel platform.
            </p>
            <a href="#jobs" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-lg hover:bg-orange-50 transition-colors text-lg">
              View Open Positions <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-4 flex items-center justify-center gap-2">
              Why FingerTrip? <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            </h2>
            <p className="text-gray-500">We take care of our team so they can take care of our travelers</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk, i) => (
              <motion.div key={perk.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-orange-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{perk.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="py-16 px-4 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Open Positions</h2>
            <p className="text-gray-500 mt-2">{jobs.length} positions across all departments</p>
          </motion.div>
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-orange-50 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                    <span>{job.dept}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">{job.level}</span>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-xl hover:shadow-md transition-all">
                    Apply <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
