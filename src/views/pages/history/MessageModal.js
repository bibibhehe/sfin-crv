import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ReactJson from 'react-json-view';
import { useTranslation } from 'react-i18next';


import HisMessageClobService from 'services/HisMessageClob.service';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const MessageModal = (props) => {
  const clobId = props.id;

  const [messageClob, setMessageClob] = useState(null);

  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMessageClob(null);
  };

  const getMessageContent = () => {
    // setIsLoading(true, () => {
    HisMessageClobService.get(clobId).then(
      (response) => {
        //   setIsLoading(false);
        setMessageClob(response.data.msgContent);
      },
      (error) => {
        //   setSuccessful(false);
      }
    );
    // });
  };

  useEffect(() => {
    if (open) getMessageContent();
  }, [open]);

  const messageClobJson = JSON.parse(messageClob);

  return (
    <>
        <Button onClick={handleOpen} variant="outlined">
        {t('common.button.view')}
        </Button>
        <Dialog
          style={{ zIndex: 1800 }}
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          maxWidth={'lg'}
        >
          <DialogTitle>
            {t('main.messageModal.title')}
          </DialogTitle>
          <DialogContent>
            <Box >
              {
                messageClobJson !== null && (
              <ReactJson src={messageClobJson}
                theme="google"
                name={false}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                style={{ wordBreak: 'break-all' }}></ReactJson>)
              }
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              {t('common.button.close')}
            </Button>
          </DialogActions>
        </Dialog>


    </>
  );
};

export default MessageModal;