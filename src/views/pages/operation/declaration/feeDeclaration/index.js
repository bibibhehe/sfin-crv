// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Paper, Grid, TextField, Button } from '@mui/material';
import ServiceAlert from 'common/ServiceAlert';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DetailIcon from '@mui/icons-material/TouchApp';
import DeleteIcon from '@mui/icons-material/Delete';

import feeDeclaration from 'services/Declaration.service';
import MyTable from 'ui-component/MyTable';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';

import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { formatCurency } from 'common/GuiUtils';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import TblTariffWithoutLadder from './FormLoad/TblTariffWithoutLadder';
import TblTariffLadder from './FormLoad/TblTariffLadder';
import TblTariff from './FormLoad/TblTariff';
import AddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SelectBox from 'ui-component/inputs/selectBox';

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

const FeeDeclaration = () => {
  const [message, setMessage] = useState('');
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [idSelected, setidSelected] = useState('');
  const [idBTO01Selected, setidBTO01Selected] = useState('');
  const [idBTO02Selected, setidBTO02Selected] = useState('');
  const [nameBTO02Selected, setnameBTO02Selected] = useState('');
  const [nameSelectedBT, setnameSelectedBT] = useState('');
  const [idSelectedBT, setidSelectedBT] = useState('');

  const [numberSeleted, setnumberSeleted] = useState(-1);
  const [numberSeleted1, setnumberSeleted1] = useState(-1);
  const [numberTariffLadderSelected, setnumberTariffLadderSelected] = useState(-1);

  const [nameFee, setnameFee] = useState('');
  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();

  const [pageInfo, setPageInfo] = useState({
    // totalElements: 0
  });

  const [pageBTO1, setPageBTO1] = useState({});
  const [pageBTO2, setPageBTO2] = useState({});
  const [pageBTO2_01, setPageBTO2_01] = useState({});

  const [paging, setPaging] = useState({
    // page: 0,
    // size: defaultSettings.pageSize,
    // sort: 'id,desc'
  });

  const [filtersInput, setFiltersInput] = useState({
    searchKey: ''
  });

  const { t } = useTranslation();
  const headers = [
    'Mã biểu phí',
    'Tên biểu phí',
    'Giá trị GD áp dụng thang',
    'Kiểu phí GD hoàn trả',
    'Mô tả biểu phí',
    'Tạo lúc',
    'Hành động'
  ];
  const [showBackdrop, setShowBackdrop] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [addClick, setAddClick] = useState(false);
  const [newItem, setNewItem] = useState({
    tariffPlanCode: '',
    planName: '',
    planDescription: '',
    ladderEnabledAmount: '49999999',
    returnPaymentFeeType: 'FREE'
  });
  const typeFeePay = [
    { id: 'FREE', name: 'Không tính phí', disabled: true },
    { id: 'BY_ORIGINAL_PAYMENT', name: 'Hoàn lại phí GD chuyển tiền', disabled: true }
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleEdit = (id, item) => {
    setEditingId(id);
    setEditingData(item);
    handleAddUndo();
  };

  const handleSave = () => {
    try {
      feeDeclaration.updateFeeDeclaration(editingId, editingData).then(
        (response) => {
          showAlertSuccess('Cập nhâp thành công');
          setEditingId(null);
          setEditingData({});
          listAllElements();
          setnumberSeleted(-1);
          setnumberSeleted1(-1);
          setnumberTariffLadderSelected(-1);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      showAlert(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };
  const handleAddClick = () => {
    if (addClick) setAddClick(false);
    else setAddClick(true);
    handleCancel();
  };
  const handleAddUndo = () => {
    setAddClick(false);

    setNewItem({
      tariffPlanCode: '',
      planName: '',
      planDescription: '',
      ladderEnabledAmount: '49999999',
      returnPaymentFeeType: 'FREE'
    });
  };
  const handleAdd = () => {
    try {
      feeDeclaration.addNewFeeDeclaration(newItem).then(
        (response) => {
          showAlertSuccess('Tạo mới thành công');
          setNewItem({
            tariffPlanCode: '',
            planName: '',
            planDescription: '',
            ladderEnabledAmount: '49999999',
            returnPaymentFeeType: 'FREE'
          });
          listAllElements();
          setAddClick(false);
          setnumberSeleted(-1);
          setnumberSeleted1(-1);
          setnumberTariffLadderSelected(-1);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    } catch (error) {
      showAlert(error);
    }
  };

  const getDataBTO1 = (id) => {
    if (id != '') {
      feeDeclaration.getDetailBTO_1(id).then(
        (response) => {
          setPageBTO1(response.data);
        },
        (error) => {
          //   setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          //   showAlert(message);
        }
      );
    }
  };
  const getDataBTO2 = (id) => {
    if (id != '') {
      feeDeclaration.getDetailBTO_2(id).then(
        (response) => {
          setPageBTO2(response.data);
        },
        (error) => {
          //   setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          //   showAlert(message);
        }
      );
    }
  };
  const getDataDetailBTO2 = (id) => {
    if (id != '') {
      feeDeclaration.getDetailBTO_2_1(id).then(
        (response) => {
          setPageBTO2_01(response.data);
        },
        (error) => {
          //   setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          //   showAlert(message);
        }
      );
    }
  };
  const listAllElements = () => {
    handleLoadingClick();
    feeDeclaration
      .search(filtersInput)
      .then(
        (response) => {
          handleLoadingClick();
          setPageInfo(response.data);
        },
        (error) => {
          setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
  };
  const handleConfirm = (object) => {
    setidSelected(object.tariffPlanId);
    setnameFee(object.tariffPlanCode);
    setIsModalConfirm(true);
  };
  const handleDetailBTO = (object) => {
    setidSelectedBT(object.tariffPlanId);
    setnumberSeleted1(-1);
    setnameSelectedBT(object.planName);
    setidBTO02Selected('');
    setnameBTO02Selected('');
    setPageBTO2_01({});
    getDataBTO1(object.tariffPlanId);
    getDataBTO2(object.tariffPlanId);
  };
  const handleDetailBTO02 = (object, id) => {
    if (object != null) {
      setnumberSeleted1(id);
      setidBTO02Selected(object.tariffLadderId);
      setnameBTO02Selected(' từ ' + object.minNumTrans + ' đến ' + object.maxNumTrans + ' giao dịch');
      getDataDetailBTO2(object.tariffLadderId);
    }
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };

  const handleConfirmResult = (confirmed) => {
    if (confirmed) {
      feeDeclaration.deleteFeeDeclaration(idSelected).then(
        (response) => {
          showAlertSuccess('Xóa thành công mã biểu phí: ' + nameFee);
          listAllElements();
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
        }
      );
    }
  };

  const [open, setOpen] = useState(false);
  const [messageError, setmessageError] = useState('');
  const showAlert = (message) => {
    settypeNotify('error');
    setmessageError(message);
    setOpen(true);
  };
  const showAlertSuccess = (message) => {
    setmessageError(message);
    settypeNotify('success');
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };
  const handleReload = (confirmed) => {
    if (confirmed) {
      handleChangePage(null, 0);
    }
  };
  useEffect(() => {
    setShowBackdrop(true);
    listAllElements();
    getDataBTO1(idSelectedBT);
    getDataBTO2(idSelectedBT);
    getDataDetailBTO2(idBTO02Selected);
  }, [paging]);

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };

  const handleSync = () => {
    handleChangePage(null, 0);
  };

  const handleChangePage = (event, newPage) => {
    const newPaging = { ...paging };
    newPaging.page = newPage;
    setPaging(newPaging);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPaging = { ...paging };
    newPaging.size = parseInt(event.target.value, 10);
    newPaging.page = 0;
    setPaging(newPaging);
  };
  const mapFeeType = (value) => {
    if (value == 'FREE') return 'Không tính phí';
    if (value == 'BY_ORIGINAL_PAYMENT') return 'Hoàn lại phí GD chuyển tiền';
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = pageInfo;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        const xValue = rowIndex;
        var tableRow = (
          <TableRow key={rowIndex} className={numberSeleted == rowIndex ? classes.evenRow : ''}>
            <TableCell className={'align-middle text-center no-wrap-box '} style={{ textAlign: 'center' }}>
              {editingId === object.tariffPlanId ? (
                <TextField value={editingData.tariffPlanCode} type="text" name="tariffPlanCode" onChange={handleChange} />
              ) : (
                object.tariffPlanCode
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffPlanId ? (
                <TextField value={editingData.planName} type="text" name="planName" onChange={handleChange} />
              ) : (
                object.planName
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffPlanId ? (
                <TextField
                  value={editingData.ladderEnabledAmount}
                  type="number"
                  inputProps={{ max: 49999999 }}
                  name="ladderEnabledAmount"
                  onChange={handleChange}
                />
              ) : (
                formatCurency(object.ladderEnabledAmount)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffPlanId ? (
                <SelectBox
                  disable={true}
                  name="returnPaymentFeeType"
                  value={editingData.returnPaymentFeeType}
                  object={typeFeePay}
                  showEm="0"
                  onChange={handleChange}
                />
              ) : (
                mapFeeType(object.returnPaymentFeeType)
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              {editingId === object.tariffPlanId ? (
                <TextField value={editingData.planDescription} type="text" name="planDescription" onChange={handleChange} />
              ) : (
                object.planDescription
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center', width: '150px' }}>
              {object.dateCreate}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
              <div style={{ width: '150px' }}>
                {editingId === object.tariffPlanId ? (
                  <>
                    <IconButton title="Lưu" onClick={handleSave}>
                      <SaveIcon color="primary" className={classes.icons} />
                    </IconButton>
                    <IconButton title="Thoát" onClick={handleCancel}>
                      <CancelIcon color="primary" className={classes.icons} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton title="Chọn">
                      <DetailIcon color="primary" onClick={() => handleDetailBTO(object, xValue)} className={classes.icons} />
                    </IconButton>
                    <IconButton title="Sửa" onClick={() => handleEdit(object.tariffPlanId, object)}>
                      <EditIcon color="warning" className={classes.icons} />
                    </IconButton>
                    <IconButton title="Xóa">
                      <DeleteIcon color="error" onClick={() => handleConfirm(object)} className={classes.icons} />
                    </IconButton>
                  </>
                )}
              </div>
            </TableCell>
            <ConfirmationModal
              open={isModalConfirm}
              onClose={handleConfirmClose}
              onConfirm={handleConfirmResult}
              id={idSelected}
              textDelete={'Bạn xác nhận muốn xóa mã biểu phí: ' + nameFee + ' không?'}
            />
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }
    if (addClick) {
      var tableAdd = (
        <TableRow>
          <TableCell className={'align-middle text-center no-wrap-box ' + classes.stickyCell} style={{ textAlign: 'center' }}>
            <TextField value={newItem.tariffPlanCode} type="text" name="tariffPlanCode" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.planName} type="text" name="planName" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.ladderEnabledAmount} type="number" name="ladderEnabledAmount" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <SelectBox
              name="returnPaymentFeeType"
              value={newItem.returnPaymentFeeType}
              object={typeFeePay}
              showEm="0"
              disable={true}
              onChange={handleChangeAdd}
            />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}>
            <TextField value={newItem.planDescription} type="text" name="planDescription" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box" style={{ textAlign: 'center' }}></TableCell>
          <TableCell>
            <IconButton title="Thêm" onClick={handleAdd}>
              <SaveIcon color="primary" className={classes.icons} />
            </IconButton>
            <IconButton title="Thoát" onClick={handleAddUndo}>
              <CancelIcon color="primary" className={classes.icons} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
      listTag.push(tableAdd);
    }
    return listTag;
  };
  return (
    <MainCard title={t('main.declaration.feeDeclaration.title')}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={6}>
          <TextField
            name="searchKey"
            label="Tìm kiếm thông tin biểu phí"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
        <Grid item style={{ alignContent: 'center' }} xs={1}>
          <Button onClick={handleSync} size="small" variant="contained" style={{ height: '80%' }} startIcon={<SearchIcon />}>
            Lọc
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={10.7}>
                <Typography variant="h4" gutterBottom>
                  Biểu phí
                </Typography>
              </Grid>
              <Grid item xs={12} md={1.3}>
                <Button variant="contained" onClick={handleAddClick} startIcon={<AddIcon />}>
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <MyTable
              headers={headers}
              totalElements={''}
              paging={''}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={buildElementRows}
              disable="0"
            />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <TblTariffWithoutLadder name={nameSelectedBT} data={pageBTO1} id={idSelectedBT} handleLoadBTO1={getDataBTO1} />
      <br />
      <br />
      <TblTariffLadder
        name={nameSelectedBT}
        data={pageBTO2}
        id={idSelectedBT}
        handleLoadBTO2={getDataBTO2}
        handleClickRow={handleDetailBTO02}
        numberSeleted1={numberSeleted1}
        // setnumberSeleted1={setnumberSeleted1}
      />
      <br />
      <br />
      <TblTariff
        name={nameBTO02Selected}
        data={pageBTO2_01}
        id={idBTO02Selected}
        handleLoadBTO2={getDataDetailBTO2}
        numberTariffLadderSelected={numberTariffLadderSelected}
        // setnumberTariffLadderSelected={setnumberTariffLadderSelected}
      />

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={typeNotify} variant="filled" sx={{ width: '100%' }}>
          {messageError == '' ? 'Oops, Somthing wrong !!!' : messageError}
        </Alert>
      </Snackbar>
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default FeeDeclaration;
