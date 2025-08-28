import AuthService from 'services/Auth.service';
import ServiceAlert from 'common/ServiceAlert';
import config from 'config.js';

// material-ui
import { Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import { useTranslation } from 'react-i18next';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {
  const [oauthServerUrl, setOauthServerUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  const getAuthorize = () => {
    AuthService.authorize().then(
      (response) => {
        setLoading(false);

        const oauthParams = new URLSearchParams(response.data.oauthInfo).toString();
        const redirectUri = window.location.origin + config.basename + '/verify';
        const newOauthServerUrl = `${response.data.authUri}?redirectUri=${redirectUri}&${oauthParams}`;
        setOauthServerUrl(newOauthServerUrl);
      },
      (error) => {
        setLoading(false);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
      }
    );
  };

  useEffect(() => {
    getAuthorize();
  }, []);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = oauthServerUrl;
  };

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
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <AnimateButton>
                          <Button disableElevation fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
                            {t('common.button.login')}
                          </Button>
                        </AnimateButton>
                      )}
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

export default Login;
