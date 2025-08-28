import BasicService from 'services/Basic.service';

const URL_API = '/api/merchantPersonal';
const URL_API_PROVICE = '/api/provice/search';
const URL_API_DISTRICT = '/api/district/search/?provId=';
const URL_API_BANK = '/api/bank';
const URL_API_MSMerchant = '/api/masterMerchant';

const URL_API_Branch = '/api/merchantBranch/search/';
const URL_API_Branch_Post = '/api/merchantBranch/';

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
}

export default new MerchantPersonal();
