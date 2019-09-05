import React from 'react';
import $ from "jquery";
import { findDOMNode } from "react-dom";
import { Link, Redirect } from 'react-router-dom';
import { verifyUser, getToken } from './services/authService.js';
import './timeoff.scss';


class Timeoff extends React.Component {

  handleAdminPage = () => {
    const elBtnFade = findDOMNode(this.refs.btnFade);
    $(elBtnFade).fadeToggle(1000);
    setTimeout(() => {
      this.props.history.push('/admin-signup');
    }, 1000);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // this.handleAdminPage('destroy');
  }
  render() {
    if (getToken() !== null) {
      const userStatus = getToken();
      if (userStatus[0] === 'false' && verifyUser()) return <Redirect to="/dashboard" />
      if (userStatus[0] === 'true' && verifyUser()) return <Redirect to="/admin-dashboard" />
    }
    return (
      <div ref="btnFade">
        {/* header div nav */}
        <div className="row navBackground fixed-top">
          <nav className="navbar navbar-expand-lg navbar-light col-md-9 offset-md-1">
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
                    <Link id="signup" className="nav-link navChild setFontColor" to="/signup">Signup</Link>
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

        {/* body nav */}
        <div className="contentBackground text-center" >
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="row">
                <div className="col-md-5 col-sm-12">
                  <img src={require('./../img/image_timeoff.png')} className="imgClass img-responsive" alt="absence" />

                </div>
                <div className="col-md-7 col-sm-12">
                  <h1 style={{ paddingTop: '100px' }} className="headH">
                    Don't just disappear !!!    Inform your employer<span className="hidden-xs">.</span>

                  </h1>
                  <div ><p className="firstP">This application is developed for learning purpose for managing staff seeking absence from work.</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20%' }} className="text-center">
          <h2 className="firstH2" style={{ fontSize: "2.5rem", marginTop: '8%', marginBottom: '5%' }}>Common Reasons Why You Need To Relax</h2>

          <div className="row ">
            <div className="col ">
              <span className="container">
                <img src={require('./../img/pregnant_woman.png')} className="img-responsive" alt="absence" />

              </span>

              <h3 style={{ marginTop: '7%' }} className="headTitleIcon">Delivery Date is Close</h3>
              <p className="miniNoteIcon">If you have have two weeks left for your delivery.
                            Please endeavor to apply for leave a week ahead for proper transfer of your duties</p>

            </div>

            <div className="col ">
              <span className="container">
                <img style={{ height: '43%' }} src={require('./../img/stress_workera.png')} className="img-responsive" alt="absence" />

              </span>

              <h3 style={{ marginTop: '2%' }} className="headTitleIcon">Highly Stressed out</h3>
              <p className="miniNoteIcon">Quiting is not an option, we understand if body and state of my heart is over worked
                            productivity will be low. File in your request, human resources will evaluate and take befitting action.</p>

            </div>

            <div className="col ">
              <span className="container">
                <img style={{ marginBottom: '2%' }} src={require('./../img/Holidays_worker.jpg')} className="img-responsive" alt="absence" />

              </span>
              <h3 className="headTitleIcon">Annual Leave</h3>
              <p className="miniNoteIcon"> This is not just a request is part of the fundamental right of all our employee
                            Endeavor to apply a month before your leave due date assist so that we can always be there for you too<br />
                Incase you don't want to go for leave, there is enumeration for you.</p>
            </div>

          </div>

          <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-12">
              <span className="container">
                `       <img src={require('./../img/flu_worker.jpg')} className="img-responsive" alt="absence" />

              </span>
              <h3 style={{ marginTop: '10%' }} className="headTitleIcon">Sickness/doctor’s appointment</h3>
              <p className="miniNoteIcon">Health is wealth, if you have being diagnosed, kindly submit your doctor report.
                              If you are yet to be diagonized, kindly visit the health department!</p>
            </div>
          </div>
          <div className="fluid-container col-md-6 offset-md-3 col-sm-12 my-5">
            <button onClick={this.handleAdminPage}
              type="button" className="btn btn-rounded btn-block btn-outline-primary" style={{ fontSize: '25px', borderRadius: '15px' }}>Create Admin Account / Admin Login </button>
          </div>
        </div>




        {/* <div className={{marginBottom: '500px'}}>aaa</div> */}

        <div></div>

      </div>
    );
  }
}

export default Timeoff;