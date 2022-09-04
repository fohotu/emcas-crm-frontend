import React,{useState} from 'react'
import { Card, Form ,Upload , Button , Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { url } from '../../Api/config';
import { useSelector } from 'react-redux';
import { fileRemoveRequest } from '../../Api/FileRequest';

function AnswerForm() {
    const {TextArea}=Input; 

    const {user} = useSelector(state => state);
    const [answer,setAnswer]=useState({
        task_employee_id:null,
        title:null,
        description:null,
        fileList:[],
    });   

    const uploadOptions = {
        action:url.file.upload,
        headers: {
            'Authorization' : 'Bearer ' + user.profile._token
        },
        onChange({ file, fileList }) {
          if(file.status !== 'uploading' ){
               setAnswer ({
                   ...answer,
                   fileList: [...answer.fileList,file]
               })
          }
        },
        onRemove:(file) => {
            if(file.status !== 'uploading' ) {
                fileRemoveRequest(file,(response) => {
                    
                },() => {})
            }
        },
        maxCount:5,
        multiple:true,
      
    };

  return (
    <div>
        <Card title="Отправить ответ на задачу">
                            <Form
                                name=""
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                autoComplete="off"
                                >

                                    <Form.Item
                                            label="Заголовок"
                                            name="title"
                                            rules = {[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                            ]}
                                        >
                                            <Input size="large"  value={answer.title} onChange={(e)=>{setAnswer({...answer,title:e.target.value})}} placeholder=""  />

                                        </Form.Item>

                                        <Form.Item
                                            label="Описание"
                                            name="description"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                            ]}
                                        >
                                            <TextArea 
                                                rows={10} 
                                                placeholder=""  
                                                value={answer.title}
                                                onChange={(e) => {
                                                        setAnswer({...answer,description:e.target.value})
                                                    }
                                                } 
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Upload {...uploadOptions} >
                                                <Button type="danger" shape="round" size="large" icon={<UploadOutlined />}>Загрузить файл</Button>
                                            </Upload>
                                        </Form.Item>    

                                        <Form.Item
                                            style={{
                                                textAlign:'right'
                                            }}
                                        >
                                        </Form.Item>
                                </Form>
                    
                            </Card>
    </div>
  )
}

export default AnswerForm