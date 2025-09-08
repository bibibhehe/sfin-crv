import AuthService from 'services/Auth.service';
import ServiceAlert from 'common/ServiceAlert';
import TextField from 'ui-component/inputs/CustomTextField';

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
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  });
  const { t, i18n } = useTranslation();

  const getAuthorize = () => {
    AuthService.login(userInput)
      .then(
        (response) => {
          console.log('response', response);
          if (response.data && response.data.accessToken) {
            sessionStorage.setItem('token', JSON.stringify(response.data));
            let tmp = response.data;
            if (!tmp.username) tmp.username = 'unknown';
            if (!tmp.roles) tmp.roles = 'unknown';
            sessionStorage.setItem('user', JSON.stringify(tmp));
            navigate('/dashboard/default');
            window.location.reload();
          } else {
            throw new Error('accessToken undefined !');
          }
        },
        (error) => {
          setLoading(false);
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          ServiceAlert.error('Lỗi', message);
        }
      )
  };

  const onUserInputChange = (event) => {
    const newUserInput = { ...userInput };
    newUserInput[event.target.name] = event.target.value;
    setUserInput(newUserInput);
  };

  useEffect(() => {
  }, []);

  const handleLogin = () => {
    // setLoading(true);
    // window.location.href = oauthServerUrl;
    getAuthorize();
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
                  {/* Thêm input cho tài khoản và mật khẩu */}
                  <Grid item xs={12}>
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        name="username"
                        type="text"
                        label="Tài khoản"
                        fullWidth
                        value={userInput['username']}
                        onChange={onUserInputChange}
                      />
                      <Box sx={{ mt: 2 }} />
                      <TextField
                        name="password"
                        type="password"
                        label="Mật khẩu"
                        fullWidth
                        value={userInput['password']}
                        onChange={onUserInputChange}
                      />
                    </Box>
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
