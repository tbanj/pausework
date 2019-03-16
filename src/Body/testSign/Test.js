import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './footer.scss';

var firstError = "first name must be up to 3 characters";
var employeeIdError = "minimum 5 characaters required";
var lastnameError = "minimum 3 characaters required";
var emailError= "invalid email address";
var  passwordError ="minimum 6 characaters required";
var errorFirst;
var baa;

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

class Test extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          companyName: null,
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          formErrors: {
            companyName: '',
            firstName: "",
            lastName: "",
            employee_id: "",
            email: "",
            password: ""
          }
        };
      }


      handleChange = e => {
        
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
        
          case "firstName":
              formErrors.firstName =  value.length >= 1 && value.length < 2 || !onlyLetterRegex.test(value)
              ? firstError
              : "";
              // errorFirst.innerText ="";
            break;
          case "lastName":
            formErrors.lastName =
            value.length >= 1 && value.length < 3 ? lastnameError : "";
            break;
        // case "employee_id":
        //     formErrors.employee_id =
        //     value.length >= 1 && value.length < 3 ? employeeIdError : "";
        //     break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : emailError;
            break;
        //   case "password":
        //     formErrors.password =
        //     value.length >= 1 && value.length < 6 ? passwordError : "";
        //     break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };

        render() {
            return (
                <div style={{marginTop: '100px', marginLeft: '150px', marginBottom: '200px'}}className="row">

                    <form className="form-horizontal form-label-left" novalidate>
                        
                        <div className="item form-group">
                        <label className="control-label col-md-3 col-sm-3 col-xs-12" for="firstName">First Name
                        <span className="required">*</span>
                        </label>
                        <div className="">
                        <input id="name" className="form-control" 
                        data-validate-length-range="6" data-validate-words="2" name="firstName" 
                        placeholder="both name(s) e.g Jon Doe" required="required" type="text"/>
                        
                        </div>
                        </div>


                        <div className="item form-group">
                        <label className="control-label col-md-3 col-sm-3 col-xs-12" for="lastName">Last Name
                        <span className="required">*</span>
                        </label>
                        <div className="">
                        <input id="name" className="form-control" 
                        data-validate-length-range="6" data-validate-words="2" name="lastName" 
                        placeholder="both name(s) e.g Jon Doe" required="required" type="text"/>
                        </div>
                        </div>

                        <div className="item form-group">
                        <label className="control-label col-md-3 col-sm-3 col-xs-12" for="email">Email <span className="required">*</span>
                        </label>
                        <div className="">
                        <input type="email" id="email" name="email" required="required" className="form-control col-md-7 col-xs-12"/>
                        </div>
                        </div>
                        <div className="item form-group">
                        <label className="control-label col-md-3 col-sm-3 col-xs-12" for="email">Confirm Email <span className="required">*</span>
                        </label>
                        <div className="">
                        <input type="email" id="email2" name="confirm_email" data-validate-linked="email" required="required" className="form-control col-md-7 col-xs-12"/>
                        </div>
                        </div>
                        <div className="item form-group">
                        <label className="control-label col-md-3 col-sm-3 col-xs-12" for="number">Number <span className="required">*</span>
                        </label>
                        <div className="">
                        <input type="number" id="number" name="number" required="required" data-validate-minmax="10,100" className="form-control col-md-7 col-xs-12"/>
                        </div>
                        </div>
                        <div className="item form-group">

                        <div className="ln_solid"></div>
                        <div className="form-group">
                        <div className="col-md-6 col-md-offset-3">

                        <button type="submit" className="btn btn-primary">Cancel</button>
                        <button id="send" type="submit" className="btn btn-success">Submit</button>
                        </div>
                        </div>
                        </div>
                    </form>
                </div>
            );
        }
}
export default Test;