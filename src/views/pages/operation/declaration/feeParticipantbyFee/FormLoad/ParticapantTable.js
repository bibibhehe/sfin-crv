import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyTable from 'ui-component/MyTable';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import ParticipantConfigSe from 'services/AssignParticipant/AssignParticipantByFee.service';

import DetailIcon from '@mui/icons-material/Details';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import ParticipantModal from './ParticipantModal';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  icons: {
    cursor: 'pointer'
  },
  input: {
    border: '1px solid #ccc', // Thiết lập border cho Input
    borderRadius: '4px', // Bo góc của Input
    padding: '8px 12px', // Padding bên trong Input
    marginBottom: theme.spacing(2) // Khoảng cách giữa các Input
  }
}));

const ParticapantTable = (props) => {
  const classes = useStyles();

  const { t } = useTranslation();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [idSelected, setidSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });
  const [editingData, setEditingData] = useState({});
  const [newItem, setNewItem] = useState({
    bic: ' ',
    businessSvcCode: null,
    businessSvcType: '',
    tariffPlanId: ' '
  });
  const [OpenModal, setOpenModal] = useState(false);

  const [filterDelete, setfilterDelete] = useState({
    businessSvcCode: null,
    businessSvcType: null,
    tariffPlanId: null
  });
  const [TittleModal, setTittleModal] = useState('');
  const [TypeAction, setTypeAction] = useState(1);
  const [dataModal, setdataModal] = useState(null);

  const headerBTO1 = ['STT', 'Loại kênh', 'Kênh', 'Biểu phí', 'Hành Động'];
  const [paging, setPaging] = useState({});
  const handleCloseModal = () => {
    setTittleModal('');
    setTypeAction(1);
    setdataModal(null);

    setfilterDelete({
      businessSvcCode: null,
      businessSvcType: null,
      tariffPlanId: null
    });
    setOpenModal(false);
  };
  const handleDetailClick = (object) => {
    setdataModal(object);
    setTittleModal('Chi tiết thông tin');
    setTypeAction(1);
    setOpenModal(true);
  };
  const handleAddClick = () => {
    setTittleModal('Thêm thông tin');
    setTypeAction(2);
    setOpenModal(true);
  };
  const handleEditClick = (object) => {
    setTittleModal('Sửa thông tin');
    setTypeAction(3);
    setdataModal(object);
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
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
  const handleConfirm = (object) => {
    const newFilterDelete = { ...filterDelete };
    newFilterDelete['tariffPlanId'] = object.tariffPlanId;
    newFilterDelete['businessSvcCode'] = object.businessSvcCode;
    newFilterDelete['businessSvcType'] = object.businessSvcType;
    setfilterDelete(newFilterDelete);
    setIsModalConfirm(true);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handleDeleteBTO01 = (confirmed) => {
    if (confirmed && filterDelete) {
      ParticipantConfigSe.deleteAssignPart(filterDelete).then(
        (response) => {
          showAlertSuccess('Xóa thành công');
          props.onReload();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    }
  };
  const convertTypeChange = (arrayA, valueS) => {
    if (!arrayA) return valueS;

    const foundItem = arrayA.find((item) => item.id === valueS);
    if (foundItem) return foundItem.name;
    else return valueS;
  };
  const handleReloadConfig01 = () => {
    props.onReload();
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = props.data;
    let pageSize = props.paging.size;
    let pagePage = props.paging.page;

    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className={'align-middle text-center no-wrap-box '}>{pageSize * pagePage + rowIndex}</TableCell>

            <TableCell className="align-middle text-center no-wrap-box">
              {convertTypeChange(props.typebzSrc, object.businessSvcType)}
            </TableCell>

            <TableCell className="align-middle text-center no-wrap-box">
              {object.businessSvcCode ? convertTypeChange(props.typeChannelId, object.businessSvcCode) : 'Tất cả'}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{convertTypeChange(props.typeFee, object.tariffPlanId)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <>
                <IconButton title="Chi tiết">
                  <DetailIcon color="primary" onClick={() => handleDetailClick(object)} className={classes.icons} />
                </IconButton>
                <IconButton title="Sửa">
                  <EditIcon color="primary" onClick={() => handleEditClick(object)} className={classes.icons} />
                </IconButton>
                <IconButton title="Xóa">
                  <DeleteIcon color="error" className={classes.icons} onClick={() => handleConfirm(object)} />
                </IconButton>
              </>
            </TableCell>

            <ConfirmationModal
              open={isModalConfirm}
              onClose={handleConfirmClose}
              onConfirm={handleDeleteBTO01}
              id={idSelected}
              textDelete={'Bạn xác nhận muốn xóa không?'}
            />
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }
    return listTag;
  };
  useEffect(() => {
    // buildElementRows();
  }, []);
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={10.7}>
            <Typography variant="h4" gutterBottom>
              {/* Bậc thang của biểu phí đang chọn: {props.name} */}
            </Typography>
          </Grid>
          <Grid item xs={12} md={1.3}>
            <Button variant="contained" onClick={() => handleAddClick()} startIcon={<AddIcon />}>
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <MyTable
              headers={headerBTO1}
              totalElements={props.totalElements}
              paging={paging}
              buildElementRows={buildElementRows}
              onPageChange={props.onPageChange}
              onRowsPerPageChange={props.onRowsPerPageChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <ParticipantModal
        handleCloseModal={handleCloseModal}
        TittleModal={TittleModal}
        TypeAction={TypeAction}
        OpenModal={OpenModal}
        data={dataModal}
        typeFee={props.typeFee}
        typebzSrc={props.typebzSrc}
        onReload={handleReloadConfig01}
        typeBank={props.listNapasBankSelect}
        typeChannelId={props.typeChannelId}
        showError={showAlert}
        showAlertSuccess={showAlertSuccess}
      />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ParticapantTable;
