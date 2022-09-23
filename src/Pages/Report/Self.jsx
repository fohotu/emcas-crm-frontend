import React,{useState,useEffect} from 'react';
import { Calendar,Row, Col, Card,Button , Select, Form} from 'antd';
import { Link } from 'react-router-dom';
import './Self.css';
import { selfFilterThunk } from '../../Redux/User/Action/Thunk/SearchThunk';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from '../../Redux/User/Action/Thunk/CategoryThunk';
import List from '../Task/List';


const Self = () => {
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCategoryList());
    },[])

    const {categoryList} = useSelector(state => state.category);
    const {selfFilter} = useSelector(state => state.search);
    const {loading} = useSelector( state => state.task );
    const pagination = useSelector( state => state.pagination );
  
    const [filter,setFilter] = useState({
        start:null,
        end:null,
        category:1,
        page:1,
    });

    const [currentPage,setCurrentPage] = useState(1);

    const onPanelChange = (value, mode) => {
        //console.log(value.format('YYYY-MM-DD'), mode);
    };

    const filterHandler = () => {

        setFilter({...filter,page:currentPage});
        dispatch(selfFilterThunk(filter));

    }

    const data = {
        columns : [
          
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
        source:selfFilter.items,
      };


      console.log(data);
    
      const paginate = {
        ...pagination,
        onChange: (pageNumber) => {
          //navigate(`/task/${params.category}/${params.box}/${pageNumber}`); 
        }
      };


    return (
        <>

            <Row gutter = {16} className='row_block'>
                <Col >
                    <Link to="/report/job">
                        <Button>
                            Job Clendar
                        </Button>
                        </Link>
                        <Link to="/report/self">
                        <Button>
                            Self Report
                        </Button>
                    </Link>
                </Col>
            
            </Row>
           
            
            <Row gutter = {16} className='row_block'>
                <Col span = {12} >
                    <Card>
                        
                            <Calendar onChange = {(moment) => { setFilter({...filter,start:moment.format()}) }} fullscreen={false} onPanelChange={onPanelChange} />
                      
                    </Card>
                </Col>
                <Col span = {12} >
                    <Card>
                      
                            <Calendar onChange = {(moment) => { setFilter({...filter,end:moment.format() }) }} fullscreen = {false} onPanelChange = {onPanelChange} />
                        
                    </Card>
                </Col>
            </Row>
            <Row gutter = {16} className='row_block'>
                <Col>
                    {/*
                        <Select filterOption={false} style = {{width:200}} onChange={(val)=> setFilter({...filter,category:val})}>
                            {
                                categoryList.map((category) => {
                                    return <Select.Option key = {category.id} value = {category.id}> {category.title} </Select.Option>
                                })
                            }
                        </Select>
                     */   }
                        {
                                categoryList.map((category) => {
                                    return  category.title; 
                                })
                            }
                </Col>
                <Col>
                    <Button onClick={filterHandler} htmlType="submit" type="primary">Filter</Button>
                </Col>
            </Row>
            <Row>
                <List  data = {data} pagination = {paginate} loading = {loading} />
            </Row>
        </>
    );

};

export default Self;