import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTable from 'ui-component/MyTable';
import { TableCell, TableRow, Grid, TextField } from '@mui/material';
import ServiceAPI from 'services/ConfigFee/SpecialAccount.service';

import DeleteIcon from '@mui/icons-material/Delete';

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
import SelectBox from 'ui-component/inputs/selectBox';
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
  inputWidth: {
    minWidth: '150px'
  }
}));

const ParticapantTable = (props) => {
  const classes = useStyles();
  const listChannel = props.businessSvcCode;
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
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const [newItem, setNewItem] = useState({
    bic: '',
    accountNumber: '',
    direction: '',
    description: '',
    validFrom: getTomorrowDate(),
    validTo: '',
    feeAmount: null,
    campaignId: ''
  });
  const headerBTO1 = ['STT', 'Số tài khoản', 'Bank', 'Chương trình', 'Hướng', 'Phí', 'Hiệu lực từ', 'Hiệu lực đến', 'Mô tả', 'Hành động'];
  const messageTypeSelect = [
    { id: 'FROM', name: 'GỬI', disabled: false },
    { id: 'TO', name: 'NHẬN', disabled: false }
  ];
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });
  const [DisableSelect, setDisableSelect] = useState(false);
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
    setDisableSelect(true);
  };

  const handleSave = () => {
    try {
      if (editingData && isNullOrWhitespace(editingData.accountNumber)) {
        showAlert('Hãy điền thông tin của "Số tài khoản"');
        return;
      }

      if (editingData && isNullOrWhitespace(editingData.bic)) {
        showAlert('Hãy điền thông tin của "bank"');
        return;
      }
      if (editingData && editingData.campaignId == '' && isNullOrWhitespace(editingData.campaignId)) {
        showAlert('Hãy điền thông tin của "Chương trình"');
        return;
      }

      if (editingData && isNullOrWhitespace(editingData.direction)) {
        showAlert('Hãy điền thông tin của "Hướng"');
        return;
      }
      if (editingData && isNullOrWhitespace(editingData.feeAmount)) {
        showAlert('Hãy điền thông tin của "Phí"');
        return;
      }

      if (editingData && isNullOrWhitespace(editingData.validTo)) {
        showAlert('Hãy điền thông tin của "Hiệu lực đến"');
        return;
      }
      if (editingData && isNullOrWhitespace(editingData.feeAmount)) {
        showAlert('Hãy điền thông tin của "Phí"');
        return;
      }
      if (editingData && editingData.validFrom > editingData.validTo) {
        showAlert('Thông tin cấu hình "Hiệu lực từ" nhỏ hơn "Hiệu lực đến"');
        return;
      }
      if (editingData && isNullOrWhitespace(editingData.description)) {
        showAlert('Hãy điền thông tin của "Mô tả"');
        return;
      }
      ServiceAPI.updateValue(editingId, editingData).then(
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
    setDisableSelect(true);
  };
  const handleAddUndo = () => {
    setAddClick(false);
    setNewItem({
      bic: '',
      accountNumber: '',
      direction: '',
      description: '',
      validFrom: getTomorrowDate(),
      validTo: '',
      feeAmount: null,
      campaignId: ''
    });
  };
  const handleClickDetail = (id) => {
    props.handleClick(id);
  };
  const isNullOrWhitespace = (input) => {
    if (input === null || input === '') {
      return true;
    }
    if (typeof input === 'number') {
      return false;
    }
    if (input.trim() === '') {
      return true;
    }
    return false;
  };
  const handleAdd = () => {
    try {
      if (newItem && isNullOrWhitespace(newItem.accountNumber)) {
        showAlert('Hãy điền thông tin của "Số tài khoản"');
        return;
      }

      if (newItem && isNullOrWhitespace(newItem.bic)) {
        showAlert('Hãy điền thông tin của "bank"');
        return;
      }
      if (newItem && newItem.campaignId == '' && isNullOrWhitespace(newItem.campaignId)) {
        showAlert('Hãy điền thông tin của "Chương trình"');
        return;
      }

      if (newItem && isNullOrWhitespace(newItem.direction)) {
        showAlert('Hãy điền thông tin của "Hướng"');
        return;
      }
      if (newItem && isNullOrWhitespace(newItem.feeAmount)) {
        showAlert('Hãy điền thông tin của "Phí"');
        return;
      }

      if (newItem && isNullOrWhitespace(newItem.validTo)) {
        showAlert('Hãy điền thông tin của "Hiệu lực đến"');
        return;
      }
      if (newItem && isNullOrWhitespace(newItem.feeAmount)) {
        showAlert('Hãy điền thông tin của "Phí"');
        return;
      }
      if (newItem && newItem.validFrom > newItem.validTo) {
        showAlert('Thông tin cấu hình "Hiệu lực từ" nhỏ hơn "Hiệu lực đến"');
        return;
      }
      if (newItem && isNullOrWhitespace(newItem.description)) {
        showAlert('Hãy điền thông tin của "Mô tả"');
        return;
      }

      ServiceAPI.addNew(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            bic: '',
            accountNumber: '',
            direction: '',
            description: '',
            validFrom: getTomorrowDate(),
            validTo: '',
            feeAmount: null,
            campaignId: ''
          });
          props.onReload();
          setAddClick(false);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      console.log(error);
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
      ServiceAPI.deleteValue(idSelected).then(
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
  const convertTypeChange = (arrayA, valueS) => {
    try {
      if (!arrayA) return valueS;
      const foundItem = arrayA.find((item) => item.id === valueS);
      if (foundItem) return foundItem.name;
      else return valueS;
    } catch (error) {
      //
    }
    return null;
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
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="text"
                  name="accountNumber"
                  value={editingData['accountNumber']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.accountNumber
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <SelectBox name="bic" value={editingData['bic']} object={props.listNapasBankSelect} showEm="0" onChange={handleChange} />
              ) : (
                convertTypeChange(props.listNapasBankSelect, object.bic)
              )}
            </TableCell>

            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <SelectBox
                  name="campaignId"
                  value={editingData['campaignId']}
                  object={props.listPropgram}
                  showEm="0"
                  onChange={handleChange}
                />
              ) : (
                convertTypeChange(props.listPropgram, object.campaignId)
              )}
            </TableCell>

            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <SelectBox
                  name="direction"
                  value={editingData['direction']}
                  object={messageTypeSelect}
                  showEm="0"
                  onChange={handleChange}
                />
              ) : (
                convertTypeChange(messageTypeSelect, object.direction)
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="number"
                  name="feeAmount"
                  value={editingData['feeAmount']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                formatCurency(object.feeAmount)
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="date"
                  name="validFrom"
                  value={editingData['validFrom']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.validFrom
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField type="date" name="validTo" value={editingData['validTo']} onChange={handleChange} variant="outlined" fullWidth />
              ) : (
                object.validTo
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="text"
                  name="description"
                  value={editingData['description']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.description
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
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
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <TextField
              type="text"
              name="accountNumber"
              value={newItem['accountNumber']}
              onChange={handleChangeAdd}
              variant="outlined"
              fullWidth
            />
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <SelectBox name="bic" value={newItem['bic']} object={props.listNapasBankSelect} showEm="0" onChange={handleChangeAdd} />
          </TableCell>

          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <SelectBox name="campaignId" value={newItem['campaignId']} object={props.listPropgram} showEm="0" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <SelectBox name="direction" value={newItem['direction']} object={messageTypeSelect} showEm="0" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <TextField
              type="number"
              name="feeAmount"
              value={newItem['feeAmount']}
              onChange={handleChangeAdd}
              variant="outlined"
              fullWidth
            />
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <TextField type="date" name="validFrom" value={newItem['validFrom']} onChange={handleChangeAdd} variant="outlined" fullWidth />
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <TextField type="date" name="validTo" value={newItem['validTo']} onChange={handleChangeAdd} variant="outlined" fullWidth />
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
            <TextField
              type="text"
              name="description"
              value={newItem['description']}
              onChange={handleChangeAdd}
              variant="outlined"
              fullWidth
            />
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={10.7}></Grid>
          <Grid item xs={12} md={1.3}>
            <Button variant="contained" onClick={handleAddClick} startIcon={<AddIcon />}>
              Thêm
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <MyTable
              headers={headerBTO1}
              totalElements={props.totalElements}
              paging={props.paging}
              buildElementRows={buildElementRows}
              onPageChange={props.onPageChange}
              onRowsPerPageChange={props.onRowsPerPageChange}
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

export default ParticapantTable;
