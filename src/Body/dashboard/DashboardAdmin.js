import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteCalendar from 'react-infinite-calendar';
import axios from 'axios';
import env from '../../env';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import './dashboard.scss';




// Render the Calendar
var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);


var totalLeave;
var dateAccepted =[];
 




var calendarDate = [
    new Date(2019 , 0, 31), new Date(2019, 1, 28), new Date(2019, 2, 31), new Date(2019, 3, 30),
]
var MoreCalendarDate;
let listLeave= [
    {reason: 'Time Off' , daysApprove: '3 days'},{reason: 'Medical Checkup', 
        daysApprove: 4},{reason: 'Vacation', daysApprove: 10},{reason: 'Time Off', daysApprove: 7}
]

let pendingLeave = [
    {reason: 'Time Off', daysLeft: 7},{reason: 'Vacation', daysLeft: 14},
    {reason: 'Medical Checkup', daysLeft: 4},{reason: 'Sick Leave', daysLeft: 10}
]

let staffDetail = [
    {detail: 'Yearly Allocation', value:  '30 working Days'},
    {detail: 'General Manager', value: 'Alabi'},{detail: 'Department', value: 'I.T Department'},
]


class DashboardAdmin extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            leaveSum: [],
            markedDate: [],
            dateCommence:[],
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

        if(!(localStorage.getItem('pausework-token') && localStorage.getItem('pausework-info') && localStorage.getItem('pausework-adminKey'))){
            this.props.history.push('/');
        }

      }
      coverDate(date) {
        return new Date(date).toLocaleDateString();
        
    }

     async componentDidMount(){
        //   componentDidMount is the method that makes the data available once the page load
        this.setState({availableRequest: pendingLeave, staffInfo: staffDetail, approveRequest:  listLeave });
       
        
        const adminKey = localStorage.getItem('pausework-admin');
        const isAdmin = localStorage.getItem('pausework-info');
        const token = localStorage.getItem('pausework-token');
            const tokenSerialize = token.split(".");
            const tokenConvert =JSON.parse(atob(tokenSerialize[1]));
            // console.log(tokenConvert['id']);
        try {
            if (!(token && isAdmin)) {return this.props.history.push('/');}
            const res = await axios.get(`${env.api}/leave/?employee=${tokenConvert['id']}&admin_key=${adminKey}`, {
                headers: {'Authorization': `Bearer ${token}`,  'Isadmin': `Bearer ${isAdmin}`}});
            
                // if(!localStorage.getItem('totalLeaves')) {totalLeave =[]; }
            // totalLeave =localStorage.setItem('totalLeaves', res.data.data);
            if(res.data === null)  {this.setState({leaveSum: [] }); return;}
            
            totalLeave = res.data.data;
           
            totalLeave.forEach(leave => {
                if(leave.approvestatus > 1){ 
                    var dateObj = new Date(leave.startdate);
                    dateAccepted.push(dateObj);}
                
            });
            // console.log(dateAccepted);
            this.setState({leaveSum: res.data.data, dateCommence: dateAccepted });

          } 
          catch (err) {
            if (localStorage.getItem('pausework-token') && localStorage.getItem('pausework-info'))
              localStorage.removeItem('pausework-token');
              localStorage.removeItem('pausework-info');
      
            this.props.history.push('/');
          }
        
      }
      
      checkCklick() {
        var changeCalender = 0;
        
        this.setState({showMore: !this.state.showMore });
        

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
         
      }

      filterCalender(value) {
        MoreCalendarDate.filter((e) =>{ return e === value;});
    }

      logout() {
        localStorage.removeItem('pausework-token');
        localStorage.removeItem('pausework-info');
        this.props.history.push('/');
        
      }

    render() {
        // is use to print the contents of the array
        // this will make below array available once the app has  initialize
        const {approveRequest} = this.state;
        const {availableRequest} = this.state;
        const {staffInfo} = this.state;
        const {leaveSum} = this.state;
        const {dateCommence} =this.state;
        
        
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
                </li>
                </ul>
                
                </form>
            </div>
        </nav>
          </div>

          

                <div style={{marginTop: '100px', marginLeft: '3%'}}>
                <div className="container-fluid">
                        <div>
                        <p className="pValue"> <span className="pHeading">Employee: </span>Alabi Temitope</p>
                        </div>
                        <div>
                            <p className="subTitleOne" >Statistics</p>
                                <div className="row" style={{marginLeft: '5%'}}>
                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-12">
                                        <div className="card">
                                            <div className="statTitle card-header"></div>
                                            <div className="card-body">
                                                <h5 className="statDayLeft card-title">4</h5>
                                                <p className="card-text">Out of 30 Leave Days Left</p>
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
                                {!this.state.showMore ? dateCommence.map((data,index)=> {
                                   
                                    
                                    return (<div key={index}>
                                        <div className="col-md-3">
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={data}
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
                                ):
                                 MoreCalendarDate.map((data,index)=> {
                                    return (<div key={index}>
                                        <div className="col-md-3">
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={[data]}
                                            disabledDays={[0,6]}
                                            minDate={lastWeek}
                                            min = {data}
                                            max= {data}
                                            displayOptions={{
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 
                                    </div>)
                                }
                                )
                                }
                                    
                            </div>
                        </div>

                        <p style={{marginTop: '10%'}} className="subTitleOne">Summary of Submitted Forms</p>
                        <div className="row mb-5 py-3">
                            <div className="col-12">
                                <table id="submittedFormTable" className="table table-hover display">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Request Days</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            
                                            leaveSum.length > 0 ? leaveSum.map((item, index) => {
                                                var btnColor="";
                                                var statusMessage="";
                                                if(item.approvestatus <2 ) {
                                                    if(item.approvestatus ===0) { btnColor="btn btn-warning"; statusMessage="Pending";
                                                }
                                                else if(item.approvestatus ===1) {btnColor="btn btn-danger"; statusMessage="Rejected"}
                                                return <tr key={index}>
                                                    <td>{item.leavetype}</td>
                                                    <td>{item.offdays}</td>
                                                    <td>{this.coverDate(item.startdate)} </td>
                                                    <td>{ this.coverDate(item.enddate)}</td>
                                                    <td><button className={btnColor}>{statusMessage}</button></td>
                                                
                                                </tr> 
                                                }
                                                
                                            }):  
                                            <tr>
                                                <td>{"N/A"}</td>
                                                <td>{"N/A"}</td>
                                                <td>{"N/A"}</td>
                                                <td>{"N/A"}</td>
                                                <td><button className={"btn btn-info"}>{"N/A"}</button></td>
                                            </tr>
                                        }
                        
                                    </tbody>
                                </table>
                            </div>
                    </div>

                        <p style={{marginTop: '10%'}} className="subTitleOne">All Absence</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table id="acceptedTable" className="table table-hover display">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Number Of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Approved By</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                          
                                {
                                    leaveSum.length >0 ? leaveSum.map((item, index) => {
                                        var btnColor="";
                                        var statusMessage="";
                                        
                                        if(item.approvestatus > 1 ) {
                                            btnColor="btn btn-success"; statusMessage="Accepted";
                                            return <tr key={index}>
                                            <td>{item.leavetype}</td>
                                            <td>{item.offdays }</td>
                                            <td>{this.coverDate(item.startdate)}</td>
                                            <td>{this.coverDate(item.enddate)}</td>
                                            <td>{item.approvedby}</td>
                                            <td><button className={btnColor}>{statusMessage}</button></td>
                                        
                                    </tr>
                                            }
                                        
                                    }): <tr >
                                            <td>{"N/A"}</td>
                                            <td>{"N/A"}</td>
                                            <td>{"N/A"}</td>
                                            <td>{"N/A"}</td>
                                            <td>{"N/A"}</td>
                                            <td>{"N/A"}</td>
                                            <td><button className={"btn btn-info"}>{"N/A"}</button></td>
                                    </tr>
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


export default DashboardAdmin;

