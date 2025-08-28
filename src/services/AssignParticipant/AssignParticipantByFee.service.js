import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/TblTariffPlanParticipantMulti';

class assignParticipantFee {
  searchAssignParti(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') newfiltersInput[key] = '';
      else newfiltersInput[key] = filtersInput[key];
    }

    return backendapi.get(API_URL + '/?' + new URLSearchParams(newfiltersInput).toString(), {
      headers: authHeader()
    });
  }
  addNewAssignPart(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.post(API_URL + '/', newfiltersInput, { headers: authHeader() });
  }
  updateAssignPart(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.put(API_URL + '/', newfiltersInput, { headers: authHeader() });
  }
  deleteAssignPart(filtersInput) {
    return backendapi.delete(API_URL + '/?' + new URLSearchParams(filtersInput), { headers: authHeader() });
  }
}

export default new assignParticipantFee();
