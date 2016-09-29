export const getSubscriptions = (token) => {
  return fetch('braintree/subscriptions', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
};

