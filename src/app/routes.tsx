import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import DriverDashboard from './pages/DriverDashboard';
import TraderDashboard from './pages/TraderDashboard';
import TraderRegister from './pages/TraderRegister';
import TraderLogin from './pages/TraderLogin';
import TruckMarketplace from './pages/TruckMarketplace';
import PostLoad from './pages/PostLoad';
import OptimizeReturnTrip from './pages/OptimizeReturnTrip';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/driver-dashboard',
    Component: DriverDashboard,
  },
  {
    path: '/trader-dashboard',
    Component: TraderDashboard,
  },
  {
    path: '/trader-register',
    Component: TraderRegister,
  },
  {
    path: '/trader-login',
    Component: TraderLogin,
  },
  {
    path: '/truck-marketplace',
    Component: TruckMarketplace,
  },
  {
    path: '/post-load',
    Component: PostLoad,
  },
  {
    path: '/optimize-return-trip',
    Component: OptimizeReturnTrip,
  },
]);
