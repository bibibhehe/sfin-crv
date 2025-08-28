import MainCard from 'ui-component/cards/MainCard';
import { TableCell, TableRow, Grid, Button } from '@mui/material';
import TextField from 'ui-component/inputs/CustomTextField';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTablePaginationCustom from 'ui-component/tables/MyTablePaginationCustom';
import SearchIcon from '@mui/icons-material/Search';
import ManagerVVirtualAccountService from 'services/ManagerMerchant/VVirtualAccount.service';
import defaultSettings from 'defaultSetting';
import DateRangePicker from 'ui-component/inputs/DateRangerPickerTime';
import MyTable from 'ui-component/tables/MyTableCustomMultiRow';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';

import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import SelectBox from 'ui-component/inputs/selectBox';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import { chipColorBySynchronizeVA } from 'common/GuiUtils';

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
const ManagerVVirtualAccount = () => {
  const classes = useStyles();
  const today = endOfDay(new Date());
  const thirtyDaysAgo = startOfDay(subDays(new Date(), 30));
  const [message, setMessage] = useState('');
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
    virualAccount: '',
    vaName: '',
    vaSyncStatus: ' ',
  });

  const [filtersDateRange, setfiltersDateRange] = useState(initFilterInputDate());

  const { t } = useTranslation();

  const vaSyncStatusList = [
    { id: 'Y', name: 'Đã đồng bộ', disabled: false },
    { id: 'N', name: 'Chưa đồng bộ', disabled: false }
  ];

  const headers = [
    { id: 'stt', label: 'STT', minWidth: 50, align: 'left' },
    { id: 'virualAccount', label: 'VA', minWidth: 200, align: 'left' },
    { id: 'vaName', label: 'VA Name', minWidth: 200, align: 'left' },
    { id: 'merchantId', label: 'Tên merchant', minWidth: 150, align: 'left' },
    { id: 'merchantBranchType', label: 'Loại merchant', minWidth: 150, align: 'left' },
    { id: 'dateCreated', label: 'Ngày tạo', minWidth: 150, align: 'left' },
    { id: 'vaSyncStatus', label: 'Trạng thái đồng bộ', minWidth: 200, align: 'left' },
    { id: 'action', label: 'Hành động', minWidth: 50 }
  ];
  const [showBackdrop, setShowBackdrop] = useState(false);

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
    ManagerVVirtualAccountService.search(paging, newfiltersInput, filtersInput)
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
    listAllElements();
  }, [paging]);

  const onFiltersInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const newFiltersInput = { ...filtersInput };
    newFiltersInput[name] = value;
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


  const handleReSync = (virualAccount) => {
     ManagerVVirtualAccountService.reSync(virualAccount)
      .then(
        (response) => {
         showAlert('Đã tạo yêu cầu gửi lại')
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  }
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
            <TableCell className={classes.rowSelect}>{object.virualAccount}</TableCell>
            <TableCell className={classes.rowSelect}>{object.vaName}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantId}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantBranchType}</TableCell>
            <TableCell className={classes.rowSelect}>{object.dateCreated}</TableCell>
            <TableCell className={classes.rowSelect}>{chipColorBySynchronizeVA(object.vaSyncStatus)}</TableCell>
            <TableCell className={classes.rowSelect} sx={{ whiteSpace: 'nowrap' }}>
              <Button variant="outlined" onClick={() => handleReSync(object.virualAccount)}>
                Resend
              </Button>
            </TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={'Danh sách VA'}>
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
                name="virualAccount"
                label="Virtual account "
                fullWidth
                value={filtersInput['virualAccount']}
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
          <TextField
            name="vaName"
            label="VA Name"
            fullWidth
            value={filtersInput.vaName}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectBox
            name="vaSyncStatus"
            value={filtersInput.vaSyncStatus}
            label="Trạng thái đồng bộ"
            object={vaSyncStatusList}
            showEm="1"
            onChange={onFiltersInputChange}
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

export default ManagerVVirtualAccount;
