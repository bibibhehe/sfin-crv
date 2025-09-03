import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText, Button } from '@mui/material';
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
     '& .MuiInputBase-root': {
    fontFamily: 'IBM Plex Sans, sans-serif', // Đặt font tại đây để đồng bộ
    fontSize: theme.typography.fontSize || '0.875rem',
    backgroundColor: theme.palette.background.paper,
    fontWeight: 400,
    lineHeight: 1.5,
    borderRadius: 8,
    },
    '& .MuiInputLabel-root': {
      // backgroundColor: 'white',
      transform: 'translate(14px, 10px) scale(1)', // hoặc tuỳ chỉnh phù hợp
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)' // vị trí khi label nhỏ lại
      }
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white'
    }
  },
  closeButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    backgroundColor: 'white',
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
  }
}));

export default function SelectMutilTransferList(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState(props.value);
  const [open, setOpen] = useState(false);

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();

    if (key.match(/^[a-z0-9]$/)) {
      const match = props.object.find((item) => item.name.toLowerCase().startsWith(key));
      if (match) {
        handleChange({ target: { value: match.id } });
      }
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.indexOf(" ") > -1) {
      value = [" "];
    }
    setSelected(value);
    props.onChange({ target: { name: props.name, value: value } });
  };

  const handleClose = () => {
    setOpen(false); // Đặt trạng thái mở dropdown thành false để đóng dropdown
  };

  const buildList = (listNapasBank, type) => {
    let jsxTag = [];
    if (Array.isArray(listNapasBank)) {
      if (type === '1') {
        jsxTag.push(
          <MenuItem value=" " name=" " disabled={props.disable} key="all">
            <Checkbox checked={selected.indexOf(" ") > -1} disabled={props.disable} />
            <ListItemText primary="Tất cả" />
          </MenuItem>
        );
      }

      for (let i = 0; i < listNapasBank.length; i++) {
        const bank = listNapasBank[i];
        jsxTag.push(
          <MenuItem value={bank.id} key={bank.id} name={bank.id} disabled={bank.disabled}>
            <Checkbox checked={selected.indexOf(bank.id) > -1} disabled={bank.disabled} />
            <ListItemText primary={bank.name} />
          </MenuItem>
        );
      }
    }

    // Add close button at the end
    jsxTag.push(
      <div className={classes.closeButtonContainer} key="close-button">
        <Button onClick={handleClose} variant="contained">Đóng</Button>
      </div>
    );

    return jsxTag;
  };

  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel id={props.name}>{props.label}</InputLabel>
      <Select
        labelId={props.name}
        name={props.name}
        value={selected}
        label={props.label}
        size="small"
        disabled={props.disable === true}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClose={() => setOpen(false)}
        open={open}
        onOpen={() => setOpen(true)}
        sx={{ backgroundColor: 'white', ...props.sx }}
        className={classes.rowEdited}
        fullWidth
        multiple
        renderValue={(selected) => {
          if (selected.includes(" ")) return "Tất cả";
          return selected.map(value => props.object.find(bank => bank.id === value)?.name).join(', ')
        }}
      >
        {buildList(props.object, props.showEm)}
      </Select>
    </FormControl>
  );
}
