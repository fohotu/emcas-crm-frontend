import { combineReducers } from "redux";
import TaskReducer from './User/Reducer/TaskReducer';
import AlertReducer from './User/Reducer/AlertReducer';
import AnswerReducer from './User/Reducer/AnswerReducer';
import CategoryReducer from './User/Reducer/CategoryReducer';
import SearchReducer from './User/Reducer/SearchReducer';
import UserReducer from './User/Reducer/UserReducer';
import WorkReducer from './User/Reducer/WorkReducer';
import PaginationReducer from './User/Reducer/PaginationReducer';

const rootReducer = combineReducers ({
    task:TaskReducer,
    alert:AlertReducer,
    answer:AnswerReducer,
    category:CategoryReducer,
    search:SearchReducer,
    user:UserReducer,
    work:WorkReducer,
    pagination:PaginationReducer
});


export default rootReducer;

