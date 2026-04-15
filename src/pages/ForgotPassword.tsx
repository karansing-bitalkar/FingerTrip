import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Globe, Send, CheckCircle, RefreshCw, Shield } from 'lucide-react';

type Step = 'input' | 'sent';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('input');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('sent');
    }, 1400);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="min-h-screen flex bg-[#f0fafb]">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col w-[44%] shrink-0 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
            alt="Travel reset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003135]/80 via-[#024950]/65 to-[#003135]/90" />
        </div>
        <div className="relative z-10 flex flex-col h-full p-12">
          <Link to="/" className="flex items-center gap-2.5 text-white w-fit">
            <div className="w-10 h-10 rounded-xl bg-[#0FA4AF]/30 backdrop-blur-sm border border-[#AFDDE5]/30 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">FingerTrip</span>
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="w-16 h-16 rounded-2xl bg-[#0FA4AF]/20 border border-[#AFDDE5]/30 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#AFDDE5]" />
              </div>
              <h2 className="text-4xl font-bold text-white font-display leading-tight mb-4">
                Account<br />
                <span style={{ background: 'linear-gradient(135deg,#0FA4AF,#AFDDE5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Recovery
                </span>
              </h2>
              <p className="text-[#AFDDE5]/75 text-sm leading-relaxed mb-8">
                No worries — it happens to the best of us. We'll send a secure reset link straight to your inbox.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🔒', text: 'Secure, one-time reset link' },
                  { icon: '⚡', text: 'Email delivered within seconds' },
                  { icon: '⏱️', text: 'Link expires in 30 minutes' },
                  { icon: '✅', text: 'Full account access restored' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="flex items-center gap-3 text-[#AFDDE5]/80"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <p className="text-[#AFDDE5]/35 text-xs">© 2026 FingerTrip · All rights reserved</p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 overflow-y-auto">
        <div className="w-full max-w-[420px]">

          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-400 hover:text-[#003135] mb-8 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-[#003135]">
              Finger<span className="text-[#0FA4AF]">Trip</span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {/* ── Step 1: Email Input ── */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#AFDDE5]/40 border border-[#AFDDE5] flex items-center justify-center mb-5">
                  <Mail className="w-7 h-7 text-[#0FA4AF]" />
                </div>
                <h1 className="text-3xl font-bold text-[#003135] font-display mb-1">Forgot Password?</h1>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Enter the email address linked to your FingerTrip account. We'll email you a secure reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        placeholder="your@email.com"
                        className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/40 text-gray-800 placeholder:text-gray-300 transition-all ${
                          error ? 'border-red-300 focus:ring-red-200' : 'border-[#AFDDE5]'
                        }`}
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs mt-1.5">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl shadow-lg shadow-[#003135]/20 hover:shadow-[#0FA4AF]/30 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Reset Link
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                  Remembered it?{' '}
                  <Link to="/login" className="text-[#0FA4AF] font-semibold hover:text-[#024950] transition-colors">
                    Sign in →
                  </Link>
                </p>
              </motion.div>
            )}

            {/* ── Step 2: Success Screen ── */}
            {step === 'sent' && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                {/* Animated success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#AFDDE5]/60 to-[#0FA4AF]/20 border-2 border-[#0FA4AF]/30 flex items-center justify-center"
                >
                  <CheckCircle className="w-12 h-12 text-[#0FA4AF]" />
                </motion.div>

                <h1 className="text-3xl font-bold text-[#003135] font-display mb-2">Check Your Inbox!</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  We've sent a password reset link to:
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#AFDDE5]/30 border border-[#AFDDE5] rounded-full text-[#003135] font-semibold text-sm mb-8">
                  <Mail className="w-4 h-4 text-[#0FA4AF]" />
                  {email}
                </div>

                <div className="bg-white border border-[#AFDDE5]/60 rounded-2xl p-5 mb-8 text-left space-y-3">
                  {[
                    { step: '1', text: "Open your email app and find the FingerTrip email" },
                    { step: '2', text: 'Click the "Reset Password" button in the email' },
                    { step: '3', text: 'Create a new strong password and confirm it' },
                    { step: '4', text: 'Sign in with your new password' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#AFDDE5]/50 text-[#003135] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <p className="text-sm text-gray-600">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleResend}
                    disabled={resent}
                    className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-[#AFDDE5] text-[#003135] font-semibold rounded-xl hover:bg-[#AFDDE5]/20 transition-all disabled:opacity-60"
                  >
                    <RefreshCw className={`w-4 h-4 ${resent ? 'animate-spin' : ''}`} />
                    {resent ? 'Email Resent!' : 'Resend Reset Link'}
                  </button>

                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl shadow-lg shadow-[#003135]/20 hover:shadow-[#0FA4AF]/30 transition-all"
                  >
                    Back to Sign In
                  </Link>
                </div>

                <p className="text-xs text-gray-400 mt-5">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setStep('input')}
                    className="text-[#0FA4AF] hover:underline font-medium"
                  >
                    try a different address
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
