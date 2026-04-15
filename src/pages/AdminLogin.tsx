import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock, AlertTriangle, LogIn, Activity } from 'lucide-react';
import { storeUser } from '@/hooks/useAuth';
import type { User } from '@/types';

const ADMIN_USER: User & { password: string } = {
  id: '3',
  name: 'FingerTrip Admin',
  email: 'admin@fingertrip.com',
  role: 'admin',
  password: 'Admin@123',
  location: 'Global HQ',
  joinedDate: '2019-01-01',
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [autofilled, setAutofilled] = useState(false);

  const handleDemoClick = () => {
    setForm({ email: ADMIN_USER.email, password: ADMIN_USER.password });
    setError('');
    setAutofilled(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (form.email !== ADMIN_USER.email || form.password !== ADMIN_USER.password) {
        setError('Invalid admin credentials. Unauthorized access attempt will be logged.');
        setLoading(false);
        return;
      }
      const { password: _, ...userData } = ADMIN_USER;
      storeUser(userData);
      setLoading(false);
      navigate('/admin-dashboard');
    }, 1100);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000d0f 0%, #001820 40%, #003135 80%, #024950 100%)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #0FA4AF 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #964734 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #024950 0%, transparent 70%)' }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(175,221,229,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(175,221,229,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Gradient border card */}
        <div className="p-px rounded-3xl" style={{ background: 'linear-gradient(135deg, #0FA4AF40, #AFDDE520, #96473420, #0FA4AF40)' }}>
          <div className="bg-[#001820]/95 backdrop-blur-xl rounded-3xl p-8">

            {/* Shield icon + branding */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #003135, #024950)', border: '1px solid rgba(15,164,175,0.3)', boxShadow: '0 0 40px rgba(15,164,175,0.15), inset 0 0 20px rgba(15,164,175,0.05)' }}
                >
                  <Shield className="w-10 h-10 text-[#0FA4AF]" />
                </motion.div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0FA4AF] rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white font-display mb-1">Admin Portal</h1>
              <p className="text-[#AFDDE5]/50 text-sm">Restricted access — authorized personnel only</p>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2 p-3 rounded-xl mb-6 border border-[#0FA4AF]/20 bg-[#0FA4AF]/5">
              <Lock className="w-4 h-4 text-[#0FA4AF] shrink-0" />
              <span className="text-xs text-[#AFDDE5]/70">256-bit encrypted · Access monitored · Session logged</span>
              <Activity className="w-4 h-4 text-[#0FA4AF] ml-auto shrink-0 animate-pulse" />
            </div>

            {/* Demo button */}
            {!autofilled && (
              <button
                onClick={handleDemoClick}
                className="w-full p-3.5 rounded-2xl border border-[#964734]/40 bg-[#964734]/10 text-white hover:bg-[#964734]/20 transition-all mb-5 text-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-[#964734]" />
                  <span className="font-medium text-[#AFDDE5]/80">Use Admin Demo: admin@fingertrip.com</span>
                </div>
              </button>
            )}
            {autofilled && (
              <div className="w-full p-3 rounded-xl border border-[#0FA4AF]/30 bg-[#0FA4AF]/10 text-[#AFDDE5]/70 text-xs text-center mb-5">
                ✓ Demo credentials loaded — click Sign In
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-[#AFDDE5]/50 uppercase mb-1.5 block tracking-wider">Admin Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#003135]/50 border border-[#AFDDE5]/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 focus:border-[#0FA4AF]/50 placeholder-[#AFDDE5]/25 transition-all"
                  placeholder="admin@fingertrip.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#AFDDE5]/50 uppercase mb-1.5 block tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#003135]/50 border border-[#AFDDE5]/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 focus:border-[#0FA4AF]/50 pr-12 placeholder-[#AFDDE5]/25 transition-all"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AFDDE5]/40 hover:text-[#0FA4AF] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className="w-full flex items-center justify-center gap-2 py-4 text-white font-semibold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ background: loading ? '#003135' : 'linear-gradient(135deg, #003135 0%, #0FA4AF 100%)', boxShadow: loading ? 'none' : '0 4px 24px rgba(15,164,175,0.3)' }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#AFDDE5]/30 border-t-[#AFDDE5] rounded-full animate-spin" />
                    <span className="text-[#AFDDE5]/80">Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" /> Secure Admin Login
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#AFDDE5]/10 text-center space-y-2">
              <Link to="/" className="text-xs text-[#AFDDE5]/30 hover:text-[#AFDDE5]/60 transition-colors block">
                ← Return to FingerTrip
              </Link>
              <div className="flex items-center justify-center gap-3 text-xs text-[#AFDDE5]/25">
                <Link to="/login" className="hover:text-[#AFDDE5]/50 transition-colors">Traveler Login</Link>
                <span>·</span>
                <Link to="/vendor-login" className="hover:text-[#AFDDE5]/50 transition-colors">Vendor Login</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Version tag */}
        <div className="text-center mt-4 text-xs text-[#AFDDE5]/20">
          FingerTrip Admin Console v2.1 · All access logged
        </div>
      </motion.div>
    </div>
  );
}
