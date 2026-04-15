import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, PlusCircle, ShoppingBag, DollarSign,
  Star, UserCircle, Bell, Heart, CreditCard, MessageSquare,
  BarChart2, FileText, Settings, Users
} from 'lucide-react';
import Sidebar from '@/components/features/Sidebar';

const travelerNav = [
  { label: 'Overview', path: '/traveler-dashboard/overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Bookings', path: '/traveler-dashboard/bookings', icon: <ShoppingBag className="w-4 h-4" /> },
  { label: 'Wishlist', path: '/traveler-dashboard/wishlist', icon: <Heart className="w-4 h-4" /> },
  { label: 'Payments', path: '/traveler-dashboard/payments', icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Notifications', path: '/traveler-dashboard/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Profile', path: '/traveler-dashboard/profile', icon: <UserCircle className="w-4 h-4" /> },
  { label: 'Support', path: '/traveler-dashboard/support', icon: <MessageSquare className="w-4 h-4" /> },
];

const vendorNav = [
  { label: 'Overview', path: '/vendor-dashboard/overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Packages', path: '/vendor-dashboard/packages', icon: <Package className="w-4 h-4" /> },
  { label: 'Add Package', path: '/vendor-dashboard/add-package', icon: <PlusCircle className="w-4 h-4" /> },
  { label: 'Orders', path: '/vendor-dashboard/orders', icon: <ShoppingBag className="w-4 h-4" /> },
  { label: 'Earnings', path: '/vendor-dashboard/earnings', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Reviews', path: '/vendor-dashboard/reviews', icon: <Star className="w-4 h-4" /> },
  { label: 'Profile', path: '/vendor-dashboard/profile', icon: <UserCircle className="w-4 h-4" /> },
];

const adminNav = [
  { label: 'Overview', path: '/admin-dashboard/overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Users', path: '/admin-dashboard/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Vendors', path: '/admin-dashboard/vendors', icon: <Package className="w-4 h-4" /> },
  { label: 'Bookings', path: '/admin-dashboard/bookings', icon: <ShoppingBag className="w-4 h-4" /> },
  { label: 'Analytics', path: '/admin-dashboard/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Reports', path: '/admin-dashboard/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Settings', path: '/admin-dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

function DashboardLayout({ navItems, title, roleColor }: { navItems: typeof travelerNav; title: string; roleColor: string }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#f0fafb' }}>
      <Sidebar navItems={navItems} title={title} roleColor={roleColor} />
      <main className="flex-1 overflow-auto">
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8 pt-16 lg:pt-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export function TravelerDashboardLayout() {
  return <DashboardLayout navItems={travelerNav} title="Traveler Portal" roleColor="from-[#964734] to-[#0FA4AF]" />;
}

export function VendorDashboardLayout() {
  return <DashboardLayout navItems={vendorNav} title="Vendor Portal" roleColor="from-[#0FA4AF] to-[#024950]" />;
}

export function AdminDashboardLayout() {
  return <DashboardLayout navItems={adminNav} title="Admin Portal" roleColor="from-[#964734] to-[#003135]" />;
}
