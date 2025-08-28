import { useTranslation } from 'react-i18next';
import { Button, FormGroup, Grid, InputAdornment, TextField } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
import { useState } from 'react';
import SystemParameterConfigService from 'services/SystemParameterConfig.service';
import MainCard from 'ui-component/cards/MainCard';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { parse, format } from 'date-fns';
import ServiceAlert from 'common/ServiceAlert';

const SystemParametersPage = (props) => {
  const { t, i18n } = useTranslation();
  const [listParams, setListParams] = useState([]);

  const loadCurrentConfig = () => {
    SystemParameterConfigService.getGroup(props.groupName).then(
      (response) => {
        setListParams(response.data);
      },
      (error) => { }
    );
  };

  useEffect(() => {
    loadCurrentConfig();
  }, [props.groupName]);

  const onInputChange = (event) => {
    const listParamsNew = [...listParams];
    const param = listParamsNew.find(({ name }) => name === event.target.name);

    if (param.inputType === 'checkbox') {
      param.val = event.target.checked ? '1' : '0';
    } else {
      param.val = event.target.value;
    }

    setListParams(listParamsNew);
  };

  const onTimeChange = (inputName, value, inputFormat) => {
    const listParamsNew = [...listParams];

    const param = listParamsNew.find(({ name }) => name === inputName);
    param.val = format(value, inputFormat);
    setListParams(listParamsNew);
  };

  const saveForm = (e) => {
    e.preventDefault();

    let paramObj = listParams.find(({ name }) => name === e.target.name);

    SystemParameterConfigService.put(props.groupName, paramObj.name, paramObj.val).then(
      (response) => {
        ServiceAlert.info(response.data.message);
       },
      (error) => { 
        ServiceAlert.errorDefault(response.data.message);
      }
    );
  };

  const genCommonSelectOption = (valuesString) => {
    const listValues = valuesString.split(',');
    var selectRet = [];
    if (listValues != null && listValues.length > 0) {
      listValues.forEach((selectValue) => {
        selectRet.push(<option key={selectValue}>{selectValue}</option>);
      });
    }

    return selectRet;
  };

  const genFormInput = () => {
    var listInputs = [];

    if (listParams != null && listParams.length > 0) {
      listParams.forEach((paramObj) => {
        let inputForm = null;
        if (
          paramObj.inputType === 'text'
        ) {
          inputForm = (
                <TextField
                  fullWidth
                  variant='standard'
                  name={paramObj.name}
                  label={i18n.language==='vi'?paramObj.title:paramObj.titleEn}
                  value={paramObj.val}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">{i18n.language==='vi'?paramObj.valUnit:paramObj.valUnitEn}</InputAdornment>,
                  }}
                  helperText={i18n.language==='vi'?paramObj.description:paramObj.descriptionEn}
                  onChange={(event) => {
                    onInputChange(event);
                  }}
                />
          );
        } else if (
          paramObj.inputType === 'number'
        ) {
          inputForm = (
                <TextField
                  fullWidth
                  type="number"
                  variant='standard'
                  name={paramObj.name}
                  label={i18n.language==='vi'?paramObj.title:paramObj.titleEn}
                  value={paramObj.val}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">{i18n.language==='vi'?paramObj.valUnit:paramObj.valUnitEn}</InputAdornment>,
                    min: paramObj.valMin,
                    max: paramObj.valMax
                  }}
                  helperText={i18n.language==='vi'?paramObj.description:paramObj.descriptionEn}
                  onChange={(event) => {
                    onInputChange(event);
                  }}
                />
          );
        } else if (paramObj.inputType === 'time') {
          inputForm = (
                <TimePicker ampm={false} 
                fullWidth
                name={paramObj.name}
                value={parse(paramObj.val, 'HH:mm:ss', new Date())}
                views={['hours', 'minutes', 'seconds']}
                timeSteps={{minutes: 1, seconds: 1}}
                label={i18n.language==='vi'?paramObj.title:paramObj.titleEn}
                onChange={(value) => {
                  onTimeChange(paramObj.name, value, 'HH:mm:ss');
                }}
                />
          );
        } else if (paramObj.inputType === 'datetime') {
          inputForm = (
                <DateTimePicker ampm={false} 
                value={parse(paramObj.val, 'yyyy-MM-dd HH:mm:ss', new Date())}
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                timeSteps={{minutes: 1, seconds: 1}}
                label={i18n.language==='vi'?paramObj.title:paramObj.titleEn}
                onChange={(value) => {
                  onTimeChange(paramObj.name, value, 'yyyy-MM-dd HH:mm:ss');
                }}
                />
          );
        } else if (paramObj.inputType === 'date') {
          inputForm = (
                <DatePicker
                value={parse(paramObj.val, 'yyyy-MM-dd', new Date())}
                label={i18n.language==='vi'?paramObj.title:paramObj.titleEn}
                onChange={(value) => {
                  onTimeChange(paramObj.name, value, 'yyyy-MM-dd');
                }}
                />
          );
        }

        if(inputForm != null)
          listInputs.push(
            <>
            <Grid item xs={10}>
              {inputForm}
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" size='large' name={paramObj.name} color="primary" onClick={saveForm}>
                  {t('common.button.save')}
                </Button>
            </Grid>
            </>
          );
      });
    }

    return listInputs;
  };

  return (
    <MainCard title={props.pageTitle}>
      <Grid container spacing={gridSpacing}>
        {genFormInput()}
      </Grid>
    </MainCard>
  );
};

export default SystemParametersPage;
