import MainCard from 'ui-component/cards/MainCard';
import { TableCell, TableRow, Grid, Button } from '@mui/material';
import TextField from 'ui-component/inputs/CustomTextField';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTablePaginationCustom from 'ui-component/tables/MyTablePaginationCustom';
import SearchIcon from '@mui/icons-material/Search';
import TblPaymentService from 'services/Research/TblPayment.service';
import PaymentModal from './FormLoad/PaymentModal';
import { chipColorByRespCode } from 'common/GuiUtils';
import defaultSettings from 'defaultSetting';
import DateRangePicker from 'ui-component/inputs/DateRangerPickerTime';
import MyTable from 'ui-component/tables/MyTableCustomMultiRow';
import BankInfo from 'ui-component/BankDisplay';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';
import ServiceApi from 'services/ConfigReport/exportReport.service';
import ServiceApi_Global from 'services/Global.service';

import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import SelectBox from 'ui-component/inputs/selectBox';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import IosShareOutlined from '@mui/icons-material/IosShareOutlined';
import { saveAs } from 'file-saver';


const useStyles = makeStyles({
  evenRow: {
    backgroundColor: '#eef2f6'
  },
  RowTableFix: {
    width: 'auto',
    minWidth: '50px',
    maxWidth: '300px'
  },
  rowSelect: {
    border: '1px solid rgba(224, 224, 224, 1);',
    padding: '0.2rem',
    whiteSpace: 'nowrap'
  },
  setHeightRow: {
    height: '2.5rem'
  }
});
const PaymentPage = () => {
  const classes = useStyles();
  const today = endOfDay(new Date());
  const thirtyDaysAgo = startOfDay(new Date(), 30);
  const [message, setMessage] = useState('');
  const [listbank, setlistbank] = useState(null);
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
  const [typeNotify, settypeNotify] = useState('error');
  const initFilterInputDate = () => ({
    beginDate: thirtyDaysAgo,
    endDate: today
  });
  const [filtersInput, setFiltersInput] = useState({
    acqId: ' ',
    benId: ' ',
    traceNo: '',
    orderCode: '',
    channelId: ' ',
    fromAccountType: ' ',
    fromAccountName: '',
    fromAccount: '',
    destAccount: '',
    destAccountName: '',
    responseCode: ' ',
    masterMerchantId: ' ',
    merchantId: ' ',
    merchantBranchId: ' ',
    transationStatus: ' '
  });
  const get_bankList_napas = () => {
    ServiceApi_Global.get_bankList_napas().then(
      (response) => {
        const object = response.data;
        const valueObject = [];
        for (let index = 0; index < object.length; index++) {
          const element = object[index];
          valueObject.push({
            id: element.bankId,
            name: element.bankId + ' - ' + element.bankFullNameVi,
            disabled: false
          });
        }
        setlistbank(valueObject);
      },
      (error) => { }
    );
  };
  const [filtersDateRange, setfiltersDateRange] = useState(initFilterInputDate());

  const { t } = useTranslation();

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
    { id: 'stt', label: 'STT', minWidth: 50, spaneNumber: 20 },
    {
      id: 'GD1',
      label: 'Giao dịch 1',
      align: 'center',
      element: [
        { id: 'creditAccount', label: 'Đơn hàng' },
        { id: 'responseCode', label: 'Response Code' },
        { id: 'acceptDatetime', label: 'Thời gian tạo' },
        { id: 'ACQ', label: 'TCPL' },
        { id: 'BEN', label: 'TCTT' },
        { id: 'debitAccount', label: 'Debit Account' },
        { id: 'Trans Ref', label: 'Transaction Reference' },
      ]
    },
    {
      id: 'GD2',
      label: 'Giao dịch 2',
      align: 'center',
      element: [
        { id: 'realMerchantBenId', label: 'TCTV ghi có' },
        { id: 'realMerchantAccount', label: 'STK ghi có' },
        { id: 'creditTrace', label: 'TraceNo' },
        { id: 'creditRc', label: 'Response Code' },
        { id: 'creditAcceptDateTime', label: 'Thời giam ghi nhận GD' },
      ]
    }
  ];
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [masterMerchantList, setmasterMerchantList] = useState(null);
  const [bussinessList, setbussinessList] = useState(null);
  const [branchList, setbranchList] = useState(null);
  const get_branch_list = (id) => {
    if (id) {
      ServiceApi.get_branchs_list(id).then(
        (response) => {
          const object = response.data;
          const valueObject = [];
          for (let index = 0; index < object.length; index++) {
            const element = object[index];
            valueObject.push({
              id: element.id,
              name: element.branchCode + ' - ' + element.name,
              disabled: false
            });
          }
          setbranchList(valueObject);
        },
        (error) => { }
      );
    }
  };
  const get_bussiness_list = (id) => {
    if (id) {
      ServiceApi.get_bussiness_list(id).then(
        (response) => {
          const object = response.data;
          const valueObject = [];
          for (let index = 0; index < object.length; index++) {
            const element = object[index];
            valueObject.push({
              id: element.id,
              name: element.merchantCode + ' - ' + element.name,
              disabled: false
            });
          }
          setbussinessList(valueObject);
        },
        (error) => { }
      );
    }
  };
  const get_master_list = () => {
    ServiceApi.get_master_list().then(
      (response) => {
        const object = response.data;
        const valueObject = [];
        for (let index = 0; index < object.length; index++) {
          const element = object[index];
          valueObject.push({
            id: element.id,
            name: element.mmCode + ' - ' + element.name,
            disabled: false
          });
        }

        setmasterMerchantList(valueObject);
      },
      (error) => { }
    );
  };

  const handleExportExcel = () => {
    handleLoadingClick();
    const newfiltersInput = {};
    const arr = ['beginDate', 'endDate'];
    for (let key in filtersDateRange) {
      if (arr.indexOf(key) > -1) {
        if (filtersDateRange[key]) {
          newfiltersInput[key] = format(filtersDateRange[key], "yyyy-MM-dd'T'HH:mm:ss");
        } else {
          newfiltersInput[key] = filtersDateRange[key];
        }
      } else newfiltersInput[key] = filtersDateRange[key];
    }
    TblPaymentService.exportExcel(paging, newfiltersInput, filtersInput, messageType)
      .then(
        (response) => {
          handleLoadingClick();
          setmessageTypeShow(messageType);

          const contentDisposition = response.headers['content-disposition'];
          const suggestedFilename = response.headers['x-suggested-filename'];

          let fileName = 'data.xlsx'; // Tên tệp mặc định

          if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch.length === 2) {
              fileName = fileNameMatch[1];
            }
          } else if (suggestedFilename) {
            fileName = suggestedFilename;
          }
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, fileName);
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
    const newfiltersInput = {};
    const arr = ['beginDate', 'endDate'];
    for (let key in filtersDateRange) {
      if (arr.indexOf(key) > -1) {
        if (filtersDateRange[key]) {
          newfiltersInput[key] = format(filtersDateRange[key], "yyyy-MM-dd'T'HH:mm:ss");
        } else {
          newfiltersInput[key] = filtersDateRange[key];
        }
      } else newfiltersInput[key] = filtersDateRange[key];
    }
    TblPaymentService.search(paging, newfiltersInput, filtersInput, messageType)
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

  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const showAlert = (message) => {
    setmessageError(message);
    settypeNotify('error');
    setOpen(true);
  };
  const showSucces = (message) => {
    setmessageError(message);
    settypeNotify('success');

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
    get_master_list();
    get_bankList_napas();
    listAllElements();
  }, [paging]);

  const onFiltersInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const newFiltersInput = { ...filtersInput };
    newFiltersInput[name] = value;

    if (name == 'masterMerchantId') {
      newFiltersInput['merchantId'] = ' ';
      newFiltersInput['merchantBranchId'] = ' ';
      setbussinessList(null);
      setbranchList(null);
      get_bussiness_list(value);
    }
    if (name == 'merchantId') {
      newFiltersInput['merchantBranchId'] = ' ';
      setbranchList(null);
      get_branch_list(value);
    }

    setFiltersInput(newFiltersInput);
  };

  const handleSync = (event) => {
    const newPaging = { ...paging };
    newPaging.page = 0;
    setPaging(newPaging);
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

  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;

    const listElements = pageInfo.content;

    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;

        var tableRow = (
          <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? classes.evenRow : ''}>
            <TableCell scope="row" className={classes.rowSelect}>
              {paging.size * paging.page + rowIndex}
            </TableCell>
            <TableCell className={classes.rowSelect}>
              <PaymentModal payment={object} typePayment={messageTypeShow} text={object.destAccount} showAlertSuccess={showSucces} showAlert={showAlert} />
            </TableCell>

            <TableCell className={classes.rowSelect}>{chipColorByRespCode(object.responseCode)}</TableCell>
            <TableCell className={classes.rowSelect}>{object.acceptDatetime}</TableCell>
            <TableCell
              className={classes.rowSelect}
              style={
                object.issId && object.issId.startsWith('704')
                  ? { backgroundColor: '#e3f2fd' } // màu xanh nhạt, bạn có thể đổi màu khác nếu muốn
                  : {}
              }
            >
              <BankInfo bankId={object.acqId} />
            </TableCell>
            <TableCell className={classes.rowSelect}>
              <BankInfo bankId={object.benId} />
            </TableCell>
            <TableCell className={classes.rowSelect}>{object.fromAccount}</TableCell>
            <TableCell className={classes.rowSelect}>{object.transactionReference}</TableCell>

            <TableCell className={classes.rowSelect}>{object.realMerchantBenId}</TableCell>
            <TableCell className={classes.rowSelect}>{object.realMerchantAccount}</TableCell>
            <TableCell className={classes.rowSelect}>{object.creditTrace}</TableCell>
            <TableCell className={classes.rowSelect}>{chipColorByRespCode(object.creditRc)}</TableCell>
            <TableCell className={classes.rowSelect}>{object.creditAcceptDateTime}</TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={t('main.payment.title')}>
      <Grid xs={10} justifyContent="center" alignItems="center" container style={{ margin: 'auto' }}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            <Grid item xs={12} md={7}>
              <DateRangePicker
                beginFrom={filtersDateRange.beginDate}
                endTo={filtersDateRange.endDate}
                defaultObject={filtersDateRange}
                setFiltersInput={setfiltersDateRange}
                beginLabel={t('common.element.beginTime')}
                endLabel={t('common.element.endTime')}
                beginName="beginDate"
                isClear={true}
                endName="endDate"
                sx={{
                  width: '100%',
                  margin: 'auto'
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} container style={{ paddingLeft: '0' }}>
              <TextField
                name="orderCode"
                label="Mã đơn hàng"
                fullWidth
                value={filtersInput['orderCode']}
                onChange={(event) => {
                  onFiltersInputChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} container>
              <Button component="label" onClick={handleSync} variant="contained" tabIndex={-1} startIcon={<SearchIcon />}>
                Lọc
              </Button>
            </Grid>
            <Grid item xs={12} md={2} container>
              <Button component="label" onClick={handleExportExcel} variant="contained" tabIndex={-1} color="secondary" startIcon={<IosShareOutlined />}>
                Export
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MoreFilterAccordion>
        <Grid item xs={3}>
          <SelectBox
            name="masterMerchantId"
            value={filtersInput.masterMerchantId}
            label="Đơn vị phát triển mạng lưới"
            object={masterMerchantList}
            showEm="1"
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="merchantId"
            value={filtersInput.merchantId}
            label="Đơn vị chấp nhận thanh toán"
            object={bussinessList}
            showEm="1"
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="merchantBranchId"
            value={filtersInput.merchantBranchId}
            label="Branch"
            object={branchList}
            showEm="1"
            onChange={onFiltersInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="transationStatus"
            value={filtersInput.transationStatus}
            label="Transaction Status"
            object={resultTypeSelect}
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
            value={filtersInput['traceNo']}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>{' '}
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
          <SelectBox
            name="acqId"
            value={filtersInput.acqId}
            label="TCPL ID"
            object={listbank}
            showEm="1"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="fromAccountName"
            label={t('common.element.fromAccountName')}
            fullWidth
            value={filtersInput['fromAccountName']}
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
            value={filtersInput['fromAccount']}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <SelectBox
            name="benId"
            value={filtersInput.benId}
            label="Ben ID"
            object={listbank}
            showEm="1"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="destAccountName"
            label={t('common.element.destAccountName')}
            fullWidth
            value={filtersInput['destAccountName']}
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
            value={filtersInput['destAccount']}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
      </MoreFilterAccordion>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={12} container>
            <MyTablePaginationCustom
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={pageInfo.totalElements}
              rowsPerPage={paging.size}
              page={paging.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
      <MyTable
        headers={headers}
        totalElements={pageInfo.totalElements}
        paging={paging}
        buildElementRows={buildElementRows}
        disable="0"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />

      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default PaymentPage;
