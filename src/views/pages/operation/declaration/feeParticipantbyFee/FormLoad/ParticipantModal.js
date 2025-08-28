import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import ParticipantDetail from './ParticipantDetail';
import ParticipantAdd from './ParticipantAdd';
import ParticipantEdit from './ParticipantEdit';
import ParticipantConfigSe from 'services/AssignParticipant/AssignParticipantByFee.service';

const useStyles = makeStyles({
  modalSetValue: {
    // maxWidth: '60%'
  }
});

const ParticipantModal = (props) => {
  const classes = useStyles();
  const open = props.OpenModal;
  const TypeAction = props.TypeAction;
  const showError = (message) => {
    props.showError(message);
  };
  const showSuccess = (message) => {
    props.showAlertSuccess(message);
  };

  const { t } = useTranslation();
  const handleClose = () => {
    setdataAction(null);
    props.handleCloseModal();
  };
  const [isAction, setisAction] = useState(false);
  const [dataAction, setdataAction] = useState(null);

  const handleChangeDataAction = (object) => {
    setdataAction(object);
  };
  const handleAddAction = () => {
    if (dataAction) {
      setisAction(true);
      try {
        ParticipantConfigSe.addNewAssignPart(dataAction).then(
          (response) => {
            setisAction(false);
            showSuccess('Tạo mới thành công');

            handleClose();
            props.onReload();
          },
          (error) => {
            setisAction(false);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            showError(message);
          }
        );
      } catch (error) {
        setisAction(false);
        // console.log(error);
        showError('Opps. Something wrong!!!');
      }
    }
  };
  const handleEditAction = () => {
    if (dataAction) {
      setisAction(true);
      try {
        ParticipantConfigSe.updateAssignPart(dataAction).then(
          (response) => {
            setisAction(false);
            showSuccess('Sửa thành công');
            handleClose();
            props.onReload();
          },
          (error) => {
            setisAction(false);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            showError(message);
          }
        );
      } catch (error) {
        setisAction(false);
        // console.log(error);
        showError('Opps. Something wrong!!!');
      }
    }
  };
  const renderButtonAction = () => {
    switch (TypeAction) {
      case 2:
        if (isAction) {
          return (
            <Button variant="contained" disable>
              Loading ...
            </Button>
          );
        }
        return (
          <Button variant="contained" onClick={() => handleAddAction()}>
            Thêm mới
          </Button>
        );
      case 3:
        if (isAction) {
          return (
            <Button variant="contained" disable>
              Loading ...
            </Button>
          );
        }
        return (
          <Button variant="contained" onClick={() => handleEditAction()}>
            Sửa
          </Button>
        );
      default:
        break;
    }
  };
  const renderAction = () => {
    switch (TypeAction) {
      case 1:
        return (
          <ParticipantDetail
            data={props.data}
            typeFee={props.typeFee}
            typebzSrc={props.typebzSrc}
            typeChannelId={props.typeChannelId}
            typeBank={props.typeBank}
          />
        );
      case 2:
        return (
          <ParticipantAdd
            data={props.data}
            typeFee={props.typeFee}
            typebzSrc={props.typebzSrc}
            typeChannelId={props.typeChannelId}
            typeBank={props.typeBank}
            handleChangeDataAction={handleChangeDataAction}
          />
        );
      case 3:
        return (
          <ParticipantEdit
            data={props.data}
            typeFee={props.typeFee}
            typebzSrc={props.typebzSrc}
            typeChannelId={props.typeChannelId}
            typeBank={props.typeBank}
            handleChangeDataAction={handleChangeDataAction}
          />
        );
      default:
        break;
    }
  };
  useEffect(() => {}, []);

  return (
    <div>
      <Dialog onClose={handleClose} open={open} maxWidth="lg" keepMounted fullWidth={true} className={classes.modalSetValue}>
        <DialogTitle>{props.TittleModal}</DialogTitle>
        <DialogContent>
          <Box>{renderAction()}</Box>
        </DialogContent>
        <DialogActions>
          {renderButtonAction()}
          <Button autoFocus onClick={handleClose}>
            {t('common.button.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParticipantModal;
