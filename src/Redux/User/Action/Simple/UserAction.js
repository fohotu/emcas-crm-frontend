import * as types from '../Types';

export const setAuthData=(user)=>({
    type:types.SET_AUTH,
    payload:user,
});


export const logout = () => ({
    type:types.LOGOUT
});


export const setUserList = (users) => ({
    type:types.SET_USER_LIST,
    payload:users,
});