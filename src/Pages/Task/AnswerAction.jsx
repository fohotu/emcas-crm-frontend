import React from 'react';
import {Button} from 'antd';
import { changeTaskStatusThunk, getSingleTask } from '../../Redux/User/Action/Thunk/TaskThunk';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function AnswerAction() {

  const dispatch =  useDispatch(); 
  const params = useParams();

  const accept = () => {
    let task = {
      id:params.id,
      status:'finished',
    }
    dispatch(changeTaskStatusThunk(task));
    dispatch(getSingleTask(params.id));
  }

  return (
    <>
        <Button type="primary" onClick = {accept}>Принать</Button>
        <Button type="primary" danger onClick = {() => {  }} >Отказать</Button>
    </>
  )
}

export default AnswerAction