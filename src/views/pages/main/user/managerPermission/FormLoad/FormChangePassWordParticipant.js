import React, { useState } from 'react';
import { Modal, IconButton, Box, Stepper, Step, StepLabel, Button, TextField, Typography } from '@mui/material';
import ServiceAPI from 'services/ManagerMerchant/MerchantMaster.service';
import CloseIcon from '@mui/icons-material/Close';

const steps = ['Password'];

const PasswordChangeModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [password, setpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');

  const handleNext = () => {
    if (!password.trim()) {
      setError('Vui lòng nhập password');
      return;
    }
    if (!confirmpassword.trim()) {
      setErrorConfirm('Vui lòng xác nhận password');
      return;
    }
    if (password && password !== confirmpassword) {
      setErrorConfirm('Password và phần xác nhận không khớp.');
      return;
    }

    if (props.objectPassChange.id) {
      handleUpdatePass(props.objectPassChange.id, password);
    } else {
      props.showError('Không load được thông tin của TCTV. Hãy thử lại!');
      return;
    }
  };
  const handleUpdatePass = (id, password) => {
    try {
      ServiceAPI.updateResetPassParticipant(id, password).then(
        (response) => { 
          setActiveStep((prevStep) => prevStep + 1);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          props.showError(message);
          return;
        }
      );
    } catch (error) {
      return;
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setpassword('');
    setConfirmpassword('');
    setError('');
    setErrorConfirm('');
    props.onClose()
  };

  const handleChangePassword = (e) => {
    setpassword(e);
    setError('')
  };
  const handleChangePasswordConfirm = (e) => {
    setConfirmpassword(e);
    setErrorConfirm('')
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 4, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', boxShadow: 24, position: 'relative' }}>

        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'red',
            '&:hover': {
              bgcolor: 'rgba(255,0,0,0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
          Đổi password Bank đến Napas
        </Typography>
        {activeStep === steps.length ? (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography>Hoàn tất quá trình đổi Password!</Typography>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              OK
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>

            <>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => handleChangePassword(e.target.value)}
                error={!!error}
                helperText={error && activeStep === 0 ? error : ''}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Xác nhận password"
                type="password"
                fullWidth
                value={confirmpassword}
                onChange={(e) => handleChangePasswordConfirm(e.target.value)}
                error={!!errorConfirm}
                helperText={errorConfirm && activeStep === 0 ? errorConfirm : ''}
                sx={{ mt: 2 }}
              />
            </>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={handleNext}>
                Hoàn tất
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PasswordChangeModal;
