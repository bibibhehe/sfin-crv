import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/TblRptoLadder';
const API_URL_ValueLadder = '/api/TblRptoLadderValueLevel';
const API_URL_NoLadder = '/api/TblRptoNoLadderValueLevel';

class ladderConfiguration {
  //////////////////////////////
  //Lader01
  //////////////////////////////
  searchLadder01() {
    return backendapi.get(API_URL + '/', {
      headers: authHeader()
    });
  }

  addNewLadder01(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.post(API_URL + '/', newfiltersInput, { headers: authHeader() });
  }
  updateLadder01(id, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.put(API_URL + '/' + id, newfiltersInput, { headers: authHeader() });
  }
  deleteLadder01(id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
  //////////////////////////////
  ///Ladder 02
  //////////////////////////////
  searchLadder02(id) {
    return backendapi.get(API_URL_ValueLadder + '/?ladderId=' + id, {
      headers: authHeader()
    });
  }
  addNewLadder02(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.post(API_URL_ValueLadder + '/', newfiltersInput, { headers: authHeader() });
  }
  updateLadder02(id, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.put(API_URL_ValueLadder + '/' + id, newfiltersInput, { headers: authHeader() });
  }
  deleteLadder02(id) {
    return backendapi.delete(API_URL_ValueLadder + '/' + id, { headers: authHeader() });
  }
  //////////////////////////////
  // No Ladder
  //////////////////////////////
  searchNoLadder(id) {
    return backendapi.get(API_URL_NoLadder + '/', {
      headers: authHeader()
    });
  }
  addNoLadder(filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.post(API_URL_NoLadder + '/', newfiltersInput, { headers: authHeader() });
  }
  updateNoLadder(id, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ') {
        newfiltersInput[key] = null;
      } else newfiltersInput[key] = filtersInput[key];
    }
    return backendapi.put(API_URL_NoLadder + '/' + id, newfiltersInput, { headers: authHeader() });
  }
  deleteNoLadder(id) {
    return backendapi.delete(API_URL_NoLadder + '/' + id, { headers: authHeader() });
  }
}

export default new ladderConfiguration();
