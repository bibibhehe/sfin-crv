// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField, Button } from '@mui/material';
import ParticipantConfig from 'services/ParticipantConfig.service';

// import { IconButton } from '@mui/material';
// import DetailIcon from '@mui/icons-material/Details';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/LibraryAdd';
// import EditIcon from '@mui/icons-material/Edit';
import ExportIcon from '@mui/icons-material/IosShare';

import { chipColorByActiveStatus } from 'common/GuiUtils.js';
import MyTable from 'ui-component/MyTable';
import defaultSettings from 'defaultSetting';
import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// import Typography from '@mui/material/Typography';
import ParticapantModal from './ParticipantModal';

const useStyles = makeStyles({
  stickyCell: {
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    zIndex: 1,
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  },
  evenRow: {
    backgroundColor: '#e3f2fd'
  },
  icons: {
    // margin: '0 3px',
    cursor: 'pointer'
  }
});

const ParticipantTable = (props) => {
  const classes = useStyles();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataSelected, setdataSelected] = useState({});
  const [idSelected, setidSelected] = useState('');

  const [typeNotify, settypeNotify] = useState('success');
  const [messageError, setmessageError] = useState('');

  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });
  const headerBTO1 = [
    'STT',
    'Thao tác',
    'Bank ID',
    'Bank Code',
    'Citad',
    'Bank Name',
    'Loại TVQT',
    'Debit Status',
    'Credit Status',
    'Incoming Status',
    'Outgoing Status'
  ];
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handlDeleteClick = (id) => {
    setidSelected(id);
    setIsModalConfirm(true);
  };
  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
    // listAllElements();
  };
  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
  };
  const handleDeleteBTO01 = (confirmed) => {
    if (confirmed) {
      try {
        ParticipantConfig.deleteParticipant(idSelected).then(
          (response) => {
            showAlertSuccess('Xóa thành công');
            props.onLoad();
          },
          (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            showAlert(message);
          }
        );
        props.onLoad();
      } catch (error) {
        showError('Opps. Somthing Wrong!!!');
        //
      }
    }
  };
  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
  };
  const handleClickOpenMd = () => {
    setOpen(true);
  };
  const handleClickCloseMd = () => {
    setOpenModal(false);
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
  const handleReloadPage = () => {
    props.onLoad();
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
            <TableCell className="align-middle text-center no-wrap-box" sx={{ minWidth: '160px' }}>
              <ParticapantModal
                data={object}
                id={object.id}
                type={2}
                showSuccess={showAlertSuccess}
                showError={showAlert}
                handlDeleteClick={handlDeleteClick}
                handleReloadPage={handleReloadPage}
              />
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box '}>{object.participantCode}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.shortName}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.citadCode}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box" sx={{ minWidth: '200px' }}>
              {object.legalName}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.settlementType}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByActiveStatus(object.debitStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByActiveStatus(object.creditStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByActiveStatus(object.incomingStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByActiveStatus(object.outgoingStatus)}</TableCell>

            <ConfirmationModal
              open={isModalConfirm}
              onClose={handleConfirmClose}
              onConfirm={handleDeleteBTO01}
              textDelete={'Bạn xác nhận muốn xóa không?'}
            />
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  useEffect(() => {}, []);
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={1.3}>
            <ParticapantModal type={1} handleReloadPage={handleReloadPage} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" color="secondary" startIcon={<ExportIcon />}>
              Xuất dữ liệu
            </Button>
          </Grid>
          <Grid item xs={12} md={8.7}></Grid>
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <MyTable
              headers={headerBTO1}
              totalElements={props.totalElements}
              paging={props.paging}
              buildElementRows={buildElementRows}
              disable="0"
              onPageChange={props.onPageChange}
              onRowsPerPageChange={props.onRowsPerPageChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <ParticapantModal data={dataSelected} handleClickCloseModel={handleClickCloseMd} />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ParticipantTable;
