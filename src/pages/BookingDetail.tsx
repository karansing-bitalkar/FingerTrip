import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Calendar, Users, CheckCircle, Clock,
  Phone, Mail, Building2, CreditCard, X, AlertTriangle,
  Copy, Share2, Check, Download
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Popup from '@/components/features/Popup';
import { TRAVELER_BOOKINGS, PACKAGES } from '@/constants/data';
import { toast } from 'sonner';

const statusStyles: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
  confirmed: { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', text: 'Confirmed', icon: <CheckCircle className="w-4 h-4" /> },
  pending: { bg: 'bg-amber-100 text-amber-700 border-amber-200', text: 'Pending', icon: <Clock className="w-4 h-4" /> },
  completed: { bg: 'bg-gray-100 text-gray-600 border-gray-200', text: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { bg: 'bg-red-100 text-red-600 border-red-200', text: 'Cancelled', icon: <X className="w-4 h-4" /> },
};

// Vendor contacts by vendor name
const VENDOR_CONTACTS: Record<string, { phone: string; email: string; address: string }> = {
  'Azure Horizons Travel': { phone: '+1 (800) 123-4567', email: 'support@azurehorizons.com', address: 'Malé, Maldives' },
  'Sunrise Travels Co.': { phone: '+62 361 123 456', email: 'hello@sunrisetravels.com', address: 'Ubud, Bali, Indonesia' },
  'Himalayan Trails Co.': { phone: '+91 194 246 0000', email: 'contact@himalayantrails.in', address: 'Srinagar, Kashmir, India' },
  'Alpine Dreams Tours': { phone: '+41 44 500 1234', email: 'info@alpinedreams.ch', address: 'Zurich, Switzerland' },
  'Desert Pearl Journeys': { phone: '+971 4 555 8890', email: 'travel@desertpearl.ae', address: 'Dubai, UAE' },
  'Thai Discovery Tours': { phone: '+66 2 555 7890', email: 'hello@thaidiscovery.com', address: 'Bangkok, Thailand' },
};

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cancelPopup, setCancelPopup] = useState(false);
  const [cancelledPopup, setCancelledPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  // Find booking from TRAVELER_BOOKINGS
  const booking = TRAVELER_BOOKINGS.find((b) => b.id === id);
  // Find matching package for full itinerary
  const pkg = booking ? PACKAGES.find((p) => p.title === booking.packageTitle) : null;

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f0fafb]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Booking Not Found</h1>
          <p className="text-gray-500 mb-6">The booking ID <span className="font-mono font-semibold">{id}</span> does not exist.</p>
          <Link to="/traveler-dashboard/bookings" className="px-6 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl">
            Back to Bookings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentStatus = isCancelled ? 'cancelled' : booking.status;
  const status = statusStyles[currentStatus] || statusStyles.pending;
  const vendor = VENDOR_CONTACTS[booking.vendor] || { phone: '+1 (800) 000-0000', email: 'support@fingertrip.com', address: 'Global' };

  const itinerary = pkg?.itinerary || [
    'Day 1: Arrival & Hotel Check-in',
    'Day 2: Guided City Tour',
    'Day 3: Activities & Excursions',
    'Day 4: Free Exploration Day',
    'Day 5: Departure',
  ];

  const includes = pkg?.includes || ['Flights', 'Hotel', 'Breakfast', 'Guided tours'];

  const handleCancelConfirm = () => {
    setIsCancelled(true);
    setCancelledPopup(true);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    toast.success('Booking reference copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const baseFare = booking.amount / booking.travelers;
  const taxes = Math.round(booking.amount * 0.05);
  const serviceFee = Math.round(booking.amount * 0.02);
  const total = booking.amount + taxes + serviceFee;

  return (
    <div className="min-h-screen bg-[#f0fafb]">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-[#003135] via-[#024950] to-[#003135]">
        <div className="max-w-6xl mx-auto">
          <Link to="/traveler-dashboard/bookings" className="inline-flex items-center gap-2 text-[#AFDDE5]/80 hover:text-white text-sm transition-colors mb-5">
            <ArrowLeft className="w-4 h-4" /> Back to My Bookings
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white font-display">{booking.packageTitle}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-[#AFDDE5]/80 text-sm">
                  <MapPin className="w-4 h-4" /> {booking.destination}
                </div>
                <span className="text-[#AFDDE5]/30">·</span>
                <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${status.bg}`}>
                  {status.icon} {status.text}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyRef}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {booking.id}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* LEFT — Itinerary + Traveler Info + Vendor */}
          <div className="lg:col-span-2 space-y-6">

            {/* Package Banner */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl overflow-hidden relative h-52 shadow-lg">
              <img src={booking.image} alt={booking.packageTitle} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-white font-bold text-lg font-display">{booking.packageTitle}</div>
                  <div className="text-[#AFDDE5]/80 text-sm">{booking.vendor}</div>
                </div>
              </div>
            </motion.div>

            {/* Trip Info Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: <Calendar className="w-5 h-5 text-[#0FA4AF]" />, label: 'Travel Date', value: booking.date },
                { icon: <Users className="w-5 h-5 text-[#0FA4AF]" />, label: 'Travelers', value: `${booking.travelers} Person${booking.travelers > 1 ? 's' : ''}` },
                { icon: <Building2 className="w-5 h-5 text-[#0FA4AF]" />, label: 'Vendor', value: booking.vendor.split(' ').slice(0, 2).join(' ') },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-[#AFDDE5]/30 p-4 shadow-sm">
                  <div className="w-9 h-9 bg-[#AFDDE5]/30 rounded-xl flex items-center justify-center mb-2">{item.icon}</div>
                  <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                  <div className="font-bold text-gray-900 text-sm">{item.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Full Itinerary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 font-display mb-6">Full Itinerary</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-[#AFDDE5]/60" />
                <div className="space-y-5">
                  {itinerary.map((day, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 border-2 ${
                        i === 0 ? 'bg-[#003135] border-[#003135] text-white' :
                        i === itinerary.length - 1 ? 'bg-[#964734] border-[#964734] text-white' :
                        'bg-white border-[#0FA4AF] text-[#0FA4AF]'
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-[#f0fafb] rounded-2xl px-4 py-3 border border-[#AFDDE5]/30">
                        <p className="text-sm text-gray-800 font-medium">{day}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 font-display mb-5">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {includes.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Traveler Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Traveler Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Lead Traveler', value: 'Alex Johnson' },
                  { label: 'Email', value: 'traveler@fingertrip.com' },
                  { label: 'Phone', value: '+1 555-0101' },
                  { label: 'Nationality', value: 'American' },
                  { label: 'Passport', value: 'A12345678' },
                  { label: 'Emergency Contact', value: '+1 555 999 0000' },
                ].map((row) => (
                  <div key={row.label} className="p-3 bg-[#f0fafb] rounded-xl border border-[#AFDDE5]/30">
                    <div className="text-xs text-gray-400 mb-0.5">{row.label}</div>
                    <div className="text-sm font-semibold text-gray-900">{row.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vendor Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Vendor Contact</h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {booking.vendor.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{booking.vendor}</h3>
                  <div className="flex items-center gap-1 mt-0.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">{vendor.address}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href={`tel:${vendor.phone}`}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#f0fafb] border border-[#AFDDE5]/40 rounded-xl text-sm text-[#003135] hover:border-[#0FA4AF] transition-colors">
                      <Phone className="w-4 h-4 text-[#0FA4AF]" />
                      {vendor.phone}
                    </a>
                    <a href={`mailto:${vendor.email}`}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#f0fafb] border border-[#AFDDE5]/40 rounded-xl text-sm text-[#003135] hover:border-[#0FA4AF] transition-colors">
                      <Mail className="w-4 h-4 text-[#0FA4AF]" />
                      <span className="truncate">{vendor.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Payment Summary + Actions */}
          <div className="space-y-5">
            {/* Payment Summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 font-display mb-5">Payment Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Base fare ({booking.travelers}× ${baseFare.toLocaleString()})</span>
                  <span className="font-semibold text-gray-900">${booking.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Taxes & fees (5%)</span>
                  <span className="font-semibold text-gray-900">${taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Service fee (2%)</span>
                  <span className="font-semibold text-gray-900">${serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#AFDDE5]/40 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Paid</span>
                  <span className="text-2xl font-bold text-[#964734]">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#f0fafb] rounded-2xl border border-[#AFDDE5]/30 mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#0FA4AF]" />
                  <span className="text-xs font-semibold text-gray-700">Payment Method</span>
                </div>
                <div className="text-sm text-gray-600">Visa ending in •••• 4242</div>
                <div className="text-xs text-gray-400 mt-0.5">Paid on {booking.date}</div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => toast.success('Invoice downloaded!')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#f0fafb] border border-[#AFDDE5] text-[#003135] font-semibold text-sm rounded-xl hover:border-[#0FA4AF] transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Invoice
                </button>

                {currentStatus !== 'cancelled' && currentStatus !== 'completed' && (
                  <button
                    onClick={() => setCancelPopup(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <X className="w-4 h-4" /> Cancel Booking
                  </button>
                )}
              </div>
            </motion.div>

            {/* Share Trip */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-[#AFDDE5]/30 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#0FA4AF]" /> Share Your Trip
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.href}`);
                    toast.success('Link copied!');
                  }}
                  className="flex flex-col items-center gap-1.5 py-3 bg-[#f0fafb] rounded-xl border border-[#AFDDE5]/40 hover:border-[#0FA4AF] transition-colors text-xs text-gray-600 font-medium"
                >
                  <Copy className="w-4 h-4 text-[#0FA4AF]" /> Copy
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`I'm going to ${booking.destination} with FingerTrip! 🌍 Booking: ${booking.packageTitle}`)}`, '_blank')}
                  className="flex flex-col items-center gap-1.5 py-3 bg-[#f0fafb] rounded-xl border border-[#AFDDE5]/40 hover:border-[#25D366] transition-colors text-xs text-gray-600 font-medium"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just booked ${booking.packageTitle} to ${booking.destination} via @FingerTrip! 🌴✈️`)}`, '_blank')}
                  className="flex flex-col items-center gap-1.5 py-3 bg-[#f0fafb] rounded-xl border border-[#AFDDE5]/40 hover:border-black transition-colors text-xs text-gray-600 font-medium"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.844L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <Popup
        isOpen={cancelPopup}
        onClose={() => setCancelPopup(false)}
        type="confirm"
        title="Cancel This Booking?"
        message={`Are you sure you want to cancel "${booking.packageTitle}"? A cancellation fee may apply per our policy.`}
        onConfirm={handleCancelConfirm}
        confirmLabel="Yes, Cancel"
      />
      <Popup
        isOpen={cancelledPopup}
        onClose={() => { setCancelledPopup(false); navigate('/traveler-dashboard/bookings'); }}
        type="success"
        title="Booking Cancelled"
        message="Your booking has been cancelled. A refund will be processed within 5–7 business days."
      />
    </div>
  );
}
