import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/sysparam/';

class SystemParameterConfigService {
    get() {
        return backendapi.get(API_URL, { headers: authHeader() });
    }

    getGroup(group) {
        return backendapi.get(API_URL + group, { headers: authHeader() });
    }

    getName(group, name) {
        return backendapi.get(API_URL + group + '/' + name, { headers: authHeader() });
    }

    searchPaging(keyword, page, pagesize) {
        return backendapi.get(`${API_URL}searchpaging?keyword=${keyword}&page=${page}&pagesize=${pagesize}`, { headers: authHeader() });
    }

    put(group, name, val) {
        return backendapi.put(API_URL + group + '/' + name, {
            val
        },
            { headers: authHeader({val}) });
    }
}

export default new SystemParameterConfigService();
