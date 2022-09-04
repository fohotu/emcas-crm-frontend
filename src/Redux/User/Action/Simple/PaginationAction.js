import * as types from '../Types';


export const setTotalCount = (total) => ({
    type:types.SET_TOTAL_COUNT,
    payload:total
});


export const setCurrentPage = (page) => ({
    type:types.SET_CURRENT_PAGE,
    payload:page
});