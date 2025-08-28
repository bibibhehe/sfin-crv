// project imports
// import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';

import { gridSpacing } from 'store/constant';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { TableCell, TableRow, Grid, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import MyTable from 'ui-component/tables/TableNnotPaging';
import ConfirmationModal from 'ui-component/inputs/ConfirmInformation';
import { useGlobalData } from 'provider/GlobalProvider';
import SelectBox from 'ui-component/inputs/selectBox';

const ParticipantSett = ({
  participantCode,
  objectGroupPa,
  setobjectGroupPa,
  showSuccess,
  showError,
  addClick,
  setAddClick,
  editIndex,
  setEditIndex,
  handleSubmitSett,
  handleEditTCTVSett,
  isTab,
  isAction,
  loadingButton
}) => {
  const { t } = useTranslation();
  const [editingData, setEditingData] = useState({});
  const [idSelected, setidSelected] = useState('');
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  const [newItem, setNewItem] = useState({
    participantCode: participantCode,
    settlementParticipantCode: participantCode,
    validBeginTime: '',
    validEndTime: ''
  });
  const [paging, setPaging] = useState({
    page: 0,
    size: 0,
    sort: 'id,desc'
  });
  const handleAddUndo = () => {
    setAddClick(false);
    setNewItem({
      participantCode: participantCode,
      settlementParticipantCode: participantCode,
      validBeginTime: '',
      validEndTime: ''
    });
  };
  const globalData = useGlobalData();
  const listNapasBank = globalData.listNapasBank;
  const listNapasBankSelect = listNapasBank.map((item) => {
    return { id: item.participantCode, name: item.participantCode + ' - ' + item.shortName, disabled: false };
  });

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleConfirm = (id) => {
    setidSelected(id - 1);
    setIsModalConfirm(true);
  };
  const handleConfirmClose = () => {
    setIsModalConfirm(false);
  };
  const handleConfirmResult = (confirmed) => {
    if (confirmed) {
      try {
        const valueExist = objectGroupPa.filter((_, i) => i !== idSelected);
        setobjectGroupPa(valueExist);
        showSuccess('Xóa thành công');
      } catch (error) {
        // console.log(error);
      }
    }
  };
  const handleAdd = () => {
    if (newItem.validBeginTime == '' || newItem.validEndTime == '') {
      showError('Hãy điền đầy đủ thông tin thời gian');
      return;
    }
    if (newItem.validBeginTime > newItem.validEndTime) {
      showError('Thông tin ngày bắt đầu không được lớn hơn ngày kết thúc');
      return;
    }
    if (objectGroupPa != null) {
      const overlappingItem = Object.values(objectGroupPa).find(
        (item) =>
          (newItem.validBeginTime >= item.validBeginTime && newItem.validBeginTime <= item.validEndTime) ||
          (newItem.validEndTime >= item.validBeginTime && newItem.validEndTime <= item.validEndTime) ||
          (newItem.validBeginTime <= item.validBeginTime && newItem.validEndTime >= item.validEndTime)
      );
      if (overlappingItem) {
        showError('Thời gian trùng lặp với một mục khác trong danh sách.');
        return;
      }
    }
    // handleAddValuetoArray(newItem);
    setobjectGroupPa((objectGroupPa) => [...objectGroupPa, newItem]);
    setEditingData(null);
    setAddClick(false);
    setNewItem({ participantCode: participantCode, settlementParticipantCode: participantCode, validBeginTime: '', validEndTime: '' });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleAddClick = () => {
    if (addClick) setAddClick(false);
    else setAddClick(true);
    setNewItem({
      participantCode: participantCode,
      settlementParticipantCode: participantCode,
      validBeginTime: '',
      validEndTime: ''
    });
  };

  const handleEdit = (id, object) => {
    setEditIndex(id);
    setEditingData(object);
    handleAddUndo();
  };
  const handleSave = () => {
    try {
      const newArray = objectGroupPa.map((item, index) => {
        if (index === editIndex - 1) {
          return editingData;
        }
        return item;
      });
      setobjectGroupPa(newArray);
      setEditIndex(null);
      setEditingData({});
    } catch (error) {
      //
    }
  };
  const handleCancel = () => {
    setEditIndex(null);
    setEditingData({});
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = objectGroupPa;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        let indexNumber = paging.size * paging.page + rowIndex;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className={'align-middle text-center no-wrap-box '}>{indexNumber}</TableCell>

            <TableCell className="align-middle text-center no-wrap-box">
              {isAction != 'detail' &&
                (editIndex === indexNumber ? (
                  <>
                    <IconButton title="Lưu" onClick={handleSave}>
                      <SaveIcon color="primary" />
                    </IconButton>
                    <IconButton title="Thoát" onClick={handleCancel}>
                      <CancelIcon color="primary" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton title="Sửa" onClick={() => handleEdit(indexNumber, object)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton title="Xóa">
                      <DeleteIcon color="error" onClick={() => handleConfirm(indexNumber)} />
                    </IconButton>
                  </>
                ))}
            </TableCell>
            <TableCell className={'align-middle text-center no-wrap-box '}>
              {editIndex === indexNumber ? (
                <TextField value={editingData.participantCode} type="text" name="participantCode" onChange={handleChange} disabled />
              ) : (
                object.participantCode
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editIndex === indexNumber ? (
                <SelectBox
                  name="settlementParticipantCode"
                  value={editingData.settlementParticipantCode}
                  label={t('common.element.settlementParticipantCode')}
                  object={listNapasBankSelect}
                  showEm="0"
                  onChange={handleChange}
                />
              ) : (
                object.settlementParticipantCode
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editIndex === indexNumber ? (
                <>
                  <TextField type="date" value={editingData.validBeginTime} name="validBeginTime" onChange={handleChange} />
                </>
              ) : (
                <>{object.validBeginTime}</>
              )}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              {editIndex === indexNumber ? (
                <>
                  <TextField type="date" value={editingData.validEndTime} name="validEndTime" onChange={handleChange} />
                </>
              ) : (
                <>{object.validEndTime}</>
              )}
            </TableCell>

            <ConfirmationModal
              open={isModalConfirm}
              onClose={handleConfirmClose}
              onConfirm={handleConfirmResult}
              id={idSelected}
              textDelete={'Bạn xác nhận muốn xóa không?'}
            />
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }
    if (addClick) {
      var tableAdd = (
        <TableRow>
          <TableCell>{paging.size * paging.page + rowIndex + 1}</TableCell>
          <TableCell className={'align-middle text-center no-wrap-box '}>
            <IconButton title="Thêm" onClick={() => handleAdd()}>
              <SaveIcon color="primary" />
            </IconButton>
            <IconButton title="Thoát" onClick={handleAddUndo}>
              <CancelIcon color="primary" />
            </IconButton>
          </TableCell>
          <TableCell className={'align-middle text-center no-wrap-box '}>
            <TextField value={newItem.participantCode} type="text" name="participantCode" onChange={handleChangeAdd} disabled />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box">
            <SelectBox
              name="settlementParticipantCode"
              value={newItem.settlementParticipantCode}
              object={listNapasBankSelect}
              showEm="0"
              onChange={handleChangeAdd}
            />
            {/* <TextField value={newItem.settlementParticipantCode} name="settlementParticipantCode" onChange={handleChangeAdd} /> */}
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box">
            <TextField value={newItem.validBeginTime} type="date" name="validBeginTime" onChange={handleChangeAdd} />
          </TableCell>
          <TableCell className="align-middle text-center no-wrap-box">
            <TextField value={newItem.validEndTime} type="date" name="validEndTime" onChange={handleChangeAdd} />
          </TableCell>
        </TableRow>
      );
      listTag.push(tableAdd);
    }

    return listTag;
  };

  useEffect(() => {}, []);
  const headers = ['STT', 'Thao tác', 'TCTV không QT', 'TCTV quyết toán', 'Thời gian bắt đầu', 'Thời gian kết thúc'];
  const handleClickNext = () => {
    if (!objectGroupPa) {
      showError('Không thể xử lý với dữ liệu rỗng');
      return;
    }
    if (isTab == 1) handleSubmitSett();
    else handleEditTCTVSett();
  };
  return (
    <>
      <br />
      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={10.7}>
                <Typography variant="h4" gutterBottom>
                  Cấu hình cộng gộp TCTV - BANK ID: {participantCode}
                </Typography>
              </Grid>
              <Grid item xs={12} md={1.3}>
                {isAction != 'detail' && (
                  <Button variant="contained" onClick={handleAddClick} startIcon={<AddIcon />}>
                    Thêm
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <MyTable headers={headers} totalElements={null} paging={paging} buildElementRows={buildElementRows} disable="0" />
          </Grid>
          <br />
          <br />
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: '50px' }}>
            {isAction != 'detail' && !loadingButton && (
              <Button variant="contained" onClick={() => handleClickNext()}>
                Save
              </Button>
            )}
            {isAction != 'detail' && loadingButton && (
              <Button variant="contained" disabled>
                Loading ...
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ParticipantSett;
