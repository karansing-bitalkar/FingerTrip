import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Globe, ArrowLeft, User, Building2, CheckCircle2, XCircle } from 'lucide-react';
import { storeUser } from '@/hooks/useAuth';
import type { User as UserType } from '@/types';
import Popup from '@/components/features/Popup';

type Role = 'traveler' | 'vendor';

interface PasswordRule {
  label: string;
  test: (pw: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'One number', test: (pw) => /[0-9]/.test(pw) },
];

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  const passed = PASSWORD_RULES.filter((r) => r.test(pw)).length;
  if (pw.length === 0) return { score: 0, label: '', color: '' };
  if (passed <= 1) return { score: 1, label: 'Weak', color: 'bg-red-400' };
  if (passed === 2) return { score: 2, label: 'Fair', color: 'bg-amber-400' };
  if (passed === 3) return { score: 3, label: 'Good', color: 'bg-[#0FA4AF]' };
  return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
}

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('traveler');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [registeredName, setRegisteredName] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    agreeTerms: false, companyName: '', location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Valid email address required';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the Terms & Privacy Policy';
    if (role === 'vendor' && !form.companyName.trim()) e.companyName = 'Company name is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    const displayName = role === 'vendor' ? form.companyName : form.name;
    const user: UserType = {
      id: Date.now().toString(),
      name: displayName,
      email: form.email,
      role,
      phone: form.phone,
      location: form.location,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    storeUser(user);
    setRegisteredName(displayName);
    setSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    setSuccessPopup(false);
    navigate(role === 'vendor' ? '/vendor-dashboard' : '/traveler-dashboard');
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 transition placeholder:text-gray-300 ${
      errors[field] ? 'border-red-300 focus:ring-red-200' : 'border-[#AFDDE5]'
    }`;

  return (
    <div className="min-h-screen flex bg-[#f0fafb]">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col w-[42%] shrink-0 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80"
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003135]/70 via-[#024950]/60 to-[#003135]/85" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-10">
          <Link to="/" className="flex items-center gap-2.5 text-white w-fit">
            <div className="w-10 h-10 rounded-xl bg-[#0FA4AF]/30 backdrop-blur-sm border border-[#AFDDE5]/30 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display">FingerTrip</span>
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-4xl font-bold text-white font-display leading-tight mb-5">
                Start Your<br />
                <span style={{ background: 'linear-gradient(135deg,#0FA4AF,#AFDDE5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Travel Journey
                </span>
              </h2>
              <p className="text-[#AFDDE5]/80 text-sm leading-relaxed mb-8">
                Join 150,000+ travelers who've discovered extraordinary destinations with FingerTrip.
              </p>
              <div className="space-y-3.5">
                {[
                  { icon: '🌍', text: 'Access 500+ premium destinations worldwide' },
                  { icon: '💰', text: 'Exclusive member-only discounts & deals' },
                  { icon: '🎯', text: 'Personalized trip recommendations' },
                  { icon: '🔒', text: 'Fully secured bookings & payments' },
                  { icon: '🏆', text: 'Award-winning travel support 24/7' },
                ].map((item, i) => (
                  <motion.div
                    key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="flex items-center gap-3 text-[#AFDDE5]/85"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <p className="text-[#AFDDE5]/40 text-xs">© 2026 FingerTrip · All rights reserved</p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[480px]">

          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-[#003135] mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-[#003135]">Finger<span className="text-[#0FA4AF]">Trip</span></span>
          </div>

          <h1 className="text-3xl font-bold text-[#003135] font-display mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm mb-7">Join FingerTrip — your adventure starts here</p>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-200 hover:shadow-sm transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 bg-[#1877F2] border-2 border-[#1877F2] rounded-xl text-sm font-semibold text-white hover:bg-[#166FE5] hover:border-[#166FE5] hover:shadow-sm transition-all">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign up with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300 font-medium">or register with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {([
              { value: 'traveler' as Role, label: 'Traveler', desc: 'Book trips & explore', icon: <User className="w-4 h-4" /> },
              { value: 'vendor' as Role, label: 'Vendor / Agency', desc: 'List & sell packages', icon: <Building2 className="w-4 h-4" /> },
            ]).map((r) => (
              <button
                key={r.value} onClick={() => setRole(r.value)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  role === r.value
                    ? 'border-[#0FA4AF] bg-[#AFDDE5]/20 shadow-sm shadow-[#0FA4AF]/10'
                    : 'border-[#AFDDE5] bg-white hover:border-[#0FA4AF]/50'
                }`}
              >
                <div className={`flex items-center gap-2 mb-1 ${role === r.value ? 'text-[#003135]' : 'text-gray-400'}`}>
                  {r.icon}
                  <span className="font-bold text-sm text-gray-900">{r.label}</span>
                  {role === r.value && <div className="ml-auto w-2 h-2 rounded-full bg-[#0FA4AF]" />}
                </div>
                <p className="text-xs text-gray-400">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Full Name *</label>
              <input type="text" value={form.name} placeholder="Your full name"
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                className={inputClass('name')} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Company (vendor only) */}
            <AnimatePresence>
              {role === 'vendor' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Company Name *</label>
                  <input type="text" value={form.companyName} placeholder="Your travel company or agency"
                    onChange={(e) => { setForm({ ...form, companyName: e.target.value }); setErrors({ ...errors, companyName: '' }); }}
                    className={inputClass('companyName')} />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email *</label>
                <input type="email" value={form.email} placeholder="your@email.com"
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                  className={inputClass('email')} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Phone</label>
                <input type="tel" value={form.phone} placeholder="+1 555 000 0000"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 transition placeholder:text-gray-300" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Location</label>
              <input type="text" value={form.location} placeholder="City, Country"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 transition placeholder:text-gray-300" />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} value={form.password} placeholder="Min 8 characters"
                  onFocus={() => setShowRules(true)}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                  className={inputClass('password') + ' pr-11'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0FA4AF] transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength Bar */}
              {form.password.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${n <= strength.score ? strength.color : 'bg-gray-100'}`} />
                    ))}
                    <span className="text-xs font-medium ml-2" style={{ color: strength.score <= 1 ? '#f87171' : strength.score === 2 ? '#fbbf24' : strength.score === 3 ? '#0FA4AF' : '#22c55e' }}>
                      {strength.label}
                    </span>
                  </div>
                </div>
              )}

              {/* Password Rules */}
              <AnimatePresence>
                {showRules && form.password.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="mt-2 grid grid-cols-2 gap-1">
                    {PASSWORD_RULES.map((rule) => {
                      const passed = rule.test(form.password);
                      return (
                        <div key={rule.label} className={`flex items-center gap-1.5 text-xs ${passed ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {passed
                            ? <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            : <XCircle className="w-3 h-3 text-gray-300 shrink-0" />
                          }
                          {rule.label}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} placeholder="Repeat your password"
                  onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); setErrors({ ...errors, confirmPassword: '' }); }}
                  className={inputClass('confirmPassword') + ' pr-11'}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0FA4AF] transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword === form.password && (
                <p className="text-emerald-500 text-xs mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passwords match</p>
              )}
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox" checked={form.agreeTerms}
                  onChange={(e) => { setForm({ ...form, agreeTerms: e.target.checked }); setErrors({ ...errors, agreeTerms: '' }); }}
                  className="mt-0.5 w-4 h-4 rounded" style={{ accentColor: '#0FA4AF' }}
                />
                <span className="text-sm text-gray-500 leading-relaxed">
                  I agree to FingerTrip's{' '}
                  <Link to="/terms" className="text-[#0FA4AF] hover:underline font-medium">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-[#0FA4AF] hover:underline font-medium">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1 ml-7">{errors.agreeTerms}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl shadow-lg shadow-[#003135]/20 hover:shadow-[#0FA4AF]/30 hover:scale-[1.01] transition-all mt-1"
            >
              Create My {role === 'vendor' ? 'Vendor' : 'Traveler'} Account →
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0FA4AF] font-semibold hover:text-[#024950] transition-colors">Sign in →</Link>
          </p>
        </motion.div>
      </div>

      <Popup
        isOpen={successPopup} onClose={handleSuccessClose} type="success"
        title="Account Created!"
        message={`Welcome to FingerTrip, ${registeredName}! Your ${role} account is ready. Redirecting to your dashboard...`}
      />
    </div>
  );
}
