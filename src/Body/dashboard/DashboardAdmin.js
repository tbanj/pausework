import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteCalendar from 'react-infinite-calendar';
import { Redirect } from "react-router-dom";

import { coverDate } from '../helper/helper.js';
import { verifyUser, getToken, getLeaves, InsertAprovalName } from '../services/authService.js';
import http from "../services//httpService.js";
import ParentTable from './../../table/component/ParentTable';

import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import './dashboard.scss';

// Render the Calendar
// var today = new Date();
// var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

let staffDetail = [
    { detail: 'Yearly Allocation', value: '30 working Days' },
    { detail: 'General Manager', value: 'Alabi' }, { detail: 'Department', value: 'I.T Department' },
]


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leaveSum: [], checkState: [], clickNotice: null, showMore: false, staffInfo: [], checkD: [],
            markedDate: [], dateCommence: [], rejectedRequest: [], dataError: [], summaryTableHeader: [],
            daysLeft: "", tableSort: '', pendingRejectedRequest: [], approveRequest: [], count: 0,
            updateleaveSum: [], errorData: 'loading', isFetching: true, remainStaffCalendar: [],
        };

        // mounting function
        this.logout = this.logout.bind(this);
        if (!verifyUser()) this.props.history.push('/');
    }

    getLeaveTypes = (updateleaveSum) => {
        if (!(getToken())) { return this.props.history.push('/'); }
        let totalLeave = updateleaveSum;
        let acceptedLeave = []; let notAccepted = []; let rejectedRequest = [];

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
                const notApproved = {
                    ...totalLeave[index], btnColor: btnColor, statusMessage: statusMessage,
                    statusIconType: statusIconType
                };
                notAccepted.push(notApproved);
            }
        }


        this.getAcceptedStartDate(acceptedLeave);
        this.setState({
            approveRequest: acceptedLeave, rejectedRequest, pendingRejectedRequest: notAccepted,
            isFetching: false, tableSort: { path: "leave_type", order: "asc" }
        });
    }

    getAcceptedStartDate = (totalLeave) => {
        let dateAccepted = [];
        totalLeave.forEach(leave => {
            if (leave.approve_status > 1) {
                let data = {
                    'start': new Date(leave.start_date),
                    'end': new Date(leave.end_date)
                }
                dateAccepted.push(data);
            }
        });
        this.setState({ dateCommence: dateAccepted });
        this.checkNumberType(dateAccepted);
    }

    checkNumberType = (totalLeave) => {
        let data = totalLeave; let num = data.length;
        if (num % 2 === 0) { return null; }
        else {
            let remainStaffCalendar = [];
            if (num > 4) {
                remainStaffCalendar = data.slice(3);
                this.setState({ remainStaffCalendar })
            }
        }
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


    InsertAprrovalDetail = async () => {
        let totalLeav = this.state.data;
        try {
            for (let index = 0; index < totalLeav.length; index++) {
                if (totalLeav[index]['approved_by'] !== "not approved yet") {
                    const { data: adminStaff } = await InsertAprovalName(totalLeav[index]['approved_by']);
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
        this.timer = setTimeout(() => this.InsertAprrovalDetail(), 5000);
        this.getTableHeaderSummary();
        this.setState({ staffInfo: staffDetail });
        this.setState({ requiredColumns: this.getTableHeader() });
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
        http.signal.cancel('Api is being canceled');
        console.log('destroy http request');
    }

    checkCklick() {
        this.setState({ showMore: !this.state.showMore });

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
                                                height={400}
                                                selected={data.end}
                                                disabledDays={[0, 6]}
                                                // minDate={lastWeek}
                                                min={data.start}
                                                max={data.end}
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
                                    this.state.remainStaffCalendar.map((data, index) => {
                                        return (<div key={index}>
                                            <div className="col-md-3">
                                                <InfiniteCalendar
                                                    width={300}
                                                    height={400}
                                                    selected={[data.end]}
                                                    disabledDays={[0, 6]}
                                                    // minDate={lastWeek}
                                                    min={data.start}
                                                    max={data.start}
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

