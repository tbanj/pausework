import React from 'react';
import './dashboard.scss';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { Link } from 'react-router-dom';

// Render the Calendar
var today = new Date();

// var userCantSlect =new Date() -1;


var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
 
var totalAbsenceSubmitted = [
    // type, stopDate, approvalBy, status
    {type: 'sick', daysRequested:6, startDate: '01/12/2018',stopDate: '01/18/2018', status: 'Pending', btnColor: 'btn btn-warning'},
    {type: 'Maternity Leave', daysRequested: 60, startDate: '07/01/2018', stopDate: '09/01/2017', status: 'Rejected', btnColor: 'btn btn-danger'},
    {type: 'Family time(Engagement)', daysRequested: 5, startDate: '03/01/2019', stopDate: '03/05/2018', status: 'Pending', btnColor: 'btn btn-warning'},
    
    {type: 'Sick', daysRequested: 3, startDate: '02/18/2018', stopDate: '02/21/2017', status: 'Pending', btnColor: 'btn btn-warning'},
    {type: 'Family time(Naming Ceremony)', daysRequested: 30, startDate: '05/30/2018', stopDate: '06/01/2018', status: 'Rejected', btnColor: 'btn btn-danger'}
]


var absenceSummary = [
    // type, stopDate, approvalBy, status
    {type: 'sick', daysOff:2, startDate: '01/12/2018', stopDate: '01/18/2018', approvalBy: 'Chidima Newton',status: 'Approved', btnColor: 'btn btn-primary'},
    {type: 'Maternity Leave', daysOff: 30, startDate: '01/12/2018',  stopDate: '09/01/2017', approvalBy: 'Chidima Newton',status: 'Approved', btnColor: 'btn btn-primary'},
    {type: 'Annual Leave', daysOff: 20, sstartDate: '01/12/2018', stopDate: '06/01/2018', approvalBy: 'Chidima Newton',status: 'Approved', btnColor: 'btn btn-primary'}
]

// var dateToshowstart =new Date(2019, 1, 28);
// var dateToshowend =new Date(2019, 1, 28);

// var dateToshowstart1 =new Date(2019, 2, 31);
// var dateToshowend1 =new Date(2019, 2, 31);

// var dateToshowstart2 =new Date(2019, 3, 31);
// var dateToshowend2 =new Date(2019, 3, 31);

// var dateToshowstart3 =new Date(2019, 4, 31);
// var dateToshowend3 =new Date(2019, 4, 31);

var calendarDate = [
    new Date(2019 , 0, 31), new Date(2019, 1, 28), new Date(2019, 2, 31), new Date(2019, 3, 30),
]

var MoreCalendarDate;

// function displayGreetings () {
//     console.log('welcome on board');
// }
// displayGreetings();
 

let listLeave= [
    {reason: 'Time Off' , daysApprove: '3 days'},
              {reason: 'Medical Checkup', daysApprove: 4},
              {reason: 'Vacation', daysApprove: 10},
              {reason: 'Time Off', daysApprove: 7}
]

let pendingLeave = [
    {reason: 'Time Off', daysLeft: 7},
    {reason: 'Vacation', daysLeft: 14},
    {reason: 'Medical Checkup', daysLeft: 4},
    {reason: 'Sick Leave', daysLeft: 10}
]

let staffDetail = [
    {detail: 'Yearly Allocation', value:  '30 working Days'},
    {detail: 'General Manager', value: 'Alabi'},
    {detail: 'Department', value: 'I.T Department'},
    
]

