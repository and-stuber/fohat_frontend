import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Scoreboard from '../pages/Scoreboard';
import NotFound from '../pages/NotFound';



const Routes = () => (
  <Switch>
    <Route exact path="/scoreboard" component={Scoreboard} />
    <Route exact path="/game" component={Game} />
    <Route exact path="/" component={Login} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes;
