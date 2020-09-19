import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import * as Auth from '../Auth';
//import auth from '../auth2';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()
    Auth.login(email, password)
    .then((data) => {
      if (!data){
        /*return console.log('Что-то пошло не так')
      }
      if (data.jwt) {*/
        setEmail('');
        setPassword('');
        props.onLogin();
        history.push('/');
        return;
      }
    })
    .catch((err) => console.log(err));
  }
  return (
    <>
      <form className="signform">
        <p className="signform__text">Войти</p>
        <input type="text" className="signform__input" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" id="email" name="email" />
        <input type="password" className="signform__input" onChange={e => setPassword(e.target.value)} value={password} placeholder="Пароль" id="pass" name="pass" />
        <button type="submit" className="signform__submit" onClick={handleSubmit}>Войти</button>
        <Link to="/signup" onClick={props.changeLink} className="signform__link">Еще не зарегистрированы? Регистрация</Link>
      </form>
    </>
  )
}

export default Login;
