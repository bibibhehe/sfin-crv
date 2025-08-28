// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { TableCell, TableRow, Grid, TextField, Button, CircularProgress } from '@mui/material';
import ServiceAlert from 'common/ServiceAlert';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import { chipColorByInvestigationParticipantStatus } from 'common/GuiUtils';

import defaultSettings from 'defaultSetting';
import BankInfo from 'ui-component/BankDisplay';
import MyTable from 'ui-component/MyTable';
import ParticipantEndpointService from 'services/ParticipantEndpoint.service';
import ParticipantEndpointModal from './ParticipantEndpointModal';
import confirmDelete from 'utils/confirmDelete.ts';

const ParticipantEndpointPage = () => {
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
    keyword: ''
  });

  const { t, i18n } = useTranslation();

  const headers = ['', 
    t('common.element.numbering'), 
    t('common.element.participantId'), 
    t('common.element.instructingStatus'),
    t('common.element.instructedStatus'),
    t('common.element.modifDateTime')
    ];

  const listAllElements = () => {
      ParticipantEndpointService.search(paging, filtersInput).then(
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

  useEffect(() => {
    listAllElements();
  }, [filtersInput]);

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };

  const handleSync = () => {
    handleChangePage(null, 0);
  }

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

  const doDeleteElement = (elementId) => {
    ParticipantEndpointService.delete(elementId).then(
      (response) => {
        ServiceAlert.success('Thông báo', "Xóa thành công");
        listAllElements();
      },
      (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        ServiceAlert.error('Lỗi', message);
      }
    );
  }

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

        var tableRow = (
          <TableRow key={rowIndex}>
            <TableCell className="align-middle text-center no-wrap-box">
              <ParticipantEndpointModal id={object.id} reloadParent={listAllElements} action='edit' />
              <Button onClick={() => {confirmDelete(object.id, object.participantId, doDeleteElement)}} variant="outlined">
                <RemoveIcon color='error'/>
              </Button>
            </TableCell>
            <TableCell scope="row" className="align-middle text-center">
              {paging.size * paging.page + rowIndex}
            </TableCell>
            <TableCell className="align-middle text-center no-wrap-box"><BankInfo bankId={object.participantId} /></TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByInvestigationParticipantStatus(object.instructingStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{chipColorByInvestigationParticipantStatus(object.instructedStatus)}</TableCell>
            <TableCell className="align-middle text-center no-wrap-box">{object.modifDate}</TableCell>
          </TableRow>
        );

        listTag.push(tableRow);
      });
    }

    return listTag;
  };

  return (
    <MainCard title={t('main.participantEndpoint.title')}>
      <Grid container spacing={gridSpacing}>        
        <Grid item>
          <TextField
            name="keyword"
            label={t('common.element.keyword')}
            onChange={(event) => {
              onFiltersInputChange(event);
            }}
          />
        </Grid>

        <Grid item>
          <ParticipantEndpointModal reloadParent={listAllElements} action='add' />
        </Grid>

        <Grid item xs={12} sm={12}>
            {isLoading?
            <CircularProgress />:
            <MyTable 
              headers={headers}
              totalElements={pageInfo.totalElements}
              paging={paging}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              buildElementRows={buildElementRows}
            />
            }
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ParticipantEndpointPage;
