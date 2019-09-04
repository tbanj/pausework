import React, { Component } from 'react';
import axios from 'axios';
import env from '../../env';

import { verifyUser, getToken, removeToken } from '../services/authService.js';
import dummy from '../../assets/user-unisex-512.png';
import Multiselect from "../dropdown_multiselect/Multiselect.jsx";
import Header from '../../Header/Header';


const CULTURE_SHIPS = [
    { id: 1, name: '5*Gelish-Oplule' },
    { id: 2, name: '7*Uagren' },
    // ...
    { id: 249, name: 'Zero Gravitass' },
    { id: 250, name: 'Zoologisqt' },
    { id: 3, name: '5*Gelish-Oplulea' },
    { id: 4, name: '7*Uagrenq' },
    // ...
    { id: 256, name: 'Zero Gravitasv' },
    { id: 251, name: 'Zoologistu' },
    { id: 252, name: '5*Gelish-Oplulem' },
    { id: 253, name: '7*Uagreni' },
    // ...
    { id: 254, name: 'Zero Gravitasi' },
    { id: 255, name: 'Zoologistam' }
]

// let leave_data = {
//     approve_message: "Hello approve message", approve_status: "2",
//     pix: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png", created_date: "18/08/2019",
//     sex: "male", first_name: "Alabi", last_name: "Wahab", leave_type: 'sick', start_date: "18/08/2019", end_date: "22/08/2019", off_days: 4
// };
var isAdmin = false;
let leave_replies = [{
    _id: 1, created_by: "200", pix: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    sex: "male", first_name: "Lawolu", last_name: "Omoba", created_date: "21/08/2019", reply: "am yet to decide on your leave"
},
{
    _id: 2, created_by: "100", pix: "https://res.cloudinary.com/dr9bbyvab/v1566495925/Krystal/user-unisex-512.png",
    sex: "male", first_name: "Lawolu", last_name: "Omoba", created_date: "20/08/2019", reply: "am user 100 am in support of your leave"
}];

let staff_list = [{ _id: 1, first_name: "Dele", last_name: "Momodu", leave_id: 2 },
{ _id: 2, first_name: "Erinosho", last_name: "Lawolu", leave_id: 2 },
{ _id: 3, first_name: "Olayiwola", last_name: "Bilewu", leave_id: 2 }];


