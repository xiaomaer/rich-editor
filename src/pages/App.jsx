import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Test from '../pages/Test';

const App = () => (
  <Router>
    <Switch>
      <Route path="/test" component={Test} />
      {/* 这样就可以直接访问子路由了 */}
      <Home />
    </Switch>
  </Router>
);
export default App;
