import { Navigate, Outlet } from 'react-router-dom';
import { getStoredUser } from '@/hooks/useAuth';

/**
 * AdminProtectedRoute — wraps admin routes.
 * Used as a layout route: renders <Outlet /> for nested routes when admin,
 * or redirects to /admin-login if not authorized.
 */
export default function AdminProtectedRoute() {
  const user = getStoredUser();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}
