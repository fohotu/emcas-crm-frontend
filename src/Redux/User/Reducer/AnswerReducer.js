import * as types from '../Action/Types';

const initialState = {
    parentTask:{},
    answerList: [],
    singleAnswer: {},// ?
    loading: false,
};

const AnswerReducer = ( state = initialState, action ) => {
    switch(action.type){
        case types.SET_ANSWER_LIST:
            return {...state,answerList:action.payload};
        break;
        case types.SET_SINGLE_ANSWER:
            return {...state,singleAnswer:action.payload};
        break; 
        case types.SET_PARET:
            return {...state,parentTask:action.payload};
        break;
        case types.LOADING:
            return {...state,loading:action.payload};
        break; 
        default:
            return state;
    }
}


export default AnswerReducer;