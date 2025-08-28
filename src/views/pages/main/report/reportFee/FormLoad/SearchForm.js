import { useState, useEffect} from 'react';
// import { useTranslation } from 'react-i18next';
import { Grid, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';
import SelectBox from 'ui-component/inputs/selectBox';
import CheckboxYesNo from 'ui-component/inputs/CheckboxYesNo';
import IosShareOutlined from '@mui/icons-material/IosShareOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
// import TextField from 'ui-component/inputs/CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import DateRangePicker from 'ui-component/inputs/DateRangePickerCustomer';

// import ServiceApi from 'services/ConfigReport/exportReport.service';
const useStyles = makeStyles({
  paddingSpace: {
    paddingTop: '10px'
  }
});
const SearchForm = (props) => {
  const classes = useStyles();
  const [localBranchsList, setLocalBranchsList] = useState(props.branchsList);
  const [localCashiersList, setLocalCashiersList] = useState(props.cashiersList);

  const [filtersInput, setFiltersInput] = useState({
    reportType: ' ',
    dvcntt: ' ',
    sessionBegin: new Date(new Date().setDate(new Date().getDate() - 1)),
    sessionEnd: new Date(new Date().setDate(new Date().getDate())),
    dvptml: ' ',
    tctt: '',
    typeFile: 'XLSX',
    invoices: false,
    branch: ' ',
    cashier: ' '
  });
  const configShow = props.configShow;
  const [showInput, setShowInput] = useState({
    SESSION_BEGIN: true,
    SESSION_END: true,
    TCTT: true,
    DVCNTT: true,
    DVPTML: true,
    BRANCH: true,
    CASHIER: true
  });

  const dataBankConvert = (a, b) => {
    if (a == null) return null;
    if (!a) return valueS;
    let result = null;
    if (Array.isArray(a) && Array.isArray(b)) {
      result = a
        .map((aItem) => {
          const match = b.find((bItem) => bItem.bankId === aItem.bankId);
          if (match) {
            return {
              id: aItem.bankId,
              name: aItem.bankId + ' - ' + aItem.bic + ' (' + aItem.bankFullNameVi + ')',
              disabled: false
            };
          }
          return null;
        })
        .filter((item) => item !== null);
    }

    return result;
  };
  const listBankObject = dataBankConvert(props.bankListNapas, props.bankList);
  const typeFileList = [
    { id: 'XLSX', name: 'XLSX', disabled: false },
    { id: 'PDF', name: 'PDF', disabled: false }
  ];
  const typeReport = props.reportType;
  const onFiltersInputChange = (event) => {
    console.log(event)
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    const name = event.target.name;
    const value = event.target.value;

    if (name == 'dvcntt') {
      newFiltersInput['branch'] = ' ';
      newFiltersInput['cashier'] = ' ';
      setLocalCashiersList([]);

      const id = convertTypeChange(props.bussiness, 'merchantCode', value);
      props.get_branchs_list(id);
    }
    if (name == 'branch') {
      newFiltersInput['cashier'] = ' ';
      const id = convertTypeChange(props.branchs, 'branchCode', value);
      props.get_cashiers_list(id);
    }

    setFiltersInput(newFiltersInput);
  };
  const onFiltersInputChangeReport = (event) => {
    const newFiltersInput = { ...filtersInput };
    newFiltersInput[event.target.name] = event.target.value;
    try {
      const name = event.target.name;
      const value = event.target.value;
      if (name == 'dvptml') {
        newFiltersInput['dvcntt'] = ' ';
        newFiltersInput['branch'] = ' ';
        newFiltersInput['cashier'] = ' ';
        setLocalBranchsList([]);
        setLocalCashiersList([]);

        const id = convertTypeChange(props.masterMerchant, 'mmCode', value);
        props.get_bussiness_list(id);
      }

      if (name == 'reportType') {
        newFiltersInput['invoices'] = false;

        for (let index = 0; index < configShow.length; index++) {
          const element = configShow[index];
          if (element.reportCode == value) {
            setShowInput((prevState) => ({
              ...prevState,
              SESSION_BEGIN: element.parameters.SESSION_BEGIN ? element.parameters.SESSION_BEGIN : false,
              SESSION_END: element.parameters.SESSION_END ? element.parameters.SESSION_END : false,
              // BIC: element.parameters.BIC ? element.parameters.BIC : false,
              TCTT: element.parameters.TCTT ? element.parameters.TCTT : false,
              DVCNTT: element.parameters.DVCNTT ? element.parameters.DVCNTT : false,
              DVPTML: element.parameters.DVPTML ? element.parameters.DVPTML : false,
              BRANCH: element.parameters.BRANCH ? element.parameters.BRANCH : false,
              CASHIER: element.parameters.CASHIER ? element.parameters.CASHIER : false
            }));
            if (element.parameters.SESSION_BEGIN == false) newFiltersInput['sessionBegin'] = ' ';
            if (element.parameters.SESSION_END == false) newFiltersInput['sessionEnd'] = ' ';
            // if (element.parameters.BIC == false) newFiltersInput['bic'] = ' ';
            if (element.parameters.TCTT == false) newFiltersInput['tctt'] = ' ';
            if (element.parameters.DVCNTT == false) newFiltersInput['dvcntt'] = ' ';
            if (element.parameters.DVPTML == false) {
              newFiltersInput['dvptml'] = ' ';
              newFiltersInput['invoices'] = false;
            }
            if (element.parameters.BRANCH == false) newFiltersInput['branch'] = ' ';
            if (element.parameters.CASHIER == false) newFiltersInput['cashier'] = ' '
          }
        }
      }
    } catch (error) {
      //
    }
    setFiltersInput(newFiltersInput);
  };

  useEffect(() => { 
    setLocalBranchsList(props.branchsList ?? []); 
    setLocalCashiersList(props.cashiersList ?? []); 
  }, [props.branchsList, props.cashiersList]);

  const isNullOrWhitespace = (input) => {
    if (input === null || input === '') {
      return true;
    }
    if (typeof input === 'number') {
      return false;
    }
    if (input.trim() === '') {
      return true;
    }
    return false;
  };
  const handleSync = () => {
    if (isNullOrWhitespace(filtersInput.reportType)) {
      props.showAlert('Điền thông tin của "Loại báo cáo"');
      return;
    }
    const arr = ['sessionBegin', 'sessionEnd'];
    let newfiltersInput = [];
    for (let key in filtersInput) {
      if (arr.indexOf(key) > -1) {
        if (filtersInput[key]) {
          newfiltersInput[key] = filtersInput[key].toISOString().split('T')[0];
        } else {
          newfiltersInput[key] = filtersInput[key];
        }
      } else newfiltersInput[key] = filtersInput[key];
    }
    props.hashSyncSearch(filtersInput.reportType, filtersInput.typeFile, newfiltersInput);
  };
  const convertTypeChange = (arrayA, nameCode, valueS) => {
    try {
      if (arrayA == null) return valueS;
      if (!arrayA) return valueS;
      const foundItem = arrayA.find((item) => item[nameCode] === valueS);
      if (foundItem) return foundItem.id;
      else return valueS;


    } catch (error) {
      return valueS;
    }

  };
  const handleSyncPreview = () => {
    if (isNullOrWhitespace(filtersInput.reportType)) {
      props.showAlert('Điền thông tin của "Loại báo cáo"');
      return;
    }

    const arr = ['sessionBegin', 'sessionEnd'];
    let newfiltersInput = [];
    for (let key in filtersInput) {
      if (arr.indexOf(key) > -1) {
        if (filtersInput[key]) {
          newfiltersInput[key] = filtersInput[key].toISOString().split('T')[0];
        } else {
          newfiltersInput[key] = filtersInput[key];
        }
      } else newfiltersInput[key] = filtersInput[key];
    }

    props.hashSyncSearchPreview(filtersInput.reportType, filtersInput.typeFile, newfiltersInput);
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={gridSpacing} className={classes.paddingSpace}>
          <Grid item xs={12} md={10}>
            <SelectBox
              name="reportType"
              value={filtersInput.reportType}
              label="Loại báo cáo"
              object={typeReport}
              showEm="0"
              onChange={onFiltersInputChangeReport}
            />
          </Grid>
        </Grid>
        {/* <br /> */}
        <Grid container justifyContent="center" spacing={gridSpacing} className={classes.paddingSpace}>
          <Grid item xs={12} md={10}>
            <DateRangePicker
              beginFrom={filtersInput.sessionBegin}
              endTo={filtersInput.sessionEnd}
              defaultObject={filtersInput}
              setFiltersInput={setFiltersInput}
              beginLabel="Từ Phiên"
              endLabel="Đến Phiên"
              beginName="sessionBegin"
              isClear={true}
              endName="sessionEnd"
              styles={{
                padding: '0'
              }}
            />
          </Grid>
        </Grid>
        {/* <br /> */}

        <Grid container justifyContent="center" spacing={gridSpacing} className={showInput['DVPTML'] ? classes.paddingSpace : ''}>
          <Grid item xs={12} md={10}>
            {showInput['DVPTML'] && (
              <SelectBox
                name="dvptml"
                value={filtersInput.dvptml}
                label="Đơn vị phát triển mạng lưới"
                object={props.masterMerchantList}
                showEm="1"
                onChange={onFiltersInputChangeReport}
              />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={gridSpacing} className={showInput['DVCNTT'] ? classes.paddingSpace : ''}>
          <Grid item xs={12} md={10}>
            {showInput['DVCNTT'] && (
              <SelectBox
                name="dvcntt"
                value={filtersInput.dvcntt}
                label="Đơn vị chấp nhận thanh toán"
                object={props.bussinessList}
                showEm="1"
                onChange={onFiltersInputChange}
              />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={gridSpacing} className={showInput['BRANCH'] ? classes.paddingSpace : ''}>
          <Grid item xs={12} md={10}>
            {showInput['BRANCH'] && (
              <SelectBox
                name="branch"
                value={filtersInput.branch}
                label="Branch"
                object={localBranchsList}
                showEm="1"
                onChange={onFiltersInputChange}
              />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={gridSpacing} className={showInput['CASHIER'] ? classes.paddingSpace : ''}>
          <Grid item xs={12} md={10}>
            {showInput['CASHIER'] && (
              <SelectBox
                name="cashier"
                value={filtersInput.cashier}
                label="Cashier"
                object={localCashiersList}
                showEm="1"
                onChange={onFiltersInputChange}
              />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={gridSpacing} className={classes.paddingSpace}>
          <Grid item xs={12} md={5}>
            <SelectBox
              name="typeFile"
              value={filtersInput.typeFile}
              label="Định dạng"
              object={typeFileList}
              showEm="0"
              onChange={onFiltersInputChange}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            {showInput['TCTT'] && (
              <SelectBox
                name="tctt"
                value={filtersInput.tctt}
                label="Tổ chức thanh toán"
                object={listBankObject}
                showEm="0"
                onChange={onFiltersInputChangeReport}
              />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={gridSpacing} className={classes.paddingSpace}>
          <Grid item xs={12} md={10}>
            {showInput['DVPTML'] && (
              <CheckboxYesNo
                name="invoices"
                check={filtersInput.invoices}
                question="Xuất thông tin hóa đơn"
                onChange={onFiltersInputChange}
              />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={gridSpacing}>
          <Grid item xs={12} md={10} style={{ margin: '30px 0px 0px 20px', textAlign: 'center' }}>
            <Button onClick={handleSyncPreview} size="large" variant="contained" startIcon={<PreviewIcon />}>
              Xem trước
            </Button>
            <Button
              onClick={handleSync}
              size="large"
              variant="contained"
              startIcon={<IosShareOutlined />}
              sx={{ marginLeft: '20px' }}
              color="secondary"
            >
              Xuất báo cáo
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForm;
