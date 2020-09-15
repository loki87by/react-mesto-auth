export const BASE_URL = 'https://auth.nomoreparties.co';
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    try {
      if(res.status === 200) {
        return res.json();
      }
    } catch(e) {
      return (e)
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

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      }
    })
  .then(res => res.json())
  .then(data => data)
  .catch((err) => {
    console.log(err);
  })
}

