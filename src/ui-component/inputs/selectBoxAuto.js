import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  autoCompleteContainer: {
    width: '100%',
    backgroundColor: 'white'
  },
  textField: {}
}));

export default function CustomAutocomplete(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  // Hàm xử lý thay đổi lựa chọn
  const handleChange = (event, newValue) => {
    if (newValue) {
      props.onChange({ target: { name: props.name, value: newValue.id } });
    } else {
      props.onChange({ target: { name: props.name, value: ' ' } });
    }
  };

  const buildShow = (object) => {
    if (object) {
      let pushList = [...object];
      if (props.showEm === '1') {
        pushList.unshift({ id: ' ', name: 'Tất cả', disabled: false }); // Add "Tất cả" to the beginning
      }
      return pushList;
    }
    return null;
  };
  return (
    <Box className={classes.autoCompleteContainer}>
      <Autocomplete
      options={buildShow(props.object)}
      value={props.value === '' ? null : props.object.find(item => item.id === props.value) || null}
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        inputValue={inputValue}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant="outlined"
            size="small"
            className={classes.textField}
            placeholder="Tìm kiếm..."
          />
        )}
        noOptionsText="Không có kết quả"
      />
    </Box>
  );
}
