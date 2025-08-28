import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/settlementSession';
const API_URL_C = '/api/CfgSettlementSession';

class ConfigTimeSession {
  search(paging) {
    return backendapi.get(API_URL + '/?' + new URLSearchParams(paging), {
      headers: authHeader()
    });
  }
  search_Unit() {
    return backendapi.get(API_URL_C, {
      headers: authHeader()
    });
  }
  addNew(filtersInput) {
    return backendapi.post(API_URL_C, filtersInput, { headers: authHeader() });
  }
  updateValue(id, filtersInput) {
    return backendapi.put(API_URL_C + '/' + id, filtersInput, { headers: authHeader() });
  }
  deleteValue(id) {
    return backendapi.delete(API_URL_C + '/' + id, { headers: authHeader() });
  }
}

export default new ConfigTimeSession();
