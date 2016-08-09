import { api } from './helpers';

export const authenticate = credentials => api.post('auth/password', credentials);
