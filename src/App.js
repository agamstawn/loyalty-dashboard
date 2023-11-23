import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerInfoPage from './components/CustomerInfoPage';
import OrderHistoryPage from './components/OrderHistoryPage';

const App = () => {
  return (
    
    <Router>
      <Switch>
        <Route path="/customer/:customerId/info" component={CustomerInfoPage} />
        <Route path="/info" component={CustomerInfoPage} />
        <Route path="/customer/:customerId/orders_since_last_year" component={OrderHistoryPage} />
        <Route path="/orders_since_last_year" component={OrderHistoryPage} />
      </Switch>
    </Router>
  );
};

export default App;
