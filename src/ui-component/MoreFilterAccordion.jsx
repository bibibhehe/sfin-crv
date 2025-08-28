import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const MoreFilterAccordion = (props) => {
    const { t, i18n } = useTranslation();

    return (
    <Accordion style={{ marginTop: 16 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{t('common.button.moreFilter')}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container spacing={gridSpacing}>
            {props.children}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
};

export default MoreFilterAccordion;
