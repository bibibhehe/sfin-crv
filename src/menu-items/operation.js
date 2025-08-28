// assets
import { IconAdjustments, IconActivity } from '@tabler/icons';

// constant
const icons = {
  IconAdjustments,
  IconActivity
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const getOperationItem = (t) => {
  return {
    id: 'operation',
    title: t('sidebar.operation.title'),
    caption: '',
    type: 'group',
    children: [
      {
        id: 'online',
        title: t('sidebar.operation.online.title'),
        type: 'collapse',
        icon: icons.IconAdjustments,

        children: [
          {
            id: 'feeConfiguration',
            title: t('sidebar.operation.online.feeConfiguration'),
            type: 'item',
            url: '/pages/operation/feeConfiguration',
            target: false,
            icon: icons.IconActivity
          },
          {
            id: 'TCTVConfiguration',
            title: t('sidebar.operation.online.tctvConfiguration'),
            type: 'item',
            url: '/pages/operation/ParticipantConfig',
            target: false,
            icon: icons.IconActivity
          },
          {
            id: 'LadderConfig',
            title: t('sidebar.operation.online.ladderConfiguration'),
            type: 'item',
            url: '/pages/operation/LadderConfig',
            target: false,
            icon: icons.IconActivity
          }
        ]
      },
      {
        id: 'feeConfig',
        title: t('sidebar.operation.online.configurationFeeFolder'),
        type: 'collapse',
        icon: icons.IconAdjustments,

        children: [
          {
            id: 'configurationSPAccount',
            title: t('sidebar.operation.online.configurationSPAccount'),
            type: 'item',
            url: '/pages/operation/configurationSPAccount',
            target: false,
            icon: icons.IconActivity
          },
          {
            id: 'configurationSPProgram',
            title: t('sidebar.operation.online.configurationSPProgram'),
            type: 'item',
            url: '/pages/operation/SpecialPropgram',
            target: false,
            icon: icons.IconActivity
          },
          {
            id: 'configurationChargingChannel',
            title: t('sidebar.operation.online.configurationChargingChannel'),
            type: 'item',
            url: '/pages/operation/configurationChargingChannel',
            target: false,
            icon: icons.IconActivity
          }
        ]
      },
      {
        id: 'configTime',
        title: t('sidebar.operation.online.configTime'),
        type: 'collapse',
        icon: icons.IconAdjustments,
        children: [
          {
            id: 'configTimeSession',
            title: t('sidebar.operation.online.configTimeSession'),
            type: 'item',
            url: '/pages/operation/configTimeSession',
            target: false,
            icon: icons.IconActivity
          },
          {
            id: 'ConfigHoliday',
            title: t('sidebar.operation.online.configHoliday'),
            type: 'item',
            url: '/pages/operation/configHoliday',
            target: false,
            icon: icons.IconActivity
          }
        ]
      },
      {
        id: 'declaration',
        title: t('sidebar.operation.declaration.title'),
        type: 'collapse',
        icon: icons.IconAdjustments,

        children: [
          {
            id: 'feeDeclaration',
            title: t('sidebar.operation.declaration.feeDeclaration'),
            type: 'item',
            url: '/pages/operation/feeDeclaration',
            target: false,
            icon: icons.IconActivity
          }
        ]
      },
      {
        id: 'assignParticipant',
        title: t('sidebar.operation.assignParticipant.title'),
        type: 'collapse',
        icon: icons.IconAdjustments,

        children: [
          {
            id: 'assignParticipantfollow',
            title: t('sidebar.operation.assignParticipant.assignParticipantfollow'),
            type: 'item',
            url: '/pages/operation/assigntoParticipant',
            target: false,
            icon: icons.IconActivity
          },
          {
            id: 'assignParticipantfollowFee',
            title: t('sidebar.operation.assignParticipant.assignParticipantfollowFee'),
            type: 'item',
            url: '/pages/operation/assigntoParticipantFee',
            target: false,
            icon: icons.IconActivity
          }
        ]
      }
    ]
  };
};

export default getOperationItem;
