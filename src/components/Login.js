import { Route, useHistory } from "react-router"
import React, { useEffect, useState } from 'react';
import Header from "./Header"
import { Link } from "react-router-dom";
// import Register from "./Register"


const Login = ({ onLogin, setEnterPopupOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin({ email, password })
          .then(() => resetForm())
          .then(() => history.push('/'))
          //Ошибку в попап
          .catch(() => setEnterPopupOpen(true));
      };

      useEffect(() => {
        if (localStorage.getItem('jwt')) {
          history.push('/');
        }
      }, []);

    return (
        <Route>
            <Header>
              <Link to="sign-up" className="navbar__link">Зарегистрироваться</Link>
            </Header>
            <div className="register">
                {/* <button className="register__enter">Войти</button> */}
                <form className="register__form" onSubmit={handleSubmit}>
                <h2 className="register__form_title">Вход</h2>
                <input type="email" className="register__form_input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" className="register__form_input" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} ></input>
                <button className="register__form_button">Войти</button>
                </form>
            </div>
        </Route>
    )
}

export default Login;