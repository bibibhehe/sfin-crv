// import * as React from 'react';
// import Link from '@mui/material/Link';
// import { useState } from 'react';

// import * as mime from 'react-native-mime-types';
// import CustomSnackbar from 'ui-component/cards/CustomSnackbar';

// export default function DownloadClick(props) {
//   const [open, setOpen] = useState(false);
//   const [messageError, setmessageError] = useState('');
//   const [typeNotify, settypeNotify] = useState('success');
//   const showAlertSuccess = (message) => {
//     setmessageError(message);
//     settypeNotify('success');
//     setOpen(true);
//   };
//   const showAlert = (message) => {
//     settypeNotify('error');
//     setmessageError(message);
//     setOpen(true);
//   };
//   const generateFilename = (mimeString) => {
//     // const fileType = getExtension(mimeString);
//     const date = new Date();
//     const YYYY = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const dd = String(date.getDate()).padStart(2, '0');
//     const hh = String(date.getHours()).padStart(2, '0');
//     const min = String(date.getMinutes()).padStart(2, '0');
//     const ss = String(date.getSeconds()).padStart(2, '0');
//     const fileName = props.nameFile ? props.nameFile : 'DebitReport';
//     return `${fileName}${YYYY}${mm}${dd}${hh}${min}${ss}`;
//   };
//   const getExtension = (mimeType) => {
//     return mime.extension(mimeType);
//   };
//   const base64ToFile = (base64, filename, mimeString) => {
//     const byteString = atob(base64);
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);

//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([ia], { type: mimeString });
//     const file = new File([blob], filename, { type: mimeString });

//     return file;
//   };

//   const handleClick = (event) => {
//     if (props.base64String && props.mimeString) {
//       const filename = generateFilename(props.mimeString);
//       const file = base64ToFile(props.base64String, filename, props.mimeString);
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(file);
//       link.download = file.name;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       showAlert('Không tìm thấy file đính kèm');
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };
//   return (
//     <>
//       <Link To="#" style={{ cursor: 'pointer' }} onClick={() => handleClick()}>
//         {props.text}
//       </Link>
//       <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />
//     </>
//   );
// }
