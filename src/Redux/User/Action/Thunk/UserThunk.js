import { authUserRequest, userListRequest, userTasksRequest,addUserToTaskRequest } from "../../../../Api/UserRequest";
import { setAuthData, setUserList, setUserTasks } from "../Simple/UserAction";

import { setLoading } from "../Simple/TaskAction";
import { setTotalCount } from '../Simple/PaginationAction';
import { commonAlert } from '../../../../Lib/Alert';

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



export const getUserTasksThunk = (params) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        userTasksRequest(
            params,
            (response) => {
                console.log(response,'THUNK');
                if(response.data){
                    let result=response.data.data.map((item)=>({
                      id:item.id,
                      title:item.title,
                      description:item.description,
                      status:item.status,
                    }));
                    dispatch(setTotalCount(response.data.total));
                    dispatch(setUserTasks(result));
                    dispatch(setLoading(false));
                }
            },
            (error) => {
                //dispatch();
            });
        
    }
}


export const addUserToTask = (task) => {
    return (dispatch) => {
        addUserToTaskRequest(task,
            (response) => {
                console.log(response);
                commonAlert('Новая задача создана!');
            },
            (error) => {

            }
        )
    }

}