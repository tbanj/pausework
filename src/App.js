import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Timeoff from './Body/Timeoff';
import Footer from './Footer/Footer';
import Signup from './Body/signup/Signup';
import Signin from './Body/signin/Signin';
import Dashboard from './Body/dashboard/Dashboard';
import DashboardAdmin from './Body/dashboard/DashboardAdmin.js';
import NewAbsence from './Body/new_absence/NewAbsence';
import Teamview from './Body/Teamview/Teamview';
import SignupAdmin from './Body/signup/SignupAdmin';
import SigninAdmin from './Body/signin/SigninAdmin';
// import TestApi from './'
import TestApi from './Body/testSign/TestApi';
import View from './Body/view/View.jsx';
import './App.css';


class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <div className="content" style={{ height: '100%' }}>
          <Switch>
            <Route path="/dashboard/:page/:id" component={View} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/testapi" component={TestApi} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/admin-signin" component={SigninAdmin} />
            <Route exact path="/admin-signup" component={SignupAdmin} />
            <Route exact path="/admin-dashboard" component={DashboardAdmin} />
            <Route exact path="/signin" component={Signin} />

            <Route exact path="/newabsence" component={NewAbsence} />
            <Route exact path="/teamview" component={Teamview} />

            <Route exact path="/" component={Timeoff} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
