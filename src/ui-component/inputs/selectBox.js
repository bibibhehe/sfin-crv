import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowEdited: {
    backgroundColor: 'white'
  },
  rowEdit: {
    width: '100%',
    backgroundColor: 'white',
    '& .MuiInputBase-root': {
      fontSize: '0.8rem',
      backgroundColor: 'white',
      '& .css-1g5eul8-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
        backgroundColor: 'white'
      },
      '& .css-13md1nk-MuiInputBase-root-MuiOutlinedInput-root': {
        backgroundColor: 'white'
      },
      '& fieldset': {
        backgroundColor: 'white'
      }
    }
  },
  formControl: {
    backgroundColor: 'white',
    '& .MuiInputLabel-root': {
      backgroundColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white'
    }
  }
}));

export default function SelectBox(props) {
  const classes = useStyles();

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();

    if (key.match(/^[a-z0-9]$/)) {
      const match = props.object.find((item) => item.name.toLowerCase().startsWith(key));
      if (match) {
        props.onChange({ target: { name: props.name, value: match.id } });
      }
    }
  };

  const buildList = (listNapasBank, type) => {
    let jsxTag = [];
    if (Array.isArray(listNapasBank)) {
      if (type === '1') {
        jsxTag.push(
          <MenuItem value=" " name=" " disabled={props.disable} key="all">
            Tất cả
          </MenuItem>
        );
      }

      for (let i = 0; i < listNapasBank.length; i++) {
        const bank = listNapasBank[i];
        jsxTag.push(
          <MenuItem value={bank.id} key={bank.id} name={bank.id} disabled={bank.disabled}>
            {bank.name}
          </MenuItem>
        );
      }
    }

    return jsxTag;
  };

  return (
    <FormControl fullWidth required={props.required} className={classes.formControl}>
      <InputLabel id={props.name}>{props.label}</InputLabel>
      <Select
        labelId={props.name}
        name={props.name}
        value={props.value}
        label={props.label}
        size="small"
        disabled={props.disable === true}
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
        sx={{ backgroundColor: 'white', ...props.sx }}
        className={classes.rowEdited}
        fullWidth
      >
        {buildList(props.object, props.showEm)}
      </Select>
    </FormControl>
  );
}
