import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}