import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, } from '@mui/material';
import ParticipantStatusSelection from 'ui-component/ParticipantStatusSelection';

const ParticipantEndpointDetail = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid container item spacing={2}>
          <Grid item md={12}>
            <TextField
              name="participantId"
              label={t('common.element.participantId')}
              value={props.participant?.participantId}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                props.onInputChange(event.target.name, event.target.value);
              }}
            />
          </Grid>

          <Grid item md={12}>
            <TextField
              name="url"
              label="URL"
              value={props.participant?.url}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                props.onInputChange(event.target.name, event.target.value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <ParticipantStatusSelection
              label={t('common.element.instructingStatus')}
              name="instructingStatus"
              value={props.participant?.instructingStatus}
              onChange={props.onInputChange}
            />
          </Grid>
          <Grid item md={12}>
            <ParticipantStatusSelection
              label={t('common.element.instructedStatus')}
              name="instructedStatus"
              value={props.participant?.instructedStatus}
              onChange={props.onInputChange}
            />
          </Grid>
          <Grid item md={12}>
            <TextField id="rsaEcert" label={t('common.element.rsaEcert')} 
            InputLabelProps={{
              shrink: true,
            }}
            name="rsaEcert"
            multiline fullWidth maxRows={12} value={props.participant?.rsaEcert} 
            onChange={(event) => {
              props.onInputChange(event.target.name, event.target.value);
            }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField id="rsaScert" label={t('common.element.rsaScert')} 
            InputLabelProps={{
              shrink: true,
            }}
            name="rsaScert"
            multiline fullWidth maxRows={12} value={props.participant?.rsaScert} 
            onChange={(event) => {
              props.onInputChange(event.target.name, event.target.value);
            }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ParticipantEndpointDetail;
