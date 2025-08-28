import { Grid } from '@mui/material';
import ElementDetail from 'ui-component/extended/ElementDetail';
// import ElementBankDetail from 'ui-component/ElementBankDetail';
import { useTranslation } from 'react-i18next';
import { formatCurency } from 'common/GuiUtils';
import { useGlobalData } from 'provider/GlobalProvider';
import DownloadClick from 'ui-component/buttons/DownloadClick';
import { Typography } from '@mui/material';

const ListTextBox = (data) => {
  const { t } = useTranslation();
  const globalData = useGlobalData();

  if (!data) {
    return <div>No data available</div>;
  }
  const listTransactionType = [
    { id: 'ADJUSTMENT', name: 'Chuyển tiền', disabled: false },
    { id: 'ADJUSTMENT_RETURN', name: 'Hoàn trả', disabled: false },
    { id: 'VOID', name: 'Đảo', disabled: false }
  ];

  const showBankInf = (value) => {
    var valueReturn = value;
    try {
      const listNapasBank = globalData.listNapasBank;
      const bank = listNapasBank.find((b) => b.participantCode === value);
      valueReturn = bank.participantCode + ' - ' + bank.shortName;
    } catch (error) {
      // console.log(error);
    }
    return valueReturn;
  };

  const merchantBranchType = [
    { id: 'BRANCHED', name: 'Có phân cấp quầy' },
    { id: 'UNBRANCHED', name: 'Không phân cấp quầy' }
  ];

  const showObject = (key, id) => {
    if (key == 'merchantBranchType') {
      const type = merchantBranchType.find(item => item.id == id)
      return type ? type.name : null
    }
    if (key == 'transactionType') {
      const type = listTransactionType.find(item => item.id == id)
      return type ? type.name : null
    }
    return null
  }

  const formatbankId = ['acqId', 'issId', 'benId'];
  const formatObject = ['merchantBranchType', 'transactionType']
  function getNestedValue(obj, path) {
    try {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    } catch (error) {
      //
    }
    return null;
  }
  const ValueCheck = (key, value) => {
    var upperValue = key.toUpperCase();
    if (upperValue && upperValue.includes('AMOUNT')) {
      return formatCurency(value);
    }
    if (formatObject.includes(key)) {
      const value1 = showObject(key, value);
      return value1;
    }
    if (formatbankId.includes(key)) {
      const value1 = showBankInf(value);
      return value1;
    }
    if (formatObject.includes(key)) {
      const value1 = showObject(key, value);
      return value1;
    }

    return value;
  };
  const dataEntry = data.data;
  const listShow = data.listShow;

  const dataReturn = () => {
    var listTag = [];
    try {
      listShow.forEach((object) => {
        var tableRow = null;
        if (object.isDownload && object.isDownload == true) {
          tableRow = (
            <Grid item xs={12} md={data.rowData} key={object.id}>
              <Grid item md={data.rowData}>
                <Typography variant="h5">
                  {object.label} : {'    '}
                  <DownloadClick
                    text="File Đính Kèm"
                    nameFile={object?.nameFileDownload}
                    base64String={getNestedValue(dataEntry, object.base64String)}
                    mimeString={getNestedValue(dataEntry, object.mimeType)}
                  />
                </Typography>
              </Grid>
            </Grid>
          );
        } else {
          tableRow = (
            <>
              <Grid item xs={12} md={data.rowData} key={object.id}>
                <ElementDetail key={object.id} primary={object.label} secondary={ValueCheck(object.id, getNestedValue(dataEntry, object.id))} />
              </Grid>
            </>
          );
        }

        listTag.push(tableRow);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    return listTag;
  };

  return (
    <Grid container item spacing={2}>
      {dataReturn()}
    </Grid>
  );
};

export default ListTextBox;
