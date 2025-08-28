import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListTextBox from 'ui-component/tables/ListTextBox';
import ListTextBoxUpdate from 'ui-component/inputs/ListTextBoxUpdate';
import TblPayment2ndService from 'services/Research/TblPayment2nd.service';
import { makeStyles } from '@material-ui/core/styles';
import TextField from 'ui-component/inputs/CustomTextField';

const useStyles = makeStyles({
  nonBorder: {
    border: 'none',
    paddingBottom: '10px'
  },
  tabTitle: {
    fontStyle: 'italic',
    color: 'gray',
    fontSize: '1.1 rem',
    padding: '10px  0 0 0'
  },
  widthSize: {
    margin: '0'
  }
});
const PaymentDetail = (props) => {
  const classes = useStyles();

  const payment = props.payment;

  const { t, i18n } = useTranslation();
  var data = null;
  var dataRC = null;
  var dataBK = null;
  const keyGetMCCGroup = [
    { id: 'masterMerchantName', label: 'Master Merchant Name' },
    { id: 'merchantCorporateName', label: 'Merchant Name' },
    { id: 'merchantBranchName', label: 'Branch Name	' },
    { id: 'merchantCashierName', label: 'Mã quầy' },
    { id: 'orderCode', label: 'Mã đơn hàng' }
  ];
  const keyGetMCCAccount = [
    { id: 'realMerchantBenId', label: 'TCTV được ghi có' },
    { id: 'realMerchantAccount', label: 'STK ghi có' },
    { id: 'creditRc', label: 'TraceNo' },
    { id: 'creditAcceptDateTime', label: 'Thời gian ghi nhận giao dịch' },
    { id: 'creditRc', label: 'Response code' },
    { id: 'creditRefId', label: 'Transaction Reference' }
  ];
  const keysToGetBkend = [
    'localDateTime',
    'settleDateTime',
    'acceptDatetime',
    'responseDateTime',
    'modifDateTime',
    'importedDateTime',
    'sourceSystem',
    'destSystem',
    'businessSvcCode',
    'settlementDebtorAgent',
    'settlementCreditorAgent'
  ];

  const keysToGetRC = ['responseCode', 'transactionStatus'];
  const keysToGetOrTransaction = [
    'localDate',
    'settleDate',
    'localTime',
    'settlementCode',
    'procCode',
    'traceNo',
    'transactionReference',
    'shortedTransactionReference',
    'pan',
    'fromAccount',
    'transactionAmount',
    'currencyCode',
    'acqId',
    'benId',
    'issId',
    'serviceCode',
    'fromAccountName',
    'destAccountName',
    'narration',
    'refNo',
    'termId',
    'cardAcceptIdCode',
    'cardAcceptNameLocation',
    'channelId'
  ];
  if (payment) {
    try {
      data = keysToGetOrTransaction.reduce((acc, key) => {
        if (key in payment) {
          acc[key] = payment[key];
        }
        return acc;
      }, {});
      dataRC = keysToGetRC.reduce((acc, key) => {
        if (key in payment) {
          acc[key] = payment[key];
        }
        return acc;
      }, {});
      dataBK = keysToGetBkend.reduce((acc, key) => {
        if (key in payment) {
          acc[key] = payment[key];
        }
        return acc;
      }, {});
    } catch (error) {
      //
    }
  }

  const initNewItem = () => {
    return {
      acqId: payment ? payment['realMerchantBenId'] : '',
      creditorAccount: payment ? payment['realMerchantAccount'] : ''
  };
  };

  const [newItem, setNewItem] = useState(initNewItem());

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...newItem };
    const name = event.target.name;
    const value = event.target.value;
    newFiltersInput[name] = value;
    setNewItem(newFiltersInput);
  };

  const handleResend = (id) => {
    TblPayment2ndService.resend(id, newItem)
      .then(
        (response) => {
          props.showAlertSuccess('Thành công');
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          props.showAlert(message);
        }
      )
    // .finally(() => setShowBackdrop(false));
  };

  useEffect(() => {
    setNewItem(initNewItem());
  }, [payment]);

  return (
    <>
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Thông tin giao dịch gốc</legend>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} className={classes.widthSize}>
            <ListTextBox data={data} linkText="common.element" rowData={3} />
          </Grid>
        </Grid>
      </Box>
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Kết quả giao dịch</legend>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} className={classes.widthSize}>
            <ListTextBox data={dataRC} linkText="common.element" rowData={3} />
          </Grid>
        </Grid>
      </Box>
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Thông tin backend</legend>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} className={classes.widthSize}>
            <ListTextBox data={dataBK} linkText="common.element" rowData={3} />
          </Grid>
        </Grid>
      </Box>
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Merchant và đơn hàng</legend>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} className={classes.widthSize}>
            <ListTextBoxUpdate data={payment} listShow={keyGetMCCGroup} rowData={3} />
          </Grid>
        </Grid>
      </Box>
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Giao dịch ghi có tài khoản thực của Merchant</legend>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} className={classes.widthSize}>
            <ListTextBoxUpdate data={payment} listShow={keyGetMCCAccount} rowData={3} />
          </Grid>
        </Grid>
      </Box>
      <Box component="fieldset" className={classes.nonBorder}>
        {/* <legend className={classes.tabTitle}>Thông tin giao dịch ĐCBS</legend> */}
        <Grid container spacing={gridSpacing} className={classes.widthSize}>
          <Grid item xs={3}>
            <TextField
              name="acqId"
              label="TCTV được ghi có cuối cùng"
              value={newItem['acqId']}
              fullWidth
              onChange={(event) => {
                onFiltersInputChange(event);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="creditorAccount"
              label="STK ghi có cuối cùng"
              value={newItem['creditorAccount']}
              fullWidth
              onChange={(event) => {
                onFiltersInputChange(event);
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      <Grid item xs={12} container>
        <Button variant="contained" size="small" style={{ margin: 'auto' }} onClick={() => handleResend(payment.id)}>
          Resend
        </Button>
        <Button variant="contained" size="small" style={{ margin: 'auto' }} onClick={() => props.handleClose()}>
          Bỏ qua
        </Button>
      </Grid>
    </>
  );
};
export default PaymentDetail;
