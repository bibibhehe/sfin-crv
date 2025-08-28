import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import viLocaleDateFormat from 'date-fns/locale/vi';
import enLocaleDateFormat from 'date-fns/locale/en-US';
import defaultSettings from 'defaultSetting';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { AppDictionaryProvider } from 'provider/GlobalProvider';
import { handleIdleLogout } from 'services/Logout.service';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  const { t, i18n } = useTranslation();

  let inactivityTimer;

  useEffect(() => {
    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleIdleLogout, defaultSettings.inactivityTimeout);
    }

    resetInactivityTimer();

    defaultSettings.monitorEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      defaultSettings.monitorEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, []);

  const adapterLocale = i18n.language === 'vi' ? viLocaleDateFormat : enLocaleDateFormat;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization, i18n)}>
        <CssBaseline />
        <NavigationScroll>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
            <AppDictionaryProvider>
              <Routes />
            </AppDictionaryProvider>
          </LocalizationProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
