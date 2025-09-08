// assets
import { IconSettings, IconBuildingStore,  IconUsers, IconTopologyStar, IconBadgeVr} from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const user = (t) => {
  return {
    id: 'user',
    title: 'Nguoời dùng',
    caption: '',
    type: 'group',
    children: [
      {
        id: 'user',
        title: 'Quản lý người dùng',
        icon: IconTopologyStar,
        type: 'item',
        url: '/pages/user/manager-user',
        target: false,
      },
      {
        id: 'userPermission',
        title: 'Phân quyền người dùng',
        icon: IconTopologyStar,
        type: 'item',
        url: '/pages/user/manager-permission',
        target: false,
      },
    ]
  };
};

export default user;
