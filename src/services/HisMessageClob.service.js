import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/HisMessageClob/';

class HisMessageClobService {
    get(id) {
        return backendapi.get(API_URL + id, { headers: authHeader() });
    }
}

export default new HisMessageClobService();