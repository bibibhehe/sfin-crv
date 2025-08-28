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
import { FormControl, Select, MenuItem } from '@mui/material';

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

const TblTariff = (props) => {
  const classes = useStyles();
  // const [data, setdata] = useState({});
  const handleChangePage = (event, newPage) => {};
  const handleChangeRowsPerPage = (event) => {};
  const { t } = useTranslation();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [idSelected, setidSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [typeNotify, settypeNotify] = useState('success');

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [addClick, setAddClick] = useState(false);
  const [numberSeleted, setnumberSeleted] = useState(-1);

  const [newItem, setNewItem] = useState({
    valueRangeMin: 0,
    valueRangeMax: 10000000,
    senderInterchangeFee: 0,
    senderInterchangeFeeType: 'A',
    receiverInterchangeFee: 0,
    receiverInterchangeFeeType: 'A',
    senderProcessingFee: 0,
    senderProcessingFeeType: 'A',
    receiverProcessingFee: 0,
    receiverProcessingFeeType: 'A'
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
  const handleEdit = (id, item, idx) => {
    setEditingId(id);
    setEditingData(item);
  };

  const handleSave = () => {
    try {
      feeDeclaration.updateDetailBTO_2_1(editingId, editingData).then(
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
      valueRangeMin: 0,
      valueRangeMax: 1000000,
      senderInterchangeFee: 0,
      senderInterchangeFeeType: 'A',
      receiverInterchangeFee: 0,
      receiverInterchangeFeeType: 'A',
      senderProcessingFee: 0,
      senderProcessingFeeType: 'A',
      receiverProcessingFee: 0,
      receiverProcessingFeeType: 'A'
    });
  };
  const handleAdd = () => {
    try {
      newItem.tariffLadderId = props.id;
      newItem.channel = '-1';
      feeDeclaration.addNewDetailBTO_2_1(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            valueRangeMin: 0,
            valueRangeMax: 1000000,
            senderInterchangeFee: 0,
            senderInterchangeFeeType: 'A',
            receiverInterchangeFee: 0,
            receiverInterchangeFeeType: 'A',
            senderProcessingFee: 0,
            senderProcessingFeeType: 'A',
            receiverProcessingFee: 0,
            receiverProcessingFeeType: 'A'
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
      // console.log(error);
      showAlert('Opps. Something wrong!!!');
    }
  };
  const renderInputField = (name, type = 'text', form = editingData) => {
    if (name.includes('Type')) {
      return (
        <FormControl variant="outlined" fullWidth>
          {/* <InputLabel id={`${name}-label`}>{label}</InputLabel> */}
          <Select
            labelId={`${name}-label`}
            id={name}
            name={name}
            value={form[name]}
            MenuProps={{ PaperProps: { style: { zIndex: 9999 } } }}
            onChange={handleChange}
          >
            <MenuItem value="A">VND</MenuItem>
            <MenuItem value="R">%</MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      return <TextField type={type} name={name} value={form[name]} onChange={handleChange} variant="outlined" fullWidth />;
    }
  };
  const renderInputFieldAdd = (name, type = 'text', form = newItem) => {
    if (name.includes('Type')) {
      return (
        <FormControl variant="outlined" fullWidth>
          <Select
            labelId={`${name}-label`}
            id={name}
            name={name}
            value={newItem[name]}
            MenuProps={{ PaperProps: { style: { zIndex: 9999 } } }}
            onChange={handleChangeAdd}
          >
            <MenuItem value="A">VND</MenuItem>
            <MenuItem value="R">%</MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      return <TextField type={type} name={name} value={newItem[name]} onChange={handleChangeAdd} variant="outlined" fullWidth />;
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
    setidSelected(object.tariffId);
    setIsModalConfirm(true);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handleDeleteBTO01 = (confirmed) => {
    if (confirmed) {
      feeDeclaration.deleteBTO_02_1(idSelected).then(
        (response) => {
          showAlertSuccess('Xóa thành công mã biểu phí');
          props.handleLoadBTO2(props.id);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert('Lỗi', message);
        }
      );
    }
  };
  const headerBTO1 = ['Số tiền từ', 'Số tiền đến', 'Phí CS TCPL', 'Phí CS TCNL', 'Phí DV TCPL', 'Phí DV TCNL', 'Hành động'];
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = props.data;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        const xValue = rowIndex;
        var tableRow = (
          <TableRow key={rowIndex} className={numberSeleted == rowIndex ? classes.evenRow : ''}>
            <TableCell className={'align-middle text-center no-wrap-box '} style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
                <TextField value={editingData.valueRangeMin} type="number" name="valueRangeMin" onChange={handleChange} />
              ) : (
                formatCurency(object.valueRangeMin)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
                <TextField value={editingData.valueRangeMax} name="valueRangeMax" onChange={handleChange} />
              ) : (
                formatCurency(object.valueRangeMax)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
                <>
                  {renderInputField('senderInterchangeFee', 'text', editingData)}
                  {renderInputField('senderInterchangeFeeType', '', editingData)}
                </>
              ) : (
                <>
                  {formatCurency(object.senderInterchangeFee)}
                  {object.senderInterchangeFeeType == 'A' ? ' VND' : ''}
                  {object.senderInterchangeFeeType == 'R' ? ' %' : ''}
                </>
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
                <>
                  {renderInputField('receiverInterchangeFee', 'text', editingData)}
                  {renderInputField('receiverInterchangeFeeType', '', editingData)}
                </>
              ) : (
                <>
                  {formatCurency(object.receiverInterchangeFee)}
                  {object.receiverInterchangeFeeType == 'A' ? ' VND' : ''}
                  {object.receiverInterchangeFeeType == 'R' ? ' %' : ''}
                </>
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
                <>
                  {renderInputField('senderProcessingFee', 'text', editingData)}
                  {renderInputField('senderProcessingFeeType', '', editingData)}
                </>
              ) : (
                <>
                  {formatCurency(object.senderProcessingFee)}
                  {object.senderProcessingFeeType == 'A' ? ' VND' : ''}
                  {object.senderProcessingFeeType == 'R' ? ' %' : ''}
                </>
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
                <>
                  {renderInputField('receiverProcessingFee', 'text', editingData)}
                  {renderInputField('receiverProcessingFeeType', '', editingData)}
                </>
              ) : (
                <>
                  {formatCurency(object.receiverProcessingFee)}
                  {object.receiverProcessingFeeType == 'A' ? ' VND' : ''}
                  {object.receiverProcessingFeeType == 'R' ? ' %' : ''}
                </>
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffId ? (
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
                    <DetailIcon color="primary" className={classes.icons} />
                  </IconButton>
                  <IconButton title="Sửa" onClick={() => handleEdit(object.tariffId, object, xValue)}>
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
          <TableCell>
            <TextField value={newItem.valueRangeMin} type="number" name="valueRangeMin" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell>
            <TextField value={newItem.valueRangeMax} type="number" name="valueRangeMax" onChange={handleChangeAdd} />
          </TableCell>

          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <>
              {renderInputFieldAdd('senderInterchangeFee', 'text')}
              {renderInputFieldAdd('senderInterchangeFeeType', '')}
            </>
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <>
              {renderInputFieldAdd('receiverInterchangeFee', 'text')}
              {renderInputFieldAdd('receiverInterchangeFeeType', '')}
            </>
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <>
              {renderInputFieldAdd('senderProcessingFee', 'text')}
              {renderInputFieldAdd('senderProcessingFeeType', '')}
            </>
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <>
              {renderInputFieldAdd('receiverProcessingFee', 'text')}
              {renderInputFieldAdd('receiverProcessingFeeType', '')}
            </>
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
                  Khai báo phí cho bậc thang: {props.name}
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

export default TblTariff;
