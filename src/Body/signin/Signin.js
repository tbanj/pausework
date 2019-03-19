import React from 'react';

import { Link } from 'react-router-dom';

var errorPassword = "minimum 6 characaters required";
var errorEmail = "invalid email address";
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
class Signin extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          
          email: null,
          password: null,
          formErrors: {
            email: "",
            password: "",
            errorEmail: false,
            errorPassword: false,
          }
        };
      }
    
      handleSubmit = e => {
        
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
           
            
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
          alert('registration successful')
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        this.setState({errorEmail: false});
        this.setState({errorPassword: false});
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
        
          
          
      
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : errorEmail;
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? errorPassword : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };
    render() {
        const { formErrors } = this.state;
        return(
            <div style={{marginBottom: '10%'}}>
                <div  className="row">
                    <div className="col-6 col-md-6">
                        <img style={{width: '100%',  height: '100%'}} src={require('./../../img/sick-employee.jpg')} className="img-responsive" alt="absence"/>
                
                    </div>

                   <div className="col-6 col-md-6">
                         <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{padding: '2% 20%', marginTop: '35%'}}>
                    <div className="">
                  
                    <div className="text-center form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control"  placeholder="Enter email" 
                          name="email"  noValidate onChange={this.handleChange}/>
                         {this.state.errorEmail ? <span className="text-danger">{errorEmail}</span>: ""} 
                      {formErrors.email.length > 0 && (
                         <span className="text-danger">{formErrors.email}</span>
              )}
                   </div>
                <div className="text-center form-group">
                    <label >Password</label>
                    <input type="password" className="form-control"  placeholder="Password" 
                                    name="password"
                                    noValidate
                                    onChange={this.handleChange}/>
                <div style={{fontWeight: 'bold'}} className="pull-right"> <a href=""> Forget Password ?</a></div>
                          
                      {this.state.errorPassword ? <span className="text-danger">{errorPassword}</span>: ""} 
                      
                     {formErrors.password.length > 0 && (
                <span className="text-danger">{formErrors.password}</span>
              )}
                </div>
              
                <div style={{marginTop: '10%'}} className="text-center">
                      <div className="row col-md-8 offset-md-2">
                          <div className="col-md-10">
                                {formValid(this.state) ? <Link to="/dashboard">
                              <button style={{height: '35px'}} className="btn btn-primary">
                                  <p>Login</p>
                              </button>
                          </Link>
                          :<button type="submit" onClick={() =>{
                                  if(this.state.email === null || this.state.password === null) {
                                    if(this.state.email === null) {
                                      this.setState({errorEmail: true});
                                    }
                                    
                                    if(this.state.password === null) {
                                      this.setState({errorPassword: true});
                                      console.log('error passs');
                                      
                                    }
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

        )
    }
}
export default Signin;