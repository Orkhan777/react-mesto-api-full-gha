import { apiSetting}  from './constants.js';

class Api {
    constructor (data) {
      this._url = data.url;
      this._headers = data.headers;
    }
  
    _checkResponse (res) {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(res.status);
      }
    }

    _request(urlEndpoint, options) {
      return fetch(`${this._url}${urlEndpoint}`, options)
      .then(this._checkResponse)
    }
  
    getUserInfo() {
      return this._request(`/users/me`, {
        headers: this._headers,
        credentials: 'include',
      })
    }
  
    patchUserInfo(data) {
      return this._request(`/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
    })
  }
  
  getArrCards () {
    return this._request(`/cards`, {
      headers: this._headers,
      credentials: 'include',
  })
  }
  
  postUserCard (data) {
    return this._request(`/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        data,
      )
  })
  }
  
  deleteCard (cardId) {
    return this._request (`/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
  })
  }
  
  patchAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
  }
  
  putLike (cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    })
  }
  
  deleteLike (cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
  }
  }

  const api = new Api (apiSetting);

  export default api;