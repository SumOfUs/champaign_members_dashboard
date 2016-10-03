export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

const URL = 'http://localhost:3000';

export function register(data) {
  return dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    };

    dispatch({ type: REGISTRATION_REQUEST, payload: data });

    return fetch(`${URL}/api/members`, options)
      .then(response => {
        console.log(response);
        return response.body();
      })
      .then(r => {
        dispatch({ type: REGISTRATION_SUCCESS, payload: r });
        return r;
      })
      .catch(e => {
        dispatch({ type: REGISTRATION_FAILURE, payload: e });
        throw e;
      });
  };
}
