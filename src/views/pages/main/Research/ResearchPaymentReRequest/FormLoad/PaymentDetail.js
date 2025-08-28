import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListTextBox from 'ui-component/tables/ListTextBox';
import ListTextBoxUpdate from 'ui-component/inputs/ListTextBoxUpdate';
import TblPaymentReRequest from 'services/Research/TblPaymentReRequest.service';

import { makeStyles } from '@material-ui/core/styles';
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
  const { InfDatetime, setInfDatetime } = useState({});
  var data = null;
  var dataRC = null;
  var dataBK = null;
  const keyGetMCCGroup = [
    { id: 'masterMerchantName', label: 'Master Merchant Name' },
    { id: 'merchantCorporateName', label: 'Merchant Name' },
    { id: 'merchantBranchName', label: 'Branch Name	' },
    { id: 'merchantCashierName', label: 'Mã quầy' },
    { id: 'fullOrderCode', label: 'Mã đơn hàng' }
  ];
  const keyGetMCCAccount = [
    { id: 'benId', label: 'TCTV được ghi có' },
    { id: 'debitAccount', label: 'STK ghi có' },
    { id: 'traceNo', label: 'TraceNo' },
    // { id: 'creditRc', label: 'Response Code' },
    { id: 'createDateTime', label: 'Thời gian ghi nhận giao dịch' },
    { id: 'acqId', label: 'TCTV được ghi có cuối cùng' },
    { id: 'creditorAccount', label: 'STK ghi có cuối cùng' }

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

  const handleResend = (id, status) => {
    TblPaymentReRequest.resend(id, status)
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
            <ListTextBoxUpdate data={props.payment} listShow={keyGetMCCGroup} rowData={3} />
          </Grid>
        </Grid>
      </Box>
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Giao dịch ghi có tài khoản thực của Merchant</legend>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} className={classes.widthSize}>
            <ListTextBoxUpdate data={props.payment} listShow={keyGetMCCAccount} rowData={3} />
          </Grid>
        </Grid>
      </Box>
     
      <br />
      <Grid item xs={12} container>
        <Button variant="contained" size="small" style={{ margin: 'auto' }} onClick={() => handleResend(payment.id, 'APPROVED')}>
          APPROVE
        </Button>
        {payment && payment.status !== 'APPROVED' && (
          <Button variant="contained" size="small" style={{ margin: 'auto' }} onClick={() => handleResend(payment.id, 'CANCELED')}>
            CANCEL
          </Button>
        )}
      </Grid>
    </>
  );
};
export default PaymentDetail;
