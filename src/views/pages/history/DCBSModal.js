import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PaymentDetail from './PaymentDetail';
import MessageInputDetail from './MessageInputDetail2';
import MessageOutputBoard from './MessageOutputBoard';
import IsoMessage from './MessageIsoMes';
import PayUpdateMessage from './MessagePaymentUpdate';
import MessagesRefund from './MessagesRefund';
import Link from '@mui/material/Link';

const DCBSModal = (props) => {
  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const [dataDetail, setdataDetail] = useState(null);
  const getIdInputComing = () => {
    // console.log(props);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setdataDetail(props.payment);
  };

  const handleClose = () => {
    setdataDetail(null);
    setOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (tabIndex === '2') {
      setIsTabIsoMessage(true);
    } else {
      setIsTabIsoMessage(false);
    }
    if (tabIndex == '3') {
      setIsTabMessagePayUpdate(true);
    } else {
      setIsTabMessagePayUpdate(false);
    }

    if (tabIndex == '4') {
      setIsTabMessagesRefund(true);
    } else {
      setIsTabMessagesRefund(false);
    }
    if (tabIndex == '5') {
      setIsTabMessageInput(true);
    } else {
      setIsTabMessageInput(false);
    }
    if (tabIndex == '6') {
      setIsTabMessageOutput(true);
    } else {
      setIsTabMessageOutput(false);
    }
  }, [tabIndex]);
  const transRef = props.payment.transactionReference == null ? props.payment.originTransRef : props.payment.transactionReference;

  return (
    <div>
      <Link To="#" style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
        {props.text}
      </Link>
      {/* <Button onClick={handleClickOpen} variant="outlined">
        <MoreHorizOutlinedIcon />
      </Button> */}
      <Dialog onClose={handleClose} open={open} maxWidth="xl" keepMounted fullWidth={true} style={{ zIndex: 1700 }}>
        <DialogTitle>
          {props.payment.transactionReference != null
            ? t('main.payment.detailDialogTitle') + ' TransRef: '
            : t('main.payment.detailDialogTitleRefun') + ' Original TransRef: '}
          {transRef}
        </DialogTitle>
        <DialogContent>
          <Box>
            <TabContext value={tabIndex}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab}>
                  <Tab label={t('common.tabTitle.detail')} value="1" />
                  <Tab label={t('common.tabTitle.isoMessage')} value="2" />
                  <Tab label={t('common.tabTitle.PayUpdateMessage')} value="3" />
                  <Tab label={t('common.tabTitle.refundMessage')} value="4" />
                  <Tab label="MX Message" value="5" />
                  {/* <Tab label={t('common.tabTitle.outputMessage')} value="6" /> */}
                </TabList>
              </Box>
              <TabPanel value="1">
                <PaymentDetail payment={dataDetail} />
              </TabPanel>
              <TabPanel value="2">
                <IsoMessage
                  isActive={isTabIsoMessage}
                  inputMessageId={
                    props.payment.transactionReference == null ? props.payment.originTransRef : props.payment.transactionReference
                  }
                />
              </TabPanel>
              <TabPanel value="3">
                <PayUpdateMessage
                  isActive={isTabMessagePayUpdate}
                  inputMessageId={
                    props.payment.transactionReference == null ? props.payment.originTransRef : props.payment.transactionReference
                  }
                />
              </TabPanel>
              <TabPanel value="4">
                <MessagesRefund
                  isActive={isTabMessagesRefund}
                  inputMessageId={
                    props.payment.transactionReference == null ? props.payment.originTransRef : props.payment.transactionReference
                  }
                />
              </TabPanel>

              <TabPanel value="5">
                <MessageInputDetail
                  isActive={isTabMessageInput}
                  id={props.payment.transactionReference == null ? props.payment.originTransRef : props.payment.transactionReference}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t('common.button.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DCBSModal;
