import { getRequest , postRequest } from "./request";
import {url} from "./config";


export const createAnswerRequest =     
    (answer,success,error) => 
    postRequest (url.answer.create,answer,success,error); 