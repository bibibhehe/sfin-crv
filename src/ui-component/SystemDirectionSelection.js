import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SystemDirectionSelection(props) {
  const listNapasBank = [
    'ACH_ACH',
    'ACH_IBFT',
    'IBFT_IBFT',
    'IBFT_ACH',
    'IBFT20_IBFT20',
    'IBFT20_IBFT',
    'IBFT20_ACH',
    'ACH_IBFT20',
    'IBFT_IBFT20'
  ];

  const buildList = () => {
    let jsxTag = [];

    jsxTag.push(
      <MenuItem value="" key="">
        Tất cả
      </MenuItem>
    );

    if (listNapasBank != undefined) {
      for (let i = 0; i < listNapasBank.length; i++) {
        var bank = listNapasBank[i];
        jsxTag.push(
          <MenuItem value={bank} key={i}>
            {bank}
          </MenuItem>
        );
      }
    }

    return jsxTag;
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={props.name}>{props.label}</InputLabel>
      <Select labelId={props.name} name={props.name} value={props.value} label={props.label} onChange={props.onChange} fullWidth>
        {buildList()}
      </Select>
    </FormControl>
  );
}
