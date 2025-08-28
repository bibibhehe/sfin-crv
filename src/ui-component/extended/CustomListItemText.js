import React from 'react';
import ListItemText from '@mui/material/ListItemText';

const CustomListItemText = ({ primary, secondary }) => (
  <ListItemText
    primary={primary}
    secondary={secondary || <br />}
  />
);

export default CustomListItemText;