// project imports
import { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow, Grid, Link, Button } from '@mui/material';
import MyTable from 'ui-component/tables/MyTableCustom';
import ConfirmationModal from 'ui-component/propup/ConfirmationModal';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import MyTablePaginationCustom from 'ui-component/tables/MyTablePaginationCustomNoSpace';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/LockReset';
import ModalContentDetail from './ModalContentDetail';
import ModalContentAction from './ModalContentAction';
import ChangePassNapasModal from './FormChangePassWordNapas';
import ChangePassParticipantModal from './FormChangePassWordParticipant';

const useStyles = makeStyles({
  stickyCell: {
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    zIndex: 1,
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  },
  evenRow: {
    backgroundColor: '#eef2f6'
  },
  rowSelect: {
    border: '1px solid rgba(224, 224, 224, 1);',
    padding: '0.5rem',
    whiteSpace: 'nowrap'
  },
  rowSelected: {
    backgroundColor: '#b6dfff'
  }
});

const ContentTable = (props) => {
  const classes = useStyles();
  const initObject = () => {
    return {
      name: '',
      mmCode: '',
      viewMerchantPayment: '',
      url: '',
      username: '',
      password: '',
      authorizationServer: '',
      rsaScert: '',
      napasUsername: '',
      napasPassword: '',
      merchantParticipantId: '',
      fee: '',
      merchantBranchType: '',
      outgoingAuthType:'Basic',
      contactEmail:''
    };
  };

  const [open, setOpen] = useState(false);
  const [typeNotify, settypeNotify] = useState('success');
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [messageError, setmessageError] = useState('');

  const [isOpenModalDetail, setisOpenModalDetail] = useState(false);
  const [isOpenModalAction, setisOpenModalAction] = useState(false);

  const [openModalCHangePassNapas, setopenModalCHangePassNapas] = useState(false);
  const [openModalCHangePassParticipant, setopenModalCHangePassParticipant] = useState(false);
  const [objectPassChangeNapas, setobjectPassChangeNapas] = useState();
  const [objectPassChangeParticipant, setobjectPassChangeParticipant] = useState();

  const [dataModal, setdataModal] = useState([]);
  const [datSelected, setdatSelected] = useState([]);

  const [actionModal, setactionModal] = useState({
    type: 'add',
    data: initObject()
  });

  const handleOpenModalDetail = (object) => {
    setdataModal(object);
    setisOpenModalDetail(true);
  };
  const handleCloseModalDetail = () => {
    setisOpenModalDetail(false);
  };
  const handleOpenModalAction = (object) => {
    if (object) {
      setactionModal({
        type: 'edit',
        data: object,
      });
      setisOpenModalAction(true);
    } else {
      setactionModal({
        type: 'add',
        data: initObject(),
      });
      setisOpenModalAction(true);
    }
  };
  const handleCloseModalAction = () => {
    setactionModal((prevState) => ({
      ...prevState,
      data: initObject(),
    }));
    props.onLoad();
    setisOpenModalAction(false);
  };
  const headerBTO1 = [
    { id: 'stt', label: 'STT', minWidth: 50, width: '2rem' },
    { id: 'username', label: 'Họ tên', minWidth: 50 },
    { id: 'role', label: 'Vai trò', minWidth: 50 },
    { id: 'platform', label: 'Platform', minWidth: 50 },
    { id: 'merchant', label: 'Merchant', minWidth: 50 },
    { id: 'store', label: 'Store', minWidth: 50 },
    { id: 'action', label: 'Thao tác', minWidth: 50, width: '9rem'}
  ];
  const handleDelete = (value) => {
    if (value === true) {
      props.handleDeleteMerchant(datSelected);

      setdatSelected([]);
    }
  };

  const handleConfirmStatus = (object) => {
    setdatSelected(object);
    setIsModalConfirm(true);
  };
 const handleOpenChangePassNapas = (object) => {
    setobjectPassChangeNapas(object);
    setopenModalCHangePassNapas(true);
  };
  const handleOpenChangePassParticipant = (object) => {
    setobjectPassChangeParticipant(object);
    setopenModalCHangePassParticipant(true);
  };
   const handleCloseChangePassNapas = () => {
    setopenModalCHangePassNapas(false);
  };
  const handleCloseChangePassParticipant = () => {
    setopenModalCHangePassParticipant(false);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };

  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
  };
  const showAlert = (message) => {
    settypeNotify('error');
    setmessageError(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = props.data.content;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex} className={object.id == props.rowSelected ? classes.rowSelected : rowIndex % 2 ? classes.evenRow : ''}>
            <TableCell className={classes.rowSelect}>{props.paging.size * props.paging.page + rowIndex}</TableCell>
            <TableCell className={classes.rowSelect}>
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModalDetail(object);
                }}
              >
                {object.username}
              </Link>
            </TableCell>
            <TableCell className={classes.rowSelect}>{object.role}</TableCell>
            <TableCell className={classes.rowSelect}>{object.platform}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchant}</TableCell>
            <TableCell className={classes.rowSelect}>{object.store}</TableCell>
            <TableCell className={classes.rowSelect}>
              <>
                <IconButton title="Sửa thông tin Merchant" onClick={() => handleOpenModalAction(object)}>
                  <EditIcon color="warning" />
                </IconButton>
                <IconButton title="Xóa thông tin Merchant" onClick={() => handleConfirmStatus(object)}>
                  <DeleteIcon color="error" />
                </IconButton>
                {/* <IconButton title="Change password" onClick={() => handleOpenChangePass(object)}>
                  <LockIcon color="action" />
                </IconButton> */}
                 <IconButton title="Change password Napas --> Bank">
                  <LockIcon color="secondary" onClick={() => handleOpenChangePassNapas(object)} />
                </IconButton>
                <IconButton title="Change password Bank --> Napas">
                  <LockIcon color="success" onClick={() => handleOpenChangePassParticipant(object)} />
                </IconButton>
              </>
            </TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  useEffect(() => { }, []);
  return (
    <>
      <Grid item xs={12} style={{ marginBottom: '5px' }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} md={2} container justifyContent="flex-begin">
            <Button
              color="success"
              fontSize="medium"
              variant="contained"
              startIcon={<AddIcon />}
              style={{ color: 'white' }}
              onClick={() => handleOpenModalAction()}
            >
              Thêm mới
            </Button>
          </Grid>
          <Grid item xs={12} md={10} container justifyContent="flex-end">
            <MyTablePaginationCustom
              style={{ float: 'right' }}
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={props.totalElements}
              rowsPerPage={props.paging.size}
              page={props.paging.page}
              onPageChange={props.onPageChange}
              onRowsPerPageChange={props.onRowsPerPageChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <MyTable headers={headerBTO1} buildElementRows={buildElementRows} />
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />
      <ModalContentDetail open={isOpenModalDetail} handleClose={handleCloseModalDetail} dataDetail={dataModal} />
      <ModalContentAction
        open={isOpenModalAction}
        handleClose={handleCloseModalAction}
        actionModal={actionModal}
        showSuccess={showAlertSuccess}
        onLoad={props.onLoad}
        showError={showAlert}
        dataMerchant={props.dataMerchant}
        dataBank={props.dataBank}
      />
      <ConfirmationModal
        open={isModalConfirm}
        onClose={handleConfirmClose}
        onConfirm={handleDelete}
        textDelete={'Bạn xác nhận muốn xóa không?'}
      />
       <ChangePassNapasModal
        open={openModalCHangePassNapas}
        onClose={handleCloseChangePassNapas}
        objectPassChange={objectPassChangeNapas}
        showError={showAlert}
      />
       <ChangePassParticipantModal
        open={openModalCHangePassParticipant}
        onClose={handleCloseChangePassParticipant}
        objectPassChange={objectPassChangeParticipant}
        showError={showAlert}
      />
    </>
  );
};

export default ContentTable;
