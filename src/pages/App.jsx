import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Test from '../pages/Test';

const App = () => (
  <Router>
    <Switch>
      <Route path="/test" component={Test} />
    </Switch>
  </Router>
);
export default App;
