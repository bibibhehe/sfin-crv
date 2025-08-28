import BasicService from 'services/Basic.service';

const API_URL = '/api/payment/';
const API_URL_PAY = '/api/';

class TblPaymentService {
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
      api += 'payment';
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



  get(id) {
    return BasicService.search(API_URL + 'detail/' + id);
  }
}

export default new TblPaymentService();
