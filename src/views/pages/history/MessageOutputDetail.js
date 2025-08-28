import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ElementDetail from 'ui-component/extended/ElementDetail';
import ElementBankDetail from 'ui-component/ElementBankDetail';
import { messageStatusWithDesc } from 'business-define/message-processing-status.ts';

const MessageOutputDetail = (props) => {
  const messageOutputDetail = props.message;

  const { t, i18n } = useTranslation();
  return (
    <Box sx={{ pt: 2}}>
      {messageOutputDetail != null && (
        <Grid container spacing={2}>
          <Grid container item spacing={2}>
            <ElementDetail md={4}
              primary={t('common.element.creationDateTime')}
              secondary={messageOutputDetail.creationDatetime}
            />
            <ElementDetail md={4}
              primary={t('common.element.modifDateTime')}
              secondary={messageOutputDetail.modifDatetime}
            />
            <ElementDetail md={4}
              primary={t('common.element.responseDateTime')}
              secondary={messageOutputDetail.respDatetime}
            />

            <ElementDetail md={4}
              primary='Global trace'
              secondary={messageOutputDetail.globalTrace}
            />
            <ElementDetail md={4}
              primary='Reference id'
              secondary={messageOutputDetail.referenceId}
            />
            <ElementDetail md={4}
              primary='Trace number'
              secondary={messageOutputDetail.traceNo}
            />

            <ElementBankDetail md={4}
              primary='Requested id'
              secondary={messageOutputDetail.participantId}
            />
            <ElementDetail md={4}
              primary={t('common.element.processingMessageStatus')}
              secondary={messageStatusWithDesc(messageOutputDetail.status)}
            />
            
            <ElementDetail md={4}
              primary='Operation'
              secondary={messageOutputDetail.operation}
            />

            <ElementBankDetail md={4}
              primary='Requestor id'
              secondary={messageOutputDetail.requestorId}
            />
            <ElementDetail md={4}
              primary='Requestor name'
              secondary={messageOutputDetail.requestorName}
            />
            <ElementBankDetail md={4}
              primary='Sender id'
              secondary={messageOutputDetail.senderId}
            />

            <ElementBankDetail md={4}
              primary='Acq id'
              secondary={messageOutputDetail.acqId}
            />
            <ElementDetail md={4}
              primary='Card no'
              secondary={messageOutputDetail.cardNo}
            />
            <ElementDetail md={4}
              primary='Response Card no'
              secondary={messageOutputDetail.responseCardNo}
            />

            <ElementDetail md={4}
              primary='Result id'
              secondary={messageOutputDetail.respResultId}
            />

            <ElementDetail md={4}
              primary='Term id'
              secondary={messageOutputDetail.termId}
            />
            <ElementDetail md={4}
              primary='Local date'
              secondary={messageOutputDetail.localDate}
            />
            <ElementDetail md={4}
              primary='Local time'
              secondary={messageOutputDetail.localTime}
            />

            <ElementDetail md={4}
              primary='Result code'
              secondary={messageOutputDetail.respResultCode}
            />
            <ElementDetail md={4}
              primary='Result description'
              secondary={messageOutputDetail.respResultDesc}
            />
            <ElementDetail md={4}
              primary='Result message'
              secondary={messageOutputDetail.respResultMessage}
            />

            <ElementDetail md={4}
              primary={t('common.element.processingDetail')}
              secondary={messageOutputDetail.processingDetail}
            />
            <ElementDetail md={4} primary="ID" secondary={messageOutputDetail.id} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default MessageOutputDetail;