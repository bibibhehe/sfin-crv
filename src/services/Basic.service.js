import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

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
const buildQueryString = (filterValues) => {
  const filters = formatValueInput(filterValues);
  return Object.keys(filters)
    .map((key) => `${key}=${filters[key]}`)
    .join('&');
};
function containsSpecialChars(text) {
  // Biểu thức regex để kiểm tra ký tự đặc biệt
  const specialCharsPattern = /[!@#$%^&*(),.?":{}|<>]/g;
  return specialCharsPattern.test(text);
}
class BasicService {
  search(API_URL) {
    return backendapi.get(API_URL, {
      headers: authHeader()
    });
  }
  searchByPage(API_URL, page) {
    return backendapi.get(API_URL + '?' + new URLSearchParams(page), {
      headers: authHeader()
    });
  }
  searchByPageConditional(API_URL, page, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) {
      if (filtersInput[key] && filtersInput[key] !== null) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    const valueFilter = buildQueryString(newfiltersInput);
    return backendapi.get(API_URL + '/search?' + new URLSearchParams(page) + '&' + valueFilter, {
      headers: authHeader()
    });
  }

  ExportExcelConditional(API_URL, page, filtersInput) {
    const newfiltersInput = {};
    for (let key in filtersInput) { 
      if (filtersInput[key] && filtersInput[key] !== null) {
        newfiltersInput[key] = filtersInput[key];
      }
    }
    const valueFilter = buildQueryString(newfiltersInput);
    return backendapi.get(API_URL + '/export/excel?' + new URLSearchParams(page) + '&' + valueFilter, {
      responseType: 'blob',
      headers: authHeader()
    });
  }
  ///addNew
  addNew(API_URL, filtersInput) {
    return backendapi.post(API_URL, filtersInput, { headers: authHeader() });
  }

  //update
  updateValue(API_URL, id, filtersInput) {
    return backendapi.put(API_URL + '/' + id, filtersInput, { headers: authHeader() });
  }

  //delete
  deleteValue(API_URL, id) {
    return backendapi.delete(API_URL + '/' + id, { headers: authHeader() });
  }
}

export default new BasicService();
