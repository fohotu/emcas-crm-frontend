import React,{ useEffect } from 'react';
import List from './List';
import './TaskList.css';
import {useDispatch, useSelector} from 'react-redux';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { getTaskListThunk } from '../../Redux/User/Action/Thunk/TaskThunk';
import { setCurrentPage } from '../../Redux/User/Action/Simple/PaginationAction';
import { getUserTasksThunk } from '../../Redux/User/Action/Thunk/UserThunk';
import { Typography } from 'antd';



function MyTask(){

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

   

  useEffect(() => {
    dispatch(setCurrentPage(params.page));
    dispatch(getUserTasksThunk(params));
  },[params.page]);
  
  const {taskList} = useSelector( state => state.user );
  const {loading} = useSelector( state => state.task );
  const pagination = useSelector( state => state.pagination );
  
  
  console.log(taskList,'Load');


  const data = {
    columns : [
        {
          title: 'Название',
          dataIndex: 'title',
          key: 'title',
          render: (text,record,index) => { return ((record) ? <Link className="single_link" to={`/task/${record.id}`} >{text}</Link> : "")},
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
          render: (text,record,index) => { return ((record=='finished') ? <Typography.Text type="success">Завершенный</Typography.Text> : <Typography.Text type="warning">Активный</Typography.Text>)},
        }
    ],
    source:taskList,
  };

  const paginate = {
    ...pagination,
    onChange: (pageNumber) => {
      navigate(`/task/mine/${pageNumber}`); 
    }
  };

  return (
    <div>
        <List  data={data} pagination={paginate} loading={loading} />
    </div>
  );

}

export default MyTask;