

import React from 'react';
import './teamview.scss';


let user = [
    {firstname:  "Alabi", lastname: 'Wahab', initial: 'T'},
    {firstname:  "Onyelo", lastname: 'Omobola', initial: 'A'},
    {firstname:  "Temitayo", lastname: 'Kara', initial: 'K'}
]

let leaveRequestByMembers = [
    {employee: user[0].firstname + " " + user[0].initial, department: 'Technical', vacation: 7, vacationDuration: '01/10/2019 - 01/17/2019', sick: 1
,sickDuration: '02/10/2019 - 01/11/2019', maternity: 0, maternityDuration:'Not Apply for',annualLeave: 0, annualLeaveDuration: 'Not Apply for', totalDaysOff: 8 }
  ,    {employee: user[1].firstname  + " "+ user[1].initial, department: 'Technical', vacation: 0, vacationDuration: 'Not Apply for', sick: 1
  ,sickDuration: '02/10/2019 - 01/11/2019', maternity: 30, maternityDuration:'Not Apply for',annualLeave: 0, annualLeaveDuration: 'Not Apply for', totalDaysOff: 8 },
  {employee: user[2].firstname  + " "+ user[1].initial, department: 'Technical', vacation: 0, vacationDuration: 'Not Apply for', sick: 1
  ,sickDuration: '02/10/2019 - 01/11/2019', maternity: 0, maternityDuration:'Not Apply for',annualLeave: 14, annualLeaveDuration: '03/05/2019 - 03/19/2019', totalDaysOff: 15 },

    
    
]

let totalLevaes = [
    {typeOfLeave: 'vacation', daysGiven: 10, date: 'January', noOfStaffs: 5, approvedBy: 'Chidimma'},
    {typeOfLeave: 'sick', daysGiven: 10, date: 'February', noOfStaffs: 15, approvedBy: 'Mayowa'},
    {typeOfLeave: 'Annual Leave', daysGiven: 140, date: 'April', noOfStaffs: 140, approvedBy: 'Chidimma'},
    {typeOfLeave: 'Maternity', daysGiven: 90, date: 'May', noOfStaffs: 3, approvedBy: 'Chidimma'},
    {typeOfLeave: 'Highly Stressed Out', daysGiven: 10, date: 'June', noOfStaffs: 10, approvedBy: 'Chidimma'}
]


class Teamview extends React.Component {

    constructor (props) {
        super(props)
    
        this.state = {
            appUser: []
        }
    }

    componentDidMount(){
        //   componentDidMount is the method that makes the data
        // available once the page load
        this.setState({appUser: user });
        console.log(this.state.appUser.firstname);
        
        
        // this.setState({showMore: displayGreetings })
        
      }


    render () {
        const {appUser } = this.state;
        return (
            <div style={{marginTop: '100px', marginLeft: '3%'}}>
                <div className="container-fluid">
                        <div>
                        <p className="pValue"> </p><span className="pHeading" > {user[0].firstname} {user[0].lastname} : team </span>
                        
                        </div>
                        <div>
						 <p className="subTitleOne" >Teamview <span className="fas fa-rss"></span> </p>

                         <p style={{marginTop: '10%'}} className="subTitleOne">Summary of Team Members Leave Profile</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table className="table table-hover">
                            <thead>
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
                                <th>Total Days Off</th>
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
                                        <td>{item.vacationDuration}</td>
                                        <td>{item.sick}</td>
                                        <td>{item.sickDuration}</td>
                                        <td>{item.maternity}</td>
                                        <td>{item.maternityDuration}</td>
                                        <td>{item.annualLeave}</td>
                                        <td>{item.annualLeaveDuration}</td>
                                        <td>{item.totalDaysOff}</td>
                                        
                                       
                                    </tr>
                                    })
                                }
                   
                            </tbody>
                        </table>
                        </div>
                    </div>



                                {/* Summary of all leave tables for a year */}

                                <p style={{marginTop: '10%'}} className="subTitleOne">Summary of Team Members Leave Profile</p>
                        <div className="row mb-5 py-3">
                        <div className="col-12">
                        <table className="table table-hover">
                   
                            <thead>
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
                                        <td>{item.daysGiven}</td>
                                        <td>{item.date}</td>
                                        <td>{item.noOfStaffs}</td>
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
        );
    }
}
export default Teamview;