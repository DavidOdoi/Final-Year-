import { Navigate } from 'react-router';
import { useAuth, UserRole } from './authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

function getLoginPath(role: UserRole) {
  return role === 'driver' ? '/driver/login' : '/trader-login';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, currentRole } = useAuth();

  // Not authenticated - redirect to appropriate login
  if (!isAuthenticated || !user) {
    const role = requiredRole || currentRole || 'driver';
    return <Navigate to={getLoginPath(role)} replace />;
  }

  // Check role match
  if (requiredRole && user.role !== requiredRole) {
    // User is trying to access wrong dashboard
    console.warn(
      `User ${user.email} with role ${user.role} attempted to access ${requiredRole} dashboard`
    );
    // Redirect to their own dashboard
    const dashboardPath =
      user.role === 'driver' ? '/driver-dashboard' : '/trader-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}
