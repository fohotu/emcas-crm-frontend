import { createAnswerRequest } from '../../../../Api/AnswerRequest';
import { commonAlert } from '../../../../Lib/Alert';


export const createAnswerThunk = (answer) => {
    return (dispatch) => {
       // dispatch(setLoading(true));
        createAnswerRequest(answer,
            (response) => {
            if(response.data.saved){
                commonAlert('Новая задача создана!');
            }else{
                commonAlert('Задача не создана. Попробуйте позже!','warning');
            }
            },
            (error) => {
            commonAlert('Ошибка сервера. Повторите попытку позже.!','error');
            }  
        )
       // dispatch(setLoading(false));
    }
    
}
