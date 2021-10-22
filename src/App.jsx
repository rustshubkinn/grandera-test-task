import { Switch, Route } from 'react-router-dom';

import { Home } from 'pages/Home/Home';
import { User } from 'pages/User/User';

import './global.scss';

export const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user/:id" component={User} />
  </Switch>
);
