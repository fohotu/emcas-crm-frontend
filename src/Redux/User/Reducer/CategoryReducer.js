import * as types from '../Action/Types';

const initialState = {
    categoryList: [],
    singleCategory: {},// ?
    loading: false,
};

const CategoryReducer = ( state = initialState, action ) => {
    switch(action.type){
        case types.SET_CATEGORY_LIST:
            return {...state,categoryList:action.payload};
        default:
            return state;
    }
}


export default CategoryReducer;