import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTable from 'ui-component/tables/TableNnotPaging';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import configFee from 'services/ConfigFee.service';

import DetailIcon from '@mui/icons-material/Details';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, Select, MenuItem } from '@mui/material';

// import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import { formatCurency } from 'common/GuiUtils';
import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import defaultSettings from 'defaultSetting';

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
  }
}));

const TblRptoHeaderLevel1 = (props) => {
  const classes = useStyles();

  const { t } = useTranslation();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [idSelected, setidSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [addClick, setAddClick] = useState(false);
  const [newItem, setNewItem] = useState({
    headerCode: '',
    headerName: '',
    headerOrder: ''
  });
  const headerBTO1 = ['STT', 'Mã tiêu đề', 'Tên tiêu đề', 'Thứ tự', 'Hành động'];
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
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
      configFee.updateConfigFee01(editingId, editingData).then(
        (response) => {
          showAlertSuccess('Cập nhâp thành công');
          setEditingId(null);
          setEditingData({});
          props.onReload();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      // console.log(error);
      showAlert('Opps. Something wrong!!!');
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
      headerCode: '',
      headerName: '',
      headerOrder: ''
    });
  };
  const handleClickDetail = (id) => {
    props.handleClick(id);
  };
  const handleAdd = () => {
    try {
      configFee.addConfigFee01(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            headerCode: '',
            headerName: '',
            headerOrder: ''
          });
          props.onReload(props.id);
          setAddClick(false);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      // console.log(error);
      showAlert('Opps. Something wrong!!!');
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
    setidSelected(object.id);
    setIsModalConfirm(true);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handleDeleteBTO01 = (confirmed) => {
    if (confirmed) {
      configFee.deleteConfigFee01(idSelected).then(
        (response) => {
          showAlertSuccess('Xóa thành công');
          props.onReload();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    }
  };

  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = props.data;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className={'align-middle text-center no-wrap-box '}>{paging.size * paging.page + rowIndex}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box '}>
              {editingId === object.id ? (
                <TextField value={editingData.headerCode} type="text" name="headerCode" onChange={handleChange} />
              ) : (
                object.headerCode
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.id ? (
                <TextField value={editingData.headerName} name="headerName" onChange={handleChange} />
              ) : (
                object.headerName
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.id ? (
                <>
                  <TextField value={editingData.headerOrder} name="headerOrder" onChange={handleChange} />
                </>
              ) : (
                <>{object.headerOrder}</>
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.id ? (
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
                  <IconButton title="Chọn">
                    <DetailIcon color="primary" onClick={() => handleClickDetail(object.id)} className={classes.icons} />
                  </IconButton>
                  <IconButton title="Sửa" onClick={() => handleEdit(object.id, object)}>
                    <EditIcon color="primary" className={classes.icons} />
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
          <TableCell>{paging.size * paging.page + rowIndex + 1}</TableCell>
          <TableCell className={'align-middle text-center no-wrap-box '} style={{ textAlign: 'center' }}>
            <TextField value={newItem.headerCode} type="text" name="headerCode" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.headerName} name="headerName" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.headerOrder} name="headerOrder" onChange={handleChangeAdd} />
          </TableCell>

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
                  Tiêu đề cấp 1
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
              totalElements={pageInfo.totalElements}
              paging={paging}
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

export default TblRptoHeaderLevel1;
