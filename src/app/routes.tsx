import { createBrowserRouter, Navigate } from 'react-router';
import NotFoundPage from './pages/NotFoundPage';
import RouteErrorPage from './pages/RouteErrorPage';
import { ProtectedRoute } from './lib/ProtectedRoute';

const errorElement = <RouteErrorPage />;

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => ({ Component: (await import('./pages/LandingPage')).default }),
    errorElement,
  },
  {
    path: '/driver-dashboard',
    lazy: async () => {
      const Component = (await import('./pages/DriverDashboard')).default;
      return {
        Component: () => (
          <ProtectedRoute requiredRole="driver">
            <Component />
          </ProtectedRoute>
        ),
      };
    },
    errorElement,
  },
  {
    path: '/driver',
    lazy: async () => ({ Component: (await import('./pages/DriverAccess')).default }),
    errorElement,
  },
  {
    path: '/driver/login',
    lazy: async () => ({ Component: (await import('./pages/DriverLogin')).default }),
    errorElement,
  },
  {
    path: '/driver/register',
    lazy: async () => ({ Component: (await import('./pages/DriverRegister')).default }),
    errorElement,
  },
  {
    path: '/driver-access',
    Component: () => <Navigate to="/driver" replace />,
    errorElement,
  },
  {
    path: '/driver-login',
    Component: () => <Navigate to="/driver/login" replace />,
    errorElement,
  },
  {
    path: '/driver-register',
    Component: () => <Navigate to="/driver/register" replace />,
    errorElement,
  },
  {
    path: '/trader-dashboard',
    lazy: async () => {
      const Component = (await import('./pages/TraderDashboard')).default;
      return {
        Component: () => (
          <ProtectedRoute requiredRole="shipper">
            <Component />
          </ProtectedRoute>
        ),
      };
    },
    errorElement,
  },
  {
    path: '/trader-register',
    lazy: async () => ({ Component: (await import('./pages/TraderRegister')).default }),
    errorElement,
  },
  {
    path: '/trader-login',
    lazy: async () => ({ Component: (await import('./pages/TraderLogin')).default }),
    errorElement,
  },
  {
    path: '/truck-marketplace',
    lazy: async () => {
      const Component = (await import('./pages/TruckMarketplace')).default;
      return {
        Component: () => (
          <ProtectedRoute requiredRole="shipper">
            <Component />
          </ProtectedRoute>
        ),
      };
    },
    errorElement,
  },
  {
    path: '/post-load',
    lazy: async () => {
      const Component = (await import('./pages/PostLoad')).default;
      return {
        Component: () => (
          <ProtectedRoute requiredRole="shipper">
            <Component />
          </ProtectedRoute>
        ),
      };
    },
    errorElement,
  },
  {
    path: '/optimize-return-trip',
    lazy: async () => {
      const Component = (await import('./pages/OptimizeReturnTrip')).default;
      return {
        Component: () => (
          <ProtectedRoute requiredRole="driver">
            <Component />
          </ProtectedRoute>
        ),
      };
    },
    errorElement,
  },
  {
    path: '*',
    Component: NotFoundPage,
    errorElement,
  },
]);


