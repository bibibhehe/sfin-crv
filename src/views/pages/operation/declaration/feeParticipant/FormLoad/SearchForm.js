// project imports
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import SelectBox from 'ui-component/inputs/selectBox';

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
    // margin: '0 3px',
    cursor: 'pointer'
  }
});

const SearchForm = (props) => {
  const { t } = useTranslation();
  const [filtersInput, setFiltersInput] = useState({
    bic: '',
    busniessSvcType: ' ',
    tariffPlanId: ' '
  });

  const handleSync = () => {
    props.handleSearch1(filtersInput);
  };
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={3}>
            <TextField
              name="bic"
              label={t('common.element.bic')}
              fullWidth
              onChange={(event) => {
                onFiltersInputChange(event);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SelectBox
              name="busniessSvcType"
              value={filtersInput['busniessSvcType']}
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
              name="tariffPlanId"
              value={filtersInput['tariffPlanId']}
              label="Biểu phí"
              object={props.typeFee}
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
