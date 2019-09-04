import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteCalendar from 'react-infinite-calendar';
import { Redirect } from "react-router-dom";
import { coverDate } from '../helper/helper.js';
import { verifyUser, getToken, getLeaves, InsertAprovalName } from '../services/authService.js';
import ParentTable from './../../table/component/ParentTable';
import env from '../../env';

import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import './dashboard.scss';




// Render the Calendar
var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

var calendarDate = [
    new Date(2019, 0, 31), new Date(2019, 1, 28), new Date(2019, 2, 31), new Date(2019, 3, 30),
]
var MoreCalendarDate;

let staffDetail = [
    { detail: 'Yearly Allocation', value: '30 working Days' },
    { detail: 'General Manager', value: 'Alabi' }, { detail: 'Department', value: 'I.T Department' },
]


class Dashboard extends React.Component {

    signal = axios.CancelToken.source();
    constructor(props) {
        super(props);

        this.state = {
            leaveSum: [],
            checkState: [],
            markedDate: [],
            dateCommence: [],
            rejectedRequest: [],
            dataError: [],
            summaryTableHeader: [],
            daysLeft: "",
            tableSort: '',
            pendingRejectedRequest: [],
            approveRequest: [],
            count: 0,
            clickNotice: null,
            showMore: false,
            staffInfo: [],
            checkD: [],
            updateleaveSum: [],
            errorData: 'loading',
            isFetching: true
        };

        // mounting function
        this.logout = this.logout.bind(this);
        if (!verifyUser()) this.props.history.push('/');

    }

    getLeaveData = async () => {

        try {
            let userInfo = getToken();
            let totalLeave;
            if (!(userInfo)) { return this.props.history.push('/'); }
            const res = await axios.get(`${env.api}/leave`, {
                headers: { 'Authorization': `Bearer ${userInfo[1]}`, 'is_admin': `Bearer ${userInfo[0]}` },
                cancelToken: this.signal.token,
            });

            if (res.data === null) { this.setState({ leaveSum: [] }); return; }
            totalLeave = res.data.data;

            // for (let index = 0; index < totalLeave.length; index++) {

            //     if (totalLeave[index]['approved_by'] !== "not approved yet") {
            //         const res = await axios.get(`${env.api}/employee/query-employee?employee=${totalLeave[index]['approved_by']}`, {
            //             headers: { 'Authorization': `Bearer ${userInfo[1]}`, 'is_admin': `Bearer ${userInfo[0]}` },
            //             cancelToken: this.signal.token,
            //         });

            //         // data[index]['approved_by'] = `${adminStaff['data']['first_name']} ${adminStaff['data']['last_name']}`
            //         this.setState({ checkD: res.adminStaff });
            //     }


            // }
            this.setState({ leaveSum: totalLeave })
            // this.getLeaveTypes(userInfo, totalLeave);
            // return totalLeave;

        }
        catch (err) {
            let dataError;
            let dataLoader;
            if (axios.isCancel(err)) {
                console.log('Error: ', err.message); // => prints: Api is being canceled
                dataError = err.message;

            } else {
                dataError = "error encounter while fetching leave information";
                dataLoader = "spinner-border text-success";
            }
            this.setState({ dataError: [dataError, dataLoader] });
        }


    }

    populateCalender = () => {
        // let totalLeav = await this.getLeaveData();
        setTimeout(() => {
            const totalLeav = this.state.leaveSum;
            let dateAccepted = [];
            totalLeav.forEach(leave => {
                if (leave.approve_status > 1) {
                    let dateObj = new Date(leave.start_date);
                    dateAccepted.push(dateObj);
                }
            });
            this.setState({ dateCommence: dateAccepted });
        }, 500);

    }

