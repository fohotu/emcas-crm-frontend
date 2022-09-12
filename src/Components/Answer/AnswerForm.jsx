import React,{useState} from 'react'
import { Card, Form ,Upload , Button , Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { url } from '../../Api/config';
import { useSelector, useDispatch } from 'react-redux';
import { fileRemoveRequest } from '../../Api/FileRequest';
import { useParams } from 'react-router-dom';
import { createAnswerThunk } from '../../Redux/User/Action/Thunk/AnswerThunk';
import { useForm } from 'antd/es/form/Form';


function AnswerForm({loadData}) {
    const {TextArea}=Input; 

    const params = useParams();
    const [form] = useForm();
    const dispatch = useDispatch()
    const {user} = useSelector(state => state);
  


    const onFinish = (values) => {
        dispatch(createAnswerThunk(values));
        form.resetFields();
        loadData();

    };

    const uploadOptions = {
        action:url.file.upload,
        headers: {
            'Authorization' : 'Bearer ' + user.profile._token
        },
        onChange({ file, fileList }) {
          if(file.status !== 'uploading' ){
          
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
        <Card title="Отправить ответ на задачу " >
                            <Form
                               
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
                                onFinish={onFinish}
                                form = {form}
                                >
                                    <Form.Item initialValue={params.id} hidden name="task_id" >
                                        <Input  />
                                    </Form.Item>
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
                                            <Input size="large"   placeholder=""  />

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
                                              
                                            />
                                        </Form.Item>

                                        <Form.Item  name="files">
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

                                        <Form.Item>
                                            <Button type="primary" block htmlType="submit">
                                                Сохранить
                                            </Button>
                                        </Form.Item>
                                </Form>



                    
                            </Card>
    </div>
  )
}

export default AnswerForm