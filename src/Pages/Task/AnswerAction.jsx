import React from 'react';
import {Button} from 'antd';

function AnswerAction() {
  return (
    <>
        <Button type="primary" onClick = {() => {}}>Принать</Button>
        <Button type="primary" danger onClick = {() => {  }} >Отказать</Button>
    </>
  )
}

export default AnswerAction