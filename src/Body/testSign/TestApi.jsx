import React, { Component } from 'react';
import axios from 'axios';
import env from '../../env';
import { getLeaves, getToken, InsertAprovalName } from "../services/authService.js";


class TestApi extends Component {
    state = { data: '', isFetching: true, updateleaveSum: [], errorData: 'loading' }

    getList = async () => {
        try {
            let checker = await getLeaves();
            this.setState({ data: checker.data.data });
        }
        catch (error) {
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

        } catch (error) {

        }
    }



    componentDidMount() {
        this.getList();
        this.timer = setTimeout(() => this.fetchUsers(), 5000);
    }
    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {

    }

    render() {
        return <React.Fragment>
            <div > Trying Nested Api</div>
            <div>{this.state.updateleaveSum.length > 1 && this.state.isFetching === false ? "data-available" : <div>{this.state.errorData}</div>}</div>
        </React.Fragment>;
    }
}

export default TestApi;