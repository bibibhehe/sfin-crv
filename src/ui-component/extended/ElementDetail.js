import React from 'react';
import { Grid, TextField } from '@mui/material';

const ElementDetail = ({ primary, secondary, md, lg }) => (
  <Grid item md={md} lg={lg}>
    <TextField
      label={primary}
      // value={secondary || undefined}
      value={secondary == null ? ' ' : secondary}
      InputProps={{
        readOnly: true
      }}
      size="small"
      fullWidth
    />
  </Grid>
);

export default ElementDetail;
