import HisMessageInputService from 'services/HisMessageInput.service';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { TableCell, TableRow, Paper, TextField, Button } from '@mui/material';
import ShortTable from 'ui-component/tables/ShortTable';
import { styled, alpha } from '@mui/material/styles';

import Link from '@mui/material/Link';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import NoData from 'ui-component/loadingpages/nodata';
import MyTable from 'ui-component/MyTable';
import { gridSpacing } from 'store/constant';
import ListTable from 'ui-component/tables/ListTable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const MessageIsoMes = (props) => {
  const inputMessageId = props.inputMessageId;
  const [showDetail, setshowDetail] = useState(true);
  useEffect(() => {
    if (props.isActive) getMessageInput();
  }, [props.isActive]);

  const { t, i18n } = useTranslation();
  const [pageInfo, setPageInfo] = useState(null);

  const [textValueContent, setTextValueContent] = useState('');
  const [textValueContent210, setTextValueContent210] = useState('');

  const handleChangeContent = (event) => {
    setTextValueContent(event.target.value);
  };
  const convertObjectAmount = (dataEntry) => {
    try {
      let objectReturn = {};
      Object.entries(dataEntry).forEach(([key, value]) => {
        var upperValue = key.toUpperCase();
        if (upperValue && upperValue.includes('AMOUNT')) {
          if (value != null) {
            // let strAsString = value.toString();
            // let slicedStr = strAsString.slice(0, -2);
            objectReturn[key] = value / 100;
            // console.log(key + ': ' + objectReturn[key]);
          } else objectReturn[key] = value;
        } else {
          objectReturn[key] = value;
        }
      });
      // console.log(objectReturn);
      return objectReturn;
    } catch (error) {
      // console.log(error);
      return dataEntry;
    }
  };
  const getMessageInput = () => {
    // setIsLoading(true, () => {
    HisMessageInputService.getOutISO(inputMessageId).then(
      (response) => {
        //   setIsLoading(false);
        setPageInfo(response.data);
        var result = null;
        var result1 = null;
        try {
          result = response.data.find((b) => b.mti === '0200');
          result1 = response.data.find((b) => b.mti === '0210');
        } catch (error) {
          result = null;
          result1 = null;
        }

        setTextValueContent(convertObjectAmount(result));
        setTextValueContent210(convertObjectAmount(result1));
      },
      (error) => {}
    );
    // });
  };
  if (!pageInfo || pageInfo.length === 0) {
    return <NoData />;
  }
  return (
    <Box>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <ListTable
              data={textValueContent}
              title={t('common.modelPayments.isoMess.isoMessIncoming')}
              rowData={2}
              linkText="common.modelPayments.isoMess"
            />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <ListTable
              data={textValueContent210}
              title={t('common.modelPayments.isoMess.isoMessOutgoing')}
              rowData={2}
              linkText="common.modelPayments.isoMess"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MessageIsoMes;
