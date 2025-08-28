import React from 'react';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  datePickerBox: {
    display: 'flex',
    gap: theme.spacing(2),
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  datePicker: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%'
    },
    '& .MuiInputBase-root': {
      fontSize: '0.8rem',
      height: '3.215rem',

      [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
        height: '3.215rem'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '0.8rem',
        height: '3.215rem'
      },
      '& .css-1jbstoo-MuiInputBase-input-MuiOutlinedInput-input': {
        backgroundColor: 'white'
      },
      '& .css-13md1nk-MuiInputBase-root-MuiOutlinedInput-root': {
        backgroundColor: 'white'
      }
    }
  }
}));
const DateRangePicker = (props) => {1
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [filtersDateRange, setfiltersDateRange] = useState(props.defaultRange);

  const onFiltersTimeChange = (targetName, value) => {
    const newFiltersDateRange = { ...filtersDateRange };

    newFiltersDateRange[targetName] = value.toISOString();
    setfiltersDateRange(newFiltersDateRange);
    props.onChange(newFiltersDateRange);
  };
  return (
    <>
      <Grid item md={6}>
        <DatePicker
          defaultValue={parseISO(props.defaultRange.beginDate)}
          label={props.labelBegin}
          disableFuture
          sx={{ width: '100%' }}
          slotProps={{
            actionBar: { actions: ['today'] }
          }}
          className={classes.datePicker}
          onChange={(newValue) => {
            onFiltersTimeChange('beginDate', newValue);
          }}
        />
      </Grid>
      <Grid item md={6}>
        <DatePicker
          defaultValue={parseISO(props.defaultRange.endDate)}
          label={props.labelEnd}
          // label={t('common.element.beginTime')}
          slotProps={{
            actionBar: { actions: ['today'] }
          }}
          sx={{ width: '100%' }}
          className={classes.datePicker}
          onChange={(newValue) => {
            onFiltersTimeChange('endDate', newValue);
          }}
        />
      </Grid>
    </>
  );
};

export default DateRangePicker;
