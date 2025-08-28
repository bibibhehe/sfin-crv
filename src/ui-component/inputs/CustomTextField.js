import * as React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(({ theme, sx }) => ({
  '& .MuiInputBase-root': {
    fontFamily: 'IBM Plex Sans, sans-serif', // Đặt font tại đây để đồng bộ
    fontSize: theme.typography.fontSize || '0.875rem',
    backgroundColor: theme.palette.background.paper,
    fontWeight: 400,
    lineHeight: 1.5,
    borderRadius: 8,
    ...sx,
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.light}`
    }
  },
  '& .MuiInputLabel-root': {
    fontSize: theme.typography.fontSize || '0.875rem',
    fontFamily: 'IBM Plex Sans, sans-serif' // Đồng bộ font cho label
  },
  '& .MuiFormHelperText-root': {
    fontSize: theme.typography.fontSize || '0.875rem',
    fontFamily: 'IBM Plex Sans, sans-serif' // Đồng bộ font cho helper text
  }
}));

export default function CustomTextField({
  name,
  label = '',
  value,
  sx,
  onChange,
  fullWidth = false,
  required = false,
  type = 'text',
  multiline = false,
  maxRows = 1,
  helperText = ''
}) {
  return (
    <StyledTextField
      name={name}
      value={value}
      label={label}
      variant="outlined"
      fullWidth={fullWidth}
      type={type}
      required={required}
      onChange={onChange}
      multiline={multiline}
      maxRows={maxRows}
      helperText={helperText}
      size="small"
      sx={sx}
    />
  );
}
