// assets
import { IconSettings, IconBuildingStore,  IconUsers, IconTopologyStar, IconBadgeVr} from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const manager = (t) => {
  return {
    id: 'manager',
    title: 'Quản lý vận hành',
    caption: '',
    type: 'group',
    children: [
      {
        id: 'manageMerchantMaster',
        title: 'Quản lý đơn vị phát triển mạng lưới',
        icon: IconTopologyStar,
        type: 'item',
        url: '/pages/manager/manager-merchant-master',
        target: false,
      },
      {
        id: 'manageMerchant',
        title: 'Quản lý Merchant',
        type: 'collapse',
        icon: IconBuildingStore,
        children: [
          {
            id: 'merchant-business',
            title: 'Quản lý Merchant Doanh Nghiệp',
            type: 'item',
            url: '/pages/manager/manager-merchant-bussiness',
            target: false,
          },
          {
            id: 'merchant-personal',
            title: 'Quản lý Merchant Cá Nhân',
            type: 'item',
            url: '/pages/manager/manager-merchant-personal',
            target: false,
          }
        ]
      },
      {
        id: 'manageParticipants',
        title: 'Quản lý thành viên',
        type: 'collapse',
        icon: IconUsers,

        children: [
          {
            id: 'manager-participant',
            title: 'Tổ chức thanh toán',
            type: 'item',
            url: '/pages/manager/manager-participant',
            target: false,
          },
          {
            id: 'manager-participantBank',
            title: 'Tổ chức thành viên',
            type: 'item',
            url: '/pages/manager/manager-participantBank',
            target: false,
          }
        ]
      },
        {
        id: 'managerVVirtualAccount',
        title: 'Danh sách VA',
        icon: IconBadgeVr,
        type: 'item',
        url: '/pages/manager/manager-VVirtualAccount',
        target: false,
      },
    ]
  };
};

export default manager;
