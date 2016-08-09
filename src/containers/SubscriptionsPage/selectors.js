import { createSelector } from 'reselect';

export const selectSubscriptionsState = () => state => state.get('subscriptions');

export const selectAllSubscriptions = () => createSelector(
  selectSubscriptionsState(),
  state => state.get('subscriptions')
);
