import { confirmAlert } from 'react-confirm-alert';
import i18next from 'i18n.js';

const confirmElement = (elementId: number, message: string, onAccept: (elementId: number) => void) : void => {
    confirmAlert({
      title: i18next.t('common.alert.confirm'),
      message: message,
      buttons: [
        {
          label: i18next.t('common.button.ok'),
          onClick: () => {
            onAccept(elementId);
          }
        },
        {
          label: i18next.t('common.button.close')
        }
      ],
      overlayClassName: 'overlay-confirm-logout-alert'
    });
  };

  export default confirmElement;
  