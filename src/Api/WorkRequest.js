import { getRequest, postRequest } from "./request";
import {url} from "./config";


export const workListRequest = (category,success,error) => 
        getRequest (`${url.work.workListByCategory}/${category}`,success,error);