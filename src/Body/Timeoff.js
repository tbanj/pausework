import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './timeoff.scss';

import { Link } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';

class Timeoff extends React.Component {

    render () {
        return (
            <div  >
            {/* <div className="row">
                <div className="col-5">
                    <img src="./../assets/img/image_timeoff.png" className="img-responsive imgClass"  alt="absence-application"></img>
                    
                    <img src={require('./../img/image_timeoff.jpg')} className="imgClass img-responsive" alt="absence"/>
                
                </div>
                <div className="col-7">
               
                </div>
            </div> */}

            <div   className="contentBackground text-center" >
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                    <div className="row">
                    <div className="col-md-5 col-sm-12">
                            <img src={require('./../img/image_timeoff.png')} className="imgClass img-responsive" alt="absence"/>
                
                    </div>
                    <div className="col-md-7 col-sm-12">
                            <h1  style={{paddingTop: '100px'}} className="headH">
                            Don't just disappear !!!    Inform your employer<span className="hidden-xs">.</span>
                            {/* <span className="hidden-xs">.</span>
                            <span className="hidden-sm hidden-md hidden-lg"></span> */}
                        
                        </h1>
                        <div ><p className="firstP">This application is developed for learning purpose for managing staff seeking absence from work.</p>
                        </div>
                {/* <p className="secondP">Endorsed by <a href="https://github.com/tbanj">hundreds</a> of software developers.</p>
                <Link style={{marginBottom: "20px"}} className="btn btn-primary btn-lg"  to="/signup" role="button">Sign Up</Link> */}
                    <div ></div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
                    
            <div style={{marginBottom: '10%'}} className="text-center">
            <h2 className="firstH2" style={{fontSize:  "2.5rem", marginTop: '5%', marginBottom: '5%'}}>Common Reasons Why You Need To Relax</h2>
            
            <div  className="row ">
                            <div className="col">
                            <span  className="container">
                            <img src={require('./../img/pregnant_woman.png')} className="img-responsive" alt="absence"/>
                
                            </span>
                            
                            <h3 style={{marginTop: '7%'}}className="headTitleIcon">Delivery Date is Close</h3>
                            <p className="miniNoteIcon">If you have have two weeks left for your delivery.<br/>
                            Please endeavor to apply for leave a week ahead for proper transfer of your duties</p>
                            
                            </div>

                            <div className="col">
                            <span  className="container">
                            <img style={{height: '43%'}} src={require('./../img/stress_workera.png')} className="img-responsive" alt="absence"/>
                
                            </span>
                            
                            <h3 style={{marginTop: '2%'}} className="headTitleIcon">Highly Stressed out</h3>
                            <p className="miniNoteIcon">Quiting is not an option, we understand if body and state of my heart is over worked<br/>
                            productivity will be low. File in your request, human resources will evaluate and take befitting action.</p>
                            
                            </div>

                            <div className="col">
                            <span className="container">
                            <img style={{marginBottom: '2%'}} src={require('./../img/Holidays_worker.jpg')} className="img-responsive" alt="absence"/>
                
                            </span>
                            <h3    className="headTitleIcon">Annual Leave</h3>
                            <p className="miniNoteIcon"> This is not just a request is part of the fundamental right of all our employee <br/>
                            Endeavor to apply a month before your leave due date assist so that we can always be there for you too<br/>
                            Incase you don't want to go for leave, there is enumeration for you.</p></div>
                            <div className="col">
                            <span className="container">
                            `       <img   src={require('./../img/flu_worker.jpg')} className="img-responsive" alt="absence"/>
                
                            </span>
                            <h3 style={{marginTop: '10%'}} className="headTitleIcon">Sickness/doctor’s appointment</h3>
                            <p className="miniNoteIcon">Health is wealth, if you have being diagnosed, kindly submit your doctor report.<br/>
                              If you are yet to be diagonized, kindly visit the health department!</p>
                            </div>
                        </div>
            </div>

            
            {/* <div className={{marginBottom: '500px'}}>aaa</div> */}

            </div>
        );
    }
}

export default Timeoff;