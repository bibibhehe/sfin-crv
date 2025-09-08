import BasicService from 'services/Basic.service';
import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const URL_API = '/mms/api/user';
const URL_API_PLAtFORM = '/mms/api/platform';

const API_RESET_PASS_NAPAS = '/api/masterMerchant/resetPasswordNapas';
const API_RESET_PASS_PARTICIPANT = '/api/masterMerchant/resetPassword';

class User {
  getList(page, object) {
    return BasicService.searchByPageConditional(URL_API, page, object);
  }

  getPlatform() {
    return BasicService.search(URL_API_PLAtFORM);
  }
 
  addNewUser(filtersInput) {
    return BasicService.addNew(URL_API, filtersInput);
  }

  updateUser(filtersInput) {
    return BasicService.updateValue(URL_API, filtersInput.id, filtersInput);
  }

  deleteUser(filtersInput) {
    return BasicService.deleteValue(URL_API, filtersInput.id);
  }
  resetPassword(id, element) {
    return BasicService.updateValue(API_RESET_PASS, id, element);
  }
  updateResetPassNapas(id, element) {
    return backendapi.put(API_RESET_PASS_NAPAS + '/' + id + '?passwordNapas=' + element  , {}, { headers: authHeader() });
  }
  updateResetPassParticipant(id, element) {
    return backendapi.put(API_RESET_PASS_PARTICIPANT + '/' + id + '?password=' + element  , {}, { headers: authHeader() });
  }
}

export default new User();
