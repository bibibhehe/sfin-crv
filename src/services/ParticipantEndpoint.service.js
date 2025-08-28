import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const API_URL = '/api/TblParticipantEndpoint/';

class ParticipantEndpointService {
    search(paging, filtersInput) {
        return backendapi.get(API_URL + "search?" 
        + new URLSearchParams(paging).toString()
        + "&"
        + new URLSearchParams(filtersInput).toString()
            , { headers: authHeader() });
    }

    searchStatusOnly(paging, filtersInput) {
        return backendapi.get(API_URL + "searchStatusOnly?" 
        + new URLSearchParams(paging).toString()
        + "&"
        + new URLSearchParams(filtersInput).toString()
            , { headers: authHeader() });
    }

    post(element) {
        return backendapi.post(API_URL, element,
            { headers: authHeader() });
    }

    delete(elementId) {
        return backendapi.delete(API_URL + elementId,
            { headers: authHeader() });
    }

    put(element) {
        return backendapi.put(API_URL + element.id, element,
            { headers: authHeader() });
    }

    patchStatus(elementId, direction, status) {
        return backendapi.patch(API_URL + elementId + '?direction=' + direction, {status},
            { headers: authHeader() });
    }

    get(id) {
        return backendapi.get(API_URL + id, { headers: authHeader() });
    }
}

export default new ParticipantEndpointService();