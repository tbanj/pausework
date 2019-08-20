import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'

import Timeoff from './Body/Timeoff';
import Footer from './Footer/Footer';

import Signup from './Body/signup/Signup';
import Signin from './Body/signin/Signin';
import Dashboard from './Body/dashboard/Dashboard';
import NewAbsence from './Body/new_absence/NewAbsence';
import Teamview from './Body/Teamview/Teamview';
import SignupAdmin from './Body/signup/SignupAdmin';
import './App.css';
class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <div className="content" style={{ height: '100%' }}>
          <ReactTooltip />
          <Switch>
            <Route exact path="/" component={Timeoff} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signupadmin" component={SignupAdmin} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/newabsence" component={NewAbsence} />
            <Route exact path="/teamview" component={Teamview} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
