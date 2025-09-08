// project imports
import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SelectBoxAuto from 'ui-component/inputs/selectBoxAuto';
import TextField from 'ui-component/inputs/CustomTextField';

const SearchForm = (props) => {
  const initFilterInput = () => ({
    platformId: '',
    username: '',
  });
  const [filtersInput, setFiltersInput] = useState(initFilterInput);
  const handleSync = () => {
    const newfiltersInput = {};
    const arr = ['dateFrom', 'dateTo'];
    for (let key in filtersInput) {
      if (arr.indexOf(key) > -1) {
        newfiltersInput[key] = filtersInput[key].toISOString().split('T')[0];
      } else newfiltersInput[key] = filtersInput[key];
    }
    props.handleSearch1(newfiltersInput);
  };
  const listStatus = [
    { id: 'PENDING_CREATE', name: 'PENDING_CREATE', disabled: false },
    { id: 'PENDING_DELETE', name: 'PENDING_DELETE', disabled: false },
    { id: 'PENDING_UPDATE', name: 'PENDING_UPDATE', disabled: false },
    { id: 'APPROVED', name: 'APPROVED', disabled: false },
    { id: 'REJECT', name: 'REJECT', disabled: false }
  ];
  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  return (
    <>
      {/* <br /> */}
      <Grid item xs={10} justifyContent="center" alignItems="center" container style={{ margin: 'auto' }}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
            <Grid item xs={12} md={3.5}>
              <SelectBoxAuto
                name="platformId"
                value={filtersInput['platformId']}
                label="Platform"
                object={props.dataPlatform}
                showEm="1"
                fullWidth
                onChange={(event) => {
                  onFiltersInputChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12} md={3.5}>
              <TextField
                name="username"
                label="Tài khoản"
                value={filtersInput['username']}
                fullWidth
                onChange={(event) => {
                  onFiltersInputChange(event);
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} container>
              <Button component="label" onClick={handleSync} variant="contained" tabIndex={-1} startIcon={<SearchIcon />}>
                Lọc
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForm;
