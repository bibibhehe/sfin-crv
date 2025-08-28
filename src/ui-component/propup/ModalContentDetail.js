import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import CancelOutline from '@mui/icons-material/ClearOutlined';
import ServicesAPI from 'services/PaymentReconciliation/BrowserTransactionsDCBS.service';
import { makeStyles } from '@material-ui/core/styles';
import ListTextBox from 'ui-component/tables/ListTextBox';
import { gridSpacing } from 'store/constant';
import SelectBox from 'ui-component/inputs/selectBox';
import TextField from 'ui-component/inputs/CustomTextField';

const useStyles = makeStyles({
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
    width: '95%',
    margin: 'auto'
  }
});
const ModalContentDetail = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [dataDetail, setdataDetail] = useState(null);
  const [data, setData] = useState(null);
  const [loadingButton, setloadingButton] = useState(false);
  const [isShowAmount, setisShowAmount] = useState(false);
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...newItem };
    const name = event.target.name;
    const value = event.target.value;
    if (name == 'transactionType' && value == 'ADJUSTMENT_RETURN') {
      setisShowAmount(true);
    } else if (name == 'transactionType' && value != 'ADJUSTMENT_RETURN') {
      newFiltersInput['adjustmentAmount'] = '';
      setisShowAmount(false);
    }
    newFiltersInput[name] = value;
    setNewItem(newFiltersInput);
  };
  const [newItem, setNewItem] = useState(initNewItem());

  const handleClickOpen = () => {
    setOpen(true);
    listAllElements();
  };
  const listAllElements = () => {
    try {
      const transef = props.payment.transactionReference;
      newItem['transRef'] = transef;
      if (transef) {
        ServicesAPI.getDetailDCBS(transef).then(
          (response) => {
            setdataDetail(response.data);
            getInformation(response.data);
          },
          (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            props.showAlert(message);
          }
        );
      }
    } catch (error) {
      //
    }
  };

  const handleClose = () => {
    setdataDetail(null);
    setisShowAmount(false);
    setNewItem(initNewItem());
    setOpen(false);
  };

  useEffect(() => {}, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!isShowAmount) {
        newItem['adjustmentAmount'] = '';
      }
      ServicesAPI.addNew(newItem).then(
        (response) => {
          props.showSucces('Tạo mới thành công');
          handleClose();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          props.showAlert(message);
        }
      );
    } catch (error) {
      props.showAlert('Opps. Something wrong!!!');
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ĐCBS
      </Button>
      <Dialog onClose={handleClose} open={open} maxWidth="xl" keepMounted fullWidth={true}>
        <DialogTitle style={{ fontSize: '1.3rem', color: 'white', fontWeight: 'bold', backgroundColor: '#2196f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              {props.tittle}
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
        <DialogContent>{props.buildElementContent}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalContentDetail;
