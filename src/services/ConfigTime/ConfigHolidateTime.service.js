import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/tblSpecialDay';

class ConfigHolidateTime {
  search(paging, filtersInput) {
    return backendapi.get(API_URL + '/?' + new URLSearchParams(paging) + '&' + new URLSearchParams(filtersInput), {
      headers: authHeader()
    });
  }
  addNew(filtersInput) {
    return backendapi.post(API_URL, filtersInput, { headers: authHeader() });
  }
  updateValue(id, filtersInput) {
    return backendapi.put(API_URL + '/' + id, filtersInput, { headers: authHeader() });
  }
  deleteValue(id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
}

export default new ConfigHolidateTime();
