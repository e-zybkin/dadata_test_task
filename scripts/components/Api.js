class Api {
  constructor({address, token}) {
    this.address = address;
    this.token = token;
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json();
  }

  getAllMatch(query) {
    return fetch(this.address, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + this.token
      },
      body: JSON.stringify({
        query: query
      })
    })
    .then(result => this._getResponseData(result))
  }
}

export default Api;
