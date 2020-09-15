import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import * as Auth from '../Auth';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()
    Auth.register(email, password)
    .then((res) => {
      if(res.status === 200) {
        history.push('/signin');
      } else {console.log(res.status)}
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <form className="signform">
        <p className="signform__text">Регистрация</p>
        <input type="text" className="signform__input" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" id="email" name="email" />
        <input type="password" className="signform__input" onChange={e => setPassword(e.target.value)} value={password} placeholder="Пароль" id="password" name="password" />
        <button type="submit" className="signform__submit" onSubmit={handleSubmit}>Зарегестрироваться</button>
        <Link to="/signin" className="signform__link">Уже зарегистрированы? Войти</Link>
      </form>
    </>
  )
}

export default Register;
