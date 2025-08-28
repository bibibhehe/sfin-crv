import authHeader from 'utils/AuthHeader';
import backendapi from 'utils/backendapi';

class CommonService {
  getInfChannelId() {
    return backendapi.get('/api/TblBusinessSvcCode', { headers: authHeader() });
  }
  getTblTariffPlan() {
    return backendapi.get(' /api/TblTariffPlan/?', { headers: authHeader() });
  }
  getBankParticipants(type) {
    return backendapi.get('/api/TblAchBankParticipants/?type=' + type, { headers: authHeader() });
  }
}

export default new CommonService();
