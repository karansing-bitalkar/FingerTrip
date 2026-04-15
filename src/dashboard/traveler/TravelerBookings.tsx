import { useState, useRef } from 'react';
import { MapPin, Clock, Users, Edit, Trash2, Eye, X, CreditCard, FileText, ExternalLink, Star, Camera, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { TRAVELER_BOOKINGS } from '@/constants/data';
import Modal from '@/components/features/Modal';
import Popup from '@/components/features/Popup';
import { motion, AnimatePresence } from 'framer-motion';
import type { Booking } from '@/types';

interface Review {
  bookingId: string;
  rating: number;
  comment: string;
  photoPreview?: string;
  date: string;
}

function ReviewModal({ isOpen, onClose, booking, onSubmit }: { isOpen: boolean; onClose: () => void; booking: Booking | null; onSubmit: (review: Review) => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking || rating === 0) { toast.error('Please select a star rating.'); return; }
    if (comment.trim().length < 20) { toast.error('Please write at least 20 characters in your review.'); return; }
    onSubmit({ bookingId: booking.id, rating, comment: comment.trim(), photoPreview: photoPreview || undefined, date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) });
    setRating(0); setComment(''); setPhotoPreview(null);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  return (
    <AnimatePresence>
      {isOpen && booking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#003135] to-[#024950] px-6 py-5">
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold text-white font-display">Write a Review</h3>
              <p className="text-[#AFDDE5]/70 text-sm mt-0.5">{booking.packageTitle} · {booking.destination}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Star Rating */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-3 block">Your Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-125">
                      <Star className={`w-9 h-9 transition-colors ${
                        s <= (hoverRating || rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'
                      }`} />
                    </button>
                  ))}
                  {(hoverRating || rating) > 0 && (
                    <span className="ml-2 text-sm font-semibold text-amber-600">{ratingLabels[hoverRating || rating]}</span>
                  )}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Your Review *</label>
                <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} required
                  className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition"
                  placeholder="Share your experience — the itinerary, accommodation, guides, and any tips for future travelers..." />
                <p className={`text-[10px] mt-1 ${comment.length < 20 ? 'text-gray-400' : 'text-emerald-500'}`}>
                  {comment.length} / 20 characters minimum
                  {comment.length >= 20 && <CheckCircle className="w-3 h-3 inline ml-1" />}
                </p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Add a Photo (optional)</label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                {photoPreview ? (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-orange-100">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-orange-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-orange-400 hover:bg-orange-50 hover:border-orange-300 transition-colors">
                    <Camera className="w-6 h-6" />
                    <span className="text-xs font-medium">Click to upload trip photo</span>
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                  Submit Review
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
  completed: 'bg-gray-100 text-gray-600 border-gray-200',
};

const paymentStatusColors: Record<string, string> = {
  confirmed: 'text-emerald-600',
  pending: 'text-amber-600',
  cancelled: 'text-red-600',
  completed: 'text-blue-600',
};

function BookingDetailModal({ isOpen, onClose, booking }: { isOpen: boolean; onClose: () => void; booking: Booking | null }) {
  return (
    <AnimatePresence>
      {isOpen && booking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={booking.image}
                alt={booking.destination}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/80 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4">
                <div className="text-xs font-mono text-white/60 mb-1">#{booking.id}</div>
                <h3 className="text-xl font-bold text-white font-display">{booking.packageTitle}</h3>
                <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#AFDDE5]" /> {booking.destination}
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#f0fafb] border-b border-[#AFDDE5]/30">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border capitalize ${statusColors[booking.status]}`}>
                {booking.status}
              </span>
              <span className={`text-xs font-semibold flex items-center gap-1.5 ${paymentStatusColors[booking.status]}`}>
                <CreditCard className="w-3.5 h-3.5" />
                Payment: {booking.status === 'confirmed' || booking.status === 'completed' ? 'Paid' : 'Pending'}
              </span>
            </div>

            {/* Details */}
            <div className="p-6 space-y-3">
              {[
                { icon: <Clock className="w-4 h-4 text-[#0FA4AF]" />, label: 'Travel Date', value: booking.date },
                { icon: <Users className="w-4 h-4 text-[#0FA4AF]" />, label: 'Travelers', value: `${booking.travelers} ${booking.travelers === 1 ? 'Person' : 'People'}` },
                { icon: <FileText className="w-4 h-4 text-[#0FA4AF]" />, label: 'Vendor', value: booking.vendor },
                { icon: <CreditCard className="w-4 h-4 text-[#964734]" />, label: 'Total Amount', value: `$${booking.amount.toLocaleString()}` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    {row.icon} {row.label}
                  </div>
                  <span className={`font-semibold text-sm ${row.label === 'Total Amount' ? 'text-[#964734] text-base' : 'text-gray-900'}`}>
                    {row.value}
                  </span>
                </div>
              ))}

              {/* Itinerary Note */}
              <div className="mt-3 p-4 bg-[#f0fafb] rounded-2xl border border-[#AFDDE5]/40">
                <div className="text-xs font-semibold text-[#024950] uppercase mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Itinerary Summary
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {booking.destination === 'Maldives' && 'Arrival & resort check-in → Water activities & snorkeling → Island hopping → Spa & relaxation → Sunset cruise → Free exploration → Departure.'}
                  {booking.destination === 'Bali' && 'Arrival → Ubud & Monkey Forest → Yoga & spa → Rice terrace trek → Temple ceremonies → Beach & surfing → Cooking class → Departure.'}
                  {booking.destination === 'Kashmir' && 'Arrive Srinagar → Dal Lake shikara ride → Gulmarg snowfields → Pahalgam meadows → Mughal Gardens tour → Departure.'}
                  {!['Maldives', 'Bali', 'Kashmir'].includes(booking.destination) && 'Contact your vendor for the full day-by-day itinerary details and any special arrangements.'}
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-700">
                <span className="font-semibold">Special Note:</span> Please carry valid ID proof and travel documents. Contact vendor 48 hours before travel.
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function TravelerBookings() {
  const [bookings, setBookings] = useState<Booking[]>(TRAVELER_BOOKINGS);
  const [editModal, setEditModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState({ travelers: 2, date: '' });
  const [filter, setFilter] = useState('all');
  const [submittedReviews, setSubmittedReviews] = useState<Review[]>([]);

  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditForm({ travelers: booking.travelers, date: booking.date });
    setEditModal(true);
  };

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setViewModal(true);
  };

  const handleSave = () => {
    if (!selectedBooking) return;
    setBookings((prev) => prev.map((b) => b.id === selectedBooking.id ? { ...b, ...editForm } : b));
    setEditModal(false);
    setSuccessPopup(true);
  };

  const handleDelete = (booking: Booking) => {
    setSelectedBooking(booking);
    setDeletePopup(true);
  };

  const handleReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewModal(true);
  };

  const handleReviewSubmit = (review: Review) => {
    setSubmittedReviews((prev) => [...prev, review]);
    setReviewModal(false);
    toast.success('Review submitted! Thank you for your feedback.', { duration: 4000 });
  };

  const getReview = (bookingId: string) => submittedReviews.find((r) => r.bookingId === bookingId);

  const confirmDelete = () => {
    if (!selectedBooking) return;
    setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
    setSuccessPopup(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display">My Bookings</h1>
        <p className="text-gray-500 mt-1">Manage all your travel bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
            }`}>
            {f === 'all' ? 'All Bookings' : f}
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filtered.map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-5 p-5">
              <img
                src={booking.image}
                alt={booking.destination}
                className="w-full sm:w-32 h-28 sm:h-24 rounded-2xl object-cover shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=80'; }}
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-gray-400">#{booking.id}</span>
                    <h3 className="font-bold text-gray-900 font-display text-lg">{booking.packageTitle}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-400" />{booking.destination}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange-400" />{booking.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-orange-400" />{booking.travelers} travelers</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Vendor: {booking.vendor}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 font-display">${booking.amount.toLocaleString()}</div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize inline-block mt-1 ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Review badge for completed bookings */}
            {booking.status === 'completed' && getReview(booking.id) && (
              <div className="mx-5 mb-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                <div className="flex gap-0.5 shrink-0 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < getReview(booking.id)!.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 line-clamp-2">{getReview(booking.id)!.comment}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Your review · {getReview(booking.id)!.date}</p>
                </div>
                {getReview(booking.id)!.photoPreview && (
                  <img src={getReview(booking.id)!.photoPreview} alt="Review" className="w-12 h-10 rounded-xl object-cover shrink-0 border border-amber-200" />
                )}
              </div>
            )}

            <div className="flex gap-2 px-5 pb-5 flex-wrap">
              <button
                onClick={() => handleEdit(booking)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 text-sm font-medium rounded-xl hover:bg-orange-100 hover:scale-105 hover:shadow-sm transition-all"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleView(booking)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-100 hover:scale-105 hover:shadow-sm transition-all"
              >
                <Eye className="w-4 h-4" /> Details
              </button>
              <Link
                to={`/booking/${booking.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-[#f0fafb] text-[#003135] text-sm font-medium rounded-xl border border-[#AFDDE5]/40 hover:border-[#0FA4AF] hover:scale-105 hover:shadow-sm transition-all"
              >
                <ExternalLink className="w-4 h-4 text-[#0FA4AF]" /> Full Details
              </Link>
              {booking.status === 'completed' && !getReview(booking.id) && (
                <button
                  onClick={() => handleReview(booking)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 text-sm font-medium rounded-xl border border-amber-200 hover:bg-amber-100 hover:scale-105 hover:shadow-sm transition-all"
                >
                  <Star className="w-4 h-4" /> Write Review
                </button>
              )}
              {booking.status === 'completed' && getReview(booking.id) && (
                <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-xl border border-emerald-100">
                  <CheckCircle className="w-4 h-4" /> Reviewed
                </span>
              )}
              {booking.status !== 'completed' && (
                <button
                  onClick={() => handleDelete(booking)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 text-sm font-medium rounded-xl hover:bg-red-100 hover:scale-105 hover:shadow-sm transition-all ml-auto"
                >
                  <Trash2 className="w-4 h-4" /> Cancel
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-orange-50">
            <div className="text-5xl mb-3">📭</div>
            <h3 className="font-bold text-gray-700 font-display">No bookings found</h3>
            <p className="text-gray-400 text-sm mt-1">Adjust your filter or explore new destinations</p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <BookingDetailModal isOpen={viewModal} onClose={() => setViewModal(false)} booking={selectedBooking} />

      {/* Review Modal */}
      <ReviewModal isOpen={reviewModal} onClose={() => setReviewModal(false)} booking={selectedBooking} onSubmit={handleReviewSubmit} />

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Booking">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Travel Date</label>
            <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Number of Travelers</label>
            <select value={editForm.travelers} onChange={(e) => setEditForm({ ...editForm, travelers: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setEditModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">Save Changes</button>
          </div>
        </div>
      </Modal>

      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Cancel Booking?" message={`Are you sure you want to cancel "${selectedBooking?.packageTitle}"? Cancellation policy may apply.`}
        onConfirm={confirmDelete} confirmLabel="Yes, Cancel" />
      <Popup isOpen={successPopup} onClose={() => setSuccessPopup(false)} type="success"
        title="Done!" message="Your booking has been updated successfully." />
    </div>
  );
}
