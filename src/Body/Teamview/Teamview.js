

import React from 'react';
import './teamview.scss';
import { Link } from 'react-router-dom';


let user = [
    {firstname:  "Alabi", lastname: 'Wahab', initial: 'T'},
    {firstname:  "Onyelo", lastname: 'Omobola', initial: 'A'},
    {firstname:  "Temitayo", lastname: 'Kara', initial: 'K'}
]

let leaveRequestByMembers = [
    {employee: user[0].firstname + " " + user[0].initial, department: 'Technical', vacation: 7+ " Days", vacationDuration: '01/10/2019 - 01/17/2019', sick: 1+ " Days"
,sickDuration: '02/10/2019 - 01/11/2019', maternity: 0+ " Days", maternityDuration:'Not Apply for',annualLeave: 0+ " Days", annualLeaveDuration: 'Not Apply for', totalDaysOff: 8 }
  ,    {employee: user[1].firstname  + " "+ user[1].initial, department: 'Human Resources', vacation: 0+ " Days", vacationDuration: 'Not Apply for', sick: 1+ " Days"
  ,sickDuration: '02/10/2019 - 01/11/2019', maternity: 30+ " Days", maternityDuration:'Not Apply for',annualLeave: 0+ " Days", annualLeaveDuration: 'Not Apply for', totalDaysOff: 31 },
  {employee: user[2].firstname  + " "+ user[1].initial, department: 'Business Development', vacation: 0+" Days" , vacationDuration: 'Not Apply for', sick: 1+ " Days"
  ,sickDuration: '02/10/2019 - 01/11/2019', maternity: 0+ " Days", maternityDuration:'Not Apply for',annualLeave: 14+ " Days", annualLeaveDuration: '03/05/2019 - 03/19/2019', totalDaysOff: 15 },

    
    
]

let totalLevaes = [
    {typeOfLeave: 'vacation', daysGiven: 10+ " Days", date: 'January', noOfStaffs: 5, approvedBy: 'Chidimma'},
    {typeOfLeave: 'sick', daysGiven: 3 + " Days", date: 'February', noOfStaffs: 3, approvedBy: 'Mayowa'},
    {typeOfLeave: 'Annual Leave', daysGiven: 140 + " Days", date: 'April', noOfStaffs: 140, approvedBy: 'Chidimma'},
    {typeOfLeave: 'Maternity', daysGiven: 90 + " Days", date: 'May', noOfStaffs: 3, approvedBy: 'Chidimma'},
    {typeOfLeave: 'Highly Stressed Out', daysGiven: 10+ " Days", date: 'June', noOfStaffs: 10, approvedBy: 'Chidimma'}
]


class Teamview extends React.Component {

    constructor (props) {
        super(props)
    
        this.state = {
            appUser: []
        }

        this.logout = this.logout.bind(this);

        if(!localStorage.getItem('pausework-token')){
            this.props.history.push('/');
        }

        
    }

    componentDidMount(){
        //   componentDidMount is the method that makes the data
        // available once the page load
        this.setState({appUser: user });
        console.log(this.state.appUser.firstname);
        
        
        // this.setState({showMore: displayGreetings })
        
      }

      logout() {
        localStorage.removeItem('pausework-token');
        this.props.history.push('/');
        
      }

    render () {
        
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
                        <p className="pValue"> </p><span className="pHeading" > {user[0].firstname} {user[0].lastname} : team </span>
                        
                        </div>
                        <div>
						 <p className="subTitleOne" >Teamview <span className="fas fa-rss"></span> </p>

                         <p style={{marginTop: '10%'}} className="subTitleOne">Summary of Team Members Leave</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table className="table table-hover">
                            <thead style={{ backgroundColor: '#007bff', color: '#ffffff'}}>
                            <tr>
                                <th>Employee</th>
                                <th>Department</th>
                                <th>Vacation</th>
                                <th>Vacation-Duration</th>
                                <th>Sick</th>
                                <th>Sick-Duration</th>
                                
                                <th>Maternity</th>
                                <th>Maternity-Duration</th>
                                <th>Annual Leave</th>
                                <th>Leave-Duration</th>
                                <th>Total Days</th>
                            </tr>
                            </thead>
                            <tbody>
                          
                          {/* {type: 'sick', daysRequested:6, startDate: '01/12/2018',
                          stopDate: '01/18/2018', status: 'Approved', btnColor: 'btn btn-warning'},
     */}
                                {
                                    
                                    leaveRequestByMembers.map((item, index) => {
                                        return <tr key={index}>
                                        <td>{item.employee}</td>
                                        <td>{item.department}</td>
                                        <td>{item.vacation}</td>
                                        <td >{item.vacationDuration}</td>
                                        <td>{item.sick}</td>
                                        <td >{item.sickDuration}</td>
                                        <td >{item.maternity}</td>
                                        <td >{item.maternityDuration}</td>
                                        <td>{item.annualLeave}</td>
                                        <td >{item.annualLeaveDuration}</td>
                                        <td>{item.totalDaysOff}</td>
                                        
                                       
                                    </tr>
                                    })
                                }
                   
                            </tbody>
                        </table>
                        </div>
                    </div>



                                {/* Summary of all leave tables for a year */}

                                <p style={{marginTop: '10%'}} className="subTitleOne">Total Downtime</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table className="table table-hover">
                   
                            <thead style={{ backgroundColor: '#007bff', color: '#ffffff'}}>
                            <tr>
                                <th>Leave Type</th>
                                <th>Days Given</th>
                                <th>Month</th>
                                <th>No of Staffs</th>
                                <th>ApprovedBy</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                          
                          {/* {type: 'sick', daysRequested:6, startDate: '01/12/2018',
                          stopDate: '01/18/2018', status: 'Approved', btnColor: 'btn btn-warning'},
     */}
                             {/* //  {typeOfLeave: 'Highly Stressed Out', daysGiven: 10, 
                                    // date: 'June', noOfStaffs: 10, approvedBy: 'Chidimma'} */}
                                {
                                    
                                    totalLevaes.map((item, index) => {
                                        return <tr key={index}>
                                        <td>{item.typeOfLeave}</td>
                                        <td >{item.daysGiven}</td>
                                        <td>{item.date}</td>
                                        <td >{item.noOfStaffs}</td>
                                        <td>{item.approvedBy}</td>
                                        
                                       
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
        
            </div>

            );
    }
}
export default Teamview;