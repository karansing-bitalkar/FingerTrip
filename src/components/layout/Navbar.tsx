import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Globe, LogOut, Search,
  LayoutDashboard, UserCircle, Settings, Bell, Compass,
  CheckCircle, Info, AlertTriangle
} from 'lucide-react';
import { getStoredUser, clearUser } from '@/hooks/useAuth';
import DestinationSearch from '@/components/features/DestinationSearch';
import { NOTIFICATIONS } from '@/constants/data';
import type { Notification } from '@/types';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Packages', path: '/packages' },
  { label: 'Vendors', path: '/vendors' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const ROLE_COLORS: Record<string, string> = {
  traveler: 'from-orange-400 to-amber-500',
  vendor: 'from-emerald-500 to-teal-500',
  admin: 'from-purple-500 to-indigo-500',
};

const ROLE_BADGE: Record<string, string> = {
  traveler: 'bg-orange-100 text-orange-700',
  vendor: 'bg-emerald-100 text-emerald-700',
  admin: 'bg-purple-100 text-purple-700',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'vendor') return '/vendor-dashboard';
    return '/traveler-dashboard';
  };

  const getProfilePath = () => {
    if (!user) return '/login';
    if (user.role === 'vendor') return '/vendor-dashboard/profile';
    if (user.role === 'admin') return '/admin-dashboard/settings';
    return '/traveler-dashboard/profile';
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const notifTypeIcon = (type: Notification['type']) => {
    if (type === 'success') return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (type === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    if (type === 'error') return <X className="w-4 h-4 text-red-500" />;
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  const isHomePage = location.pathname === '/';
  const isTransparent = !scrolled && isHomePage;

  // Generate avatar initials (up to 2 chars)
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <>
      <DestinationSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          !isTransparent
            ? 'bg-white/96 backdrop-blur-md shadow-lg shadow-[#003135]/8 border-b border-[#AFDDE5]/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003135] to-[#0FA4AF] flex items-center justify-center shadow-lg shadow-[#0FA4AF]/30">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold font-display transition-colors ${isTransparent ? 'text-white' : 'text-[#003135]'}`}>
                Finger<span className="text-[#0FA4AF]">Trip</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-[#AFDDE5]/40 text-[#003135]'
                      : isTransparent
                      ? 'text-white/90 hover:bg-white/15 hover:text-white'
                      : 'text-gray-700 hover:bg-[#AFDDE5]/30 hover:text-[#003135]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all border ${
                  isTransparent
                    ? 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                    : 'bg-[#f0fafb] border-[#AFDDE5] text-gray-600 hover:border-[#0FA4AF] hover:text-[#003135]'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
                <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isTransparent ? 'bg-white/15 text-white/60' : 'bg-gray-100 text-gray-400'}`}>
                  ⌘K
                </kbd>
              </button>

              {user && user.role === 'traveler' && (
                <div className="relative" ref={bellRef}>
                  <button
                    onClick={() => setBellOpen(!bellOpen)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      isTransparent
                        ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                        : 'bg-[#f0fafb] border border-[#AFDDE5] text-[#003135] hover:border-[#0FA4AF]'
                    }`}
                  >
                    <Bell className="w-4.5 h-4.5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] h-[18px] bg-[#964734] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-1">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {bellOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-xl shadow-[#003135]/12 border border-[#AFDDE5]/50 overflow-hidden z-50"
                      >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[#AFDDE5]/30">
                          <span className="font-bold text-[#003135] text-sm">Notifications</span>
                          <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                              <button onClick={markAllRead} className="text-[10px] text-[#0FA4AF] font-semibold hover:text-[#024950] transition-colors">
                                Mark all read
                              </button>
                            )}
                            {unreadCount > 0 && <span className="w-5 h-5 bg-[#964734] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
                          </div>
                        </div>
                        <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                          {notifications.slice(0, 4).map((n) => (
                            <div
                              key={n.id}
                              onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[#f0fafb] ${
                                !n.read ? 'bg-[#f0fafb]' : ''
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                {notifTypeIcon(n.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <span className="text-sm font-semibold text-gray-900 leading-tight">{n.title}</span>
                                  {!n.read && <span className="w-2 h-2 bg-[#964734] rounded-full shrink-0 mt-1" />}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
                                <span className="text-[10px] text-gray-400 mt-1 block">{n.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-[#AFDDE5]/30">
                          <Link
                            to="/traveler-dashboard/notifications"
                            onClick={() => setBellOpen(false)}
                            className="block text-center text-xs font-semibold text-[#0FA4AF] hover:text-[#024950] py-1.5 transition-colors"
                          >
                            View all notifications →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-2xl transition-all border ${
                      isTransparent
                        ? 'bg-white/15 border-white/20 hover:bg-white/25 text-white'
                        : 'bg-white border-[#AFDDE5]/60 hover:border-[#0FA4AF]/50 hover:shadow-sm text-gray-800'
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${ROLE_COLORS[user.role] || 'from-[#003135] to-[#0FA4AF]'} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}>
                      {getInitials(user.name)}
                    </div>
                    <div className="text-left leading-tight">
                      <div className={`text-sm font-semibold leading-none ${isTransparent ? 'text-white' : 'text-[#003135]'}`}>
                        {user.name.split(' ')[0]}
                      </div>
                      <div className={`text-[10px] capitalize mt-0.5 ${isTransparent ? 'text-white/60' : 'text-gray-400'}`}>
                        {user.role}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''} ${isTransparent ? 'text-white/70' : 'text-gray-400'}`} />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl shadow-xl shadow-[#003135]/12 border border-[#AFDDE5]/50 overflow-hidden"
                      >
                        {/* User info header */}
                        <div className="p-4 border-b border-[#AFDDE5]/30">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ROLE_COLORS[user.role] || 'from-[#003135] to-[#0FA4AF]'} flex items-center justify-center text-white font-bold shadow-sm`}>
                              {getInitials(user.name)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-[#003135] text-sm truncate">{user.name}</div>
                              <div className="text-xs text-gray-400 truncate">{user.email || 'fingertrip.com'}</div>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize mt-1 inline-block ${ROLE_BADGE[user.role] || 'bg-gray-100 text-gray-600'}`}>
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="p-2">
                          <Link
                            to={getDashboardPath()}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] hover:text-[#003135] transition-colors group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#AFDDE5]/40 flex items-center justify-center group-hover:bg-[#AFDDE5]/70 transition-colors">
                              <LayoutDashboard className="w-4 h-4 text-[#0FA4AF]" />
                            </div>
                            <span className="font-medium">My Dashboard</span>
                          </Link>

                          <Link
                            to={getProfilePath()}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] hover:text-[#003135] transition-colors group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                              <UserCircle className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-medium">My Profile</span>
                          </Link>

                          {user.role === 'traveler' && (
                            <Link
                              to="/traveler-dashboard/notifications"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] hover:text-[#003135] transition-colors group"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Bell className="w-4 h-4 text-gray-500" />
                              </div>
                              <span className="font-medium">Notifications</span>
                              <span className="ml-auto text-[10px] bg-[#964734] text-white font-bold px-1.5 py-0.5 rounded-full">2</span>
                            </Link>
                          )}

                          {user.role === 'traveler' && (
                            <Link
                              to="/packages"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] hover:text-[#003135] transition-colors group"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Compass className="w-4 h-4 text-gray-500" />
                              </div>
                              <span className="font-medium">Explore Packages</span>
                            </Link>
                          )}

                          {user.role === 'admin' && (
                            <Link
                              to="/admin-dashboard/settings"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-[#f0fafb] hover:text-[#003135] transition-colors group"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Settings className="w-4 h-4 text-gray-500" />
                              </div>
                              <span className="font-medium">Settings</span>
                            </Link>
                          )}

                          <div className="border-t border-gray-50 mt-1 pt-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <LogOut className="w-4 h-4 text-red-500" />
                              </div>
                              <span className="font-medium">Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isTransparent
                        ? 'text-white/90 hover:bg-white/15 hover:text-white'
                        : 'text-gray-700 hover:bg-[#AFDDE5]/30 hover:text-[#003135]'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white hover:from-[#024950] hover:to-[#0FA4AF] transition-all shadow-lg shadow-[#003135]/20 hover:shadow-[#0FA4AF]/30"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-xl transition-colors ${isTransparent ? 'text-white hover:bg-white/15' : 'text-[#003135] hover:bg-[#f0fafb]'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              {user && (
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${ROLE_COLORS[user.role] || 'from-[#003135] to-[#0FA4AF]'} flex items-center justify-center text-white text-xs font-bold`}>
                  {getInitials(user.name)}
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl transition-colors ${isTransparent ? 'text-white hover:bg-white/15' : 'text-gray-700 hover:bg-[#f0fafb]'}`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-[#AFDDE5]/40 shadow-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-[#AFDDE5]/40 text-[#003135]'
                        : 'text-gray-700 hover:bg-[#f0fafb] hover:text-[#003135]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 border-t border-[#AFDDE5]/40">
                  {user ? (
                    <>
                      {/* Mobile user card */}
                      <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-[#f0fafb] rounded-xl">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ROLE_COLORS[user.role] || 'from-[#003135] to-[#0FA4AF]'} flex items-center justify-center text-white font-bold`}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="font-bold text-[#003135] text-sm">{user.name}</div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${ROLE_BADGE[user.role] || 'bg-gray-100 text-gray-600'}`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          to={getDashboardPath()}
                          className="w-full px-4 py-3 rounded-xl text-sm font-medium text-[#003135] bg-[#AFDDE5]/30 text-center flex items-center justify-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4" /> My Dashboard
                        </Link>
                        <Link
                          to={getProfilePath()}
                          className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 text-center flex items-center justify-center gap-2"
                        >
                          <UserCircle className="w-4 h-4" /> My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 bg-red-50 text-center flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/login"
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 text-center"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#003135] to-[#0FA4AF] text-white text-center"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
