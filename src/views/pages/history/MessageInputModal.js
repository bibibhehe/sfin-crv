import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MessageInputDetail from './MessageInputDetail2';
import MessageOutputBoard from './MessageOutputBoard';

const MessageInputModal = (props) => {
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState('1');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTabIndex('1');
        setOpen(false);
    };

    const handleChangeTab = (event, newValue) => {
        setTabIndex(newValue);
    };

    const { t, i18n } = useTranslation();

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
                    {t('main.inputMessage.detailDialogTitle')}
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <TabContext value={tabIndex}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChangeTab}>
                                    <Tab label={t('common.tabTitle.detail')} value='1' />
                                    <Tab label={t('common.tabTitle.outputMessage')} value='2' />
                                </TabList>
                            </Box>
                            <TabPanel value='1'>
                                <MessageInputDetail id={props.message.id} isActive={open}/>
                            </TabPanel>
                            <TabPanel value='2'>
                                <MessageOutputBoard isActive={open} inputMessageId={props.message.id} />
                            </TabPanel>
                        </TabContext>
                    </Box>
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

export default MessageInputModal;