import React,{useState} from 'react';
import { Calendar,Row, Col, Card,Button , Select} from 'antd';
import { Link } from 'react-router-dom';
import './Self.css';
import { selfFilterThunk } from '../../Redux/User/Action/Thunk/SearchThunk';

import { useDispatch } from 'react-redux';





const Self = () => {

    const dispatch = useDispatch()

    const [filter,setFilter] = useState({
        start:null,
        end:null,
        category:null,
        term:null,
    });

    const onPanelChange = (value, mode) => {
        //console.log(value.format('YYYY-MM-DD'), mode);
    };

    const filterHandler = () => {
            dispatch(selfFilterThunk(filter))
    }

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
                    <Select style = {{width:200}} onChange={(value)=> setFilter({...filter,category:value})}>
                        <Select.Option value="all"> Все </Select.Option>
                        <Select.Option value="planed"> Плановой </Select.Option>
                        <Select.Option value="notplaned"> Не плановой </Select.Option>
                    </Select>
                </Col>
                <Col>
                    <Select style={{width:200}} onChange={(value)=> setFilter({...filter,term:value})}>
                        <Select.Option value="all">Все</Select.Option>
                        <Select.Option value="diadline">Deadline</Select.Option>
                        <Select.Option value="success">Success</Select.Option>
                    </Select>
                </Col>
                <Col>
                    <Button onClick={filterHandler} type="primary">Filter</Button>
                </Col>
            </Row>
        </>
    );

};

export default Self;