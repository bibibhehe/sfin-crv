import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/payment/';
const API_URL_PAY = '/api/';

class TblPaymentService {
  search(paging, datetimeRange, filtersInput, type) {
    let api = API_URL_PAY;
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key]) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    if (type === 'Refund') {
      api += 'refund/';
    } else {
      api += 'payment/';
    }
    return backendapi.get(
      api +
        'search?' +
        new URLSearchParams(paging).toString() +
        '&' +
        new URLSearchParams(datetimeRange).toString() +
        '&' +
        new URLSearchParams(newfiltersInput).toString(),
      { headers: authHeader() }
    );
  }

  get(id) {
    return backendapi.get(API_URL + 'detail/' + id, { headers: authHeader() });
  }
}

export default new TblPaymentService();
