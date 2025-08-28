// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import configFee from 'services/ConfigFee.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import TblRptoHeaderLevel1 from './FormLoad/TblRptoHeaderLevel1';
import TblRptoHeaderLevel2 from './FormLoad/TblRptoHeaderLevel2';
import TblRptoHeaderLevel3 from './FormLoad/TblRptoHeaderLevel3';

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

const ConfigFee = () => {
  const [message, setMessage] = useState('');

  const [idBTO02Selected, setidBTO02Selected] = useState('');
  const [idBTO03Selected, setidBTO03Selected] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();

  const [pageInfo, setPageInfo] = useState({
    // totalElements: 0
  });
  const [pageBTO2, setPageBTO2] = useState({});
  const [pageBTO3, setPageBTO3] = useState({});
  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const handleClick01 = (id) => {
    setidBTO02Selected(id);
    listElement02(id);
  };
  const handleClick02 = (id) => {
    setidBTO03Selected(id);
    listElement03(id);
  };
  const listAllElements = () => {
    handleLoadingClick();
    configFee
      .search()
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
  const listElement02 = (id) => {
    if (id != null && id != '') {
      handleLoadingClick();
      configFee
        .getConfigFee02(id)
        .then(
          (response) => {
            handleLoadingClick();
            setPageBTO2(response.data);
            setPageBTO3({});
            setidBTO03Selected('');
          },
          (error) => {
            setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
            showAlert(message);
            handleLoadingClick();
          }
        )
        .finally(() => setShowBackdrop(false));
    } else {
      setPageBTO2({});
      setPageBTO3({});
      setidBTO03Selected('');
    }
  };
  const listElement03 = (id) => {
    if (id != null && id != '') {
      handleLoadingClick();
      configFee
        .getConfigFee03(id)
        .then(
          (response) => {
            handleLoadingClick();
            setPageBTO3(response.data);
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
    listElement03(idBTO03Selected);
  };
  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };
  useEffect(() => {
    setShowBackdrop(true);

    listAllElements();
    listElement02(idBTO02Selected);
  }, []);

  return (
    <MainCard title="Cấu hình tiêu đề">
      <TblRptoHeaderLevel1
        data={pageInfo}
        id={pageInfo != null ? pageInfo.id : ''}
        onReload={handleReloadConfig01}
        handleClick={handleClick01}
      />
      <br />
      <br />
      <TblRptoHeaderLevel2 data={pageBTO2} id={idBTO02Selected} onReload={handleReloadConfig02} handleClick={handleClick02} />
      <br />
      <br />
      <TblRptoHeaderLevel3 data={pageBTO3} id={idBTO03Selected} onReload={handleReloadConfig03} />

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default ConfigFee;
