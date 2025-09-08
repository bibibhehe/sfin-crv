import React, { useState } from 'react';
import { Modal, Box, Stepper, Step, StepLabel, Button, TextField, Typography } from '@mui/material';
import ServiceAPI from 'services/ManagerMerchant/MerchantMaster.service';

const steps = ['Password Napas', 'Password'];

const PasswordChangeModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [passwordNapas, setpasswordNapas] = useState('');
  const [confirmpasswordNapas, setConfirmpasswordNapas] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (activeStep === 0) {
      if (passwordNapas && passwordNapas !== confirmpasswordNapas) {
        setError('Password Napas và phần xác nhận không khớp.');
        return;
      }
    }
    if (activeStep === 1) {
      if (password && confirmpassword && password !== confirmpassword) {
        setError('Password và xác nhận Password không khớp.');
        return;
      }
      const objecPut = {
        id: props.objectPassChange.id,
        passwordNapas: passwordNapas,
        password: password
      };
      if (props.objectPassChange.id) {
        handleUpdatePass(props.objectPassChange.id, objecPut);
      } else {
        props.showError('Không load được thông tin của TCTV. Hãy thử lại!');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleUpdatePass = (id, filtersInput) => {
    try {
      ServiceAPI.resetPassword(id, filtersInput).then(
        (response) => {},
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
  const handleBack = () => {
    setConfirmpasswordNapas('');
    setConfirmpassword('');
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleClose = () => {
    setActiveStep(0);
    setpasswordNapas('');
    setConfirmpasswordNapas('');
    setpassword('');
    setConfirmpassword('');
    props.onClose();
  };
  const handleReset = () => {
    setActiveStep(0);
    setpasswordNapas('');
    setConfirmpasswordNapas('');
    setpassword('');
    setConfirmpassword('');
    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 4, margin: 'auto', marginTop: '10%', bgcolor: 'background.paper', boxShadow: 24 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography>Hoàn tất quá trình đổi mật khẩu!</Typography>
            <Button onClick={handleReset} sx={{ mt: 2 }}>
              OK
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <>
                <TextField
                  label="Password Napas --> TCTV"
                  type="password"
                  fullWidth
                  value={passwordNapas}
                  onChange={(e) => setpasswordNapas(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Xác nhận Password Napas -->TCTV"
                  type="password"
                  fullWidth
                  value={confirmpasswordNapas}
                  onChange={(e) => setConfirmpasswordNapas(e.target.value)}
                  error={!!error}
                  helperText={error && activeStep === 0 ? error : ''}
                  sx={{ mt: 2 }}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  label="Password TCTV --> Napas"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Xác nhận Password TCTV --> Napas"
                  type="password"
                  fullWidth
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  error={!!error}
                  helperText={error && activeStep === 1 ? error : ''}
                  sx={{ mt: 2 }}
                />
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Quay lại
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PasswordChangeModal;
