import de from './de.json';
import en from './en.json';
import fr from './fr.json';

const locales = {
  en: {
    messages: en,
    label: 'English',
    pages: {
      subscriptions: {
        description: require('../pages/subscriptions.en.js').description
      },
      payment_methods: {
        description: require('../pages/payment_methods.en.js').description
      },
    },
  },
  fr: {
    messages: fr,
    label: 'Français',
    pages: {
      subscriptions: {
        description: require('../pages/subscriptions.fr.js').description
      },
      payment_methods: {
        description: require('../pages/payment_methods.fr.js').description
      },
    },
  },
  de: {
    messages: de,
    label: 'Deutsch',
    pages: {
      subscriptions: {
        description: require('../pages/subscriptions.de.js').description
      },
      payment_methods: {
        description: require('../pages/payment_methods.de.js').description
      },
    },
  },
};

export default locales;
