// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import HisMessageInputService from 'services/HisMessageInput.service';
import MessageInputModal from './MessageInputModal';
import { chipColorByMessageStatus, chipColorByResultCode } from 'common/GuiUtils';
import defaultSettings from 'defaultSetting';
import BankInfo from 'ui-component/BankDisplay';
import BankSelection from 'ui-component/BankSelection';
import MyTable from 'ui-component/MyTable';
import DateRangePicker from 'ui-component/daterangepicker/DateRangePicker';
import defaultDateRange from 'ui-component/daterangepicker/defaultDateRange.ts';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';
import MessageProcessStatusSelecion from 'ui-component/MessageProcessStatusSelecion';

const MessageInputPage = () => {
  const [message, setMessage] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0
  });
  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });
  const [filtersInput, setFiltersInput] = useState({
    requestorId: '',
    traceNo: '',
    globalTrace: '',
    respResultCode: '',
    messageProcessStatus: ''
  });

  const [filtersDateRange, setfiltersDateRange] = useState(defaultDateRange());

  const { t, i18n } = useTranslation();
  const headers = [
    '',
    t('common.element.numbering'),
    t('common.element.acceptDateTime'),
    t('common.element.debtorAccount'),
    'Requestor ID',
    'Trace no',
    'Result code',
    t('common.element.processingMessageStatus')
  ];

  const listAllElements = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.search(paging, filtersDateRange, filtersInput).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfo(response.data);
      },
      (error) => {
        setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());
      }
    );
    // });
  };

  useEffect(() => {
    listAllElements();
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

  const buildElementRows = () => {
    var listTag = [];
    var rowIndex = 0;

    const listElements = pageInfo.content;

    if (listElements != null && listElements.length > 0) {
      listElements.forEach((object) => {
        rowIndex++;

        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className="align-middle text-center no-wrap-box">
              <MessageInputModal message={object} />
            </TableCell>
            <TableCell scope="row" className="align-middle text-center">
              {paging.size * paging.page + rowIndex}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.acceptDatetime}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.cardNo}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <BankInfo bankId={object.senderId} />
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.traceNo}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByResultCode(object.respResultCode)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByMessageStatus(object.messageProcessStatus)}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={t('main.inputMessage.title')}>
      <Grid container spacing={gridSpacing}>
        <DateRangePicker defaultRange={filtersDateRange} onChange={setfiltersDateRange} xs={4} />
        <Grid item xs={3}>
          <TextField
            name="traceNo"
            label="Trace no"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <Button onClick={handleSync} size="large" variant="contained" style={{ height: '100%' }} startIcon={<SearchIcon />}>
            {t('common.button.filter')}
          </Button>
        </Grid>
      </Grid>

      <MoreFilterAccordion>
        <Grid item xs={3}>
          <BankSelection
            name="requestorId"
            value={filtersInput.requestorId}
            label="Requestor ID"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="globalTrace"
            label="Global trace"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="respResultCode"
            label="Result code"
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={3}>
        <MessageProcessStatusSelecion
            name="messageProcessStatus"
            value={filtersInput.messageProcessStatus}
            label="Message status"
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
      </MoreFilterAccordion>

      {/* <SubCard> */}
      {/* {isLoading?
            <CircularProgress />: */}
      <MyTable
        headers={headers}
        totalElements={pageInfo.totalElements}
        paging={paging}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        buildElementRows={buildElementRows}
      />
      {/* } */}
      {/* </SubCard> */}
    </MainCard>
  );
};

export default MessageInputPage;
