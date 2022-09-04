import React,{ useEffect } from 'react';
import List from './List';
import './TaskList.css';
import {useDispatch, useSelector} from 'react-redux';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { getTaskListThunk } from '../../Redux/User/Action/Thunk/TaskThunk';
import { setCurrentPage } from '../../Redux/User/Action/Simple/PaginationAction';


function TaskList(){

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(params.page));
    dispatch(getTaskListThunk(params));
  },[params.page,params.category,params.box]);
  
  const {taskList} = useSelector( state => state.task );
  const {loading} = useSelector( state => state.task );
  const pagination = useSelector( state => state.pagination );


  const data = {
    columns : [
        {
          title: '#',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: 'Название',
          dataIndex: 'title',
          key: 'title',
          render: (text,record,index) => { return ((record) ? <Link  className="single_link" to={`/task/single/${record.key}`} >{text}</Link> : "")},
        },
        {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status',
        }
    ],
    source:taskList,
  };

  const paginate = {
    ...pagination,
    onChange: (pageNumber) => {
      navigate(`/task/${params.category}/${params.box}/${pageNumber}`); 
    }
  };

  return (
    <div>
        <List  data={data} pagination={paginate} loading={loading} />
    </div>
  );

}

export default TaskList;