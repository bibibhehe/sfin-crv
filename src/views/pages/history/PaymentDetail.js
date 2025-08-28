import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import SubCard from 'ui-component/cards/SubCard';
import ListTextBox from 'ui-component/tables/ListTextBox';

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
    width: '95%',
    margin: '0'
  }
});
const PaymentDetail = (props) => {
  const classes = useStyles();

  const payment /* eslint-disable react/prop-types */ = props.payment;

  const { t, i18n } = useTranslation();
  const { InfDatetime, setInfDatetime } = useState({});
  var data = null;
  var dataRC = null;
  var dataBK = null;

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

  const keysToGetRC = ['responseCode', 'transactionStatus', 'creditorResponseCode'];
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
    </>
  );
};
export default PaymentDetail;
