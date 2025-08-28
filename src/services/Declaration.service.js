import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/TblTariffPlan';
const API_BT_1 = '/api/TblTariffWithoutLadder';
const API_BT_2 = '/api/TblTariffLadder';
const API_BT_3 = '/api/TblTariff'; //?tariffLadderId=21

class Declaration {
  search(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key]) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    return backendapi.get(API_URL + '?' + new URLSearchParams(newfiltersInput).toString(), { headers: authHeader() });
  }
  addNewFeeDeclaration(element) {
    return backendapi.post(API_URL, element, { headers: authHeader() });
  }
  deleteFeeDeclaration(id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
  updateFeeDeclaration(id, element) {
    return backendapi.put(API_URL + '/' + id, element, { headers: authHeader() });
  }
  getDetailBTO_1(value) {
    return backendapi.get(API_BT_1 + '/?tariffPlanId=' + value, { headers: authHeader() });
  }
  updateDetailBTO_1(id, element) {
    return backendapi.put(API_BT_1 + '/' + id, element, { headers: authHeader() });
  }
  addNewDetailBTO_1(filtersInput) {
    return backendapi.post(API_BT_1, filtersInput, { headers: authHeader() });
  }
  deleteBTO_01(id) {
    return backendapi.delete(API_BT_1 + '/' + id, { headers: authHeader() });
  }
  getDetailBTO_2(value) {
    return backendapi.get(API_BT_2 + '?tariffPlanId=' + value, { headers: authHeader() });
  }
  addNewDetailBTO_2(filtersInput) {
    return backendapi.post(API_BT_2, filtersInput, { headers: authHeader() });
  }
  updateDetailBTO_2(id, element) {
    return backendapi.put(API_BT_2 + '/' + id, element, { headers: authHeader() });
  }
  deleteBTO_02(id) {
    return backendapi.delete(API_BT_2 + '/' + id, { headers: authHeader() });
  }
  getDetailBTO_2_1(value) {
    return backendapi.get(API_BT_3 + '/?tariffLadderId=' + value, { headers: authHeader() });
  }
  addNewDetailBTO_2_1(filtersInput) {
    return backendapi.post(API_BT_3, filtersInput, { headers: authHeader() });
  }
  updateDetailBTO_2_1(id, element) {
    return backendapi.put(API_BT_3 + '/' + id, element, { headers: authHeader() });
  }
  deleteBTO_02_1(id) {
    return backendapi.delete(API_BT_3 + '/' + id, { headers: authHeader() });
  }
}

export default new Declaration();
