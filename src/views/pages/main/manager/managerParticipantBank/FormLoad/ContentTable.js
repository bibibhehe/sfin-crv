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
import { formatCurency } from 'common/GuiUtils';
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
    border: '1px solid rgba(224, 224, 224, 1);'
  },
  rowSelected: {
    backgroundColor: '#b6dfff'
  }
});

const ContentTable = (props) => {
  const classes = useStyles();
  const initObject = () => {
    return {
      bankId: '',
      bic: '',
      bankShortName: '',
      bankFullNameVi: '',
      bankFullNameEn: '',
    };
  };
  const [open, setOpen] = useState(false);
  const [typeNotify, settypeNotify] = useState('success');
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [messageError, setmessageError] = useState('');

  const [isOpenModalDetail, setisOpenModalDetail] = useState(false);
  const [isOpenModalAction, setisOpenModalAction] = useState(false);

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
  //   const handleCloseModalDetail = () => {
  //     setisOpenModalDetail(false);
  //   };
  const handleOpenModalAction = (object) => {
    // let list = convertToList(props.getProvice());
    if (object) {
      setactionModal({
        type: 'edit',
        data: object
      });
      setisOpenModalAction(true);
    } else {
      setactionModal({
        type: 'add',
        data: initObject()
      });
      setisOpenModalAction(true);
    }
  };
  const handleCloseModalAction = () => {
    setactionModal((prevState) => ({
      ...prevState,
      data: initObject()
    }));
    props.onLoad();
    setisOpenModalAction(false);
    // props.onLoad();
  };
  const headerBTO1 = [
    { id: 'stt', label: 'STT', minWidth: 50 },
    { id: 'bankId', label: 'Bank ID', minWidth: 50 },
    { id: 'bic', label: 'BIC', minWidth: 50 },
    { id: 'bankShortName', label: 'Tên viết tắt', minWidth: 50 },
    { id: 'bankFullNameVi', label: 'Tên đầy đủ', minWidth: 50 },
    { id: 'bankFullNameEn', label: 'Tên đầy đủ ENG', minWidth: 50 },
    { id: 'action', label: 'Hành động', minWidth: 25 },

  ];
  const handleDelete = (value) => {
    if (value === true) {
      props.handleDelete(datSelected);
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
  const handleSelected = (id) => {
    // props.handleSelectRow(id);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const convertTypeChange = (arrayA, valueS) => {
    try {
      if (arrayA == null) return valueS;
      if (!arrayA) return valueS;
      const foundItem = arrayA.find((item) => item.id === valueS);
      if (foundItem) return foundItem.name;
      else return valueS;
    } catch (error) {
      return valueS;
    }
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
            {/* <TableCell className={classes.rowSelect}>{convertTypeChange(props.dataBank, object.bankId)}</TableCell> */}
            <TableCell className={classes.rowSelect}>{object.bankId}</TableCell>
            <TableCell className={classes.rowSelect}>{object.bic}</TableCell>
            <TableCell className={classes.rowSelect}>{object.bankShortName}</TableCell>
            <TableCell className={classes.rowSelect}>{object.bankFullNameVi}</TableCell>
            <TableCell className={classes.rowSelect}>{object.bankFullNameEn}</TableCell>
            <TableCell className={classes.rowSelect}>
              <>
                <IconButton title="Sửa thông tin Merchant" onClick={() => handleOpenModalAction(object)}>
                  <EditIcon color="warning" />
                </IconButton>
                <IconButton title="Xóa thông tin Merchant" onClick={() => handleConfirmStatus(object)}>
                  <DeleteIcon color="error" />
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
  useEffect(() => {}, []);
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
      {/* <ModalContentDetail open={isOpenModalDetail} handleClose={handleCloseModalDetail} dataDetail={dataModal} /> */}
      <ModalContentAction
        open={isOpenModalAction}
        handleClose={handleCloseModalAction}
        actionModal={actionModal}
        showSuccess={showAlertSuccess}
        onLoad={props.onLoad}
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
