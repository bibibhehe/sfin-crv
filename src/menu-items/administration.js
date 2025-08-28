// assets
import { IconSettings, IconTopologyStar, IconAdjustments, IconTruck, IconApi, IconUser, IconList, IconAsterisk } from '@tabler/icons';

// constant
const icons = {
  IconSettings, IconAdjustments, IconTopologyStar, IconTruck, IconApi, IconUser, IconList, IconAsterisk
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const getAdministrationItem = (t) => {
  return {
    id: 'administration',
    title: t('sidebar.config.title'),
    caption: '',
    type: 'group',
    children: [
      {
        id: 'config',
        title: t('sidebar.config.systemparam.title'),
        type: 'collapse',
        icon: icons.IconSettings,

        children: [
          {
            id: 'system-param',
            title: t('sidebar.config.systemparam.process'),
            type: 'item',
            url: '/pages/administration/process',
            target: false,
            icon: icons.IconAdjustments
          },
          {
            id: 'system-param',
            title: t('sidebar.config.systemparam.request'),
            type: 'item',
            url: '/pages/administration/request',
            target: false,
            icon: icons.IconApi
          },
          {
            id: 'system-param',
            title: t('sidebar.config.systemparam.transport'),
            type: 'item',
            url: '/pages/administration/transport',
            target: false,
            icon: icons.IconTruck
          }
        ]
      },
      {
        id: 'participant',
        title: t('sidebar.config.participant.title'),
        type: 'collapse',
        icon: icons.IconAsterisk,

        children: [
          {
            id: 'investigation-participant',
            title: t('sidebar.config.participant.participantEndpoint'),
            type: 'item',
            url: '/pages/administration/participantEndpoint',
            target: false,
            icon: icons.IconTopologyStar
          }
        ]
      },
      {
        id: 'user',
        title: t('sidebar.administration.user.title'),
        type: 'collapse',
        icon: icons.IconUser,

        children: [
          {
            id: 'HisPortalUserAction',
            title: t('sidebar.administration.user.HisPortalUserAction'),
            type: 'item',
            url: '/pages/administration/HisPortalUserAction',
            target: false,
            icon: icons.IconList
          }
        ]
      }
    ]
  }
}

export default getAdministrationItem;