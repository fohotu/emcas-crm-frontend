import { getRequest, postRequest } from "./request";
import {url} from "./config";





export const authUserRequest = (authData,success,error ) => 
        postRequest (`${url.user.login}`,authData,success,error);
        
export const userListRequest = (success,error) => 
        getRequest (url.user.list,success,error);    
        
        
export const userTasksRequest = 
( urlParams, success, error ) => 
        getRequest (
                `${url.user.task}/?page=${urlParams.page}`,
                success,
                error
        );        