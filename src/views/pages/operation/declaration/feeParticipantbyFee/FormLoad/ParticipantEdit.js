import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SelectBox from 'ui-component/inputs/selectBox';
import TransferList from 'ui-component/inputs/TransferList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  RowSpacing: {
    marginTop: '10%',
    marginBottom: '10%'
  },
  textInputValue: {
    fontSize: '100px',
    fontWeight: '700'
  },
  nonBorder: {
    border: 'none',
    paddingBottom: '10px'
  },
  tabTitle: {
    fontStyle: 'italic',
    color: 'gray',
    fontSize: '1.1 rem',
    padding: '10px  0 0 0'
  }
});

const ParticipantEdit = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const object = props.data;
  const convertFormat = (value) => {
    let newArr = value;
    try {
      newArr = value.map((item) => item.split(' - ')[0]);
    } catch (error) {
      //
    }
    return newArr;
  };
  const getValueRight = (value) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput['bic'] = convertFormat(value);
    setFiltersInput(newFiltersInput);
  };
  const [filtersInput, setFiltersInput] = useState({
    businessSvcType: object.businessSvcType == null ? ' ' : object.businessSvcType,
    businessSvcCode: object.businessSvcCode == null ? ' ' : object.businessSvcCode,
    newTariffPlanId: object.tariffPlanId == null ? ' ' : object.tariffPlanId,
    oldTariffPlanId: object.tariffPlanId == null ? ' ' : object.tariffPlanId,
    bic: object.bic
  });
  useEffect(() => {
    props.handleChangeDataAction(filtersInput);
  }, [filtersInput]);

  const convertTypeBank = () => {
    const arr = props.typeBank;
    const newArray = [];
    arr.forEach((item) => {
      newArray.push(item.name);
    });
    return newArray;
  };
  const convertTypeBankRight = () => {
    const arr2 = props.data.bic;
    const arr = props.typeBank;
    const result = [];
    for (let index = 0; index < arr2.length; index++) {
      const element = arr2[index];
      const listInf = arr.map((item) => {
        if (item.id == element) result.push(item.name);
      });
    }

    return result;
  };

  const dataRight = () => {
    const newArray = [];
    try {
      const arrCompare2 = convertTypeBankRight();
      const arr1 = convertTypeBank();
      const newArray1 = arr1.filter((item) => arrCompare2.indexOf(item) === -1);
      newArray1.forEach((item) => {
        newArray.push(item);
      });
    } catch (error) {
      // console.log(error);
    }
    return newArray;
  };
  const data = {
    left: dataRight(),
    right: convertTypeBankRight()
  };

  const [DisableSelect, setDisableSelect] = useState(true);

  const onFiltersInputChange = (event) => {
    const newFiltersInput = { ...filtersInput };
    if (event.target.name === 'businessSvcType' && event.target.value == 'SPECIAL') {
      setDisableSelect(false);
      newFiltersInput[event.target.name] = event.target.value;
      setFiltersInput(newFiltersInput);
    } else if (event.target.name === 'businessSvcType' && event.target.value != 'SPECIAL') {
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
      <br />
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Thông tin biểu phí</legend>
        <br />
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <SelectBox
                name="newTariffPlanId"
                value={filtersInput['newTariffPlanId']}
                label="Biểu phí"
                object={props.typeFee}
                showEm="1"
                onChange={(event) => {
                  onFiltersInputChange(event);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <br />
      <Box component="fieldset" className={classes.nonBorder}>
        <legend className={classes.tabTitle}>Gán TCTV theo biểu phí</legend>
        <TransferList data={data} getValueRight={getValueRight} />
      </Box>
    </>
  );
};

export default ParticipantEdit;
