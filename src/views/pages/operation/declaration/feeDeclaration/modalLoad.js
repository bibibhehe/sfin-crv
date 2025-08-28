// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Box from '@mui/material/Box';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/LibraryAdd';
// import FeeDeclaration from 'services/Declaration.service';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import ServiceAlert from 'common/ServiceAlert';
// import { IconButton } from '@mui/material';

// import { FormControl, InputLabel, Input } from '@mui/material';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   dialogTitle: {
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     marginBottom: theme.spacing(2),
//     paddingBottom: theme.spacing(2)
//   },
//   icons: {
//     cursor: 'pointer'
//   },
//   input: {
//     border: '1px solid #ccc', // Thiết lập border cho Input
//     borderRadius: '4px', // Bo góc của Input
//     padding: '8px 12px', // Padding bên trong Input
//     marginBottom: theme.spacing(2) // Khoảng cách giữa các Input
//   }
// }));

// const ModalLoad = (props) => {
//   const classes = useStyles();
//   const [messageError, setmessageError] = useState('');
//   const [open, setOpen] = useState(false);
//   const [OpenAlert, setOpenAlert] = useState(false);
//   const [data, setdata] = useState({});
//   const [id, setId] = useState('');
//   const [formData, setFormData] = useState({
//     tariffPlanCode: '',
//     planName: '',
//     planDescription: '',
//     ladderEnabledAmount: '',
//     returnPaymentFeeType: ''
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
//   const { t } = useTranslation();
//   const handleClickOpen = () => {
//     setdata(props.payment);
//     if (props.type == 'Edit') {
//       setId(props.payment.tariffPlanId);
//       setFormData({
//         tariffPlanCode: props.payment.tariffPlanCode,
//         planName: props.payment.planName,
//         planDescription: props.payment.planDescription,
//         ladderEnabledAmount: props.payment.ladderEnabledAmount,
//         returnPaymentFeeType: props.payment.returnPaymentFeeType
//       });
//     }
//     setOpen(true);
//   };
//   const handleCloseAlert = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpenAlert(false);
//   };
//   const handleClose = () => {
//     props.onConfirm(false);
//     setFormData({
//       planName: '',
//       planDescription: '',
//       ladderEnabledAmount: '',
//       returnPaymentFeeType: '',
//       tariffPlanCode: ''
//     });
//     setOpen(false);
//   };
//   const showAlert = (message) => {
//     setmessageError(message);
//     setOpenAlert(true);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let checkValueTrue = false;
//     try {
//       if (props.type == 'Add') {
//         FeeDeclaration.addNewFeeDeclaration(formData).then(
//           (response) => {
//             ServiceAlert.success('Thông báo', 'Tạo mới thành công');
//           },
//           (error) => {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//             ServiceAlert.error('Lỗi', message);
//           }
//         );
//       }
//       if (props.type == 'Edit') {
//         FeeDeclaration.updateFeeDeclaration(id, formData).then(
//           (response) => {
//             ServiceAlert.success('Thông báo', 'Cập nhâp thành công');
//           },
//           (error) => {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//             ServiceAlert.error('Lỗi', message);
//           }
//         );
//       }
//       checkValueTrue = true;
//     } catch (error) {
//       console.log(error);
//       showAlert('Opps. Something wrong!!!');
//     }
//     if (checkValueTrue) {
//       setFormData({
//         planName: '',
//         planDescription: '',
//         ladderEnabledAmount: '',
//         returnPaymentFeeType: '',
//         tariffPlanCode: ''
//       });
//       props.onConfirm(true);
//       setOpen(false);
//     }

//     // onConfirm(true);
//   };
//   return (
//     <>
//       {props.type == 'Add' && (
//         <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>
//           {t('common.button.add')}
//         </Button>
//       )}
//       {props.type == 'Edit' && (
//         <IconButton title="Sửa">
//           <EditIcon color="warning" onClick={handleClickOpen} className={classes.icons} />
//         </IconButton>
//       )}

//       <Dialog onClose={handleClose} open={open} maxWidth="xl" keepMounted style={{ zIndex: 1700 }}>
//         <DialogTitle className={classes.dialogTitle}>
//           {props.type == 'Add' ? t('sidebar.operation.model.addTittle') : 'Cập phập thông tin của mã biểu phí: ' + formData.tariffPlanCode}
//         </DialogTitle>
//         <DialogContent>
//           <Box>
//             <form onSubmit={handleSubmit}>
//               {Object.keys(formData).map((key) => (
//                 <FormControl key={key} fullWidth margin="normal" required>
//                   <InputLabel htmlFor={key}>{t('common.element.' + key)}</InputLabel>
//                   <Input
//                     id={key}
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     // variant="outlined"
//                     className={classes.input}
//                     required
//                   />
//                 </FormControl>
//               ))}
//               <DialogActions>
//                 <Snackbar
//                   open={OpenAlert}
//                   autoHideDuration={2000}
//                   onClose={handleCloseAlert}
//                   anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 >
//                   <Alert onClose={handleCloseAlert} severity="error" variant="filled" sx={{ width: '100%' }}>
//                     {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
//                   </Alert>
//                 </Snackbar>
//                 <Button autoFocus type="submit" color="primary">
//                   Submit
//                 </Button>
//                 <Button onClick={handleClose}>Close</Button>
//               </DialogActions>
//             </form>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ModalLoad;
