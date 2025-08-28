import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTable from 'ui-component/MyTable';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import ParticipantConfigSe from 'services/ParticipantConfig.service';

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
  const [newItem, setNewItem] = useState({
    bic: ' ',
    businessSvcCode: ' ',
    businessSvcType: 'NORMAL',
    tariffPlanId: ' '
  });
  const headerBTO1 = ['STT', 'Thành viên', 'Loại kênh', 'Kênh', 'Biểu phí', 'Hành động'];
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });
  const [DisableSelect, setDisableSelect] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'businessSvcType' && value == 'SPECIAL') {
      setDisableSelect(false);
    } else if (name === 'businessSvcType' && value != 'SPECIAL') {
      setEditingData((prevState) => ({
        ...prevState,
        businessSvcCode: ' '
      }));
      setDisableSelect(true);
    }
    setEditingData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    if (name === 'businessSvcType' && value == 'SPECIAL') {
      setDisableSelect(false);
    } else if (name === 'businessSvcType' && value != 'SPECIAL') {
      newItem['businessSvcCode'] = ' ';
      setDisableSelect(true);
    }
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
      if (editingData && editingData.bic == ' ') {
        showAlert('Hãy điền thông tin của BIC Code');
        return;
      }

      if (editingData && editingData.tariffPlanId == ' ') {
        showAlert('Hãy điền thông tin của Biểu phí');
        return;
      }
      ParticipantConfigSe.updateAssignPart(editingId, editingData).then(
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
      bic: ' ',
      businessSvcCode: ' ',
      businessSvcType: 'NORMAL',
      tariffPlanId: ' '
    });
  };
  const handleClickDetail = (id) => {
    props.handleClick(id);
  };
  const handleAdd = () => {
    try {
      if (newItem && newItem.bic == ' ') {
        showAlert('Hãy điền thông tin của BIC Code');
        return;
      }

      if (newItem && newItem.tariffPlanId == ' ') {
        showAlert('Hãy điền thông tin của Biểu phí');
        return;
      }
      ParticipantConfigSe.addNewAssignPart(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            bic: ' ',
            businessSvcCode: ' ',
            businessSvcType: 'NORMAL',
            tariffPlanId: ' '
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
    setidSelected(object.tariffPlanParticipantId);
    setIsModalConfirm(true);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handleDeleteBTO01 = (confirmed) => {
    if (confirmed) {
      ParticipantConfigSe.deleteAssignPart(idSelected).then(
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
    if (!arrayA) return valueS;

    const foundItem = arrayA.find((item) => item.id === valueS);
    if (foundItem) return foundItem.name;
    else return valueS;
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = props.data.content;
    let pageSize = props.paging.size;
    let pagePage = props.paging.page;

    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className={'align-middle text-center no-wrap-box '}>{pageSize * pagePage + rowIndex}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box '}>
              {editingId === object.tariffPlanParticipantId ? (
                <SelectBox
                  name="bic"
                  fullWidth
                  value={editingData.bic}
                  object={props.listNapasBankSelect}
                  showEm="0"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              ) : (
                convertTypeChange(props.listNapasBankSelect, object.bic)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.tariffPlanParticipantId ? (
                <SelectBox
                  name="businessSvcType"
                  fullWidth
                  value={editingData.businessSvcType}
                  object={props.typebzSrc}
                  showEm="0"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              ) : (
                convertTypeChange(props.typebzSrc, object.businessSvcType)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.tariffPlanParticipantId ? (
                <SelectBox
                  name="businessSvcCode"
                  fullWidth
                  disable={DisableSelect}
                  value={editingData.businessSvcCode}
                  object={listChannel}
                  showEm="1"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              ) : object.businessSvcCode ? (
                convertTypeChange(listChannel, object.businessSvcCode)
              ) : (
                'Tất cả'
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.tariffPlanParticipantId ? (
                <SelectBox
                  name="tariffPlanId"
                  fullWidth
                  value={editingData.tariffPlanId}
                  object={props.typeFee}
                  showEm="0"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              ) : (
                convertTypeChange(props.typeFee, object.tariffPlanId)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editingId === object.tariffPlanParticipantId ? (
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
                  <IconButton title="Sửa" onClick={() => handleEdit(object.tariffPlanParticipantId, object)}>
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
          <TableCell>{pageSize * pagePage + rowIndex + 1}</TableCell>
          <TableCell className={'align-middle text-center no-wrap-box '}>
            <SelectBox
              name="bic"
              fullWidth
              value={newItem['bic']}
              object={props.listNapasBankSelect}
              showEm="0"
              onChange={(event) => {
                handleChangeAdd(event);
              }}
            />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box">
            <SelectBox
              name="businessSvcType"
              fullWidth
              value={newItem['businessSvcType']}
              object={props.typebzSrc}
              showEm="0"
              onChange={(event) => {
                handleChangeAdd(event);
              }}
            />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box">
            <SelectBox
              name="businessSvcCode"
              fullWidth
              disable={DisableSelect}
              value={newItem.businessSvcCode}
              object={listChannel}
              showEm="1"
              onChange={(event) => {
                handleChangeAdd(event);
              }}
            />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box">
            <SelectBox
              fullWidth
              name="tariffPlanId"
              value={newItem['tariffPlanId']}
              object={props.typeFee}
              showEm="0"
              onChange={(event) => {
                handleChangeAdd(event);
              }}
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <MyTable
              headers={headerBTO1}
              totalElements={props.totalElements}
              paging={props.paging}
              buildElementRows={buildElementRows}
              onPageChange={props.onPageChange}
              onRowsPerPageChange={props.onRowsPerPageChange}
              handleAddClick={handleAddClick}
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
