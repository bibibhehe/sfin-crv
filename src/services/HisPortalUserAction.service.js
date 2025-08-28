import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/HisPortalUserAction/';

class HisPortalUserActionService {
    search(paging, datetimeRange, filtersInput) {
        return backendapi.get(API_URL + "search?" 
        + new URLSearchParams(paging).toString()
        + "&"
        + new URLSearchParams(datetimeRange).toString()
        + "&"
        + new URLSearchParams(filtersInput).toString()
            , { headers: authHeader() });
    }
}

export default new HisPortalUserActionService();
