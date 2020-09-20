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
      if(res) {
        history.push('/signin');
        props.passed()
        props.onShow()
      } else {
        props.failed()
        props.onShow()
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <form className="signform">
        <p className="signform__text">Регистрация</p>
        <input type="text" className="signform__input" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" id="email" name="email" />
        <input type="password" className="signform__input" onChange={e => setPassword(e.target.value)} value={password} placeholder="Пароль" id="password" name="password" />
        <button type="submit" className="signform__submit" onClick={handleSubmit}>Зарегестрироваться</button>
        <Link to="/signin" onClick={props.changeLink} className="signform__link">Уже зарегистрированы? Войти</Link>
      </form>
    </>
  )
}

export default Register;
