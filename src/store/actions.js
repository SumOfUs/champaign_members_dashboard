import { deleteFromLocalStorage } from 'containers/LoginPage/actions';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


// localStorage is synchronous, but I'm artificially making
// this an asynchronous action
export const signOut = () => dispatch => {
  dispatch({ type: LOGOUT_REQUEST });

  deleteFromLocalStorage();

  dispatch({ type: LOGOUT_SUCCESS });
}
