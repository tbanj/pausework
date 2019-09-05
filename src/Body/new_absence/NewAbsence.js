import React from 'react';

import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import axios from 'axios';
import env from '../../env';



var leaveDetailError = "summarize why you are applying for a leave";
var leavePurpose;
var leavePurposeError = " you are yet to select purpose of leave"

var offDa = 0;

var reasonForTimeOff = [
  { name: 'Maternity Leave', days: '30' },
  { name: 'Highly Stressed out', days: '1' },
  { name: 'Annual Leave', days: '20' },
  { name: 'Sick', days: '3' },

]

let date = new Date();
// use to select current date and disabled passed date
date = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;



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


      leaveStart: date,
      leaveEnd: date,
      leaveDetail: null,
      reasonforLeave: 'Choose Leave Type',

      startTime: date,
      stopTime: date,
      timeDuration: '0 Day',

      formErrors: {

        leaveDetail: "",
        reasonforLeave: "",
        timeDuration: "",

      },
      showError: false,

      errorleaveStart: false,
      errorleaveEnd: false,
      errorleaveDetail: false,
      errorleavePurpose: false,
    };

    this.logout = this.logout.bind(this);
    this.leaveSubmit = this.leaveSubmit.bind(this);

    if (!localStorage.getItem('pausework-token')) {
      this.props.history.push('/');
    }


  }

  componentDidMount() {
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
    this.setState({ errorleavePurpose: false, errorleaveStart: false, errorleaveEnd: false, errorleaveDetail: false });
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "reasonforLeave":
        formErrors.reasonforLeave =
          this.state.reasonforLeave === "Choose Leave Type" ? leavePurposeError : "";
        break;
      case "leaveDetail":
        formErrors.leaveDetail =
          value.length >= 1 && value.length < 5 ? leaveDetailError : "";
        break;
      default:
        break;
    }

    // acquiring leave purpose from input
    leavePurpose = document.getElementById('marital').value;
    this.setState({ reasonforLeave: leavePurpose, formErrors, [name]: value });
  };

  handleStartTime = e => {
    let startTimeValue = e.target.value;
    this.setState({ startTime: startTimeValue, stopTime: startTimeValue, timeDuration: `0 Day` });
    startTimeValue = 0;

  }
  handleStopTime = e => {
    this.setState({})
    let stop = new Date(e.target.value);
    let start = new Date(this.state.startTime);
    let diff = Math.floor((Date.UTC(stop.getFullYear(), stop.getMonth(), stop.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / (1000 * 60 * 60 * 24));
    offDa = diff;
    this.setState({ stopTime: e.target.value, timeDuration: `${diff} Days` });
    diff = 0;
  }

  leaveSubmit = async () => {
    const token = localStorage.getItem('pausework-token');
    const isAdmin = localStorage.getItem('pausework-info');
    try {
      const body = {
        "leave_type": this.state.reasonforLeave,
        "start_date": this.state.startTime,
        "end_date": this.state.stopTime,
        "off_days": offDa,
        "leave_message": this.state.leaveDetail,
        "approve_status": 0,
        "approve_message": "not yet reviewed",
        "approved_by": "not approved yet",
      }
      await axios.post(`${env.api}/leave`, body, { headers: { 'Authorization': `Bearer ${token}`, 'is_admin': `Bearer ${isAdmin}` } });
      setTimeout(() => {
        this.props.history.push('/dashboard');
      }, 4000);
      swal("Form submitted!", "click the OK button to close!", "success");
    } catch (err) {
      console.log('An error occured', err.response);
    }
  }

  logout() {
    localStorage.removeItem('pausework-token');
    localStorage.removeItem('pausework-info');
    this.props.history.push('/');
  }

  render() {
    const { formErrors } = this.state;
    return (
      <React.Fragment>
        {/* header div nav */}
        <div className="row navBackground fixed-top">
          <nav className="navbar navbar-expand-lg   navbar-light col-md-9 offset-md-1">
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
        <div className="row" style={{ marginTop: "4.5%", marginBottom: "10%", }}>
          <div style={{ paddingLeft: '0px', paddingRight: '0px', marginTop: '5%' }} className=" card col-md-8 offset-md-2">
            <div style={{ backgroundColor: '#007bff', color: '#ffffff', height: '100px' }} className="card-header"><h3
              style={{ textAlign: 'center', margingBottom: '5%', paddingTop: '30px' }}> Absence Request Form</h3>
            </div>
            <form className="container mb-5" onSubmit={this.handleSubmit} noValidate style={{ padding: '2% 20%' }}>
              <div className="">

                <div style={{ marginTop: "5%" }} ><h6>Reason for requested leave: <span className="required">(please tick appropriate box)*</span></h6> </div>
                <div className="row form-group col-md-12 col-lg-12 col-sm-12">
                  <label htmlFor="gender"></label>
                  <select className="form-control" onChange={this.handleChange} id="marital">
                    <option >Choose Leave Type</option>
                    {
                      reasonForTimeOff.map(item => {


                        return <option key={item.days}>{item.name}</option>
                      })
                    }
                  </select>

                  {this.state.errorleavePurpose ? <span id="checkReason"
                    className="text-danger">{leavePurposeError}</span> : ""}


                  {formErrors.reasonforLeave !== "Choose Leave Type" && (
                    <span className="text-danger">{formErrors.reasonforLeave}</span>
                  )}
                </div>

                <div style={{ marginTop: "5%" }}><h6>Dates Requested:</h6></div>
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
                          min={this.state.startTime} />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="">
                        <div><p>Duration</p>
                          <input
                            value={this.state.timeDuration.includes('-') ? '0 Day' : this.state.timeDuration}
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
                <div style={{ marginTop: "5%" }} className="form-group">
                  <textarea id="inputText" name="leaveDetail" type="text"
                    className="form-control" noValidate onChange={this.handleChange}
                    rows="7" placeholder="Details of Leave" ></textarea>

                  {this.state.errorleaveDetail ? <span id="checkEmployee"
                    className="text-danger">{leaveDetailError}</span> : ""}

                  {formErrors.leaveDetail.length > 1 && (
                    <span className="text-danger">{formErrors.leaveDetail}</span>
                  )}
                </div>



                <div className="text-center">

                  {formValid(this.state) && this.state.timeDuration !== '0 Day' && this.state.reasonforLeave !== "Choose Leave Type" ?

                    <input type="submit" style={{ height: '35px' }}
                      onClick={this.leaveSubmit} className="btn btn-primary" value=" 🚀 Submit Form Now 🥇" />
                    : <button type="submit" className="btn btn-primary"
                      onClick={() => {
                        if (this.state.leaveDetail === null
                          || this.state.reasonforLeave === "Choose Leave Type"
                          || this.state.timeDuration === '0 Day') {

                          if (this.state.leaveDetail === null) {
                            this.setState({ errorleaveDetail: true });
                          }

                          if (this.state.reasonforLeave === "Choose Leave Type") {
                            this.setState({ errorleavePurpose: true });
                          }

                          if (this.state.timeDuration === '0 Day') {
                            this.setState({ showError: true });
                          }


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
      </React.Fragment>

    );
  }
}
export default NewAbsence;