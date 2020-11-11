import React from 'react';
import LoginForm from '../../components/LoginForm';
import logo from './triviaLogo.png';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <img className="logo" src={logo} />
      <LoginForm />
      <div className="gravatar">
        Need account?<br/>
        <a href="https://br.gravatar.com/" target="_blank">
          https://br.gravatar.com/
        </a>
      </div>
    </div>
  )
}

export default Login;