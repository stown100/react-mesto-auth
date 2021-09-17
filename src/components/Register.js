import { Route, useHistory, Link } from "react-router-dom";
import Header from "./Header";
import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";

const Register = ({onRegister, setRegisterPopupOpen, setEnterPopupOpen}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      onRegister({ email, password })
        .then(() => resetForm())
        .then(() => history.push('/sign-in'))
        .catch(() => setEnterPopupOpen(true))
    };

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
          history.push('/');
        }
      }, []);

    return (
        <Route>
            <Header>
              <NavBar>
               <Link to="sign-in" className="navbar__link">Войти</Link>
              </NavBar>
            </Header>
            <div className="register">
                {/* <button className="register__enter">Войти</button> */}
                <form className="register__form" onSubmit={handleSubmit}>
                <h2 className="register__form_title">Регистрация</h2>
                <input type="email" className="register__form_input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" className="register__form_input" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}></input>
                <button className="register__form_button">Зарегистрироваться</button>
                </form>
                <button className="register__button"><Link to="sign-in" className="register__button_link">Вы уже зарегистрированны? Войти</Link></button>
            </div>
        </Route>
    )
}

export default Register