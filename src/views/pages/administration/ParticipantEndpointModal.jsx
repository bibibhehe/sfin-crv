import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import ParticipantEndpointDetail from './ParticipantEndpointDetail';
import ServiceAlert from 'common/ServiceAlert';
import ParticipantEndpointService from 'services/ParticipantEndpoint.service';
import { CircularProgress } from '@mui/material';

const ParticipantEndpointModal = (props) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const [participant, setParticipant] = useState(null);

  const getDetail = () => {
    ParticipantEndpointService.get(props.id).then(
      (response) => {
        setIsLoading(false);
        setParticipant(response.data);
      },
      (error) => {
        setIsLoading(false);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
      }
    );
  };

  useEffect(() => {
    if (open && props.action === 'edit') getDetail();
    if (open && props.action === 'add')
      setParticipant({
        participantId: '',
        url: '',
        rsaEcert: '',
        rsaScert: '',
        instructingStatus: '',
        instructedStatus: ''
      });
  }, [open]);

  const onInputChange = (targetName, targetValue) => {
    const newParticipant = { ...participant };
    newParticipant[targetName] = targetValue;
    setParticipant(newParticipant);
  };

  const handleClickOpen = () => {
    setIsLoading(true);
    setOpen(true);
  };

  const handleClickAdd = () => {
    setIsLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (props.action === 'edit') doEditElement();
    else doAddElement();

    setOpen(false);
  };

  const doEditElement = () => {
    ParticipantEndpointService.put(participant).then(
      (response) => {
        ServiceAlert.success('Thông báo', 'Cập nhật thành công');
        props.reloadParent();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
      }
    );
  };

  const doAddElement = () => {
    ParticipantEndpointService.post(participant).then(
      (response) => {
        ServiceAlert.success('Thông báo', 'Tạo mới thành công');
        props.reloadParent();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
      }
    );
  };

  return (
    <div>
      {props.action === 'edit' ? (
        <Button onClick={handleClickOpen} variant="outlined">
          <MoreHorizOutlinedIcon />
        </Button>
      ) : (
        <Button onClick={handleClickAdd} variant="contained" size="large" style={{ height: '100%' }} startIcon={<AddIcon />}>
          {t('common.button.add')}
        </Button>
      )}

      <Dialog onClose={handleClose} open={open} maxWidth="md" keepMounted fullWidth={true} style={{ zIndex: 1700 }}>
        <DialogTitle>{t('main.participantEndpoint.detailDialogTitle')}</DialogTitle>
        <DialogContent style={{ paddingTop: '10px' }}>
          <Box>
            {isLoading ? <CircularProgress /> : <ParticipantEndpointDetail participant={participant} onInputChange={onInputChange} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>{t('common.button.save')}</Button>
          <Button autoFocus onClick={handleClose}>
            {t('common.button.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParticipantEndpointModal;
