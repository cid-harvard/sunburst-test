import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import CitiesAllNodes from './pages/CitiesAllNodes';
import CitiesSmallNodeBucket from './pages/CitiesSmallNodeBucket';
import CitiesAggregateToCountry from './pages/CitiesAggregateToCountry';
import CitiesAggregateToCountryExceptCurrent from './pages/CitiesAggregateToCountryExceptCurrent';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path={'/cities-all-nodes'} component={CitiesAllNodes} />
        <Route exact path={'/cities-bucket-nodes'} component={CitiesSmallNodeBucket} />
        <Route exact path={'/cities-aggregate-nodes'} component={CitiesAggregateToCountry} />
        <Route exact path={'/cities-aggregate-nodes-except-current'} component={CitiesAggregateToCountryExceptCurrent} />
        <Route component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
