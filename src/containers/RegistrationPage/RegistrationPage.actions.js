import { api } from '../../services/helpers';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export function register(data) {
  return dispatch => {
    dispatch({ type: REGISTRATION_REQUEST, payload: data });
    return api.post('members', data)
      .then(response => {
        return response.json();
      })
      .then(member => {
        dispatch({ type: REGISTRATION_SUCCESS, payload: member });
        return member;
      })
      .catch(e => {
        return e.json()
          .then(response => {
            dispatch({ type: REGISTRATION_FAILURE, payload: response.errors });
            throw response.errors;
          })
          .catch(error => {
            error = { _error: 'Unexpected error' };
            dispatch({ type: REGISTRATION_FAILURE, payload: error });
            throw error;
          });
      });
  };
}
