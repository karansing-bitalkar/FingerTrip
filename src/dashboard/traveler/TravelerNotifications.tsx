import { useState } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { NOTIFICATIONS } from '@/constants/data';
import type { Notification } from '@/types';

const typeIcons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  error: <X className="w-5 h-5 text-red-500" />,
};

const typeBg = {
  success: 'bg-emerald-50 border-emerald-100',
  info: 'bg-blue-50 border-blue-100',
  warning: 'bg-amber-50 border-amber-100',
  error: 'bg-red-50 border-red-100',
};

export default function TravelerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const remove = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Notifications</h1>
          <p className="text-gray-500 mt-1">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
            Mark All Read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all ${typeBg[notif.type]} ${!notif.read ? 'shadow-sm' : 'opacity-75'}`}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
              {typeIcons[notif.type]}
            </div>
            <div className="flex-1 min-w-0" onClick={() => markRead(notif.id)} style={{ cursor: !notif.read ? 'pointer' : 'default' }}>
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-gray-900 text-sm">{notif.title}</div>
                {!notif.read && <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0 mt-1.5" />}
              </div>
              <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
              <p className="text-gray-400 text-xs mt-2">{notif.date}</p>
            </div>
            <button onClick={() => remove(notif.id)} className="shrink-0 w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-orange-50">
            <Bell className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-gray-700 font-display">All caught up!</h3>
            <p className="text-gray-400 text-sm mt-1">No notifications at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
