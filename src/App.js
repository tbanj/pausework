import React, { Component } from 'react';

import './App.css';
// import Header from './Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import Timeoff from './Body/Timeoff';
import Footer from './Footer/Footer';
import { BrowserRouter, Route, Switch,Redirect, Link} from 'react-router-dom';
import Signup from './Body/signup/Signup';
import Signin from './Body/signin/Signin';
import Test from './Body/testSign/Test';
import Dashboard from './Body/dashbaord/Dashbaord';
import NewAbsence from './Body/new_absence/NewAbsence';
class App extends Component {
  render() {
    return (
      <div className="">
      <BrowserRouter>
        <div>

        <Header/>
        <Switch>
            <Route exact path="/" exact component={Timeoff}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/test" component={Test}/>
            <Route exact path="/newabsence" component={NewAbsence}/>
            <Redirect to="/" />
        </Switch>
        <Footer/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
