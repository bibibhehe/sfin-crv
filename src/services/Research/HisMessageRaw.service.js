import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

const API_URL = '/api/hisMessageRaw';

const formatValueInput = (filtersInput) => {
  const newfiltersInput = {};
  try {
    for (let key in filtersInput) {
      if (filtersInput[key] == ' ' || filtersInput[key] == null) {
        newfiltersInput[key] = '';
      } else newfiltersInput[key] = filtersInput[key];
    }
  } catch (error) {
    //
  }
  return newfiltersInput;
};

class HisMessageRAWService {
  search(page, filtersInput) {
    const newfiltersInput = formatValueInput(filtersInput);
    return backendapi.get(API_URL + '/search?' + new URLSearchParams(page) + '&' + new URLSearchParams(newfiltersInput), {
      headers: authHeader()
    });
  }

  searchList(transactionReference) {
    return backendapi.get(API_URL + '/searchList?' + new URLSearchParams({transactionReference}), {
      headers: authHeader()
    });
  }
}

export default new HisMessageRAWService();
