import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import LanguageSwitcher from './LanguageSwitcher';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark;
  const textColor = theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light;

  const hoverBackgroundColor = theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light;
  const hoverTextColor = theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark;

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: backgroundColor,
              color: textColor,
              '&:hover': {
                background: hoverBackgroundColor,
                color: hoverTextColor
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <LanguageSwitcher />
      {/* <NotificationSection /> */}
      <Box sx={{ flexGrow: 0.05 }} />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
