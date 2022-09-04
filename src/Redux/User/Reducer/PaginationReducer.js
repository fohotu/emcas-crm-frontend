import * as types from '../Action/Types';

const initialState = {
    total:0,
    current:1,
    pageSize:12,
};

const PaginationReducer = ( state = initialState, action ) => {
    switch(action.type){
        case types.SET_PAGINATION_DATA:
            return action.payload;
        case types.SET_CURRENT_PAGE:
            return {...state,current:action.payload};
        break;
        case types.SET_PAGE_SIZE:
            return {...state,pageSize:action.payload};    
        break;
        case types.SET_TOTAL_COUNT:
            return {...state,total:action.payload};   
        break;
        default:
            return state;
    }
}


export default PaginationReducer;