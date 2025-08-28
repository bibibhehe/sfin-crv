import MainCard from 'ui-component/cards/MainCard';
import { TableCell, TableRow, Grid, Button } from '@mui/material';
import TextField from 'ui-component/inputs/CustomTextField';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTablePaginationCustom from 'ui-component/tables/MyTablePaginationCustom';
import SearchIcon from '@mui/icons-material/Search';
import TblPayment2ndService from 'services/Research/TblPayment2nd.service';
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
import { formatCurency } from 'common/GuiUtils';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalData } from 'provider/GlobalProvider';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';

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
const PaymentPage2nd = () => {
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
  const [typeNotify, settypeNotify] = useState('error');
  const initFilterInputDate = () => ({
    beginDate: thirtyDaysAgo,
    endDate: today
  });
  const [filtersInput, setFiltersInput] = useState({
    acqId: ' ',
    orderCode: '',
    fromAccountName: '',
    fromAccount: '',
    masterMerchantId: ' ',
    merchantId: ' ',
    merchantBranchId: ' ',
    traceNo: '',

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

  const headers = [
    { id: 'stt', label: 'STT', minWidth: 50, align: 'left' },
    { id: 'creditAccount', label: 'Đơn hàng', minWidth: 200, align: 'left' },
    { id: 'responseCode', label: 'Response Code', minWidth: 200, align: 'left' },
    { id: 'acceptDatetime', label: 'Thời gian tạo', minWidth: 150, align: 'left' },
    { id: 'ACQ', label: 'TCPL', minWidth: 150, align: 'left' },
    { id: 'BEN', label: 'TCTT', minWidth: 150, align: 'left' },
    { id: 'debitAccount', label: 'Debit Account', minWidth: 200, align: 'left' },
    { id: 'Trans Ref', label: 'Transaction Reference', minWidth: 200, align: 'left' },
    { id: 'Amount', label: 'Amount', minWidth: 150, align: 'left' },
    { id: 'Trace', label: 'Trace', minWidth: 150, align: 'left' },
    { id: 'masterM', label: 'Master Merchant Name', minWidth: 150, align: 'left' },
    { id: 'merchant', label: 'Merchant Name', minWidth: 150, align: 'left' },
    { id: 'branch', label: 'Branch Name', minWidth: 150, align: 'left' },
    { id: 'merchantCashierName', label: 'Cashier Name', minWidth: 150, align: 'left' }

    // { id: 'Action', label: 'Action', minWidth: 100, align: 'left' }
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
    TblPayment2ndService.search(paging, newfiltersInput, filtersInput)
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
    setmessageError(message);
    settypeNotify('error');
    setOpen(true);
  };
  const showSucces = (message) => {
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
            <TableCell scope="row" className={classes.rowSelect}>
              {paging.size * paging.page + rowIndex}
            </TableCell>
            <TableCell className={classes.rowSelect}>
              <PaymentModal payment={object} text={object.destAccount} showAlertSuccess={showSucces} showAlert={showAlert}/>
            </TableCell>
            <TableCell className={classes.rowSelect}>{chipColorByRespCode(object.responseCode)}</TableCell>
            <TableCell className={classes.rowSelect}>{object.acceptDatetime}</TableCell>
            <TableCell className={classes.rowSelect}>
              <BankInfo bankId={object.acqId} />
            </TableCell>
            <TableCell className={classes.rowSelect}>
              <BankInfo bankId={object.benId} />
            </TableCell>
            <TableCell className={classes.rowSelect}>{object.fromAccount}</TableCell>
            <TableCell className={classes.rowSelect}>{object.transactionReference}</TableCell>

            <TableCell className={classes.rowSelect}>{formatCurency(object.transactionAmount)}</TableCell>
            <TableCell className={classes.rowSelect}>{object.traceNo}</TableCell>
            <TableCell className={classes.rowSelect}>{object.masterMerchantName}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantCorporateName}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantBranchName}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantCashierName}</TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={t('main.payment2nd.title')}>
      <Grid xs={10} justifyContent="center" alignItems="center" container style={{ margin: 'auto' }}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            <Grid item xs={12} md={7}>
              <DateRangePicker
                minDate={new Date(2025, 6, 1)}
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
          <TextField
            name="traceNo"
            label="Trace no"
            value={filtersInput['traceNo']}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
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

export default PaymentPage2nd;
