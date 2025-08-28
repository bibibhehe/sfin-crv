import BasicService from 'services/Basic.service';

const URL_API = '/api/merchantCorporate';
const URL_API_PROVICE = '/api/provice/search';
const URL_API_DISTRICT = '/api/district/search/?provId=';
const URL_API_BANK = '/api/bank/list';
const URL_API_TCTT = '/api/tctt/list';
const URL_API_MSMerchant = '/api/masterMerchant';

const URL_API_Branch = '/api/merchantBranch';
const URL_API_Branch_Post = '/api/merchantBranch';

const URL_API_Cashier = '/api/merchantCashier';

const buildQueryString = (filters) => {
  return Object.keys(filters)
    .map((key) => `${key}=${filters[key]}`)
    .join('&');
};
class MerchantManager {
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
   get_tctt() {
    return BasicService.search(URL_API_TCTT);
  }
  get_masterMerchant() {
    return BasicService.search(URL_API_MSMerchant);
  }
  get_brach(id, page) {
    let pageS = '&page=0&size=5';
    if (!page) return BasicService.search(URL_API_Branch + '/search?merchantId=' + id + pageS);
    else return BasicService.search(URL_API_Branch + '/search?merchantId=' + id + '&' + buildQueryString(page));
  }

  addNewMerChant(filtersInput) {
    return BasicService.addNew(URL_API, filtersInput);
  }
  addNewBranch(id, filtersInput) {
    return BasicService.addNew(URL_API_Branch_Post + '/' + id, filtersInput);
  }
  updateMerchant(filtersInput) {
    return BasicService.updateValue(URL_API, filtersInput.id, filtersInput);
  }
  updateBranch(filtersInput) {
    return BasicService.updateValue(URL_API_Branch_Post, filtersInput.id, filtersInput);
  }
  deleteMerchant(filtersInput) {
    return BasicService.deleteValue(URL_API, filtersInput.id);
  }

  get_cashier(id, page) {
    let pageS = '&page=0&size=5';
    if (!page) return BasicService.search(URL_API_Cashier + '/search?branchId=' + id + pageS);
    else return BasicService.search(URL_API_Cashier + '/search?branchId=' + id + '&' + buildQueryString(page));
  }
  addNewCashier(filtersInput, id) {
    return BasicService.addNew(URL_API_Cashier + '/' + id, filtersInput);
  }
  updateCashier(filtersInput) {
    return BasicService.updateValue(URL_API_Cashier, filtersInput.id, filtersInput);
  }
  deleteCashier(filtersInput) {
    return BasicService.deleteValue(URL_API_Cashier, filtersInput.id);
  }
  deleteBranch(filtersInput) {
    return BasicService.deleteValue(URL_API_Branch, filtersInput.id);
  }
}

export default new MerchantManager();
