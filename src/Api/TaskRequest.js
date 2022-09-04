import { getRequest , postRequest } from "./request";
import {url} from "./config";


export const taskListRequest = 
        ( urlParams, success, error ) => 
            getRequest (
                        `${url.task.index}/${urlParams.category}/${urlParams.box}/?page=${urlParams.page}`,
                        success,
                        error
                    );


export const singleTaskRequest = 
    (id, success, error ) => 
    getRequest (`${url.task.single}/${id}/`, success, error );        

export const createTaskRequest = 
    (task,success,error) => 
    postRequest (url.task.create,task,success,error);    