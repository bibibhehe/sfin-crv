import HisMessageInputService from 'services/HisMessageInput.service';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { TableCell, TableRow, Paper, TextField, Button } from '@mui/material';
import ShortTable from 'ui-component/tables/ShortTable';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Link from '@mui/material/Link';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import TeraboxText from 'ui-component/inputs/TeraboxText';
import NoData from 'ui-component/loadingpages/nodata';
import { gridSpacing } from 'store/constant';

import Typography from '@mui/material/Typography';

const MessageInputDetail = (props) => {
  const inputMessageId = props.id;
  const [showDetail, setshowDetail] = useState(true);
  const [searchValue, setsearchValue] = useState('');
  const [valueDetail, setvalueDetail] = useState('');

  useEffect(() => {
    if (props.isActive) {
      getMessageInput();
      getMessageOutput();
    }
  }, [props.isActive]);

  const { t, i18n } = useTranslation();
  const [pageInfo, setPageInfo] = useState(null);
  const [pageInfoOut, setPageInfoOut] = useState(null);

  const headers = [
    // t('common.modelPayments.numbering'),
    t('common.modelPayments.id'),
    t('common.modelPayments.messageIdentifier'),
    t('common.modelPayments.msgid'),
    'Time',
    'SenderID'
  ];
  const headersOut = [
    t('common.modelPayments.id'),
    t('common.modelPayments.messageIdentifier'),
    t('common.modelPayments.msgid'),
    'Time',
    'ReciverID'
  ];
  const headers1 = [
    // t('common.modelPayments.numbering'),
    // t('common.modelPayments.detailTransaction'),
    '',
    ''
  ];
  const formatValue = (valueString) => {
    let valueReturn = valueString;
    try {
      if (typeof valueString == 'string') {
        valueReturn = valueString.substring(valueString.length - 6, valueString.length);
      }
    } catch (error) {
      // console.log(error);
    }
    return valueReturn;
  };
  const [property, setproperty] = useState({
    border: '1px solid #e9ecef'
  });
  const [rowTables, setrowTables] = useState({ backgroundColor: ' #e9ecef' });
  const [textValueContent, setTextValueContent] = useState('');

  const handleChangeRowsPerPage = (event) => {};
  const handleChangePage = (event, newPage) => {};
  const handleShowDetail = (event, value) => {
    setsearchValue(value.id);
    setvalueDetail(value);
    showDetailValue1();
  };

  const ValueCheck = (key, value) => {
    var upperValue = key.toUpperCase();
    if (upperValue && upperValue.includes('AMOUNT')) {
      return formatCurency(value);
    }
    return value;
  };
  const dataReturn = (dataEntry) => {
    try {
      const arrReturn = [];
      const notIn = ['requestBody', 'sizeMore4000', 'requestBodyLarge'];
      const result = Object.keys(dataEntry).map((key) => {
        if (!notIn.includes(key)) arrReturn.push({ name: t('common.modelPayments.' + key), value: dataEntry[key] });
      });
      return arrReturn;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const showDetailValue1 = () => {
    var listTag = [];
    var rowIndex = 0;
    const result = valueDetail;
    if (showDetail) {
      if (result) {
        setTextValueContent(result.requestBody);
        const values = dataReturn(result);
        values.forEach((item) => {
          rowIndex++;
          var tableRow = (
            <TableRow key={rowIndex}>
              <TableCell className="align-middle text-center no-wrap-box">
                <b>{item.name}:</b>
              </TableCell>
              <TableCell className="align-middle text-center no-wrap-box">{item.value}</TableCell>
            </TableRow>
          );
          listTag.push(tableRow);
        });
        return listTag;
      }
    }
  };
  const buildElementRowsOut = () => {
    var listTag = [];
    var rowIndex = 0;
    const listElements = pageInfoOut;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className="align-middle text-center no-wrap-box">{object.id}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.messageIdentifier}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <Link To="#" style={{ cursor: 'pointer' }} onClick={(e) => handleShowDetail(e, object)}>
                ...{formatValue(object.senderReference)}
              </Link>
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.senderDatetime}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.receiverId}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;

    const listElements = pageInfo;
    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;
        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className="align-middle text-center no-wrap-box">{object.id}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.messageIdentifier}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <Link To="#" style={{ cursor: 'pointer' }} onClick={(e) => handleShowDetail(e, object)}>
                ...{formatValue(object.senderReference)}
              </Link>
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.senderDatetime}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.senderId}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  const getMessageInput = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.get(inputMessageId).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfo(response.data);
      },
      (error) => {}
    );
    // });
  };
  const getMessageOutput = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.getOutPut(inputMessageId).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfoOut(response.data);
      },
      (error) => {}
    );
    // });
  };
  if ((!pageInfo || pageInfo.length === 0) && (!pageInfoOut || pageInfoOut.length === 0)) {
    return <NoData />;
  }
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Incoming Message
            </Typography>
            <ShortTable
              headers={headers}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={buildElementRows}
              property={property}
              row={rowTables}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Outgoing Message
            </Typography>
            <ShortTable headers={headersOut} property={property} row={rowTables} buildElementRows={buildElementRowsOut} />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Detail Transaction
            </Typography>
            <ShortTable headers={headers1} buildElementRows={showDetailValue1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TeraboxText defaultText={textValueContent} txtLabel={t('common.modelPayments.contentBody')} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessageInputDetail;
