import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PaymentDetail from './PaymentDetail';

import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import CancelOutline from '@mui/icons-material/ClearOutlined';
import MessageRaw from './MessageRaw';

const PaymentModal = (props) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState('1');
  const [isTabMessageRaw, setIsTabMessageRaw] = useState(false);


  const { t } = useTranslation();
  const [dataDetail, setdataDetail] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setdataDetail(props.payment);
  };

  const handleClose = () => {
    setTabIndex('1');
    setdataDetail(null);
    setOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const showSucces = (message) => {
    handleClose();
    props.showAlertSuccess(message);
  };

  const showAlert = (message) => {
    handleClose();
    props.showAlert(message)
  };

  useEffect(() => {
    if (tabIndex === '2') {
      setIsTabMessageRaw(true);
    } else {
      setIsTabMessageRaw(false);
    }
  }, [tabIndex]);

  const transRef = () => {
    try {
      return props.payment.destAccount + ' / TraceNo: ' + props.payment.traceNo;
    } catch (error) {
      //
    }
    return 'No Tittle';
  };

  return (
    <div>
      <Link To="#" style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
        {props.text}
      </Link>
      <Dialog onClose={handleClose} open={open} maxWidth="xl" keepMounted fullWidth={true} style={{ zIndex: 1700 }}>
        <DialogTitle style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', backgroundColor: '#2196f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              {'Đơn hàng: '}
              {transRef()}
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
          <Box>
            <TabContext value={tabIndex}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label={t('common.tabTitle.detail')} value="1" />
                  <Tab label='Luồng bản tin API' value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <PaymentDetail payment={dataDetail} showAlertSuccess={showSucces} showAlert={showAlert} />
              </TabPanel>
              <TabPanel value="2">
                <MessageRaw messageRaw={dataDetail} isActive={isTabMessageRaw} handleClose={handleClose} showAlertSuccess={showSucces} showAlert={showAlert} />
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t('common.button.close')}
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default PaymentModal;
