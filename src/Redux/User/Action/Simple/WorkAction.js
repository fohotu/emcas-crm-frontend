import * as types from '../Types';



export const setWorkList = (works)=>({
    type:types.SET_WORK_LIST,
    payload:works
});


export const setSingleWork = (work) => ({
    type:types.SET_SINGLE_WORK,
    payload:work
});