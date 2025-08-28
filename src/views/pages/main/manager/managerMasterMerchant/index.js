import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import TableProccessing from './FormLoad/ContentTable';

import SearchForm from './FormLoad/SearchForm';
import defaultSettings from 'defaultSetting';
import ServiceAPI from 'services/ManagerMerchant/MerchantMaster.service';

const ManagerMerchant = () => {
  const [message, setMessage] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const [rowSelected, setrowSelected] = useState(-1);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize
  });
  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    name: '',
    status: '',
    merchantCode: ''
  });
  const listAllElements = (object) => {
    handleLoadingClick();
    ServiceAPI.getList(paging, object)
      .then(
        (response) => {
          handleLoadingClick();
          setPageInfo(response.data);
          setrowSelected(-1);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const handleDeleteMerchant = (object) => {
    handleLoadingClick();
    ServiceAPI.deleteMerchant(object)
      .then(
        (response) => {
          handleLoadingClick();
          showAlertSuccess('Xóa thành công');
          listAllElements();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const showAlert = (message) => {
    settypeNotify('error');
    setmessageError(message);
    setOpen(true);
  };
  const handleSearch = (object) => {
    setFiltersInput(object);
    const newPaging = { ...paging };
    newPaging.page = 0;
    setPaging(newPaging);
  };
  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleReloadConfig01 = () => {
    listAllElements(filtersInput);
  };
  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };
  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
  };
  useEffect(() => {
    setShowBackdrop(true);
    listAllElements(filtersInput);
  }, [paging]);

  return (
    <MainCard title="Quản lý đơn vị phát triển mạng lưới">
      <SearchForm handleSearch1={handleSearch} />
      <TableProccessing
        data={pageInfo}
        onLoad={handleReloadConfig01}
        paging={paging}
        totalElements={pageInfo.totalElements}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        handleDeleteMerchant={handleDeleteMerchant}
        rowSelected={rowSelected}
      />
      <br />
      <br />
      <br />
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default ManagerMerchant;
