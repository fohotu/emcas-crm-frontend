import * as types from '../Types';

export const setTaskList=(tasksList)=>({
    type:types.SET_TASK_LIST,
    payload:tasksList
});


export const setLoading=(value)=>({
    type:types.LOADING,
    payload:value
});


export const setSingleTask=(task)=>({
    type:types.SET_SINGLE_TASK,
    payload:task
});
