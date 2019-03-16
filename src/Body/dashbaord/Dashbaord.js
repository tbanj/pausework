import React from 'react';
import './dashboard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


// Render the Calendar
var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
 

var dateToshowstart =new Date(2019, 1, 28);
var dateToshowend =new Date(2019, 1, 28);

var dateToshowstart1 =new Date(2019, 2, 31);
var dateToshowend1 =new Date(2019, 2, 31);

var dateToshowstart2 =new Date(2019, 3, 31);
var dateToshowend2 =new Date(2019, 3, 31);

var dateToshowstart3 =new Date(2019, 4, 31);
var dateToshowend3 =new Date(2019, 4, 31);
 

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
          availableRequest: [],
          staffInfo: [],
        };
      }

      componentDidMount(){
        //   componentDidMount is the method that makes the data
        // available once the page load
        this.setState({approveRequest: listLeave });
        this.setState({availableRequest: pendingLeave });
        this.setState({staffInfo: staffDetail })
        console.log(this.state.availableRequest);
        
      }
      

    render() {
        // is use to print the contents of the array
        const {approveRequest} = this.state;
        const {availableRequest} = this.state;
        const {staffInfo} = this.state;
        console.log(staffInfo);
        return (
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
                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-6">
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

                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-6">
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


                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-6">
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


                                    <div style={{marginBottom: '3%'}} className="col-md-3 col-sm-6">
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
                                                
                                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    </div>

                                   

                                    {/* <div className="col-3">
                                        <button className="statTitle">Approve Request</button>
                                        <p className="statDayLeft">4</p>
                                        <p>Out of 30 Leave Days Left</p>
                                    </div> */}
                                </div>
                        </div>
                        <div>
                            <p style={{marginTop: '10%'}} className="subTitleOne">Calender</p>
                            <div className="row" style={{marginLeft: '5%', marginBottom: '15%'}}>
                                    
                                    {/*  col 1 calender*/}
                                <div className="col-md-3">
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={today}
                                            disabledDays={[0,2]}
                                            minDate={lastWeek}
                                            min = {dateToshowstart}
                                            max= {dateToshowend}
                                            displayOptions={{
                                                // layout: 'landscape',
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 

                                    {/*  col 1 calender*/}
                                <div className="col-md-3" >
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={today}
                                            disabledDays={[0,2]}
                                            minDate={lastWeek}
                                            min = {dateToshowstart1}
                                            max= {dateToshowend1}
                                            displayOptions={{
                                                // layout: 'landscape',
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 


                                    {/*  col 2 calender*/}
                                <div className="col-md-3" >
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={today}
                                            disabledDays={[0,2]}
                                            minDate={lastWeek}
                                            min = {dateToshowstart2}
                                            max= {dateToshowend2}
                                            displayOptions={{
                                                // layout: 'landscape',
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 

                                    {/*  col 3 calender*/}
                                <div className="col-md-3" >
                                        <InfiniteCalendar
                                            width={300}
                                            height={400}
                                            selected={today}
                                            disabledDays={[0,2]}
                                            minDate={lastWeek}
                                            min = {dateToshowstart3}
                                            max= {dateToshowend3}
                                            displayOptions={{
                                                // layout: 'landscape',
                                                showHeader: false,
                                                todayHelperRowOffset:1
                                              }}
                                            
                                         />
                                    </div> 
                            </div>
                        </div>


                        <p style={{marginTop: '10%'}} className="subTitleOne">All Absence</p>
                </div>

            </div>
        );
    }
}
export default Dashboard;