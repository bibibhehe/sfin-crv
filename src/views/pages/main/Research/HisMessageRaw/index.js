// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HisMessageRawService from 'services/Research/HisMessageRaw.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import ParticapantTable from './FormLoad/ParticapantTable';
import SearchForm from './FormLoad/SearchForm';
import defaultSettings from 'defaultSetting';
import { useGlobalData } from 'provider/GlobalProvider';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';

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
    cursor: 'pointer'
  }
});

const DisputeCategoryRearch = () => {
  const [message, setMessage] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();

  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });

  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });

  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    beginDate: format(startOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ss"),
    endDate: format(endOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ss"),
    senderReference: '',
    senderId: '',
    receiverId: '',
    messageIdentifier: ' ',
    kindOfMessage: ' ',
    transactionReference: '',
    service: ' ',
  });
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;
  const listNapasBankSelect = listNapasBank
    ? listNapasBank.map((item) => {
      return { id: item.bankId, name: item.bankId + ' - ' + item.bankFullNameVi, disabled: false };
    })
    : null;
  const listAllElements = (object) => {
    handleLoadingClick();
    HisMessageRawService.search(paging, object)
      .then(
        (response) => {
          handleLoadingClick();
          setPageInfo(response.data);
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
    const newPaging = { ...paging };
    newPaging.page = 0;
    setPaging(newPaging);
    setFiltersInput(object);
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
    <MainCard title="Tra cứu thông điệp gốc">
      <SearchForm listNapasBankSelect={listNapasBankSelect} handleSearch1={handleSearch} />
      <ParticapantTable
        data={pageInfo}
        onReload={handleReloadConfig01}
        paging={paging}
        listNapasBankSelect={listNapasBankSelect}
        totalElements={pageInfo.totalElements}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default DisputeCategoryRearch;
