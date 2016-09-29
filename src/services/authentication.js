import { api } from './helpers';
export const authenticate = payload => {
  return api.post('auth/password', payload).then(s => s.json());
};
