import { setWorkList } from '../Simple/WorkAction';
import { workListRequest } from '../../../../Api/WorkRequest';


export const getWorkListByCategory = (category) => {
    return (dispatch) => {
        workListRequest(category,(response) => {
            dispatch(setWorkList(response.data));
        },(error) => {
            //
        })
    }
  }
