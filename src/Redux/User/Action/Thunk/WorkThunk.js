import { setWorkList } from '../Simple/WorkAction';
import { workListRequest, workPaginatedListRequest, createNewJobRequest } from '../../../../Api/WorkRequest';
import { setTotalCount } from '../Simple/PaginationAction';
import { setLoading } from '../Simple/TaskAction';


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
    createNewJobRequest(job,
        (response) => {
            console.log(response)
        },
        (error)=>{

        }
    )
}
