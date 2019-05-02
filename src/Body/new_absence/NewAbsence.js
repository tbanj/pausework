import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';


var employeeIdError = "invalid employee Id ";
var firstError = "invalid first name";
var lastnameError = "invalid last name";

var  leaveDetailError ="summarize why you are applying for a leave";
var leavePurpose;
var leavePurposeError = " you are yet to select purpose of leave"



var reasonForTimeOff = [
  {name:'Maternity Leave' , days: '30'},
  {name:'Highly Stressed out' , days: '1'},
  {name:'Annual Leave' , days: '20'},
  {name:'Sick' , days: '3'},
  
]

let date = new Date();
// use to select current date and disabled passed date
date = `${date.getFullYear()}-0${date.getMonth() + 1 }-${date.getDate()}`;


  
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
          
          leaveStart: date,
          leaveEnd:date,
          leaveDetail: null,
          employeeId: null,
          reasonforLeave: 'Choose Leave Type',
          
          startTime: date,
        stopTime: date,
        timeDuration: '0 Day',
        
          formErrors: {
            
            firstName: "",
            lastName: "",
            employeeId: "",
            leaveDetail: "",
            reasonforLeave: "",
            timeDuration: "",
            
          },
          showError: false,
          errorFirst: false,
          errorLast: false,
          
          errorleaveStart: false,
          errorleaveEnd: false,
          errorleaveDetail: false,
          errorEmployee: false,
          errorleavePurpose: false,
        };

        this.logout = this.logout.bind(this);

        if(!localStorage.getItem('pausework-token')){
            this.props.history.push('/');
        }

      }
    
      componentDidMount(){
        //   componentDidMount is the method that makes the data
        // available once the page load
       
        
      }
      

      handleSubmit = e => {
        e.preventDefault();
        // errorFirst.style.display = "none";

        

        if (formValid(this.state)) {
          
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        this.setState({errorFirst: false});
        this.setState({errorLast: false});
        this.setState({errorEmployee: false});
        this.setState({errorleavePurpose: false});
        this.setState({errorleaveStart: false});
        this.setState({errorleaveEnd: false});
        this.setState({errorleaveDetail: false});
        

        


        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
        
          case "firstName":
              formErrors.firstName =  value.length >= 1 && value.length < 2 
              ? firstError
              : "";
            break;
          case "lastName":
            formErrors.lastName =
            value.length >= 1 && value.length < 2 ? lastnameError : "";
            break;
            case "employeeId":
            formErrors.employeeId =
            value.length >= 1 && value.length < 3 ? employeeIdError : "";
            break;

            case "reasonforLeave":
          formErrors.reasonforLeave =
          this.state.reasonforLeave === "Choose Leave Type" ? leavePurposeError  : "";
          break;
          

            case "leaveDetail":
            formErrors.leaveDetail =
            value.length >= 1 && value.length < 5  ? leaveDetailError : "";
            break;

            
          default:
            break;
        }

        // acquiring leave purpose from input
        leavePurpose =document.getElementById('marital').value;
        this.setState({reasonforLeave: leavePurpose});
        this.setState({ formErrors, [name]: value }, () => 
        console.log(this.state)
        );
      };

      handleStartTime = e => {
        let startTimeValue = e.target.value;
        console.log(startTimeValue);
        this.setState({startTime: startTimeValue});
       
    }
    handleStopTime = e => {
        let stopTimeValue = e.target.value;
        this.setState({stopTime: stopTimeValue})
        const start = this.state.startTime.replace(/-/g, '');
        const stop = stopTimeValue.replace(/-/g, '');
        const diff = stop - start
        this.setState({timeDuration: `${diff} Days`})
        console.log(diff)
    }

    leaveSubmit = async () => {
      try {
        const body = {
          "employee_id": this.state.employee_id,
          "first_name": this.state.firstName,
          "last_name": this.state.lastName,
          "age": parseFloat(this.state.age),
          "gender": this.state.gender,
          "country": this.state.country,
          "timezone": this.state.timezone,
          "email": this.state.email,
          "password": this.state.password
        }
        const res = await axios.post(`${env.api}/employee`, body);
        console.log(res.data);
        
        const token = res.data.data.token;
  
        localStorage.setItem('pausework-token', token);
  
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log('An error occured', err.response);
      }
    }

    logout() {
      localStorage.removeItem('pausework-token');
      this.props.history.push('/');
      
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                 {/* header div nav */}
            <div className="row navBackground fixed-top">
            <nav className="navbar navbar-expand-lg   navbar-light bg-light col-md-9 offset-md-1">
                   <Link className="nav-link parentChild setFontColor" to="/">PauseWork</Link>
          <button style={{border: '2px solid white'}} className="navbar-toggler" type="button" data-toggle="collapse"
           data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
              
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
            <li className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/teamview">Team View</Link>
              </li>

            <li className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/newabsence">New Absence</Link>
              </li>

            <li className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/dashboard">Dashboard</Link>
              </li>
              <li id="idSign" className="nav-item">
                    <Link className="nav-link navChild setFontColor" onClick={this.logout} 
                    to="/">Signout</Link>
                     </li>
            </ul>
              
            </form>
          </div>
        </nav>
          </div>

          


              {/* body div */}
                <div className="row" style={{marginTop: "4.5%", marginBottom: "10%", }}>
                        <div style={{ paddingLeft: '0px', paddingRight: '0px', marginTop: '5%'}} className=" card col-md-8 offset-md-2">
                        <div  style={{backgroundColor: '#007bff',color: '#ffffff', height:'100px' }} className="card-header"><h3 style={{textAlign: 'center', margingBottom: '5%', paddingTop:'30px' }}> Absence Request Form</h3></div>
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
                   <div className="row form-group col-md-6 col-lg-6 col-sm-12">
                                <label htmlFor="gender"></label>
                                <select className="form-control" onChange={this.handleChange} id="marital">
                                <option >Choose Leave Type</option>
                                {
                        reasonForTimeOff.map(item => {
                          
                            return <option key={item.days}>{item.name}</option>
                        })
                    }
                                </select>

                                {this.state.errorleavePurpose ?<span id="checkReason" 
                                className="text-danger">{leavePurposeError }</span>: ""}
                      

                                {formErrors.reasonforLeave !== "Choose Leave Type" && (
                         <span className="text-danger">{formErrors.reasonforLeave}</span>
              )}
                              </div>

                              <div style={{marginTop: "5%"}}><h6>Dates Requested:</h6></div>
                    <div className="row">
                        
                        <div className="col-md-4">
                        
                            <div className="form-group">
                                
                                    <div className="">
                                    <p>From</p> <input type="date" min={date} value={this.state.startTime} onChange={this.handleStartTime} className="form-control fa fa-calendar" ></input>
                                    
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                        
                            <div className="form-group">
                                
                                <div className="">
                                <p>To</p><input className="form-control fa fa-calendar" value={this.state.stopTime} onChange={this.handleStopTime} type="date" 
                min={this.state.startTime}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                        
                            <div className="form-group">
                                
                                <div className="">
                                <div><p>Duration</p>
                                <input 
                                        value={this.state.timeDuration.includes('-') ? '0 Day' : this.state.timeDuration } 
                                        className="form-control" disabled />
                                    {
                                        ((this.state.timeDuration === '0 Day' || this.state.timeDuration.includes('-')) 
                                        && this.state.showError) ? 
                                        <span className="text-danger">invalid duration of leave days</span> : '' 
                                    }
                                </div>
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
                               
                               {formValid(this.state) && this.state.timeDuration !== '0 Day' && this.state.reasonforLeave !== "Choose Leave Type"? <Link to="/dashboard">
                    <button style={{height: '35px'}} className="btn btn-primary" onClick={() =>{
                      // this.leaveSubmit() ;
                         const extractId = localStorage.getItem('pausework-token').split(".");
                         var dd = atob(extractId[1]);
                         console.log(JSON.parse(dd));
                         
                        console.log(`
           
                        First Name: ${this.state.firstName}
                        Last Name: ${this.state.lastName}
                        Employee Id: ${this.state.employeeId}
                        Type of Leave Request: ${this.state.reasonforLeave}
                        Leave Start Date: ${this.state.leaveStart}
                        Leave Date Date: ${this.state.leaveEnd}
                        Reason for Leave : ${this.state.leaveDetail}
                      `);
                      alert('leave form submitted successful');
                    }}>
                        <p>Submit Form Now</p>
                    </button>
                 </Link>: <button type="submit" className="btn btn-primary"
                                  onClick={() => { 
                                    if(this.state.firstName === null ||
                                      this.state.lastName === null|| this.state.employeeId === null
                                      || this.state.leaveDetail === null
                                      || this.state.reasonforLeave === "Choose Leave Type"
                                      || this.state.timeDuration === '0 Day') {

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
  
                                      if(this.state.reasonforLeave  === "Choose Leave Type") {
                                        this.setState({errorleavePurpose: true});
                                      }

                                      if(this.state.timeDuration === '0 Day') {
                                        this.setState({showError: true});
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