import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTable from 'ui-component/MyTable';
import { TableCell, TableRow, Grid, TextField } from '@mui/material';
import ServiceAPI from 'services/ConfigTime/ConfigTimeSession.service';

import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import DeleteIcon from '@mui/icons-material/Delete';

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

const ParticipantTableConfig = (props) => {
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
  const [newItem, setNewItem] = useState({
    fromTime: '00:00:00',
    endTime: '00:00:00',
    modifDate: '',
    creationDate: '',
    settlementCode: 0,
    fromDiffDays: 0,
    endDiffDays: 0
  });
  const headerBTO1 = ['STT', 'Thao tác', 'From Time', 'End Time', 'Settlement Code', 'From Diff Day', 'End Diff Day', 'Created Date'];

  const [paging, setPaging] = useState({});
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
    setAddClick(false);
  };

  const handleSave = () => {
    try {
      if (editingData && isNullOrWhitespace(editingData.settlementCode)) {
        showAlert('Hãy điền thông tin của "Settlement Code"');
        return;
      }

      if (editingData && isNullOrWhitespace(editingData.fromDiffDays)) {
        showAlert('Hãy điền thông tin của "From Diff Day"');
        return;
      }
      if (editingData && isNullOrWhitespace(editingData.endDiffDays)) {
        showAlert('Hãy điền thông tin của "End Diff Day"');
        return;
      }

      if (editingData.fromTime > editingData.endTime) {
        showAlert('Thông tin "From Time" không thể lớn hơn "End Time"');
        return;
      }
      ServiceAPI.updateValue(editingId, editingData).then(
        (response) => {
          showAlertSuccess('Cập nhâp thành công');
          setEditingId(null);
          setEditingData({});
          listAllElements();
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
    setEditingId('');
  };
  const handleAddUndo = () => {
    setAddClick(false);
    setNewItem({
      fromTime: '00:00:00',
      endTime: '00:00:00',
      modifDate: '',
      creationDate: '',
      settlementCode: 0,
      fromDiffDays: 0,
      endDiffDays: 0
    });
  };
  const isNullOrWhitespace = (input) => {
    console.log(input);
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
      if (newItem && isNullOrWhitespace(newItem.settlementCode)) {
        showAlert('Hãy điền thông tin của "Settlement Code"');
        return;
      }

      if (newItem && isNullOrWhitespace(newItem.fromDiffDays)) {
        showAlert('Hãy điền thông tin của "From Diff Day"');
        return;
      }
      if (newItem && isNullOrWhitespace(newItem.endDiffDays)) {
        showAlert('Hãy điền thông tin của "End Diff Day"');
        return;
      }

      if (newItem.fromTime > newItem.endTime) {
        showAlert('Thông tin "From Time" không thể lớn hơn "End Time"');
        return;
      }

      ServiceAPI.addNew(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            fromTime: '00:00:00',
            endTime: '00:00:00',
            modifDate: '',
            creationDate: '',
            settlementCode: 0,
            fromDiffDays: 0,
            endDiffDays: 0
          });
          listAllElements();
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
      ServiceAPI.deleteValue(idSelected).then(
        (response) => {
          showAlertSuccess('Xóa thành công');
          listAllElements();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    }
  };

  const listAllElements = () => {
    ServiceAPI.search_Unit().then(
      (response) => {
        setPageInfo(response.data.content);
        buildElementRows();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showAlert(message);
      }
    );
  };

  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = pageInfo;

    if (listElements != null && listElements.length > 0) {
      if (addClick) {
        var tableAdd = (
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <IconButton title="Thêm" onClick={handleAdd}>
                <SaveIcon color="primary" className={classes.icons} />
              </IconButton>
              <IconButton title="Thoát" onClick={handleAddUndo}>
                <CancelIcon color="primary" className={classes.icons} />
              </IconButton>
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              <TextField
                type="time"
                name="fromTime"
                inputProps={{ step: 1 }}
                value={newItem['fromTime']}
                onChange={handleChangeAdd}
                variant="outlined"
                fullWidth
              />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              <TextField
                type="time"
                name="endTime"
                inputProps={{ step: 1 }}
                value={newItem['endTime']}
                onChange={handleChangeAdd}
                variant="outlined"
                fullWidth
              />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              <TextField
                type="number"
                name="settlementCode"
                value={newItem['settlementCode']}
                onChange={handleChangeAdd}
                variant="outlined"
                fullWidth
              />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              <TextField
                type="number"
                name="fromDiffDays"
                value={newItem['fromDiffDays']}
                onChange={handleChangeAdd}
                variant="outlined"
                fullWidth
              />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              <TextField
                type="number"
                name="endDiffDays"
                value={newItem['endDiffDays']}
                onChange={handleChangeAdd}
                variant="outlined"
                fullWidth
              />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>{newItem['creationDate']}</TableCell>
          </TableRow>
        );
        listTag.push(tableAdd);
      }
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className={'align-middle text-center no-wrap-box '}>{rowIndex}</TableCell>
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
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="time"
                  name="fromTime"
                  value={editingData['fromTime']}
                  inputProps={{ step: 1 }}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.fromTime
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="time"
                  inputProps={{ step: 1 }}
                  name="endTime"
                  value={editingData['endTime']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.endTime
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="number"
                  name="settlementCode"
                  value={editingData['settlementCode']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.settlementCode
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="number"
                  name="fromDiffDays"
                  value={editingData['fromDiffDays']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.fromDiffDays
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {editingId === object.id ? (
                <TextField
                  type="number"
                  name="endDiffDays"
                  value={editingData['endDiffDays']}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              ) : (
                object.endDiffDays
              )}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>
              {/* {editingId === object.id ? (
                <TextField type="text" name="creationDate" disabled value={''} onChange={handleChange} variant="outlined" fullWidth />
              ) : ( */}
              {object.creationDate}
              {/* )} */}
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

    return listTag;
  };
  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
  };
  useEffect(() => {
    listAllElements();
  }, []);
  return (
    <>
      <Grid item xs={12}>
        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} md={10.7}>
            <Button variant="contained" onClick={handleAddClick} startIcon={<AddIcon />}>
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12} md={1.3}></Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <MyTable
              headers={headerBTO1}
              totalElements={pageInfo.totalElements}
              paging={paging}
              buildElementRows={buildElementRows}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
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

export default ParticipantTableConfig;
