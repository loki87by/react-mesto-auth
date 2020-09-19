export class Auth {
  constructor(options) {
    this.url = options.baseUrl;
  }
  register(email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email': email,
        'password': password })
    })
    .then((res) => {
      try {
        if(res.status === 200) {
          return res.json();
        }
      } catch {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
    })
    .then((res) => {
      return res;
    })
    /*.then((data) => {
      localStorage.setItem('token', data.token);
    })*/
    .catch((err) => console.log(err));
  }
  
  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          return console.log('не передано одно из полей')
        }
        if (res.status === 401) {
          return console.log('пользователь не найден')
        } else {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
      }
      catch (err) {
        return err;
      }
    })
    .then((data) => {
      if(data._id) {
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
    .catch(err => console.log(err)) 
  }
  
  getContent (token) {
    return fetch(`${this.url}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        }
      })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} ${res.statusText}`));
    })
    .then(data => data)
    .catch((err) => {
    console.log(err);
  })
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
});
export default auth;