    inserApproval = () => {
        setTimeout(async () => {
            let totalLeav = this.state.leaveSum;
            try {
                let userInfo = getToken();
                for (let index = 0; index < totalLeav.length; index++) {
                    if (totalLeav[index]['approved_by'] !== "not approved yet") {
                        const { data: adminStaff } = await axios.get(`${env.api}/employee/query-employee?employee=${totalLeav[index]['approved_by']}`);
                        totalLeav[index]['approved_by'] = `${adminStaff['data']['first_name']} ${adminStaff['data']['last_name']}`
                        this.setState({ checkD: adminStaff });
                    }

                    this.setState({ updateleaveSum: totalLeav });
                }
            } catch (error) {
                console.log(error);
            }
        }, 1000);

    }

    getLeaveTypes = (updateleaveSum) => {
        let userInfo = getToken();
        if (!(getToken())) { return this.props.history.push('/'); }
        let totalLeave = updateleaveSum;
        let acceptedLeave = [];
        let notAccepted = [];
        let rejectedRequest = [];

        for (let index = 0; index < totalLeave.length; index++) {
            let btnColor = "";
            let statusMessage = "";
            let statusIconType = "";
            if (totalLeave[index]['approved_by'] !== "not approved yet") {
            }
            if (totalLeave[index]['approve_status'] === 2) {
                btnColor = "btn btn-success";
                statusMessage = "Accepted";
                statusIconType = "fa-check";
                totalLeave[index]['end_date'] = coverDate(totalLeave[index]['end_date']);
                totalLeave[index]['start_date'] = coverDate(totalLeave[index]['start_date']);

                const formApproved = {
                    ...totalLeave[index], btnColor: btnColor, statusMessage: statusMessage,
                    statusIconType: statusIconType
                };

                acceptedLeave.push(formApproved);

            } else if (totalLeave[index]['approve_status'] < 2) {
                if (totalLeave[index]['approve_status'] === 0) {
                    btnColor = "btn btn-warning";
                    statusMessage = "Pending";
                    statusIconType = "fa-spinner";
                }
                else if (totalLeave[index]['approve_status'] === 1) {
                    btnColor = "btn btn-danger";
                    statusMessage = "Rejected";
                    statusIconType = "fa-remove";
                    rejectedRequest.push(totalLeave[index]);
                }



                totalLeave[index]['end_date'] = coverDate(totalLeave[index]['end_date']);
                totalLeave[index]['start_date'] = coverDate(totalLeave[index]['start_date'])
                const notApproved = { ...totalLeave[index], btnColor: btnColor, statusMessage: statusMessage, statusIconType: statusIconType };
                notAccepted.push(notApproved);

            }
        }

        const daysLeft = this.availableDays(acceptedLeave);
        this.setState({
            approveRequest: acceptedLeave, rejectedRequest, checkUser: userInfo[0],
            daysLeft, pendingRejectedRequest: notAccepted, isFetching: false,
            tableSort: { path: "leave_type", order: "asc" }
        });
    }


    availableDays = (acceptedLeave) => {
        let count = 0;
        for (let index = 0; index < acceptedLeave.length; index++) {
            count += acceptedLeave[index]['off_days'];
        }
        let daysLeft = 30 - count;
        return daysLeft;
    }

    getTableHeader = () => {
        const tableTotalAbsence = [
            { path: "leave_type", label: "Type" },
            { path: "off_days", label: "Number Of Days" },
            { path: "start_date", label: "Start Date" },
            { path: "end_date", label: "End Date" },
            { path: "approved_by", label: "Approved By" },
        ]
        return tableTotalAbsence;
    }

    getTableHeaderSummary = () => {
        const checkList = { path: "off_days", label: "Number Of Days" };
        let list = [...this.getTableHeader()];
        const indexPlace = list.indexOf(checkList);
        list[indexPlace] = { path: "off_days", label: "Request Days" };
        this.setState({ summaryTableHeader: list });


    }

    getList = async () => {
        try {
            let checker = await getLeaves();
            this.setState({ data: checker.data.data });
        }
        catch (error) {
            console.log(error);

        }
    }


