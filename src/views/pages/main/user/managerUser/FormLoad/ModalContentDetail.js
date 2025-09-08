import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { Grid, Container } from '@mui/material';
import CancelOutline from '@mui/icons-material/ClearOutlined';
import ListTextBox from 'ui-component/inputs/ListTextBoxUpdate';
import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';

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
  const dataDetail = props.dataDetail;
  const classes = useStyles();

  const keysToGetData = [
    { id: 'name', label: 'Tên ĐVPTML' },
    { id: 'mmCode', label: 'Mã ĐVPTML' },
    { id: 'status', label: 'Trạng thái' },
    { id: 'dateCreated', label: 'Ngày tạo' },
    { id: 'viewMerchantPayment', label: 'View Merchant Payment' },
    { id: 'url', label: 'Url' },
    { id: 'username', label: 'Client ID (chiều TCTV -> NAPAS)' },
    { id: 'authorizationServer', label: 'Authorization Server' },
    { id: 'contactEmail', label: 'Email' },
    { id: 'napasUsername', label: 'Client ID (chiều NAPAS -> TCTV)' },
    { id: 'merchantParticipantId', label: 'Mã định danh một TCTV trên hệ thống Napas' },
    { id: 'fee', label: 'Phí áp dụng(%)' },
    { id: 'merchantBranchType', label: 'Phân cấp'},
    { id: 'outgoingAuthType', label: 'Phương thức xác thực'},
  ];

  useEffect(() => {}, []);
  return (
    <div>
      <Dialog onClose={props.handleClose} open={props.open} maxWidth="xl" keepMounted fullWidth={false}>
        <DialogTitle style={{ fontSize: '1.3rem', color: 'white', fontWeight: 'bold', backgroundColor: '#2196f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              Thông tin Merchant
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={props.handleClose}
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
                  <legend className={classes.tabTitle}>Chi tiết thông tin Merchant</legend>
                  <Grid item xs={12}>
                    <Grid container spacing={gridSpacing} className={classes.widthSize}>
                      <ListTextBox data={dataDetail} listShow={keysToGetData} linkText="common.element" rowData={12} />
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </>
          ) : (
            'Đang tìm kiếm thông tin giao dịch'
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalContentDetail;
