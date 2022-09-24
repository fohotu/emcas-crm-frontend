import { setLiveSearchItem ,setSimpleSearchItem ,setSelfFilterItem } from '../Simple/SearchAction';
import { liveRequest, simpleRequest, selfFilterRequest } from '../../../../Api/SearchRequest';
import { setTotalCount } from '../Simple/PaginationAction';
import { setLoading } from '../Simple/TaskAction';
import { DatabaseFilled } from '@ant-design/icons';

export const liveSearchThunk = (query) => {
    return (dispatch) => {
        let result = [];
        liveRequest(query,
            (response) => {
              if(response.data){
                response.data.map((item) => {
                  const userTask = {
                    key:Math.random()*item.id,
                    userTaskId:item.id,
                    value:item.description,
                  };
                  const taskDescription = {
                    key:Math.random()*item.task.id,
                    userTaskId:item.id,
                    value:item.task.description,
                  };
                  const taskTitle = {
                    key:Math.random()*item.id,
                    userTaskId:item.id,
                    value:item.task.title,
                  };
                  result = [...result,userTask,taskDescription,taskTitle];
                });
                dispatch(setLiveSearchItem(result));
              }
            }
        )
    }
}


export const simpleSearchThunk = (query) => {
  return (dispatch) => {
    simpleRequest(query, (response) => {
      if(response.data){

        let result = response.data.data.map((item) => ({
          key:item.id,
          title:item.task.title,
          description:item.task.description,
        
        }));

        
        dispatch(setTotalCount(response.data.total));
        dispatch(setSimpleSearchItem(result));
        dispatch(setLoading(false));


      }
    })
  } 
}


export const selfFilterThunk = (query) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    selfFilterRequest(query,
        (response) => {
          let dataSource = response.data.data.map((item) => {
            if(item.task){
              return {
                title: item.task.title,
                description: item.description,
              };
            }
            
          });
          dispatch(setSelfFilterItem(dataSource));
          dispatch(setTotalCount(response.data.total));
          dispatch(setLoading(false));
        
        },
        (error) => {
          
        }
      )
  }
}