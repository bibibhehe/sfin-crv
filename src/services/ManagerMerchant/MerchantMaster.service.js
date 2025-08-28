import BasicService from 'services/Basic.service';
import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const URL_API = '/api/masterMerchant';
const URL_API_PROVICE = '/api/provice/search';
const URL_API_DISTRICT = '/api/district/search/?provId=';
const URL_API_BANK = '/api/bank';
const URL_API_MSMerchant = '/api/masterMerchant';

const URL_API_Branch = '/api/merchantBranch/search/';
const API_RESET_PASS_NAPAS = '/api/masterMerchant/resetPasswordNapas';
const API_RESET_PASS_PARTICIPANT = '/api/masterMerchant/resetPassword';

class MerchantPersonal {
  getList(page, object) {
    return BasicService.searchByPageConditional(URL_API, page, object);
  }
  get_provice() {
    return BasicService.search(URL_API_PROVICE);
  }
  get_district(id) {
    return BasicService.search(URL_API_DISTRICT + id);
  }
  get_bank() {
    return BasicService.search(URL_API_BANK);
  }
  get_masterMerchant() {
    return BasicService.search(URL_API_MSMerchant);
  }
  get_brach(id) {
    return BasicService.search(URL_API_Branch + id);
  }

  addNewMerChant(filtersInput) {
    return BasicService.addNew(URL_API, filtersInput);
  }

  updateMerchant(filtersInput) {
    return BasicService.updateValue(URL_API, filtersInput.id, filtersInput);
  }

  deleteMerchant(filtersInput) {
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

export default new MerchantPersonal();
