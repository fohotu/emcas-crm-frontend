import React,{ useEffect } from 'react';
import List from './../Task/List';
import './../Task/TaskList.css';
import {useDispatch, useSelector} from 'react-redux';
import { useParams,useNavigate,Link, useSearchParams } from 'react-router-dom';
import { setCurrentPage } from '../../Redux/User/Action/Simple/PaginationAction';
import { simpleSearchThunk } from '../../Redux/User/Action/Thunk/SearchThunk';


function Result(){

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
 

  useEffect(() => {
    dispatch(setCurrentPage(params.page));
    dispatch(simpleSearchThunk(params));
  },[params.page,params.query]);
  
  const {simple} = useSelector( state => state.search );
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
    ],
    source:simple.items,
  };

  const paginate = {
    ...pagination,
    onChange: (pageNumber) => {
      navigate(`/search/${params.query}/${pageNumber}`); 
    }
  };

  return (
    <div>
      <List data={data} pagination={paginate} loading={loading} />
    </div>
  );  

}

export default Result