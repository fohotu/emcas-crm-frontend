import { setLoading, setTaskList, setSingleTask } from "../Simple/TaskAction";
import { setTotalCount } from '../Simple/PaginationAction';

import { taskListRequest , singleTaskRequest , createTaskRequest } from "../../../../Api/TaskRequest";


export const getTaskListThunk = (params) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        taskListRequest(
            params,
            (response) => {
                if(response.data){
                    let result=response.data.data.map((item)=>({
                      key:item.id,
                      user:item.sender.email,
                      title:item.task.title,
                      description:item.task.description,
                      status:item.status,
                    }));
                    dispatch(setTotalCount(response.data.total));
                    dispatch(setTaskList(result));
                    dispatch(setLoading(false));
                  }
            },
            (error)=>{
                //dispatch();
            });
        
    }        

}


export const getSingleTask = (id) => {
    
    return (dispatch) => {
        dispatch(setLoading(true));
        singleTaskRequest(id,
            (response)  =>  {
                if(response.data){
                    dispatch(setSingleTask(response.data));
                }
                dispatch(setLoading(false));
              
            },
            (error)  =>  {
                
            }
        );
    }

}


export const createNewTask = (task) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        createTaskRequest(task,
             (response) => {
                alert(1);
                console.log(response);
             },
             (error) => {
                console.log(error);
                alert(2);
             }  
        )
        dispatch(setLoading(true));
    }
}


