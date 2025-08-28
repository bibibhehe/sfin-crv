import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useGlobalData } from 'provider/GlobalProvider';

export default function BankSelection(props) {
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;

  const buildList = () => {
    let jsxTag = [];

    jsxTag.push(
      <MenuItem value=" " key="">
        ALL
      </MenuItem>
    );

    if (listNapasBank != undefined) {
      for (let i = 0; i < listNapasBank.length; i++) {
        var bank = listNapasBank[i];
        jsxTag.push(
          <MenuItem value={bank.bankId} key={bank.bankId}>
            {bank.bankId} - {bank.bankShortName}
          </MenuItem>
        );
      }
    }

    return jsxTag;
  };

  return (
    // <Box sx={{ minWidth: 250 }}>
    <FormControl fullWidth>
      <InputLabel id={props.name}>{props.label}</InputLabel>
      <Select labelId={props.name} name={props.name} value={props.value} label={props.label} onChange={props.onChange} fullWidth>
        {buildList()}
      </Select>
    </FormControl>
    // </Box>
  );
}
