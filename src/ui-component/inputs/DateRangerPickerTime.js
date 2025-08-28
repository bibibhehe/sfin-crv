import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      padding: '11px 14px',
      fontSize: '0.8rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem'
      }
    }
  },
  clearButton: {
    minWidth: '70px',
    fontSize: '0.75rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: '60px',
      fontSize: '0.7rem'
    }
  }
}));

const DateRangerPickerTime = (props) => {
  const [filtersDateRange, setFiltersDateRange] = useState(props.defaultObject);
  const classes = useStyles();

  const handleChangeBegin = (targetName, value) => {
    const newFiltersDateRange = { ...props.defaultObject };
    newFiltersDateRange[targetName] = value;
    setFiltersDateRange(newFiltersDateRange);
    props.setFiltersInput(newFiltersDateRange);
  };

  const handleChangeEnd = (targetName, value) => {
    const newFiltersDateRange = { ...props.defaultObject };
    newFiltersDateRange[targetName] = value;
    setFiltersDateRange(newFiltersDateRange);
    props.setFiltersInput(newFiltersDateRange);
  };

  const handleClear = () => {
    const clearedFiltersDateRange = {
      ...props.defaultObject,
      [props.beginName]: null,
      [props.endName]: null
    };
    setFiltersDateRange(clearedFiltersDateRange);
    props.setFiltersInput(clearedFiltersDateRange);
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      size="small"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            <Button variant="outlined" color="secondary" size="small" onClick={handleClear} className={classes.clearButton}>
              Clear
            </Button>
            {params.InputProps.endAdornment}
          </>
        )
      }}
      className={classes.datePicker}
    />
  );

  return (
    <Box className={classes.datePickerBox} p={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={props.beginLabel}
          minDate={props.minDate}
          maxDate={props.endTo}
          value={filtersDateRange[props.beginName]}
          onChange={(newValue) => handleChangeBegin(props.beginName, newValue)}
          className={classes.datePicker}
          name={props.beginName}
          inputFormat="yyyy/MM/dd HH:mm:ss"
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          componentsProps={{
            actionBar: {
              actions: ['today', 'clear', 'accept']
            },
            actionBarLayout: 'row'
          }}
          renderInput={renderInput}
        />
        <DateTimePicker
          label={props.endLabel}
          minDate={props.beginFrom}
          value={filtersDateRange[props.endName]}
          onChange={(newValue) => handleChangeEnd(props.endName, newValue)}
          className={classes.datePicker}
          name={props.endName}
          inputFormat="yyyy/MM/dd HH:mm:ss"
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          //   componentsProps={{
          //     actionBar: {
          //       actions: ['today', 'clear', 'accept']
          //     },
          //     actionBarLayout: 'row'
          //   }}
          renderInput={renderInput}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangerPickerTime;
