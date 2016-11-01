import { deleteFromLocalStorage } from '../containers/LoginPage/actions';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

// localStorage is synchronous, but I'm artificially making
// this an asynchronous action
export const signOut = () => dispatch => {
  dispatch({ type: LOGOUT_REQUEST });

  deleteFromLocalStorage();

  dispatch({ type: LOGOUT_SUCCESS });
};

export const changeLocale = (locale) => {
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};
