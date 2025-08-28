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
  const [newItem, setNewItem] = useState({
    bic: '',
    accountNumber: '',
    direction: '',
    description: '',
    validFrom: new Date().toISOString().split('T')[0],
    validTo: '',
    feeAmount: null,
    campaignId: ''
  });
  const headerBTO1 = ['STT', 'Ngày quyết toán', 'Mã quyết toán', 'Thời gian bắt đầu', 'Thời gian kết thúc', 'Ngày tạo'];
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
      if (editingData && editingData.accountNumber == '') {
        showAlert('Hãy điền thông tin của "Số tài khoản"');
        return;
      }

      if (editingData && editingData.bic == '') {
        showAlert('Hãy điền thông tin của "bank"');
        return;
      }
      if (editingData && editingData.campaignId == '' && editingData.campaignId != 0) {
        showAlert('Hãy điền thông tin của "Chương trình"');
        return;
      }

      if (editingData && editingData.direction == '') {
        showAlert('Hãy điền thông tin của "Hướng"');
        return;
      }
      if (editingData && editingData.feeAmount == '' && editingData.feeAmount != 0) {
        showAlert('Hãy điền thông tin của "Phí"');
        return;
      }

      if (editingData && editingData.description == '') {
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
      validFrom: new Date().toISOString().split('T')[0],
      validTo: '',
      feeAmount: null,
      campaignId: ''
    });
  };
  const handleClickDetail = (id) => {
    props.handleClick(id);
  };
  const handleAdd = () => {
    try {
      if (newItem && newItem.accountNumber == '') {
        showAlert('Hãy điền thông tin của "Số tài khoản"');
        return;
      }

      if (newItem && newItem.bic == '') {
        showAlert('Hãy điền thông tin của "bank"');
        return;
      }
      if (newItem && newItem.campaignId == '' && newItem.campaignId != '0') {
        showAlert('Hãy điền thông tin của "Chương trình"');
        return;
      }

      if (newItem && newItem.direction == '') {
        showAlert('Hãy điền thông tin của "Hướng"');
        return;
      }
      if (newItem && newItem.feeAmount == '') {
        showAlert('Hãy điền thông tin của "Phí"');
        return;
      }

      if (newItem && newItem.description == '') {
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
            validFrom: new Date().toISOString().split('T')[0],
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
    setidSelected(object.campaignId);
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
    const listElements = props.data.content;

    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className={'align-middle text-center no-wrap-box '}>{props.paging.size * props.paging.page + rowIndex}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>{object.settlementDate}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>{object.settlementCode}</TableCell>

            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>{object.startTime}</TableCell>

            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>{object.finishTime}</TableCell>
            <TableCell className={'align-middle text-center no-wrap-box ' + classes.inputWidth}>{object.creationDate}</TableCell>
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
  useEffect(() => {
    // buildElementRows();
  }, []);
  return (
    <>
      <Grid item xs={12}>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} md={10.7}></Grid>
          <Grid item xs={12} md={1.3}>
            <Button variant="contained" onClick={handleAddClick} startIcon={<AddIcon />}>
              Thêm
            </Button>
          </Grid>
        </Grid> */}
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
