// material-ui
import logo from 'assets/images/napas.png';
import logoDark from 'assets/images/napasdark.png';
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={theme.palette.mode === 'light' ? logo : logoDark}
          alt="Napas"
          style={{ width: '100%', maxWidth: '100%', height: '55px' }}
        />
      </div>

      {/* <img src={theme.palette.mode === 'light' ? logo : logoDark} alt="Napas" width="120" /> */}
    </>
  );
};

export default Logo;
