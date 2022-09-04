import { categoryListRequest, jobListRequest } from '../../../../Api/CategoryRequest';
import { setCategoryList } from '../Simple/CategoryAction';
import { setWorkList } from '../Simple/WorkAction';

export const getCategoryList = () => {
    return (dispatch) => {
        categoryListRequest((response) => {
            console.log(response,'category response');
            dispatch(setCategoryList(response.data));
        },(error) => {
            //dispatch()
        })

    }
}



