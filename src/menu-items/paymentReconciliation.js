// assets
import { IconSettings, IconTopologyStar, IconAdjustments, IconTruck, IconApi, IconUser, IconList, IconAsterisk } from '@tabler/icons';

// constant
const icons = {
  IconSettings,
  IconAdjustments,
  IconTopologyStar,
  IconTruck,
  IconApi,
  IconUser,
  IconList,
  IconAsterisk
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const paymentReconciliation = (t) => {
  return {
    id: 'paymentReconciliation',
    title: t('sidebar.paymentReconciliation.title'),
    caption: '',
    type: 'group',
    children: [
      {
        id: 'DCBS',
        title: t('sidebar.paymentReconciliation.DCBS'),
        type: 'collapse',
        icon: icons.IconSettings,

        children: [
          {
            id: 'delcaceDCBS',
            title: t('sidebar.paymentReconciliation.delcaceDCBS'),
            type: 'item',
            url: '/pages/paymentReconciliation/DeclareDCBS',
            target: false,
            icon: icons.IconAdjustments
          }
        ]
      }
    ]
  };
};

export default paymentReconciliation;
