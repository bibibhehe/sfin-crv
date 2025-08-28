import BasicService from 'services/Basic.service';

const URL_API = '/api/tctt';
class Participant {
  get_BankList() {
    return BasicService.search(URL_API + '/list');
  }
  getList(page, object) {
    return BasicService.searchByPage(URL_API, page);
  }
  addNewParticipant(filtersInput) {
    return BasicService.addNew(URL_API, filtersInput);
  }
  updateParticipant(filtersInput) {
    return BasicService.updateValue(URL_API, filtersInput.id, filtersInput);
  }
  deleteParticipant(filtersInput) {
    return BasicService.deleteValue(URL_API, filtersInput.id);
  }
}

export default new Participant();