    fetchUsers = async () => {

        let totalLeav = this.state.data;
        try {
            let userInfo = getToken();
            for (let index = 0; index < totalLeav.length; index++) {
                if (totalLeav[index]['approved_by'] !== "not approved yet") {
                    const { data: adminStaff } = await InsertAprovalName(totalLeav[index]['approved_by'])
                    totalLeav[index]['approved_by'] = `${adminStaff['data']['first_name']} ${adminStaff['data']['last_name']}`
                    this.setState({ checkD: adminStaff });
                }
            }
            this.setState({ updateleaveSum: totalLeav, isFetching: false });
            if (this.state.updateleaveSum.length === 0 && this.state.isFetching === false) {
                this.setState({ errorData: 'check your network' });
            }

            this.getLeaveTypes(totalLeav);

        } catch (error) {
            console.log(error);

        }
    }



    componentDidMount() {
        this.getList();
        this.timer = setTimeout(() => this.fetchUsers(), 5000);
        // this.getLeaveData();
        // this.populateCalender();
        // this.inserApproval()`
        this.getTableHeaderSummary();

        // this.getLeaveTypes();
        this.setState({ staffInfo: staffDetail });
        this.setState({ requiredColumns: this.getTableHeader() });
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
        console.log('destroy http request');
    }

    checkCklick() {
        // var changeCalender = 0;
        this.setState({ showMore: !this.state.showMore });


        MoreCalendarDate = [
            new Date(2019, 0, 31), new Date(2019, 1, 28), new Date(2019, 2, 31), new Date(2019, 3, 30),
            new Date(2019, 4, 2), new Date(2019, 5, 13), new Date(2019, 6, 25), new Date(2019, 7, 21),
            new Date(2019, 8, 16), new Date(2019, 9, 8), new Date(2019, 10, 30), new Date(2019, 11, 24)
        ]
        var rem = [];

        for (var i = 0; i < calendarDate.length; i++) {
            var bd = this.filterCalender(calendarDate[i]);
            rem.push(bd);

        }

        MoreCalendarDate.splice(0, rem.length);

    }

    filterCalender(value) {
        MoreCalendarDate.filter((e) => { return e === value; });
    }

    logout() {
        localStorage.removeItem('pausework-token');
        localStorage.removeItem('pausework-info');
        this.props.history.push('/');

    }



    render() {
        // is use to print the contents of the array
        // this will make below array available once the app has  initialize
        if (!verifyUser()) return <Redirect to="/" />
        const { approveRequest, daysLeft, pendingRejectedRequest, summaryTableHeader,
            tableSort, rejectedRequest, requiredColumns, staffInfo, dateCommence, dataError } = this.state;

        return (
            <div>
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

                <div style={{ marginTop: '100px', marginLeft: '3%' }}>
                    <div className="container-fluid" style={{ marginBottom: '10%' }}>
                        <div>


                            <p className="pValue"> <span className="pHeading">Employee: </span>Alabi Temitope</p>
                        </div>
                        <div>
                            <p className="subTitleOne" >Statistics</p>
                            <div className="row" style={{ marginLeft: '5%' }}>
                                <div style={{ marginBottom: '3%' }} className="col-md-3 col-sm-12">
                                    <div className="card">
                                        <div className="statTitle card-header"></div>
                                        <div className="card-body">
                                            <h5 className="statDayLeft card-title" > <span><i className={daysLeft !== null && this.state.isFetching === false ? "" : `spinner-border text-primary`}></i></span>{daysLeft}</h5>
                                            <p className="card-text">Out of 30 Leave Days Left</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '3%' }} className="col-md-3 col-sm-12">
                                    <div className="card">
                                        <div className="statTitle card-header">
                                            Approved Request
                                            </div>
                                        <div className="card-body">
                                            {
                                                approveRequest.length > 0 ? approveRequest.map((data, index) => (
                                                    <div key={index}>
                                                        <p style={{ marginBottom: '0px' }}>{data.leave_type}</p>
                                                        <p className="pTag">{data.off_days} Days</p>
                                                    </div>
                                                )) : <div > {daysLeft ? "no data found" : <span><i className={`spinner-border text-primary`}></i></span>}</div>


                                            }

