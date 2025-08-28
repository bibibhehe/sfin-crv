import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/TblTariffPlanParticipant';
const API_URL_BankParticipants = '/api/TblAchBankParticipants';

class assignParticipantPaticipant {
  searchAssignParti(paging, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      newfiltersInput[key] = filtersInput[key];
    }

    return backendapi.get(
      API_URL + '/searchpaging?' + new URLSearchParams(paging).toString() + '&' + new URLSearchParams(newfiltersInput).toString(),
      { headers: authHeader() }
    );
  }
  getBankParticipants(type) {
    return backendapi.get(API_URL_BankParticipants + '/?type=' + type, { headers: authHeader() });
  }
  addNewAssignPart(element) {
    return backendapi.post(API_URL + '/', element, { headers: authHeader() });
  }
  updateAssignPart(id, element) {
    return backendapi.put(API_URL + '/' + id, element, { headers: authHeader() });
  }
  deleteAssignPart(id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
}

export default new assignParticipantPaticipant();
