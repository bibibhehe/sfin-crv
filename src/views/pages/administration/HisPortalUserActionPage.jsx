// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ServiceAlert from 'common/ServiceAlert';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import HisPortalUserActionService from 'services/HisPortalUserAction.service';
import PortalUserActionService from 'services/PortalUserAction.service';

import defaultSettings from 'defaultSetting';
import DateRangePicker from 'ui-component/daterangepicker/DateRangePicker';
import defaultDateRange from 'ui-component/daterangepicker/defaultDateRange.ts';
import MyTable from 'ui-component/MyTable';
import { Box } from '@mui/system';
import MoreFilterAccordion from 'ui-component/MoreFilterAccordion';

const detailTableCellStyle = {
  width: 400,
  maxWidth: 400
};

const actionTableCellStyle = {
  width: 200,
  maxWidth: 200
};

const HisPortalUserActionPage = () => {
  const [message, setMessage] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });

  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'id,desc'
  });
  const [filtersInput, setFiltersInput] = useState({
    username: '',
    actionCode: '',
    actionDetail: ''
  });

  const [filtersDateRange, setfiltersDateRange] = useState(defaultDateRange());

  const [listPortalUserAction, setListPortalUserAction] = useState([]);

  const { t, i18n } = useTranslation();

  const headers = [
    '',
    t('common.element.numbering'),
    t('common.element.creationDateTime'),
    t('common.element.username'),
    t('common.element.portalUserAction'),
    t('common.element.detail')
  ];

  const listAllElements = () => {
    // setIsLoading(true, () => {
    HisPortalUserActionService.search(paging, filtersDateRange, filtersInput).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfo(response.data);
      },
      (error) => {
        setMessage((error.response && error.response.data && error.response.data.message) || error.message || error.toString());

        ServiceAlert.error('Lỗi', message);
      }
    );
    // });
  };

  const listAllUserAction = () => {
    PortalUserActionService.list().then(
      (response) => {
        //   setIsLoading(false);
        setListPortalUserAction(response.data);
      },
      (error) => { }
    );
  };

  useEffect(() => {
    listAllUserAction();
  }, []);

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

    if (
      listElements != null &&
      listElements.length > 0
      // && mapNapasMember != null && mapNapasMember.size > 0
      // && mapTariffPlan != null && mapTariffPlan.size > 0
    ) {
      listElements.forEach((object) => {
        rowIndex++;

        const userActionFound = listPortalUserAction.find(function (userAction) {
          return userAction.code === object.actionCode;
        });

        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className="align-middle text-center no-wrap-box"></TableCell>
            <TableCell scope="row" className="align-middle text-center">
              {paging.size * paging.page + rowIndex}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.actionDatetime}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.username}</TableCell>
            <TableCell className="align-middle" style={actionTableCellStyle}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{userActionFound != null ? userActionFound.description : object.actionCode}</pre>
            </TableCell>
            <TableCell className="align-middle" style={detailTableCellStyle}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{object.actionDetail}</pre>
            </TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title='Tra cứu lịch sử API'>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={7} container spacing={2} >
          <DateRangePicker defaultRange={filtersDateRange} onChange={setfiltersDateRange} xs={4} />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            name="username"
            label={t('common.element.username')}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item xs={12} md={1}>
          <Button onClick={handleSync} size="large" variant="contained" style={{ height: '100%' }} startIcon={<SearchIcon />}>
            {t('common.button.filter')}
          </Button>
        </Grid>
      </Grid>

      <MoreFilterAccordion>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="actionCode">{t('common.element.portalUserAction')}</InputLabel>
            <Select
              labelId="actionCode"
              name="actionCode"
              value={filtersInput.actionCode}
              label={t('common.element.portalUserAction')}
              onChange={onFiltersInputChange}
              fullWidth
            >
              <MenuItem value="" key={-1}></MenuItem>
              {listPortalUserAction.map((element, i) => (
                <MenuItem value={element.code} key={i}>
                  {element.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="actionDetail"
            label={t('common.element.detail')}
            fullWidth
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>
      </MoreFilterAccordion>

      <MyTable
        headers={headers}
        totalElements={pageInfo.totalElements}
        paging={paging}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        buildElementRows={buildElementRows}
      />
      {/* } */}
    </MainCard>
  );
};

export default HisPortalUserActionPage;
