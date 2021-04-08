import React from 'react';

import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import PublicLayout from './layouts/PublicLayout';

import Main from './pages/Main';
import PostDetailPage from './pages/PostDetailPage';
import SignUpContainer from './container/SignUpContainer';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <DefaultLayout component={Main} />
        </Route>
        <Route exact path="/post/:id">
          <DefaultLayout component={PostDetailPage} />
        </Route>
        <Route exact path="/signup">
          <PublicLayout component={SignUpContainer} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
