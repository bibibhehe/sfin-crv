// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceAPI from 'services/ConfigTime/ConfigTimeSession.service';
import CommonService from 'services/AssignParticipant/CommonService.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ParticapantTable from './FormLoad/ParticapantTable';
import ParticapantTableConfig from './FormLoad/ParticipantTableConfig';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import defaultSettings from 'defaultSetting';

const useStyles = makeStyles({
  evenRow: {
    backgroundColor: '#e3f2fd'
  },
  tabTitle: {
    fontWeight: '600',
    color: 'black',
    fontSize: '20px',
    padding: '10px  0 0 0'
  },
  nonBorder: {
    border: 'none',
    paddingBottom: '10px'
  },
  widthSize: {
    width: '95%',
    margin: '0'
  }
});

const SpecialPropgram = () => {
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

  const listAllElements = () => {
    handleLoadingClick();
    ServiceAPI.search(paging)
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
  }, [paging]);

  return (
    <MainCard title="Quản lý phiên giao dịch">
      <br />
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Cấu hình khoảng thời gian phiên</legend>
        <Grid item xs={12}>
          <Grid container spacing={1} className={classes.widthSize}>
            <ParticapantTableConfig
              data={pageInfo}
              totalElements={pageInfo.totalElements}
              onReload={handleReloadConfig01}
              paging={paging}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showError={showAlert}
              showAlertSuccess={showAlertSuccess}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Thông tin lịch sử phiên</legend>
        <Grid item xs={12}>
          <Grid container spacing={1} className={classes.widthSize}>
            <ParticapantTable
              data={pageInfo}
              totalElements={pageInfo.totalElements}
              onReload={handleReloadConfig01}
              paging={paging}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showError={showAlert}
              showAlertSuccess={showAlertSuccess}
            />
          </Grid>
        </Grid>
      </Box>

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
