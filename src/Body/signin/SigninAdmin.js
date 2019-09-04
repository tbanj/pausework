import React from 'react';
import Joi from "joi-browser";
import { Redirect, Link } from "react-router-dom";
import { verifyUser, login, storeToken } from '../services/authService.js';
import Form from '../../reusable/Form.jsx';
import "../../env.js";
import '../../reusable/form.css';


class SigninAdmin extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: { email: '', password: '' },
            errors: {}
        };
    }

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(6).max(50).label("Password")
    };

    componentDidMount() {

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    doSubmit = async () => {
        try {
            const { data: userdata } = await login(this.state.data);
            console.log(userdata);

            storeToken(userdata.data.result.is_admin, userdata.data.token);
            // below code will reload the application & direct user to url below
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : `/${userdata.data.urlTo}`;
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
        if (verifyUser()) return <Redirect to="/admin-dashboard" />

        return (
            <div className="backgroundRegister">
                <div className="card col-md-6 offset-md-3 resizeCard" >
                    <h3 style={{ paddingTop: '1%' }}>
                        <span className="col-md-5 offset-md-2 col-sm-12">Signin</span>
                        <span className=" offset-md-3 col-md-4 col-sm-12"><Link style={{ color: '#212565' }} to="/"> Back to Home</Link>
                        </span>
                    </h3>
                    <hr />
                    <form onSubmit={this.handleSubmit} className="container-fluid col-md-8">
                        {this.renderInput('email', 'Email', 'email', true)}
                        {this.renderInput('password', 'Password', 'password')}
                        <div className="form-group row">
                            <div className="col-md-12">
                                <div className="checkbox checkbox-primary pull-left p-t-0">
                                    <input id="checkbox-signup" type="checkbox" className="filled-in chk-col-light-blue" />
                                    <label htmlFor="checkbox-signup"> Remember me </label>
                                </div>
                                <a id="#forgetPassword" href="#forgetPassword" className="text-dark pull-right"><i className="fa fa-lock m-r-5"></i> Forgot password?</a> </div>
                        </div>
                        {/* submit button is implemented in Form.jsx */}
                        {this.renderButton('Signin', `btn btn-block btn-lg btn-primary btn-rounded my-3`, { borderRadius: '60px' })}
                        <div className="form-group">
                            <div className="col-md-12 control-form">
                                <div style={{
                                    textAlign: 'center',
                                    borderTop: '1px solid #888',
                                    paddingTop: '15px', marginBottom: '10%', fontSize: '85%'
                                }}><span className="mx-3">Don't have an account!
                            </span><a className=" btn btn-primary" type="button" href="/admin-signup">Sign Up Here </a></div></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SigninAdmin;