// assets
import { IconSearch, IconReport } from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const getPagesItem = (t) => {
  return {
    id: 'pages',
    title: t('sidebar.main.title'),
    caption: '',
    type: 'group',
    children: [
      {
        id: 'history',
        title: t('sidebar.main.history.title'),
        type: 'collapse',
        icon: IconSearch,

        children: [
          {
            id: 'payment',
            title: t('sidebar.main.history.payment'),
            type: 'item',
            url: '/pages/history/payment',
            target: false,
          }, 
          {
            id: 'paymentRefund',
            title: t('sidebar.main.history.paymentRefund'),
            type: 'item',
            url: '/pages/history/paymentRefund',
            target: false,
          },
          {
            id: 'HisMessageRaw',
            title: 'Thông điệp gốc',
            type: 'item',
            url: '/pages/history/hisMessageRaw',
            target: false,
          },
        ]
      },
      {
        id: 'report',
        title: t('sidebar.main.report.title'),
        type: 'collapse',
        icon: IconReport,

        children: [
          {
            id: 'reportFee',
            title: t('sidebar.main.report.createReport'),
            type: 'item',
            url: '/pages/report/reportFee',
            target: false,
          }
        ]
      }
    ]
  };
};

export default getPagesItem;
