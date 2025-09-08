import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router';
import AuthService from 'services/Auth.service';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';

const PaymentPage = Loadable(lazy(() => import('views/pages/main/Research/ResearchPayment/index')));
const PaymentRefundPage = Loadable(lazy(() => import('views/pages/main/Research/ResearchPaymentRefund/index')));
const HisMessageRaw = Loadable(lazy(() => import('views/pages/main/Research/HisMessageRaw/index')));

const SystemParametersPage = Loadable(lazy(() => import('views/pages/administration/SystemParameterPage')));
const ParticipantEndpointPage = Loadable(lazy(() => import('views/pages/administration/ParticipantEndpointPage')));


const ReportFee = Loadable(lazy(() => import('views/pages/main/report/reportFee/index')));
const HisPortalUserActionPage = Loadable(lazy(() => import('views/pages/administration/HisPortalUserActionPage')));

const DeclareDCBS = Loadable(lazy(() => import('views/pages/main/paymentReconciliation/QTBS/DeclareQTBS/index')));

//manager
const ManageMerchantMaster = Loadable(lazy(() => import('views/pages/main/manager/managerMasterMerchant/index')));
const ManageMerchantBussiness = Loadable(lazy(() => import('views/pages/main/manager/managerMerchant/index')));
const ManageParticipants = Loadable(lazy(() => import('views/pages/main/manager/managerParticipant/index')));
const ManageParticipantsBank = Loadable(lazy(() => import('views/pages/main/manager/managerParticipantBank/index')));
const ManageMerchantPersonal = Loadable(lazy(() => import('views/pages/main/manager/managerPersonal/index')));
const ManagerVVirtualAccount = Loadable(lazy(() => import('views/pages/main/manager/managerVVirtualAccount/index')));
//end manager

const ManageUser = Loadable(lazy(() => import('views/pages/main/user/managerUser/index')));
const ManagePermission = Loadable(lazy(() => import('views/pages/main/user/managerPermission/index')));


// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const isAuth = AuthService.getCurrentUser();

  const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: isAuth ? <PaymentPage /> : <Navigate to={'/login'} replace />
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element: isAuth ? <PaymentPage /> : <Navigate to={'/login'} replace />
          }
        ]
      }
    ]
  };

  const ReportRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/report/reportFee',
        element: isAuth ? <ReportFee /> : <Navigate to={'/login'} replace />
      }
    ]
  };

  const HistoryRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/history/payment',
        element: isAuth ? <PaymentPage /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/history/paymentRefund',
        element: isAuth ? <PaymentRefundPage /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/history/hisMessageRaw',
        element: isAuth ? <HisMessageRaw /> : <Navigate to={'/login'} replace />
      },
    ]
  };

  const AdministrationRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/administration/process',
        element: isAuth ? (
          <SystemParametersPage groupName="process" pageTitle="Cấu hình tham số xử lý" />
        ) : (
          <Navigate to={'/login'} replace />
        )
      },
      {
        path: '/pages/administration/request',
        element: isAuth ? (
          <SystemParametersPage groupName="request" pageTitle="Cấu hình tham số request" />
        ) : (
          <Navigate to={'/login'} replace />
        )
      },
      {
        path: '/pages/administration/transport',
        element: isAuth ? <SystemParametersPage groupName="transport" pageTitle="Cấu hình transport" /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/administration/participantEndpoint',
        element: isAuth ? <ParticipantEndpointPage /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/administration/HisPortalUserAction',
        element: isAuth ? <HisPortalUserActionPage /> : <Navigate to={'/login'} replace />
      }
    ]
  };
  
  const paymentReconciliation = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/paymentReconciliation/DeclareDCBS',
        element: isAuth ? <DeclareDCBS /> : <Navigate to={'/login'} replace />
      }
    ]
  };


  const Manager = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/manager/manager-merchant-master',
        element: isAuth ? <ManageMerchantMaster /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/manager/manager-merchant-bussiness',
        element: isAuth ? <ManageMerchantBussiness /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/manager/manager-merchant-personal',
        element: isAuth ? <ManageMerchantPersonal /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/manager/manager-participant',
        element: isAuth ? <ManageParticipants /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/manager/manager-participantBank',
        element: isAuth ? <ManageParticipantsBank /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/manager/manager-VVirtualAccount',
        element: isAuth ? <ManagerVVirtualAccount /> : <Navigate to={'/login'} replace />
      },
    ]
  };

  const User = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/user/manager-user',
        element: isAuth ? <ManageUser /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/user/manager-permission',
        element: isAuth ? <ManagePermission /> : <Navigate to={'/login'} replace />
      },
    ]
  };

  return useRoutes([
    MainRoutes,
    Manager,
    ReportRoutes,
    AuthenticationRoutes,
    HistoryRoutes,
    AdministrationRoutes,
    paymentReconciliation,
    User
  ]);
}
