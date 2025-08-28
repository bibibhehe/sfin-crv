// project imports
// import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { gridSpacing } from 'store/constant';
import { Grid, TextField, Button } from '@mui/material';
import SelectBox from 'ui-component/inputs/selectBox';

const useStyles = makeStyles({
  icons: {
    // margin: '0 3px',
    cursor: 'pointer'
  }
});

const ParticapantModify = ({
  filtersInput,
  setFiltersInput,
  handleAddTCTV,
  isTab,
  handleEditTCTV,
  handleDetailTCTV,
  loadingButton,
  loadingButtonClick
}) => {
  const { t } = useTranslation();
  useEffect(() => {}, []);

  const typeActive = [
    { id: 'ACTIVE', name: 'ACTIVE', disabled: false },
    { id: 'INACTIVE', name: 'INACTIVE', disabled: false }
  ];
  const typeActive0 = [
    { id: 'ACTIVE', name: 'ACTIVE', disabled: false },
    { id: 'INACTIVE', name: 'INACTIVE', disabled: false },
    { id: 'NO', name: 'NO', disabled: false }
  ];
  const typeDirect = [
    { id: 'DIRECT', name: 'DIRECT', disabled: false },
    { id: 'INDIRECT', name: 'INDIRECT', disabled: false }
  ];
  const formatShow = [
    { name: 'participantCode', type: 'text', object: null, required: true, show: true },
    { name: 'shortName', type: 'text', object: null, required: true, show: true },
    { name: 'citadCode', type: 'text', object: null, required: true, show: true },
    { name: 'legalName', type: 'text', object: null, required: true, show: true },
    { name: 'legalNameEn', type: 'text', object: null, required: true, show: true },
    { name: 'url', type: 'text', object: null, required: true, show: true },
    { name: 'debitStatus', type: '', object: typeActive, required: true, show: true },
    { name: 'creditStatus', type: '', object: typeActive, required: true, show: true },
    { name: 'incomingStatus', type: '', object: typeActive0, required: true, show: true },
    { name: 'outgoingStatus', type: '', object: typeActive0, required: true, show: true },
    { name: 'username', type: 'text', object: null, required: true, show: true },
    { name: 'password', type: 'password', object: null, required: true, show: isTab == 1 ? true : false },
    { name: 'napasUsername', type: 'text', object: null, required: true, show: true },
    { name: 'napasPassword', type: 'password', object: null, required: true, show: isTab == 1 ? true : false },
    { name: 'rsaScert', type: 'text', object: null, required: true, show: true },
    { name: 'settlementType', type: '', object: typeDirect, required: true, show: true }
  ];
  const listShowForm = formatShow.filter((item) => item.show);
  const renderInputFieldValue = (field, index) => (
    <Grid key={index} item xs={12} md={6}>
      {renderInputField(field.name, field.type, field.object)}
    </Grid>
  );
  const renderInputFields = () => {
    const gridItems = [];
    for (let i = 0; i < listShowForm.length; i += 2) {
      const start = i;
      const end = Math.min(i + 2, listShowForm.length);
      const gridItem = (
        <>
          <Grid container spacing={2} key={i}>
            {listShowForm.slice(start, end).map(renderInputFieldValue)}
          </Grid>
          <br />
        </>
      );
      gridItems.push(gridItem);
    }
    return gridItems;
  };

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    setFiltersInput(newFiltersInput);
  };
  const renderInputField = (name, type = 'text', object) => {
    if (object != null) {
      return (
        <SelectBox
          name={name}
          value={filtersInput[name]}
          label={t('common.element.' + name)}
          object={object}
          showEm="0"
          disable={isTab == 2 ? true : false}
          onChange={(event) => {
            onFiltersInputChange(event);
          }}
        />
      );
    } else {
      return (
        <TextField
          type={type}
          name={name}
          required
          label={t('common.element.' + name)}
          value={filtersInput[name]}
          onChange={onFiltersInputChange}
          variant="outlined"
          fullWidth
          disabled={isTab == 2 ? true : false}
        />
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (isTab) {
      case 1:
        handleAddTCTV();
        break;
      case 2:
        handleDetailTCTV();
        break;
      case 3:
        handleEditTCTV();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          {renderInputFields()}
        </Grid>
        <br />
        <Grid item xs={12} container>
          {loadingButton ? (
            <Button variant="contained" size="large" disabled style={{ margin: 'auto' }}>
              Loading ...
            </Button>
          ) : (
            <Button variant="contained" size="large" type="submit" style={{ margin: 'auto' }}>
              Next
            </Button>
          )}
        </Grid>
      </form>
    </>
  );
};

export default ParticapantModify;
