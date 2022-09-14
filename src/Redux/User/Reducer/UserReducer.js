import * as types from '../Action/Types';

const initialState = {
    isAuth:false,
    email:null,//?
    profile:{
        /*
        name:null,
        lastname:null,
        surname:null,
        */
        full_name:null,
        photo:null,
        _token:null,
        _role:null,
    },
    userList:[],
    taskList:[],
    loading:false,
};

const UserReducer = ( state = initialState, action ) => {
    switch(action.type){
       case types.SET_AUTH:
            return {...state,isAuth:true,profile:action.payload}
       break;
       case types.SET_USER_LIST:
            return {...state,userList:action.payload}
       break;
       case types.LOGOUT:
            return {
                ...state,
                isAuth:false,
                profile:{
                    full_name:null,
                    photo:null,
                    _role:null,
                    _token:null    
                }
            };
        break;
        case types.LOADING:
            return {...state,loading:action.payload};
        break;  
        case types.SET_USER_TASKS:
            console.log(action);
            return {...state,taskList:action.payload};
        default:
            return state;
    }
}


export default UserReducer;