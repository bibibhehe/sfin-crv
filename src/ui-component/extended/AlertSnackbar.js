import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertSnackbar = ({ open, handleClose, severity, message }) => {
  return (
    // <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
    //   <Alert onClose={handleClose} severity={severity}>
    //     {message}
    //   </Alert>
    // </Snackbar>

    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message == '' ? 'Oops, Somthing wrong !!!' : message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
