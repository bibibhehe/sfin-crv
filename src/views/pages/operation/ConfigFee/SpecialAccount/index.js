// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceAPI from 'services/ConfigFee/SpecialAccount.service';
import ServiceAPIPropgram from 'services/ConfigFee/SpecialProgram.service';
import CommonService from 'services/AssignParticipant/CommonService.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ParticapantTable from './FormLoad/ParticapantTable';
import { useGlobalData } from 'provider/GlobalProvider';
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

const SpecialPropgram = () => {
  const [message, setMessage] = useState('');

  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;
  const listNapasBankSelect = listNapasBank
    ? listNapasBank.map((item) => {
        return { id: item.participantCode, name: item.participantCode + ' - ' + item.shortName, disabled: false };
      })
    : null;
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });
  const [listPropgram, setlistPropgram] = useState({});

  const convertTblTariffPlan = (data) => {
    if (data && data != undefined) {
      const listInf = data.map((item) => {
        return { id: item.campaignId, name: item.campaignName, disabled: false };
      });
      setlistPropgram(listInf);
    }
  };

  const [paging, setPaging] = useState({
    // page: 0,
    // size: defaultSettings.pageSize,
    // sort: 'id,desc'
  });

  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
    // listAllElements();
  };
  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
  };

  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    busniessSvcType: ' ',
    businessSvcCode: ' ',
    participant: ' '
  });
  const getProgram = () => {
    ServiceAPIPropgram.search()
      .then(
        (response) => {
          handleLoadingClick();
          convertTblTariffPlan(response.data);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const listAllElements = () => {
    handleLoadingClick();
    ServiceAPI.search()
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
    listAllElements();
  };
  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };
  useEffect(() => {
    setShowBackdrop(true);
    listAllElements();
    getProgram();
  }, []);

  return (
    <MainCard title="Khai báo tài khoản đặc biệt">
      <br />
      <ParticapantTable
        data={pageInfo}
        listNapasBankSelect={listNapasBankSelect}
        listPropgram={listPropgram}
        onReload={handleReloadConfig01}
        paging={paging}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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

export default SpecialPropgram;
