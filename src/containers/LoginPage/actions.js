import { authenticate } from '../../services/authentication';
import { fromJS } from 'immutable';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const SET_AUTHENTICATION_TOKEN = 'SET_AUTHENTICATION_TOKEN';

const LOCAL_STORAGE_KEY = 'auth';

function isTokenExpired(token) {
  const b64payload = token.split('.')[1];

  const payload = JSON.parse(atob(b64payload));

  // date is in seconds, we need to conver to ms
  const { exp } = payload;
  const tokenExpiryDate = new Date(exp * 1000);
  const now = new Date();

  // We don't have token renewal with a refreshToken so we
  // should probably provide an endpoint for an authenticated
  // user to extend their token lifetime (e.g. if at this point
  // the token is about to expire)
  return now >= tokenExpiryDate;
}

export function saveToLocalStorage(state) {
  if (state) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }
}

export function deleteFromLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getPersistedState() {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    const state = JSON.parse(value);
    const token = state.token;
    if (isTokenExpired(token)) {
      throw new Error('Token expired');
    }

    return state ? fromJS(state) : fromJS({});
  } catch (e) {
    deleteFromLocalStorage();
    return fromJS({});
  }
}

export function logout() {
  deleteFromLocalStorage();
  return { type: LOGOUT_REQUEST };
}

export function setAuthenticationToken(token) {
  return { type: SET_AUTHENTICATION_TOKEN, payload: { token } };
}

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_REQUEST, credentials });

  return authenticate({ credentials })
    .then(response => {
      saveToLocalStorage(response);
      return dispatch({ type: LOGIN_SUCCESS, payload: response });
    })
    .catch(error => {
      deleteFromLocalStorage();
      dispatch({ type: LOGIN_ERROR, error });
      return error.body();
    });
};
