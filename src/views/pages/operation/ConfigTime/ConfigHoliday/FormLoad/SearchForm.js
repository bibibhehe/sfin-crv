// project imports
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import DateRangePicker from 'ui-component/inputs/DateRangePicker';
import SelectBox from 'ui-component/inputs/selectBox';

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

  const [filtersInput, setFiltersInput] = useState({
    dateFrom: new Date(new Date().setDate(new Date().getDate() - 1)),
    dateTo: new Date(new Date().setDate(new Date().getDate() + 365)),
    dayType: ' '
  });
  const handleSync = () => {
    const newfiltersInput = {};

    const arr = ['dateFrom', 'dateTo'];
    for (let key in filtersInput) {
      if (arr.indexOf(key) > -1) {
        newfiltersInput[key] = filtersInput[key].toISOString().split('T')[0];
      } else newfiltersInput[key] = filtersInput[key];
    }
    props.handleSearch1(newfiltersInput);
  };
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  const handleDateChange = ({ name, value }) => {
    setFiltersInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const styleInput = {
    // minWidth: '290px',
    margin: 'auto'
  };
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <DateRangePicker
              beginFrom={filtersInput.dateFrom}
              endTo={filtersInput.dateTo}
              onDateChange={handleDateChange}
              beginLabel="Thời gian từ"
              endLabel="Thời gian đến"
              beginName="dateFrom"
              endName="dateTo"
              sx={styleInput}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SelectBox
              name="dayType"
              value={filtersInput.dayType}
              label="Loại Ngày"
              object={props.messageTypeSelect}
              showEm="1"
              onChange={onFiltersInputChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForm;
