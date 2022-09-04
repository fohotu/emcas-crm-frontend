import { getRequest, postRequest } from "./request";
import {url} from "./config";




export const fileRemoveRequest = (
    file,
    success,
    error ) => postRequest (
        url.file.remove,
        file,
        success,
        error
    );        


