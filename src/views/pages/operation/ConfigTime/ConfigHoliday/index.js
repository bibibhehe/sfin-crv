// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceAPI from 'services/ConfigTime/ConfigHolidateTime.service';
// import CommonService from 'services/AssignParticipant/CommonService.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ParticapantTable from './FormLoad/ParticapantTable';
import SearchForm from './FormLoad/SearchForm';

import defaultSettings from 'defaultSetting';

const useStyles = makeStyles({
  stickyCell: {
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    zIndex: 1,
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  },
  evenRow: {
    backgroundColor: '#e3f2fd'
  },
  icons: {
    // margin: '0 3px',
    cursor: 'pointer'
  }
});

const ConfigHoliday = () => {
  const [message, setMessage] = useState('');

  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });

  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize
  });

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const getNowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 365);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const [filtersInput, setFiltersInput] = useState({
    dateFrom: getTomorrowDate(),
    dateTo: getNowDate(),
    dayType: ' '
  });
  const messageTypeSelect = [
    { id: 'HOLIDAY', name: 'Nghỉ lễ', disabled: false },
    { id: 'SWAP', name: 'Làm bù', disabled: false }
  ];
  const handleSearch = (object) => {
    setFiltersInput(object);
    listAllElements(object);
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

  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const listAllElements = (object) => {
    handleLoadingClick();
    ServiceAPI.search(paging, object)
      .then(
        (response) => {
          handleLoadingClick();
          setPageInfo(response.data);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
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
  useEffect(() => {
    setShowBackdrop(true);
    listAllElements(filtersInput);
  }, [paging]);

  return (
    <MainCard title="Ngày nghỉ lễ, ngày làm bù">
      <SearchForm handleSearch1={handleSearch} messageTypeSelect={messageTypeSelect} />
      <br />
      <br />
      <ParticapantTable
        data={pageInfo}
        totalElements={pageInfo.totalElements}
        onReload={handleReloadConfig01}
        paging={paging}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        messageTypeSelect={messageTypeSelect}
        showError={showAlert}
        showAlertSuccess={showAlertSuccess}
      />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default ConfigHoliday;
