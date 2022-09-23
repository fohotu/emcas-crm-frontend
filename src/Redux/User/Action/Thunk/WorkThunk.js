import { setWorkList,setSingleWork } from '../Simple/WorkAction';
import { workListRequest, workPaginatedListRequest, createNewJobRequest, getSingleWorkRequest, updateJobRequest } from '../../../../Api/WorkRequest';
import { setTotalCount } from '../Simple/PaginationAction';
import { setLoading } from '../Simple/TaskAction';
import { commonAlert } from '../../../../Lib/Alert';


export const getWorkListByCategory = (category) => {
    return (dispatch) => {
        workListRequest(category,(response) => {
            dispatch(setWorkList(response.data));
        },(error) => {
            //
        })
    }
  }


export const workPaginatedListThunk = (params) => {
    return (dispatch) => {
        workPaginatedListRequest(params,
            (response) => {
                console.log(response)
                if(response.data.data){
                    let result = response.data.data.map((item) => ({
                      key:item.id,
                      title:item.title,
                      description:item.description,
                      //status:item.status,
                    }));
                 
                    dispatch(setTotalCount(response.data.total));
                    dispatch(setWorkList(result));
                    dispatch(setLoading(false));
                  }
                //dispatch(setWorkList(response.data))
            },
            (error) => {

            }
        )
    }
}  

export const createNewJobThunk = (job) => {
    return (dispatch) =>{
        createNewJobRequest(job,
            (response) => {
                if(response.datad.data.updated){
                  //  dispatch(getSingleWorkThunk(job.id));
                   // commonAlert('Задача успешно обновлена!');
                }
            },
            (error)=>{
    
            }
        )
    }
   
}





export const getSingleWorkThunk = (id) => {
    return (dispatch) => {
        getSingleWorkRequest(id,
            (response) => {
                dispatch(setSingleWork(response.data))
                console.log(response);
            },
            (error) => {
    
            }
        )
    }
   
}


export const updateWorkThunk = (work) => {
    return (dispatch) => {
        updateJobRequest(work,
            (response) => {
                if(response.data.updated){
                    dispatch(getSingleWorkThunk(work.id));
                    commonAlert('Задача успешно обновлена!');
                }
                console.log(response);
            },
            (error)=>{

            },
        )
    }
}