// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ParticipantConfigSe from 'services/AssignParticipant/AssignParticipantByFee.service';
import CommonService from 'services/AssignParticipant/CommonService.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ParticapantTable from './FormLoad/ParticapantTable';
import SearchForm from './FormLoad/SearchForm';
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

const FeeParticipantConfig = () => {
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

  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
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

  const typebzSrc = [
    { id: 'NORMAL', name: 'Kênh thông thường', disabled: false },
    { id: 'SPECIAL', name: 'Kênh đặc biệt', disabled: false }
  ];
  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [filtersInput, setFiltersInput] = useState({
    busniessSvcType: ' ',
    businessSvcCode: ' ',
    participant: ' '
  });
  const [typeFee, setTblTariffPlan] = useState(null);
  const [channelId, setchannelId] = useState(null);

  const convertTblTariffPlan = (data) => {
    if (data && data != undefined) {
      const listInf = data.map((item) => {
        return { id: item.tariffPlanId, name: item.planDescription, disabled: false };
      });
      setTblTariffPlan(listInf);
    }
  };
  const convertChannelId = (data) => {
    if (data && data != undefined) {
      const listInf = data.map((item) => {
        return { id: item.businessSvcCode, name: item.businessSvcName, disabled: false };
      });
      setchannelId(listInf);
    }
  };
  const getInfChannelId = () => {
    CommonService.getInfChannelId()
      .then(
        (response) => {
          convertChannelId(response.data);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const getTblTariffPlanData = () => {
    CommonService.getTblTariffPlan()
      .then(
        (response) => {
          convertTblTariffPlan(response.data);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const listAllElements = (object) => {
    handleLoadingClick();
    ParticipantConfigSe.searchAssignParti(object)
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
  const handleSearch = (object) => {
    setFiltersInput(object);
    listAllElements(object);
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
    getTblTariffPlanData();
    getInfChannelId();
  }, []);

  return (
    <MainCard title="Khai báo biểu phí cho tổ chức thành viên theo biểu phí">
      <SearchForm handleSearch1={handleSearch} typebzSrc={typebzSrc} typeBank={listNapasBankSelect} typeChannelId={channelId} />
      <br />
      <br />
      <ParticapantTable
        data={pageInfo}
        listNapasBankSelect={listNapasBankSelect}
        typeFee={typeFee}
        typebzSrc={typebzSrc}
        onReload={handleReloadConfig01}
        typeBank={listNapasBankSelect}
        paging={paging}
        totalElements={pageInfo.totalElements}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        typeChannelId={channelId}
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

export default FeeParticipantConfig;
