import dashboard from './dashboard';
import pages from './pages';
import administration from './administration';
import manager from './manager';

// ==============================|| MENU ITEMS ||============================== //
const getMenuItems = (t) => {
  return {
    items: [pages(t), manager(t), administration(t)]
  };
};

export default getMenuItems;
