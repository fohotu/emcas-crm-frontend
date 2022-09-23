import * as types from '../Action/Types';

const initialState = {
    live: {
        items: []
    },
    simple: {
        items: [],
    },
    selfFilter: {
        items: [],
    },
    loading: false,
};

const SearchReducer = ( state = initialState, action ) => {
    console.log(action);
    switch(action.type){
        case types.SET_LIVE_SEARCH_ITEM:
            return {...state,live: {items:action.payload}};
        case types.SET_SIMPLE_SEARCH_ITEM:
            return {...state,simple: {items:action.payload}};  
        case types.SET_SELF_FILTER_ITEM:
            alert(123);
            return {...state,selfFilter: {items:action.payload}}; 
        default:
            return state;
    }
}


export default SearchReducer;