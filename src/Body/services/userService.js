import http from './httpService.js';

import env from "../../env.js";
const userEndpoint = `${env.api}/employee`;



export function register(user) {
    return http.post(userEndpoint, user);

}



