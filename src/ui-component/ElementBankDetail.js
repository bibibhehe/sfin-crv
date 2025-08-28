import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useGlobalData } from 'provider/GlobalProvider';

const ElementBankDetail = ({ primary, secondary, md, lg }) => {
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;
  var bank = null;
  try {
    bank = listNapasBank.find((b) => b.bankId === secondary);
  } catch (error) {
    bank = null;
  }
  var bankDisplay;
  if (secondary == null || secondary == undefined) {
    bankDisplay = undefined;
  } else {
    bankDisplay = bank != null ? bank.bankId + ' - ' + bank.bankShortName : secondary;
  }

  return (
    <Grid item md={md} lg={lg}>
      <TextField
        label={primary}
        value={bankDisplay == null ? '123' : bankDisplay}
        InputProps={{
          readOnly: true
        }}
        size="small"
        fullWidth
      />
    </Grid>
  );
};

export default ElementBankDetail;
