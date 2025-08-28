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
import SelectBoxAuto from 'ui-component/inputs/selectBoxAuto';
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
const ModalContentAction = (props) => {
  const dataDetail = props.actionModal.data;
  const classes = useStyles();
  const [filtersInput, setFiltersInput] = useState(props.actionModal.data);
  const [dataDistrict, setdataDistrict] = useState([]);

  const dataProviceObject = props.dataMerchant
    ? props.dataMerchant.map((item) => {
      return { id: item.id, name: item.name, disabled: false };
    })
    : null;
  const dataProvice = props.dataProvice
    ? props.dataProvice.map((item) => {
      return { id: item.id, name: item.provName, disabled: false };
    })
    : null;

  const dataTctt = props.dataTctt
    ? props.dataTctt.map((item) => {
      return { id: item.id, name: item.bankId, disabled: false };
    })
    : null;

  const get_district = (id) => {
    console.log(props.dataTctt)
    console.log(props.dataProvice)

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
  const handleAddMerchant = (object) => {
    ServiceAPI.addNewMerChant(object).then(
      () => {
        props.showSuccess('Thêm mới thành công');
        handleClose();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        props.showError(message);
      }
    );
  };
  const handleUpdateMerchant = (object) => {
    ServiceAPI.updateMerchant(object).then(
      () => {
        props.showSuccess('Update thành công');
        handleClose();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        props.showError(message);
      }
    );
  };
  const dataDistrictObject = dataDistrict
    ? dataDistrict.map((item) => {
      return { id: item.id, name: item.districtName, disabled: false };
    })
    : null;
  const paymentAcceptanceStatusType = [
    { id: 'READY', name: 'READY', disabled: false },
    { id: 'NO_READY', name: 'NO READY', disabled: false }
  ];
  const formatShow = [
    {
      name: 'mmId',
      label: 'Merchant Master',
      type: 'object',
      object: dataProviceObject,
      required: true,
      show: props.actionModal.type == 'add' ? true : false
    },
    { name: 'name', label: 'Tên Merchant', type: 'text', object: null, required: true, show: true },
    { name: 'merchantCode', label: 'Merchant Code', type: 'text', object: null, required: true, show: true },
    { name: 'provId', label: 'Tỉnh/ Thành Phố', type: 'object', object: dataProvice, required: true, show: true },
    { name: 'districtId', label: 'Quận/ Huyện', type: 'object', object: dataDistrictObject, required: true, show: true },
    { name: 'addressLine', label: 'Địa chỉ', type: 'text', object: null, required: true, show: true },
    { name: 'taxNumber', label: 'Mã số thuế', type: 'text', object: null, required: false, show: true },
    { name: 'dkkd', label: 'Đăng kí kinh doanh', type: 'text', object: null, required: false, show: true },
    { name: 'phoneNumber', label: 'Số điện thoại', type: 'text', object: null, required: false, show: true },
    { name: 'fee', label: 'Phí', type: 'number', object: null, required: true, show: true },
    { name: 'webhook', label: 'URL Call Back', type: 'text', object: null, required: false, show: true },
    { name: 'paymentAcceptanceStatus', label: 'Trạng thái chấp Nhận Thanh Toán', type: 'object', object: paymentAcceptanceStatusType, required: true, show: true },
    { name: 'pspId', label: 'Đơn vị cung cấp dịch vụ thanh toán', type: 'object', object: dataTctt, required: true, show: true },
    { name: 'contactEmail', label: 'Email', type: 'text', object: null, required: false, show: true }
  ];
  const listShowForm = formatShow.filter((item) => item.show);
  const renderInputFieldValue = (field, index) => (
    <Grid key={field.name} item xs={12} md={12}>
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
    if (props.actionModal.type == 'add') {
      handleAddMerchant(filtersInput);
    }
    if (props.actionModal.type == 'edit') {
      handleUpdateMerchant(filtersInput);
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
      } if (name == "mmId") {
        return (
          <SelectBoxAuto
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
    console.log(dataTctt)
    setFiltersInput(props.actionModal.data);
    if (props.actionModal.data.provId) get_district(props.actionModal.data.provId);
  }, [props.actionModal]);
  return (
    <div>
      <Dialog onClose={handleClose} open={props.open} maxWidth="xl" keepMounted fullWidth={false}>
        <DialogTitle style={{ fontSize: '1.3rem', color: 'white', fontWeight: 'bold', backgroundColor: '#2196f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              {props.actionModal.type == 'add' ? 'Thêm Merchant Mới' : 'Sửa Thông Tin Merchant'}
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
                <Box component="fieldset" className={classes.nonBorder} style={{ marginTop: '5vh' }}>
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

export default ModalContentAction;
