import BasicService from 'services/Basic.service';

class MerchantManager {
  get_bankList_napas() {
    return BasicService.search('/api/bank/list');
  }
  get_bank() {
    return BasicService.search('/api/bank/list');
  }
}

export default new MerchantManager();
