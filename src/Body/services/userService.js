import http from './httpService.js';

import env from "../../env.js";
const userEndpoint = `${env.api}`;



export function register(user) {
    return http.post(`${userEndpoint}/employee`, user);

}

export function adminRegister(user) {
    return http.post(`${userEndpoint}/employee/admin`, user);

}



