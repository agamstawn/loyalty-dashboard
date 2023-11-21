import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerInfoPage from './components/CustomerInfoPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/customer/:customerId/info" component={CustomerInfoPage} />
      </Switch>
    </Router>
  );
};

export default App;
