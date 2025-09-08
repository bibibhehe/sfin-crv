import dashboard from './dashboard';
import pages from './pages';
import administration from './administration';
import manager from './manager';
import user from './user';

// ==============================|| MENU ITEMS ||============================== //
const getMenuItems = (t) => {
  return {
    items: [pages(t), manager(t), user(t), administration(t)]
  };
};

export default getMenuItems;
