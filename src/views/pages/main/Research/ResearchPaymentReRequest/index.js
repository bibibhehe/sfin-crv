import MainCard from 'ui-component/cards/MainCard';
import { TableCell, TableRow, Grid, Button } from '@mui/material';
import TextField from 'ui-component/inputs/CustomTextField';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTablePaginationCustom from 'ui-component/tables/MyTablePaginationCustom';
import SearchIcon from '@mui/icons-material/Search';
import TblPaymentReRequest from 'services/Research/TblPaymentReRequest.service';
import PaymentModal from './FormLoad/PaymentModal';
import defaultSettings from 'defaultSetting';
import DateRangePicker from 'ui-component/inputs/DateRangerPickerTime';
import MyTable from 'ui-component/tables/MyTableCustomMultiRow';
import BankInfo from 'ui-component/BankDisplay';
import ServiceApi from 'services/ConfigReport/exportReport.service';
import ServiceApi_Global from 'services/Global.service';

import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import SelectBox from 'ui-component/inputs/selectBox';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
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
    padding: '0.2rem'
  },
  setHeightRow: {
    height: '2.5rem'
  }
});
const PaymentPageReRequest = () => {
  const classes = useStyles();
  const today = endOfDay(new Date());
  const thirtyDaysAgo = startOfDay(subDays(new Date(), 1));
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
    status: ' ',
    debitAccount: ''
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

  const typeStatus = [
    { id: ' ', name: 'Tất cả', disabled: false },
    { id: 'CREATED ', name: 'Chưa duyệt', disabled: false },
    { id: 'APPROVED ', name: 'Đã duyệt', disabled: false },
    { id: 'CANCELED ', name: 'Từ chối', disabled: false }
  ];

  const headers = [
    { id: 'stt', label: 'STT', minWidth: 50, align: 'left' },
    { id: 'createDateTime', label: 'Thời gian tạo yêu cầu', minWidth: 200, align: 'left' },
    { id: 'debitAccount', label: 'Mã đơn hàng', minWidth: 150, align: 'left' },
    { id: 'acqId', label: 'Ngân hàng nhận', minWidth: 200, align: 'left' },
    { id: 'creditorAccount', label: 'STK nhận', minWidth: 150, align: 'left' },
    { id: 'status ', label: 'Trạng thái', minWidth: 150, align: 'left' },
    { id: 'userMaker', label: 'Người tạo', minWidth: 150, align: 'left' },
    { id: 'userChecker', label: 'Người phê duyệt', minWidth: 200, align: 'left' },
    { id: 'dateApproved', label: 'Thời gian phê duyệt', minWidth: 200, align: 'left' },
    { id: 'merchantCode', label: 'Mã ĐVCNTT', minWidth: 150, align: 'left' },
    { id: 'merchantBranchCode', label: 'Mã Chi nhánh', minWidth: 150, align: 'left' },
    { id: 'merchanrCashierCode', label: 'Mã Quầy', minWidth: 150, align: 'left' },
  ];
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [masterMerchantList, setmasterMerchantList] = useState(null);
  const [bussinessList, setbussinessList] = useState(null);
  const [branchList, setbranchList] = useState(null);
  const get_branch_list = (id) => {
    if (id) {
      ServiceApi.get_branch_list(id).then(
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
    TblPaymentReRequest.exportExcel(paging, newfiltersInput, filtersInput, messageType)
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
    TblPaymentReRequest.search(paging, newfiltersInput, filtersInput, messageType)
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
            <TableCell className={classes.rowSelect}>{object.createDateTime}</TableCell>
            <TableCell className={classes.rowSelect}>
              <PaymentModal payment={object} typePayment={messageTypeShow} text={object.debitAccount} listAllElements={listAllElements} showAlertSuccess={showSucces} showAlert={showAlert} />
            </TableCell>
            <TableCell className={classes.rowSelect}>
              <BankInfo bankId={object.acqId} />
            </TableCell>
            <TableCell className={classes.rowSelect}>{object.creditorAccount}</TableCell>
            <TableCell className={classes.rowSelect}>{object.status}</TableCell>
            <TableCell className={classes.rowSelect}>{object.userMaker}</TableCell>
            <TableCell className={classes.rowSelect}>{object.userChecker}</TableCell>
            <TableCell className={classes.rowSelect}>{object.dateApproved}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantCode}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantBranchCode}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchanrCashierCode}</TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }
    return listTag;
  };

  return (
    <MainCard title={t('main.paymentReRequest.title')}>
      <Grid xs={10} justifyContent="center" alignItems="center" container style={{ margin: 'auto' }}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} md={5}>
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
              <SelectBox
                name="status"
                label="Trạng thái"
                object={typeStatus}
                showEm="0"
                fullWidth
                value={filtersInput['status']}
                onChange={(event) => {
                  onFiltersInputChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} container>
              <TextField
                name="debitAccount"
                label="Mã đơn hàng"
                fullWidth
                value={filtersInput['debitAccount']}
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

export default PaymentPageReRequest;
