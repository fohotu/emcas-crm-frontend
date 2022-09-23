import { getRequest, postRequest } from "./request";
import {url} from "./config";


export const workListRequest = (category,success,error) => 
        getRequest (`${url.work.workListByCategory}/${category}`,success,error);


export const workPaginatedListRequest = (params,success,error) => 
        getRequest (`${url.work.workPaginatedListByCategory}/${params.category}?page=${params.page}`,success,error); 

export const createNewJobRequest = (job,success,error) => {
        postRequest(url.work.create,job,success,error);
}        

export const getSingleWorkRequest = (id,success,error) => 
        getRequest(`${url.work.single}/${id}`,success,error);

export const updateJobRequest = 
        (work,success,error) => 
        postRequest (url.work.update,work,success,error);  