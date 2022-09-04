import React,{useState} from 'react';
import { Button, Card, Modal } from 'antd';
import AnswerAction from './AnswerAction';
import { commonAlert } from '../../Lib/Alert';
import Download from '../../Components/Common/File/Download';
import AnswerForm from '../../Components/Answer/AnswerForm';

function Answer({data,type}) {

  const [isModalVisible,setModalVisible]=useState(false);
  const handleOk=()=>{
    setModalVisible(false);
  } 
  const handleCancel=()=>{
    setModalVisible(false);
  } 

 

  return (
    <>
        <Card className = "task_card">
            <Button type="primary" onClick={()=>setModalVisible(true)}>Ответить</Button>
        </Card>
        {
            data.answer.map((answer) => {
              return  <Card
                    key={answer.id}
                    className = "task_card"
                >
                    <div className = 'action_box' >
                        <p>
                            {
                                type=='sender' ?
                                    <AnswerAction />
                                :
                                <Button style={{display:"none"}} onClick = { () => commonAlert('Hello Alert!') } >Комментировать</Button> 
                            }
                        </p>
                    </div>
                    <h3>
                       {answer.title}
                    </h3>
                    <p>
                        {answer.description}
                    </p>
                    <div className='answer_file'>
                            {answer.files.map((file)=>{
                                return <Download title={file.title} link={file.link} />
                            })}
                    </div>
                </Card>
            })
        }


    <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AnswerForm />
    </Modal>

    </>
  )

}

export default Answer