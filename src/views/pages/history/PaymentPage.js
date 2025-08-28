// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Paper, Grid, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import ExportIcon from '@mui/icons-material/IosShare';

import TblPaymentService from 'services/TblPayment.service';
import PaymentModal from './PaymentModal';
import { chipColorByRespCode, chipColorByAchSettleStatus } from 'common/GuiUtils';

import defaultSettings from 'defaultSetting';
import DateRangePicker from 'ui-component/daterangepicker/DateRangePicker';
import defaultDateRange from 'ui-component/daterangepicker/defaultDateRange.ts';
import MyTable from 'ui-component/MyTable';
import BankInfo from 'ui-component/BankDisplay';
import BankSelection from 'ui-component/BankSelection';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';
// import SystemDirectionSelection from 'ui-component/SystemDirectionSelection';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import SelectBox from 'ui-component/inputs/selectBox';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { formatCurency } from 'common/GuiUtils';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalData } from 'provider/GlobalProvider';

const useStyles = makeStyles({
  evenRow: {
    backgroundColor: '#e3f2fd'
  },
  RowTableFix: {
    width: 'auto',
    minWidth: '50px',
    maxWidth: '300px'
  }
});
const PaymentPage = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });

  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });
  const [messageType, setmessageType] = useState('Payment');
  const [messageTypeShow, setmessageTypeShow] = useState('Payment');

  const [filtersInput, setFiltersInput] = useState({
    acqId: ' ',
    benId: ' ',
    traceNo: '',
    transactionStatus: ' ',
    transactionReference: '',
    shortedTransactionReference: '',
    sourceSystem: ' ',
    destSystem: ' ',
    typeServices: ' ',
    channelId: ' ',
    fromAccountType: ' ',
    destAccountType: ' ',
    fromAccountName: '',
    fromAccount: '',
    destAccount: '',
    destAccountName: '',
    responseCode: ' '
  });
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;
  const listNapasBankSelect = listNapasBank
    ? listNapasBank.map((item) => {
        return { id: item.participantCode, name: item.participantCode + ' - ' + item.shortName, disabled: false };
      })
    : null;
  const [filtersDateRange, setfiltersDateRange] = useState(defaultDateRange());

  const { t, i18n } = useTranslation();

  const messageTypeSelect = [
    { id: 'Payment', name: t('common.inputs.payment'), disabled: false },
    { id: 'Refund', name: t('common.inputs.refund'), disabled: false },
    { id: 'ĐCBS', name: 'ĐCBS', disabled: true }
  ];
  const typeResponseCode = [
    { id: ' ', name: 'ALL', disabled: false },
    { id: '00', name: '00', disabled: false },
    { id: '68', name: '68', disabled: false },
    { id: '91', name: '91', disabled: false }
  ];
  const typeChannel = [
    { id: ' ', name: 'ALL', disabled: false },
    { id: '01', name: '01 - ATM', disabled: false },
    { id: '02', name: '02 - Counter', disabled: false },
    { id: '03', name: '03 - POS', disabled: false },
    { id: '04', name: '04 - Internet Banking', disabled: false },
    { id: '05', name: '05 - Mobile application', disabled: false },
    { id: '06', name: '06 - SMS banking', disabled: false },
    { id: '07', name: '07 - Khác', disabled: false },
    { id: '15', name: '15 - Mobile application', disabled: false },
    { id: '95', name: '95 - Mobile IBFT', disabled: false },
    { id: '96', name: '96 - Cash In', disabled: false },
    { id: '97', name: '97 - Cash Out', disabled: false },
    { id: '98', name: '98 - Hỗ trợ chuyển tiền', disabled: false },
    { id: '99', name: '99 - QR Code', disabled: false }
  ];

  const typeServices = [
    { id: ' ', name: 'ALL', disabled: false },
    { id: 'IBFT', name: 'IBFT', disabled: true },
    { id: 'PAYMENT', name: 'PAYMENT', disabled: true }
  ];
  const typeTransaction = [
    { id: ' ', name: 'ALL', disabled: false },
    { id: 'ACH', name: 'ACH', disabled: false },
    { id: 'IBFT', name: 'IBFT', disabled: false },
    { id: 'IBFT20', name: 'IBFT20', disabled: false }
  ];
  const resultTypeSelect = [
    { id: ' ', name: 'ALL', disabled: false },
    { id: 'ACSP', name: 'ACSP', disabled: false },
    { id: 'RJCT', name: 'RJCT', disabled: false }
  ];
  const typeACCSelect = [
    { id: ' ', name: 'ALL', disabled: false },
    { id: 'ACC', name: 'ACC', disabled: false },
    { id: 'PAN', name: 'PAN', disabled: false }
  ];

  const headers = [
    t('common.element.numbering'),
    'TransactionType',
    t('common.element.transactionReference'),
    t('common.element.acceptDatetime'),
    t('common.element.transactionStatus'),
    t('common.element.responseCode'),
    t('common.element.acqId'),
    t('common.element.benId'),
    t('common.element.settleDateTime'),
    t('common.element.settlementCode'),
    t('common.element.fromAccount'),
    t('common.element.destAccount'),
    t('common.element.transactionAmount'),
    t('common.element.traceNo'),
    'Action'
  ];
  const [showBackdrop, setShowBackdrop] = useState(false);
  const listAllElements = () => {
    handleLoadingClick();

    TblPaymentService.search(paging, filtersDateRange, filtersInput, messageType)
      .then(
        (response) => {
          handleLoadingClick();
          setmessageTypeShow(messageType);
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
  const formatValue = (valueString) => {
    let valueReturn = valueString;
    try {
      if (typeof valueString == 'string') {
        valueReturn = valueString.substring(valueString.length - 6, valueString.length);
      }
    } catch (error) {
      // console.log(error);
    }
    return valueReturn;
  };
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const showAlert = (message) => {
    setmessageError(message);
    setOpen(true);
  };
  const handleChangeValue = (event) => {
    setmessageType(event.target.value);
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
    setShowBackdrop(true);
    listAllElements();
  }, [paging]);

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };

  const handleSync = () => {
    listAllElements();
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
  const getValueTypeService = (value) => {
    let result = 'value';
    if (value == 'Payment' || value == ' ') {
      result = 'Chuyển tiền';
    }
    if (value == 'Refund') {
      result = 'Hoàn Trả';
    }
    if (value == 'ĐCBS') {
      result = 'ĐCBS';
    }
    return result;
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;

    const listElements = pageInfo.content;

    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;

        var tableRow = (
          <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? classes.evenRow : ''}>
            <TableCell scope="row" className={'align-middle text-center ' + classes.RowTableFix}>
              {paging.size * paging.page + rowIndex}
            </TableCell>
            {/* <TableCell className={'align-middle text-center no-wrap-box '} style={{ textAlign: 'center' }}>
              ...{object.shortedTransactionReference == null ? formatValue(object.caseId) : object.shortedTransactionReference}
            </TableCell> */}
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              {getValueTypeService(messageTypeShow)}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              <PaymentModal payment={object} text={object.transactionReference == null ? object.caseId : object.transactionReference} />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              {/* {chipColorByAchSettleStatus(object.transactionStatus)} */}
              {object.acceptDatetime}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              {chipColorByAchSettleStatus(object.transactionStatus)}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              {chipColorByRespCode(object.responseCode)}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix} style={{ minWidth: '200px' }}>
              <BankInfo bankId={object.acqId} />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix} style={{ minWidth: '200px' }}>
              <BankInfo bankId={object.benId} />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>{object.settleDateTime}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>{object.settlementCode}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>{object.fromAccount}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>{object.destAccount}</TableCell>

            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              {formatCurency(object.transactionAmount)}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>{object.traceNo}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.RowTableFix}>
              <Button variant="outlined">ĐCBS </Button>
            </TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={'Tra cứu giao dịch'}>
      <Grid container spacing={gridSpacing}>
        <DateRangePicker
          defaultRange={filtersDateRange}
          begin="beginDate"
          end="endDate"
          labelBegin={t('common.element.beginTime')}
          labelEnd={t('common.element.endTime')}
          onChange={setfiltersDateRange}
          xs={3}
        />
        <Grid item xs={3}>
          <TextField
            name="transactionReference"
            label="TransRef"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item style={{ alignContent: 'center' }} xs={1.5}>
          <Button
            component="label"
            onClick={handleSync}
            role={undefined}
            size="large"
            variant="contained"
            tabIndex={-1}
            startIcon={<SearchIcon />}
          >
            {t('common.button.filter')}
          </Button>
        </Grid>
        <br />
        <DateRangePicker
          defaultRange={filtersDateRange}
          begin="beginSettleDate"
          end="endSettleDate"
          labelBegin={t('common.element.beginSettleDate')}
          labelEnd={t('common.element.endSettleDate')}
          onChange={setfiltersDateRange}
          xs={3}
        />
        <br />
      </Grid>

      <MoreFilterAccordion>
        <Grid item xs={3}>
          <SelectBox
            name="typeServices"
            value={filtersInput.typeServices}
            label={t('common.element.typeServices')}
            object={typeServices}
            showEm="0"
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="messageType"
            value={messageType}
            label={t('common.element.messageType')}
            object={messageTypeSelect}
            showEm="0"
            onChange={(event) => {
              handleChangeValue(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="channelId"
            value={filtersInput.channelId}
            label={t('common.element.channelTransaction')}
            object={typeChannel}
            showEm="0"
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={1.5}>
          <SelectBox
            name="sourceSystem"
            value={filtersInput.sourceSystem}
            label={t('common.element.sourceSystem')}
            object={typeTransaction}
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={1.5}>
          <SelectBox
            name="destSystem"
            value={filtersInput.destSystem}
            label={t('common.element.destSystem')}
            object={typeTransaction}
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="acqId"
            value={filtersInput.acqId}
            label="TCPL ID"
            object={listNapasBankSelect}
            showEm="1"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="fromAccountType"
            value={filtersInput.fromAccountType}
            label={t('common.element.accType')}
            object={typeACCSelect}
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="fromAccountName"
            label={t('common.element.fromAccountName')}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="fromAccount"
            label={t('common.element.fromAccount')}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <SelectBox
            name="benId"
            value={filtersInput.benId}
            label="Ben ID"
            object={listNapasBankSelect}
            showEm="1"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="destAccountType"
            value={filtersInput.destAccountType}
            label={t('common.element.accType')}
            object={typeACCSelect}
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="destAccountName"
            label={t('common.element.destAccountName')}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="destAccount"
            label={t('common.element.destAccount')}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <SelectBox
            name="transactionStatus"
            value={filtersInput.transactionStatus}
            label={t('common.element.statusTransaction')}
            object={resultTypeSelect}
            showEm="0"
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="responseCode"
            value={filtersInput.responseCode}
            label={t('common.element.responseCode')}
            object={typeResponseCode}
            showEm="0"
            onChange={onFiltersInputChange}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="traceNo"
            label="Trace no"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="shortedTransactionReference"
            label="Shorted TransRef"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
      </MoreFilterAccordion>

      <MyTable
        headers={headers}
        totalElements={pageInfo.totalElements}
        paging={paging}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        buildElementRows={buildElementRows}
        disable="0"
      />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default PaymentPage;
