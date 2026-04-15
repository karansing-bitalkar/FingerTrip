import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowLeft, Lock, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react';

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Very Weak', color: 'bg-red-500' };
  if (score === 2) return { score, label: 'Weak', color: 'bg-orange-400' };
  if (score === 3) return { score, label: 'Fair', color: 'bg-amber-400' };
  if (score === 4) return { score, label: 'Strong', color: 'bg-emerald-400' };
  return { score, label: 'Very Strong', color: 'bg-emerald-600' };
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'demo-token';

  const [form, setForm] = useState({ password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const strength = getStrength(form.password);
  const passwordsMatch = form.confirm.length > 0 && form.password === form.confirm;
  const passwordsMismatch = form.confirm.length > 0 && form.password !== form.confirm;

  const requirements = [
    { met: form.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(form.password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(form.password), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(form.password), text: 'One special character' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (strength.score < 3) {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003135] via-[#024950] to-[#003135] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white font-display mb-3">Password Reset!</h1>
            <p className="text-[#AFDDE5]/80 text-sm mb-8 leading-relaxed">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#0FA4AF] to-[#AFDDE5] text-[#003135] font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Back to Sign In →
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003135] via-[#024950] to-[#003135] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0FA4AF]/30 backdrop-blur-sm border border-[#AFDDE5]/30 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display text-white tracking-tight">
            Finger<span className="text-[#0FA4AF]">Trip</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Back link */}
          <Link to="/login" className="inline-flex items-center gap-1.5 text-[#AFDDE5]/70 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>

          {/* Icon + Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-[#0FA4AF]/30 border border-[#AFDDE5]/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#AFDDE5]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display leading-tight">Set New Password</h1>
              <p className="text-[#AFDDE5]/60 text-xs mt-0.5">Token: <span className="font-mono text-[#AFDDE5]/90">{token.slice(0, 12)}…</span></p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 p-3.5 bg-red-500/20 border border-red-400/40 rounded-xl text-red-300 text-sm"
              >
                <span className="shrink-0">⚠️</span> {error}
              </motion.div>
            )}

            {/* New Password */}
            <div>
              <label className="text-xs font-semibold text-[#AFDDE5]/70 uppercase tracking-wide mb-1.5 block">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AFDDE5]/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/60 transition"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>

              {/* Strength Meter */}
              {form.password.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#AFDDE5]/60">Strength</span>
                    <span className={`text-xs font-semibold ${
                      strength.score <= 2 ? 'text-orange-400' : strength.score === 3 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>{strength.label}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          s <= strength.score ? strength.color : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Requirements */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                    {requirements.map((req) => (
                      <div key={req.text} className={`flex items-center gap-1.5 text-[10px] ${req.met ? 'text-emerald-400' : 'text-white/40'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${req.met ? 'bg-emerald-500/30 border-emerald-400' : 'border-white/20'}`}>
                          {req.met && <CheckCircle className="w-2.5 h-2.5" />}
                        </div>
                        {req.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-[#AFDDE5]/70 uppercase tracking-wide mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AFDDE5]/50" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className={`w-full pl-11 pr-12 py-3.5 bg-white/10 border rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 transition ${
                    passwordsMismatch
                      ? 'border-red-400/60 focus:ring-red-400/40'
                      : passwordsMatch
                      ? 'border-emerald-400/60 focus:ring-emerald-400/40'
                      : 'border-white/20 focus:ring-[#0FA4AF]/60'
                  }`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {passwordsMatch && (
                <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Passwords match
                </p>
              )}
              {passwordsMismatch && (
                <p className="text-xs text-red-400 mt-1.5">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#0FA4AF] to-[#AFDDE5] text-[#003135] font-bold rounded-xl shadow-lg hover:shadow-[#0FA4AF]/30 transition-all mt-2"
            >
              <ShieldCheck className="w-5 h-5" /> Reset Password
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
