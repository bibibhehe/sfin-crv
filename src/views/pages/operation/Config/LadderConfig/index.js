// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCallAPI from 'services/ConfigReport/ladderConfiguration.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import TblLadderFirstLoad from './FormLoad/TblLadderFirstLoad';
import TablLadderLoad01 from './FormLoad/TablLadderLoad01';
import TblNoLadderLoad from './FormLoad/TblNoLadderLoad';

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

const LadderConfig = () => {
  const [message, setMessage] = useState('');

  const [idBTO02Selected, setidBTO02Selected] = useState(-1);
  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();

  const [pageInfo, setPageInfo] = useState({});
  const [pageInfoNoLadder, setpageInfoNoLadder] = useState({});

  const [pageBTO2, setPageBTO2] = useState({});
  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const handleClick01 = (id) => {
    setidBTO02Selected(id);
    listElement02(id);
  };

  const listAllElements = () => {
    handleLoadingClick();
    ServiceCallAPI.searchLadder01()
      .then(
        (response) => {
          handleLoadingClick();
          setPageInfo(response.data);
          setPageBTO2({});
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const listElementNoLadder = () => {
    handleLoadingClick();
    ServiceCallAPI.searchNoLadder()
      .then(
        (response) => {
          handleLoadingClick();
          setpageInfoNoLadder(response.data);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));

    //  else {
    //   setPageBTO2({});
    //   setPageBTO3({});
    //   setidBTO03Selected('');
    // }
  };
  const listElement02 = (id) => {
    if (id != null && id != -1) {
      handleLoadingClick();
      ServiceCallAPI.searchLadder02(id)
        .then(
          (response) => {
            handleLoadingClick();
            setPageBTO2(response.data);
          },
          (error) => {
            setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
            showAlert(message);
            handleLoadingClick();
          }
        )
        .finally(() => setShowBackdrop(false));
    }
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
  const handleReloadConfig02 = () => {
    listElement02(idBTO02Selected);
  };
  const handleReloadConfig03 = () => {
    listElementNoLadder();
  };
  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };
  useEffect(() => {
    setShowBackdrop(true);
    listAllElements();
    listElementNoLadder();
  }, []);
  return (
    <MainCard title="Cấu hình bậc thang">
      <br />
      <TblLadderFirstLoad data={pageInfo} id={idBTO02Selected} onReload={handleReloadConfig01} handleClick={handleClick01} />
      <br />
      <br />
      <TablLadderLoad01 data={pageBTO2} id={idBTO02Selected} onReload={handleReloadConfig02} />
      <br />
      <br />
      <TblNoLadderLoad data={pageInfoNoLadder} onReload={handleReloadConfig03} />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default LadderConfig;