                                        </div>
                                    </div>
                                </div>


                                <div style={{ marginBottom: '3%' }} className="col-md-3 col-sm-12">
                                    <div className="card">
                                        <div className="statTitle card-header">
                                            Available Request
                                            </div>
                                        <div className="card-body">
                                            {
                                                rejectedRequest.length === 0 ? <div><p className="card-text">Time Off</p>
                                                    <p style={{ fontWeight: 'bold' }} className="card-text">30 Days Available</p></div> :

                                                    rejectedRequest.map((data, index) => {
                                                        return <div key={index}>
                                                            <p style={{ marginBottom: '0px' }}>{data.leave_type}</p>
                                                            <p className="pTag">{data.off_days}</p>
                                                        </div>
                                                    })
                                            }

                                        </div>
                                    </div>
                                </div>


                                <div style={{ marginBottom: '3%' }} className="col-md-3 col-sm-12">
                                    <div className="card">
                                        <div className="statTitle card-header">
                                            Staff Detail
                                            </div>
                                        <div className="card-body">
                                            {this.state.staffInfo.length === 0 ? <div><p className="card-text">Yearly Allocation</p>
                                                <p style={{ fontWeight: 'bold' }} className="card-text">No of Leave days have<br /> not being set foor you</p></div> :

                                                staffInfo.map((data, index) => {
                                                    return <div key={index}>
                                                        <p style={{ marginBottom: '0px' }}>{data.detail}</p>
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


                            <p className="subTitleOne">Calender</p>
                            <div style={{ marginBottom: '4%' }} className="text-center">Upcoming Months <button
                                onClick={() => {
                                    this.checkCklick();

                                }}>{!this.state.showMore ? 'Next' : 'Previous'} </button></div>

                            <div className="row" style={{ marginLeft: '5%' }}>

                                {/*  col 1 calender*/}
                                {!this.state.showMore ? dateCommence.map((data, index) => {
                                    return (<div key={index}>
                                        <div className="col-md-3">
                                            <InfiniteCalendar
                                                width={300}
                                                height={600}
                                                selected={[data]}
                                                disabledDays={[0, 6]}
                                                minDate={lastWeek}
                                                min={data}
                                                max={data}
                                                displayOptions={{
                                                    // layout: 'landscape',
                                                    showHeader: false,
                                                    todayHelperRowOffset: 1
                                                }}

                                            />
                                        </div>
                                    </div>)
                                }
                                ) :
                                    MoreCalendarDate.map((data, index) => {
                                        return (<div key={index}>
                                            <div className="col-md-3">
                                                <InfiniteCalendar
                                                    width={300}
                                                    height={400}
                                                    selected={[data]}
                                                    disabledDays={[0, 6]}
                                                    minDate={lastWeek}
                                                    min={data}
                                                    max={data}
                                                    displayOptions={{
                                                        showHeader: false,
                                                        todayHelperRowOffset: 1
                                                    }}

                                                />
                                            </div>
                                        </div>)
                                    }
                                    )
                                }

                            </div>
                        </div>

                        <p className="subTitleOne">Summary of Submitted Leave Request</p>
                        <ParentTable leaveSum={pendingRejectedRequest}   {...this.props} tableSort={tableSort}
                            daysLeft={daysLeft} approve_status={'approve_status'} approveState={'Status'} viewAppText={`view application`}
                            requiredColumns={summaryTableHeader} removeColumn={[0, -1]}
                        />

                        {/* no table imported  */}
                        <p className="subTitleOne">All Absence</p>
                        <ParentTable leaveSum={approveRequest} dataError={dataError} {...this.props} tableSort={tableSort}
                            daysLeft={daysLeft} approve_status={'approve_status'} approveState={'Status'} viewAppText={`view application`}
                            requiredColumns={requiredColumns} removeColumn={[0, -1]} />
                    </div>

                </div>

            </div>
        );
    }


}


export default Dashboard;

