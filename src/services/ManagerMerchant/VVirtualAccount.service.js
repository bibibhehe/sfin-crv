import BasicService from 'services/Basic.service';
import backendapi from 'utils/backendapi';
import authHeader from 'utils/AuthHeader';

const URL_API = '/api/virtualAccount';
class VVirtualAccount {
  search(paging, datetimeRange, filtersInput) {
     const newfiltersInput = {};
     for (let key in datetimeRange) {
       if (datetimeRange[key] && datetimeRange[key] !== null) {
         newfiltersInput[key] = datetimeRange[key].trim();
       }
     }
     for (let key in filtersInput) {
       if (filtersInput[key]) {
         newfiltersInput[key] = filtersInput[key];
       }
     }
     return BasicService.searchByPageConditional(URL_API, paging, newfiltersInput);
   }

   reSync(virualAccount) {
    return backendapi.put(URL_API + '/reSync' + '?virualAccount=' + virualAccount  , {}, { headers: authHeader() });
  }
}

export default new VVirtualAccount();
