import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/api`;

function Request({url,...options}) {
    const token = localStorage.getItem('_zToken');
    options.headers = {
        ...options.headers,
        Authorization: token && `Bearer ${token}`
    }
    return axios({
        url: url,
        ...options
    });
}

export default Request;
export {Request};
