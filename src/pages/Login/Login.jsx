import React from 'react';
import LoginForm from '../../components/LoginForm';
import logo from './triviaLogo.png';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <img className="logo" src={ logo } />
      <LoginForm />
    </div>
  )
}

export default Login;