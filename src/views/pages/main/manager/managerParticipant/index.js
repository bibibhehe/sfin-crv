// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import TableProccessing from './FormLoad/ContentTable';
// import TableProccessingBranch from './FormLoad/Branch/ContentTable';

// import SearchForm from './FormLoad/SearchForm';
import defaultSettings from 'defaultSetting';
import ServiceAPI from 'services/ManagerMerchant/Participant.service';
import ServiceAPI01 from 'services/Global.service';

const ManagerMerchant = () => {
  const [message, setMessage] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const [dataBank, setdataBank] = useState([]);
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
  const handleReloadConfig01 = () => {
    listAllElements();
  };
  const listAllElements = () => {
    handleLoadingClick();
    ServiceAPI.getList(paging)
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
  const get_bank = () => {
    ServiceAPI01.get_bankList_napas().then(
      (response) => {
        setdataBank(response.data);
      },
      (error) => {}
    );
  };
  const handleDeleteParticipant = (object) => {
    handleLoadingClick();
    ServiceAPI.deleteParticipant(object)
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

  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
  };
  const dataBankObject = dataBank
    ? dataBank.map((item) => {
        return { id: item.bankId, name: item.bankId + ' - ' + item.bic + ' (' + item.bankFullNameVi + ')', disabled: false };
      })
    : null;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };

  useEffect(() => {
    setShowBackdrop(true);
    get_bank();
    listAllElements();
    // get_masterMerchant();
  }, [paging]);

  return (
    <MainCard title="Quản lý tổ chức thanh toán">
      <TableProccessing
        data={pageInfo}
        onLoad={handleReloadConfig01}
        paging={paging}
        totalElements={pageInfo.totalElements}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        dataBank={dataBankObject}
        rowSelected={rowSelected}
        handleDelete={handleDeleteParticipant}
      />

      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />

      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default ManagerMerchant;
