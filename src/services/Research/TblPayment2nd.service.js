import BasicService from 'services/Basic.service';
import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/payment/';
const API_URL_PAY = '/api/';

class TblPayment2ndService {
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
      api += 'paymentGD2';
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
      api += 'payment';
    }
    return BasicService.ExportExcelConditional(api, paging, newfiltersInput);
  }

  resend(id, newItem) {
    return backendapi.put(API_URL_PAY + 'portalResendGD2/' + id + '?' + 'creditorAccount=' +`${newItem.creditorAccount}` + '&' + 'acqId=' +`${newItem.acqId}` , {}, {
      headers: authHeader()
    }); 
  }
  resendHistoryDispute(id) {
    return backendapi.get(API_URL + '/' + id, {
      headers: authHeader()
    });
  }

  get(id) {
    return BasicService.search(API_URL + 'detail/' + id);
  }
}

export default new TblPayment2ndService();
