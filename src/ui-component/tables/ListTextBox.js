import { Grid } from '@mui/material';
import ElementDetail from 'ui-component/extended/ElementDetail';
// import ElementBankDetail from 'ui-component/ElementBankDetail';
import { useTranslation } from 'react-i18next';
import { formatCurency } from 'common/GuiUtils';
import { useGlobalData } from 'provider/GlobalProvider';

const ListTextBox = (data, linkText, rowData) => {
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
  const showStatusDCBS = (value) => {
    var valueReturn = value;
    try {
      const bank = listTransactionType.find((b) => b.id === value);
      valueReturn = bank.name;
    } catch (error) {
      // console.log(error);
    }
    return valueReturn;
  };
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
  const formatbankId = ['acqId', 'issId', 'benId'];
  const formatDCBSStatus = ['transactionType'];

  const ValueCheck = (key, value) => {
    var upperValue = key.toUpperCase();
    if (upperValue && upperValue.includes('AMOUNT')) {
      return formatCurency(value);
    }
    if (formatDCBSStatus.includes(key)) {
      const value1 = showStatusDCBS(value);
      return value1;
    }
    if (formatbankId.includes(key)) {
      const value1 = showBankInf(value);
      return value1;
    }
    return value;
  };
  const dataEntry = data.data;
  const dataReturn = () => {
    try {
      return Object.keys(dataEntry).map((key) => (
        <>
          <Grid item xs={12} md={data.rowData}>
            <ElementDetail key={key} md={rowData} primary={t(data.linkText + '.' + key)} secondary={ValueCheck(key, dataEntry[key])} />
          </Grid>
        </>
      ));
    } catch (error) {
      return null;
    }
  };

  return (
    <Grid container item spacing={2}>
      {dataReturn()}
    </Grid>
  );
};

export default ListTextBox;
