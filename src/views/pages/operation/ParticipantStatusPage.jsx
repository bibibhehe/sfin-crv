// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField, Button, CircularProgress } from '@mui/material';
import ServiceAlert from 'common/ServiceAlert';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import { chipColorByInvestigationParticipantStatus } from 'common/GuiUtils';

import defaultSettings from 'defaultSetting';
import BankInfo from 'ui-component/BankDisplay';
import MyTable from 'ui-component/MyTable';
import ParticipantEndpointService from 'services/ParticipantEndpoint.service';
import { ParticipantStatusSelectionNoLabel } from 'ui-component/ParticipantStatusSelection';
import { confirmAlert } from 'react-confirm-alert';

const ParticipantStatusPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0
  });

  const [paging, setPaging] = useState({
    page: 0,
    size: defaultSettings.pageSize,
    sort: 'participantId,asc'
  });
  const [filtersInput, setFiltersInput] = useState({
    shortName: '',
    codeName: '',
    participantId: ''
  });

  const { t, i18n } = useTranslation();

  const headers = [
    t('common.element.numbering'),
    t('common.element.participantId'),
    t('common.element.instructingStatus'),
    t('common.element.instructedStatus'),
    t('common.element.modifDateTime')
  ];

  const listAllElements = () => {
    ParticipantEndpointService.searchStatusOnly(paging, filtersInput).then(
      (response) => {
        setIsLoading(false);
        setPageInfo(response.data);
      },
      (error) => {
        setIsLoading(false);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
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

  const doChangeStatus = (elementId, direction, status) => {
    ParticipantEndpointService.patchStatus(elementId, direction, status).then(
      (response) => {
        ServiceAlert.success('Thông báo', 'Đã chuyển trạng thái');
        listAllElements();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
      }
    );
  };

  const onChangeStatus = (name, id, value) => {
    confirmAlert({
      title: t('common.alert.confirm'),
      message: t('main.participantStatus.alertChange') + value,
      buttons: [
        {
          label: t('common.button.ok'),
          onClick: () => {
            doChangeStatus(id, name, value);
          }
        },
        {
          label: t('common.button.close')
        }
      ],
      overlayClassName: 'overlay-confirm-logout-alert'
    });
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
            <TableCell scope="row" className="align-middle text-center">
              {paging.size * paging.page + rowIndex}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <BankInfo bankId={object.participantId} />
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <ParticipantStatusSelectionNoLabel
                value={object.instructingStatus}
                name="INSTRUCTING_STATUS"
                id={object.id}
                onChange={onChangeStatus}
              />
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">
              <ParticipantStatusSelectionNoLabel
                value={object.instructedStatus}
                name="INSTRUCTED_STATUS"
                id={object.id}
                onChange={onChangeStatus}
              />
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.modifDate}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={t('main.participantStatus.title')}>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <TextField
            name="participantId"
            label={t('common.element.participantId')}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item>
          <Button onClick={handleSync} size="large" variant="contained" startIcon={<SearchIcon />}>
            {t('common.button.filter')}
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <MyTable
              headers={headers}
              totalElements={pageInfo.totalElements}
              paging={paging}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={buildElementRows}
            />
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ParticipantStatusPage;
