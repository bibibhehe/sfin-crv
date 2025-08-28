import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

const CheckboxYesNo = ({ question, name, onChange, check }) => {
  const handleCheckboxChange = (event) => {
    // onChange(name, event.target.checked);
    onChange({ target: { name: name, value: event.target.checked == true ? true : false } });
  };

  return (
    <div>
      {/* <Typography variant="h6">{question}</Typography> */}
      <FormControlLabel control={<Checkbox checked={check} onChange={handleCheckboxChange} />} label={question} />
    </div>
  );
};

export default CheckboxYesNo;
