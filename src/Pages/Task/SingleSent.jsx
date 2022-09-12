import { Card, Col, Row, Spin } from 'antd'
import React from 'react'

import './SingleSent.css';
import AnswerCard from './AnswerCard';
import TaskCard from './TaskCard';

function SingleSent({data,loading}) {
    
    const { Meta } = Card;
    return (
        <>
            {
                (!loading) ? 
                 <Row>
                    <Col span={12}>
                     <TaskCard data={data}/>
                    
                    </Col>
                    <Col span={12}>
                        <AnswerCard />
                    </Col>
                </Row>
                
                :
                    <Spin size="large" spinning={loading} />      
            } 
             
        </>
        

      
                    
   
  )
}

export default SingleSent