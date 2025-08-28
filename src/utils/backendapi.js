import axios from 'axios';
import { handleUnauthorizedLogout } from 'services/Logout.service';

const backendapi = axios.create();

backendapi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedLogout();
    }
    return Promise.reject(error);
  }
);

export default backendapi;
