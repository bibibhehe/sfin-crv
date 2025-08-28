import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomSnackbar = ({ open, handleClose, message, autoHideDuration, typeNotify }) => {
  const renderTitle = () => {
    let result = 'Lỗi';
    try {
      result = typeNotify == 'success' ? 'Thành công' : 'Lỗi';
    } catch (error) {
      //
    }
    return result;
  };
  const renderColor = () => {
    let result = 'red';
    try {
      result = typeNotify == 'success' ? 'green' : 'red';
    } catch (error) {
      //
    }
    return result;
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{ maxWidth: '400px', minWidth: '20%' }}
    >
      <Alert
        onClose={handleClose}
        severity={typeNotify}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderLeft: '7px solid ' + renderColor()
        }}
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <div>
          <strong>{renderTitle()}</strong>
          <div> {message ? message : 'Opps! Something wrong. Please try again'}</div>
        </div>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
