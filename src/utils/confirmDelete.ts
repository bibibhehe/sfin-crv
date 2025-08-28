import { confirmAlert } from 'react-confirm-alert';
import i18next from 'i18n.js';

const confirmDelete = (deleteElementId: number, deleteElementName: string, onAccept: (deleteElementId: number) => void) : void => {
    confirmAlert({
      title: i18next.t('common.alert.deleteConfirm'),
      message: i18next.t('common.alert.deleteConfirmContent') + deleteElementName,
      buttons: [
        {
          label: i18next.t('common.button.ok'),
          onClick: () => {
            onAccept(deleteElementId);
          }
        },
        {
          label: i18next.t('common.button.close')
        }
      ],
      overlayClassName: 'overlay-confirm-logout-alert'
    });
  };

  export default confirmDelete;
  