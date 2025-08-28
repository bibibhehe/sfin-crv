import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import DetailIcon from '@mui/icons-material/Details';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, TextField } from '@mui/material';
import ParticipantConfig from 'services/ParticipantConfig.service';

import ParticipantModify from './ParticipantModify';
import ParticipantSett from './ParticipantSett';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const useStyles = makeStyles({
  icons: {
    cursor: 'pointer'
  }
});
const ParticapantModal = (props) => {
  const classes = useStyles();
  // const handleReloadT = props.handleReloadPage();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setalertType] = useState('success');
  const [message, setMessage] = useState('');
  const [AddEvent, setAddClick] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isAction, setisAction] = useState('add');

  const [participantCodeEdit, setparticipantCodeEdit] = useState('');
  const [loadingButton, setloadingButton] = useState(false);

  const { t } = useTranslation();
  const [dataDetail, setdataDetail] = useState(null);
  const [bankIdSelected, setbankIdSelected] = useState('');

  const [objectGroupPa, setobjectGroupPa] = useState([]);
  const [isTab, setisTab] = useState(1);

  const [filtersInput, setFiltersInput] = useState({
    participantCode: '',
    shortName: '',
    citadCode: '',
    legalName: '',
    legalNameEn: '',
    url: '',
    debitStatus: 'ACTIVE',
    creditStatus: 'ACTIVE',
    incomingStatus: 'ACTIVE',
    outgoingStatus: 'ACTIVE',
    username: '',
    password: '',
    napasUsername: '',
    napasPassword: '',
    rsaScert: '',
    settlementType: 'DIRECT'
  });

  const [textLabel, settextLabel] = useState('');
  const showSuccess = (message) => {
    setOpenAlert(!openAlert);
    setalertType('success');
    setMessage(message);
  };
  const showError = (message) => {
    setOpenAlert(!openAlert);
    setalertType('error');
    setMessage(message);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handlDeleteClick = () => {
    props.handlDeleteClick(props.data.id);
  };
  const handleReload = () => {
    props.handleReloadPage();
  };
  const getInforMationSettSum = (id) => {
    try {
      setloadingButton(true);
      ParticipantConfig.getParticipantSettlement(id).then(
        (response) => {
          setobjectGroupPa([]);
          setbankIdSelected(id);
          setobjectGroupPa(response.data);
          setloadingButton(false);

          setisTab(4);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showError(message);
          setloadingButton(false);
        }
      );
    } catch (error) {
      // console.log(error);
      setloadingButton(false);
      showError('Opps. Something wrong!!!');
    }
  };
  const handleAddSett = () => {
    if (objectGroupPa) {
      setloadingButton(true);
      try {
        ParticipantConfig.addNewParticipantSettlement(objectGroupPa).then(
          (response) => {
            showSuccess('Tạo mới thành công');
            handleReload();
            handleClose();
          },
          (error) => {
            setloadingButton(false);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            showError(message);
            setloadingButton(false);
          }
        );
      } catch (error) {
        setloadingButton(false);
        // console.log(error);
        showError('Opps. Something wrong!!!');
      }
    }
  };

  const handleEditTCTVSet = () => {
    if (bankIdSelected) {
      setloadingButton(true);
      try {
        ParticipantConfig.deleteParticipantSettBankCode(bankIdSelected).then(
          (response) => {
            handleAddSett();
            setloadingButton(false);
          },
          (error) => {
            setloadingButton(false);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            showError(message);
            setloadingButton(false);
          }
        );
      } catch (error) {
        setloadingButton(false);
        // console.log(error);
        showError('Opps. Something wrong!!!');
      }
    }
  };
  const handleAddTCTV = () => {
    setloadingButton(true);
    try {
      ParticipantConfig.addNewParticipant(filtersInput).then(
        (response) => {
          setloadingButton(false);

          showSuccess(response.data.message);
          setbankIdSelected(filtersInput.participantCode);
          setloadingButton(false);
          setisTab(4);
        },
        (error) => {
          setloadingButton(false);

          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showError(message);
          setloadingButton(false);
        }
      );
    } catch (error) {
      // console.log(error);
      setloadingButton(false);
      showError('Opps. Something wrong!!!');
    }
  };
  const handleEditTCTV = () => {
    setloadingButton(true);
    try {
      ParticipantConfig.updateParticipant(props.id, filtersInput).then(
        (response) => {
          setloadingButton(false);
          showSuccess('Cập Nhập Thành Công');
          getInforMationSettSum(filtersInput.participantCode);
          setisTab(4);
        },
        (error) => {
          setloadingButton(false);
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showError(message);
        }
      );
    } catch (error) {
      setloadingButton(false);
      // console.log(error);

      showError('Opps. Something wrong!!!');
    }
  };
  const handleDetailTCTV = () => {
    getInforMationSettSum(filtersInput.participantCode);
  };
  const handleEditTCTVSett = () => {
    try {
      setloadingButton(true);
      ParticipantConfig.updateParticipantSettlement(bankIdSelected, objectGroupPa).then(
        (response) => {
          showSuccess('Cập Nhập Thành Công');
          handleReload();
          handleClose();
        },
        (error) => {
          setloadingButton(false);
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showError(message);
        }
      );
    } catch (error) {
      // console.log(error);
      setloadingButton(false);
      showError('Opps. Something wrong!!!');
    }
  };
  const handleLoadButton = () => {
    if (props.type === 1) {
      return (
        <>
          <Button variant="contained" onClick={handleClickOpenAdd} startIcon={<AddIcon />}>
            Thêm
          </Button>
        </>
      );
    }
    if (props.type == 2) {
      // setFiltersInput(props.data);
      return (
        <>
          <IconButton title="Chi tiết">
            <DetailIcon color="primary" onClick={handleClickOpenDetail} className={classes.icons} />
          </IconButton>
          <IconButton title="Sửa">
            <EditIcon color="primary" onClick={handleClickOpenEdit} className={classes.icons} />
          </IconButton>
          <IconButton title="Xóa" onClick={handlDeleteClick}>
            <DeleteIcon color="error" className={classes.icons} />
          </IconButton>
        </>
      );
    }
  };
  const handleClickOpenDetail = () => {
    setOpen(true);
    setisAction('detail');
    setdataDetail(props.data);
    setFiltersInput(props.data);
    setisTab(2);
    settextLabel('Thông tin chi tiết thành viên');
  };
  const handleClickOpenEdit = () => {
    setOpen(true);
    setisAction('edit');

    // setdataDetail(props.data);
    setparticipantCodeEdit(props.participantCode);
    setFiltersInput(props.data);
    settextLabel('Chỉnh sửa thông tin thành viên');
    setisTab(3);
  };
  const handleClickOpenAdd = () => {
    setOpen(true);
    setisAction('add');

    setFiltersInput({
      participantCode: '',
      shortName: '',
      citadCode: '',
      legalName: '',
      legalNameEn: '',
      url: '',
      debitStatus: 'ACTIVE',
      creditStatus: 'ACTIVE',
      incomingStatus: 'ACTIVE',
      outgoingStatus: 'ACTIVE',
      username: '',
      password: '',
      napasUsername: '',
      napasPassword: '',
      rsaScert: '',
      settlementType: 'DIRECT'
    });
    settextLabel('Thêm thành viên mới');
    setisTab(1);
  };
  const loadingButtonClick = () => {
    setloadingButton(!loadingButton);
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  //   setdataDetail(props.data);
  // };

  const handleClose = () => {
    setOpen(false);
    setobjectGroupPa([]);
    setAddClick(false);
    setloadingButton(false);
    setEditIndex(null);
    setFiltersInput({
      participantCode: '',
      shortName: '',
      citadCode: '',
      legalName: '',
      legalNameEn: '',
      url: '',
      debitStatus: 'ACTIVE',
      creditStatus: 'ACTIVE',
      incomingStatus: 'ACTIVE',
      outgoingStatus: 'ACTIVE',
      username: '',
      password: '',
      napasUsername: '',
      napasPassword: '',
      rsaScert: '',
      settlementType: 'DIRECT'
    });
  };

  useEffect(() => {}, []);
  return (
    <div>
      {handleLoadButton()}
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth="xl"
        sx={{ '& .MuiDialog-container': { '& .MuiPaper-root': { width: '80%', maxHeight: '700px' } } }}
        keepMounted
      >
        <DialogTitle>{textLabel}</DialogTitle>
        <DialogContent>
          <Box>
            {isTab == 1 && (
              <ParticipantModify
                filtersInput={filtersInput}
                setFiltersInput={setFiltersInput}
                handleAddTCTV={handleAddTCTV}
                isTab={isTab}
                loadingButton={loadingButton}
                loadingButtonClick={loadingButtonClick}
              />
            )}
            {isTab == 2 && (
              <ParticipantModify
                filtersInput={filtersInput}
                setFiltersInput={setFiltersInput}
                handleAddClick={handleAddTCTV}
                isTab={isTab}
                handleDetailTCTV={handleDetailTCTV}
                loadingButton={loadingButton}
                loadingButtonClick={loadingButtonClick}
              />
            )}
            {isTab == 3 && (
              <ParticipantModify
                filtersInput={filtersInput}
                setFiltersInput={setFiltersInput}
                handleAddTCTV={handleAddTCTV}
                handleEditTCTV={handleEditTCTV}
                isTab={isTab}
                loadingButton={loadingButton}
                loadingButtonClick={loadingButtonClick}
              />
            )}
            {isTab == 4 && (
              <ParticipantSett
                participantCode={bankIdSelected}
                objectGroupPa={objectGroupPa}
                setobjectGroupPa={setobjectGroupPa}
                showSuccess={showSuccess}
                showError={showError}
                addClick={AddEvent}
                setAddClick={setAddClick}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                handleSubmitSett={handleAddSett}
                handleEditTCTVSett={handleEditTCTVSet}
                isTab={props.type}
                isAction={isAction}
                loadingButton={loadingButton}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t('common.button.close')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType} variant="filled" sx={{ width: '100%' }}>
          {message == '' ? 'Oops, Somthing wrong !!!' : message}
        </Alert>
      </Snackbar>{' '}
    </div>
  );
};

export default ParticapantModal;
