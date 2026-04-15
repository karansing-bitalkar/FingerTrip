import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import LiveChat from "@/components/features/LiveChat";
import CompareBar from "@/components/features/CompareBar";
import AdminProtectedRoute from "@/components/features/AdminProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import Vendors from "./pages/Vendors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VendorLogin from "./pages/VendorLogin";
import AdminLogin from "./pages/AdminLogin";

// Footer Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import HelpCenter from "./pages/HelpCenter";
import Careers from "./pages/Careers";
import Blogs from "./pages/Blogs";
import FAQ from "./pages/FAQ";
import ContactSupport from "./pages/ContactSupport";
import BookingDetail from "./pages/BookingDetail";
import ResetPassword from "./pages/ResetPassword";
import VendorDetail from "./pages/VendorDetail";
import PackageDetail from "./pages/PackageDetail";
import BlogDetail from "./pages/BlogDetail";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

// Dashboard Layouts (pure layout components using <Outlet />)
import { TravelerDashboardLayout, VendorDashboardLayout, AdminDashboardLayout } from "./dashboard/Dashboards";

// Traveler Dashboard Pages
import TravelerOverview from "./dashboard/traveler/TravelerOverview";
import TravelerBookings from "./dashboard/traveler/TravelerBookings";
import TravelerWishlist from "./dashboard/traveler/TravelerWishlist";
import TravelerPayments from "./dashboard/traveler/TravelerPayments";
import TravelerNotifications from "./dashboard/traveler/TravelerNotifications";
import TravelerProfile from "./dashboard/traveler/TravelerProfile";
import TravelerSupport from "./dashboard/traveler/TravelerSupport";

// Vendor Dashboard Pages
import VendorOverview from "./dashboard/vendor/VendorOverview";
import VendorPackages from "./dashboard/vendor/VendorPackages";
import VendorAddPackage from "./dashboard/vendor/VendorAddPackage";
import VendorOrders from "./dashboard/vendor/VendorOrders";
import VendorEarnings from "./dashboard/vendor/VendorEarnings";
import VendorReviews from "./dashboard/vendor/VendorReviews";
import VendorProfile from "./dashboard/vendor/VendorProfile";

// Admin Dashboard Pages
import AdminOverview from "./dashboard/admin/AdminOverview";
import AdminUsers from "./dashboard/admin/AdminUsers";
import AdminVendors from "./dashboard/admin/AdminVendors";
import AdminBookings from "./dashboard/admin/AdminBookings";
import AdminAnalytics from "./dashboard/admin/AdminAnalytics";
import AdminReports from "./dashboard/admin/AdminReports";
import AdminSettings from "./dashboard/admin/AdminSettings";

const queryClient = new QueryClient();

function GlobalChat() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('-dashboard');
  const isLogin = location.pathname.includes('login');
  if (isDashboard || isLogin) return null;
  return <><LiveChat /><CompareBar /></>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <GlobalChat />
        <Routes>
          {/* ─── Public Routes ─── */}
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ─── Auth Routes ─── */}
          <Route path="/login" element={<Login />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/booking/:id" element={<BookingDetail />} />

          {/* ─── Footer Pages ─── */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact-support" element={<ContactSupport />} />

          {/* ─── Traveler Dashboard — Nested Routes ─── */}
          <Route path="/traveler-dashboard" element={<TravelerDashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<TravelerOverview />} />
            <Route path="bookings" element={<TravelerBookings />} />
            <Route path="wishlist" element={<TravelerWishlist />} />
            <Route path="payments" element={<TravelerPayments />} />
            <Route path="notifications" element={<TravelerNotifications />} />
            <Route path="profile" element={<TravelerProfile />} />
            <Route path="support" element={<TravelerSupport />} />
          </Route>

          {/* ─── Vendor Dashboard — Nested Routes ─── */}
          <Route path="/vendor-dashboard" element={<VendorDashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<VendorOverview />} />
            <Route path="packages" element={<VendorPackages />} />
            <Route path="add-package" element={<VendorAddPackage />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="earnings" element={<VendorEarnings />} />
            <Route path="reviews" element={<VendorReviews />} />
            <Route path="profile" element={<VendorProfile />} />
          </Route>

          {/* ─── Admin Dashboard — Protected + Nested Routes ─── */}
          {/*
            Pattern: AdminProtectedRoute (auth guard, renders <Outlet />) 
            → AdminDashboardLayout (sidebar layout, renders <Outlet />)
            → Child page components
          */}
          <Route path="/admin-dashboard" element={<AdminProtectedRoute />}>
            <Route element={<AdminDashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="vendors" element={<AdminVendors />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* ─── 404 ─── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
