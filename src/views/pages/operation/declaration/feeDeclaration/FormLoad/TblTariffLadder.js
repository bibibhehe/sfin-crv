import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTable from 'ui-component/MyTable';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import feeDeclaration from 'services/Declaration.service';
import DetailIcon from '@mui/icons-material/TouchApp';
import DeleteIcon from '@mui/icons-material/Delete';

// import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import { formatCurency } from 'common/GuiUtils';
import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  icons: {
    cursor: 'pointer'
  },
  input: {
    border: '1px solid #ccc', // Thiết lập border cho Input
    borderRadius: '4px', // Bo góc của Input
    padding: '8px 12px', // Padding bên trong Input
    marginBottom: theme.spacing(2) // Khoảng cách giữa các Input
  },
  evenRow: {
    backgroundColor: '#e3f2fd'
  }
}));

const TblTariffLadder = (props) => {
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {};
  const handleChangeRowsPerPage = (event) => {};
  const { t } = useTranslation();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [idSelected, setidSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [typeNotify, settypeNotify] = useState('success');

  const [numberSeleted, setnumberSeleted] = useState(-1);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [addClick, setAddClick] = useState(false);
  const [newItem, setNewItem] = useState({
    minNumTrans: 10000,
    maxNumTrans: 10000000,
    tariffLadderName: 'Bậc 1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleEdit = (id, item) => {
    setEditingId(id);
    setEditingData(item);
  };

  const handleSave = () => {
    try {
      feeDeclaration.updateDetailBTO_2(editingId, editingData).then(
        (response) => {
          showAlertSuccess('Cập nhâp thành công');
          setEditingId(null);
          setEditingData({});
          props.handleLoadBTO2(props.id);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      showAlert(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };
  const handleAddClick = () => {
    if (addClick) setAddClick(false);
    else setAddClick(true);
  };
  const handleAddUndo = () => {
    setAddClick(false);
    setNewItem({
      minNumTrans: 10000,
      maxNumTrans: 10000000,
      tariffLadderName: 'Bậc 1'
    });
  };
  const handleAdd = () => {
    try {
      newItem.tariffPlanId = props.id;
      feeDeclaration.addNewDetailBTO_2(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            minNumTrans: 10000,
            maxNumTrans: 10000000,
            tariffLadderName: 'Bậc 1'
          });
          props.handleLoadBTO2(props.id);
          setAddClick(false);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      showAlert(error);
    }
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
  const handleConfirm = (object) => {
    setidSelected(object.tariffLadderId);
    setIsModalConfirm(true);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handleClickDetail = (object, id) => {
    props.handleClickRow(object, id);
    // props.setnumberTariffLadderSelected(id);
  };
  const handleDeleteBTO01 = (confirmed) => {
    if (confirmed) {
      feeDeclaration.deleteBTO_02(idSelected).then(
        (response) => {
          showAlertSuccess('Xóa thành công mã biểu phí');
          props.handleLoadBTO2(props.id);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    }
  };
  const headerBTO1 = ['Số lượng giao dịch từ', 'Số lượng giao dịch đến', 'Tên bậc thang', 'Tạo lúc', 'Cập nhật lúc', 'Hành Động'];
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = props.data;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        const xValue = rowIndex;

        var tableRow = (
          <TableRow key={rowIndex} className={props.numberSeleted1 == rowIndex ? classes.evenRow : ''}>
            <TableCell className={'align-middle text-center no-wrap-box '} style={{ textAlign: 'center' }}>
              {editingId === object.tariffLadderId ? (
                <TextField value={editingData.minNumTrans} type="number" name="minNumTrans" onChange={handleChange} />
              ) : (
                formatCurency(object.minNumTrans)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffLadderId ? (
                <TextField value={editingData.maxNumTrans} type="number" name="maxNumTrans" onChange={handleChange} />
              ) : (
                formatCurency(object.maxNumTrans)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffLadderId ? (
                <TextField value={editingData.tariffLadderName} type="text" name="tariffLadderName" onChange={handleChange} />
              ) : (
                formatCurency(object.tariffLadderName)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {object.dateCreated}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {object.dateModified}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffLadderId ? (
                <>
                  <IconButton title="Lưu" onClick={handleSave}>
                    <SaveIcon color="primary" className={classes.icons} />
                  </IconButton>
                  <IconButton title="Thoát" onClick={handleCancel}>
                    <CancelIcon color="primary" className={classes.icons} />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton title="Chọn" onClick={() => handleClickDetail(object, xValue)}>
                    <DetailIcon color="primary" className={classes.icons} />
                  </IconButton>
                  <IconButton title="Sửa" onClick={() => handleEdit(object.tariffLadderId, object)}>
                    <EditIcon color="warning" className={classes.icons} />
                  </IconButton>
                  <IconButton title="Xóa">
                    <DeleteIcon color="error" onClick={() => handleConfirm(object)} className={classes.icons} />
                  </IconButton>
                </>
              )}
            </TableCell>
            <ConfirmationModal
              open={isModalConfirm}
              onClose={handleConfirmClose}
              onConfirm={handleDeleteBTO01}
              id={idSelected}
              textDelete={'Bạn xác nhận muốn xóa không?'}
            />
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }
    if (addClick) {
      var tableAdd = (
        <TableRow>
          <TableCell className={'align-middle text-center no-wrap-box '} style={{ textAlign: 'center' }}>
            <TextField value={newItem.minNumTrans} type="number" name="minNumTrans" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.maxNumTrans} type="number" name="maxNumTrans" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.tariffLadderName} type="text" name="tariffLadderName" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}></TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}></TableCell>
          <TableCell>
            <IconButton title="Thêm" onClick={handleAdd}>
              <SaveIcon color="primary" className={classes.icons} />
            </IconButton>
            <IconButton title="Thoát" onClick={handleAddUndo}>
              <CancelIcon color="primary" className={classes.icons} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
      listTag.push(tableAdd);
    }

    return listTag;
  };
  useEffect(() => {
    // buildElementRows();
  }, []);
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={10.7}>
                <Typography variant="h4" gutterBottom>
                  Bậc thang của biểu phí đang chọn: {props.name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={1.3}>
                {props.id != '' && (
                  <Button variant="contained" onClick={handleAddClick} startIcon={<AddIcon />}>
                    Thêm
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <MyTable
              headers={headerBTO1}
              totalElements={''}
              paging={''}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={buildElementRows}
              disable="0"
            />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TblTariffLadder;
