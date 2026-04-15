import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Search } from 'lucide-react';

const destinations = ['Bali', 'Switzerland', 'Kashmir', 'Dubai', 'Thailand', 'Maldives', 'Goa', 'Paris', 'Tokyo', 'New York'];

export default function SearchBar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: '',
    date: '',
    travelers: '2',
    budget: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/packages');
  };

  return (
    <section className="relative z-20 -mt-20 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl shadow-[#003135]/15 border border-[#AFDDE5]/50 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-[#003135] font-display mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-[#0FA4AF]" />
            Find Your Perfect Journey
          </h2>
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#964734]" /> Destination
                </label>
                <div className="relative">
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Where to go?</option>
                    {destinations.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#964734]" /> Travel Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3.5 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 focus:border-transparent"
                />
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#964734]" /> Travelers
                </label>
                <select
                  value={form.travelers}
                  onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 focus:border-transparent appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#964734]" /> Budget
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 focus:border-transparent appearance-none"
                >
                  <option value="">Any Budget</option>
                  <option value="budget">Budget ($0 – $1,000)</option>
                  <option value="mid">Mid-Range ($1,000 – $3,000)</option>
                  <option value="premium">Premium ($3,000 – $6,000)</option>
                  <option value="luxury">Luxury ($6,000+)</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {['Beach', 'Mountains', 'City', 'Adventure', 'Luxury', 'Wellness'].map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium bg-[#AFDDE5]/30 border border-[#AFDDE5] text-[#024950] rounded-full hover:bg-[#0FA4AF]/20 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-2xl shadow-lg shadow-[#003135]/20 hover:shadow-[#0FA4AF]/30 hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Search Trips
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
