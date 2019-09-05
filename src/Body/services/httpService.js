import axios from 'axios';
import logService from './logService';

axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// signal = axios.CancelToken.source();
// cancelToken: this.signal.token,



axios.interceptors.response.use(null, error => {
    const expectedErrror = error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedErrror) {
        logService.log(error);
        console.log("server error", error);
    }
    return Promise.reject(error);

});



function setJwt(jwt) {
    // axios.defaults.headers.common['x-auth-token'] = jwt;
    // axios.defaults.headers.post

}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setJwt,
    signal: axios.CancelToken.source()
}