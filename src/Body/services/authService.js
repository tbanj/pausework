import http from './httpService.js';

import env from "../../env.js";
const authEndpoint = `${env.api}`;
const tokenKey = "vidly-token";

export function getToken() {
    if (!localStorage.getItem('pausework-info') && !localStorage.getItem('pausework-token')) {
        return null;
    }
    else {
        const isAdmin = localStorage.getItem('pausework-info');
        const token = localStorage.getItem('pausework-token');
        return [isAdmin, token];
    }
}

export async function getLeaves() {
    const userInfo = getToken();
    const data = {
        headers: { 'Authorization': `Bearer ${userInfo[1]}`, 'is_admin': `Bearer ${userInfo[0]}` },
        cancelToken: http.signal.token,
    };
    return http.get(`${authEndpoint}/leave`, data);
}

export async function getUserLeaves() {
    const userInfo = getToken();
    const data = {
        headers: { 'Authorization': `Bearer ${userInfo[1]}`, 'is_admin': `Bearer ${userInfo[0]}` },
        cancelToken: http.signal.token,
    };
    return http.get(`${authEndpoint}/leave/user`, data);
}

export function InsertAprovalName(totalLeav) {
    const data = { cancelToken: http.signal.token };
    return http.get(`${authEndpoint}/employee/query-employee?employee=${totalLeav}`, data);
}

export function verifyUser() {
    try {
        const token = localStorage.getItem('pausework-token');
        return token;
    } catch (error) {
        // is use to show the value is false
        return null;
    }
}

export function removeToken() {
    localStorage.removeItem('pausework-token');
    localStorage.removeItem('pausework-info');
}


export function storeToken(is_admin, token) {
    localStorage.setItem('pausework-info', is_admin);
    localStorage.setItem('pausework-token', token);
}

export function login(userDetail) {
    return http.post(`${authEndpoint}/employee/signin`, userDetail);
}

// export function adminLogin(userDetail) {
//     return http.post(`${authEndpoint}/employee/admin-signin`, userDetail);
// }


export function gender() {
    return http.get(`${authEndpoint}/gender`);
}

export function country() {
    return http.get(`${authEndpoint}/country`);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);

}