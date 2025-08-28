import React, { useState } from 'react';
import { Modal, IconButton, Box, Stepper, Step, StepLabel, Button, TextField, Typography } from '@mui/material';
import ServiceAPI from 'services/ManagerMerchant/MerchantMaster.service';
import CloseIcon from '@mui/icons-material/Close';

const steps = ['Password Napas'];

const PasswordChangeModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [passwordNapas, setpasswordNapas] = useState('');
  const [confirmpasswordNapas, setConfirmpasswordNapas] = useState('');
  const [error, setError] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');

  const handleNext = () => {
    if (!passwordNapas.trim()) {
      setError('Vui lòng nhập password');
      return;
    }
    if (!confirmpasswordNapas.trim()) {
      setErrorConfirm('Vui lòng xác nhận password');
      return;
    }
    if (passwordNapas && passwordNapas !== confirmpasswordNapas) {
      setErrorConfirm('Password và phần xác nhận không khớp.');
      return;
    }

    if (props.objectPassChange.id) {
      handleUpdatePass(props.objectPassChange.id, passwordNapas);
    } else {
      props.showError('Không load được thông tin của TCTV. Hãy thử lại!');
      return;
    }
  };
  const handleUpdatePass = (id, passwordNapas) => {
    try {
      ServiceAPI.updateResetPassNapas(id, passwordNapas).then(
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
    setpasswordNapas('');
    setConfirmpasswordNapas('');
    setError('');
    setErrorConfirm('');
    props.onClose()
  };

  const handleChangePasswordNapas = (e) => {
    setpasswordNapas(e);
    setError('')
  };
  const handleChangePasswordNapasConfirm = (e) => {
    setConfirmpasswordNapas(e);
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
          Đổi password Napas đến Bank
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
                value={passwordNapas}
                onChange={(e) => handleChangePasswordNapas(e.target.value)}
                error={!!error}
                helperText={error && activeStep === 0 ? error : ''}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Xác nhận password"
                type="password"
                fullWidth
                value={confirmpasswordNapas}
                onChange={(e) => handleChangePasswordNapasConfirm(e.target.value)}
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
