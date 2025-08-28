import HisMessageInputService from 'services/HisMessageInput.service';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { TableCell, TableRow, Paper, TextField, Button } from '@mui/material';
import ShortTable from 'ui-component/tables/ShortTable';
import NoData from 'ui-component/loadingpages/nodata';
import { gridSpacing } from 'store/constant';
import { formatCurency, chipColorByAchSettleStatus } from 'common/GuiUtils';
import ListTable from 'ui-component/tables/ListTable';

const MessagesRefund = (props) => {
  const inputMessageId = props.inputMessageId;
  const [showDetail, setshowDetail] = useState(true);
  useEffect(() => {
    if (props.isActive) getMessageInput();
  }, [props.isActive]);

  const { t, i18n } = useTranslation();
  const [pageInfo, setPageInfo] = useState(null);

  const headers = [
    'ID',
    t('common.element.caseId'),
    t('common.modelPayments.PayUpdateMessage.transactionStatus'),
    t('common.modelPayments.isoMess.refNo'),
    t('common.element.originTransRef'),
    t('common.element.transactionAmount'),
    t('common.element.settlementAmount'),
    t('common.element.acceptDateTime')
  ];
  const headers1 = [t('common.modelPayments.detailTransaction'), ''];

  const [property, setproperty] = useState({
    maxHeight: '230px'
  });
  const [contentShowDetail, setcontentShowDetail] = useState(null);
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
  const handleShowDetail = (event, object) => {
    setcontentShowDetail(object);
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
            <TableCell className="align-middle text-center no-wrap-box">{object.caseId}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByAchSettleStatus(object.transactionStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <Link To="#" style={{ cursor: 'pointer' }} onClick={(e) => handleShowDetail(e, object)}>
                {object.refNo}
              </Link>
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.originTransRef}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{formatCurency(object.transactionAmount)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{formatCurency(object.settlementAmount)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.acceptDatetime}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };
  const getMessageInput = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.getRefund(inputMessageId).then(
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

      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <ListTable data={contentShowDetail} title={t('common.modelPayments.detailTransaction')} rowData={2} linkText="common.element" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessagesRefund;
