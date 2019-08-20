import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import axios from 'axios';
import env from '../../env';

import './signup.scss';


var firstError = "first name must be up to 2 characters and letters only";
var adminkeyError = "valid employee Id required";
var lastnameError = "minimum 2 characaters required and letters only";
var emailError = "invalid email address";
var passwordError = "minimum 6 characaters required";
var countryError = " you are yet to select a country";
var timezoneError = " you are yet to select a timezone";
var genderError = " you are yet to select a gender";
var ageError = "valid age required";

var countryList = [{ name: 'Nigeria' }, { name: 'Ghana' }, { name: 'USA' }, { name: 'Canada' }];
var timezoneList = [{ name: 'West Africa/Lagos' }, { name: 'Europe/London' },
{ name: 'America/California' }, { name: 'Middle East/New Delhi' }];
var genderList = [{ name: 'male' }, { name: 'female' }];


var timezoneSelected;
var countrySelected;
var genderSelected;

// var errorFirst = document.getElementById("checkFirst");

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
class SignupAdmin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      admin_key: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      timezone: 'Select Timezone',
      country: 'Select Country',
      age: null,
      serverError: '',
      gender: 'Select Gender',

      errorFirst: false,
      errorLast: false,
      errorAdmin: false,
      errorPassword: false,
      errorEmail: false,
      errorCountry: false,
      errorTimezone: false,
      errorGender: false,
      errorAge: false,

      formErrors: {

        firstName: "",
        lastName: "",
        admin_key: "",
        email: "",
        password: "",
        timezone: "",
        country: "",
        age: "",
        gender: ""
      }
    };

    //   if(localStorage.getItem('pausework-token')){
    //     this.props.history.push('/dashboard');
    // }
    this.successSubmit = this.successSubmit.bind(this);
  }



  handleSubmit = e => {
    e.preventDefault();
    // errorFirst.style.display = "none";
    if (formValid(this.state)) {
      console.log(`
           
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Employee Id: ${this.state.admin_key}
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    this.setState({ errorFirst: false });
    this.setState({ errorLast: false });
    this.setState({ errorEmail: false });
    this.setState({ errorLast: false });
    this.setState({ errorPassword: false });
    this.setState({ errorAdmin: false });
    this.setState({ errorCountry: false });
    this.setState({ errorTimezone: false });
    this.setState({ errorAge: false });
    this.setState({ errorGender: false });


    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {

      case "firstName":
        formErrors.firstName = value.length >= 1 && value.length < 2
          ? firstError
          : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length >= 1 && value.length < 2 ? lastnameError : "";
        break;

      case "age":
        formErrors.age =
          value < 1 ? ageError : "";

        break;

      case "admin_key":
        formErrors.admin_key =
          value.length >= 1 && value.length < 5 ? adminkeyError : "";
        break;

      case "country":
        formErrors.country =
          this.state.country === "Select Country" ? countryError : "";
        break;

      case "gender":
        formErrors.gender =
          this.state.gender === 'Select Gender' ? genderError : "";


        break;


      case "timezone":
        formErrors.timezone =
          this.state.timezone === "Select Timezone" ? timezoneError : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : emailError;
        break;
      case "password":
        formErrors.password =
          value.length >= 1 && value.length < 6 ? passwordError : "";
        break;
      default:
        break;
    }

    // acquiring country & timezone selected from option
    countrySelected = document.getElementById('idcountry').value;
    this.setState({ country: countrySelected });
    timezoneSelected = document.getElementById('idtimezone').value;
    this.setState({ timezone: timezoneSelected });

    genderSelected = document.getElementById('idgender').value;
    this.setState({ gender: genderSelected });

    // u can add callback to the function below to see how the value is being set
    this.setState({ formErrors, [name]: value }
    );
    // console.log(this.state)

  };

  successSubmit = async () => {
    try {
      const body = {
        "admin_key": this.state.admin_key,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "age": parseFloat(this.state.age),
        "gender": this.state.gender,
        "country": this.state.country,
        "timezone": this.state.timezone,
        "email": this.state.email,
        "isadmin": true,
        "password": this.state.password
      }
      const res = await axios.post(`${env.api}/employee/admin`, body,
      );
      console.log(res.data);

      const token = res.data.data.token;
      const adminKey = res.data.data.employee.admin_key;
      const info = res.data.data.employee.isadmin;

      localStorage.setItem('pausework-token', token);
      localStorage.setItem('pausework-info', info);
      localStorage.setItem('pausework-admin', adminKey);
      this.props.history.push('/dashboard');
      // setTimeout(() =>{
      //   this.props.history.push('/dashboard');
      // },4000);
      // swal({
      //   title: "Good job!",
      //   text: "You clicked the button!",
      //   icon: "success",
      //   button: "close",
      // });



    } catch (err) {
      console.log('An error occured', err.response);
      this.setState({ serverError: 'the email address already exist' });
      console.log(this.state.serverError);
      // this.props.history.push('/');

    }
  }

  checkSubmitError = e => {
    if (this.state.firstName === null ||
      this.state.lastName === null || this.state.password === null
      || this.state.email === null
      || this.state.age < 1 || this.state.age === null
      || this.state.country === "Select Country"
      || this.state.timezone === "Select Timezone"
      || this.state.gender === "Select Gender") {

      if (this.state.firstName === null) {
        this.setState({ errorFirst: true });

        console.log('there is error');


      }
      if (this.state.admin_key === null) {
        this.setState({ errorAdmin: true });
      }

      if (this.state.lastName === null) {
        this.setState({ errorLast: true });
      }

      if (this.state.password === null) {
        this.setState({ errorPassword: true });
      }

      if (this.state.email === null) {
        this.setState({ errorEmail: true });

      }

      if (this.state.country === "Select Country") {
        this.setState({ errorCountry: true });
      }

      if (this.state.timezone === "Select Timezone") {
        this.setState({ errorTimezone: true });
      }
      if (this.state.gender === "Select Gender") {
        this.setState({ errorGender: true });
      }

      if (this.state.age === null) {
        this.setState({ errorAge: true });
      }
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
        <div style={{ marginTop: '4.3%', marginBottom: '10%' }}>
          <div className="row">
            <div className="col-6 col-md-6">
              <img style={{ width: '100%', height: '83%' }} src={require('./../../img/sick-employee.jpg')} className="img-responsive" alt="absence" />

            </div>

            <div className="col-6 col-md-6">
              <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{ padding: '2% 20%' }}>
                <div className="">
                  <p className="text-danger">{this.state.serverError}</p>
                  <div id="parentEmployeeId" className="form-group">
                    <label >Admin Key</label>
                    <input type="text" className="form-control" placeholder="Admin key required"
                      name="admin_key" maxLength="40" noValidate onChange={this.handleChange} />
                    {this.state.errorAdmin ? <span id="checkEmployee" className="text-danger">{adminkeyError}</span> : ""}
                    {formErrors.admin_key.length > 1 && (
                      <span className="text-danger">{formErrors.admin_key}</span>
                    )}
                  </div>
                  <div id="parentFirst" className="form-group">
                    <label >First Name <span className="required">*</span></label>
                    <input type="text" className="form-control" placeholder="First Name"
                      name="firstName" maxLength="20"
                      noValidate onChange={this.handleChange} />
                    {this.state.errorFirst ? <span id="checkFirst" className="text-danger">{firstError}</span> : ""}
                    {formErrors.firstName.length > 1 && (
                      <span id="baa" className="text-danger">{formErrors.firstName}</span>
                    )}


                  </div>
                  <div id="parentLast" className="form-group">
                    <label >Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name"
                      name="lastName" maxLength="20"
                      noValidate onChange={this.handleChange} required />
                    {this.state.errorLast ? <span id="checkEmployee" className="text-danger">{lastnameError}</span> : ""}

                    {formErrors.lastName.length > 1 && (
                      <span className="text-danger">{formErrors.lastName}</span>
                    )}
                  </div>






                  <div id="parentEmail" className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                      name="email" maxLength="40" noValidate onChange={this.handleChange} />
                    {this.state.errorEmail ? <span id="checkEmail" className="text-danger">{adminkeyError}</span> : ""}

                    {formErrors.email.length > 1 && (
                      <span className="text-danger">{formErrors.email}</span>
                    )}
                  </div>

                  <div id="parentPassword" className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                      name="password" maxLength="50"
                      noValidate
                      onChange={this.handleChange} />
                    {this.state.errorPassword ? <span id="checkPassword" className="text-danger">{passwordError}</span> : ""}

                    {formErrors.password.length > 1 && (
                      <span className="text-danger">{formErrors.password}</span>
                    )}
                  </div>

                  {/* age and gender */}

                  <div className="row ">

                    <div id="parentLast" className="col-md-6 form-group">
                      <label >Age</label>
                      <input type="number" className="form-control" placeholder="Age"
                        name="age" maxLength="2"
                        noValidate onChange={this.handleChange} required />
                      {this.state.errorAge ? <span id="checkAge" className="text-danger">{ageError}</span> : ""}

                      {formErrors.age < 1 && (
                        <span className="text-danger">{formErrors.age}</span>
                      )}
                    </div>



                    <div className="col-md-6  form-group">
                      <label htmlFor="country">Gender</label>
                      <select className="form-control" onChange={this.handleChange} id="idgender">
                        <option >Select Gender</option>
                        {
                          genderList.map((item, ind) => {

                            return <option key={ind}>{item.name}</option>
                          })
                        }
                      </select>

                      {this.state.errorGender ? <span id="checkGender"
                        className="text-danger">{genderError}</span> : ""}


                      {formErrors.gender !== "Select Gender" && (
                        <span className="text-danger">{formErrors.gender}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select className="form-control" onChange={this.handleChange} id="idcountry">
                      <option >Select Country</option>
                      {
                        countryList.map((item, i) => {

                          return <option key={i}>{item.name}</option>
                        })
                      }
                    </select>

                    {this.state.errorCountry ? <span id="checkCountry"
                      className="text-danger">{countryError}</span> : ""}


                    {formErrors.country !== "Select Country" && (
                      <span className="text-danger">{formErrors.country}</span>
                    )}
                  </div>

                  <div className="form-group ">
                    <label htmlFor="timezone">Timezone</label>
                    <select className="form-control" onChange={this.handleChange} id="idtimezone">
                      <option >Select Timezone</option>
                      {
                        timezoneList.map((item, ine) => {

                          return <option key={ine}>{item.name}</option>
                        })
                      }
                    </select>

                    {this.state.errorTimezone ? <span id="checkTimezone"
                      className="text-danger">{timezoneError}</span> : ""}


                    {formErrors.timezone !== "Select Timezone" && (
                      <span className="text-danger">{formErrors.timezone}</span>
                    )}
                  </div>


                  <div className="text-center">

                    {formValid(this.state) ?
                      <input type="submit" style={{ height: '35px' }}
                        onClick={this.successSubmit} className="btn btn-primary" value="Submit Form Now 🚀" />

                      : <button type="submit" className="btn btn-primary"
                        onClick={this.checkSubmitError}
                      >Register</button>

                    }
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
export default SignupAdmin;