import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import MessageOutputDetail from './MessageOutputDetail';
import { useTranslation } from 'react-i18next';

const MessageOutputModal = (props) => {
    const [open, setOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant='outlined'>
                <MoreHorizOutlinedIcon />
            </Button>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth='xl'
                keepMounted
                fullWidth={true}
                style={{ zIndex: 1700 }}
            >
                <DialogTitle>
                    {t('main.outputMessage.detailDialogTitle')}
                </DialogTitle>
                <DialogContent>
                    <MessageOutputDetail message={props.message}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                    {t('common.button.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MessageOutputModal;