import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'warning' | 'error' | 'confirm';
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmLabel?: string;
}

const icons = {
  success: { Icon: CheckCircle, color: 'text-[#0FA4AF]', bg: 'bg-[#AFDDE5]/30' },
  warning: { Icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  error: { Icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  confirm: { Icon: AlertTriangle, color: 'text-[#964734]', bg: 'bg-[#964734]/10' },
};

export default function Popup({ isOpen, onClose, type, title, message, onConfirm, confirmLabel = 'Confirm' }: Props) {
  const { Icon, color, bg } = icons[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-[#003135]/15 p-7 text-center border border-[#AFDDE5]/30"
          >
            <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-8 h-8 ${color}`} />
            </div>
            <h3 className="text-xl font-bold text-[#003135] font-display mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{message}</p>
            <div className="flex gap-3">
              {type === 'confirm' && onConfirm ? (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 px-5 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { onConfirm(); onClose(); }}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    {confirmLabel}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Got it!
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
