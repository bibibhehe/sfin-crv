// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceApi from 'services/ConfigReport/exportReport.service';
import ServiceApi01 from 'services/ManagerMerchant/Participant.service';
import ServiceAPI02 from 'services/Global.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import SearchForm from './FormLoad/SearchForm';
import { Box, Grid, CircularProgress } from '@mui/material';

const useStyles = makeStyles({
  nonBorder: {
    border: 'none',
    paddingBottom: '10px'
  },
  tabTitle: {
    fontStyle: 'italic',
    color: 'gray',
    fontSize: '24px',
    padding: '10px  0 0 0'
  },
  widthSize: {
    width: '95%',
    margin: '0'
  },
  IframEdit: {
    width: '100%',
    height: '500px'
  }
});

const ReportFee = () => {
  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();
  const { t } = useTranslation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [configShow, setconfigShow] = useState();
  const [reportType, setreportType] = useState({});
  const [masterMerchantList, setmasterMerchantList] = useState({});
  const [masterMerchant, setmasterMerchant] = useState({});
  const [bussinessList, setbussinessList] = useState({});
  const [bussiness, setbussiness] = useState({});
  const [branchsList, setbranchsList] = useState({});
  const [branchs, setbranchs] = useState({});
  const [cashiersList, setcashiersList] = useState({});
  const [cashiers, setcashiers] = useState({});
  const [bankList, setbankList] = useState({});
  const [bankListNapas, setbankListNapas] = useState({});

  const [fileUrl, setFileUrl] = useState('');
  const convertReportType = (object) => {
    try {
      const valueObject = [];
      for (let index = 0; index < object.length; index++) {
        const element = object[index];
        valueObject.push({
          id: element.reportCode,
          name: element.name,
          disabled: false
        });
      }
      setreportType(valueObject);
    } catch (error) {
      //
    }
  };

  const convertMasterMerchant = (object) => {
    try {
      const valueObject = [];
      for (let index = 0; index < object.length; index++) {
        const element = object[index];
        valueObject.push({
          id: element.mmCode,
          name: element.mmCode + ' - ' + element.name,
          disabled: false
        });
      }
      setmasterMerchantList(valueObject);
    } catch (error) {
      //
    }
  };
  const convertBussiness = (object) => {
    try {
      const valueObject = [];
      for (let index = 0; index < object.length; index++) {
        const element = object[index];
        valueObject.push({
          id: element.merchantCode,
          name: element.merchantCode + ' - ' + element.name,
          disabled: false
        });
      }
      setbussinessList(valueObject);
    } catch (error) {
      //
    }
  };
 const convertBranchs = (object) => {
    try {
      const valueObject = [];
      for (let index = 0; index < object.length; index++) {
        const element = object[index];
        valueObject.push({
          id: element.branchCode,
          name: element.branchCode + ' - ' + element.name,
          disabled: false
        });
      }
      setbranchsList(valueObject);
    } catch (error) {
      //
    }
  };
   const convertCashiers = (object) => {
    try {
      const valueObject = [];
      for (let index = 0; index < object.length; index++) {
        const element = object[index];
        valueObject.push({
          id: element.cashierCode,
          name: element.cashierCode,
          disabled: false
        });
      }
      setcashiersList(valueObject);
    } catch (error) {
      //
    }
  };
  const hashSyncSearch = (reportCode, format, object) => {
    handleLoadingClick();

    ServiceApi.upforGetValue(reportCode, format, object)
      .then(
        (response) => {
          handleLoadingClick();
          const suggestedFilename = response.headers['x-suggested-filename'] || 'Reporting';
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${suggestedFilename}`);
          document.body.appendChild(link);
          link.click();
        },
        (error) => {
          handleLoadingClick();
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const hashSyncSearchPreview = (reportCode, format, object) => {
    handleLoadingClick();
    ServiceApi.upforGetValue(reportCode, format, object, 1)
      .then(
        (response) => {
          handleLoadingClick();
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url1 = URL.createObjectURL(blob);
          setFileUrl(url1);
        },
        (error) => {
          handleLoadingClick();
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      )
      .finally(() => setShowBackdrop(false));
  };
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
  const getReportList = () => {
    ServiceApi.getReportList().then(
      (response) => {
        setconfigShow(response.data);
        convertReportType(response.data);
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert(message);
      }
    );
  };
  const get_master_list = () => {
    ServiceApi.get_master_list().then(
      (response) => {
        setmasterMerchant(response.data);
        convertMasterMerchant(response.data);
      },
      (error) => {}
    );
  };
  const get_bussiness_list = (id) => {
    if (id) {
      ServiceApi.get_bussiness_list(id).then(
        (response) => {
          setbussiness(response.data)
          convertBussiness(response.data);
        },
        (error) => {}
      );
    }
  };
  const get_branchs_list = (id) => {
    if (id) {
      ServiceApi.get_branchs_list(id).then(
        (response) => {
          setbranchs(response.data)
          convertBranchs(response.data);
        },
        (error) => {}
      );
    }
  };
  const get_cashiers_list = (id) => {
    if (id) {
      ServiceApi.get_cashiers_list(id).then(
        (response) => {
          setcashiers(response.data)
          convertCashiers(response.data);
        },
        (error) => {}
      );
    }
  };
  const get_bank = () => {
    ServiceApi01.get_BankList().then(
      (response) => {
        // convertBank(response.data);
        setbankList(response.data);
      },
      (error) => {}
    );
  };
  const get_bankList_napas = () => {
    ServiceAPI02.get_bankList_napas().then(
      (response) => {
        setbankListNapas(response.data);
      },
      (error) => {}
    );
  };

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
    get_bankList_napas();
    getReportList();
    get_bussiness_list();
    get_bank();
    get_master_list();
    // getTransTypeList();
    // getTimeSettlementList();
  }, []);

  return (
    <MainCard title="Báo cáo tính phí giao dịch">
      <SearchForm
        configShow={configShow}
        reportType={reportType}
        hashSyncSearch={hashSyncSearch}
        hashSyncSearchPreview={hashSyncSearchPreview}
        showAlert={showAlert}
        showAlertSuccess={showAlertSuccess}
        bankList={bankList}
        bankListNapas={bankListNapas}
        masterMerchantList={masterMerchantList}
        masterMerchant={masterMerchant}
        bussinessList={bussinessList}
        bussiness={bussiness}
        branchs={branchs}
        branchsList={branchsList}
        cashiersList={cashiersList}
        cashiers={cashiers}
        get_bussiness_list={get_bussiness_list}
        get_branchs_list={get_branchs_list}
        get_cashiers_list={get_cashiers_list}

      />
      <br />
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}></legend>
        <Grid item xs={12}>
          <Grid container spacing={1} className={classes.widthSize}>
            {showBackdrop ? (
              <CircularProgress />
            ) : (
              <>
                {fileUrl ? (
                  <>
                    <iframe className={classes.IframEdit} src={fileUrl} title="PDF Preview"></iframe>
                  </>
                ) : (
                  <p></p>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />

      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default ReportFee;
