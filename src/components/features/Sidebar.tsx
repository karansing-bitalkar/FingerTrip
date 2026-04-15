import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getStoredUser, clearUser } from '@/hooks/useAuth';
import Popup from './Popup';
import { toast } from 'sonner';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface Props {
  navItems: NavItem[];
  title: string;
  roleColor: string;
}

export default function Sidebar({ navItems, title, roleColor }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    clearUser();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  // Exact match for active path
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname === path + '/';
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full bg-[#003135]">
      {/* Header */}
      <div className={`flex items-center ${collapsed && !mobile ? 'justify-center px-4' : 'justify-between px-5'} py-5 border-b border-[#024950]`}>
        {(!collapsed || mobile) && (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${roleColor} flex items-center justify-center`}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm font-display">FingerTrip</div>
              <div className="text-xs text-[#AFDDE5]/60">{title}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => mobile ? setMobileOpen(false) : setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg bg-[#024950] text-[#AFDDE5] flex items-center justify-center hover:bg-[#0FA4AF]/20 transition-colors"
        >
          {mobile ? <X className="w-4 h-4" /> : collapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* User Info */}
      {user && (!collapsed || mobile) && (
        <div className="px-5 py-4 border-b border-[#024950]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-white text-sm truncate">{user.name}</div>
              <div className="text-xs text-[#AFDDE5]/50 truncate">{user.email}</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => mobile && setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? `bg-gradient-to-r ${roleColor} text-white shadow-lg`
                      : 'text-[#AFDDE5]/70 hover:bg-[#024950] hover:text-[#AFDDE5]'
                  } ${collapsed && !mobile ? 'justify-center' : ''}`}
                  title={collapsed && !mobile ? item.label : undefined}
                >
                  <span className={`shrink-0 ${active ? 'text-white' : 'text-[#AFDDE5]/60'}`}>{item.icon}</span>
                  {(!collapsed || mobile) && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className={`px-3 py-4 border-t border-[#024950] space-y-1`}>
        {/* Public Site Button */}
        <Link
          to="/"
          onClick={() => mobile && setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#AFDDE5]/70 hover:bg-[#024950] hover:text-[#AFDDE5] transition-all ${collapsed && !mobile ? 'justify-center' : ''}`}
          title={collapsed && !mobile ? 'Public Site' : undefined}
        >
          <Globe className="w-4 h-4 shrink-0 text-[#AFDDE5]/60" />
          {(!collapsed || mobile) && <span>Public Site</span>}
        </Link>

        {/* Logout Button */}
        <button
          onClick={() => setLogoutPopup(true)}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors ${collapsed && !mobile ? 'justify-center' : ''}`}
          title={collapsed && !mobile ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(!collapsed || mobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#003135] rounded-xl shadow-lg border border-[#024950] flex items-center justify-center text-[#AFDDE5]"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 bg-[#003135] z-50 shadow-2xl"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25 }}
        className="hidden lg:flex flex-col h-screen bg-[#003135] border-r border-[#024950] shadow-xl sticky top-0 shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Logout Popup */}
      <Popup
        isOpen={logoutPopup}
        onClose={() => setLogoutPopup(false)}
        type="confirm"
        title="Confirm Logout"
        message="Are you sure you want to logout from FingerTrip?"
        onConfirm={handleLogout}
        confirmLabel="Logout"
      />
    </>
  );
}
