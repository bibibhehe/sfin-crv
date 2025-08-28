import React from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ConfirmationModal({ open, onClose, onConfirm, id, textDelete }) {
  const handleDeleteConfirm = () => {
    onConfirm(true);
    onClose(false);
  };

  const handleDeleteCancel = () => {
    onConfirm(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Thông báo'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{textDelete}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Hủy</Button>
          <Button onClick={handleDeleteConfirm}>Xác Nhận</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmationModal;