// var hideSignin= document.getElementById("idSign");
// hideSignin.style.display = "none";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          approveRequest: [
              
          ],
          count: 0,
          clickNotice: null,
          showMore: false,
          availableRequest: [],
          staffInfo: [],
        };

        // mounting function
        this.logout = this.logout.bind(this);

        if(!localStorage.getItem('pausework-token')){
            this.props.history.push('/');
        }
        
      }

      componentDidMount(){
        //   componentDidMount is the method that makes the data
        // available once the page load
        this.setState({approveRequest: listLeave });
        this.setState({availableRequest: pendingLeave });
        this.setState({staffInfo: staffDetail })
       
        
        // this.setState({showMore: displayGreetings })
        
      }
      
      checkCklick() {
        var changeCalender = 0;
        
        this.setState({showMore: !this.state.showMore });
        

        console.log(changeCalender + this.state.count);

        MoreCalendarDate = [
            new Date(2019 , 0, 31), new Date(2019, 1, 28), new Date(2019, 2, 31), new Date(2019, 3, 30),
            new Date(2019 , 4, 2), new Date(2019, 5, 13), new Date(2019, 6, 25), new Date(2019, 7, 21),
            new Date(2019 , 8, 16), new Date(2019, 9, 8), new Date(2019, 10, 30), new Date(2019, 11, 24)
        ]
        var rem =[];

        for (var i=0 ;i<calendarDate.length; i++){
            var bd = this.filterCalender(calendarDate[i]);
            rem.push(bd);
        
        }

        
        
        
        MoreCalendarDate.splice(0,rem.length);
        // console.log(MoreCalendarDate);
        // this.setState({showMore: MoreCalendarDate })
         console.log(MoreCalendarDate);
         
      }

      filterCalender(value) {
        MoreCalendarDate.filter((e) =>{
            return e === value;
        });
    }

      logout() {
        localStorage.removeItem('pausework-token');
        this.props.history.push('/');
        
      }

    render() {
        // is use to print the contents of the array
        // this will make below array available once the app has  initialize
        const {approveRequest} = this.state;
        const {availableRequest} = this.state;
        const {staffInfo} = this.state;
        
        return (
            <div>
                       {/* header div nav */}
            <div className="row navBackground fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light col-md-9 offset-md-1">
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
                    {/* <a className="nav-link navChild setFontColor" onClick={this.logout} >Signout</a> */}
                </li>
                </ul>
                
                </form>
            </div>
        </nav>
          </div>


                {/* body div */}
                <div style={{marginTop: '100px', marginLeft: '3%'}}>
                <div className="container-fluid">
                        <div>
                        <p className="pValue"> <span className="pHeading">Employee: </span>Alabi Temitope</p>
                        </div>
                        <div>
                            <p className="subTitleOne" >Statistics</p>
                                <div className="row" style={{marginLeft: '5%'}}>
                                    {/* <div className="col-3">
                                        <p className="statTitle">Off Days Remaining</p>
                                        <p className="statDayLeft">4</p>
                                        <p>Out of 30 Leave Days Left</p>
                                    </div> */}
                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-12">
                                        <div className="card">
                                            <div className="statTitle card-header">
                                            Off Days Remaining
                                            </div>
                                            <div className="card-body">
                                                <h5 className="statDayLeft card-title">4</h5>
                                                <p className="card-text">Out of 30 Leave Days Left</p>
                                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-12">
                                        <div className="card">
                                            <div className="statTitle card-header">
                                            Approved Request
                                            </div>
                                            <div className="card-body">
                                                {   
                                                    this.state.approveRequest.length === 0 ? <div><p className="card-text">Time Off</p>
                                                    <p style={{fontWeight: 'bold'}} className="card-text">0 Days</p></div> : 
                                                    
                                                    approveRequest.map((data, index) => {
                                                    return <div key={index}>
                                                        <p style={{marginBottom: '0px'}}>{data.reason}</p>
                                                <p className="pTag">{data.daysApprove} Days</p>
                                                        </div>
                                                    })
                                                }
                                                
                                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-12">
                                        <div className="card">
                                            <div className="statTitle card-header">
                                            Available Request
                                            </div>
                                            <div className="card-body">
                                                {   
                                                    this.state.approveRequest.length === 0 ? <div><p className="card-text">Time Off</p>
                                                    <p style={{fontWeight: 'bold'}} className="card-text">30 Days Available</p></div> : 
                                                    
                                                    availableRequest.map((data, index) => {
                                                    return <div key={index}>
                                                        <p style={{marginBottom: '0px'}}>{data.reason}</p>
                                                <p className="pTag">{data.daysLeft}</p>
                                                        </div>
                                                    })
                                                }
                                                
                                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-12">
                                        <div className="card">
                                            <div className="statTitle card-header">
                                            Staff Detail
                                            </div>
                                            <div className="card-body">
                                                {   
                                                    this.state.staffInfo.length === 0 ? <div><p className="card-text">Yearly Allocation</p>
                                                    <p style={{fontWeight: 'bold'}} className="card-text">No of Leave days have<br/> not being set foor you</p></div> : 

                                                    staffInfo.map((data, index) => {
                                                    return <div key={index}>
                                                        <p style={{marginBottom: '0px'}}>{data.detail}</p>
                                                <p className="pTag">{data.value}</p>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                        </div>
                        <div>


                            <p style={{marginTop: '10%'}} className="subTitleOne">Calender</p>
                            <div style={{marginBottom: '4%'}}className="text-center">Upcoming Months <button  
                            onClick={()=>{
                                this.checkCklick();
                                
                            }}>{!this.state.showMore ?'Next': 'Previous'} </button></div>

                            <div className="row" style={{marginLeft: '5%', marginBottom: '15%'}}>
                                    
                                    {/*  col 1 calender*/}
                                {!this.state.showMore ? calendarDate.map((data,index)=> {
                                   
                                    
                                    return (<div key={index}>
                                        <div className="col-md-3">
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={today}
                                            disabledDays={[0,6]}
                                            minDate={lastWeek}
                                            min = {data}
                                            max= {data}
                                            displayOptions={{
                                                // layout: 'landscape',
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 
                                    </div>)
                                }
                                ): MoreCalendarDate.map((data,index)=> {
                                    // console.log(this.state.showMore);
                                    
                                    return (<div key={index}>
                                        <div className="col-md-3">
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={today}
                                            // maxDate = {userMaxSelect}
                                            disabledDays={[0,6]}
                                            minDate={lastWeek}
                                            min = {data}
                                            max= {data}
                                            displayOptions={{
                                                // layout: 'landscape',
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 
                                    </div>)
                                }
                                )}

                                   

                                    
                            </div>
                        </div>


                        <p style={{marginTop: '10%'}} className="subTitleOne">Summary of Submitted Forms</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Request Days</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                          
                          {/* {type: 'sick', daysRequested:6, startDate: '01/12/2018',
                          stopDate: '01/18/2018', status: 'Approved', btnColor: 'btn btn-warning'},
     */}
                                {
                                    totalAbsenceSubmitted.map((item, index) => {
                                        return <tr key={index}>
                                        <td>{item.type}</td>
                                        <td>{item.daysRequested}</td>
                                        <td>From: {item.startDate} To: {item.stopDate}</td>
                                        <td><button className={item.btnColor}>{item.status}</button></td>
                                        
                                    </tr>
                                    })
                                }
                   
                            </tbody>
                        </table>
                        </div>
                    </div>



                        <p style={{marginTop: '10%'}} className="subTitleOne">All Absence</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Number Of Days</th>
                                <th>Date</th>
                                <th>Approved By</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                          
                                {
                                    absenceSummary.map((item, index) => {
                                        return <tr key={index}>
                                        <td>{item.type}</td>
                                        <td>{item.daysOff}</td>
                                        <td>From: {item.startDate} To: {item.stopDate}</td>
                                        <td>{item.approvalBy}</td>
                                        <td><button className={item.btnColor}>{item.status}</button></td>
                                        
                                    </tr>
                                    })
                                }
                   
                            </tbody>
                        </table>
                        </div>
                    </div>


                </div>

            </div>
        
            </div>
          );
    }
}
export default Dashboard;

