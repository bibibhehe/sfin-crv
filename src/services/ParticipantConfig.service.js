import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/participant';
const API_URL1 = '/api/participantSettlement';
const API_URL2 = '/api/TblTariffPlanParticipant';
const API_URL_BankParticipants = '/api/TblAchBankParticipants';

class ParticipantConfig {
  search(page, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key]) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    return backendapi.get(
      API_URL + '/search?' + new URLSearchParams(page).toString() + '&' + new URLSearchParams(filtersInput).toString(),
      {
        headers: authHeader()
      }
    );
  }

  addNewParticipant(element) {
    return backendapi.post(API_URL + '/', element, { headers: authHeader() });
  }
  deleteParticipant(id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
  updateParticipant(id, element) {
    return backendapi.put(API_URL + '/' + id, element, { headers: authHeader() });
  }

  getParticipantSettlement(bankCode) {
    return backendapi.get(API_URL1 + '?participantCode=' + bankCode, { headers: authHeader() });
  }
  addNewParticipantSettlement(element) {
    return backendapi.post(API_URL1 + '/', element, { headers: authHeader() });
  }
  deleteParticipantSettlement(id) {
    return backendapi.delete(API_URL1 + '/' + id, { headers: authHeader() });
  }
  deleteParticipantSettBankCode(bankCode) {
    return backendapi.delete(API_URL1 + '?participantCode=' + bankCode, { headers: authHeader() });
  }
  updateParticipantSettlement(id, element) {
    return backendapi.put(API_URL1 + '?participantCode=' + id, element, { headers: authHeader() });
  }

  searchAssignParti(filtersInput) {
    return backendapi.get(API_URL2 + '/searchpaging?' + new URLSearchParams(filtersInput).toString(), { headers: authHeader() });
  }
  getBankParticipants(type) {
    return backendapi.get(API_URL_BankParticipants + '/?type=' + type, { headers: authHeader() });
  }
  getTblTariffPlan() {
    return backendapi.get(' /api/TblTariffPlan/?', { headers: authHeader() });
  }
  addNewAssignPart(element) {
    return backendapi.post(API_URL2 + '/', element, { headers: authHeader() });
  }
  updateAssignPart(id, element) {
    return backendapi.put(API_URL2 + '/' + id, element, { headers: authHeader() });
  }
  deleteAssignPart(id) {
    return backendapi.delete(API_URL2 + '/' + id, { headers: authHeader() });
  }
}

export default new ParticipantConfig();
