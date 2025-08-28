// material-ui
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// project imports
import NavGroup from './NavGroup';
import getMenuItems from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { t, i18n } = useTranslation();

  const menuItem = getMenuItems(t);

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
