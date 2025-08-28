import { confirmAlert } from 'react-confirm-alert';
import i18next from 'i18n.js';

const { default: AuthService } = require('./Auth.service');

const removeUserData = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
};

export const handleUserLogout = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  removeUserData();

  AuthService.invalidateToken(token.accessToken)
    .then(() => {
      window.location.reload();
    })
    .catch(() => {
      window.location.reload();
    });
};

export const handleIdleLogout = () => {
  var user = null;
  var token = null;
  try {
    user = JSON.parse(sessionStorage.getItem('user'));
    token = JSON.parse(sessionStorage.getItem('token'));
  } catch (error) {
    //
  }

  if (user) {
    removeUserData();
    AuthService.invalidateToken(token.accessToken).then(confirmIdleLogout).catch(confirmIdleLogout);
  }
};

const confirmIdleLogout = () => {
  confirmAlert({
    title: i18next.t('common.alert.sessionIdle'),
    message: i18next.t('common.alert.loginRequire'),
    buttons: [
      {
        label: i18next.t('common.button.ok'),
        onClick: () => {
          window.location.reload();
        }
      }
    ],
    overlayClassName: 'overlay-confirm-logout-alert'
  });
};

export const handleUnauthorizedLogout = () => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    removeUserData();
    // AuthService.invalidateToken(token.accessToken).then(confirmUnauthorizedLogout).catch(confirmUnauthorizedLogout);
    AuthService.invalidateToken(token.accessToken)
      .then(() => {
        window.location.reload();
        alert('Hết phiên đăng nhập. Hãy đăng nhập lại!!!');
      })
      .catch(() => {
        window.location.reload();
      });
  } catch (error) {
    console.log(error);
  }
};

// const confirmUnauthorizedLogout = () => {
//   confirmAlert({
//     title: i18next.t('common.alert.sessionExpired'),
//     message: i18next.t('common.alert.loginRequire'),
//     buttons: [
//       {
//         label: i18next.t('common.button.ok'),
//         onClick: () => {
//           window.location.reload();
//         }
//       }
//     ],
//     overlayClassName: 'overlay-confirm-logout-alert'
//   });
// };
