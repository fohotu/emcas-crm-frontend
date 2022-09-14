import * as types from '../Action/Types';

const initialState = {
    parentWork:{},
    taskList: [],
    singleTask: {},
    loading: true,
    taskView:{},
};

const TaskReducer = ( state = initialState, action ) => {
    switch(action.type){
        case types.SET_TASK_LIST:
            return {...state,taskList:action.payload};
        break;
        case types.SET_SINGLE_TASK:
            return {...state,singleTask:action.payload};
        break; 
        case types.SET_PARET:
            return {...state,parentWork:action.payload};
        case types.LOADING:
            return {...state,loading:action.payload};
        break;
        case types.SET_TASK_VIEW:
            return {...state,taskView:action.payload};
        break;
        default:
            return state;
    }
}


export default TaskReducer;