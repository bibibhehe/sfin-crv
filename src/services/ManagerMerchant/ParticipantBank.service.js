import BasicService from 'services/Basic.service';

const URL_API = '/api/bank';
class ParticipantBank {
  getList(page) {
    return BasicService.searchByPage('/api/bank/search', page);
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

export default new ParticipantBank();
