import axios from 'axios';

const API_URL = '/api/oauth/';
class AuthService {
  getCurrentUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  authorize() {
    return axios
      .get(API_URL + 'authorize', {});
  }

  generateToken(code, state, redirectUri) {
    return axios
      .post(API_URL + 'generateToken', {
        code,
        state,
        redirectUri
      })
  }

  inspectToken(token) {
    return axios
      .post(API_URL + 'inspectToken', {
        token
      })
  }

  invalidateToken(token) {
    return axios
      .post(API_URL + 'invalidateToken', {
        token: token
      })
  }
}

export default new AuthService();
