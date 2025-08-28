// project imports
import { useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import DateRangePickerTime from 'ui-component/inputs/DateRangerPickerTime';
import SelectBox from 'ui-component/inputs/selectBox';
import TextField from 'ui-component/inputs/CustomTextField';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';
import IosShareOutlined from '@mui/icons-material/IosShareOutlined';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import subDays from 'date-fns/subDays';

const SearchForm = (props) => {
  const { t } = useTranslation();
  const initFilterInput = () => ({
    beginDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
    senderReference: '',
    senderId: '',
    receiverId: '',
    messageIdentifier: ' ',
    transactionReference: '',
  });
  const ListMessageIdentifier = [
    { id: ' ', name: 'Tất cả', disabled: false },
    { id: 'paymentnotification', name: 'Thông báo giao dịch', disabled: false },
    { id: 'reconciliationreport', name: 'Báo cáo đối soát', disabled: false },
    { id: 'apg', name: 'Investigation', disabled: false },
    { id: 'inquiry', name: 'Inquiry', disabled: false },
    { id: 'deposit', name: 'Deposit', disabled: false },
    { id: 'createva', name: 'Tạo tài khoản', disabled: false }
  ];
  const [filtersInput, setFiltersInput] = useState(initFilterInput);
  const handleSync = () => {
    const newfiltersInput = {};
    const arr = ['beginDate', 'endDate'];
    for (let key in filtersInput) {
      if (arr.indexOf(key) > -1) {
        newfiltersInput[key] = format(filtersInput[key], "yyyy-MM-dd'T'HH:mm:ss");
      } else newfiltersInput[key] = filtersInput[key];
    }
    props.handleSearch1(newfiltersInput);
  };
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  const handleExportExcel = () => {
    props.handleExportExcel();
  };
  return (
    <>
      <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12} container>
          <Grid item xs={12} md={9} sm={9}>
            <DateRangePickerTime
              beginFrom={filtersInput.beginDate}
              endTo={filtersInput.endDate}
              defaultObject={filtersInput}
              setFiltersInput={setFiltersInput}
              beginLabel={t('common.element.beginTime')}
              endLabel={t('common.element.endTime')}
              beginName="beginDate"
              endName="endDate"
              sx={{
                width: '100%',
                margin: 'auto'
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} sx={{ margin: 'auto' }}>
            <Button onClick={() => handleSync()} variant="contained" startIcon={<SearchIcon />} style={{ marginRight: '5px' }}>
              {t('common.button.filter')}
            </Button>
            <Button component="label" onClick={() => handleExportExcel()} variant="contained" tabIndex={-1} color="secondary" startIcon={<IosShareOutlined />}>
              Xuất
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <MoreFilterAccordion>
        <Grid item xs={12} md={2}>
          <TextField
            name="senderReference"
            label="Sender Reference"
            fullWidth
            value={filtersInput['senderReference']}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            name="transactionReference"
            label="Đơn hàng"
            fullWidth
            value={filtersInput['transactionReference']}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} md={1.5}>
          <TextField
            name="senderId"
            label="Sender ID"
            fullWidth
            value={filtersInput['senderId']}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} md={1.5}>
          <TextField
            name="receiverId"
            label="Receiver ID"
            fullWidth
            value={filtersInput['receiverId']}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <SelectBox
            name="messageIdentifier"
            value={filtersInput.messageIdentifier}
            label="Message Identifier"
            object={ListMessageIdentifier}
            showEm="0"
            onChange={onFiltersInputChange}
          />
        </Grid>
         <Grid item xs={12} md={2}>
          <SelectBox
            name="messageIdentifier"
            value={filtersInput.messageIdentifier}
            label="Kết quả"
            object={ListMessageIdentifier}
            showEm="0"
            onChange={onFiltersInputChange}
          />
        </Grid>
      </MoreFilterAccordion>
    </>
  );
};

export default SearchForm;

