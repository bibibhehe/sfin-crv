import HisMessageInputService from 'services/HisMessageInput.service';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { TableCell, TableRow, Paper, TextField, Button } from '@mui/material';
import ShortTable from 'ui-component/tables/ShortTable';
import { styled, alpha } from '@mui/material/styles';

import Link from '@mui/material/Link';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import NoData from 'ui-component/loadingpages/nodata';
import { gridSpacing } from 'store/constant';
import { chipColorByRespCode, chipColorByAchSettleStatus } from 'common/GuiUtils';

const MessagePaymentUpdate = (props) => {
  const inputMessageId = props.inputMessageId;
  const [showDetail, setshowDetail] = useState(true);
  useEffect(() => {
    if (props.isActive) getMessageInput();
  }, [props.isActive]);

  const { t, i18n } = useTranslation();
  const [pageInfo, setPageInfo] = useState(null);

  const headers = [
    t('common.modelPayments.PayUpdateMessage.transactionReference'),
    t('common.modelPayments.PayUpdateMessage.shortedTransactionReference'),
    t('common.modelPayments.PayUpdateMessage.transactionStatus'),
    t('common.modelPayments.PayUpdateMessage.creditorResponseCode'),
    t('common.modelPayments.PayUpdateMessage.modifDatetime')
  ];
  const headers1 = [
    // t('common.modelPayments.numbering'),
    t('common.modelPayments.detailTransaction'),
    ''
  ];
  const [property, setproperty] = useState({
    maxHeight: '200px'
  });
  const [property1, setproperty1] = useState({
    maxHeight: '1000px'
  });
  const [textValueContent, setTextValueContent] = useState('');

  const handleChangeContent = (event) => {
    setTextValueContent(event.target.value);
  };
  const [paging, setPaging] = useState({
    // page: 0,
    // size: defaultSettings.pageSize,
    // sort: 'id,desc'
  });
  const handleChangeRowsPerPage = (event) => {};
  const handleChangePage = (event, newPage) => {};
  const handleShowDetail = (event, value) => {
    showDetailValue(true);
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
            <TableCell className="align-middle text-center no-wrap-box">{object.transactionReference}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.shortedTransactionReference}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByAchSettleStatus(object.transactionStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByRespCode(object.creditorResponseCode)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.modifDatetime}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  const getMessageInput = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.getPaymentUpdate(inputMessageId).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfo(response.data);
      },
      (error) => {}
    );
    // });
  };
  if (!pageInfo || pageInfo.length === 0) {
    return <NoData />;
  }
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <ShortTable
              headers={headers}
              totalElements={pageInfo.totalElements}
              paging={paging}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={buildElementRows}
              property={property}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessagePaymentUpdate;
