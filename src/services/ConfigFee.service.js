import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/TblRptoHeaderLevel1';
const API_URL2 = '/api/TblRptoHeaderLevel2';
const API_URL3 = '/api/TblRptoHeaderLevel3';

class ConfigFee {
  search() {
    return backendapi.get(API_URL + '/', { headers: authHeader() });
  }
  addConfigFee01(element) {
    return backendapi.post(API_URL + '/', element, { headers: authHeader() });
  }
  deleteConfigFee01(id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
  updateConfigFee01(id, element) {
    return backendapi.put(API_URL + '/' + id, element, { headers: authHeader() });
  }
  getConfigFee02(id) {
    return backendapi.get(API_URL2 + '/?level1Id=' + id, { headers: authHeader() });
  }
  addConfigFee02(element) {
    return backendapi.post(API_URL2 + '/', element, { headers: authHeader() });
  }
  deleteConfigFee02(id) {
    return backendapi.delete(API_URL2 + '/' + id, { headers: authHeader() });
  }
  updateConfigFee02(id, element) {
    return backendapi.put(API_URL2 + '/' + id, element, { headers: authHeader() });
  }
  getConfigFee03(id) {
    return backendapi.get(API_URL3 + '/?level2Id=' + id, { headers: authHeader() });
  }
  addConfigFee03(element) {
    return backendapi.post(API_URL3 + '/', element, { headers: authHeader() });
  }
  deleteConfigFee03(id) {
    return backendapi.delete(API_URL3 + '/' + id, { headers: authHeader() });
  }
  updateConfigFee03(id, element) {
    return backendapi.put(API_URL3 + '/' + id, element, { headers: authHeader() });
  }
}

export default new ConfigFee();
