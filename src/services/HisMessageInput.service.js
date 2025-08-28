import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/HisMessageInput/';
const API_URL_OUT = '/api/HisMessageOutput/';
const API_URL_ISO = '/api/HisIsoMessage/';
const API_URL_UPDATE = '/api/HisPaymentUpdate/';
const API_URL_REFUND = '/api/refund/';

class HisMessageInputService {
  search(paging, datetimeRange, filtersInput) {
    return backendapi.get(
      API_URL +
        'search?' +
        new URLSearchParams(paging).toString() +
        '&' +
        new URLSearchParams(datetimeRange).toString() +
        '&' +
        new URLSearchParams(filtersInput).toString(),
      { headers: authHeader() }
    );
  }

  get(id) {
    return backendapi.get(API_URL + 'search?transactionReference=' + id, { headers: authHeader() });
  }
  getOutPut(id) {
    return backendapi.get(API_URL_OUT + 'listByOutput?transactionReference=' + id, { headers: authHeader() });
  }
  getOutISO(id) {
    return backendapi.get(API_URL_ISO + 'findbyTranxRef?transactionReference=' + id, { headers: authHeader() });
  }
  getPaymentUpdate(id) {
    return backendapi.get(API_URL_UPDATE + 'findbyTranxRef?transactionReference=' + id, { headers: authHeader() });
  }
  getRefund(id) {
    return backendapi.get(API_URL_REFUND + 'findbyTranxRef?transactionReference=' + id, { headers: authHeader() });
  }
}

export default new HisMessageInputService();
