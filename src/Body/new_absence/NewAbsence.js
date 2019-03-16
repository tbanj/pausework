import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

var employeeIdError = "first name must be up to 3 characters";
var firstError = "first name must be up to 3 characters";
var lastnameError = "minimum 3 characaters required";
var leaveCheckBoxError= "invalid email address";
var  dateleavestartError ="choose a date";
var  dateleaveendError ="choose a date";
var  leaveDetailError ="minimum 60 characaters required";

var mininterest;
var interests = [];
// var formErrors;
// var errorFirst = document.getElementById("checkFirst");




const onlyLetterRegex = RegExp(/^[A-Za-z]+$/);
  
  
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

class NewAbsence extends React.Component {

    
    constructor(props) {
        super(props);
    
        this.state = {
          firstName: null,
          lastName: null,
          leaveCheckBox: null,
          leaveStart: null,
          leaveEnd: null,
          leaveDetail: null,
          employeeId: null,
          formErrors: {
            
            firstName: "",
            lastName: "",
            employeeId: "",
            leaveCheckBox: "",
            leaveStart: "",
            leaveEnd: "",
            leaveDetail: "",
            errorFirst: false,
            errorLast: false,
            errorleaveCheckBox: false,
            errorleaveStart: false,
            errorleaveEnd: false,
            errorleaveDetail: false,
            errorEmployee: false,
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
            Employee Id: ${this.state.employeeId}
            Type of Leave Request: ${[interests]}
            Leave Start Date: ${this.state.leaveStart}
            Leave Date Date: ${this.state.leaveEnd}
            ReaSON for Leave Request: ${this.state.leaveDetail}
          `);
          alert('leave form submitted successful')
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        this.setState({errorFirst: false});
        this.setState({errorLast: false});
        this.setState({errorEmployee: false});
        // this.setState({errorleaveCheckBox: false});
        // this.setState({errorleaveStart: false});
        // this.setState({errorleaveEnd: false});
        this.setState({errorleaveDetail: false});

        


        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
        
          case "firstName":
              formErrors.firstName =  value.length >= 1 && value.length < 3 || !onlyLetterRegex.test(value)
              ? firstError
              : "";
            break;
          case "lastName":
            formErrors.lastName =
            value.length >= 1 && value.length < 3 ? lastnameError : "";
            break;
            case "employeeId":
            formErrors.employeeId =
            value.length >= 1 && value.length < 3 ? employeeIdError : "";
            break;

        //   case "leaveCheckBox":
        //   formErrors.leaveCheckBox =
        //   value.length >= 1 && value.length < 6 ? leaveCheckBoxError : "";
        //   break;
        //   case "leaveStart":
        //     formErrors.leaveStart =
        //     value.length >= 1 && value.length < 6 ? dateleavestartError : "";
        //     break;
            
        //     case "leaveEnd":
        //     formErrors.leaveEnd =
        //     value.length >= 1 && value.length < 6 ? dateleaveendError : "";
        //     break;

            case "leaveDetail":
            formErrors.leaveDetail =
            value.length >= 1 && value.length < 60  ? leaveDetailError : "";
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
        return (
            <div>
                <div className="row" style={{marginTop: "4.5%", marginBottom: "10%"}}>
                        <div className="col-md-8 offset-md-2">
                        <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{padding: '2% 20%'}}>
                    <div className="">
                    <div id="parentEmployeeId" className="form-group">
                    <label style={{fontWeight: "bold"}} >Employee Identification Number <span className="required">*</span> </label>
                    <input type="text" className="form-control"  placeholder="Employee Identification Number" 
                          name="employeeId" maxLength="40" noValidate onChange={this.handleChange}/>
                           {this.state.errorEmployee ?<span id="checkEmployee" className="text-danger">{employeeIdError}</span>: ""}
                      {formErrors.employeeId.length > 1 && (
                         <span className="text-danger">{formErrors.employeeId}</span>
              )}
                   </div>
                   <div style={{marginTop: "5%"}} className="row">
                   <div id="parentFirst" className="col-md-6 col-sm-12 form-group">
                    <label style={{fontWeight: "bold"}}>First Name <span className="required">*</span></label>
                    <input type="text" className="form-control"  placeholder="First Name" 
                          name="firstName"  maxLength="20"
                          noValidate onChange={this.handleChange}/>
                          {this.state.errorFirst ?<span id="checkFirst" className="text-danger">{firstError}</span>: ""}
                        {formErrors.firstName.length > 1 && (
                         <span className="text-danger">{formErrors.firstName}</span>
              )}

              
                   </div>
                   <div id="parentLast" className="col-md-6 col-sm-12 form-group">
                    <label style={{fontWeight: "bold"}}>Last Name  <span className="required">*</span> </label>
                    <input type="text" className="form-control"  placeholder="Last Name" 
                          name="lastName"  maxLength="20"
                          noValidate onChange={this.handleChange} required/>
                       {this.state.errorLast ?<span id="checkEmployee" className="text-danger">{lastnameError}</span>: ""}
                      
                      {formErrors.lastName.length > 1 && (
                         <span className="text-danger">{formErrors.lastName}</span>
              )}
                   </div>
                   </div>

                   <div style={{marginTop: "5%"}} ><h6>Reason for requested leave: <span className="required">(please tick appropriate box)*</span></h6> </div>
                   <div className="row form-group col-md-12 col-lg-12">
                   <div className="form-check form-check-inline">
                            <input onChange={this.handleChange} className="checkBoxSize form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label id="labelAnnual" className="checkList form-check-label" htmlFor="inlineCheckbox1">Annual Leave</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="checkBoxSize form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                            <label id="labelBereavment" className="checkList form-check-label" htmlFor="inlineCheckbox2">Bereavment</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="checkBoxSize form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
                            <label id="labelMaternity" className="checkList form-check-label" htmlFor="inlineCheckbox3">Maternity Leave</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input  className="checkBoxSize form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"/>
                            <label id="labelSick" className="checkList form-check-label" htmlFor="inlineCheckbox4">Sick</label>
                        </div>
                        <div className="checkBoxSize form-check form-check-inline">
                            <input onChange={this.handleChange} className=" form-check-input" type="checkbox" id="inlineCheckbox5" value="option5"/>
                            <label id="labelUnpaid" className="checkList form-check-label" htmlFor="inlineCheckbox5">Unpaid Leave</label>
                        </div>
                        <div className=" form-check form-check-inline">
                            <input style={{width: '15px', height: '15px',}} onChange={this.handleChange} className=" form-check-input" type="checkbox" id="inlineCheckbox6" value="option6"/>
                            <label id="labelParental" className="checkList form-check-label" htmlFor="inlineCheckbox6">Parental Leave</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={this.handleChange} className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option7"/>
                            <label id="labelOther" className="checkList form-check-label" htmlFor="inlineCheckbox7">other</label>
                        </div>
                        
                    </div>

                    <div style={{marginTop: "5%"}}><h6>Dates Requested:</h6></div>
                    <div className="row">
                        
                        <div className="col-md-6">
                        
                            <div className="form-group">
                                
                                    <div className="">
                                    <p>From</p> <input onChange={this.handleChangeDate} className="form-control" type="date"  id="date-input"></input>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                        
                            <div className="form-group">
                                
                                <div className="">
                                <p>To</p><input onChange={this.handleChangeDate} className="form-control" type="date"  id="date-input"></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop: "5%"}} className="form-group">
                        <textarea id= "inputText" name="leaveDetail"  type="text"  
                            className="form-control" noValidate onChange={this.handleChange}
                            rows="7" placeholder="Details of Leave" ></textarea>

                                {this.state.errorleaveDetail ?<span id="checkEmployee" 
                                className="text-danger">{leaveDetailError}</span>: ""}
                                    
                                    {formErrors.leaveDetail.length > 1 && (
                                        <span className="text-danger">{formErrors.leaveDetail}</span>
                                    )}
                    </div>

                   
                
                        <div className="text-center">
                               
                               {formValid(this.state)? <Link to="/dashboard">
                    <button style={{height: '35px'}} className="btn btn-primary">
                        <p>Submit Form Now</p>
                    </button>
                 </Link>: <button type="submit" className="btn btn-primary"
                                  onClick={() => { 
                                    if(this.state.firstName === null ||
                                      this.state.lastName === null|| this.state.employeeId === null
                                      || this.state.leaveDetail === null) {

                                      if(this.state.firstName === null) {
                                        this.setState({errorFirst: true});
                                        
                                          console.log('there is error');
                                          
                                          
                                      }
                                      if(this.state.employeeId === null) {
                                        this.setState({errorEmployee: true});
                                      }
                                      
                                      if(this.state.lastName === null) {
                                        this.setState({errorLast: true});
                                      }
  
                                      if(this.state.leaveDetail === null) {
                                        this.setState({errorleaveDetail: true});
                                      }
  
                                    //   if(this.state.email === null) {
                                    //     this.setState({errorEmail: true});
                                            
                                    //   }
                                    }
                                    
                                    
                                  }
                                }
                               >Submit</button>
                 
                }
                         </div>
                    </div>
                </form>
            
                </div>
                        </div>
                </div>
            
        );
    }
}
export default NewAbsence;