import config from "./config";
import axios from "axios";

axios.defaults.baseURL = config.apiHost;


export const postRequest = (url,data,success,error=null,always=null) => {
    return axios.post(url,data)
    .then(success)
    .catch(error)
    .then(always)
}

export const getRequest = (url,success,error=null,always=null) => {
    return axios.get(url)
    .then(success)
    .catch(error)
    .then(always)
}


