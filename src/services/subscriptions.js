// import { api } from './helpers';
import faker from 'faker';
import { api } from './helpers';
/*
type Transaction {
  id: string;
  status: string; // authorized | unauthorized
  created_at: string; // date
  amount: string; // double
}

type Subscription {
  id: string;
  billing_day_of_month: number;
  created_at: string; // date
  price: string;
  transactions: []Transaction,
}
*/

function generateTransaction() {
  return {
    id: faker.random.uuid(),
    status: faker.random.arrayElement(['authorized', 'unauthorized']),
    created_at: faker.date.recent(),
    amount: faker.finance.amount(1, 50),
  };
}

function generateSubscription() {
  const subscription = {
    id: faker.random.uuid(),
    billing_day_of_month: faker.random.number(28),
    created_at: faker.date.recent(),
    price: faker.finance.amount(1, 50),
    transactions: [],
  };


  for (let x = 0; x < faker.random.number(10); x++) {
    subscription.transactions.push(generateTransaction());
  }

  return subscription;
}

export const getSubscriptions = (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return api.get('braintree/subscriptions', { headers });
};

