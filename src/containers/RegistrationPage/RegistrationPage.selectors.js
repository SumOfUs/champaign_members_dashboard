import { createSelector } from 'reselect';

export const selectRegistrationPageState = () => state => state.get('registration');

export const selectRegistrationPageSubmitting = () => createSelector(
  selectRegistrationPageState(),
  state => state.get('submitting')
);

export const selectRegistrationPageSuccess = () => createSelector(
  selectRegistrationPageState(),
  state => state.get('success')
);

export const selectRegistrationPageErrors = () => createSelector(
  selectRegistrationPageState(),
  state => state.get('errors')
);

export const selectRegistrationPageMember = () => createSelector(
  selectRegistrationPageState(),
  state => state.get('member')
);
