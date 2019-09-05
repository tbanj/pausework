import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { storeToken, login } from "../services/authService.js";
import './signin.scss';

var errorPassword = "minimum 6 characaters required";
var errorEmail = "invalid email address";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitLoader: '', email: null, password: null,
      formErrors: {
        email: "", password: "", errorEmail: false, errorPassword: false,
      }
    };

    if (localStorage.getItem('pausework-token') && localStorage.getItem('pausework-info')) {
      this.props.history.push('/dashboard');
    }
    this.submitForm = this.submitForm.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
    } else {
      // console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    if (document.getElementById("errorContent").innerText.length > 0) {
      let clearErrorContent = document.getElementById("errorContent");
      clearErrorContent.style.display = "none";
    }
    this.setState({ errorEmail: false });
    this.setState({ errorPassword: false });
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : errorEmail;
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? errorPassword : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  async submitForm() {
    try {
      const body = {
        "email": this.state.email,
        "password": this.state.password
      };

      let submitLoader = "spinner-border text-light";
      this.setState({ submitLoader });
      const { data } = await login(body);
      storeToken(data.data.result.is_admin, data.data.token);

      setTimeout(() => {
        this.props.history.push(`/${data.data.urlTo}`);
      }, 2000);
      swal("Login Successful!", "You clicked the button!", "success");
    } catch (err) {
      let loginChecker = document.getElementById("errorLogin");
      setTimeout(() => {
        if (!err.response.data['message']) {
          loginChecker.style.display = "block";
          document.getElementById("errorContent").innerText = 'invalid login details'; return;
        }
        else if (err.response.data['message']) {
          loginChecker.style.display = "block";
          document.getElementById("errorContent").innerText = err.response.data['message'];
          this.setState({ submitLoader: '' });
        }
      }, 4000);
      swal("Invalid login details!", "", "error");
      this.setState({ submitLoader: "" });
    }
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div>
        {/* header div nav */}
        <div className="row navBackground fixed-top">
          <nav className="navbar navbar-expand-lg  navbar-light col-md-9 offset-md-1">
            <Link className="nav-link parentChild setFontColor" to="/">PauseWork</Link>
            <button style={{ border: '2px solid white' }} className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">

              </ul>
              <form className="form-inline my-2 my-lg-0">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
                  <li id="idSign" className="nav-item">
                    <Link className="nav-link navChild setFontColor" to="/signup">Signup</Link>
                  </li>
                  <li id="idSign" className="nav-item">
                    <Link to="/signin">
                      <button style={{ height: '35px' }} className="btn btn-outline-primary my-2 my-sm-0 setFontColor signinHov">
                        <p className="">Sign in</p>
                      </button>
                    </Link>
                  </li>
                </ul>

              </form>
            </div>
          </nav>
        </div>

        {/* body div */}
        <div>
          <div className="row" style={{ position: 'absolute' }}>
            <div className="col-6 col-md-6">
              <img style={{ width: '100%', height: '100%' }} src={require('./../../img/sick-employee.jpg')} className="img-responsive" alt="absence" />

            </div>

            <div className="col-6 col-md-6">
              <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{ padding: '2% 20%', marginTop: '35%' }}>
                <div className="">
                  <div id="errorLogin" style={{ display: 'none' }} className="py-3">
                    <div id="errorContent" className="alert alert-danger" role="alert"></div>
                  </div>
                  <div className="text-center form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                      name="email" noValidate onChange={this.handleChange} />
                    {this.state.errorEmail ? <span className="text-danger">{errorEmail}</span> : ""}
                    {formErrors.email.length > 0 && (
                      <span className="text-danger">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="text-center form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                      name="password"
                      noValidate
                      onChange={this.handleChange} />
                    {/* <div style={{ fontWeight: 'bold', float: 'right' }} > <a href="/"> Forget Password ?</a></div> */}

                    {this.state.errorPassword ? <span className="text-danger">{errorPassword}</span> : ""}

                    {formErrors.password.length > 0 && (
                      <span className="text-danger">{formErrors.password}</span>
                    )}
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="checkbox checkbox-primary pull-left p-t-0">
                        <input id="checkbox-signup" type="checkbox" className="filled-in chk-col-light-blue" />
                        <label htmlFor="checkbox-signup"> Remember me </label>
                      </div>
                      <a id="#forgetPassword" href="#forgetPassword" className="text-dark pull-right"><i className="fa fa-lock m-r-5"></i> Forgot password?</a> </div>

                  </div>

                  <div style={{ marginTop: '10%' }} className="text-center">
                    <div className="row col-md-8 offset-md-2">
                      <div className="col-md-10">
                        {formValid(this.state) ?

                          <button type="submit" style={{}}
                            onClick={this.submitForm} className={`btn btn-primary `}>Login<span role="img" aria-label="Rocket">🚀 🥇</span> <i className={this.state.submitLoader}></i></button>
                          : <button type="submit" onClick={() => {
                            if (this.state.email === null || this.state.password === null) {
                              if (this.state.email === null) { this.setState({ errorEmail: true }); }
                              if (this.state.password === null) { this.setState({ errorPassword: true }); }
                            }
                          }
                          }
                            className="btn btn-primary">Login</button>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>


      </div>
    )
  }
}
export default Signin;