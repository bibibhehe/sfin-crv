import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/PortalUserAction/';

class PortalUserActionService {
    list() {
        return backendapi.get(API_URL, { headers: authHeader() });
    }
}

export default new PortalUserActionService();
