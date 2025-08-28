import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthService from 'services/Auth.service';
import { Navigate } from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing

const isAuth = AuthService.getCurrentUser();

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: isAuth ? <DashboardDefault /> : <Navigate to={'/login'} replace />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: isAuth ? <DashboardDefault /> : <Navigate to={'/login'} replace />
        }
      ]
    }
  ]
};

export default MainRoutes;
