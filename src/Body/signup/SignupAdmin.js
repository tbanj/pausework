import React from 'react';
import Joi from "joi-browser";
import { Redirect, Link } from "react-router-dom";
import { verifyUser, storeToken } from '../services/authService.js';
import { adminRegister } from '../services/userService';

import Form from '../../reusable/Form.jsx';
import "../../env.js";
import '../../reusable/form.css';


class SignupAdmin extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: '', password: '', fullname: '', admin_key: '' },
      errors: {}
    };
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).max(50).label("Password"),
    fullname: Joi.string().required().min(6).label("Name"),
    admin_key: Joi.string().required().min(4).label("Admin Key"),
  };

  serverData = (data) => {
    let dataSplit = data.fullname.split(' ')
    return {
      first_name: dataSplit[0],
      last_name: dataSplit[1],
      password: data.password,
      email: data.email,
      admin_key: data.admin_key
    }
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  doSubmit = async () => {
    try {
      // below code will reload the application & direct user to url below
      const { data: userdata } = await adminRegister(this.serverData(this.state.data));
      console.log(userdata);

      // const { state } = this.props.location;
      storeToken(userdata.data.employee.is_admin, userdata.data.token);
      window.location = '/dashboard';
      // below will login the user & prevent the user from coming back to this url
      // if the request is successful
      // this.props.history.replace('/movies');
    }

    catch (error) {
      this._isMounted = true;
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this._isMounted && this.setState({ errors })
      }
    }
  }

  render() {
    if (verifyUser()) return <Redirect to="/dashboard" />
    return (
      <div className="backgroundRegister" >
        <div style={{ padding: '0px', border: "0px" }}
          className="card col-md-6 offset-md-3 resizeCard" >
          <h3 style={{ paddingBottom: '1%', paddingTop: '1%', color: 'aliceblue', backgroundColor: '#59a9ff' }}>
            <span className="col-md-5 offset-md-2 col-sm-12">Register</span>
            <span className=" offset-md-3 col-md-4 col-sm-12"><Link style={{ color: 'aliceblue' }} to="/admin-signin">Login</Link></span>
          </h3>
          <form onSubmit={this.handleSubmit} className="container-fluid col-md-8">
            {this.renderInput('email', 'Email', 'email', true)}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('fullname', 'Name', 'text')}
            {this.renderInput('admin_key', 'Admin Key', 'text')}

            {/* submit button is implemented in Form.jsx */}
            {this.renderButton('Register', `btn btn-block btn-lg btn-primary btn-rounded my-3`, { borderRadius: '60px' })}
            <div className="form-group">
              <div className="col-md-12 control-form">
                <div style={{
                  textAlign: 'center',
                  borderTop: '1px solid #888',
                  paddingTop: '15px', marginBottom: '10%', fontSize: '85%'
                }}><a className=" btn btn-primary" type="button" href="/">Back to Home </a></div></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupAdmin;