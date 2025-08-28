import axios from 'axios';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/bank/list';

class NapasBankService {
  list() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new NapasBankService();
