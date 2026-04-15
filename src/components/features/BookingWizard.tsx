import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, Package, CreditCard, CheckCircle, ChevronRight, ChevronLeft, MapPin, Users, Star, Shield, Lock } from 'lucide-react';
import { PACKAGES } from '@/constants/data';
import type { Package as TPackage } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackage?: TPackage;
}

const STEPS = [
  { id: 1, label: 'Select Package', icon: <Package className="w-4 h-4" /> },
  { id: 2, label: 'Traveler Details', icon: <User className="w-4 h-4" /> },
  { id: 3, label: 'Travel Dates', icon: <Calendar className="w-4 h-4" /> },
  { id: 4, label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
  { id: 5, label: 'Confirmed', icon: <CheckCircle className="w-4 h-4" /> },
];

export default function BookingWizard({ isOpen, onClose, preselectedPackage }: Props) {
  const [step, setStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState<TPackage | null>(preselectedPackage || null);
  const [travelers, setTravelers] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNo: '',
  });
  const [travelData, setTravelData] = useState({
    departureDate: '',
    returnDate: '',
    guestCount: '2',
    roomType: 'double',
    specialRequests: '',
  });
  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [processing, setProcessing] = useState(false);

  const totalAmount = selectedPkg ? selectedPkg.price * parseInt(travelData.guestCount) : 0;

  const handleNext = () => {
    if (step === 4) {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setStep(5); }, 2000);
    } else if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const canNext = () => {
    if (step === 1) return !!selectedPkg;
    if (step === 2) return travelers.firstName && travelers.lastName && travelers.email && travelers.phone;
    if (step === 3) return travelData.departureDate && travelData.guestCount;
    if (step === 4) return payment.cardName && payment.cardNumber.length >= 16 && payment.expiry && payment.cvv.length >= 3;
    return true;
  };

  const formatCard = (value: string) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003135] to-[#024950] px-6 py-5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Book Your Journey</h2>
              <p className="text-[#AFDDE5]/70 text-sm">Step {step} of 5 — {STEPS[step - 1].label}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-[#f0fafb] border-b border-[#AFDDE5]/40 shrink-0">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#AFDDE5]/50 z-0" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-[#003135] to-[#0FA4AF] z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
              {STEPS.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-1.5 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    step > s.id
                      ? 'bg-[#0FA4AF] border-[#0FA4AF] text-white'
                      : step === s.id
                      ? 'bg-[#003135] border-[#003135] text-white'
                      : 'bg-white border-[#AFDDE5] text-[#AFDDE5]'
                  }`}>
                    {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.icon}
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block ${step === s.id ? 'text-[#003135]' : step > s.id ? 'text-[#0FA4AF]' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Package */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h3 className="font-bold text-gray-900 font-display text-lg mb-4">Choose Your Package</h3>
                  {PACKAGES.slice(0, 4).map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`flex gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPkg?.id === pkg.id
                          ? 'border-[#0FA4AF] bg-[#AFDDE5]/20'
                          : 'border-[#AFDDE5]/40 hover:border-[#0FA4AF]/50 bg-white'
                      }`}
                    >
                      <img src={pkg.image} alt={pkg.title} className="w-16 h-16 rounded-xl object-cover shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=80'; }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm truncate">{pkg.title}</div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                          <MapPin className="w-3 h-3 text-[#964734]" /> {pkg.destination} · {pkg.duration}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-[#964734] fill-[#964734]" />
                          <span className="text-xs font-semibold text-gray-700">{pkg.rating}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-[#964734]">${pkg.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">per person</div>
                        {selectedPkg?.id === pkg.id && (
                          <div className="mt-1 w-5 h-5 bg-[#0FA4AF] rounded-full flex items-center justify-center ml-auto">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Traveler Details */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h3 className="font-bold text-gray-900 font-display text-lg mb-4">Traveler Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', key: 'firstName', type: 'text', placeholder: 'John' },
                      { label: 'Last Name', key: 'lastName', type: 'text', placeholder: 'Doe' },
                      { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@email.com' },
                      { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+1 234 567 8900' },
                      { label: 'Nationality', key: 'nationality', type: 'text', placeholder: 'American' },
                      { label: 'Passport Number', key: 'passportNo', type: 'text', placeholder: 'AB1234567' },
                    ].map((f) => (
                      <div key={f.key} className={f.key === 'email' ? 'col-span-2' : ''}>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={travelers[f.key as keyof typeof travelers]}
                          onChange={(e) => setTravelers({ ...travelers, [f.key]: e.target.value })}
                          className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 text-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Travel Dates & Guests */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h3 className="font-bold text-gray-900 font-display text-lg mb-4">Travel Dates & Guests</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Departure Date
                      </label>
                      <input type="date" value={travelData.departureDate}
                        onChange={(e) => setTravelData({ ...travelData, departureDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Return Date
                      </label>
                      <input type="date" value={travelData.returnDate}
                        onChange={(e) => setTravelData({ ...travelData, returnDate: e.target.value })}
                        min={travelData.departureDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block flex items-center gap-1">
                        <Users className="w-3 h-3" /> Number of Guests
                      </label>
                      <select value={travelData.guestCount} onChange={(e) => setTravelData({ ...travelData, guestCount: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 appearance-none">
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Room Type</label>
                      <select value={travelData.roomType} onChange={(e) => setTravelData({ ...travelData, roomType: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 appearance-none">
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                        <option value="suite">Luxury Suite</option>
                        <option value="villa">Private Villa</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Special Requests (Optional)</label>
                    <textarea rows={3} value={travelData.specialRequests}
                      onChange={(e) => setTravelData({ ...travelData, specialRequests: e.target.value })}
                      placeholder="Dietary requirements, accessibility needs, celebrations..."
                      className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 resize-none" />
                  </div>
                  {/* Price Summary */}
                  <div className="bg-gradient-to-r from-[#003135]/5 to-[#0FA4AF]/10 rounded-2xl p-4 border border-[#AFDDE5]">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>${selectedPkg?.price.toLocaleString()} × {travelData.guestCount} guests</span>
                      <span className="font-semibold">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Taxes & fees (10%)</span>
                      <span>${(totalAmount * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-[#AFDDE5] pt-2 flex justify-between font-bold text-[#003135]">
                      <span>Total</span>
                      <span className="text-[#964734] text-lg">${(totalAmount * 1.1).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h3 className="font-bold text-gray-900 font-display text-lg mb-4">Secure Payment</h3>
                  <div className="bg-[#AFDDE5]/20 border border-[#AFDDE5] rounded-2xl p-4 flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-[#0FA4AF]" />
                    <div>
                      <div className="font-semibold text-[#003135] text-sm">256-bit SSL Encryption</div>
                      <div className="text-xs text-gray-500">Your payment details are fully secured</div>
                    </div>
                    <Lock className="w-4 h-4 text-[#0FA4AF] ml-auto" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Cardholder Name</label>
                      <input type="text" placeholder="John Doe" value={payment.cardName}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
                        maxLength={19}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50 font-mono tracking-widest" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" value={payment.expiry}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setPayment({ ...payment, expiry: v.length > 2 ? `${v.slice(0,2)}/${v.slice(2)}` : v });
                        }}
                        maxLength={5}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">CVV</label>
                      <input type="password" placeholder="•••" value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        maxLength={4}
                        className="w-full px-4 py-3 bg-[#f0fafb] border border-[#AFDDE5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]/50" />
                    </div>
                  </div>
                  {/* Final Total */}
                  <div className="bg-gradient-to-br from-[#003135] to-[#024950] rounded-2xl p-5 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-display font-bold text-lg">{selectedPkg?.title}</div>
                        <div className="text-[#AFDDE5]/70 text-sm">{travelData.guestCount} guests · {travelData.departureDate || 'TBD'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#AFDDE5]">${(totalAmount * 1.1).toLocaleString()}</div>
                        <div className="text-xs text-[#AFDDE5]/60">Total incl. taxes</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-br from-[#0FA4AF] to-[#003135] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#0FA4AF]/30"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-[#003135] font-display mb-3">Booking Confirmed!</h3>
                  <p className="text-gray-500 mb-2">Your trip to <strong className="text-[#964734]">{selectedPkg?.destination}</strong> is booked.</p>
                  <p className="text-gray-400 text-sm mb-6">Confirmation details sent to <strong>{travelers.email}</strong></p>
                  <div className="bg-gradient-to-br from-[#003135]/5 to-[#0FA4AF]/10 rounded-2xl p-5 text-left border border-[#AFDDE5] mb-6">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><div className="text-xs text-gray-400 font-medium">Booking ID</div><div className="font-bold text-[#003135]">FT-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div></div>
                      <div><div className="text-xs text-gray-400 font-medium">Package</div><div className="font-bold text-gray-800 truncate">{selectedPkg?.title}</div></div>
                      <div><div className="text-xs text-gray-400 font-medium">Travel Date</div><div className="font-bold text-gray-800">{travelData.departureDate || 'TBD'}</div></div>
                      <div><div className="text-xs text-gray-400 font-medium">Total Paid</div><div className="font-bold text-[#964734]">${(totalAmount * 1.1).toLocaleString()}</div></div>
                    </div>
                  </div>
                  <button onClick={onClose} className="w-full py-4 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-bold rounded-2xl hover:shadow-lg transition-all">
                    View My Bookings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          {step < 5 && (
            <div className="px-6 py-4 border-t border-[#AFDDE5]/40 bg-white flex items-center justify-between shrink-0">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="text-sm text-gray-400">{step}/5</div>
              <button
                onClick={handleNext}
                disabled={!canNext() || processing}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {processing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : step === 4 ? (
                  <><Lock className="w-4 h-4" /> Pay Now</>
                ) : (
                  <>Next <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
