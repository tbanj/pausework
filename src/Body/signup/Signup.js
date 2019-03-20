import React from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';


var firstError = "first name must be up to 2 characters and letters only";
var employeeIdError = "valid employee Id required";
var lastnameError = "minimum 2 characaters required and letters only";
var emailError= "invalid email address";
var  passwordError ="minimum 6 characaters required";


// var errorFirst = document.getElementById("checkFirst");

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const onlyLetterRegex = RegExp(/^[A-Za-z]+$/)
  
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
class Signup extends React.Component{
  
    constructor(props) {
        super(props);
    
        this.state = {
          employee_id: null,
          firstName: null,
          lastName: null,
          email: null,
          password: null,

          errorFirst: false,
            errorLast: false,
            errorEmployee: false,
            errorPassword: false,
            errorEmail: false,
          formErrors: {
            
            firstName: "",
            lastName: "",
            employee_id: "",
            email: "",
            password: "",
            
          }
        };
      }
    
      

      handleSubmit = e => {
        e.preventDefault();
        // errorFirst.style.display = "none";
        if (formValid(this.state)) {
          console.log(`
           
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Employee Id: ${this.state.employee_id}
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
          alert('registration successful')
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        this.setState({errorFirst: false});
        this.setState({errorLast: false});
        this.setState({errorEmail: false});
        this.setState({errorLast: false});
        this.setState({errorPassword: false});
        this.setState({errorEmployee: false});


        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
        
          case "firstName":
              formErrors.firstName =  value.length >= 1 && value.length < 2 || !onlyLetterRegex.test(value)
              ? firstError
              : "";
            break;
          case "lastName":
            formErrors.lastName =
            value.length >= 1 && value.length < 2 ? lastnameError : "";
            break;
        case "employee_id":
            formErrors.employee_id =
            value.length >= 1 && value.length < 5 ? employeeIdError : "";
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
    
        this.setState({ formErrors, [name]: value }, () => 
        console.log(this.state)
        );
      };
    render() {
        const { formErrors } = this.state;
        return(
            <div>
               {/* header div nav */}
            <div className="row navBackground fixed-top">
            <nav className="navbar navbar-expand-lg  col-md-9 offset-md-1">
          <button style={{border: '2px solid white'}} className="navbar-toggler" type="button" data-toggle="collapse"
           data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
              
              <li className="nav-item">
                <Link className="nav-link parentChild setFontColor" to="/">PauseWork</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
            
              <li id="idSign" className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/signup">Signup</Link>
              </li>

              <li id="idSign" className="nav-item">
                    <Link to="/signin">
                            <button style={{height: '35px'}} className="btn btn-outline-primary my-2 my-sm-0 setFontColor signinHov">
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
            <div style={{marginTop: '4.3%' ,marginBottom: '10%'}}>
                <div  className="row">
                    <div className="col-6 col-md-6">
                        <img style={{width: '100%',  height: '83%'}} src={require('./../../img/sick-employee.jpg')} className="img-responsive" alt="absence"/>
                
                    </div>

                   <div className="col-6 col-md-6">
                         <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{padding: '2% 20%'}}>
                    <div className="">
                    <div id="parentEmployeeId" className="form-group">
                    <label >Employee Identification Number</label>
                    <input type="text" className="form-control"  placeholder="Employee Identification Number" 
                          name="employee_id" maxLength="40" noValidate onChange={this.handleChange}/>
                           {this.state.errorEmployee ?<span id="checkEmployee" className="text-danger">{employeeIdError}</span>: ""}
                      {formErrors.employee_id.length > 1 && (
                         <span className="text-danger">{formErrors.employee_id}</span>
              )}
                   </div>
                   <div id="parentFirst" className="form-group">
                    <label >First Name <span className="required">*</span></label>
                    <input type="text" className="form-control"  placeholder="First Name" 
                          name="firstName"  maxLength="20"
                          noValidate onChange={this.handleChange}/>
                          {this.state.errorFirst ?<span id="checkFirst" className="text-danger">{firstError}</span>: ""}
                      {formErrors.firstName.length > 1  && (
                         <span id="baa" className="text-danger">{formErrors.firstName}</span>
              )}

              
                   </div>
                   <div id="parentLast" className="form-group">
                    <label >Last Name</label>
                    <input type="text" className="form-control"  placeholder="Last Name" 
                          name="lastName"  maxLength="20"
                          noValidate onChange={this.handleChange} required/>
                       {this.state.errorLast ?<span id="checkEmployee" className="text-danger">{lastnameError}</span>: ""}
                      
                      {formErrors.lastName.length > 1 && (
                         <span className="text-danger">{formErrors.lastName}</span>
              )}
                   </div>

                   


                   

                    <div id="parentEmail" className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control"  placeholder="Enter email" 
                          name="email" maxLength="40" noValidate onChange={this.handleChange}/>
                       {this.state.errorEmail ?<span id="checkEmail" className="text-danger">{employeeIdError}</span>: ""}
                      
                      {formErrors.email.length > 1 && (
                         <span className="text-danger">{formErrors.email}</span>
              )}
                   </div>
                <div id="parentPassword" className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control"  placeholder="Password" 
                                    name="password" maxLength="50"
                                    noValidate
                                    onChange={this.handleChange}/>
                      {this.state.errorPassword ?<span id="checkPassword" className="text-danger">{passwordError}</span>: ""}
                      
                     {formErrors.password.length > 1 && (
                <span className="text-danger">{formErrors.password}</span>
              )}
                </div>
                <div className="form-group">
                    <label >Country</label>
                    <select className="form-control" >
                        <option>Canada</option>
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Togo</option>
                        <option>South Africa</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label >Time Zone</label>
                    <select className="form-control" >
                        <option>West Africa/ Abuja</option>
                        <option>Europe/London</option>
                        <option>America/Califonia</option>
                        <option>India/New Delhi</option>
                    </select>
                    </div>
                        <div className="text-center">
                               
                               {formValid(this.state)? <Link to="/dashboard">
                    <button style={{height: '35px'}} className="btn btn-primary">
                        <p>Submit Form Now</p>
                    </button>
                 </Link>: <button type="submit" className="btn btn-primary"
                                  onClick={() => { 
                                    if(this.state.firstName === null ||
                                      this.state.lastName === null|| this.state.password === null
                                      || this.state.email === null) {

                                      if(this.state.firstName === null) {
                                        this.setState({errorFirst: true});
                                        
                                          console.log('there is error');
                                          
                                          
                                      }
                                      if(this.state.employee_id === null) {
                                        this.setState({errorEmployee: true});
                                      }
                                      
                                      if(this.state.lastName === null) {
                                        this.setState({errorLast: true});
                                      }
  
                                      if(this.state.password === null) {
                                        this.setState({errorPassword: true});
                                      }
  
                                      if(this.state.email === null) {
                                        this.setState({errorEmail: true});
                                            
                                      }
                                    }
                                    
                                    
                                  }}
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
export default Signup;