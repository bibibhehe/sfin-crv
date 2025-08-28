import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/HisMessageOutput/';

class HisMessageOutputService {
    get(id) {
        return backendapi.get(API_URL + "listByInput/" + id, { headers: authHeader() });
    }
}

export default new HisMessageOutputService();