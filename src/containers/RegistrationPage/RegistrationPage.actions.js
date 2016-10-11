import { api } from '../../services/helpers';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_FAILED = 'REGISTRATION_REQUEST_FAILED';
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
        if (e instanceof TypeError) {
          const message = `Something's wrong. Please try again later`;
          dispatch({ type: REGISTRATION_REQUEST_FAILED, payload: message });
          throw e.message;
        }

        if (typeof e.json === 'function') {
          return e.json()
            .then(response => {
              const payload = { errors: response.errors };

              if (response.errors.authentication) {
                payload.error = 'Email is already registered';
              }

              dispatch({ type: REGISTRATION_FAILURE, payload });
              throw payload.errors;
            }, failure => {
              const payload = { error: 'Unexpected error' };
              dispatch({ type: REGISTRATION_FAILURE, payload});
              throw payload;
            });
        }
      });
  };
}