class View extends Component {
    signal = axios.CancelToken.source();

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            staffListShare: [],
            leave_data: {}
        }

        // mounting function
        this.logout = this.logout.bind(this);

        if (!(localStorage.getItem('pausework-token') && localStorage.getItem('pausework-info'))) {
            this.props.history.push('/');
        }
    }

    logout() {
        localStorage.removeItem('pausework-token');
        localStorage.removeItem('pausework-info');
        this.props.history.push('/');

    }


    verifyUser = () => {
        const isAdmin = localStorage.getItem('pausework-info');
        const token = localStorage.getItem('pausework-token');
        return [isAdmin, token];
    }

    handleMultiselect = (data) => {
    }

    leaveRequestPostReply = () => {
    }
    handleApprove = () => {
    }

    handleDispprove = () => {
    }


    comfirmleave = async () => {
        let userInfo = this.verifyUser();
        // match.params.id
        try {
            if (!(userInfo[1] && userInfo[0])) { return this.props.history.push('/'); }
            const res = await axios.get(`${env.api}/leave/${this.props.match.params.id}`, {
                headers: { 'Authorization': `Bearer ${userInfo[1]}`, 'is_admin': `Bearer ${userInfo[0]}` },
                cancelToken: this.signal.token,
            });

            if (res.data === null) { this.setState({ leaveSum: [] }); return; }
            this.setState({ leave_data: res.data.data });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Error: ', error.message); // => prints: Api is being canceled
            } else {
                const dataError = "error encounter while fetching leave information";
                const dataLoader = "spinner-border text-success";
                this.setState({ dataError: [dataError, dataLoader] });
            }
        }

    }

    mapToView(data) {
        let newData = [];
        for (let index = 0; index < data.length; index++) {
            let dataObject = {
                id: data[index]["_id"],
                name: ` ${data[index]["last_name"]} ${data[index]["first_name"]}`
            }
            newData.push(dataObject);
        }
        return newData;
    }

    handleLogout = () => {
        removeToken();
        this.props.history.push('/');
    }

    componentDidMount() {
        this.setState({ data: CULTURE_SHIPS });
        this.setState({ staffListShare: this.mapToView(staff_list) });
        this.comfirmleave();

    }
    componentDidUpdate(prevProps, prevState) {
    }
    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
    }

    leaveRequestShare = (name) => {
    }
    render() {
        const { match } = this.props;
        const { staffListShare, leave_data } = this.state;


        return (
            <React.Fragment>
                <Header onLogout={this.handleLogout} />
                <div className="py-5" style={{ marginBottom: '10%', backgroundColor: '#f4f6f9' }}>
                    {/* <div style={{ marginTop: '5%' }} >{match.params.id}</div> */}
                    <div className="offset-md-1 col-md-10">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <img src={`${leave_data.pix}` ? `${leave_data.pix}` : "https://res.cloudinary.com/dr9bbyvab/v1566495925/Krystal/user-unisex-512.png"} alt="profile_pic" className="img-circle" height="60" />
                                    <a href="dashboard/profile/" target="_blank">{`${leave_data.first_name} ${leave_data.last_name}`}
                                    </a>
                                </h2>
                                <div className="row">
                                    <div className="col-md-6">

                                        <p>Application Date: <b>{`${leave_data.created_date}`}</b></p>
                                        <p>Leave Type: <b>{`${leave_data.leave_type}`}</b></p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Start Date: <b>{`${leave_data.start_date}`}</b></p>
                                        <p>End Date: <b>{`${leave_data.end_date}`}</b></p>
                                        <p>Days Off: <b>{`${leave_data.off_days}`}</b></p>
                                    </div>
                                </div>


                                <br />
                                <div className="form-group">
                                    <label className="form-control-label text-info"><i>{match.params.id ? 'You' : "Another person"}further wrote: </i></label>
                                    <br />
                                    <div className="table-responsive">{`Approve message should display here from server`}</div>
                                </div>
                                <hr />


                                {(leave_data['approve_status'] === '2' && (isAdmin === true)) ?

                                    <React.Fragment>
                                        <div className="form-group">
                                            <label className="form-control-label text-info"><i>What's your decision on this request? </i></label>
                                            <input type="hidden" id="approve_status" name="approve_status" value="0" />
                                        </div>
                                        <div className="form-group" id="btn-decision">
                                            <button onClick={() => this.handleApprove()} className="btn btn-danger waves-effect waves-light m-r-10" data-val="0"><i className="fa fa-times"></i> Decline</button>
                                            <button data-val="1" onClick={() => this.handleDispprove()} className="btn btn-success waves-effect waves-light m-r-10"><i className="fa fa-check"></i> Approve</button>
                                        </div>
                                    </React.Fragment>



                                    : {
                                        0: <p className="text-danger"><i>This Leave Application has been Declined</i> <i className="fa fa-times-circle"></i></p>,
                                        1: <p className="text-success"><i>This Leave Application has been Approved</i> <i className="fa fa-check-circle"></i></p>,
                                        2: <p className="text-warning"><i>This Leave Application is Pending</i> <i className="fa fa-exclamation-circle"></i></p>,

                                    }[leave_data['approve_status']]
                                }

                            </div>
                        </div>
                        <br />
                        <br />

                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body bg-secondary">
                                        <h4 className="text-white card-title">Responses to this Leave Request</h4>
                                    </div>
                                    <div className="card-body" id="replies-div">
                                        <ul className="list-unstyled" id="replies-area" style={{ maxHeight: '600px', overflow: 'auto' }}>

                                            {
                                                leave_replies.length === 0 ? <i className="text-danger">No response found</i> :
                                                    leave_replies.map((reply, index) => {
                                                        return <li key={index} className="media">
                                                            <div className="user-img">
                                                                <img className="d-flex mr-3 img-circle" src="https://res.cloudinary.com/dr9bbyvab/v1566495925/Krystal/user-unisex-512.png" height="60" alt="user_pic" />
                                                                <span className="profile-status busy pull-right"></span>

                                                            </div>
                                                            <div className="media-body">
                                                                <h5 className="mt-0 mb-1">{reply['first_name'] + ' ' + reply['last_name']}</h5>
                                                                <small><i>{reply['created_date']}</i></small><br />
                                                                <small>
                                                                    {reply['reply']}
                                                                </small>
                                                                <hr />
                                                            </div>
                                                        </li>
                                                    })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="reply">Say something here...</label>
                                            <textarea className="form-control" name="reply" id="reply" rows="6" required></textarea>
                                        </div>
                                        <div className="form-group">
                                            <button onClick={() => this.leaveRequestPostReply()} className="btn btn-success waves-effect waves-light m-t-10">Send <i className="fa fa-send"></i></button>
                                        </div>

                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">

                                        <h4>Share with more people?</h4>
                                        <Multiselect serverData={staffListShare} disableButtonClassName={`btn-info  col-12`}
                                            selectClassName={`col-12`} activeButtonClassName={``} filterClassName={`col-12`}
                                            selectedUserClass={`col-12`} onMultiplySelect={this.handleMultiselect}
                                        />

                                        <div className="form-group">
                                            <button onClick={() => this.leaveRequestShare('ade')} className="btn btn-success waves-effect waves-light m-t-10">Share <i className="fa fa-share"></i></button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


            </React.Fragment>);
    }
}

export default View;