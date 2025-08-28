// project imports
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';
import { Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import SelectBox from 'ui-component/inputs/selectBox';

const SearchForm = (props) => {
  const { t } = useTranslation();
  const [filtersInput, setFiltersInput] = useState({
    businessSvcType: ' ',
    businessSvcCode: ' ',
    participant: ' '
  });
  const [DisableSelect, setDisableSelect] = useState(false);
  const handleSync = () => {
    props.handleSearch1(filtersInput);
  };
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    if (event.target.name === 'busniessSvcType' && event.target.value == 'SPECIAL') {
      setDisableSelect(false);
      newFiltersInput[event.target.name] = event.target.value;
      setFiltersInput(newFiltersInput);
    } else if (event.target.name === 'busniessSvcType' && event.target.value != 'SPECIAL') {
      newFiltersInput['businessSvcCode'] = ' ';
      newFiltersInput[event.target.name] = event.target.value;
      setFiltersInput(newFiltersInput);
      setDisableSelect(true);
    } else {
      newFiltersInput[event.target.name] = event.target.value;
      setFiltersInput(newFiltersInput);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={3}>
            <SelectBox
              name="businessSvcType"
              value={filtersInput['businessSvcType']}
              label="Loại kênh"
              object={props.typebzSrc}
              showEm="1"
              onChange={(event) => {
                onFiltersInputChange(event);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SelectBox
              name="businessSvcCode"
              value={filtersInput['businessSvcCode']}
              label="Kênh"
              disable={DisableSelect}
              object={props.typeChannelId}
              showEm="1"
              onChange={(event) => {
                onFiltersInputChange(event);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SelectBox
              name="participant"
              value={filtersInput['participant']}
              label="TCTV"
              object={props.typeBank}
              showEm="1"
              onChange={(event) => {
                onFiltersInputChange(event);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              component="label"
              onClick={() => handleSync()}
              role={undefined}
              size="large"
              variant="contained"
              tabIndex={-1}
              startIcon={<SearchIcon />}
            >
              {t('common.button.filter')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForm;
