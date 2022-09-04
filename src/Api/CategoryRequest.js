import { getRequest, postRequest } from "./request";
import {url} from "./config";

        
export const categoryListRequest = (success,error) => 
        getRequest (url.category.list,success,error);

export const jobListRequest = (category,success,error) => 
        getRequest (`${url.category.workListByCategory}/${category}`,success,error);