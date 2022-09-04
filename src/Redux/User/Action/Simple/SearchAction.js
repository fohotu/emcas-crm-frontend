import * as types from '../Types';

export const setLiveSearchItem = (value) => ({
    type:types.SET_LIVE_SEARCH_ITEM,
    payload:value,
});

export const setSimpleSearchItem = (value) => ({
    type:types.SET_SIMPLE_SEARCH_ITEM,
    payload:value,
});


export const setSelfFilterItem = (value) => ({
    type:types.SET_SELF_FILTER_ITEM,
    payload:value,
});


