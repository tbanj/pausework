import React from 'react';
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { verifyUser } from '../services/authService.js';
import Form from '../../reusable/Form.jsx';
import "../../env.js";
import '../../reusable/form.css';
class SignupAdmin extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: '', password: '', fullname: '' },
      errors: {}
    };
  }


  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(6).max(50).label("Password"),
    fullname: Joi.string().required().min(4).label("Name")
  };

  componentDidMount() {
    this.returningUser()
    console.log(verifyUser());

  }

  returningUser = () => {


    console.log(process.env.REACT_APP_API);

  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  doSubmit = async () => {


    try {
      const { data } = this.state;

      // below code will reload the application & direct user to url below
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/dashboard/movies';

      // below will login the user & prevent the user from coming back to this url
      // if the request is successful
      // this.props.history.replace('/movies');
      // console.log(` Login form SUBMITTED`);
    }
    catch (error) {
      this._isMounted = true;
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this._isMounted && this.setState({ errors })

      }
    }
  }

  render() {
    if (verifyUser()) return <Redirect to="/dashboard" />
    // setTimeout(() => {

    // }, 1000);

    return (
      <div className="backgroundRegister">
        <div className="card col-md-6 offset-md-3 resizeCard" >
          <form onSubmit={this.handleSubmit} className="container-fluid col-md-8"
          >
            <h3> Register</h3>
            {this.renderInput('username', 'Username', 'email', true)}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('fullname', 'Name', 'text')}
            <div className="form-group row">
              <div className="col-md-12">
                <div className="checkbox checkbox-primary pull-left p-t-0">
                  <input id="checkbox-signup" type="checkbox" className="filled-in chk-col-light-blue" />
                  <label htmlFor="checkbox-signup"> Remember me </label>
                </div>
                <a id="#forgetPassword" href="#forgetPassword" className="text-dark pull-right"><i className="fa fa-lock m-r-5"></i> Forgot password?</a> </div>
            </div>
            {/* submit button is implemented in Form.jsx */}
            {this.renderButton('Register', `btn btn-block btn-lg btn-primary btn-rounded my-3`, { borderRadius: '60px' })}
          </form>
        </div>
      </div>
    );
  }
}

export default SignupAdmin;