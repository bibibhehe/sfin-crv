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
import TouchAppIcon from '@mui/icons-material/TouchApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import defaultSettings from 'defaultSetting';
import ModalContentDetail from './ModalContentDetail';
import ModalContentAction from './ModalContentAction';

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
    padding: '0.2rem'
  },
  rowSelected: {
    backgroundColor: '#b6dfff'
  }
});

const ContentTable = (props) => {
  const classes = useStyles();
  const initObject = () => {
    return {
      mcc: '',
      name: '',
      qrName: '',
      branchCode: '',
      settleBankId: '',
      creditorAccount: '',
      paymentAcceptanceStatus:'READY',
    };
  };
  const [open, setOpen] = useState(false);
  const [typeNotify, settypeNotify] = useState('success');
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [messageError, setmessageError] = useState('');

  const [isOpenModalDetail, setisOpenModalDetail] = useState(false);
  const [isOpenModalAction, setisOpenModalAction] = useState(false);

  const [dataModal, setdataModal] = useState([]);
  const data = props.data;
  const [datSelected, setdatSelected] = useState([]);
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize
  });

  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
    props.onLoad(newPaging);
  };
  const handleLoad = () => {
    props.onLoad(paging);
  };
  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
    props.onLoad(newPaging);
  };

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
    // let list = convertToList(props.getProvice());
    if (object) {
      setactionModal({
        type: 'edit',
        data: object,
        dataProvice: props.getProvice
      });
      setisOpenModalAction(true);
    } else {
      setactionModal({
        type: 'add',
        data: initObject(),
        dataProvice: props.getProvice
      });
      setisOpenModalAction(true);
    }
  };
  const handleCloseModalAction = () => {
    setactionModal((prevState) => ({
      ...prevState,
      data: initObject()
    }));
    props.onLoad(paging);
    setisOpenModalAction(false);
    // props.onLoad();
  };
  const headerBTO1 = [
    { id: 'stt', label: 'STT', minWidth: 50 },
    { id: 'merchant', label: 'Tên Merchant', minWidth: 50 },
    { id: 'branch', label: 'Tên Branch', minWidth: 50 },
    { id: 'mabrach', label: 'Mã Branch', minWidth: 50 },
    { id: 'mcc', label: 'MCC', minWidth: 50 },
    { id: 'dateCreated', label: 'Ngày tạo', minWidth: 50 },
    { id: 'status', label: 'Trạng thái', minWidth: 50 },
    { id: 'paymentAcceptanceStatus', label: 'Trạng thái chấp Nhận Thanh Toán', minWidth: 50 },
    { id: 'action', label: 'Hành động thực hiện', minWidth: 50 }
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
  const handleSelected = (id) => {
    props.handleSelectRow(id);
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
            <TableCell className={classes.rowSelect}>{paging.size * paging.page + rowIndex}</TableCell>
            <TableCell className={classes.rowSelect}>{object.merchantName}</TableCell>
            <TableCell className={classes.rowSelect}>
              <Link
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModalDetail(object);
                }}
              >
                {object.name}
              </Link>
            </TableCell>
            <TableCell className={classes.rowSelect}>{object.branchCode}</TableCell>
            <TableCell className={classes.rowSelect}>{object.mcc}</TableCell>
            <TableCell className={classes.rowSelect}>{object.dateCreated}</TableCell>
            <TableCell className={classes.rowSelect}>{object.status}</TableCell>
            <TableCell className={classes.rowSelect}>{object.paymentAcceptanceStatus}</TableCell>
            <TableCell className={classes.rowSelect}>
              <>
                <IconButton title="Sửa thông tin Merchant" onClick={() => handleOpenModalAction(object)}>
                  <EditIcon color="warning" />
                </IconButton>
                <IconButton title="Xóa thông tin Merchant" onClick={() => handleConfirmStatus(object)}>
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton title="Cashier" onClick={() => handleSelected(object.id)}>
                  <TouchAppIcon color="action" />
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
  useEffect(() => {}, [props.data, paging]);
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
              count={props?.data?.totalElements}
              rowsPerPage={paging.size}
              page={paging.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>

      <MyTable headers={headerBTO1} buildElementRows={buildElementRows} />
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />
      <ModalContentDetail open={isOpenModalDetail} handleClose={handleCloseModalDetail} dataDetail={dataModal} />
      <ModalContentAction
        id={props.id}
        open={isOpenModalAction}
        handleClose={handleCloseModalAction}
        actionModal={actionModal}
        showSuccess={showAlertSuccess}
        onLoad={handleLoad}
        showError={showAlert}
        dataBank={props.dataBank}
      />
      <ConfirmationModal
        open={isModalConfirm}
        onClose={handleConfirmClose}
        onConfirm={handleDelete}
        textDelete={'Bạn xác nhận muốn xóa không?'}
      />
    </>
  );
};

export default ContentTable;
