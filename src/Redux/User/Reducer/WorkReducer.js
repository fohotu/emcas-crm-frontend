import * as types from '../Action/Types';

const initialState = {
    workList: [],
    singleWork: {},// ?
    loading: false,
};

const WorkReducer = ( state = initialState, action ) => {
    switch(action.type){
        case types.SET_WORK_LIST:
            return {...state,workList:action.payload};
        break;
        case types.SET_SINGLE_WORK:
            return {...state,singleWork:action.payload};
        break; 
        case types.LOADING:
            return {...state,loading:action.payload};
        break; 
        default:
            return state;
    }
}


export default WorkReducer;