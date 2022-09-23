import { getRequest } from "./request";
import {url} from "./config";


export const liveRequest = (
        q,
        success,
        error ) => getRequest (
            `${url.search.live}/${q}`,
            success,
            error
        );


export const simpleRequest = 
    (q,success,error) => getRequest (
        `${url.search.simple}/${q.query}?page=${q.page}`,
        success,
        error
    )  

export const selfFilterRequest = 
    (q,success,error) => getRequest (
        `${url.search.selfFilter}/${q.start}/${q.end}/${q.category}/?page=${q.page}`,
        success,
        error
    )  
    