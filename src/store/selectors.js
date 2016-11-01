import { createSelector } from 'reselect';

export const selectGlobal = () => state => state.get('global');
export const selectAuth = () => state => state.get('auth');

export const selectCurrentMember = () => createSelector(
  selectAuth(),
  authState => authState.get('member')
);

export const selectAuthToken = () => createSelector(
  selectAuth(),
  authState => authState.get('token')
);

export const selectSubscriptions = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('subscriptions')
);

export const selectLoading = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('loading')
);

export const selectError = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('error')
);

export const selectLocale = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('locale')
);

export const selectMessages = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('messages')
);

export const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
