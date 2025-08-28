import BasicService from 'services/Basic.service';
import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_GET_CONFIG_SHOW = '/api/reportoffline/list';
// const API_GET_CONFIG_TABLE = '/api/reportoffline/list';
const API_GET_CONFIG_TIME = '/api/settlementSession/list';
const API_EXPORT = '/api/reportoffline/export';
const API_TRANSTYPE = '/api/reportoffline/listTransType';

const API_MERCHANT_LIST = '/api/masterMerchant';
const API_BUSSINESS_LIST = '/api/merchantCorporate/list';
const API_BANK = '/api/bank';

class exportReport {
  get_master_list() {
    return BasicService.search(API_MERCHANT_LIST);
  }
  get_bussiness_list(id) {
    return BasicService.search(API_BUSSINESS_LIST + '?mmId=' + id);
  }
  get_branchs_list(id) {
    return BasicService.search('/api/merchantBranch/' + id);
  }
  get_cashiers_list(id) {
    return BasicService.search('/api/merchantCashier/list/' + id);
  }
  get_bank() {
    return BasicService.search(API_BANK);
  }

  getReportList() {
    return BasicService.search(API_GET_CONFIG_SHOW + '/');
  }
  getTimeSettlement() {
    return BasicService.search(API_GET_CONFIG_TIME);
  }
  getTransType() {
    return BasicService.search(API_TRANSTYPE);
  }
  upforGetValue(reportCode, format, filtersInput, index) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = '';
      } else newfiltersInput[key] = filtersInput[key];
    }
    if (index == 1) {
      newfiltersInput['typeFile'] = 'PDF';
      format = 'PDF';
    }

    // newfiltersInput['service'] = 'IBFT20';
    return backendapi.get(API_EXPORT + '/' + reportCode + '/' + format + '?' + new URLSearchParams(newfiltersInput), {
      responseType: 'blob',
      headers: authHeader()
    });
  }

  //   getReportList() {
  //     return backendapi.get(API_GET_CONFIG_SHOW + '/', {
  //       headers: authHeader()
  //     });
  //   }
}

export default new exportReport();
