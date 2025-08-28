import { useEffect } from 'react';
// import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { Grid, Container } from '@mui/material';
import CancelOutline from '@mui/icons-material/ClearOutlined';
import { makeStyles } from '@material-ui/core/styles';
import SelectBox from 'ui-component/inputs/selectBox';
import TextField from 'ui-component/inputs/CustomTextField';
import ServiceAPI from 'services/ManagerMerchant/Merchant.service';

const useStyles = makeStyles((theme) => ({
  evenRow: {
    backgroundColor: '#e3f2fd'
  },
  nonBorder: {
    border: 'none',
    paddingBottom: '10px'
  },
  tabTitle: {
    fontStyle: 'italic',
    color: 'gray',
    fontSize: '1.1 rem',
    padding: '10px  0 0 0'
  },
  widthSize: {
    margin: '0'
  }
}));
const ModalContentDetail = (props) => {
  const dataDetail = props.actionModal.data;
  const classes = useStyles();
  const [filtersInput, setFiltersInput] = useState(props.actionModal.data);
  const [dataDistrict, setdataDistrict] = useState([]);

  const dataBankObject = props.dataBank
    ? props.dataBank.map((item) => {
      return { id: item.id, name: item.bankId + '-' + item.bankShortName, disabled: false };
    })
    : null;
    
  const get_district = (id) => {
    ServiceAPI.get_district(id).then(
      (response) => {
        setdataDistrict(response.data);
      },
      (error) => {
        // setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
        // showAlert(message);
      }
    );
  };
  const handleAddBranch = (object) => {
    ServiceAPI.addNewBranch(props.id, object).then(
      (response) => {
        props.showSuccess('Thêm mới thành công');
        handleClose();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        props.showError(message);
      }
    );
  };
  const handleUpdateBranch = (object) => {
    ServiceAPI.updateBranch(object).then(
      (response) => {
        props.showSuccess('Update thành công');
        handleClose();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        props.showError(message);
      }
    );
  };
  const paymentAcceptanceStatusType = [
    { id: 'READY', name: 'READY', disabled: false },
    { id: 'NO_READY', name: 'NO READY', disabled: false }
  ];
  const formatShow = [
    { name: 'name', label: 'Tên Branch', type: 'text', object: null, required: true, show: true },
    { name: 'branchCode', label: 'Branch Code', type: 'text', object: null, required: true, show: props.actionModal.type === 'add'},
    { name: 'mcc', label: 'MCC', type: 'text', object: null, required: true, show: true },
    { name: 'qrName', label: 'Qr Name', type: 'text', object: null, required: false, show: true },
    { name: 'settleBankId', label: 'Ngân hàng thanh toán', type: 'object', object: dataBankObject, required: true, show: true },
    { name: 'creditorAccount', label: 'Tài khoản thanh toán', type: 'text', object: null, required: true, show: true },
    { name: 'paymentAcceptanceStatus', label: 'Trạng thái chấp Nhận Thanh Toán', type: 'object', object: paymentAcceptanceStatusType, required: true, show: true }
  ];
  const listShowForm = formatShow.filter((item) => item.show);
  const renderInputFieldValue = (field, index) => (
    <Grid key={index} item xs={12} md={12}>
      {renderInputField(field.name, field.type, field.object, field.label, field.required, field.show)}
    </Grid>
  );
  const handleClose = () => {
    setdataDistrict([]);
    props.handleClose();
  };
  const renderInputFields = () => {
    const gridItems = [];
    for (let i = 0; i < listShowForm.length; i += 2) {
      const start = i;
      const end = Math.min(i + 2, listShowForm.length);
      const gridItem = (
        <>
          <Grid container spacing={2} key={i}>
            {listShowForm.slice(start, end).map(renderInputFieldValue)}
          </Grid>
          <br />
        </>
      );
      gridItems.push(gridItem);
    }
    return gridItems;
  };
  const validateInputs = (arr1, arr2) => {
    const keys = Object.keys(arr1);
    for (const key of keys) {
      const result = arr2.find((item) => item.name === key);
      if (result) {
        if (!arr1[key] && result.required && result.show) {
          return 'Điền thông tin của ' + result.label;
        }
      }
    }

    return ''; // Trả về chuỗi rỗng nếu không có lỗi nào
  };
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  const onFiltersInputChangeProv = (event) => {
    get_district(event.target.value);
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  const handleSubmit = () => {
    const checkValue = validateInputs(filtersInput, formatShow);
    if (checkValue != '') {
      props.showError(checkValue);
      return;
    }
    if (filtersInput?.branchCode.length > 3) {
      props.showError('Độ dài của trường mã Branch phải nhỏ hơn 3 ký tự');
      return;
    }
    if (props.actionModal.type == 'add') {
      handleAddBranch(filtersInput);
    }
    if (props.actionModal.type == 'edit') {
      handleUpdateBranch(filtersInput);
    }
  };
  const renderInputField = (name, type = 'text', object, label = '', required, show) => {
    if (type == 'object' && show == true) {
      if (name == 'provId') {
        return (
          <SelectBox
            name={name}
            value={filtersInput[name]}
            label={label}
            object={object}
            required={required}
            showEm="0"
            onChange={(event) => {
              onFiltersInputChangeProv(event);
            }}
          />
        );
      } else {
        return (
          <SelectBox
            name={name}
            value={filtersInput[name]}
            label={label}
            object={object}
            required={required}
            showEm="0"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        );
      }
    } else {
      if (show == true) {
        return (
          <TextField
            type={type}
            name={name}
            required={required}
            label={label}
            value={filtersInput[name]}
            onChange={onFiltersInputChange}
            fullWidth
          />
        );
      }
    }
  };

  useEffect(() => {
    setFiltersInput(props.actionModal.data);
    if (props.actionModal.data.provId) get_district(props.actionModal.data.provId);
  }, [props.actionModal]);
  return (
    <div>
      <Dialog onClose={handleClose} open={props.open} maxWidth="xl" keepMounted fullWidth={false}>
        <DialogTitle style={{ fontSize: '1.3rem', color: 'white', fontWeight: 'bold', backgroundColor: '#2196f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              {props.actionModal.type == 'add' ? 'Thêm chi nhánh mới' : 'Sửa thông tin chi nhánh'}
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={handleClose}
                autoFocus
                startIcon={<CancelOutline />}
                style={{ paddingRight: '-0', color: 'white', float: 'right' }}
              ></Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {dataDetail ? (
            <>
              <Container maxWidth="sm">
                <Box component="fieldset" className={classes.nonBorder}>
                  <legend className={classes.tabTitle}></legend>
                  <Grid item xs={12}>
                    {renderInputFields()}
                  </Grid>
                </Box>
              </Container>
            </>
          ) : (
            'Đang tìm kiếm thông tin giao dịch'
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Lưu</Button>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalContentDetail;
