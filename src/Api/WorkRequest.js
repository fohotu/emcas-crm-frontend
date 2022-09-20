import { getRequest, postRequest } from "./request";
import {url} from "./config";


export const workListRequest = (category,success,error) => 
        getRequest (`${url.work.workListByCategory}/${category}`,success,error);


export const workPaginatedListRequest = (params,success,error) => 
        getRequest (`${url.work.workPaginatedListByCategory}/${params.category}?page=${params.page}`,success,error); 

export const createNewJobRequest = (job,success,error) =>{
        postRequest(url.work.create,job,success,error);
}        