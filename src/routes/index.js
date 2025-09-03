import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router';
import AuthService from 'services/Auth.service';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';

const PaymentPage = Loadable(lazy(() => import('views/pages/main/Research/ResearchPayment/index')));
// const Payment2ndPage = Loadable(lazy(() => import('views/pages/main/Research/ResearchPayment2nd/index')));
const PaymentRefundPage = Loadable(lazy(() => import('views/pages/main/Research/ResearchPaymentRefund/index')));
const HisMessageRaw = Loadable(lazy(() => import('views/pages/main/Research/HisMessageRaw/index')));

// const MessageInputPage = Loadable(lazy(() => import('views/pages/history/MessageInputPage')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const SystemParametersPage = Loadable(lazy(() => import('views/pages/administration/SystemParameterPage')));
const ParticipantEndpointPage = Loadable(lazy(() => import('views/pages/administration/ParticipantEndpointPage')));

const ParticipantConfig = Loadable(lazy(() => import('views/pages/operation/Config/ParticipantsConfig/index')));

const FeeDeclaration = Loadable(lazy(() => import('views/pages/operation/declaration/feeDeclaration/index')));
const ReportFee = Loadable(lazy(() => import('views/pages/main/report/reportFee/index')));
const ParticipantStatusPage = Loadable(lazy(() => import('views/pages/operation/Config/ConfigFee/index')));
const HisPortalUserActionPage = Loadable(lazy(() => import('views/pages/administration/HisPortalUserActionPage')));
const AssignPariPage = Loadable(lazy(() => import('views/pages/operation/declaration/feeParticipant/index')));
const AssignPariPageFee = Loadable(lazy(() => import('views/pages/operation/declaration/feeParticipantbyFee/index')));
const LadderConfig = Loadable(lazy(() => import('views/pages/operation/Config/LadderConfig/index')));

const DeclareDCBS = Loadable(lazy(() => import('views/pages/main/paymentReconciliation/QTBS/DeclareQTBS/index')));
const SpecialPropgram = Loadable(lazy(() => import('views/pages/operation/ConfigFee/SpecialPropgram/index')));
const SpecialAccount = Loadable(lazy(() => import('views/pages/operation/ConfigFee/SpecialAccount/index')));
const ChargingChannel = Loadable(lazy(() => import('views/pages/operation/ConfigFee/ChargingChannel/index')));

const ConfigTimeSession = Loadable(lazy(() => import('views/pages/operation/ConfigTime/ConfigSession/index')));
const ConfigHoliday = Loadable(lazy(() => import('views/pages/operation/ConfigTime/ConfigHoliday/index')));

//manager
const ManageMerchantMaster = Loadable(lazy(() => import('views/pages/main/manager/managerMasterMerchant/index')));
const ManageMerchantBussiness = Loadable(lazy(() => import('views/pages/main/manager/managerMerchant/index')));
const ManageParticipants = Loadable(lazy(() => import('views/pages/main/manager/managerParticipant/index')));
const ManageParticipantsBank = Loadable(lazy(() => import('views/pages/main/manager/managerParticipantBank/index')));
const ManageMerchantPersonal = Loadable(lazy(() => import('views/pages/main/manager/managerPersonal/index')));
const ManagerVVirtualAccount = Loadable(lazy(() => import('views/pages/main/manager/managerVVirtualAccount/index')));

//end manager

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
  const AssignPariRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/operation/assigntoParticipant',
        element: isAuth ? <AssignPariPage /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/operation/assigntoParticipantFee',
        element: isAuth ? <AssignPariPageFee /> : <Navigate to={'/login'} replace />
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
        // element: <DeclareDCBS />
      }
    ]
  };

  const OperationRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/pages/operation/feeConfiguration',
        element: isAuth ? <ParticipantStatusPage /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/operation/feeDeclaration',
        element: isAuth ? <FeeDeclaration /> : <Navigate to={'/login'} replace />
        // element: <FeeDeclaration />
      },
      {
        path: '/pages/operation/ParticipantConfig',
        element: isAuth ? <ParticipantConfig /> : <Navigate to={'/login'} replace />
        // element: <ParticipantConfig />
      },
      {
        path: '/pages/operation/LadderConfig',
        element: isAuth ? <LadderConfig /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/operation/SpecialPropgram',
        element: isAuth ? <SpecialPropgram /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/operation/configurationSPAccount',
        element: isAuth ? <SpecialAccount /> : <Navigate to={'/login'} replace />
      },

      { path: '/pages/operation/configurationChargingChannel', element: isAuth ? <ChargingChannel /> : <Navigate to={'/login'} replace /> },
      {
        path: '/pages/operation/configTimeSession',
        element: isAuth ? <ConfigTimeSession /> : <Navigate to={'/login'} replace />
      },
      {
        path: '/pages/operation/configHoliday',
        element: isAuth ? <ConfigHoliday /> : <Navigate to={'/login'} replace />
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
        // element: <ManageMerchantBussiness />
      },
      {
        path: '/pages/manager/manager-merchant-personal',
        element: isAuth ? <ManageMerchantPersonal /> : <Navigate to={'/login'} replace />
        // element: <ManageMerchantBussiness />
      },
      {
        path: '/pages/manager/manager-participant',
        element: isAuth ? <ManageParticipants /> : <Navigate to={'/login'} replace />
        // element: <ManageMerchantBussiness />
      },
      {
        path: '/pages/manager/manager-participantBank',
        element: isAuth ? <ManageParticipantsBank /> : <Navigate to={'/login'} replace />
        // element: <ManageMerchantBussiness />
      },
      {
        path: '/pages/manager/manager-VVirtualAccount',
        element: isAuth ? <ManagerVVirtualAccount /> : <Navigate to={'/login'} replace />
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
    OperationRoutes,
    AssignPariRoutes,
    paymentReconciliation
  ]);
}
