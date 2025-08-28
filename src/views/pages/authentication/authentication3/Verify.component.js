import AuthService from 'services/Auth.service';
import ServiceAlert from 'common/ServiceAlert';
import config from 'config.js';
import { useTranslation } from 'react-i18next';

import { Link, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { Box } from '@mui/system';
import { useEffect } from 'react';

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const verifyRedirect = () => {
    const queryString = location.search;
    const search = new URLSearchParams(queryString);
    const code = search.get('code');
    const state = search.get('state');

    const redirectUri = window.location.origin + config.basename + '/verify';

    AuthService.generateToken(code, state, redirectUri)
      .then(
        (response) => {
          if (response.data && response.data.accessToken) {
            sessionStorage.setItem('token', JSON.stringify(response.data));
            return AuthService.inspectToken(response.data.accessToken);
          } else {
            throw new Error('accessToken undefined !');
          }
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          ServiceAlert.error('Lỗi', message);
          throw new Error('Không thể đăng nhập!');
        }
      )
      .then(
        (response) => {
          if (response.data) {
            let tmp = response.data;
            if (!tmp.username) tmp.username = 'unknown';
            if (!tmp.scopes) tmp.scopes = [];
            sessionStorage.setItem('user', JSON.stringify(tmp));
            navigate('/dashboard/default');

            window.location.reload();
          }
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          ServiceAlert.error('Lỗi', message);
          navigate('/');
          window.location.reload();
        }
      )
      .catch(() => {});
  };

  useEffect(() => {
    verifyRedirect();
  }, []);

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Typography variant="h3">{t('auth.loginWelcome')}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                      <CircularProgress />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Verify;
