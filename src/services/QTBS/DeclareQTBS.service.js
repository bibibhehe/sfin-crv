import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL_PAY = '/api/TblTransactionAdjusted';

class DeclareQTBS {
  search(paging, filtersInput) {
    let api = API_URL_PAY;
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') newfiltersInput[key] = '';
      else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.get(
      api + '/search?' + new URLSearchParams(paging).toString() + '&' + new URLSearchParams(newfiltersInput).toString(),
      { headers: authHeader() }
    );
  }
}

export default new DeclareQTBS();
