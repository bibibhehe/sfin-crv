import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SelectBox from 'ui-component/inputs/selectBox';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
  RowSpacing: {
    marginTop: '10%',
    marginBottom: '10%'
  },
  textInputValue: {
    fontSize: '100px',
    fontWeight: '700'
  }
});

const ParticipantDetail = (props) => {
  const classes = useStyles();
  const object = props.data;
  const [data, setData] = useState(null);

  useEffect(() => {}, []);
  if (!object) return null;
  const renderBankInfo = () => {
    let result = '';
    let objectSend = object.bic;

    for (let index = 0; index < objectSend.length; index++) {
      let element = objectSend[index];
      try {
        let findValue = props.typeBank.find((a) => a.id === element);
        result += findValue.name + '\n';
      } catch (error) {
        result += element + '\n';
      }
    }
    // console.log(result);

    return result;
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} className={classes.RowSpacing}>
              <SelectBox
                name="busniessSvcType"
                value={object.businessSvcType}
                disable={true}
                label="Loại kênh"
                object={props.typebzSrc}
                showEm="1"
              />
            </Grid>

            <Grid item xs={12} className={classes.RowSpacing}>
              <SelectBox
                name="businessSvcCode"
                value={object.businessSvcCode == null ? ' ' : object.businessSvcCode}
                disable={true}
                label="Kênh"
                object={props.typeChannelId}
                showEm="1"
              />
            </Grid>
            <Grid item xs={12} className={classes.RowSpacing}>
              <SelectBox
                name="tariffPlanId"
                value={object.tariffPlanId}
                label="Biểu phí"
                disable={true}
                object={props.typeFee}
                showEm="1"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.textInputValue}
              label="TCTV"
              multiline
              disabled
              rows={20}
              fullWidth={true}
              defaultValue={renderBankInfo()}
              variant="filled"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ParticipantDetail;
