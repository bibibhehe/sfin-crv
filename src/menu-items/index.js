import dashboard from './dashboard';
import pages from './pages';
// import operations from './operation';
import administration from './administration';
// import paymentReconciliation from './paymentReconciliation';
import manager from './manager';

// ==============================|| MENU ITEMS ||============================== //
const getMenuItems = (t) => {
  return {
    items: [dashboard(t), pages(t), manager(t), administration(t)]
  };
};

export default getMenuItems;
