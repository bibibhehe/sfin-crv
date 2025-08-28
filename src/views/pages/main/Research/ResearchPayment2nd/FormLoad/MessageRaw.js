// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HisMessageRawService from 'services/Research/HisMessageRaw.service';
import Backdrop from 'ui-component/loadingpages/loadingwaiting';
import CustomSnackbar from 'ui-component/cards/CustomSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow, Grid, Button, ButtonGroup } from '@mui/material';
import Link from '@mui/material/Link';
import MyTable from 'ui-component/tables/MyTableCustomMultiRow';
import Typography from '@mui/material/Typography';
import ShortTable from 'ui-component/tables/ShortTable';
import TeraboxText from 'ui-component/inputs/TeraboxText';
import { gridSpacing } from 'store/constant';

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
    cursor: 'pointer'
  }
});

const MessageRaw = (props) => {
  const [typeNotify, settypeNotify] = useState('success');
  const classes = useStyles();
  const [textValueContentReq, setTextValueContentReq] = useState('');
  const [textValueContentRes, setTextValueContentRes] = useState('');
  const [open, setOpen] = useState(false);
  const [valueDetail, setvalueDetail] = useState('');
  const [showDetail, setshowDetail] = useState(true);
  const [isRowSelected, setisRowSelected] = useState(-1);
  const [messageError, setmessageError] = useState('');
  const [messageRaw, setMessageRaw] = useState()
  const { t, i18n } = useTranslation();

  const [showBackdrop, setShowBackdrop] = useState(false);

  const listAllElements = (destAccount) => {
    handleLoadingClick();
    HisMessageRawService.searchList(destAccount)
      .then(
        (response) => {
          handleLoadingClick();
          setMessageRaw(response.data);
        },
        (error) => {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          showAlert(message);
          handleLoadingClick();
        }
      )
      .finally(() => setShowBackdrop(false));
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

  const handleLoadingClick = () => {
    setShowBackdrop(!showBackdrop);
  };

  const headerBTO1 = [
    { id: 'stt', label: 'STT', minWidth: 50 },
    { id: 'acceptDatetime', label: 'Thời gian gửi/nhận', minWidth: 150 },
    { id: 'transactionReference', label: 'Transaction reference', minWidth: 100 },
    { id: 'senderId', label: 'Bên gửi', minWidth: 100 },
    { id: 'receiverId', label: 'Bên nhận', minWidth: 100 },
    { id: 'messageIdentifier', label: 'Loại bản tin', minWidth: 100 },
    { id: 'senderReference', label: 'Sender reference', minWidth: 150 },
    { id: 'service', label: 'Dịch vụ', minWidth: 100 },
    { id: 'respResulltCode', label: 'Http status code', minWidth: 100 },
  ];

  const headersDetail = [
  ];

  const colorListTable = (index) => {
    return {
      border: '1px solid rgba(224, 224, 224, 1);',
      padding: '0.2rem',
      whiteSpace: 'nowrap',
      maxWidth: '300px',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    };
  };

  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = messageRaw ? messageRaw : [];
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow
            key={rowIndex}
            className={`${isRowSelected === object.id ? classes.clickRow : ''} ${rowIndex % 2 === 0 ? classes.evenRow : ''}`}
          >
            <TableCell sx={colorListTable(rowIndex)}>{rowIndex}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.acceptDatetime}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>
              <Link To="#" style={{ cursor: 'pointer' }} onClick={(e) => handleShowDetail(object)}>
                {object.transactionReference}
              </Link>
            </TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.senderId}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.receiverId}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.messageIdentifier}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.senderReference}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.service}</TableCell>
            <TableCell sx={colorListTable(rowIndex)}>{object.respResulltCode}</TableCell>
          </TableRow>
        );
        listTag.push(tableRow);
      });
    }

    return listTag;
  };


  const handleShowDetail = (value) => {
    setvalueDetail(value);
    setisRowSelected(value.id);
    showDetailValue();
  };

  const dataReturn = (dataEntry) => {
    try {
      const arrReturn = [
        { name: 'Accept/create datetime', value: dataEntry['acceptDatetime'] },
        { name: 'Service', value: dataEntry['service'] },
        { name: 'Lớp bản tin', value: dataEntry['kindOfMessage'] },
        { name: 'Message identifier', value: dataEntry['messageIdentifier'] },
        { name: 'Sender ref', value: dataEntry['senderReference'] },
        { name: 'Trans ref', value: dataEntry['transactionReference'] },
        { name: 'Sender ID', value: dataEntry['senderId'] },
        { name: 'Receiver ID', value: dataEntry['receiverId'] },
        { name: 'URI', value: dataEntry['uri'] },
        { name: 'Request http headers', value: dataEntry['requestHeaders'] },
        { name: 'Modif datetime', value: dataEntry['modifDatetime'] },
        { name: 'Response datetime', value: dataEntry['respDatetime'] },
        { name: 'Http status code', value: dataEntry['respResulltCode'] },
        { name: 'Response http headers', value: dataEntry['respHeaders'] },
      ];
      return arrReturn;
    } catch (error) {
      return null;
    }
  };

  const showDetailValue = () => {
    var listTag = [];
    var rowIndex = 0;
    const result = valueDetail;
    if (showDetail) {
      if (result) {
        setTextValueContentReq(result.requestBody);
        setTextValueContentRes(result.respBody);
        const values = dataReturn(result);
        values.forEach((item) => {
          rowIndex++;
          var tableRow = (
            <TableRow key={rowIndex}>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <b>{item.name}:</b>
              </TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          );
          listTag.push(tableRow);
        });
        return listTag;
      }
    }
  };

  useEffect(() => {
    if (props.isActive) {
      setShowBackdrop(true);
      listAllElements(props.messageRaw.destAccount);
    }
  }, [props.isActive]);

  return (
    <MainCard title="Tra cứu thông điệp gốc">
      <MyTable
        headers={headerBTO1}
        totalElements={props.totalElements}
        paging={props.paging}
        buildElementRows={buildElementRows}
        disable="0"
        onPageChange={props.onPageChange}
        onRowsPerPageChange={props.onRowsPerPageChange}
      />
      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">
              Detail Transaction
            </Typography>
            <ShortTable headers={headersDetail} buildElementRows={showDetailValue} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TeraboxText
              defaultText={textValueContentReq}
              RawLabel='Request body'
              valueDetail={valueDetail}
            />
            <TeraboxText
              defaultText={textValueContentRes}
              RawLabel='Response body'
              valueDetail={valueDetail}
            />
          </Grid>
        </Grid>
      </Grid>
      <CustomSnackbar open={open} handleClose={handleClose} message={messageError} autoHideDuration={3000} typeNotify={typeNotify} />
      <Backdrop show={showBackdrop} />
    </MainCard>
  );
};

export default MessageRaw;
