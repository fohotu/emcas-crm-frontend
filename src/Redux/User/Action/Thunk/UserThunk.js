import { authUserRequest, userListRequest } from "../../../../Api/UserRequest";
import { setAuthData, setUserList } from "../Simple/UserAction";

export const authUser = (auth) => {
  
    return (dispatch) => {

        authUserRequest(auth,
            (response) => {
                const userData = JSON.stringify(response.data);            
                    dispatch(setAuthData(response.data));
                    localStorage.setItem('user',userData);
                    window.location="/";
            },
            (error) => {
                //dispatch(authError());
            }     
        )

       
    };

};


export const getUserList = () => {
    return (dispatch) => {
        userListRequest((response) => {
            console.log(response,'response user');
            dispatch(setUserList(response.data));
        },(error) => {
            //dispatch
        })
    }
}