import BasicService from 'services/Basic.service';
import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/payment/';
const API_URL_PAY = '/api/';

class TblpaymentRefundService {
  search(paging, datetimeRange, filtersInput, type) {
    let api = API_URL_PAY;
    const newfiltersInput = {};
    for (let key in datetimeRange) {
      if (datetimeRange[key] && datetimeRange[key] !== null) {
        newfiltersInput[key] = datetimeRange[key].trim();
      }
    }
    for (let key in filtersInput) {
      if (filtersInput[key]) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    if (type === 'Refund') {
      api += 'refund';
    } else {
      api += 'HisRedeliveryPaymentRequest';
    }
    return BasicService.searchByPageConditional(api, paging, newfiltersInput);
  }

  exportExcel(paging, datetimeRange, filtersInput, type) {
    let api = API_URL_PAY;
    const newfiltersInput = {};
    for (let key in datetimeRange) {
      if (datetimeRange[key] && datetimeRange[key] !== null) {
        newfiltersInput[key] = datetimeRange[key].trim();
      }
    }
    for (let key in filtersInput) {
      if (filtersInput[key]) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    if (type === 'Refund') {
      api += 'refund';
    } else {
      api += 'HisRedeliveryPaymentRequest';
    }
    return BasicService.ExportExcelConditional(api, paging, newfiltersInput);
  }

  get(id) {
    return BasicService.search(API_URL + 'detail/' + id);
  }

   resend(id, status) {
      return backendapi.put(API_URL_PAY + 'HisRedeliveryPaymentRequest/approvedPortalResendGD2/' + id + '?' + 'status=' +`${status}`, {}, {
        headers: authHeader()
      }); 
    }
}

export default new TblpaymentRefundService();
