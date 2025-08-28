// project imports
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';
import { Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import DateRangePicker from 'ui-component/inputs/DateRangePicker';
import SelectBox from 'ui-component/inputs/selectBox';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';

const useStyles = makeStyles({
  stickyCell: {
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    zIndex: 1,
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  },
  evenRow: {
    backgroundColor: '#e3f2fd'
  },
  icons: {
    // margin: '0 3px',
    cursor: 'pointer'
  }
});

const SearchForm = (props) => {
  const { t } = useTranslation();
  const typeTransaction = [
    { id: 'REFUND', name: 'Hoàn trả', disabled: false },
    { id: 'VOID_REFUND', name: 'Hủy hoàn trả', disabled: false },
    { id: 'VOID_TRANSFER', name: 'Hủy chuyển tiền', disabled: false },
    { id: 'TRANSFER', name: 'Chuyển tiền', disabled: false }
  ];
  const typeServices = [
    { id: 'IBFT20', name: 'IBFT2.0', disabled: false },
    { id: 'QRPAY', name: 'QRPAY', disabled: true }
  ];
  const typeStatus = [
    { id: 'CREATED', name: 'CREATED', disabled: false },
    { id: 'APPROVED', name: 'APPROVED', disabled: false },
    { id: 'DECLINE', name: 'DECLINE', disabled: false }
  ];
  const initFilterInput = () => ({
    dateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
    dateTo: new Date(),
    settlementDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
    settlementDateTo: new Date(new Date().setDate(new Date().getDate() + 1)),
    transRef: '',
    typeService: ' ',
    transactionType: ' ',
    status: ' '
  });
  const [filtersInput, setFiltersInput] = useState(initFilterInput);
  const handleSync = () => {
    const newfiltersInput = {};
    const arr = ['dateFrom', 'dateTo', 'settlementDateFrom', 'settlementDateTo'];
    for (let key in filtersInput) {
      if (arr.indexOf(key) > -1) {
        newfiltersInput[key] = filtersInput[key].toISOString().split('T')[0];
      } else newfiltersInput[key] = filtersInput[key];
    }
    props.handleSearch1(newfiltersInput);
  };
  const handleDateChange = ({ name, value }) => {
    setFiltersInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  const styleInput = {
    minWidth: '300px',
    margin: 'auto'
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={10}>
            <DateRangePicker
              beginFrom={filtersInput.dateFrom}
              endTo={filtersInput.dateTo}
              onDateChange={handleDateChange}
              beginLabel="Thời gian tạo từ"
              endLabel="Thời gian tạo đến"
              beginName="dateFrom"
              endName="dateTo"
              sx={styleInput}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              component="label"
              onClick={() => handleSync()}
              role={undefined}
              size="large"
              variant="contained"
              tabIndex={-1}
              startIcon={<SearchIcon />}
            >
              {t('common.button.filter')}
            </Button>
          </Grid>

          <Grid item xs={12} md={10}>
            <DateRangePicker
              beginFrom={filtersInput.dateFrom}
              endTo={filtersInput.dateTo}
              onDateChange={handleDateChange}
              beginLabel="Thời gian quyết toán từ"
              endLabel="Thời gian quyết toán đến"
              beginName="settlementDateFrom"
              endName="settlementDateTo"
              sx={styleInput}
            />
          </Grid>
        </Grid>
        <MoreFilterAccordion>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <SelectBox
                  name="typeService"
                  value={filtersInput.typeService}
                  label="Loại dịch vụ"
                  object={typeServices}
                  showEm="1"
                  onChange={onFiltersInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectBox
                  name="transactionType"
                  value={filtersInput.transactionType}
                  label="Loại giao dịch"
                  object={typeTransaction}
                  showEm="1"
                  onChange={onFiltersInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectBox
                  name="status"
                  value={filtersInput.status}
                  label="Trạng thái"
                  object={typeStatus}
                  showEm="1"
                  onChange={onFiltersInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </MoreFilterAccordion>
      </Grid>
    </>
  );
};

export default SearchForm;
