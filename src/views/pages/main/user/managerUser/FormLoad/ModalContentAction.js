import { useEffect } from 'react';
// import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import SelectBoxAuto from 'ui-component/inputs/selectBoxAuto';
import { Grid, Container, FormHelperText } from '@mui/material';
import CancelOutline from '@mui/icons-material/ClearOutlined';
import { makeStyles } from '@material-ui/core/styles';
import TextField from 'ui-component/inputs/CustomTextField';
import SelectBox from 'ui-component/inputs/selectBox';
import ServiceAPI from 'services/ManagerMerchant/MerchantMaster.service';

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
    color: '#2196f3',
    fontSize: '1.1 rem',
    padding: '10px 0 5px 0'
  },
  widthSize: {
    margin: '0'
  }
}));
const ModalContentAction = (props) => {
  const dataDetail = props.actionModal.data;
  const classes = useStyles();
  const [filtersInput, setFiltersInput] = useState(props.actionModal.data);

  const platformObject = props.dataPlatform
    ? props.dataPlatform.map((item) => {
      return { id: item.id, name: item.name, disabled: false };
    })
    : null;

  const handleAddMerchant = (object) => {
    ServiceAPI.addNewMerChant(object).then(
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
  const handleUpdateMerchant = (object) => {
    ServiceAPI.updateMerchant(object).then(
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

  const roleType = [
    { id: 'NAPAS: ', name: 'Có', disabled: false },
    { id: 'PLATFORM_ADMIN', name: 'Có', disabled: false },
    { id: 'STORE_ADMIN', name: 'Có', disabled: false },
    { id: 'STORE_MANAGER', name: 'Có', disabled: false },
    { id: 'STORE_COUNTER', name: 'Có', disabled: false },
  ];

  const stateType = [
    { id: 'ACTIVE', name: 'Đang Hoạt động', disabled: false },
    { id: 'DEACTIVE', name: 'Ngừng hoạt động', disabled: false },
  ];

  const formatShow = [
    { name: 'platformId', label: 'Platform', type: 'object', object: platformObject, required: true, show: props.actionModal.type == 'add' ? true : false },
    { name: 'username', label: 'Tài khoản', type: 'text', object: null, required: true, show: true },
    { name: 'password', label: 'Mật khẩu', type: 'password', object: null, required: true, show: props.actionModal.type == 'add' ? true : false },
    { name: 'role', label: 'Vai trò', type: 'object', object: roleType, required: true, show: false },
    { name: 'firstName', label: 'Tên đệm và tên', type: 'text', object: null, required: true, show: true },
    { name: 'lastName', label: 'Họ', type: 'text', object: null, required: true, show: true },
    { name: 'email', label: 'Email', type: 'email', object: null, required: true, show: true },
    { name: 'phoneNumber', label: 'Số điện thoại', type: 'tel', object: null, required: false, show: true },
    { name: 'state', label: 'Trạng thái', type: 'object', object: stateType, required: true, show: true },
  ];
  const listShowForm = formatShow.filter((item) => item.show);
  const renderInputFieldValue = (field) => (
    <Grid key={field.name} item xs={12} md={12} sx={{ paddingTop: '2px !important' }}>
      {renderInputField(field.name, field.type, field.object, field.label, field.required, field.show, field.helperText, field.content)}
    </Grid>
  );
  const handleClose = () => {
    props.handleClose();
  };
  const renderInputFields = () => {
    const gridItems = [];
    for (let i = 0; i < listShowForm.length; i += 2) {
      const start = i;
      const end = Math.min(i + 2, listShowForm.length);
      const gridItem = (
        <>
          <Grid container spacing={2} key={i} >
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
  const handleSubmit = () => {
    const checkValue = validateInputs(filtersInput, formatShow);
    if (checkValue != '') {
      props.showError(checkValue);
      return;
    }
    const trimmedFiltersInput = trimSpace(filtersInput)
    if (props.actionModal.type == 'add') {
      handleAddMerchant(trimmedFiltersInput);
    }
    if (props.actionModal.type == 'edit') {
      handleUpdateMerchant(trimmedFiltersInput);
    }
  };
  const trimSpace = (filtersInput) => {
    const trimmedFiltersInput = { ...filtersInput };
    const keysToTrim = ['authorizationServer', 'url'];
    keysToTrim.forEach((key) => {
      if (trimmedFiltersInput[key] && typeof trimmedFiltersInput[key] === "string")
        trimmedFiltersInput[key] = trimmedFiltersInput[key].trim();
    })
    return trimmedFiltersInput;
  };
  const renderInputField = (name, type = 'text', object, label = '', required, show, helperText = ' ', content) => {
    if (show == true) {
      if (type === 'fieldset') {
        return (
          <>
            {/* <Box component="fieldset" className={classes.nonBorder}> */}
            <legend className={classes.tabTitle}>{label}</legend>
            <br />
            <Grid container spacing={2}>
              {content.map((field, index) => renderInputFieldValue(field, index))}
            </Grid>
            <hr style={{ backgroundColor: '#2196f3', height: '1px', border: 'none' }} />
            <br />
            {/* </Box> */}
          </>
        );
      }
      if (type == 'object')
        if (name == "platformId") {
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
            <>
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
              <FormHelperText sx={{ margin: '4px 14px 0px' }}>{helperText}</FormHelperText>
            </>
          );
        } else if (name == 'rsaScert') {
          return (
            <TextField
              type={type}
              name={name}
              multiline
              maxRows={12}
              required={required}
              label={label}
              value={filtersInput[name]}
              onChange={onFiltersInputChange}
              fullWidth
              helperText={helperText}
            />
          );
        } else {
        return (
          <TextField
            type={type}
            name={name}
            required={required}
            label={label}
            value={filtersInput[name]}
            onChange={onFiltersInputChange}
            fullWidth
            helperText={helperText}
          />
        );
      }
    }
  }


  useEffect(() => {
    setFiltersInput(props.actionModal.data);
  }, [props.actionModal]);
  return (
    <div>
      <Dialog onClose={handleClose} open={props.open} maxWidth="xl" keepMounted fullWidth={false}>
        <DialogTitle style={{ fontSize: '1.3rem', color: 'white', fontWeight: 'bold', backgroundColor: '#2196f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              {props.actionModal.type == 'add' ? 'Thêm User Mới' : 'Sửa Thông Tin User'}
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={handleClose}
                autoFocus
                startIcon={<CancelOutline />}
                style={{ paddingRight: '-0', color: 'white' }}
              ></Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {dataDetail ? (
            <>
              <Container maxWidth="sm">
                {/* <Box component="fieldset" style={{ marginTop: '5vh' }}>
                  <legend className={classes.tabTitle}></legend> */}
                <Grid item xs={12} style={{ marginTop: '5vh' }}>
                  {renderInputFields()}
                </Grid>
                {/* </Box> */}
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
