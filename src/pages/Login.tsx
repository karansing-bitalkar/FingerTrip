import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Globe, ArrowLeft, LogIn, Luggage, Building2, ShieldCheck } from 'lucide-react';
import { DEMO_ACCOUNTS } from '@/constants/data';
import { storeUser } from '@/hooks/useAuth';
import type { User } from '@/types';
import Popup from '@/components/features/Popup';

const MOCK_USERS: { [email: string]: User & { password: string } } = {
  'traveler@fingertrip.com': {
    id: '1', name: 'Alex Johnson', email: 'traveler@fingertrip.com', role: 'traveler',
    password: 'Traveler@123', phone: '+1 555-0101', location: 'New York, USA', joinedDate: '2024-03-15',
  },
  'vendor@fingertrip.com': {
    id: '2', name: 'Sunrise Travels Co.', email: 'vendor@fingertrip.com', role: 'vendor',
    password: 'Vendor@123', phone: '+1 555-0202', location: 'Bali, Indonesia', joinedDate: '2023-07-22',
  },
  'admin@fingertrip.com': {
    id: '3', name: 'FingerTrip Admin', email: 'admin@fingertrip.com', role: 'admin',
    password: 'Admin@123', phone: '+1 555-0303', location: 'New York, USA', joinedDate: '2022-01-01',
  },
};

const ROLE_REDIRECT: Record<string, string> = {
  traveler: '/traveler-dashboard',
  vendor: '/vendor-dashboard',
  admin: '/admin-dashboard',
};

const DEMO_ICONS = [
  <Luggage className="w-5 h-5" />,
  <Building2 className="w-5 h-5" />,
  <ShieldCheck className="w-5 h-5" />,
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const handleDemoClick = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setForm({ email: demo.email, password: demo.password });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = MOCK_USERS[form.email];
      if (!user || user.password !== form.password) {
        setError('Invalid email or password. Try a demo account below.');
        setLoading(false);
        return;
      }
      const { password: _, ...userData } = user;
      storeUser(userData);
      setLoggedUser(userData);
      setLoading(false);
      setSuccessPopup(true);
    }, 900);
  };

  const handleSuccessClose = () => {
    setSuccessPopup(false);
    if (loggedUser) navigate(ROLE_REDIRECT[loggedUser.role] || '/');
  };

  return (
    <div className="min-h-screen flex bg-[#f0fafb]">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col w-[46%] relative overflow-hidden shrink-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003135]/75 via-[#024950]/55 to-[#003135]/85" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-white w-fit">
            <div className="w-10 h-10 rounded-xl bg-[#0FA4AF]/30 backdrop-blur-sm border border-[#AFDDE5]/30 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">FingerTrip</span>
          </Link>

          {/* Hero Text */}
          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-5xl font-bold text-white font-display leading-tight mb-5">
                Welcome Back<br />
                <span style={{ background: 'linear-gradient(135deg,#0FA4AF,#AFDDE5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  to Paradise
                </span>
              </h2>
              <p className="text-[#AFDDE5]/80 text-base leading-relaxed mb-10">
                Sign in to access your bookings, wishlists, and exclusive travel deals crafted just for you.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '150K+', desc: 'Happy Travelers' },
                  { label: '500+', desc: 'Destinations' },
                  { label: '4.9★', desc: 'App Rating' },
                  { label: '24/7', desc: 'Support' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3">
                    <div className="text-2xl font-bold text-white font-display">{stat.label}</div>
                    <div className="text-[#AFDDE5]/70 text-xs mt-0.5">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <p className="text-[#AFDDE5]/40 text-xs">© 2026 FingerTrip · All rights reserved</p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px]">

          {/* Mobile back + logo */}
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-[#003135] mb-8 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-[#003135]">Finger<span className="text-[#0FA4AF]">Trip</span></span>
          </div>

          <h1 className="text-3xl font-bold text-[#003135] font-display mb-1">Sign In</h1>
          <p className="text-gray-400 text-sm mb-8">Welcome back — enter your credentials to continue.</p>

          {/* Demo Cards */}
          <div className="mb-7">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2.5">
              {DEMO_ACCOUNTS.map((demo, i) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemoClick(demo)}
                  className={`group relative p-3 rounded-2xl bg-gradient-to-br ${demo.color} text-white text-center hover:scale-[1.04] hover:shadow-lg transition-all duration-200 shadow-sm`}
                >
                  <div className="text-xl mb-1.5">{demo.icon}</div>
                  <div className="text-xs font-bold leading-tight">{demo.label.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-70 mt-0.5 leading-tight">Click to fill</div>
                </button>
              ))}
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-200 hover:shadow-sm transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-[#1877F2] border-2 border-[#1877F2] rounded-xl text-sm font-semibold text-white hover:bg-[#166FE5] hover:border-[#166FE5] hover:shadow-sm transition-all">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <span className="shrink-0 text-base">⚠️</span>
                {error}
              </motion.div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email Address</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 text-gray-800 placeholder:text-gray-300 transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 pr-12 text-gray-800 placeholder:text-gray-300 transition"
                  placeholder="Your password"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0FA4AF] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link to="/forgot-password" className="text-xs text-[#0FA4AF] hover:text-[#024950] font-medium transition-colors">Forgot password?</Link>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl shadow-lg shadow-[#003135]/20 hover:shadow-[#0FA4AF]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                : <><LogIn className="w-4 h-4" /> Sign In to FingerTrip</>
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#0FA4AF] font-semibold hover:text-[#024950] transition-colors">Create one free →</Link>
          </p>

          {/* Role links */}
          <div className="flex justify-center gap-5 mt-4 text-xs text-gray-300">
            <Link to="/vendor-login" className="hover:text-[#0FA4AF] transition-colors">Vendor Login</Link>
            <span>·</span>
            <Link to="/admin-login" className="hover:text-[#0FA4AF] transition-colors">Admin Login</Link>
          </div>
        </motion.div>
      </div>

      <Popup
        isOpen={successPopup} onClose={handleSuccessClose} type="success"
        title={`Welcome back, ${loggedUser?.name.split(' ')[0]}!`}
        message={`Signed in as ${loggedUser?.role}. Redirecting to your dashboard...`}
      />
    </div>
  );
}
