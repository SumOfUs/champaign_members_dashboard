import config from 'app-config';
import axios from 'axios';

const API_URL = `${config.apiUrl}`;

export const authenticate = credentials =>
  axios.post(`${API_URL}/auth/password`, credentials);
