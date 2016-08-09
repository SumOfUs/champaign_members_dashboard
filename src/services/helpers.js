import config from 'app-config';
import axios from 'axios';

export const BASE_URL = `${config.apiUrl}/api/stateless`;

export const api = {
  get(url, ...args) {
    return axios.get(`${BASE_URL}/${url}`, ...args);
  },

  post(url, ...args) {
    return axios.post(`${BASE_URL}/${url}`, ...args);
  },

  delete(url, ...args) {
    return axios.delete(`${BASE_URL}/${url}`, ...args);
  },
};

