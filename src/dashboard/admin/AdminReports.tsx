import { useState } from 'react';
import { FileText, Download, TrendingUp, Users, ShoppingBag, DollarSign, PlusCircle, Edit, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '@/components/features/Popup';
import { toast } from 'sonner';

interface Report {
  id: string;
  title: string;
  desc: string;
  type: string;
  lastGenerated: string;
  size: string;
  status: 'ready' | 'generating' | 'scheduled';
}

const INITIAL_REPORTS: Report[] = [
  { id: 'R001', title: 'Monthly Revenue Report', desc: 'Complete revenue breakdown by destination, vendor, and category for the current billing period.', type: 'Financial', lastGenerated: 'Apr 7, 2026', size: '2.4 MB', status: 'ready' },
  { id: 'R002', title: 'User Activity Report', desc: 'User registration, retention, booking frequency, and churn analysis with detailed cohort data.', type: 'Users', lastGenerated: 'Apr 7, 2026', size: '1.8 MB', status: 'ready' },
  { id: 'R003', title: 'Vendor Performance Report', desc: 'Vendor ratings, booking volumes, earnings, commission breakdown and dispute history.', type: 'Vendors', lastGenerated: 'Apr 6, 2026', size: '3.1 MB', status: 'ready' },
  { id: 'R004', title: 'Booking Analytics Report', desc: 'Booking trends, popular destinations, seasonal patterns, and conversion rate analysis.', type: 'Bookings', lastGenerated: 'Apr 5, 2026', size: '2.7 MB', status: 'ready' },
  { id: 'R005', title: 'Platform Health Report', desc: 'System uptime, API performance, error rates, load metrics, and security incidents.', type: 'Technical', lastGenerated: 'Apr 4, 2026', size: '1.2 MB', status: 'ready' },
  { id: 'R006', title: 'Marketing ROI Report', desc: 'Campaign performance, acquisition costs, conversion analysis and channel attribution.', type: 'Marketing', lastGenerated: 'Apr 1, 2026', size: '1.9 MB', status: 'scheduled' },
];

const typeIcons: Record<string, React.ReactNode> = {
  Financial: <DollarSign className="w-5 h-5 text-orange-500" />,
  Users: <Users className="w-5 h-5 text-blue-500" />,
  Vendors: <TrendingUp className="w-5 h-5 text-emerald-500" />,
  Bookings: <ShoppingBag className="w-5 h-5 text-purple-500" />,
  Technical: <FileText className="w-5 h-5 text-gray-500" />,
  Marketing: <TrendingUp className="w-5 h-5 text-pink-500" />,
};

const typeColors: Record<string, string> = {
  Financial: 'bg-orange-50',
  Users: 'bg-blue-50',
  Vendors: 'bg-emerald-50',
  Bookings: 'bg-purple-50',
  Technical: 'bg-gray-50',
  Marketing: 'bg-pink-50',
};

const statusBadge: Record<string, string> = {
  ready: 'bg-emerald-100 text-emerald-700',
  generating: 'bg-amber-100 text-amber-700',
  scheduled: 'bg-blue-100 text-blue-700',
};

const EMPTY_FORM = { title: '', desc: '', type: 'Financial', status: 'ready' as const };

function ReportModal({ isOpen, onClose, title: modalTitle, form, setForm, onSave }: {
  isOpen: boolean; onClose: () => void; title: string;
  form: typeof EMPTY_FORM; setForm: (f: typeof EMPTY_FORM) => void; onSave: () => void;
}) {
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">{modalTitle}</h3>
              <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Report Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g. Q2 Revenue Summary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Description</label>
                <textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} placeholder="Brief description of this report..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
                    {['Financial', 'Users', 'Vendors', 'Bookings', 'Technical', 'Marketing'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Report['status'] })} className={inputClass}>
                    <option value="ready">Ready</option>
                    <option value="generating">Generating</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200">Cancel</button>
                <button onClick={onSave} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg">Save</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);
  const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
  const [editForm, setEditForm] = useState({ ...EMPTY_FORM });

  const handleAdd = () => {
    if (!addForm.title) return;
    const newReport: Report = {
      id: `R${String(reports.length + 1).padStart(3, '0')}`,
      ...addForm,
      lastGenerated: 'Not yet',
      size: '—',
    };
    setReports((prev) => [newReport, ...prev]);
    setAddModal(false);
    setAddForm({ ...EMPTY_FORM });
    toast.success('Report created!');
  };

  const handleEdit = (r: Report) => {
    setSelected(r);
    setEditForm({ title: r.title, desc: r.desc, type: r.type, status: r.status });
    setEditModal(true);
  };

  const handleSave = () => {
    if (!selected) return;
    setReports((prev) => prev.map((r) => r.id === selected.id ? { ...r, ...editForm } : r));
    setEditModal(false);
    toast.success('Report updated!');
  };

  const handleGenerate = (r: Report) => {
    setReports((prev) => prev.map((rep) => rep.id === r.id ? { ...rep, status: 'generating' } : rep));
    setTimeout(() => {
      setReports((prev) => prev.map((rep) => rep.id === r.id ? { ...rep, status: 'ready', lastGenerated: 'Just now', size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB` } : rep));
      toast.success(`${r.title} generated successfully!`);
    }, 2000);
  };

  const confirmDelete = () => {
    if (!selected) return;
    setReports((prev) => prev.filter((r) => r.id !== selected.id));
    toast.success('Report deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Reports</h1>
          <p className="text-gray-500 mt-1">Generate, manage, and download platform reports</p>
        </div>
        <button
          onClick={() => { setAddForm({ ...EMPTY_FORM }); setAddModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl text-sm shadow-lg hover:shadow-orange-200 transition-all"
        >
          <PlusCircle className="w-4 h-4" /> New Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: reports.length, icon: <FileText className="w-5 h-5" />, color: 'bg-orange-50 text-orange-500' },
          { label: 'Ready', value: reports.filter((r) => r.status === 'ready').length, icon: <Download className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-500' },
          { label: 'Scheduled', value: reports.filter((r) => r.status === 'scheduled').length, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-blue-50 text-blue-500' },
          { label: 'Generating', value: reports.filter((r) => r.status === 'generating').length, icon: <DollarSign className="w-5 h-5" />, color: 'bg-amber-50 text-amber-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900 font-display">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((report) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 ${typeColors[report.type] || 'bg-gray-50'} rounded-2xl flex items-center justify-center shrink-0`}>
                {typeIcons[report.type] || <FileText className="w-5 h-5 text-gray-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 text-sm">{report.title}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize shrink-0 ${statusBadge[report.status]}`}>{report.status}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{report.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span>Last: {report.lastGenerated}</span>
              <span>{report.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleGenerate(report)}
                disabled={report.status === 'generating'}
                className="flex-1 py-2 bg-orange-50 text-orange-600 text-xs font-medium rounded-xl hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {report.status === 'generating' ? '⏳ Generating...' : '▶ Generate'}
              </button>
              {report.status === 'ready' && (
                <button
                  onClick={() => toast.success(`Downloading ${report.title}...`)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 text-xs font-medium rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              )}
              <button onClick={() => handleEdit(report)} className="w-8 h-8 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => { setSelected(report); setDeletePopup(true); }} className="w-8 h-8 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 flex items-center justify-center">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ReportModal isOpen={addModal} onClose={() => setAddModal(false)} title="Create New Report" form={addForm} setForm={setAddForm} onSave={handleAdd} />
      <ReportModal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Report" form={editForm} setForm={setEditForm} onSave={handleSave} />
      <Popup isOpen={deletePopup} onClose={() => setDeletePopup(false)} type="confirm"
        title="Delete Report?" message={`Delete "${selected?.title}"? This cannot be undone.`}
        onConfirm={confirmDelete} confirmLabel="Delete" />
    </div>
  );
}
