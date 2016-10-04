const { REACT_APP_CHAMPAIGN_URL } = process.env;

export const BASE_URL = `${REACT_APP_CHAMPAIGN_URL}/api/stateless`;

export function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  throw response;
}
export const api = {
  get(url, headers = {}) {
    return fetch(`${BASE_URL}/${url}`, {
      method: 'GET',
      headers: Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers),
    })
    .then(checkStatus);
  },

  post(url, payload = {}, headers = {}) {
    return fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers: Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers),
      body: JSON.stringify(payload),
    })
    .then(checkStatus);
  },

  delete(url, headers= {}) {
    return fetch(`${BASE_URL}/${url}`, {
      method: 'DELETE',
      headers: Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers),
    })
    .then(checkStatus);
  },
};
